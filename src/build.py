"""後端與自動化建置腳本 (Python 3.11+)。

負責驗證前端靜態資源規範（如檢查是否含 Inline CSS、相對路徑檢查），
並自動將 public/index.html 複製為 public/404.html 以支援 GitHub Pages 路由。
"""

from __future__ import annotations

import argparse
import base64
import http.server
import json
import os
import re
import shutil
import socketserver
import subprocess
import sys
import tempfile
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
        "name": "01. 企業級 AI 簡報提示詞產製器 V5",
        "rel_path": "PPT_PROMPT_PRODUCE_V5.py",
        "work_dir": "",
        "category": "AI 簡報提示詞",
    },
    "pic_t_png": {
        "name": "02. 圖片批次轉無損 PNG 與 2x 放大銳化",
        "rel_path": "pic_t_png.py",
        "work_dir": "",
        "category": "圖片清晰放大",
    },
    "vedio_produce_v592": {
        "name": "05. 簡報智慧講稿與教學影片產製 V5.9.2",
        "rel_path": r"Vedio_produce_v5\Vedio_produce_v5.9.2_EDGETTS.py",
        "work_dir": "Vedio_produce_v5",
        "category": "簡報講稿與影片",
    },
    "pdf_oneforall": {
        "name": "07. PDF 時間序批次合併與高倍率壓縮",
        "rel_path": "pdf_oneforall.py",
        "work_dir": "",
        "category": "PDF 合併與壓縮",
    },
    "pdf_voice": {
        "name": "08. 文稿轉自然語音 MP3 朗讀產製器",
        "rel_path": "pdf_voice.py",
        "work_dir": "",
        "category": "文稿轉語音 MP3",
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
    """啟動本地端靜態網頁預覽伺服器，並提供網頁端直接合成語音與輔助端點。"""
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
            content_len = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_len) if content_len > 0 else b"{}"
            try:
                data = json.loads(raw_body.decode("utf-8"))
            except Exception:
                self.send_json(400, {"ok": False, "message": "無效的 JSON 請求格式。"})
                return

            if self.path == "/api/rpa/tts":
                text = str(data.get("text", "")).strip()
                voice = str(data.get("voice", "zh-TW-HsiaoChenNeural")).strip()
                rate = str(data.get("rate", "+0%")).strip()
                if not text:
                    self.send_json(400, {"ok": False, "message": "文稿內容不可為空。"})
                    return

                python_exe = resolve_rpa_python_executable()
                with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp_mp3:
                    tmp_mp3_path = Path(tmp_mp3.name)
                with tempfile.NamedTemporaryFile(suffix=".txt", delete=False, mode="w", encoding="utf-8") as tmp_txt:
                    tmp_txt.write(text)
                    tmp_txt_path = Path(tmp_txt.name)

                inline_code = (
                    "import asyncio, sys, pathlib, edge_tts; "
                    "txt = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'); "
                    "comm = edge_tts.Communicate(txt, sys.argv[2], rate=sys.argv[3]); "
                    "asyncio.run(comm.save(sys.argv[4]))"
                )
                try:
                    proc = subprocess.run(
                        [str(python_exe), "-c", inline_code, str(tmp_txt_path), voice, rate, str(tmp_mp3_path)],
                        capture_output=True,
                        text=True,
                        timeout=90,
                    )
                    if proc.returncode == 0 and tmp_mp3_path.exists() and tmp_mp3_path.stat().st_size > 0:
                        mp3_b64 = base64.b64encode(tmp_mp3_path.read_bytes()).decode("ascii")
                        self.send_json(200, {"ok": True, "audio_base64": mp3_b64, "voice": voice})
                    else:
                        self.send_json(500, {"ok": False, "message": f"語音合成失敗：{proc.stderr}"})
                except Exception as exc:
                    self.send_json(500, {"ok": False, "message": f"語音合成異常：{exc}"})
                finally:
                    tmp_txt_path.unlink(missing_ok=True)
                    tmp_mp3_path.unlink(missing_ok=True)
                return

            if self.path == "/api/rpa/launch":
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
                            "message": f"已啟動「{meta['name']}」！",
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

    # 自動同步三大工作目錄知識庫 (AI、資安、Python/RPA)
    try:
        from sync_knowledge import main as sync_knowledge_main
        sync_knowledge_main()
    except Exception as exc:
        print(f"[警告] 知識庫自動同步遭遇異常：{exc}")

    if args.serve:
        serve_local(port=args.port)

    return 0


if __name__ == "__main__":
    sys.exit(main())

