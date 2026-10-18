"""後端與自動化建置腳本 (Python 3.11+)。

負責驗證前端靜態資源規範（如檢查是否含 Inline CSS、相對路徑檢查），
並自動將 public/index.html 複製為 public/404.html 以支援 GitHub Pages 路由。
"""

from __future__ import annotations

import argparse
import http.server
import json
import os
import re
import shutil
import socketserver
import subprocess
import sys
from pathlib import Path
from typing import Any

PROJECT_ROOT: Path = Path(__file__).resolve().parent.parent
PUBLIC_DIR: Path = PROJECT_ROOT / "public"
INDEX_FILE: Path = PUBLIC_DIR / "index.html"
NOT_FOUND_FILE: Path = PUBLIC_DIR / "404.html"

# 本機 Python RPA 工具箱原始目錄（僅於本機端存取，絕不複製敏感金鑰至公開目錄）
RPA_BACKUP_ROOT: Path = Path(r"G:\其他電腦\我的電腦\dwonload\程式相關_Python\backup\爸爸\python")

RPA_TOOL_REGISTRY: dict[str, dict[str, str]] = {
    "ppt_prompt_v5": {
        "name": "企業級 AI 簡報提示詞產製器 V5 (PPT_PROMPT_PRODUCE_V5.py)",
        "rel_path": "PPT_PROMPT_PRODUCE_V5.py",
        "work_dir": "",
        "category": "AI 簡報與知識轉譯",
    },
    "vedio_produce_v592": {
        "name": "PPT 智慧講稿與教學影片產製系統 V5.9.2 Edge-TTS 版",
        "rel_path": r"Vedio_produce_v5\Vedio_produce_v5.9.2_EDGETTS.py",
        "work_dir": "Vedio_produce_v5",
        "category": "AI 影音合成與自動化",
    },
    "vedio_produce_v62": {
        "name": "PPT 智慧講稿與教學影片產製系統 V6.2 雙語音引擎旗艦版",
        "rel_path": r"Vedio_produce_v5\code\Vedio_produce_v6_2.py",
        "work_dir": "Vedio_produce_v5",
        "category": "AI 影音合成與自動化",
    },
    "pdf_oneforall": {
        "name": "PDF 時間序批次合併與高倍率壓縮工具 (pdf_oneforall.py)",
        "rel_path": "pdf_oneforall.py",
        "work_dir": "",
        "category": "文件與語音自動化",
    },
    "pdf_voice": {
        "name": "文稿轉自然語音 MP3 朗讀產製器 (pdf_voice.py)",
        "rel_path": "pdf_voice.py",
        "work_dir": "",
        "category": "文件與語音自動化",
    },
    "pic_t_png": {
        "name": "圖片批次轉無損 PNG 與 2x 放大銳化工具 (pic_t_png.py)",
        "rel_path": "pic_t_png.py",
        "work_dir": "",
        "category": "影像與音訊批次處理",
    },
    "video_audio_replacer": {
        "name": "影片音軌替換與結尾掌聲自動拼接工具 V3 (video_audio_replacer_ffmpeg.py)",
        "rel_path": "video_audio_replacer_ffmpeg.py",
        "work_dir": "",
        "category": "AI 影音合成與自動化",
    },
    "batch_deal_wav": {
        "name": "GPT-SoVITS 訓練語音 WAV 批次安全限幅處理器 (batch_deal_wavfile.py)",
        "rel_path": r"Vedio_produce_v5\batch_deal_wavfile.py",
        "work_dir": "Vedio_produce_v5",
        "category": "影像與音訊批次處理",
    },
    "s2twp_list": {
        "name": "GPT-SoVITS 標註檔 (.list) 簡轉繁工具 (simplified_tran_traditional.py)",
        "rel_path": r"Vedio_produce_v5\simplified_tran_traditional.py",
        "work_dir": "Vedio_produce_v5",
        "category": "影像與音訊批次處理",
    },
    "line_race_chart": {
        "name": "動態發光折線競賽圖產生器 (line_race_chart_output.py)",
        "rel_path": "line_race_chart_output.py",
        "work_dir": "",
        "category": "數據視覺化動畫",
    },
}


def resolve_rpa_python_executable() -> Path:
    """優先使用備份目錄內的 .venv Python 解譯器，若不存在則回退至當前系統 Python。"""
    venv_py = RPA_BACKUP_ROOT / ".venv" / "Scripts" / "python.exe"
    if venv_py.exists():
        return venv_py
    return Path(sys.executable)


def get_rpa_status_payload() -> dict[str, Any]:
    """回傳本機 Python RPA 目錄與各工具檔案的存在狀態。"""
    root_exists = RPA_BACKUP_ROOT.exists()
    python_exe = resolve_rpa_python_executable()
    tools_status: dict[str, dict[str, Any]] = {}

    for tool_id, meta in RPA_TOOL_REGISTRY.items():
        script_path = RPA_BACKUP_ROOT / meta["rel_path"]
        tools_status[tool_id] = {
            "id": tool_id,
            "name": meta["name"],
            "category": meta["category"],
            "rel_path": meta["rel_path"],
            "exists": script_path.exists() if root_exists else False,
        }

    return {
        "ok": True,
        "bridge_mode": "local_python_rpa_bridge",
        "backup_root": str(RPA_BACKUP_ROOT),
        "root_exists": root_exists,
        "python_exe": str(python_exe),
        "tools": tools_status,
    }


def sync_404_page(index_path: Path = INDEX_FILE, target_404_path: Path = NOT_FOUND_FILE) -> bool:
    """將 index.html 複製為 404.html，確保 GitHub Pages 重新整理或路由時正常運作。"""
    if not index_path.exists():
        print(f"[錯誤] 找不到來源檔案：{index_path}", file=sys.stderr)
        return False

    shutil.copy2(index_path, target_404_path)
    print(f"[完成] 已同步建立 404 頁面：{target_404_path}")
    return True


def validate_no_inline_css(directory: Path = PUBLIC_DIR) -> bool:
    """檢查 public 目錄下所有 HTML 檔案是否嚴格遵守無 Inline CSS 規範。"""
    inline_style_pattern = re.compile(r"\bstyle\s*=\s*['\"]", re.IGNORECASE)
    style_tag_pattern = re.compile(r"<\s*style\b", re.IGNORECASE)
    has_violation = False

    for html_file in directory.rglob("*.html"):
        content = html_file.read_text(encoding="utf-8")
        if inline_style_pattern.search(content) or style_tag_pattern.search(content):
            print(f"[警告] 偵測到 Inline CSS 違規：{html_file}", file=sys.stderr)
            has_violation = True

    if not has_violation:
        print("[驗證通過] 所有 HTML 檔案皆無使用 Inline CSS。")
    return not has_violation


def serve_local(port: int = 8000, directory: Path = PUBLIC_DIR) -> None:
    """啟動本地端靜態網頁預覽伺服器，並提供僅限本機 (127.0.0.1) 的 Python RPA 啟動橋接端點。"""
    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args: object, **kwargs: object) -> None:
            super().__init__(*args, directory=str(directory), **kwargs)

        def send_json(self, status_code: int, payload: dict[str, Any]) -> None:
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status_code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self) -> None:
            if self.path.startswith("/api/rpa/status"):
                self.send_json(200, get_rpa_status_payload())
                return
            super().do_GET()

        def do_POST(self) -> None:
            if self.path == "/api/rpa/launch":
                content_len = int(self.headers.get("Content-Length", "0"))
                raw_body = self.rfile.read(content_len) if content_len > 0 else b"{}"
                try:
                    data = json.loads(raw_body.decode("utf-8"))
                except Exception:
                    self.send_json(400, {"ok": False, "message": "無效的 JSON 請求格式。"})
                    return

                action = str(data.get("action", "launch_tool"))
                if action == "open_folder":
                    sub_dir = str(data.get("sub_dir", "")).strip()
                    target_dir = RPA_BACKUP_ROOT / sub_dir if sub_dir else RPA_BACKUP_ROOT
                    if not target_dir.exists():
                        self.send_json(404, {"ok": False, "message": f"找不到本機資料夾：{target_dir}"})
                        return
                    if sys.platform.startswith("win"):
                        os.startfile(str(target_dir))
                    self.send_json(200, {"ok": True, "message": f"已為您開啟本機資料夾：{target_dir}"})
                    return

                tool_id = str(data.get("tool_id", "")).strip()
                if tool_id not in RPA_TOOL_REGISTRY:
                    self.send_json(404, {"ok": False, "message": f"未知的工具代碼：{tool_id}"})
                    return

                meta = RPA_TOOL_REGISTRY[tool_id]
                script_path = RPA_BACKUP_ROOT / meta["rel_path"]
                work_dir = RPA_BACKUP_ROOT / meta["work_dir"] if meta["work_dir"] else RPA_BACKUP_ROOT

                if not script_path.exists():
                    self.send_json(404, {"ok": False, "message": f"找不到腳本檔案：{script_path}"})
                    return

                python_exe = resolve_rpa_python_executable()
                try:
                    creation_flags = subprocess.CREATE_NEW_CONSOLE if sys.platform.startswith("win") else 0
                    subprocess.Popen(
                        [str(python_exe), str(script_path)],
                        cwd=str(work_dir),
                        creationflags=creation_flags,
                    )
                    self.send_json(
                        200,
                        {
                            "ok": True,
                            "tool_id": tool_id,
                            "message": f"已於本機啟動「{meta['name']}」視窗程式！請查看桌面彈出視窗。",
                        },
                    )
                except Exception as exc:
                    self.send_json(500, {"ok": False, "message": f"啟動失敗：{exc}"})
                return

            self.send_json(404, {"ok": False, "message": "不支援的 API 路徑。"})

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", port), CustomHandler) as httpd:
        print(f"[伺服器啟動] 請於瀏覽器開啟 http://localhost:{port} (已啟用本機 Python RPA 橋接服務)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[伺服器關閉] 已停止本地預覽。")


def main() -> int:
    """主程式入口。"""
    parser = argparse.ArgumentParser(description="AERO-NEXUS 靜態網頁打包與驗證工具")
    parser.add_argument(
        "--serve",
        action="store_true",
        help="完成驗證與同步後啟動本地端預覽伺服器",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="指定本地端預覽伺服器連接埠 (預設: 8000)",
    )
    args = parser.parse_args()

    if not sync_404_page():
        return 1

    if not validate_no_inline_css():
        return 1

    if args.serve:
        serve_local(port=args.port)

    return 0


if __name__ == "__main__":
    sys.exit(main())

