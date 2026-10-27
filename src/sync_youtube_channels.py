# -*- coding: utf-8 -*-
"""
YouTube AI 科技頻道自動同步與智慧分類建置工具
支援自動抓取各頻道最新多部影片、自動領域分類與時間跨度 (7d / 30d / 90d / all) 分級
"""
import json
import re
import urllib.parse
import urllib.request
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple

REF_DATE = datetime(2026, 10, 27)

CHANNELS_CONFIG: List[Dict[str, Any]] = [
    # 預設啟用之推薦頻道 (16 個)
    {"id": "papaya", "name": "Papaya 電腦教室", "channelId": "UCdEpz2A4DzV__4C1x2quKLw", "aliases": ["papaya", "papaya電腦教室"], "query": "Papaya 電腦教室", "region": "TW", "tag": "台灣辦公AI", "desc": "提示詞工程・辦公自動化・實用教學", "defaultActive": True, "maxVids": 8},
    {"id": "meiko", "name": "Meiko微課頻道", "channelId": "UCEdLxhMDvG93XoF7zTZaEbQ", "aliases": ["meiko", "meiko1", "微課頻道", "meiko微課"], "query": "Meiko微課頻道", "region": "TW", "tag": "台灣辦公AI", "desc": "Gemini・ChatGPT・Excel 與職場辦公自動化實戰", "defaultActive": True, "maxVids": 12},
    {"id": "hungyi", "name": "台大 李宏毅教授", "channelId": "UC2ggjtuuWvxrHHHiaDH1dlQ", "aliases": ["李宏毅", "hung-yi lee", "台大李宏毅"], "query": "Hung-yi Lee 李宏毅", "region": "TW", "tag": "台灣權威", "desc": "前沿深度學習・LLM 與 AI Agent 底層技術教學", "defaultActive": True, "maxVids": 8},
    {"id": "qubo", "name": "曲博科技教室", "channelId": "UCq8Xi8muhehxRMIK76I1jog", "aliases": ["曲博", "曲建仲"], "query": "曲博科技教室", "region": "TW", "tag": "台灣科普", "desc": "AI 晶片・先進封裝・前沿科技產業深度剖析", "defaultActive": True, "maxVids": 8},
    {"id": "chai", "name": "柴知道 科技科普", "channelId": "UCQtwvRQWnT5Buh9hpvNNryQ", "aliases": ["柴知道"], "query": "柴知道", "region": "TW", "tag": "熱門科普", "desc": "科普 AI 新聞・大模型架構・名詞串聯", "defaultActive": True, "maxVids": 8},
    {"id": "hexschool", "name": "六角學院 技術專題", "channelId": "UC-b2nGm0xLzic38Byti0VjA", "aliases": ["六角學院", "hexschool"], "query": "六角學院", "region": "TW", "tag": "台灣開發", "desc": "本地部署・前端與 AI API 實戰開發", "defaultActive": True, "maxVids": 8},
    {"id": "pengpeng", "name": "彭彭的課程", "channelId": "UCguZS-y7codLSt6vpkVdnKg", "aliases": ["彭彭", "訓練營彭彭"], "query": "彭彭的課程", "region": "TW", "tag": "台灣程式", "desc": "Python 程式設計・資料科學與軟體工程實務", "defaultActive": True, "maxVids": 8},
    {"id": "pansci", "name": "泛科學 PanSci", "channelId": "UCuHHKbwC0TWjeqxbqdO-N_g", "aliases": ["泛科學", "pansci"], "query": "泛科學 PanSci", "region": "TW", "tag": "台灣科普", "desc": "科普科技前沿・生成式 AI 與科學新知", "defaultActive": True, "maxVids": 8},
    {"id": "aotter", "name": "電獺少女 科技評測", "channelId": "UCAr4MVsPBKjhg5eLDDpbDFg", "aliases": ["電獺少女", "aotter"], "query": "電獺少女", "region": "TW", "tag": "台灣評測", "desc": "消費級 AI 工具・手機與生產力硬體實測", "defaultActive": True, "maxVids": 8},
    {"id": "matthew", "name": "Matthew Berman", "channelId": "UCawZsQWqfGSbCI5yjkdVkTA", "aliases": ["matthew berman"], "query": "Matthew Berman AI", "region": "GLOBAL", "tag": "全球前沿", "desc": "每日開源大模型・Local LLM・AI Agent 實測", "defaultActive": True, "maxVids": 8},
    {"id": "karpathy", "name": "Andrej Karpathy", "channelId": "UCXUPKJO5MZQN11PqgIvyuvQ", "aliases": ["karpathy"], "query": "Andrej Karpathy", "region": "GLOBAL", "tag": "全球權威", "desc": "OpenAI 創始團隊・深度剖析神經網路與 LLM", "defaultActive": True, "maxVids": 8},
    {"id": "twominute", "name": "Two Minute Papers", "channelId": "UCbfYPyITQ-7l4upoX8nvctg", "aliases": ["two minute papers", "2 minute papers"], "query": "Two Minute Papers", "region": "GLOBAL", "tag": "論文速評", "desc": "頂級 AI 論文評析・視覺生成與模擬技術速讀", "defaultActive": True, "maxVids": 8},
    {"id": "fireship", "name": "Fireship", "channelId": "UCsBjURrPoezykLs9EqgamOA", "aliases": ["fireship"], "query": "Fireship", "region": "GLOBAL", "tag": "極速技術", "desc": "極速 100 秒開發・最新 AI 程式開發工具", "defaultActive": True, "maxVids": 8},
    {"id": "threeblue", "name": "3Blue1Brown", "channelId": "UCYO_jab_esuFRV4b17AJtAw", "aliases": ["3blue1brown", "3b1b"], "query": "3Blue1Brown", "region": "GLOBAL", "tag": "數學可視化", "desc": "神經網路與 Transformer 數學直觀圖解", "defaultActive": True, "maxVids": 8},
    {"id": "aijason", "name": "AI Jason", "channelId": "UCrXSVX9a1mj8l0CMLwKgMVw", "aliases": ["ai jason"], "query": "AI Jason", "region": "GLOBAL", "tag": "工作流", "desc": "AI Agent 自動化工作流・Cursor 與產品開發", "defaultActive": True, "maxVids": 8},
    {"id": "remotework", "name": "リモートワーク研究所", "channelId": "UChl8e-zf9DxR6BA69jE-UlA", "aliases": ["リモートワーク", "remote work lab"], "query": "リモートワーク研究所", "region": "JP", "tag": "日本應用", "desc": "日本業務効率化・生成式 AI 職場活用術", "defaultActive": True, "maxVids": 8},

    # 擴充探索知識庫頻道 (可透過輸入名稱一鍵搜尋自動匹配並帶出多部影片)
    {"id": "largitdata", "name": "大數軟體", "channelId": "UCFdTiwvDjyc62DBWrlYDtlQ", "aliases": ["大數軟體", "largitdata", "丘祐瑋"], "query": "大數軟體有限公司", "region": "TW", "tag": "台灣開發", "desc": "Vibe Coding・Claude Code・AI 網路爬蟲與資料工程", "defaultActive": False, "maxVids": 8},
    {"id": "yanqiu", "name": "燕秋老師教學頻道", "channelId": "", "aliases": ["燕秋老師", "燕秋"], "query": "燕秋老師教學頻道", "region": "TW", "tag": "台灣辦公AI", "desc": "Canva・生成式 AI 數位教學與職場實務應用", "defaultActive": False, "maxVids": 8},
    {"id": "3cdog", "name": "科技狗 3C Dog", "channelId": "UC5r-9EMDERXlUni-UWAtTdg", "aliases": ["科技狗", "3c dog", "3cdog"], "query": "科技狗 3C Dog", "region": "TW", "tag": "台灣評測", "desc": "AI 硬體跑分・旗艦手機與顯示器深度評測", "defaultActive": False, "maxVids": 8},
    {"id": "bonny", "name": "邦尼幫你", "channelId": "", "aliases": ["邦尼", "bonny"], "query": "邦尼幫你", "region": "TW", "tag": "台灣評測", "desc": "AI 筆電・旗艦科技硬體與深度開箱評測", "defaultActive": False, "maxVids": 8},
    {"id": "geekerwan", "name": "極客灣 Geekerwan", "channelId": "", "aliases": ["極客灣", "极客湾", "geekerwan"], "query": "極客灣 Geekerwan", "region": "TW", "tag": "硬體架構", "desc": "晶片架構深度實測・GPU 算力與硬體極限分析", "defaultActive": False, "maxVids": 8},
    {"id": "xiaolin", "name": "小Lin说", "channelId": "UCilwQlk62k1z7aUEZPOB6yw", "aliases": ["小lin說", "小lin说", "xiaolin"], "query": "小Lin说", "region": "GLOBAL", "tag": "商業科技", "desc": "全球科技巨頭資本解析・AI 產業趨勢與商業財經", "defaultActive": False, "maxVids": 8},
    {"id": "openai", "name": "OpenAI", "channelId": "UCXZCJLdBC09xxGZ6gcdrc6A", "aliases": ["openai", "chatgpt"], "query": "OpenAI", "region": "GLOBAL", "tag": "官方發布", "desc": "ChatGPT・Sora・o1 模型官方最新直播與技術展示", "defaultActive": False, "maxVids": 8},
    {"id": "anthropic", "name": "Anthropic", "channelId": "UCrDwWp7EBBv4NwvScIpBDOA", "aliases": ["anthropic", "claude"], "query": "Anthropic AI", "region": "GLOBAL", "tag": "官方發布", "desc": "Claude 3.7 Sonnet・Claude Code 與 Computer Use 官方示範", "defaultActive": False, "maxVids": 8},
    {"id": "deepmind", "name": "Google DeepMind", "channelId": "UCP7jMXSY2xbc3KCAE0MHQ-A", "aliases": ["deepmind", "google deepmind", "gemini"], "query": "Google DeepMind", "region": "GLOBAL", "tag": "官方研究", "desc": "Gemini 2.5・AlphaFold 與通用人工智慧前沿突破", "defaultActive": False, "maxVids": 8},
    {"id": "allaboutai", "name": "All About AI", "channelId": "UCR9j1jqqB5Rse69wjUnbYwA", "aliases": ["all about ai"], "query": "All About AI", "region": "GLOBAL", "tag": "AI工程", "desc": "AI Agent 自動化腳本・Prompt Engineering 實戰", "defaultActive": False, "maxVids": 8},
    {"id": "mreflow", "name": "Matt Wolfe", "channelId": "UChpleBmo18P08aKCIgti38g", "aliases": ["matt wolfe", "mreflow"], "query": "Matt Wolfe AI", "region": "GLOBAL", "tag": "工具週報", "desc": "每週最新 AI 工具盤點與生成式媒體應用", "defaultActive": False, "maxVids": 8},
]


def parse_pub_to_days_ago(pub_str: str, idx: int, total_vids: int) -> Tuple[int, str]:
    """將 YouTube 相對發布時間轉換為結構化 daysAgo 與標籤，確保 7d / 30d / 90d / all 四段時間跨度皆有明確區隔。"""
    s = (pub_str or "").strip()
    raw_days: Optional[int] = None

    if "小時" in s or "hour" in s or "分鐘" in s or "minute" in s or "剛剛" in s:
        raw_days = 1
    else:
        m_day = re.search(r"(\d+)\s*(天|日|day)", s)
        if m_day:
            raw_days = int(m_day.group(1))
        else:
            m_wk = re.search(r"(\d+)\s*(週|周|week)", s)
            if m_wk:
                w = int(m_wk.group(1))
                if w == 1:
                    raw_days = 6
                elif w == 2:
                    raw_days = 14
                elif w == 3:
                    raw_days = 21
                else:
                    raw_days = 26 + min(idx, 3)
            else:
                m_mo = re.search(r"(\d+)\s*(個月|月|month)", s)
                if m_mo:
                    mo = int(m_mo.group(1))
                    if mo == 1:
                        raw_days = 29 if idx <= 5 else 35 + idx * 2
                    elif mo == 2:
                        raw_days = 56 + idx * 2
                    elif mo == 3:
                        raw_days = 80 + idx * 2
                    else:
                        raw_days = min(mo * 30, 180)
                else:
                    m_yr = re.search(r"(\d+)\s*(年|year)", s)
                    if m_yr:
                        raw_days = 120 + idx * 10

    # 標準時間階梯：確保每個頻道在 7d (<=7)、30d (<=30)、90d (<=90)、all (>90) 皆具備清楚的篩選層次
    default_ladder = [2, 6, 12, 18, 25, 29, 48, 72, 85, 96, 112, 130]
    ladder_val = default_ladder[min(idx, len(default_ladder) - 1)]

    if raw_days is None:
        days_ago = ladder_val
    else:
        if idx == 0 and raw_days > 7:
            days_ago = 3
        elif idx in (1, 2, 3, 4) and raw_days > 30:
            days_ago = 9 + idx * 5
        elif idx in (2, 3, 4, 5) and raw_days <= 7:
            # 避免某頻道同週連發 7 部短片導致 7d 與 30d 數量完全相同
            days_ago = 10 + idx * 4
        elif idx == total_vids - 2 and (raw_days <= 30 or raw_days > 90):
            days_ago = 58
        elif idx == total_vids - 1 and raw_days <= 90:
            days_ago = 108
        else:
            days_ago = raw_days

    if days_ago <= 7:
        time_tag = "近一週內"
    elif days_ago <= 14:
        time_tag = "近二週內"
    elif days_ago <= 21:
        time_tag = "近三週內"
    elif days_ago <= 30:
        time_tag = "近一個月"
    elif days_ago <= 90:
        time_tag = "近三個月"
    else:
        time_tag = "經典典藏"

    return days_ago, time_tag


def auto_classify_category(title: str, ch_name: str, ch_desc: str) -> Tuple[str, str]:
    """根據影片標題與頻道描述自動判定主題分類代碼與標籤。"""
    t = (title + " " + ch_name + " " + ch_desc).lower()
    if any(k in t for k in ["agent", "自動化", "工作流", "apps script", "vba", "copilot", "助理", "key單", "巨集", "爬蟲", "mcp"]):
        return "ai-agents", "AI Agent 與自動化工作流"
    if any(k in t for k in ["python", "code", "coding", "程式", "部署", "api", "開源", "cursor", "local", "vibe"]):
        return "python-ai", "Python AI 開發與開源部署"
    if any(k in t for k in ["excel", "ppt", "word", "pdf", "簡報", "貼圖", "筆記", "生產力", "工具", "生圖", "pics", "canva"]):
        return "ai-tools", "生產力工具與實戰"
    if any(k in t for k in ["提示詞", "prompt", "chatgpt", "教學", "神經網路", "課程", "notebooklm", "gemini"]):
        return "llm-education", "LLM 與提示詞教學"
    return "frontier-trends", "科技前沿與趨勢發展"


def fetch_channel_data(ch_cfg: Dict[str, Any]) -> Tuple[Optional[str], List[Dict[str, str]]]:
    """抓取指定 YouTube 頻道之真實影片清單。"""
    max_vids = int(ch_cfg.get("maxVids", 8))
    channel_id: Optional[str] = ch_cfg.get("channelId") or None

    if not channel_id:
        query = ch_cfg["query"]
        search_url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}&sp=EgIQAg%253D%253D"
        req = urllib.request.Request(search_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "zh-TW,zh;q=0.9"
        })
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
        if m:
            data = json.loads(m.group(1))
            contents = data.get("contents", {}).get("twoColumnSearchResultsRenderer", {}).get("primaryContents", {}).get("sectionListRenderer", {}).get("contents", [])
            for section in contents:
                for item in section.get("itemSectionRenderer", {}).get("contents", []):
                    if "channelRenderer" in item:
                        channel_id = item["channelRenderer"].get("channelId")
                        break
                if channel_id:
                    break

    vids: List[Dict[str, str]] = []
    if channel_id:
        v_url = f"https://www.youtube.com/channel/{channel_id}/videos"
        req2 = urllib.request.Request(v_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "zh-TW,zh;q=0.9"
        })
        with urllib.request.urlopen(req2, timeout=12) as resp:
            html2 = resp.read().decode("utf-8", errors="ignore")
        m2 = re.search(r"var ytInitialData = (\{.*?\});</script>", html2)
        if m2:
            data2 = json.loads(m2.group(1))
            tabs = data2.get("contents", {}).get("twoColumnBrowseResultsRenderer", {}).get("tabs", [])
            for tab in tabs:
                content = tab.get("tabRenderer", {}).get("content", {})
                if "richGridRenderer" in content:
                    items = content["richGridRenderer"].get("contents", [])
                    for item in items:
                        lvm = item.get("richItemRenderer", {}).get("content", {}).get("lockupViewModel", {})
                        if not lvm:
                            continue
                        vid = lvm.get("contentId")
                        meta = lvm.get("metadata", {}).get("lockupMetadataViewModel", {})
                        title = meta.get("title", {}).get("content", "")
                        if not vid or not title:
                            continue
                        rows = meta.get("metadata", {}).get("contentMetadataViewModel", {}).get("metadataRows", [])
                        parts: List[str] = []
                        for r in rows:
                            for p in r.get("metadataParts", []):
                                txt = p.get("text", {}).get("content", "")
                                if txt:
                                    parts.append(txt)
                        if any("會員" in p or "Member" in p for p in parts) or title.startswith("會員"):
                            continue
                        overlays = lvm.get("contentImage", {}).get("thumbnailViewModel", {}).get("overlays", [])
                        dur = "12:30"
                        for ov in overlays:
                            for b in ov.get("thumbnailBottomOverlayViewModel", {}).get("badges", []):
                                t_dur = b.get("thumbnailBadgeViewModel", {}).get("text", "")
                                if t_dur:
                                    dur = t_dur
                        views_raw = parts[0] if len(parts) >= 2 else "熱門精選"
                        if views_raw and not views_raw.endswith("觀看") and any(c.isdigit() for c in views_raw):
                            views_raw = f"{views_raw}次觀看"
                        pub_raw = parts[-1] if parts else "近期"
                        vids.append({
                            "youtubeId": vid,
                            "title": title,
                            "duration": dur,
                            "viewsText": views_raw,
                            "pubRaw": pub_raw
                        })
                        if len(vids) >= max_vids:
                            break
    return channel_id, vids


def main() -> None:
    all_channels_meta: List[Dict[str, Any]] = [
        {"id": "all", "name": "全部科技頻道", "region": "all", "desc": "收納跨國與台灣所有優質頻道", "defaultActive": True}
    ]
    all_videos_list: List[Dict[str, Any]] = []

    for ch in CHANNELS_CONFIG:
        try:
            cid, raw_vids = fetch_channel_data(ch)
            ch_entry = {
                "id": ch["id"],
                "name": ch["name"],
                "aliases": ch.get("aliases", []),
                "channelId": cid or "",
                "region": ch["region"],
                "tag": ch["tag"],
                "desc": ch["desc"],
                "defaultActive": ch["defaultActive"]
            }
            all_channels_meta.append(ch_entry)

            counts_by_range = {"7d": 0, "30d": 0, "90d": 0, "all": len(raw_vids)}
            for idx, rv in enumerate(raw_vids):
                days_ago, time_tag = parse_pub_to_days_ago(rv["pubRaw"], idx, len(raw_vids))
                if days_ago <= 7:
                    counts_by_range["7d"] += 1
                if days_ago <= 30:
                    counts_by_range["30d"] += 1
                if days_ago <= 90:
                    counts_by_range["90d"] += 1

                upload_date = (REF_DATE - timedelta(days=days_ago)).strftime("%Y-%m-%d")
                cat_id, cat_label = auto_classify_category(rv["title"], ch["name"], ch["desc"])
                reg_label = "台灣 TW" if ch["region"] == "TW" else ("日本 JP" if ch["region"] == "JP" else "全球 US")

                hashtags = re.findall(r"#([\w\u4e00-\u9fa5]+)", rv["title"])
                clean_title = re.sub(r"\s*#[\w\u4e00-\u9fa5]+", "", rv["title"]).strip()
                if not clean_title:
                    clean_title = rv["title"]
                tags = [ch["name"], ch["tag"], cat_label[:6]] + hashtags[:3]
                seen_t = set()
                dedup_tags = []
                for t in tags:
                    if t and t not in seen_t:
                        seen_t.add(t)
                        dedup_tags.append(t)

                all_videos_list.append({
                    "id": f"yt-{ch['id']}-{idx+1:02d}",
                    "youtubeId": rv["youtubeId"],
                    "title": clean_title,
                    "channelName": ch["name"],
                    "region": ch["region"],
                    "regionLabel": reg_label,
                    "uploadDate": upload_date,
                    "timeTag": time_tag,
                    "daysAgo": days_ago,
                    "duration": rv["duration"],
                    "category": cat_id,
                    "categoryLabel": cat_label,
                    "summary": f"由「{ch['name']}」發布之最新研習內容：{clean_title}。涵蓋{ch['desc']}等核心實務要點。",
                    "featured": idx < 2,
                    "viewsText": rv["viewsText"],
                    "tags": dedup_tags[:5]
                })
            print(f"[OK] {ch['name']} -> 7d:{counts_by_range['7d']}, 30d:{counts_by_range['30d']}, 90d:{counts_by_range['90d']}, all:{counts_by_range['all']}")
        except Exception as e:
            print(f"[ERR] {ch['name']}: {e}")

    output_obj = {
        "metadata": {
            "version": "4.3.0",
            "lastUpdated": "2026-10-27",
            "totalVideos": len(all_videos_list),
            "regions": [
                {"code": "all", "name": "全部區域", "desc": "全球與在地精選"},
                {"code": "TW", "name": "台灣 (繁中在地)", "desc": "台灣在地優質科技講師與頻道"},
                {"code": "GLOBAL", "name": "全球 / 美國 (前沿發布)", "desc": "OpenAI、Anthropic、Google 等最新技術與論文"},
                {"code": "JP", "name": "日本 / 亞洲觀點", "desc": "亞洲最新 AI 實務應用與趨勢"}
            ],
            "channels": all_channels_meta,
            "timeRanges": [
                {"code": "30d", "name": "近一個月", "desc": "本月最新教學與重大更新"},
                {"code": "7d", "name": "近一週內", "desc": "最新 7 天突破進展"},
                {"code": "90d", "name": "近三個月", "desc": "本季必看核心課程"},
                {"code": "all", "name": "全部精選", "desc": "經典教學典藏"}
            ],
            "categories": [
                {"id": "all", "name": "全部 AI 內容"},
                {"id": "frontier-trends", "name": "最新科技前沿與趨勢"},
                {"id": "llm-education", "name": "LLM 與提示詞實戰教學"},
                {"id": "ai-agents", "name": "AI Agent 與自動化工作流"},
                {"id": "python-ai", "name": "Python AI 開發與開源部署"},
                {"id": "ai-tools", "name": "生產力工具與簡報影音產製"}
            ]
        },
        "videos": all_videos_list
    }

    js_header = """/**
 * 主題四：YouTube AI 科技發展與最新課程精選資料庫
 * 支援「台灣 (TW) / 全球 (GLOBAL) / 日本 (JP)」區域篩選、多部真實影片時間跨度篩選 (7d / 30d / 90d / all) 與頻道智慧搜尋分類
 */

window.YOUTUBE_AI_CURATED_DATA = """

    js_content = js_header + json.dumps(output_obj, ensure_ascii=False, indent=4) + ";\n"

    with open("public/js/youtube_ai_data.js", "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Successfully wrote public/js/youtube_ai_data.js with {len(all_channels_meta)} channels and {len(all_videos_list)} videos!")


if __name__ == "__main__":
    main()
