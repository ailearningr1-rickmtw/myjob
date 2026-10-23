"""知識庫自動同步引擎 (Python 3.11+)。

負責整理與分類三大主要工作領域之知識管理內容：
一、資安規範與 ISMS/PIMS 體系管理 (Security)
二、AI 前瞻技術與應用研發 (AI)
三、Python 程式開發與 RPA 自動化 (Python)

提供結構化核心知識主題、豐富圖說資料、標準作業程序 (SOP) 及實體檔案索引，
輸出至 public/data/knowledge.json 與 public/js/knowledge_data.js。
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

# 三大主要工作目錄路徑（依使用者要求順序：資安 -> AI -> Python）
KNOWLEDGE_ROOTS: Dict[str, Path] = {
    "security": Path(r"G:\我的雲端硬碟\資安"),
    "ai": Path(r"G:\其他電腦\我的電腦\dwonload\AI"),
    "python": Path(r"G:\我的雲端硬碟\程式相關_Python"),
}

# 三大核心領域分類設定
CATEGORIES_CONFIG: List[Dict[str, Any]] = [
    {
        "id": "security",
        "title": "一、資安規範與 ISMS 體系",
        "shortTitle": "資安規範與體系",
        "code": "CAT-01-SEC",
        "badgeColor": "#0d9488",
        "description": "涵蓋 ISO 27001 / CNS 27701 四階文件管理架構、資安事件緊急應變處置標準、資訊資產盤點與風險評鑑、存取控制及管理審查會治理實踐。",
        "topicsCount": 6,
    },
    {
        "id": "ai",
        "title": "二、AI 前瞻技術與應用研發",
        "shortTitle": "AI 前瞻研發與應用",
        "code": "CAT-02-AI",
        "badgeColor": "#0284c7",
        "description": "涵蓋企業級 AI 簡報 5+1 色彩計畫版面架構、多模態簡報轉語音教學影片產製流水線、LLM 提示詞工程最佳化及生成式 AI 演進三階段。",
        "topicsCount": 4,
    },
    {
        "id": "python",
        "title": "三、Python 程式與 RPA 自動化",
        "shortTitle": "Python 程式與 RPA",
        "code": "CAT-03-RPA",
        "badgeColor": "#d97706",
        "description": "涵蓋實體隔離環境內外網 RPA 協同分工架構、智慧分文系統端到端管線與加權演算法、辦公室自動化工具箱及斷點續傳防護機制。",
        "topicsCount": 4,
    },
]

# 結構化核心知識主題庫（含圖說結構、重點摘要、SOP 步驟與實體檔案對應）
CURATED_TOPICS: List[Dict[str, Any]] = [
    # =========================================================================
    # 第一大類：資安規範與 ISMS 體系管理 (Security)
    # =========================================================================
    {
        "id": "sec-01-isms-pdca",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T01",
        "title": "ISMS / PIMS 四階文件體系架構與 PDCA 治理循環",
        "subtitle": "落實 ISO 27001 與 CNS 27701 國際資安與個資驗證之體系治理基石",
        "summary": "將機關資安與個資保護規範嚴格劃分為四個階層：一階政策、二階程序書、三階作業說明書與四階表單紀錄，並透過 Plan-Do-Check-Act 持續改善循環維運安全防護網。",
        "keyPoints": [
            "一階政策 (MS-1)：最高指導方針，明定安全目標、首長承諾與合規要求。",
            "二階程序書 (MS-2)：共 16 份跨部門核心作業程序，明確規範『由誰做 (Who)、何時做 (When)、做什麼 (What)』。",
            "三階作業說明書 (MS-3)：針對特定系統與日常作業之細部執行指南（『如何做 (How)』）。",
            "四階表單紀錄 (MS-4)：查核單據、量測指標、申請紀錄，作為內部與外部稽核之客觀佐證資料。",
            "PDCA 循環：以 MS-2-17 全景評鑑與 MS-2-11 風險評鑑為起點 (Plan)，落實各項控制措施 (Do)，執行 MS-2-04 內部稽核與量測 (Check)，提報管審會決策並執行 MS-2-09 矯正預防 (Act)。"
        ],
        "sopSteps": [
            {"step": 1, "title": "全景鑑別 (Plan)", "detail": "執行 MS-2-17 全景評鑑程序書，鑑別利害關係人期望與內外部法令要求。"},
            {"step": 2, "title": "風險評鑑 (Plan)", "detail": "落實 MS-2-11 風險評鑑程序，維護 CDM 資產防禦矩陣，鑑別不可接受之高風險項目。"},
            {"step": 3, "title": "落實措施 (Do)", "detail": "各業務單位依 MS-2 程序書與 MS-3 說明書執行存取控制、SSDLC 開發與安全防護。"},
            {"step": 4, "title": "績效量測 (Check)", "detail": "定期填報 MS-4-114 資安與個資量測指標評估表，由專案小組執行年度內部稽核 (MS-2-04)。"},
            {"step": 5, "title": "管審決策與矯正 (Act)", "detail": "每年召開管理審查會審議 9 大議題，針對稽核缺失開立 MS-2-09 矯正措施單完成閉環管理。"}
        ],
        "infographic": {
            "title": "ISMS / PIMS 四階文件體系與治理循環圖解",
            "type": "pyramid_cycle",
            "layers": [
                {"level": "Level 1", "name": "一階政策 (MS-1)", "desc": "資訊安全與個資保護政策（最高準則、方針綱領）", "color": "#0f766e"},
                {"level": "Level 2", "name": "二階程序書 (MS-2)", "desc": "16 份標準程序書（誰做、何時做、做什麼，跨單位規範）", "color": "#0d9488"},
                {"level": "Level 3", "name": "三階作業說明書 (MS-3)", "desc": "細部工作指引（如何做、系統參數操作、緊急應變計畫）", "color": "#14b8a6"},
                {"level": "Level 4", "name": "四階表單與紀錄 (MS-4)", "desc": "查核表單、稽核紀錄、量測指標結果（稽核佐證）", "color": "#2dd4bf"}
            ],
            "cyclePhases": [
                {"phase": "Plan 規劃", "desc": "MS-1-01 政策宣示、MS-2-17 全景鑑別、MS-2-11 風險評鑑"},
                {"phase": "Do 執行", "desc": "MS-2-06 存取控制、MS-2-07 系統維護、MS-2-13 人員訓練"},
                {"phase": "Check 查核", "desc": "MS-2-04 內部稽核作業、MS-4-114 安全與個資量測指標評估"},
                {"phase": "Act 改善", "desc": "管審會 9 大議題審議決策、MS-2-09 矯正措施持續改善"}
            ]
        },
        "tags": ["ISMS四階文件", "ISO 27001", "CNS 27701", "PDCA循環", "MS-1-01", "MS-2-04", "內部稽核"],
        "primaryFiles": [
            "MS-1-01資訊安全與個資保護政策_V18_111.0530.pdf",
            "MS-2-01文件控管程序書_V16_1150813.pdf",
            "MS-2-04資訊安全與個資保護稽核作業程序書_V12_1130205.pdf",
            "MS-4-114(線上表單)資安與個資量測指標評估結果彙總表_V1.pdf"
        ]
    },
    {
        "id": "sec-02-incident-response",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T02",
        "title": "資安事件緊急應變通報與處置標準程序 (MS-2-08 / MS-3-15)",
        "subtitle": "掌握 1 小時初報、實體隔離防護與 72 小時結案之黃金處置時效",
        "summary": "建立通報等級判定標準（1至4級），規範發現資安事件後 1 小時內法定初報、立刻執行實體網路拔線與 Switch 連接埠阻斷隔離、證據數位鑑識保全、復原查驗及 72 小時內結報與矯正改善標準流程。",
        "keyPoints": [
            "通報時效法定底線：事件確認後 1 小時內必須完成法定初報通報資安長與上級主管機關。",
            "緊急遏止黃金原則：第一時間拔除實體網路線或阻斷 Switch 埠，嚴格禁止直接強制重開機或格式化硬碟，以保全記憶體與鑑識日誌。",
            "MS-3-15 應變指引：啟動內外網緊急應變計畫，判斷是否遭受勒索軟體、APT 或 DDOS 攻擊，依標準手冊逐級切斷連線。",
            "72 小時結案要求：事件根除與受控復原後，72 小時內完成調查結報，並開立 MS-2-09 矯正預防單追蹤漏洞修補。"
        ],
        "sopSteps": [
            {"step": 1, "title": "事件鑑別與等級初判", "detail": "接獲通報或系統告警時，依損害範圍與敏感機密程度於 15 分鐘內初判事件級別（1至4級）。"},
            {"step": 2, "title": "1 小時法定初報", "detail": "通報局內資安長，並登入行政院國家資通安全通報演練平臺完成法定初報。"},
            {"step": 3, "title": "遏止擴散與實體斷網隔離", "detail": "執行 MS-3-15 作業手冊，拔除網線或關閉交換器連接埠，隔離受駭主機，保留揮發性記憶體。"},
            {"step": 4, "title": "根因分析與漏洞根除", "detail": "分析攻擊入侵路徑與惡意程式特徵，更新防毒特徵碼、修補漏洞並全面清查同網段主機。"},
            {"step": 5, "title": "復原查驗與 72 小時結報", "detail": "確認環境乾淨後由乾淨備份還原系統，於 72 小時內完成結報並開立 MS-2-09 矯正措施單。"}
        ],
        "infographic": {
            "title": "資安事件緊急應變 5 大時效時程圖解",
            "type": "timeline_pipeline",
            "layers": [
                {"level": "00:15", "name": "異常發現與級別初判", "desc": "確認受影響系統、初判 1~4 級事件等級", "color": "#e11d48"},
                {"level": "01:00", "name": "1 小時法定初報", "desc": "通報局內資安長與行政院國家資安通報平臺", "color": "#f97316"},
                {"level": "即刻", "name": "實體斷網與封鎖隔離", "desc": "拔除網線/阻斷Switch埠，落實 MS-3-15 應變計畫", "color": "#f59e0b"},
                {"level": "處置", "name": "數位鑑識與弱點修補", "desc": "保全日誌日軌、根除惡意程式、修補安全性弱點", "color": "#0ea5e9"},
                {"level": "72:00", "name": "復原驗證與結案改善", "desc": "受控復原驗證、完成結報並開立 MS-2-09 矯正措施", "color": "#10b981"}
            ],
            "cyclePhases": []
        },
        "tags": ["MS-2-08", "MS-3-15", "資安緊急應變", "1小時初報", "斷網隔離", "72小時結報", "MS-2-09"],
        "primaryFiles": [
            "MS-2-08安全事件緊急應變程序書_V22_1150722.pdf",
            "MS-3-15內外網緊急應變計畫作業說明書_V3_1140728.pdf",
            "MS-2-09矯正措施管理程序書_V12_1130319.pdf"
        ]
    },
    {
        "id": "sec-03-asset-risk",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T03",
        "title": "資訊資產盤點、分級與風險評鑑架構 (MS-2-10 / MS-2-11)",
        "subtitle": "結合 CDM 資產防禦矩陣，實現可視化威脅弱點分析與控制措施配置",
        "summary": "規範硬體、軟體、資料與實體等各類資訊資產清冊之年度盤點與機密性/完整性/可用性 (CIA) 分級標準，透過風險矩陣評估不可接受風險，並據以擬定控制措施處置計畫。",
        "keyPoints": [
            "資產分類分級：依硬體、軟體、實體、人員、文件與資料庫建立資產清冊，指派明確之保管人與使用人。",
            "CIA 三維度衝擊評估：評定資產機密性 (C)、完整性 (I)、可用性 (A) 之影響層級（1~3 分）。",
            "CDM 防禦矩陣：對應國家資通安全防禦技術要求，落實組態基準、漏洞修補與存取審查。",
            "不可接受風險處理：針對風險值高於基準之項目，必須規劃降低、轉移、規避或自願接受之風險處理對策。"
        ],
        "sopSteps": [
            {"step": 1, "title": "資產全面鑑別與盤點", "detail": "各單位每年落實 MS-2-10 資產盤點作業，更新軟硬體與資料清冊。"},
            {"step": 2, "title": "威脅與弱點關聯分析", "detail": "比對國內外資安弱點 (CVE) 與實體環境威脅，分析發生可能性。"},
            {"step": 3, "title": "風險等級計算與矩陣比對", "detail": "依據 MS-2-11 風險評鑑準則，計算各項資產之風險係數並繪製風險熱圖。"},
            {"step": 4, "title": "擬定風險處置措施", "detail": "挑選適用之控制措施（如增設 MFA、修補漏洞或異地備份），填寫處置計畫書。"},
            {"step": 5, "title": "管審會審查與成效追蹤", "detail": "將風險評鑑結果與殘餘風險清單提報管理審查會審查核定。"}
        ],
        "infographic": {
            "title": "資訊資產盤點與風險評鑑矩陣圖解",
            "type": "risk_matrix",
            "layers": [
                {"level": "步驟一", "name": "資產識別盤點", "desc": "硬體、系統軟體、資料庫、文件合約之清查與賦予唯一編號", "color": "#3b82f6"},
                {"level": "步驟二", "name": "CIA衝擊分析", "desc": "機密性 (C)、完整性 (I)、可用性 (A) 衝擊評估", "color": "#6366f1"},
                {"level": "步驟三", "name": "威脅弱點鑑別", "desc": "網路架構弱點、系統未修補漏洞、人為疏失風險", "color": "#f59e0b"},
                {"level": "步驟四", "name": "風險矩陣判定", "desc": "計算發生機率 × 衝擊嚴重度，劃分高/中/低風險等級", "color": "#ef4444"},
                {"level": "步驟五", "name": "控制措施導入", "desc": "配置補償性控制措施，落實持續改善與監督", "color": "#10b981"}
            ],
            "cyclePhases": []
        },
        "tags": ["資訊資產盤點", "風險評鑑", "MS-2-10", "MS-2-11", "CDM防禦矩陣", "CIA評估"],
        "primaryFiles": [
            "MS-2-10資訊資產管理程序書_V19.pdf",
            "MS-2-11風險評鑑暨管理程序書_V13.pdf",
            "資訊資產盤點與防禦矩陣 (CDM版).gsheet",
            "高風險系統風險評鑑與評估流程.gdoc"
        ]
    },
    {
        "id": "sec-04-access-network",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T04",
        "title": "存取控制、帳號生命週期與網路分段安全 (MS-2-05 / MS-2-06)",
        "subtitle": "落實最小權限原則、多因子驗證 (MFA) 與深層防禦架構",
        "summary": "嚴格管理機關公務同仁與委外廠商之使用者帳號申請、異動、停用與刪除流程，實施最小權限 (Least Privilege) 與職務區隔 (SoD)，並落實內部網路與外部網路之實體/邏輯邊界隔離與郵件社交工程防禦。",
        "keyPoints": [
            "帳號生命週期管理：新進人員申請、調任權限限縮、離退當日立即停用帳號並於一週內刪除權限。",
            "特權帳號控管：系統管理員與伺服器 Root 帳號全面導入多因子驗證 (MFA)，並進行連線操作全程錄影審計。",
            "網路邊界隔離：內網、DMZ 服務區與外網嚴格區隔，禁止跨區未經授權之直接連通。",
            "郵件安全防護 (MS-3-06)：導入 SPF / DKIM / DMARC 驗證，阻斷惡意釣魚連結，並定期實施社交工程演練。"
        ],
        "sopSteps": [
            {"step": 1, "title": "帳號申請與權限審核", "detail": "由業務單位主管確認職掌需要，循 MS-2-06 申請表單簽核核准。"},
            {"step": 2, "title": "最小授權原則配置", "detail": "系統管理員僅開立執行業務必要之最小權限，禁止開立通用型管理員權限。"},
            {"step": 3, "title": "定期特權盤點清查", "detail": "每半年執行一次全機關特權帳號盤點，清除閒置超過 90 天之帳號。"},
            {"step": 4, "title": "連線稽核與日誌存查", "detail": "防火牆與 VPN 連線日誌至少妥善保存 6 個月，以供安全追蹤稽核。"}
        ],
        "infographic": {
            "title": "多層次存取控制與網路防禦模型圖解",
            "type": "layered_security",
            "layers": [
                {"level": "邊界層", "name": "周邊防火牆與郵件過濾", "desc": "SPF/DKIM 驗證、惡意流量清洗、DDoS 阻斷", "color": "#0369a1"},
                {"level": "隔離層", "name": "內外網實體/邏輯分段", "desc": "DMZ 隔離區、內外網安全中繼通道、802.1X 身分認證", "color": "#0284c7"},
                {"level": "認證層", "name": "多因子身分識別 (MFA)", "desc": "動態 OTP 驗證、自然人憑證登錄、密碼複雜度策略", "color": "#0ea5e9"},
                {"level": "權限層", "name": "最小授權與職務區隔", "desc": "RBAC 角色型權限、離職當日停用、特權帳號錄影", "color": "#38bdf8"}
            ],
            "cyclePhases": []
        },
        "tags": ["存取控制", "MS-2-06", "MS-2-05", "網路安全", "MFA", "MS-3-06", "社交工程防禦"],
        "primaryFiles": [
            "MS-2-06存取控制程序書_v8_1110919.pdf",
            "MS-2-05網路安全管理程序書_v7_1130814.pdf",
            "MS-3-06電子郵件管理作業說明書_V12.pdf"
        ]
    },
    {
        "id": "sec-05-context-mgmt-review",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T05",
        "title": "全景鑑別與管理審查會 9 大議題治理決策 (MS-2-17)",
        "subtitle": "首長引領、高階治理與各組室協同之資安戰略推動機制",
        "summary": "分析機關面臨之政治、經濟、法規與技術等內外部議題，鑑別納稅義務人、上級監督機關與委外廠商之期望；每年定期召開由首長親自主持之管理審查會，逐項檢視資安 9 大議題並決策資源配置。",
        "keyPoints": [
            "全景鑑別矩陣 (MS-2-17)：全面鑑別組織內外部議題與利害關係人要求，作為 ISMS 適用範圍界定基準。",
            "管審會 9 大法定議題：以往管審會行動追蹤、內外部議題變更、資訊安全績效趨勢、利害關係人回饋、風險評鑑結果、矯正預防措施狀況、稽核結果、安全目標達成情形、持續改善建議。",
            "高階首長治理承諾：由局長/副局長親自擔任資安長主持會議，核定資安策略與年度預算資源投入。"
        ],
        "sopSteps": [
            {"step": 1, "title": "彙整內外部全景議題", "detail": "由資安推動小組於會前一個月更新 MS-4-127 全景評鑑表。"},
            {"step": 2, "title": "編撰 9 大議題成果報告", "detail": "各業務股別提出風險處置、稽核不符合事項與量測指標成效報告。"},
            {"step": 3, "title": "召開管理審查大會", "detail": "由局長/資安長親自主持，逐項審議 9 大議題並決議精進事項。"},
            {"step": 4, "title": "決議列管與追蹤閉環", "detail": "會議紀錄陳首長簽准後函發各組室落實，並列入下次管審會追蹤事項。"}
        ],
        "infographic": {
            "title": "管審會 9 大法定議題治理架構圖解",
            "type": "governance_wheel",
            "layers": [
                {"level": "核心決策", "name": "首長治理承諾", "desc": "資源配置、預算支持、安全目標核定", "color": "#4338ca"},
                {"level": "議題一至三", "name": "歷史追蹤與環境變遷", "desc": "上次決議追蹤、內外部全景議題、利害關係人期望", "color": "#6366f1"},
                {"level": "議題四至六", "name": "績效量測與稽核結果", "desc": "指標量測趨勢、內部/外部稽核報告、不符合事項", "color": "#818cf8"},
                {"level": "議題七至九", "name": "風險處置與精進改善", "desc": "風險評鑑成果、矯正措施有效性、年度持續改善建議", "color": "#a5b4fc"}
            ],
            "cyclePhases": []
        },
        "tags": ["全景評鑑", "MS-2-17", "管審會9大議題", "利害關係人", "管理審查會", "資安治理"],
        "primaryFiles": [
            "MS-2-17全景評鑑程序書_v9_115902.pdf",
            "管審會9大議題.png",
            "全景評鑑關係圖.jpg",
            "114年管審會議程_0908(final).docx"
        ]
    },
    {
        "id": "sec-06-ssdlc-bcp",
        "categoryId": "security",
        "categoryTitle": "一、資安規範與 ISMS 體系",
        "topicCode": "SEC-T06",
        "title": "安全軟體開發生命週期 (SSDLC) 與業務永續演練 (MS-2-07 / MS-2-12)",
        "subtitle": "從源碼檢測、弱點修補到關鍵業務衝擊分析 (BIA) 與災備演練",
        "summary": "將安全意識注入軟體開發各階段（需求分析、架構設計、程式撰寫、測試驗收至上線維護），並建立關鍵業務衝擊分析 (BIA)、復原時間目標 (RTO) 與資料復原點目標 (RPO)，確保遭遇重大災害時核心業務能迅速復原運作。",
        "keyPoints": [
            "SSDLC 五大階段：需求定義安全規格、架構設計威脅建模、程式撰寫避開 OWASP Top 10、上線前源碼檢測與滲透測試、維運期修補管理。",
            "資通系統防護基準合規：符合行政院資安法規資通系統分級防護基準驗證要點。",
            "業務持續經營 (MS-2-12)：界定核心關鍵業務清單 (MS-4-125)，明定 RTO 與 RPO 指標。",
            "年度災備演練：每年落實主機異常中斷演練、異地備份磁帶還原驗證與異地備援切換測試。"
        ],
        "sopSteps": [
            {"step": 1, "title": "系統安全需求與分級鑑別", "detail": "開案時填寫系統安全等級評估表 (MS-4-124)，確定防護基準等級。"},
            {"step": 2, "title": "安全程式碼開發與檢測", "detail": "委外開發商遵循安全規範，交付時檢附靜態源碼檢測 (SAST) 與弱點掃描零重大弱點報告。"},
            {"step": 3, "title": "驗收審查與安全上線", "detail": "經資通安全推動小組覆核防護基準檢核表，完成簽准後方可發布上線。"},
            {"step": 4, "title": "年度業務衝擊與災備演練", "detail": "執行關鍵系統模擬中斷切換演練，確保復原時間 (RTO) 符合預期目標。"}
        ],
        "infographic": {
            "title": "SSDLC 安全開發與業務永續連續防護圖解",
            "type": "ssdlc_pipeline",
            "layers": [
                {"level": "規劃階段", "name": "安全需求與系統分級", "desc": "MS-4-124 安全等級評估、高/中/普防護基準界定", "color": "#047857"},
                {"level": "開發階段", "name": "安全設計與源碼開發", "desc": "輸入驗證、防範 SQL Injection/XSS、密碼加密", "color": "#059669"},
                {"level": "測試階段", "name": "源碼檢測與弱點掃描", "desc": "靜態檢測 (SAST)、弱點掃描、滲透測試修補", "color": "#10b981"},
                {"level": "維運與永續", "name": "業務衝擊與災備演練", "desc": "MS-2-12 業務永續程序、RTO/RPO 每年切換驗證", "color": "#34d399"}
            ],
            "cyclePhases": []
        },
        "tags": ["SSDLC", "安全軟體開發", "MS-2-07", "MS-2-12", "業務永續", "資通系統防護基準", "災備演練"],
        "primaryFiles": [
            "MS-2-07系統開發與維護程序書_v11_1130913.pdf",
            "MS-2-12業務永續經營程序書_V11_1110627.pdf",
            "資通系統防護基準驗證實務v1.3_1150603.pdf",
            "完整的SSDLC學習與知識.gdoc"
        ]
    },

    # =========================================================================
    # 第二大類：AI 前瞻技術與應用研發 (AI Engineering)
    # =========================================================================
    {
        "id": "ai-01-slide-palette",
        "categoryId": "ai",
        "categoryTitle": "二、AI 前瞻技術與應用研發",
        "topicCode": "AI-T01",
        "title": "企業級 AI 簡報 5+1 色彩計畫版面架構",
        "subtitle": "消滅文字牆！將複雜稅務法令與宣導轉化為現代高質感簡報標準",
        "summary": "建立專利級『5+1 色彩計畫』架構（主背景色、區塊底色、主標題色、次要文字色、主強調色、亮點警示色），結合 Bento 雙欄卡片、左右對照、步驟流程與封面大標四種視覺版型，限制每頁重點 3~4 點，達到秒懂好讀之公務簡報新境界。",
        "keyPoints": [
            "5+1 色彩計畫：徹底解決傳統簡報用色混亂痛點，每套配色嚴選 6 階對比色，兼顧投影清晰度與專業穩重質感。",
            "四種標準版型配置：封面大標題 (Cover)、雙欄卡片 Bento Grid、左右對照 Comparison、橫向步驟流程 Steps Flow。",
            "每頁重點不超過 4 點：堅決拒絕『文字牆』，內文經過提煉精華，讓聽眾與長官 3 秒內抓住核心論點。",
            "台灣繁體中文標註：提示詞強制約束輸出台灣習慣用語，並針對易誤讀破音字加入音標防護提示。"
        ],
        "sopSteps": [
            {"step": 1, "title": "選定 5+1 配色與語氣風格", "detail": "於工具 01 依報告受眾選擇沉穩商務 (P01)、科技藍灰 (P02) 等配色及專業嚴謹語氣 (T01)。"},
            {"step": 2, "title": "貼入法規或參考文稿", "detail": "將宣導要點或原始條文貼入輸入框，點選『產生簡報提示詞』。"},
            {"step": 3, "title": "Gemini 直接產製全套簡報", "detail": "調用 Gemini 2.5 Flash / Pro 模型，自動依版型產製結構化 JSON 投影片資料。"},
            {"step": 4, "title": "16:9 畫布預覽與微調", "detail": "在線上 16:9 HD 畫布即時切換頁次微調文字，一鍵匯出 PowerPoint (.pptx) 或 PDF。"}
        ],
        "infographic": {
            "title": "5+1 色彩計畫與視覺版型層次圖解",
            "type": "color_palette_grid",
            "layers": [
                {"level": "色彩 1", "name": "主背景色 (bgMain)", "desc": "簡報大底色，決定整體基調（深藍/深灰/極簡白）", "color": "#1e293b"},
                {"level": "色彩 2", "name": "區塊底色 (bgSub)", "desc": "Bento 卡片底色，營造層次感與立體浮起感", "color": "#334155"},
                {"level": "色彩 3", "name": "主標題色 (textMain)", "desc": "每頁大標題與關鍵字，具備最高對比度", "color": "#f8fafc"},
                {"level": "色彩 4", "name": "次要文字 (textSub)", "desc": "說明段落、副標題與頁尾資訊，柔和不刺眼", "color": "#94a3b8"},
                {"level": "色彩 5", "name": "主強調色 (accent1)", "desc": "卡片外框、步驟編號標籤、主視覺圖示", "color": "#0ea5e9"},
                {"level": "色彩 6", "name": "亮點警示 (accent2)", "desc": "關鍵數據、重點警告、法規禁制提醒", "color": "#f59e0b"}
            ],
            "cyclePhases": []
        },
        "tags": ["5+1色彩計畫", "AI簡報", "提示詞工程", "Bento版型", "PPT_PROMPT_PRODUCE", "拒絕文字牆"],
        "primaryFiles": [
            "簡報提示詞要求文件.docx",
            "PPT_PROMPT_PRODUCE_V4.exe",
            "AI_1150923_講稿_V1.pptx"
        ]
    },
    {
        "id": "ai-02-video-multimodal",
        "categoryId": "ai",
        "categoryTitle": "二、AI 前瞻技術與應用研發",
        "topicCode": "AI-T02",
        "title": "多模態簡報轉語音教學影片自動化產製流水線",
        "subtitle": "整合 Edge-TTS、GPT-SoVITS 與破音字校正，實現簡報一鍵轉教學影片",
        "summary": "將簡報投影片（PDF / PNG）與智慧講稿結合，利用 Python 或全網頁技術調用微軟 Edge-TTS 或個人化語音模型，套用台灣專屬破音字替換字典，逐頁錄音並壓製為高畫質 WebM / MP4 教學影音檔案。",
        "keyPoints": [
            "全自動音影合成管線：讀取簡報每頁圖片 -> 取得逐頁口語講稿 -> 依字數計算停留秒數 -> 產生音訊軌 -> 畫布同步繪製字幕與轉場 -> 壓製完整影音。",
            "台灣常見破音字發音覆寫 (tts_pronunciation_overrides.json)：解決 TTS 機器人將『重扣』誤讀為『仲扣』、將『調閱』誤讀為『條閱』之痛點，自動替換為『蟲扣』、『掉閱』以確保發音正確。",
            "免主機純前端支援：可直接於主題二『工具 05』在瀏覽器內純前端合成影片，亦可於主機端執行高階 Python 腳本產生 1080P 高清影片。"
        ],
        "sopSteps": [
            {"step": 1, "title": "匯入簡報投影片檔案", "detail": "將 PPTX 轉為 PDF 或圖片批次匯入工具 05，系統自動解析每一頁預覽。"},
            {"step": 2, "title": "由 AI 產製逐頁口語講稿", "detail": "點擊『由 AI 為全套投影片撰寫講稿』，自動依據投影片文字生成通俗口語講稿。"},
            {"step": 3, "title": "自動套用破音字校正", "detail": "引擎自動比對稅務破音字字典，修正重扣、調閱、繳納、核算等發音。"},
            {"step": 4, "title": "一鍵合成教學影片", "detail": "點擊『一鍵合成整部教學影片』，系統自動逐頁朗讀並壓製下載 WebM 影片檔。"}
        ],
        "infographic": {
            "title": "多模態簡報轉語音教學影片流水線圖解",
            "type": "multimodal_pipeline",
            "layers": [
                {"level": "輸入層", "name": "簡報投影片解析", "desc": "PDF 渲染 1080P 高清影像、提取頁面結構", "color": "#0284c7"},
                {"level": "文稿層", "name": "AI 口語講稿生成", "desc": "將生硬條文轉為長官/民眾易懂之自然台詞", "color": "#0ea5e9"},
                {"level": "語音層", "name": "破音字校正與 TTS", "desc": "套用 tts_pronunciation_overrides，自然女聲/男聲合成", "color": "#14b8a6"},
                {"level": "封裝層", "name": "Canvas 音影同步壓製", "desc": "MediaRecorder 音視訊合流、輸出 WebM/MP4 影片", "color": "#10b981"}
            ],
            "cyclePhases": []
        },
        "tags": ["多模態影音", "Edge-TTS", "GPT-SoVITS", "破音字校正", "教學影片合成", "Vedio_produce_v5"],
        "primaryFiles": [
            "爆笑解憂冷笑話.pptx",
            "爆笑解憂冷笑話_replaced.mp4",
            "Mastering_Humor.pdf"
        ]
    },
    {
        "id": "ai-03-prompt-gemini",
        "categoryId": "ai",
        "categoryTitle": "二、AI 前瞻技術與應用研發",
        "topicCode": "AI-T03",
        "title": "生成式 AI 提示詞工程 (Prompt Engineering) 與 Gemini 公務實戰",
        "subtitle": "掌握角色情境、約束限制、少樣本範例與結構化輸出心法",
        "summary": "彙整提示詞工程之核心架構（角色設定、任務說明、約束條件、輸出格式規範），示範如何調用 Google Gemini 模型快速撰寫公務新聞稿、投資分析建議及稅務法規白話問答。",
        "keyPoints": [
            "提示詞黃金結構：明確指示（你是具備10年經驗的稅務法規專家）、情境受眾（報告對象為一般民眾）、負面約束（嚴禁艱澀條文、每段不超過80字）、輸出格式（嚴格以 JSON 陣列或特定排版輸出）。",
            "公務新聞稿產製範例：對照新聞稿標準發布格式（主旨、內文說明、受惠族群、諮詢窗口），產出高合規宣導稿件。",
            "模型選用策略：日常快速公務文案使用 Gemini 2.5 Flash（高速且經濟）；長篇法規比對與複雜推理使用 Gemini 2.5 Pro。"
        ],
        "sopSteps": [
            {"step": 1, "title": "界定公務任務與受眾目標", "detail": "明確定義文稿目標（如：綜合所得稅報稅季常見錯誤宣導）。"},
            {"step": 2, "title": "套用結構化提示詞樣板", "detail": "代入角色身分、背景法令條文與字數上限約束條件。"},
            {"step": 3, "title": "少樣本 (Few-Shot) 範例導引", "detail": "提供一至兩篇優秀公務新聞稿範例，引導模型學習公文語氣與標題風格。"},
            {"step": 4, "title": "AI 輸出檢視與事實覆核", "detail": "專人核對法規條號、扣除額數據與最新稅法更正，確保絕對正確。"}
        ],
        "infographic": {
            "title": "高效提示詞工程四層架構圖解",
            "type": "prompt_architecture",
            "layers": [
                {"level": "層次一", "name": "角色定位 (Role & Persona)", "desc": "賦予專家角色、思考架構與語氣風格（嚴謹專業/親民通俗）", "color": "#4f46e5"},
                {"level": "層次二", "name": "任務邊界 (Task & Context)", "desc": "清楚定義任務目標、輸入參考資料、排解背景矛盾", "color": "#6366f1"},
                {"level": "層次三", "name": "約束規範 (Constraints)", "desc": "消滅幻覺、禁止特定用詞、限制段落字數與格式邊界", "color": "#818cf8"},
                {"level": "層次四", "name": "結構輸出 (Structured Output)", "desc": "要求以 JSON、表格或指定 Markdown 模板輸出", "color": "#a5b4fc"}
            ],
            "cyclePhases": []
        },
        "tags": ["提示詞工程", "Prompt", "Gemini", "新聞稿產製", "公務AI應用", "結構化輸出"],
        "primaryFiles": [
            "新聞稿範例_Gemini.pdf",
            "新聞稿範例.png",
            "提示詞：.docx",
            "office365_投資建議.xlsx"
        ]
    },
    {
        "id": "ai-04-evolution-stages",
        "categoryId": "ai",
        "categoryTitle": "二、AI 前瞻技術與應用研發",
        "topicCode": "AI-T04",
        "title": "AI 發展三階段演進：從對話式 AI、工具協同到自主代理人",
        "subtitle": "前瞻人工智慧科技藍圖與公務數位轉型之戰略應用路徑",
        "summary": "解析 AI 從初期文字問答檢索（階段一）、多模態工具調用與 RPA 串接（階段二），跨入具備目標自我規劃、工具自主調度與連續迭代改進之自主代理人 (Autonomous Agents，階段三) 的技術革命與公務落地方案。",
        "keyPoints": [
            "階段一（對話式與檢索式 AI）：輔助同仁閱讀長篇法規、自動生成摘要與草擬郵件初稿。",
            "階段二（多模態與工具調用協同）：AI 能讀懂圖片表格、調用 Python 腳本產製圖表、驅動 Edge-TTS 製作教學影片。",
            "階段三（自主代理人 Autonomous Agents）：同仁只需給予最高目標，Agent 自主分解任務、調度 RPA、自動檢測錯誤並反思優化完成全流程。"
        ],
        "sopSteps": [
            {"step": 1, "title": "階段一普及：知識助理落地", "detail": "普及本機 LLM 提示詞工具，協助日常法規研讀與文案潤飾。"},
            {"step": 2, "title": "階段二整合：工作流與工具箱串接", "detail": "將 Gemini 與 Python 自動化腳本整合，實現簡報、影片與報表一鍵產製。"},
            {"step": 3, "title": "階段三躍升：部署自主任務代理", "detail": "引進兼顧資安防護之自治代理人架構，實現跨系統無人化作業。"}
        ],
        "infographic": {
            "title": "AI 科技發展演進三階段階梯圖解",
            "type": "evolution_steps",
            "layers": [
                {"level": "第一階段", "name": "對話式 AI (Chat & Retrieval)", "desc": "文字問答、知識檢索、法規摘要整理、文稿初擬", "color": "#0284c7"},
                {"level": "第二階段", "name": "工具協同 AI (Tool Use & Multimodal)", "desc": "多模態圖文解析、API 呼叫、RPA 腳本協同、影音生成", "color": "#0ea5e9"},
                {"level": "第三階段", "name": "自主代理人 (Autonomous Agents)", "desc": "目標導向自發規劃、多 Agent 協同、自主除錯與執行", "color": "#06b6d4"}
            ],
            "cyclePhases": []
        },
        "tags": ["AI演進三階段", "自主代理人", "Autonomous Agents", "數位轉型", "前瞻科技藍圖"],
        "primaryFiles": [
            "AI 發展三階段：從對話到自主.pptx",
            "AI (5).pptx"
        ]
    },

    # =========================================================================
    # 第三大類：Python 程式開發與 RPA 自動化 (Python & RPA)
    # =========================================================================
    {
        "id": "py-01-isolated-rpa",
        "categoryId": "python",
        "categoryTitle": "三、Python 程式與 RPA 自動化",
        "topicCode": "PY-T01",
        "title": "實體隔離環境內外網 RPA 協同分工架構",
        "subtitle": "兼顧嚴格資安實體斷網防護與無人化自動作業效率之工程架構",
        "summary": "解決政府公務環境內外網實體隔離之痛點，設計外網端專責採集與前處理、安全清洗中繼站、內網端模擬無人化登錄公務系統之安全高效分工協作架構。",
        "keyPoints": [
            "實體隔離限制痛點：內網公務核心系統完全無法連通網際網路，同仁需反覆人工登錄外來資料，耗時且易出錯。",
            "外網採集層：以 Python 定時排程抓取外部公開資訊或接收批次匯入檔，進行預先清洗與語意標註。",
            "安全中繼過濾：透過專用加密隨身碟或受管制的單向實體安全拋接機制，進行檔案防毒過濾與白名單校驗。",
            "內網自動執行層：內網 Python RPA 機器人監控特定資料夾，偵測到新拋接檔案後，模擬使用者安全登入公務系統自動核銷派案。"
        ],
        "sopSteps": [
            {"step": 1, "title": "外網端批次採集與整理", "detail": "由外網 Python 程式自動擷取待辦資料，轉為標準格式 JSON/Excel。"},
            {"step": 2, "title": "安全檢測與單向拋接", "detail": "經過防毒掃描檢測無惡意巨集後，透過機關核定之安全通道拋送內網。"},
            {"step": 3, "title": "內網 RPA 自動登錄核對", "detail": "內網機器人自動啟動，模擬操作公務系統，批次寫入資料庫並截圖存證。"},
            {"step": 4, "title": "產出執行報表與異常警示", "detail": "作業完畢後產出日誌，若遇欄位不符即刻發出警示通知同仁人工覆核。"}
        ],
        "infographic": {
            "title": "內外網實體隔離協同分工架構圖解",
            "type": "cross_network_pipeline",
            "layers": [
                {"level": "外網區域", "name": "外部情報採集與前處理", "desc": "公開資訊爬取、呼叫 LLM 雲端推論、批次格式清洗", "color": "#d97706"},
                {"level": "中繼站", "name": "安全清洗與單向拋接", "desc": "白名單過濾、防毒掃描、去除潛在巨集、加密檢核", "color": "#f59e0b"},
                {"level": "內網區域", "name": "公務系統無人自動登錄", "desc": "模擬系統登入、表單批次填報、內部資料庫核銷", "color": "#b45309"},
                {"level": "監控層", "name": "斷點續傳與異常告警", "desc": "作業日誌留存、錯誤截圖存查、異常件主動提示", "color": "#78350f"}
            ],
            "cyclePhases": []
        },
        "tags": ["實體隔離", "內外網RPA", "安全拋接", "無人化作業", "架構設計", "跨網協同"],
        "primaryFiles": [
            "內外網 RPA 分工協作架構解析.gdoc",
            "RPA-分享_1140717.pptx"
        ]
    },
    {
        "id": "py-02-dispatch-system",
        "categoryId": "python",
        "categoryTitle": "三、Python 程式與 RPA 自動化",
        "topicCode": "PY-T02",
        "title": "智慧分文系統端到端自動化管線與加權演算法",
        "subtitle": "運用 OCR 文字辨識與語意權重比對，實現公文自動化精準分派",
        "summary": "針對大量來文公文分案工作，規劃收文定時巡檢、附檔 OCR 解析、關鍵字加權演算法比對各組室業務職掌、信心度評估、自動填入公文系統與爭議件人工覆核之端到端自動化管線。",
        "keyPoints": [
            "收文即時監控：機器人定時檢查待辦收文匣，第一時間下載電子公文內文與掃描附檔。",
            "OCR 內文辨識萃取：結合光學字元辨識技術，將圖片型附檔與 PDF 精準轉化為結構化純文字。",
            "加權配對規則演算法：依據各稅目（地價稅、房屋稅、土增稅、牌照稅等）主旨與法規關鍵字進行加權計分，比對承辦人業務職掌清冊。",
            "智慧信心度分流：高信心度案件自動派送承辦人；低於臨界值或邊界爭議件主動標註提示人工複核，兼顧效率與正確率。"
        ],
        "sopSteps": [
            {"step": 1, "title": "公文收文匣定時監控", "detail": "Python 腳本每 10 分鐘檢查一次新來文，自動抓取公文字號與附件。"},
            {"step": 2, "title": "文字萃取與特徵過濾", "detail": "執行 OCR 辨識，排除雜訊，提取公文主旨、說明、關鍵字與來文機關。"},
            {"step": 3, "title": "關鍵字加權權重比對", "detail": "載入各股別業務職掌字典，計算各承辦人員之配對信心分數。"},
            {"step": 4, "title": "自動派件與人工複核", "detail": "高於 90 分直接自動登錄公文系統派案；爭議件送交收發同仁一鍵確認。"}
        ],
        "infographic": {
            "title": "智慧分文系統端到端自動化管線圖解",
            "type": "dispatch_pipeline",
            "layers": [
                {"level": "收文端", "name": "待辦公文巡檢與下載", "desc": "定時監控收文匣、取得公文原文與電子附檔", "color": "#d97706"},
                {"level": "解析端", "name": "OCR 辨識與特徵萃取", "desc": "光學字元辨識、主旨摘要、法令條號特徵抽取", "color": "#ea580c"},
                {"level": "比對端", "name": "業務規則加權比對引擎", "desc": "計算各股別關鍵字權重、比對承辦人職掌清冊", "color": "#f97316"},
                {"level": "派件端", "name": "自動登錄與爭議件分流", "desc": "自動派送高信心案件、爭議案件提示人工確認", "color": "#fb923c"}
            ],
            "cyclePhases": []
        },
        "tags": ["智慧分文", "OCR解析", "規則引擎", "加權演算法", "公文管線", "RPA自動派件"],
        "primaryFiles": [
            "RPA 智慧分文系統自動化流程規劃.gdoc",
            "RPA分文.gdoc"
        ]
    },
    {
        "id": "py-03-office-toolset",
        "categoryId": "python",
        "categoryTitle": "三、Python 程式與 RPA 自動化",
        "topicCode": "PY-T03",
        "title": "Python 辦公室高頻自動化工具箱與核心技術",
        "subtitle": "無損圖片放大、PDF 時間序合併壓縮、文稿轉自然語音 MP3",
        "summary": "精選同仁日常辦公最常遇到之痛點需求，打造 5 大全網頁/本機雙棲之自動化小工具（圖片無損放大、簡報提示詞產製、簡報合成影片、PDF 合併壓縮、文稿轉語音 MP3），大幅提升辦公室生產力。",
        "keyPoints": [
            "圖片轉無損 PNG 與 2x 銳化放大 (pic_t_png.py)：運用 Canvas 雙三次內插演算法，在瀏覽器端免上傳伺服器即可完成 2 倍清晰放大與轉檔。",
            "PDF 時間序合併與高倍壓縮 (pdf_oneforall.py)：自動依檔案修改時間排序多個 PDF，並支援三段式 DPI 壓縮，節省公文附件容量限制。",
            "文稿轉自然語音 MP3 (pdf_voice.py)：整合微軟高品質神經語音庫（曉臻、雲哲等），貼入文稿即時試聽並匯出 MP3 錄音檔。"
        ],
        "sopSteps": [
            {"step": 1, "title": "選定目標工具功能", "detail": "於主題二五大工具箱或本機資料夾開啟對應小工具。"},
            {"step": 2, "title": "拖曳檔案或輸入內容", "detail": "直接於網頁或介面拖曳檔案，無須等待伺服器上傳。"},
            {"step": 3, "title": "選擇最佳處理參數", "detail": "依需要選擇 2 倍放大、DPI 壓縮比例或朗讀語速語調。"},
            {"step": 4, "title": "一鍵下載產出成果", "detail": "即刻下載無損 PNG、多頁 PDF 簡報或 MP3 語音檔。"}
        ],
        "infographic": {
            "title": "五大高頻辦公室自動化技術棧圖解",
            "type": "toolset_architecture",
            "layers": [
                {"level": "工具 01", "name": "AI 簡報提示詞與產製", "desc": "5+1 色彩計畫、Gemini 自動寫稿、匯出 PPTX/PDF", "color": "#0284c7"},
                {"level": "工具 02", "name": "圖片轉 PNG 放大銳化", "desc": "雙三次演算法、2 倍無損放大、批次打包 ZIP", "color": "#0ea5e9"},
                {"level": "工具 05", "name": "簡報智慧講稿與影片", "desc": "破音字發音校正、Edge-TTS 語音合成教學影片", "color": "#14b8a6"},
                {"level": "工具 07", "name": "PDF 時間序合併壓縮", "desc": "依修改時間智慧排序、三段 DPI 瘦身壓縮", "color": "#d97706"},
                {"level": "工具 08", "name": "文稿轉自然語音 MP3", "desc": "微軟神經語音、可調語速音調、一鍵匯出音訊", "color": "#f59e0b"}
            ],
            "cyclePhases": []
        },
        "tags": ["自動化工具箱", "圖片放大", "PDF合併壓縮", "語音MP3", "pic_t_png", "pdf_oneforall"],
        "primaryFiles": [
            "RPA-分享_1140717.pptx"
        ]
    },
    {
        "id": "py-04-security-reliability",
        "categoryId": "python",
        "categoryTitle": "三、Python 程式與 RPA 自動化",
        "topicCode": "PY-T04",
        "title": "RPA 執行穩定性、斷點續傳與本機資料安全保護",
        "subtitle": "打造無人值守具備高容錯與金鑰保護之穩健自動化管線",
        "summary": "解決自動化腳本因公務系統連線延遲或網路瞬斷造成中斷之痛點，引進 Session 狀態持續化機制，實現失敗自動重試、斷點接續執行；並透過登入前通行碼閘門與本機 API Key 隔離儲存，保護機敏資產不外洩。",
        "keyPoints": [
            "Session 斷點續傳機制：以 JSON 持久化紀錄當前進度與已處理案件編號，遇到異常重啟時自動由中斷點接續，無須從頭重跑。",
            "登入前通行密碼閘門：主題二內建安全防護通行碼（預設 8888），防止未授權人員隨意存取內部自動化工具。",
            "API Key 本機隔離保存：所有 Gemini 或外部 API 金鑰僅保存在本機瀏覽器 localStorage，絕不透過網路傳輸或提交至公開倉庫。",
            "例外攔截與日誌追蹤：全流程包覆 try-except 例外處理，遇錯誤自動截圖存檔並寫入本機日誌以供事後分析。"
        ],
        "sopSteps": [
            {"step": 1, "title": "通行碼驗證解鎖", "detail": "輸入正確通行碼進入工具箱，可隨時自訂修改密碼。"},
            {"step": 2, "title": "載入進度狀態檔", "detail": "腳本啟動時讀取 session_state.json，確認是否已有中斷未完成進度。"},
            {"step": 3, "title": "執行過程即時存檔", "detail": "每成功處理一筆案件即時更新進度檔，確保斷電或當機零資料損失。"},
            {"step": 4, "title": "自動異常重試機制", "detail": "遇網路卡頓自動重試 3 次，若仍失敗則跳過並記錄警示日誌。"}
        ],
        "infographic": {
            "title": "穩健 RPA 斷點續傳與安全性防禦架構圖解",
            "type": "reliability_flow",
            "layers": [
                {"level": "安全層", "name": "登入前通行密碼驗證", "desc": "通行碼防護、防止非授權人員操作內部自動化腳本", "color": "#b45309"},
                {"level": "金鑰層", "name": "API Key 本機加密隔離", "desc": "金鑰僅存於同仁本機端，絕不外流至公開雲端", "color": "#d97706"},
                {"level": "狀態層", "name": "Session 斷點續傳機制", "desc": "實時記錄進度，當機自動從最後成功位置接續運作", "color": "#f59e0b"},
                {"level": "容錯層", "name": "智能重試與日誌追蹤", "desc": "連線卡頓自動延遲重試、錯誤自動截圖並記錄日誌", "color": "#fbbf24"}
            ],
            "cyclePhases": []
        },
        "tags": ["斷點續傳", "RPA穩定性", "金鑰安全保護", "通行碼閘門", "容錯機制", "Session持久化"],
        "primaryFiles": [
            "內外網 RPA 分工協作架構解析.gdoc"
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
    """遞迴掃描目錄提取檔案。"""
    items: List[Dict[str, Any]] = []

    if not root_path.exists():
        print(f"[警告] 目錄不存在或無法存取：{root_path}", file=sys.stderr)
        return items

    supported_exts = {
        ".pdf", ".pptx", ".ppt", ".docx", ".doc", ".xlsx", ".xls",
        ".csv", ".py", ".exe", ".png", ".jpg", ".jpeg", ".webp",
        ".mp4", ".gdoc", ".gsheet", ".txt", ".md"
    }

    ignored_subdirs = {"__pycache__", ".git", ".idea", ".vscode", "node_modules", "temp"}

    for dirpath, dirnames, filenames in os.walk(root_path):
        dirnames[:] = [d for d in dirnames if d not in ignored_subdirs]
        current_dir = Path(dirpath)
        for fname in filenames:
            file_path = current_dir / fname
            ext = file_path.suffix.lower()

            if ext not in supported_exts:
                continue

            rel_to_root = str(file_path.relative_to(root_path))
            try:
                stat = file_path.stat()
                file_size = stat.st_size
                mtime = datetime.datetime.fromtimestamp(stat.st_mtime)
                mtime_str = mtime.strftime("%Y-%m-%d %H:%M")
            except Exception:
                file_size = 0
                mtime_str = "雲端同步"

            doc_level = ""
            sub_category = current_dir.name if current_dir != root_path else "核心根目錄"

            if domain_key == "security":
                if fname.startswith("MS-1-"):
                    doc_level = "Level 1"
                    sub_category = "一階政策"
                elif fname.startswith("MS-2-"):
                    doc_level = "Level 2"
                    sub_category = "二階程序書"
                elif fname.startswith("MS-3-"):
                    doc_level = "Level 3"
                    sub_category = "三階作業說明"
                elif fname.startswith("MS-4-"):
                    doc_level = "Level 4"
                    sub_category = "四階表單紀錄"

            item_entry = {
                "id": f"{domain_key}_{abs(hash(str(file_path)))}",
                "fileName": fname,
                "title": fname.replace(ext, "").replace("_", " "),
                "domain": domain_key,
                "subCategory": sub_category,
                "docLevel": doc_level,
                "filePath": str(file_path),
                "fileUri": file_path.as_uri(),
                "fileType": detect_file_type(ext),
                "extension": ext.replace(".", "").upper(),
                "fileSizeFormatted": format_file_size(file_size),
                "fileSizeBytes": file_size,
                "lastModified": mtime_str,
                "summary": f"位於 {domain_key.upper()} 工作區之業務文件（路徑：{rel_to_root}）。",
                "tags": [sub_category, ext.replace(".", "").upper()],
            }
            items.append(item_entry)

    return items


def generate_knowledge_database() -> Dict[str, Any]:
    """產製結構化知識庫字典。"""
    scan_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    all_items: List[Dict[str, Any]] = []
    domain_counts: Dict[str, int] = {}

    for domain_key, root_path in KNOWLEDGE_ROOTS.items():
        domain_items = scan_directory(domain_key, root_path)
        all_items.extend(domain_items)
        domain_counts[domain_key] = len(domain_items)

    all_items.sort(key=lambda x: x["lastModified"], reverse=True)

    # 將實體檔案配對至 CURATED_TOPICS
    for topic in CURATED_TOPICS:
        p_files = topic.get("primaryFiles", [])
        matched_items = []
        for pf in p_files:
            for it in all_items:
                if it["fileName"] == pf or pf in it["fileName"]:
                    matched_items.append(it)
                    break
        topic["matchedFiles"] = matched_items

    database: Dict[str, Any] = {
        "metadata": {
            "version": "3.0.0",
            "lastSyncedAt": scan_time,
            "totalCount": len(all_items),
            "categories": CATEGORIES_CONFIG,
            "domainCounts": domain_counts,
            "roots": {k: str(v) for k, v in KNOWLEDGE_ROOTS.items()},
        },
        "topics": CURATED_TOPICS,
        "items": all_items,
    }

    return database


def main() -> None:
    """執行同步掃描並輸出 JSON 與 JS 備援檔。"""
    print("[1/3] 正在依三大分類同步知識庫（資安 -> AI -> Python）...")
    data = generate_knowledge_database()

    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_JS_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[2/3] 寫入 JSON 資料庫至：{OUTPUT_JSON_PATH}")
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[3/3] 寫入靜態備援至：{OUTPUT_JS_PATH}")
    js_content = f"// 自動產生之知識庫靜態快取備援 (最後同步：{data['metadata']['lastSyncedAt']})\n"
    js_content += f"window.WORKSPACE_KNOWLEDGE_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
    with open(OUTPUT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print("\n[成功] 知識庫三大分類同步完成！")
    print(f"  - 核心結構化主題數：{len(data['topics'])} 篇")
    print(f"  - 實體檔案總收錄數：{data['metadata']['totalCount']} 件")
    for cat in CATEGORIES_CONFIG:
        c_id = cat["id"]
        c_title = cat["title"]
        c_cnt = data['metadata']['domainCounts'].get(c_id, 0)
        print(f"  - {c_title}：{c_cnt} 件檔案")


if __name__ == "__main__":
    main()
