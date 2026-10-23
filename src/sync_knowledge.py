"""知識庫自動同步引擎 (Python 3.11+)。

負責定期或依需求掃描三大主要工作目錄：
1. g:\\其他電腦\\我的電腦\\dwonload\\AI
2. g:\\我的雲端硬碟\\資安
3. g:\\我的雲端硬碟\\程式相關_Python

自動萃取目錄結構、檔案資訊、分類標籤、關聯流程圖與詳細說明，
產生 public/data/knowledge.json 與 public/js/knowledge_data.js 供純靜態網頁秒開。
"""

from __future__ import annotations

import datetime
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, List

# 專案路徑設定
PROJECT_ROOT: Path = Path(__file__).resolve().parent.parent
PUBLIC_DATA_DIR: Path = PROJECT_ROOT / "public" / "data"
PUBLIC_JS_DIR: Path = PROJECT_ROOT / "public" / "js"
OUTPUT_JSON_PATH: Path = PUBLIC_DATA_DIR / "knowledge.json"
OUTPUT_JS_PATH: Path = PUBLIC_JS_DIR / "knowledge_data.js"

# 三大主要工作目錄路徑
KNOWLEDGE_ROOTS: Dict[str, Path] = {
    "ai": Path(r"G:\其他電腦\我的電腦\dwonload\AI"),
    "security": Path(r"G:\我的雲端硬碟\資安"),
    "python": Path(r"G:\我的雲端硬碟\程式相關_Python"),
}

# 領域中文名稱與描述
DOMAIN_CONFIG: Dict[str, Dict[str, str]] = {
    "ai": {
        "title": "AI 前瞻技術與應用研發",
        "code": "SEC-AI",
        "description": "涵蓋 LLM 提示詞工程 (Prompt Engineering)、多模態簡報與影音自動化產製、Gemini 模型整合實務及前瞻 AI 自主代理架構。",
        "badgeColor": "#0ea5e9",
    },
    "security": {
        "title": "資安規範與 ISMS/PIMS 體系管理",
        "code": "SEC-GOV",
        "description": "涵蓋 ISO 27001 / CNS 27701 四階文件（政策、程序書、作業說明書、表單紀錄）、資安事件緊急應變通報處置、風險評鑑與全景鑑別。",
        "badgeColor": "#14b8a6",
    },
    "python": {
        "title": "Python 程式開發與 RPA 自動化",
        "code": "SEC-RPA",
        "description": "涵蓋實體隔離內外網 RPA 分工協作架構、智慧分文系統端到端自動化管線、影音合成自動化與公務流程機器人工具箱。",
        "badgeColor": "#f59e0b",
    },
}

# 專家自訂之重點知識庫元資料（提供精準之業務摘要、文件階層與關聯流程）
CURATED_METADATA: Dict[str, Dict[str, Any]] = {
    # --- AI 領域 ---
    "PPT_PROMPT_PRODUCE_V4.exe": {
        "title": "企業級 AI 簡報提示詞產製器 V4 執行檔",
        "category": "ai",
        "subCategory": "提示詞工程",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "將生硬法規與業務文稿快速轉化為 5+1 色彩計畫、結構化簡報大綱之本機自動化工具。",
        "tags": ["提示詞工程", "簡報產製", "本機工具"],
    },
    "簡報提示詞要求文件.docx": {
        "title": "AI 簡報提示詞結構規範與版面要求說明",
        "category": "ai",
        "subCategory": "提示詞工程",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "規範 5+1 色彩計畫（主背、區底、主標、次文、主強、亮警）、每頁字數上限與破音字防護規範。",
        "tags": ["規範標準", "5+1配色", "簡報版型"],
    },
    "AI_1150923_講稿_V1.pptx": {
        "title": "AI 專題報告與核心講稿設計 V1",
        "category": "ai",
        "subCategory": "簡報實務",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "結合稅務數位轉型與生成式 AI 工具實踐的正式專題簡報，附帶完整口語化講稿與重點導讀。",
        "tags": ["專題簡報", "演講講稿", "數位轉型"],
    },
    "Mastering_Humor.pdf": {
        "title": "Mastering Humor：幽默表達與吸引力演說技巧精華",
        "category": "ai",
        "subCategory": "表達與口語",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "探討如何將嚴肅法規宣導轉化為親民風趣、高互動性的演說與腳本編撰參考文獻。",
        "tags": ["口語講稿", "演講技巧", "文案設計"],
    },
    "新聞稿範例_Gemini.pdf": {
        "title": "Gemini 協助產製高品質公務新聞稿實戰範例",
        "category": "ai",
        "subCategory": "公務應用",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "示範如何利用多模態 AI 對照法規要點，產出結構完整、符合機關對外宣導規範之新聞稿件。",
        "tags": ["新聞稿", "Gemini", "公務文案"],
    },
    "爆笑解憂冷笑話.pptx": {
        "title": "解憂多媒體影音簡報範例",
        "category": "ai",
        "subCategory": "影音實作",
        "flowRef": "flow-ai-slide-pipeline",
        "summary": "展示結合趣味題材、語音旁白合成與逐頁動畫之全自動多媒體教學影音範本。",
        "tags": ["多媒體", "影音合成", "簡報範本"],
    },

    # --- 資安領域（四階文件與核心規範）---
    "MS-1-01資訊安全與個資保護政策_V18_111.0530.pdf": {
        "title": "MS-1-01 資訊安全與個資保護政策 (最高一階政策)",
        "category": "security",
        "subCategory": "一階政策",
        "docLevel": "Level 1",
        "flowRef": "flow-isms-pdca",
        "summary": "本局資訊安全與個人資料保護之最高綱領，確立整體安全目標、組織承諾與合規性基準。",
        "tags": ["一階政策", "ISMS最高綱領", "個資政策"],
    },
    "MS-2-08安全事件緊急應變程序書_V22_1150722.pdf": {
        "title": "MS-2-08 安全事件緊急應變程序書 (重要二階)",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-security-incident",
        "summary": "規範資安事件通報等級 (1~4級)、1小時內初報機制、實體隔離、應變指揮與後續復原作業標準。",
        "tags": ["緊急應變", "二階程序書", "通報流程", "72小時結報"],
    },
    "MS-3-15內外網緊急應變計畫作業說明書_V3_1140728.pdf": {
        "title": "MS-3-15 內外網緊急應變計畫作業說明書 (重要三階)",
        "category": "security",
        "subCategory": "三階作業說明",
        "docLevel": "Level 3",
        "flowRef": "flow-security-incident",
        "summary": "針對內外網路中斷、遭勒索病毒或APT攻擊時，各系統主機與網路設備的具體隔離步驟與切換手冊。",
        "tags": ["三階說明書", "內外網隔離", "網路應變"],
    },
    "MS-2-09矯正措施管理程序書_V12_1130319.pdf": {
        "title": "MS-2-09 矯正措施管理程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-security-incident",
        "summary": "針對資安事件根因分析、不符合事項提報、矯正預防措施追蹤與有效性驗證之管理制度。",
        "tags": ["二階程序書", "矯正措施", "根因分析"],
    },
    "MS-2-06存取控制程序書_v8_1110919.pdf": {
        "title": "MS-2-06 存取控制程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "使用者帳號生命週期管理、最小權限原則、遠端連線管制、特權帳號盤點與多因子驗證要求。",
        "tags": ["二階程序書", "存取控制", "帳號管理"],
    },
    "MS-2-07系統開發與維護程序書_v11_1130913.pdf": {
        "title": "MS-2-07 系統開發與維護程序書 (SSDLC)",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "落實安全軟體開發生命週期 (SSDLC)、弱點掃描、源碼檢測、系統上線驗收與修補程式管理。",
        "tags": ["二階程序書", "SSDLC", "源碼檢測"],
    },
    "MS-2-11風險評鑑暨管理程序書_V13.pdf": {
        "title": "MS-2-11 風險評鑑暨管理程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "資訊資產威脅弱點分析、風險等級判定準則、不可接受風險處理計畫與控制措施挑選指南。",
        "tags": ["二階程序書", "風險評鑑", "控制措施"],
    },
    "MS-2-10資訊資產管理程序書_V19.pdf": {
        "title": "MS-2-10 資訊資產管理程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "硬體、軟體、資料與文件等資訊資產之清冊維護、重要性分級標示與報廢清運安全規範。",
        "tags": ["二階程序書", "資產盤點", "分類分級"],
    },
    "MS-2-04資訊安全與個資保護稽核作業程序書_V12_1130205.pdf": {
        "title": "MS-2-04 資訊安全與個資保護稽核作業程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "內部稽核年度計畫制定、稽核員獨立性要求、抽樣稽核手法與稽核報告追蹤閉環流程。",
        "tags": ["二階程序書", "內部稽核", "合規檢驗"],
    },
    "MS-2-17全景評鑑程序書_v9_115902.pdf": {
        "title": "MS-2-17 全景評鑑程序書",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "分析機關內外部議題、利害關係人（民眾、主管機關、外包商）期望與法律合規要求之治理標準。",
        "tags": ["二階程序書", "全景評鑑", "利害關係人"],
    },
    "MS-2-12業務永續經營程序書_V11_1110627.pdf": {
        "title": "MS-2-12 業務永續經營程序書 (BCP)",
        "category": "security",
        "subCategory": "二階程序書",
        "docLevel": "Level 2",
        "flowRef": "flow-isms-pdca",
        "summary": "關鍵業務衝擊分析 (BIA)、復原時間目標 (RTO) / 資料復原點目標 (RPO) 設定與每年災備演練。",
        "tags": ["二階程序書", "業務永續", "BCP演練"],
    },
    "MS-3-06電子郵件管理作業說明書_V12.pdf": {
        "title": "MS-3-06 電子郵件管理作業說明書",
        "category": "security",
        "subCategory": "三階作業說明",
        "docLevel": "Level 3",
        "flowRef": "flow-security-incident",
        "summary": "郵件安全過濾、釣魚郵件社交工程演練、敏感資料外寄加密機制及附檔傳送安全規定。",
        "tags": ["三階說明書", "郵件安全", "社交工程防護"],
    },
    "MS-3-30稅務管理流程作業說明書_V14.pdf": {
        "title": "MS-3-30 稅務管理流程作業說明書",
        "category": "security",
        "subCategory": "三階作業說明",
        "docLevel": "Level 3",
        "flowRef": "flow-isms-pdca",
        "summary": "稅務核心資訊系統之日常操作、權限授權檢核、課稅資料保密與異地備援操作細則。",
        "tags": ["三階說明書", "稅務流程", "機密防護"],
    },
    "MS-4-114(線上表單)資安與個資量測指標評估結果彙總表_V1.pdf": {
        "title": "MS-4-114 資安與個資量測指標評估結果彙總表",
        "category": "security",
        "subCategory": "四階表單紀錄",
        "docLevel": "Level 4",
        "flowRef": "flow-isms-pdca",
        "summary": "量化指標考核表，包含弱點修補率、教育訓練時數達成率、事件通報時效與防毒覆蓋率等。",
        "tags": ["四階表單", "量測指標", "績效評估"],
    },
    "資通系統防護基準驗證實務v1.3_1150603.pdf": {
        "title": "資通系統防護基準驗證實務指引 V1.3",
        "category": "security",
        "subCategory": "技術指引",
        "flowRef": "flow-isms-pdca",
        "summary": "行政院資安法規資通系統分級防護基準（高、中、普級）驗證要點與檢核實務作法。",
        "tags": ["防護基準", "資通系統分級", "法規遵循"],
    },

    # --- Python / RPA 領域 ---
    "內外網 RPA 分工協作架構解析.gdoc": {
        "title": "內外網實體隔離環境 RPA 分工協同架構解析",
        "category": "python",
        "subCategory": "架構設計",
        "flowRef": "flow-rpa-isolated-network",
        "summary": "深度解析行政機關內外網實體隔離限制下，透過中繼拋接與多線程調度達成無人化自動作業之藍圖。",
        "tags": ["內外網隔離", "RPA架構", "協同作業", "實體防護"],
    },
    "RPA 智慧分文系統自動化流程規劃.gdoc": {
        "title": "RPA 智慧分文系統端到端自動化流程規劃書",
        "category": "python",
        "subCategory": "分文系統",
        "flowRef": "flow-rpa-dispatch-pipeline",
        "summary": "規劃以 OCR 文字萃取、自然語言比對與規則引擎為核心，自動分派公文至承辦股別之管線手冊。",
        "tags": ["智慧分文", "NLP比對", "流程自動化", "自動登錄"],
    },
    "RPA-分享_1140717.pptx": {
        "title": "RPA 自動化技術與公務實務經驗分享專題簡報",
        "category": "python",
        "subCategory": "經驗分享",
        "flowRef": "flow-rpa-isolated-network",
        "summary": "完整彙整辦公室日常重複性作業轉型 Python 自動化腳本之心得、痛點克服與效能提升分析。",
        "tags": ["經驗分享", "RPA成效", "公務自動化"],
    },
    "RPA分文.gdoc": {
        "title": "智慧分文核心判斷演算法與承辦配對規則",
        "category": "python",
        "subCategory": "分文系統",
        "flowRef": "flow-rpa-dispatch-pipeline",
        "summary": "包含各稅目主旨關鍵字字典、加權評分機制與疑義件退回審查之演算法細部設計。",
        "tags": ["規則字典", "分派演算法", "權重分析"],
    },
}

# 流程圖清單設定（支援圖像化與節點說明）
FLOWCHARTS_REGISTRY: List[Dict[str, Any]] = [
    {
        "id": "flow-ai-slide-pipeline",
        "domain": "ai",
        "title": "AI 簡報提示詞與教學影音自動化產製流水線",
        "description": "展示從法規/業務原始文稿出發，經由 Gemini 結構化提示詞工程、5+1 色彩計畫渲染，直到 PPTX / PDF 匯出及自動語音合成教學影片之完整作業管線。",
        "tags": ["AI 簡報", "Gemini", "語音合成", "自動影片", "5+1配色"],
        "nodes": [
            {
                "step": 1,
                "title": "文稿輸入與預處理",
                "desc": "貼上生硬法規、稅務宣導文稿或載入 .txt 檔案，進行斷詞與破音字標註提示。",
                "role": "輸入層"
            },
            {
                "step": 2,
                "title": "Gemini 結構化提示詞產製",
                "desc": "套用 5+1 色彩計畫、受眾語氣與版面風格，輸出標準 JSON 陣列結構。",
                "role": "推論層"
            },
            {
                "step": 3,
                "title": "16:9 高清畫布即時渲染",
                "desc": "在瀏覽器端使用 HTML5 Canvas 動態繪製封面、重點卡片、雙欄對照或流程圖版型。",
                "role": "視覺層"
            },
            {
                "step": 4,
                "title": "PowerPoint / PDF 雙格式匯出",
                "desc": "透過 PptxGenJS 產出含演講者備忘稿之 PPTX，或純前端二進位編譯 16:9 PDF。",
                "role": "交付層"
            },
            {
                "step": 5,
                "title": "一鍵送往教學影片合成 (工具05)",
                "desc": "自動代入每頁簡報圖檔與校正後口語講稿，透過 Edge-TTS 朗讀並壓製 WebM 影片。",
                "role": "多模態層"
            }
        ]
    },
    {
        "id": "flow-security-incident",
        "domain": "security",
        "title": "資安事件緊急應變通報與處置標準程序 (MS-2-08 / MS-3-15)",
        "description": "遵循機關 ISMS 規範之標準事件處置黃金時效流程，涵蓋異常鑑別、1 小時內法定初報、實體網路斷網隔離、根因分析、系統復原至 72 小時結報與改善。",
        "tags": ["MS-2-08", "MS-3-15", "資安應變", "1小時初報", "斷網隔離", "72小時結報"],
        "nodes": [
            {
                "step": 1,
                "title": "事件發現與級別初判",
                "desc": "監控告警或同仁通報，即刻判定資安事件等級（1至4級）並啟動緊急應變機制。",
                "role": "鑑別階段"
            },
            {
                "step": 2,
                "title": "1 小時內法定通報 (初報)",
                "desc": "於事件確認 1 小時內通報本局資安長，並上報行政院國家資通安全通報演練平臺。",
                "role": "通報階段"
            },
            {
                "step": 3,
                "title": "遏止擴散與實體網路隔離",
                "desc": "拔除網線、阻斷對應 Switch 連接埠、切斷感染主機外部連線，執行 MS-3-15 應變手冊。",
                "role": "遏止階段"
            },
            {
                "step": 4,
                "title": "數位鑑識與根因修補",
                "desc": "保護揮發性記憶體與日誌紀錄，分析弱點入侵途徑並套用安全修補程式。",
                "role": "根除階段"
            },
            {
                "step": 5,
                "title": "受控復原與 72 小時結案 (MS-2-09)",
                "desc": "從安全備份還原資料，完成 72 小時結報並開立 MS-2-09 矯正措施單持續追蹤改善。",
                "role": "改善階段"
            }
        ]
    },
    {
        "id": "flow-isms-pdca",
        "domain": "security",
        "title": "ISMS / PIMS 四階文件治理與 PDCA 持續改善循環",
        "description": "呈現 ISO 27001 資訊安全與 CNS 27701 個資保護之四階文件體系（MS-1 政策、MS-2 程序書、MS-3 作業說明書、MS-4 表單紀錄）如何透過 PDCA 循環落地推動。",
        "tags": ["ISO 27001", "CNS 27701", "四階文件", "PDCA", "管審會", "全景鑑別"],
        "nodes": [
            {
                "step": 1,
                "title": "Plan (規劃)：全景鑑別與政策確立",
                "desc": "以 MS-1-01 政策為核心，執行 MS-2-17 全景評鑑、鑑別利害關係人並盤點資訊資產 (MS-2-10)。",
                "role": "P 階段"
            },
            {
                "step": 2,
                "title": "Do (執行)：落實程序書控制措施",
                "desc": "依據 MS-2 程序書與 MS-3 作業手冊，執行存取控制 (MS-2-06)、SSDLC 開發 (MS-2-07) 與教育訓練。",
                "role": "D 階段"
            },
            {
                "step": 3,
                "title": "Check (查核)：內部稽核與指標量測",
                "desc": "落實 MS-2-04 內部稽核、填報 MS-4-114 資安與個資量測指標評估表，嚴格檢視執行績效。",
                "role": "C 階段"
            },
            {
                "step": 4,
                "title": "Act (行動)：管審會決策與矯正措施",
                "desc": "每年召開管審會審議 9 大議題，針對稽核不符合事項啟動 MS-2-09 矯正預防措施，確保持續改善。",
                "role": "A 階段"
            }
        ]
    },
    {
        "id": "flow-rpa-isolated-network",
        "domain": "python",
        "title": "實體隔離環境內外網 RPA 協同分工架構",
        "description": "針對政府與公務體系實體隔離之網路架構，設計外網資料抓取、中繼安全清洗拋接、內網自動登錄核銷之高安全無人化協同運作機制。",
        "tags": ["實體隔離", "內外網RPA", "安全拋接", "中繼檢核", "排程作業"],
        "nodes": [
            {
                "step": 1,
                "title": "外網端：公開資料採集與前處理",
                "desc": "定時排程抓取外部公開資訊、調用雲端 LLM API（如 Gemini）或預先解析外來批次檔案。",
                "role": "外網區"
            },
            {
                "step": 2,
                "title": "安全檢測與清洗拋接中繼",
                "desc": "檔案過濾白名單、自動防毒掃描檢測、去除潛在惡意巨集，經專用安全通道或加密隨身碟拋接。",
                "role": "中繼區"
            },
            {
                "step": 3,
                "title": "內網端：自動登錄與業務系統寫入",
                "desc": "以 Python 本機腳本模擬使用者登入內網公務系統，批次執行資料比對、驗證與表單填寫。",
                "role": "內網區"
            },
            {
                "step": 4,
                "title": "異常中斷告警與日誌存查",
                "desc": "具備 Session 斷點續傳機制，遇到系統卡頓自動重試，並將成功與失敗紀錄留存日誌。",
                "role": "維運區"
            }
        ]
    },
    {
        "id": "flow-rpa-dispatch-pipeline",
        "domain": "python",
        "title": "智慧分文系統端到端自動化處理管線",
        "description": "運用光學字元辨識 (OCR)、自然語言關鍵字加權權重演算法，實現公文來文自動解析、精準分派至負責股別與承辦人，大幅降低人工登錄負荷。",
        "tags": ["智慧分文", "OCR解析", "規則加權", "自動分派", "公文管線"],
        "nodes": [
            {
                "step": 1,
                "title": "收文端監控與新件擷取",
                "desc": "定時巡檢收文匣，自動下載最新來文公文全文及 PDF 附檔資料。",
                "role": "採集階段"
            },
            {
                "step": 2,
                "title": "內文 OCR 萃取與關鍵特徵比對",
                "desc": "自動解析來文主旨、說明與辦法，根據特定稅目、來文字號與公文關鍵字進行加權計分。",
                "role": "解析階段"
            },
            {
                "step": 3,
                "title": "承辦人員精準配對規則引擎",
                "desc": "比對本局組織規程、承辦人業務職掌表，計算信心分數；高信心度自動標記推薦股別。",
                "role": "決策階段"
            },
            {
                "step": 4,
                "title": "自動寫入公文系統與人工複核",
                "desc": "將分文結果自動填入公文系統；遇邊界爭議件則主動提示分文人員人工覆核確認。",
                "role": "產出階段"
            }
        ]
    }
]


def format_file_size(size_bytes: int) -> str:
    """將檔案大小位元組格式化為易讀文字。"""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.1f} MB"


def detect_file_type(extension: str) -> str:
    """根據副檔名判定文件類型。"""
    ext = extension.lower().replace(".", "")
    if ext in ["pdf"]:
        return "PDF 文件"
    elif ext in ["pptx", "ppt"]:
        return "PowerPoint 簡報"
    elif ext in ["docx", "doc"]:
        return "Word 文件"
    elif ext in ["xlsx", "xls", "csv"]:
        return "試算表資料"
    elif ext in ["py", "pyw"]:
        return "Python 原始碼"
    elif ext in ["exe", "bat", "ps1"]:
        return "可執行檔/腳本"
    elif ext in ["png", "jpg", "jpeg", "webp", "svg"]:
        return "圖像架構圖"
    elif ext in ["mp4", "webm", "avi"]:
        return "多媒體影音"
    elif ext in ["gdoc", "gsheet", "gslides"]:
        return "Google 雲端文件"
    else:
        return f"{ext.upper()} 檔案"


def scan_directory(domain_key: str, root_path: Path) -> List[Dict[str, Any]]:
    """遞迴掃描指定目錄，提取結構化資訊並結合自訂專家資料。"""
    items: List[Dict[str, Any]] = []

    if not root_path.exists():
        print(f"[警告] 目錄不存在或無法存取：{root_path}", file=sys.stderr)
        return items

    # 支援掃描之副檔名
    supported_exts = {
        ".pdf", ".pptx", ".ppt", ".docx", ".doc", ".xlsx", ".xls",
        ".csv", ".py", ".exe", ".png", ".jpg", ".jpeg", ".webp",
        ".mp4", ".gdoc", ".gsheet", ".txt", ".md"
    }

    # 忽略之系統雜湊目錄
    ignored_subdirs = {"__pycache__", ".git", ".idea", ".vscode", "node_modules", "temp"}

    for dirpath, dirnames, filenames in os.walk(root_path):
        # 排除忽略目錄
        dirnames[:] = [d for d in dirnames if d not in ignored_subdirs]
        
        current_dir = Path(dirpath)
        for fname in filenames:
            file_path = current_dir / fname
            ext = file_path.suffix.lower()

            if ext not in supported_exts:
                continue

            rel_to_root = str(file_path.relative_to(root_path))
            
            # 取得檔案資訊
            try:
                stat = file_path.stat()
                file_size = stat.st_size
                mtime = datetime.datetime.fromtimestamp(stat.st_mtime)
                mtime_str = mtime.strftime("%Y-%m-%d %H:%M")
            except Exception:
                file_size = 0
                mtime_str = "雲端同步"

            # 尋找是否具有精細標記之自訂元資料
            meta = CURATED_METADATA.get(fname, {})

            # 標題與摘要智慧判定
            item_title = meta.get("title") or fname
            item_summary = meta.get("summary") or f"位於 {domain_key.upper()} 工作區之業務文件（{rel_to_root}）。"
            item_category = meta.get("category") or domain_key
            item_sub_category = meta.get("subCategory") or (current_dir.name if current_dir != root_path else "核心根目錄")
            item_tags = meta.get("tags") or [DOMAIN_CONFIG[domain_key]["title"], ext.replace(".", "").upper()]
            item_flow_ref = meta.get("flowRef") or ""
            item_doc_level = meta.get("docLevel") or ""

            # 若未特別設定 docLevel，依檔名模式判讀四階文件
            if not item_doc_level and domain_key == "security":
                if fname.startswith("MS-1-"):
                    item_doc_level = "Level 1"
                    item_sub_category = "一階政策"
                elif fname.startswith("MS-2-"):
                    item_doc_level = "Level 2"
                    item_sub_category = "二階程序書"
                elif fname.startswith("MS-3-"):
                    item_doc_level = "Level 3"
                    item_sub_category = "三階作業說明"
                elif fname.startswith("MS-4-"):
                    item_doc_level = "Level 4"
                    item_sub_category = "四階表單紀錄"

            # 產生唯一的條目識別碼
            safe_id = f"{domain_key}_{abs(hash(str(file_path)))}"

            # 組合項目
            item_entry: Dict[str, Any] = {
                "id": safe_id,
                "fileName": fname,
                "title": item_title,
                "domain": domain_key,
                "domainTitle": DOMAIN_CONFIG[domain_key]["title"],
                "category": item_category,
                "subCategory": item_sub_category,
                "docLevel": item_doc_level,
                "filePath": str(file_path),
                "fileUri": file_path.as_uri(),
                "fileType": detect_file_type(ext),
                "extension": ext.replace(".", "").upper(),
                "fileSizeFormatted": format_file_size(file_size),
                "fileSizeBytes": file_size,
                "lastModified": mtime_str,
                "summary": item_summary,
                "tags": item_tags,
                "flowRef": item_flow_ref,
                "isCurated": bool(meta),
            }

            items.append(item_entry)

    return items


def generate_knowledge_database() -> Dict[str, Any]:
    """產製完整的知識庫結構字典。"""
    scan_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    all_items: List[Dict[str, Any]] = []
    domain_counts: Dict[str, int] = {}

    for domain_key, root_path in KNOWLEDGE_ROOTS.items():
        domain_items = scan_directory(domain_key, root_path)
        all_items.extend(domain_items)
        domain_counts[domain_key] = len(domain_items)

    # 排序：精選標記優先，隨後按更新時間降冪排序
    all_items.sort(key=lambda x: (not x["isCurated"], x["lastModified"]), reverse=False)

    database: Dict[str, Any] = {
        "metadata": {
            "version": "2.0.0",
            "lastSyncedAt": scan_time,
            "totalCount": len(all_items),
            "domains": DOMAIN_CONFIG,
            "domainCounts": domain_counts,
            "roots": {k: str(v) for k, v in KNOWLEDGE_ROOTS.items()},
        },
        "flowcharts": FLOWCHARTS_REGISTRY,
        "items": all_items,
    }

    return database


def main() -> None:
    """執行同步掃描並輸出 JSON 與 JS 備援檔。"""
    print("[1/3] 正在掃描三大工作目錄知識庫（AI、資安、Python/RPA）...")
    data = generate_knowledge_database()

    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_JS_DIR.mkdir(parents=True, exist_ok=True)

    # 輸出 public/data/knowledge.json
    print(f"[2/3] 寫入 JSON 資料庫至：{OUTPUT_JSON_PATH}")
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # 輸出 public/js/knowledge_data.js (純靜態瀏覽器備援，避免本機 file:// 遇到 CORS)
    print(f"[3/3] 寫入靜態備援至：{OUTPUT_JS_PATH}")
    js_content = f"// 自動產生之知識庫靜態快取備援 (最後同步：{data['metadata']['lastSyncedAt']})\n"
    js_content += f"window.WORKSPACE_KNOWLEDGE_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
    with open(OUTPUT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print("\n[成功] 知識庫同步完成！統計摘要：")
    print(f"  - 檔案總收錄數：{data['metadata']['totalCount']} 件")
    for d_key, cnt in data['metadata']['domainCounts'].items():
        d_name = DOMAIN_CONFIG[d_key]["title"]
        print(f"  - {d_name}：{cnt} 件")
    print(f"  - 視覺化流程圖智庫：{len(data['flowcharts'])} 組")


if __name__ == "__main__":
    main()
