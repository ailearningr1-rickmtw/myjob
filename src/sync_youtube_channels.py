# -*- coding: utf-8 -*-
"""
主題四 YouTube AI 影音中樞：繁體中文 AI 頻道自動同步工具

流程：
1. 讀取 src/youtube_channels.json 頻道清單（僅限繁體中文頻道）。
2. 透過 YouTube 官方 RSS 取得每個頻道最新影片與精確發布時間。
3. 透過頻道「影片」分頁補上影片長度並排除 Shorts / 直播片段。
4. 僅保留標題與 AI 直接相關、且非簡體中文的影片。
5. 輸出 public/data/youtube_ai.json（前端每次進入頁面即時讀取）
   與 public/js/youtube_ai_data.js（離線備援）。

若某頻道抓取失敗，會沿用上一次成功的資料，避免網頁出現空白。
由 GitHub Actions 定時（每 6 小時）與每次部署時自動執行。
"""
from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "src" / "youtube_channels.json"
JSON_OUT = ROOT / "public" / "data" / "youtube_ai.json"
JS_OUT = ROOT / "public" / "js" / "youtube_ai_data.js"

KEEP_DAYS = 180
MAX_PER_CHANNEL = 12
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "zh-TW,zh;q=0.9",
    "Cookie": "CONSENT=YES+1",
}

# 標題必須命中以下任一 AI 關鍵字才會收錄
AI_PATTERN = re.compile(
    r"(?<![A-Za-z])AI(?![a-z])|人工智慧|人工智能|生成式|ChatGPT|GPT|Gemini|Claude|Copilot|"
    r"LLM|語言模型|Agent|智慧代理|NotebookLM|Notebook\s?LM|提示詞|Prompt|機器學習|深度學習|"
    r"神經網路|Transformer|OpenAI|Anthropic|DeepSeek|Llama|Sora|Midjourney|Stable\s?Diffusion|"
    r"Perplexity|Cursor|Vibe\s?Coding|MCP|RAG|Grok|Qwen|AGI|Nano\s?Banana|Veo|Codex|算力|輝達|NVIDIA",
    re.IGNORECASE,
)
# 教學類型判定關鍵字
TUTORIAL_PATTERN = re.compile(
    r"教學|教程|實戰|入門|課程|手把手|攻略|技巧|如何|怎麼|做法|打造|製作|步驟|設定|範例|"
    r"一次學會|快速上手|完整|實作|示範|Lecture|第.{1,3}講|EP\s?\d|\bAI\d+",
    re.IGNORECASE,
)
# 簡體專用字（出現兩個以上視為簡體中文影片並排除）
SIMPLIFIED_CHARS = set("这们说为时会对发过还进个来么国学习视频应开关样经历书车东间听读写观点头脑电图实现数据网络软")
EMOJI_PATTERN = re.compile(r"[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200d]+")

NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
    "media": "http://search.yahoo.com/mrss/",
}


def http_get(url: str, timeout: int = 15) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def extract_initial_data(html: str) -> dict[str, Any] | None:
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
    if not m:
        return None
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        return None


def resolve_channel_id(query: str) -> str | None:
    """以頻道搜尋結果的第一筆取得 channelId。"""
    url = ("https://www.youtube.com/results?search_query="
           f"{urllib.parse.quote(query)}&sp=EgIQAg%253D%253D")
    data = extract_initial_data(http_get(url))
    if not data:
        return None
    sections = (data.get("contents", {}).get("twoColumnSearchResultsRenderer", {})
                .get("primaryContents", {}).get("sectionListRenderer", {}).get("contents", []))
    for section in sections:
        for item in section.get("itemSectionRenderer", {}).get("contents", []):
            if "channelRenderer" in item:
                return item["channelRenderer"].get("channelId")
    return None


def fetch_rss(channel_id: str) -> tuple[str, list[dict[str, Any]]]:
    xml_text = http_get(f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}")
    root = ET.fromstring(xml_text)
    feed_title = root.findtext("atom:title", default="", namespaces=NS)
    entries: list[dict[str, Any]] = []
    for entry in root.findall("atom:entry", NS):
        vid = entry.findtext("yt:videoId", default="", namespaces=NS)
        title = entry.findtext("atom:title", default="", namespaces=NS)
        published = entry.findtext("atom:published", default="", namespaces=NS)
        group = entry.find("media:group", NS)
        desc = ""
        views = 0
        if group is not None:
            desc = group.findtext("media:description", default="", namespaces=NS) or ""
            stats = group.find("media:community/media:statistics", NS)
            if stats is not None:
                try:
                    views = int(stats.get("views", "0"))
                except ValueError:
                    views = 0
        if vid and title and published:
            entries.append({"youtubeId": vid, "title": title, "published": published,
                            "description": desc, "views": views})
    return feed_title, entries


def fetch_video_tab_durations(channel_id: str) -> dict[str, str] | None:
    """回傳一般影片（非 Shorts / 直播）的 {videoId: 長度}；失敗時回傳 None。"""
    try:
        data = extract_initial_data(http_get(f"https://www.youtube.com/channel/{channel_id}/videos"))
    except Exception:
        return None
    if not data:
        return None
    durations: dict[str, str] = {}
    tabs = data.get("contents", {}).get("twoColumnBrowseResultsRenderer", {}).get("tabs", [])
    for tab in tabs:
        content = tab.get("tabRenderer", {}).get("content", {})
        for item in content.get("richGridRenderer", {}).get("contents", []):
            lvm = item.get("richItemRenderer", {}).get("content", {}).get("lockupViewModel", {})
            vid = lvm.get("contentId")
            if not vid:
                continue
            dur = ""
            overlays = lvm.get("contentImage", {}).get("thumbnailViewModel", {}).get("overlays", [])
            for ov in overlays:
                for badge in ov.get("thumbnailBottomOverlayViewModel", {}).get("badges", []):
                    text = badge.get("thumbnailBadgeViewModel", {}).get("text", "")
                    if text:
                        dur = text
            durations[vid] = dur
    return durations or None


def is_ai_related(title: str) -> bool:
    """標題需命中 AI 關鍵字；排除「免 AI」「不用 AI」等反向語意。"""
    stripped = re.sub(r"(免|不用|不靠|無需|不需)\s?AI", "", title, flags=re.IGNORECASE)
    return bool(AI_PATTERN.search(stripped))


def is_simplified(text: str) -> bool:
    return sum(1 for ch in text if ch in SIMPLIFIED_CHARS) >= 2


def clean_text(text: str) -> str:
    text = EMOJI_PATTERN.sub("", text)
    text = re.sub(r"\s*#[\w\u4e00-\u9fff]+", "", text)
    return re.sub(r"\s{2,}", " ", text).strip()


def summarize(desc: str) -> str:
    lines = [clean_text(l) for l in desc.splitlines()]
    lines = [l for l in lines if l and not l.startswith("http") and "http" not in l]
    text = " ".join(lines)
    return (text[:110] + "...") if len(text) > 110 else text


def load_previous() -> dict[str, Any]:
    if JSON_OUT.exists():
        try:
            return json.loads(JSON_OUT.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass
    return {"channels": [], "videos": []}


def main() -> int:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    previous = load_previous()
    prev_videos_by_channel: dict[str, list[dict[str, Any]]] = {}
    for v in previous.get("videos", []):
        prev_videos_by_channel.setdefault(v.get("channelKey", ""), []).append(v)

    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=KEEP_DAYS)
    channels_out: list[dict[str, Any]] = []
    videos_out: list[dict[str, Any]] = []
    ok_count = 0

    for ch in config["channels"]:
        key = ch["id"]
        channel_id = ch.get("channelId") or ""
        ch_videos: list[dict[str, Any]] = []
        status = "ok"
        try:
            if not channel_id:
                channel_id = resolve_channel_id(ch["query"]) or ""
                print(f"[INFO] {ch['name']} 自動解析 channelId = {channel_id}")
            if not channel_id:
                raise RuntimeError("找不到 channelId")
            feed_title, entries = fetch_rss(channel_id)
            durations = fetch_video_tab_durations(channel_id)

            for e in entries:
                if durations is not None and e["youtubeId"] not in durations:
                    continue  # Shorts 或直播片段
                title = clean_text(e["title"])
                if not is_ai_related(title) or is_simplified(title):
                    continue
                published = datetime.fromisoformat(e["published"].replace("Z", "+00:00"))
                if published < cutoff:
                    continue
                ch_type = ch.get("type", "mixed")
                if ch_type == "tutorial":
                    category = "tutorial"
                elif ch_type == "news":
                    category = "news"
                else:
                    category = "tutorial" if TUTORIAL_PATTERN.search(title) else "news"
                ch_videos.append({
                    "id": e["youtubeId"],
                    "youtubeId": e["youtubeId"],
                    "title": title,
                    "channelKey": key,
                    "channelName": ch["name"],
                    "published": published.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
                    "duration": (durations or {}).get(e["youtubeId"], ""),
                    "views": e["views"],
                    "category": category,
                    "summary": summarize(e["description"]),
                })
            ch_videos.sort(key=lambda v: v["published"], reverse=True)
            ch_videos = ch_videos[:MAX_PER_CHANNEL]
            ok_count += 1
            print(f"[OK]  {ch['name']} ({feed_title}) -> AI 相關影片 {len(ch_videos)} 部")
        except Exception as exc:  # noqa: BLE001
            status = "stale"
            ch_videos = prev_videos_by_channel.get(key, [])
            print(f"[WARN] {ch['name']} 同步失敗：{exc}；沿用上次資料 {len(ch_videos)} 部")

        videos_out.extend(ch_videos)
        channels_out.append({
            "id": key,
            "name": ch["name"],
            "channelId": channel_id,
            "url": f"https://www.youtube.com/channel/{channel_id}" if channel_id else "",
            "type": ch.get("type", "news"),
            "tag": ch.get("tag", ""),
            "desc": ch.get("desc", ""),
            "status": status,
            "videoCount": len(ch_videos),
            "latestPublished": ch_videos[0]["published"] if ch_videos else "",
        })

    if ok_count == 0 and previous.get("videos"):
        print("[ERROR] 所有頻道皆同步失敗，保留原資料不覆寫。")
        return 0

    videos_out.sort(key=lambda v: v["published"], reverse=True)
    output = {
        "metadata": {
            "version": "5.0.0",
            "generatedAt": now.isoformat().replace("+00:00", "Z"),
            "scope": "繁體中文 AI 最新資訊與 AI 教學",
            "syncIntervalHours": 6,
            "totalVideos": len(videos_out),
        },
        "channels": channels_out,
        "videos": videos_out,
    }

    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(output, ensure_ascii=False, indent=2)
    JSON_OUT.write_text(payload + "\n", encoding="utf-8")
    JS_OUT.write_text(
        "/**\n * 主題四 YouTube AI 影音中樞離線備援資料（由 src/sync_youtube_channels.py 自動產生，請勿手動修改）\n"
        " * 前端會優先讀取 data/youtube_ai.json 的最新同步結果。\n */\n"
        f"window.YOUTUBE_AI_CURATED_DATA = {payload};\n",
        encoding="utf-8",
    )
    print(f"[DONE] 共 {len(channels_out)} 個頻道、{len(videos_out)} 部 AI 影片，已寫入 {JSON_OUT.name} 與 {JS_OUT.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
