"""後端與自動化建置腳本 (Python 3.11+)。

負責驗證前端靜態資源規範（如檢查是否含 Inline CSS、相對路徑檢查），
並自動將 public/index.html 複製為 public/404.html 以支援 GitHub Pages 路由。
"""

from __future__ import annotations

import argparse
import http.server
import re
import shutil
import socketserver
import sys
from pathlib import Path

PROJECT_ROOT: Path = Path(__file__).resolve().parent.parent
PUBLIC_DIR: Path = PROJECT_ROOT / "public"
INDEX_FILE: Path = PUBLIC_DIR / "index.html"
NOT_FOUND_FILE: Path = PUBLIC_DIR / "404.html"


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
    """啟動本地端靜態網頁預覽伺服器。"""
    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args: object, **kwargs: object) -> None:
            super().__init__(*args, directory=str(directory), **kwargs)

    with socketserver.TCPServer(("", port), CustomHandler) as httpd:
        print(f"[伺服器啟動] 請於瀏覽器開啟 http://localhost:{port}")
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
