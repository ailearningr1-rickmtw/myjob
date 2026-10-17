---
# 全局 AI 代理設定
language: "zh-TW"           # 預設溝通語言依舊維持繁體中文
always_on: true             # 每次啟動自動載入
temperature: 0.2            
---

# 🤖 Antigravity 2.0 混合專案行為準則 (Rules)

## 🌐 1. 溝通與回應規範
* **語言限制**：一律使用**繁體中文（台灣，zh-TW）**進行回應與撰寫註解、文件。
* **格式要求**：嚴禁使用任何表情符號（Emojis）。

## 💻 2. 程式語言與技術疊棧 (Tech Stack)
本專案為混合型專案，AI 必須根據檔案類型自動切換語言規範：
* **後端 / 自動化**：預設為 **Python 3.11+**。須遵循 PEP 8 與 Type Hints 規範。
* **網頁前端**：預設為 **HTML5 / CSS3 / JavaScript (ES6+)**（或你常用的框架如 React/Vue）。
  * 撰寫網頁時，程式碼必須是**純靜態（Static）**或可編譯為靜態檔案，以相容 GitHub Pages。
  * 嚴禁在 HTML 中使用 Inline CSS，樣式一律獨立。

## 🏗️ 3. 專案架構規範
專案目錄必須嚴格劃分，避免程式碼混雜：
* `src/`：存放 Python 後端程式碼。
* `public/` (或 `dist/`)：存放網頁前端的所有靜態資源（`index.html`、CSS、JS、圖片）。
* 所有網頁內連結必須使用**相對路徑**，確保在 GitHub Pages 的子路徑下（`username.github.io/repo/`）能正常讀取資源。

## 🚀 4. GitHub Pages 部署規範
當要求 AI 代理建立部署或更新網頁時，必須遵循以下自動化流程：
* **工作流自動化**：網頁部署一律透過 **GitHub Actions** 處理。
* **CI/CD 設定**：任何網頁變更，AI 必須確保 `.github/workflows/deploy.yml` 檔案正確無誤，並設定在 `push` 至 `main` 分支時自動觸發部署。
* **404 處理**：建立前端路由時，必須在打包目錄下複製一份 `index.html` 並命名為 `404.html`，以防 GitHub Pages 重新整理時失效。
