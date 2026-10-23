# -*- coding: utf-8 -*-
"""
資安核心知識庫自動同步引擎 (Python 3.11+)。
專注於公務機關資通安全（資安署 B 級機關應行辦理事項、資通系統防護基準與 ISO 27001/27701 規章體系）。
"""
from __future__ import annotations

import datetime
import json
import os
import shutil
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

PROJECT_ROOT: Path = Path(__file__).resolve().parent.parent
PUBLIC_DATA_DIR: Path = PROJECT_ROOT / "public" / "data"
PUBLIC_JS_DIR: Path = PROJECT_ROOT / "public" / "js"
PUBLIC_DIAGRAMS_DIR: Path = PROJECT_ROOT / "public" / "assets" / "diagrams"

OUTPUT_JSON_PATH: Path = PUBLIC_DATA_DIR / "knowledge.json"
OUTPUT_JS_PATH: Path = PUBLIC_JS_DIR / "knowledge_data.js"

SECURITY_ROOT: Path = Path(r"G:\我的雲端硬碟\資安")

# 八大資安核心實務專題（完全對應公務機關 B 級法定規範與實際檔案結構）
SECURITY_CURATED_TOPICS: List[Dict[str, Any]] = [
    {
        "id": "sec-b-compliance",
        "topicCode": "SEC-01",
        "title": "資通安全責任等級 B 級機關應行辦理事項法定專案",
        "subtitle": "依據資通安全法第十條及分級辦法附表二公務機關 B 級法定應辦事項全景",
        "badge": "法定應辦事項",
        "diagramImage": "Day12_RTO_MTD_RPO指標與緊急應變通報管理架構圖.png",
        "legalBasis": "資通安全法第 10 條、資通安全責任等級分級辦法附表二（公務機關 B 級）",
        "summary": "全面收錄資安責任等級 B 級機關之法定剛性要求，包含專職資通安全人員配置、每年資通安全維護計畫訂定與報送、核心資通系統每 3 年通過第三方 ISMS 驗證、定期弱點掃描、網路架構檢視與滲透測試、社交工程郵件防制演練、1 小時法定通報與 3-2-1 備份還原演練。",
        "bLevelObligations": [
            "專職資安人員：每機關應配置至少 2 名專職資安人員，每人每年應受 12 小時以上之資通安全專業課程訓練或職能訓練，並取得資安專業證照；全體公務人員每年至少接受 3 小時以上資安通識教育訓練。",
            "資通安全維護計畫：每年初應訂定並實施資通安全維護計畫，並向直屬主管機關（如市政府資安長）與資安署報送實施成果。",
            "ISMS 體系第三方驗證：核心資通系統及其所屬機房環境，每 3 年應至少通過 1 次第三方公正機構（如 BSI、SGS）之 ISO/IEC 27001 驗證，並每年接受追查稽核維持證書有效性。",
            "資安健檢與滲透測試：每年應辦理至少 1 次主機與伺服器弱點掃描、每 2 年辦理 1 次全機關網路架構檢視、每 2 年辦理 1 次外部滲透測試，高風險弱點須於 1 個月內完成修補。",
            "社交工程防制演練：每年應辦理至少 1 次全體同仁惡意郵件社交工程防制演練，郵件開啟率不得高於 10%、點擊惡意連結或下載附件率不得高於 6%。",
            "資安事件通報與應變：知悉資安事件發生後，應於 1 小時內至行政院國家資通安全通報演練平臺完成法定通報；1 級與 2 級事件應於 72 小時內完成復原，3 級與 4 級重大事件應於 36 小時內復原並提出完整根因檢討與改善報告。",
            "3-2-1 備份與還原演練：維持至少 3 份資料副本、儲存於 2 種以上不同媒介、至少 1 份保存於異地或異質雲端環境；每年至少實施 1 次正式系統備份資料還原演練，並保留完整測試紀錄與截圖。"
        ],
        "sopSteps": [
            {"step": 1, "title": "維護計畫訂定與報送", "detail": "每年 1 月底前完成當年度資通安全維護計畫修訂，經機關資安長簽核後函報主管機關備查。"},
            {"step": 2, "title": "技術檢測與定期演練", "detail": "上半年完成伺服器弱點掃描與社交工程演練；下半年進行網路架構檢視與備份還原實測。"},
            {"step": 3, "title": "弱點追蹤與複測閉環", "detail": "檢測產出之高風險漏洞，督導廠商或系統工程師於 30 日內完成修補並執行複測驗證。"},
            {"step": 4, "title": "通報演練與事件處理", "detail": "定期更新通報窗口聯絡簿，遇疑似異常 1 小時內通報國家平臺並啟動緊急應變程序。"}
        ],
        "auditFocus": "稽核員必抽查：專職人員訓練時數證明與證照、弱點掃描修補紀錄與複測報告、備份還原演練紀錄是否附帶實際資料比對截圖、社交工程演練未達標人員之再教育訓練簽到表。",
        "matchedKeywords": ["責任等級", "分級辦法", "應辦事項", "MS-F-44", "MS-F-05", "通報", "緊急應變"]
    },
    {
        "id": "sec-system-baseline-ssdlc",
        "topicCode": "SEC-02",
        "title": "資通系統防護基準檢核、安全等級評估與 SSDLC 驗證",
        "subtitle": "落實資通系統普中高分級、安全控制措施檢核表 (MS-4-150) 與安全軟體開發生命週期",
        "badge": "系統安控基準",
        "diagramImage": "Day29_安全軟體開發生命週期(SSDLC)全流程防護架構圖.png",
        "legalBasis": "資通安全責任等級分級辦法附表十（資通系統防護基準）、資通安全法第 10 條",
        "summary": "依據資通系統防護基準規範，針對機關自行開發或委外維運之各項資訊系統（如地方稅務平台、行政資訊系統），進行機密性、完整性、可用性評估，劃分普級、中級、高級安全等級；落實 MS-4-150 安全防護基準檢核表（涵蓋存取控制、審計稽核、傳輸加密、雲端防護），並於系統開發各階段導入 SSDLC 安全設計、源碼檢測 (SAST/DAST) 與第三方滲透測試驗收。",
        "bLevelObligations": [
            "系統等級評定：依據系統所保有資料機敏度（如稅務個資、財產資料）與業務中斷影響，依 MS-4-124 評定系統為中級或高級，建立關鍵業務系統清單 (MS-4-125)。",
            "防護基準檢核 (MS-4-150)：全面落實身分鑑別 (強制長度 >= 12 碼或雙因子 MFA)、存取控制 (連續失敗 5 次鎖定帳號、閒置 15 分鐘強制登出)、日誌保留至少 6 個月。",
            "SSDLC 軟體安全開發：於需求階段進行威脅塑模，開發階段嚴格遵循 OWASP Top 10 安全編程準則，禁止將正式環境機敏資料匯入測試區 (MS-4-129)。",
            "源碼檢測 (SAST) 與開源套件安全 (SCA)：系統重大異動或上線前，源碼檢測結果不得含有任何『高風險』或『重大』安全漏洞；針對第三方開源套件實施 CVE 漏洞清查。",
            "系統驗證實務 (MS-F-47)：中級與高級系統在上線前，委外廠商必須出具完整第三方滲透測試報告與源碼檢測報告，合格後始得簽請上線正式區。"
        ],
        "sopSteps": [
            {"step": 1, "title": "安全等級鑑別評估", "detail": "新系統上線或架構重構前，填報 MS-4-124 資訊系統安全等級評估表，由資安推行小組審定等級。"},
            {"step": 2, "title": "防護基準逐項對應", "detail": "依中級/高級標準填寫 MS-4-150 防護基準檢核表，確認防火牆、WAF、傳輸 TLS 1.2+ 已配置。"},
            {"step": 3, "title": "源碼檢測與弱掃驗證", "detail": "廠商交付版本前執行靜態源碼掃描與動態檢測，出具無高風險弱點之第三方專業驗證報告。"},
            {"step": 4, "title": "異動申請與正式上線", "detail": "填報 MS-4-152 系統功能異動盤點表，附帶驗測佐證，簽陳主管核准後切換正式環境。"}
        ],
        "auditFocus": "稽核員必抽查：MS-4-150 檢核表佐證截圖（密碼複雜度組態、日誌保存天數設定）、源碼檢測報告是否附帶修補複測紀錄、測試區是否有去識別化個資、正式環境是否禁止直接連線改 Code。",
        "matchedKeywords": ["MS-4-150", "防護基準", "SSDLC", "安全等級", "MS-4-124", "MS-F-47", "源碼檢測", "SAST", "滲透測試", "測試區"]
    },
    {
        "id": "sec-context-asset-cdm",
        "topicCode": "SEC-03",
        "title": "組織全景評鑑、資訊資產盤點與 CDM 防禦矩陣治理",
        "subtitle": "鑑別機關內外部議題、利害關係人期望 (MS-4-127) 與 CDM 組態元件防禦清冊",
        "badge": "組織全景與資產",
        "diagramImage": "全景評鑑關係圖.jpg",
        "legalBasis": "ISO/IEC 27001:2022 條款 4（組織背景）、個人資料保護法第 27 條",
        "summary": "全景評鑑為機關資安治理與 ISMS 體系規劃之源頭，鑑別包含市民納稅人、財政部、審計處、主管機關等利害關係人之資安與隱私法律要求；結合全面性資訊資產盤點，建構包含硬體主機、網路設備、系統軟體、資料庫之 CDM（組態與防禦矩陣），確立資產保管人責任與生命週期管制。",
        "bLevelObligations": [
            "全景評鑑鑑別 (MS-4-127)：每年至少鑑別 1 次內外部議題（如雲端轉型、勒索病毒攻擊威脅、公務人力調配）與法律規範要求，產出全局業務流程清冊 (MS-4-126)。",
            "利害關係人期望矩陣：明確界定司法機關查調、民眾稅籍資料保護、審計機關查核之剛性法規遵循要求，並將要求轉化為二階程序書控制規範。",
            "資訊資產六大類別盤點：包含軟體、硬體、網路、人員、書面、環境六大資產，每年全面盤點 1 次，明確登載資產編號、保管人、機敏等級 (C/I/A)。",
            "CDM 防禦矩陣 (含組態與元件管理)：維護核心主機與伺服器之政府組態基準 (GCB) 套用清單、軟體元件版本 (SBOM)、弱點修補時限防禦矩陣。"
        ],
        "sopSteps": [
            {"step": 1, "title": "全景議題鑑別會議", "detail": "資安長主持全景評鑑小組會議，彙整當年度新修法規、新興威脅與各科室業務流程。"},
            {"step": 2, "title": "全景評鑑表填報", "detail": "填報 MS-4-127 全景評鑑表，評估內外部議題之機會與風險，擬定控制措施因應方案。"},
            {"step": 3, "title": "資訊資產定期盤點", "detail": "各組室盤點資訊資產清冊與軟體授權表 (MS-4-18, MS-4-67)，更新 CDM 防禦矩陣狀態。"},
            {"step": 4, "title": "管審會呈報與確認", "detail": "將全景評鑑與資產盤點結果提報年度管理審查會審議，確認防護邊界涵蓋所有關鍵業務。"}
        ],
        "auditFocus": "稽核員必抽查：全景評鑑表修訂日期是否落後於最新法規發布、資產清冊保管人是否皆為現職同仁（無離職人員掛名）、離線設備是否依然在清冊內、軟體授權數是否與實際安裝數吻合。",
        "matchedKeywords": ["全景評鑑", "MS-4-127", "CDM", "資產盤點", "資產管理", "業務流程", "MS-4-125", "MS-4-126", "利害關係人"]
    },
    {
        "id": "sec-risk-assessment-soa",
        "topicCode": "SEC-04",
        "title": "資訊安全風險評鑑管理、不可接受風險處置與適用性聲明書 (SOA)",
        "subtitle": "落實 MS-4-15 風險等級定義表、三維量化計算模型與 ISO 27001 適用性聲明 (MS-4-16)",
        "badge": "風險評鑑與 SOA",
        "diagramImage": "Day07_ISMS_PIMS_風險評鑑架構與三維量化計算全景圖.png",
        "legalBasis": "ISO/IEC 27001:2022 條款 6.1.2（資安風險評鑑）、條款 6.1.3（資安風險處置）",
        "summary": "建立客觀、量化之資安與個資風險評估模型，依據資產價值 (A)、威脅發生機率 (T) 與弱點嚴重度 (V) 進行三維矩陣計算；針對風險值高於機關不可接受門檻（例如 >= 8 分）之資產項目，必須強制開立風險改善處理計畫 (RTP)；並產製法定適用性聲明書 (SOA, MS-4-16)，逐項宣告控制措施之適用與否與落實佐證。",
        "bLevelObligations": [
            "風險評鑑每年實施：每年至少實施 1 次全機關資訊資產風險評鑑作業，遇重大架構變更、重大資安事件或新系統上線時應即時辦理專案評鑑。",
            "三維量化計算基準：嚴格遵循 MS-4-15 風險等級定義表，評估機密性 (C)、完整性 (I)、可用性 (A) 衝擊，計算出高中低風險等級。",
            "不可接受風險處置：風險值評定為『高風險』或『極高風險』者，不得以殘餘風險接受，必須採取降低風險 (Mitigate)、轉移風險 (Transfer) 或避免風險 (Avoid) 之具體防護對策。",
            "適用性聲明書 (SOA, MS-4-16)：對照最新 ISO/IEC 27001 附錄 A 之控制措施（組織、人員、實體、技術四大領域），明確逐條勾選適用狀態與內部對應規範編號。"
        ],
        "sopSteps": [
            {"step": 1, "title": "資產估價與威脅鑑別", "detail": "由資產保管人依據 CIA 損失衝擊評定資產價值，對應最新弱點資料庫與威脅情資。"},
            {"step": 2, "title": "風險計算與等級判定", "detail": "套用量化計算公式得出風險分值，彙整全機關中高風險清單與高風險系統處置表。"},
            {"step": 3, "title": "擬定改善處理計畫", "detail": "針對高風險項目指定處置負責人、預計完成期限、採購安全設備或修補設定之資源需求。"},
            {"step": 4, "title": "更新 SOA 與管審備查", "detail": "更新 MS-4-16 適用性聲明書版本，於管審會向首長陳報殘餘風險接受狀態並核可結案。"}
        ],
        "auditFocus": "稽核員必抽查：SOA 排除適用的條款是否有充分且合理的說明、高風險處理計畫是否皆有具體改善期限與追蹤紀錄、風險計算分值前後期是否有不合邏輯的驟降且無防護措施支撐。",
        "matchedKeywords": ["風險評鑑", "MS-4-15", "MS-4-16", "SOA", "適用性聲明", "高風險", "風險等級", "處置計畫"]
    },
    {
        "id": "sec-management-review",
        "topicCode": "SEC-05",
        "title": "管理審查會（管審會）9 大法定審查議題與首長資源承諾",
        "subtitle": "落實 ISO 27001:2022 條款 9.3 管理審查決策體系，串聯 PDCA 治理閉環",
        "badge": "首長管理審查",
        "diagramImage": "管審會9大議題.png",
        "legalBasis": "ISO/IEC 27001 條款 9.3（管理審查）、資通安全法第 9 條",
        "summary": "由機關首長（或資安長）每年親自主持管理審查會，召集各組室主管與專職資安團隊，全面審視全年度資安體系運作績效。會中必須剛性審查法定 9 大議題，評估資安方針適法性、稽核缺失矯正結果、風險處置狀態、利害關係人要求，並核定次年度資安預算、人力配置與改進方向。",
        "bLevelObligations": [
            "每年至少召開 1 次：機關每年至少召開 1 次正式管理審查會，全體高階主管出席率應達法定門檻，並留存簽到單、會議簡報與簽准公文紀錄。",
            "剛性審查 9 大法定議題：1. 前次會議決議事項追蹤；2. 內外部議題與利害關係人期望變更；3. 資通安全方針與目標達成度；4. 資安績效與指標評估結果；5. 內外部稽核結果與改善措施；6. 風險評鑑結果與風險處理計畫執行成效；7. 資通安全事件通報與根因檢討；8. 持續改善之機會與建議；9. 資通安全資源（人力、預算、技術工具）之充沛性審查。",
            "管審決議追蹤閉環：管審會議決議之各項指示與資源調配，必須納入次年度維護計畫，並由資安推行小組按季列管進度直至結案。"
        ],
        "sopSteps": [
            {"step": 1, "title": "會前資料彙整與議程擬定", "detail": "資安執行秘書於會前 1 個月啟動資料收集，彙總 9 大議題簡報與 114/115 年應辦事項。"},
            {"step": 2, "title": "召開正式審查會議", "detail": "首長或資安長主持會議，逐案審查 9 大法定議題，確認當年度各項資安目標達成度。"},
            {"step": 3, "title": "決議事項陳判簽准", "detail": "會後 14 日內完成管審會會議紀錄製作，呈報首長核定簽准並分發各組室據以執行。"},
            {"step": 4, "title": "列管追蹤至下次管審", "detail": "針對首長指示事項開立工作交辦單，於定期資安推行小組會議中追蹤落實進度。"}
        ],
        "auditFocus": "稽核員必抽查：管審會議紀錄是否完整涵蓋 9 大法定議題（缺少任一議題即開立缺失）、前次管審指示事項是否有具體驗證結案證據、是否有首長核准簽章之公文簽呈紀錄。",
        "matchedKeywords": ["管審會", "管理審查", "9大議題", "會議紀錄", "議程", "首長承諾"]
    },
    {
        "id": "sec-access-database-audit",
        "topicCode": "SEC-06",
        "title": "身分驗證存取控制、賦稅資料庫安控與特權帳號審查 (MS-4-91)",
        "subtitle": "落實 RBAC 最小權限授權、正式區 DBO 三大禁令與科長每月資料庫存取抽核",
        "badge": "存取控制與資料庫",
        "diagramImage": "Day27_資料庫三級檢核體系與科長每月隨機抽核SOP.png",
        "legalBasis": "資通系統防護基準條款 AC-2、AC-6、AU-2，個人資料保護法第 27 條",
        "summary": "針對核心稅務業務與公務資訊系統，實施嚴格的身分識別、權限授權與審計追蹤制度。落實角色型存取控制 (RBAC) 與最小權限原則；賦稅資料庫正式環境嚴禁預設管理員 (DBO) 直連，所有手動 SQL 異動必須透過 MS-4-31 表單申請與雙重審核；落實 MS-4-91 資料庫存取紀錄抽核制度，科長每月隨機抽驗非上班時間與大量查調紀錄。",
        "bLevelObligations": [
            "帳號生命週期管理：員工到職、調職、離職時，必須於人事異動生效次月 10 日前完成權限註銷或調整 (MS-4-13)；每季進行全機關帳號權限覆核清查。",
            "密碼複雜度剛性規範：密碼長度至少 12 碼，且應包含大小寫英文字母、數字及特殊符號；每 90 天強制更換密碼且不得使用前 3 次密碼；連續登入失敗 5 次自動鎖定帳號至少 15 分鐘。",
            "特權帳號管理與雙因子：伺服器與資料庫之 root / administrator / sa 等最高權限帳號禁止日常業務登入，遠端連線必須透過跳板機 (Bastion Host) 且強制啟用雙因子動態驗證 (MFA)。",
            "資料庫三級檢核機制 (MS-4-91)：系統日誌至少保留 6 個月以上；科長每月隨機抽驗資料庫異常存取紀錄（如高頻查調、跨轄區批次匯出、非公務時段連線），並留存書面簽核備查紀錄。",
            "正式區資料防護三大禁令：正式區資料庫嚴禁開發商直連、嚴禁未經審核之批次 UPDATE/DELETE、嚴禁將真實稅籍個資任意匯出至個人電腦。"
        ],
        "sopSteps": [
            {"step": 1, "title": "使用者權限申請審核", "detail": "新進或職務異動同仁填報帳號權限申請單，單位主管核可後由系統管理員依最小權限開通。"},
            {"step": 2, "title": "正式區手動異動管制", "detail": "遇特殊案件需批次修正資料，填寫 MS-4-31 並附帶自撰 SQL 語法與復原語法，經長官簽准後由專責人員執行。"},
            {"step": 3, "title": "每月資料庫存取抽核", "detail": "系統產出全月資料庫連線與查詢日誌，科長依 MS-4-91 抽檢至少 5% 樣本，查核業務正當性並簽章。"},
            {"step": 4, "title": "每季帳號全面盤點", "detail": "每季匯出全機關帳號清冊，比對人事差勤資料，凡離退職、留停人員帳號立即予以鎖定註銷。"}
        ],
        "auditFocus": "稽核員必抽查：離職同仁帳號是否於離職當日 17:00 前除權、科長每月 MS-4-91 抽核紀錄是否按月留存無中斷、正式區是否有通用帳號 (shared accounts) 登入紀錄、資料庫備份檔是否妥善加密儲存。",
        "matchedKeywords": ["MS-4-91", "存取控制", "資料庫", "特權帳號", "帳號清查", "MS-4-13", "密碼", "DBO", "抽核", "查調"]
    },
    {
        "id": "sec-vendor-supply-chain",
        "topicCode": "SEC-07",
        "title": "委外廠商供應鏈安全管理、駐點人員管制與個資保密切結",
        "subtitle": "落實採購資安評估 (MS-4-111)、禁止危害國家資通產品與廠商每年雙稽核",
        "badge": "供應鏈與委外安全",
        "diagramImage": "Day32_委外契約資安條款與禁止大陸廠牌產品安全基準圖.png",
        "legalBasis": "資通安全法第 14 條、資通安全責任等級分級辦法附表二（委外辦理資通業務事項）",
        "summary": "公務機關委外辦理資通系統開發、建置、維運或雲端服務時，面臨重大之供應鏈資安風險。本規範確立採購招標前之資安風險評估 (MS-4-111)、招標文件強制納入行政院資安標準條款（嚴格禁止使用大陸廠牌資通訊產品與軟體元件）；規範駐點與遠端維護人員之安全切結 (MS-4-157)；並實施每年 4 月及 8 月對委外廠商進行實地資安稽核，履約終止時強制查驗保有資料刪除證明 (MS-4-132)。",
        "bLevelObligations": [
            "招標前資安風險評估：採購資通訊軟硬體或委外服務前，應填報 MS-4-111 委外辦理資通安全業務評估表，評估涉及個資與核心系統衝擊等級。",
            "契約剛性禁止條款：契約條款必須載明『嚴禁使用大陸廠牌資通訊產品、軟體、元件及委託大陸地區團隊進行遠端開發維護』；違反者機關得立即終止契約並究責罰款。",
            "駐點人員安全查核：駐點工程師進駐前必須簽署保密協定與個資保護處理切結書 (MS-4-157)；自備電腦進出機關必須經資安檢核並安裝機關防毒與 GCB 軟體。",
            "遠端維護安全管制：原則禁止廠商透過網際網路遠端連線機關正式環境；遇緊急狀況需遠端連線，必須事先提出專案申請，經資安長核准後開啟 VPN + MFA 通道，且連線全程全程螢幕錄影存證留痕至少 1 年。",
            "廠商每年雙稽核機制：機關應於每年 4 月與 8 月，針對承攬關鍵業務與個資系統之委外廠商實施實地資安稽核 (MS-4-159)；履約期滿必須填具 MS-4-132 廠商銷毀刪除保有資料切結書。"
        ],
        "sopSteps": [
            {"step": 1, "title": "招標規格資安條款訂定", "detail": "招標規範中載明資安證照要求、防護基準檢驗項目、禁止大陸廠牌條款與智慧財產權歸屬。"},
            {"step": 2, "title": "廠商進駐與人員切結", "detail": "專案啟動時，廠商主管與所有團隊成員全數簽署 MS-4-157 切結書，建立維護人員合格名冊。"},
            {"step": 3, "title": "專案週期稽核與檢測", "detail": "專案執行期間，要求廠商定期填報自行檢核表 (MS-4-159)，機關專案小組定期實施現場查驗。"},
            {"step": 4, "title": "結案驗收與資料銷毀", "detail": "專案結案驗收時，廠商出具源碼檢測無高風險漏洞報告，並簽署 MS-4-132 銷毀刪除全數暫存資料。"}
        ],
        "auditFocus": "稽核員必抽查：廠商是否有簽署禁止大陸廠牌產品切結書、駐點人員是否有完整保密協議原件、遠端連線申請紀錄是否附帶全程側錄檔案、結案合約是否有資料刪除證明佐證。",
        "matchedKeywords": ["MS-4-157", "MS-4-159", "MS-4-132", "委外", "廠商", "供應鏈", "MS-4-111", "大陸廠牌", "切結書", "遠端維護"]
    },
    {
        "id": "sec-60days-curriculum",
        "topicCode": "SEC-08",
        "title": "【資安規章 60 天深度學習專案體系】8 大週次系統講義與實務全景",
        "subtitle": "融合實務稽核重點與六大盲點對策，循序貫穿公務體系 ISMS 四階規章之全方位研修地圖",
        "badge": "60天專案全景",
        "diagramImage": "Week01_ISMS治理與個資生命週期SOP流程圖_高解析.png",
        "legalBasis": "ISO/IEC 27001 / CNS 27701 規範體系、行政院資通安全通報應變作業要點",
        "summary": "將機關資安規章化繁為簡，規劃為 8 大主題週次研修地圖，每一主題均包含深度學習精華講義、簡報大綱、架構圖解與【實務稽核必查重點與六大盲點對策矩陣圖】。內容橫跨總綱治理、實體機房周邊安全、網路安全與邊界防護、存取控制與資料庫特權管制、系統開發 SSDLC 與委外安全、事件通報與業務永續經營、個資保護與跨機關查調、至整體風險稽核演練。",
        "bLevelObligations": [
            "Week 01 總綱治理與資產全景：精讀 MS-1-01 政策手冊、MS-2-01 文件管制作業、MS-2-02 組織架構、MS-2-17 全景評鑑與 MS-2-10 資產管理程序。",
            "Week 02 實體機房與資產生命週期：精讀機房進出管制 (MS-4-130)、設備全生命週期五大階段、儲存媒體抹除銷毀 SOP (MS-4-71) 及 3-2-1 備份異地儲存架構。",
            "Week 03 網路安全與傳輸加密防護：精讀網路實體隔離拓撲、外點連線防火牆 HA 雙機備援、WAF 與 SOC 情資聯防、GPKI 政府憑證非對稱加密與 SSL VPN MFA 認證。",
            "Week 04 存取控制與資料庫核心安控：精讀自然人憑證雙重身分鑑別、每季帳號清查 (MS-4-13)、資料庫三級檢核 (MS-4-91)、正式區 DBO 禁令與自撰 SQL 申請審核 (MS-4-31)。",
            "Week 05 系統開發維運與委外供應鏈：精讀 SSDLC 軟體開發流程、源碼檢測 (SAST) 與開源套件 (SCA) 掃描、委外契約資安條款 (MS-4-157) 與廠商實地稽核機制。",
            "Week 06 事件應變與業務永續經營：精讀法定 1 小時資通安全事件通報演練、RTO/RPO/MTD 指標設定、關鍵業務衝擊分析 (BIA) 與核心網路設備堆疊故障切換 SOP。",
            "Week 07 個資保護專題與跨機關查調：精讀個人資料保護法特定目的與類別、跨機關查調授權管理 (MS-3-45)、當事人權利行使 (MS-4-128) 及委外終止個資刪除 (MS-4-132)。",
            "Week 08 風險稽核評鑑與整合演練：精讀內部稽核全流程 (MS-2-04)、矯正措施管理與七大啟動時機 (MS-2-09)、量化指標評估 (MS-4-114) 與年度管審會決策閉環。"
        ],
        "sopSteps": [
            {"step": 1, "title": "循序精讀主題週次", "detail": "依 8 大週次結構逐項閱讀精華講義與圖表解析，掌握規章彼此間跨階串接邏輯。"},
            {"step": 2, "title": "研讀盲點對策矩陣", "detail": "重點研讀各週次之『實務稽核必查重點與六大盲點對策圖』，掌握稽核員常挑缺失。"},
            {"step": 3, "title": "結合實際表單演練", "detail": "將講義要求與實際 MS-4 檢核表單對照，檢視自己主辦業務之表單佐證是否齊備。"},
            {"step": 4, "title": "建立長效防護體系", "detail": "將所學法規知識轉化為日常行政標準作業，落實首長政策與外部合規要求。"}
        ],
        "auditFocus": "稽核員必抽查：同仁對自身主辦業務涉及之 ISMS 程序書與作業說明書之熟稔度、對資安事件 1 小時通報窗口與流程之掌握度、個人密碼與識別證隨身攜帶保管情形。",
        "matchedKeywords": ["Week", "Day", "60天", "講義", "精華", "簡報", "盲點對策", "特刊"]
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
        return "PDF 法規公文/表單"
    elif ext in ["pptx", "ppt"]:
        return "PowerPoint 簡報"
    elif ext in ["docx", "doc"]:
        return "Word 規章作業說明"
    elif ext in ["xlsx", "xls", "csv", "gsheet"]:
        return "清冊/檢核矩陣表"
    elif ext in ["png", "jpg", "jpeg", "webp"]:
        return "架構流程圖檔"
    elif ext in ["gdoc"]:
        return "專題核心講義文件"
    elif ext in ["gslides"]:
        return "研讀簡報文件"
    else:
        return f"{ext.upper()} 文件"


def deep_analyze_security_file(file_path: Path) -> Dict[str, Any]:
    """針對單一資安檔案進行深度的公務機關實務分析。"""
    fname = file_path.name
    clean_title = file_path.stem.replace("_", " ").strip()
    upper = fname.upper()

    # 預設值
    doc_level = ""
    sub_category = "核心規章"
    summary = ""
    legal_basis = "資通安全法、資通安全責任等級分級辦法"
    key_points: List[str] = []
    sop_steps: List[Dict[str, Any]] = []
    audit_focus = "查驗填報完整性、簽准公文原件、附件佐證截圖。"
    matched_diagram = ""

    # 1. 四階文件層級判定
    if "MS-1" in upper or "MS 1" in upper:
        doc_level = "Level 1 一階政策"
        sub_category = "一階最高治理方針"
        summary = "本文件為機關資通安全與個人資料保護之最高統綱治理規章，確立首長管理承諾、組織資安架構、各級人員安全責任與法規遵循通則，為全機關推行各項安控措施之法定依據。"
        legal_basis = "資通安全法第 9 條、ISO/IEC 27001:2022 條款 5.2（資通安全政策）"
        key_points = [
            "首長承諾與政策宣告：宣示確保機關核心賦稅系統與納稅人個資之機密性、完整性與可用性。",
            "全體一致遵循：本政策一體適用於全體公務人員、約聘僱人員、職工、駐點工程師及委外維護廠商。",
            "定期管審審查：每年至少召開 1 次管理審查會議檢視方針妥適性，並因應法令更迭隨時修正公告。"
        ]
        sop_steps = [
            {"step": 1, "title": "首長頒布簽署", "detail": "由資安長與機關首長共同簽署頒行最新資安政策手冊。"},
            {"step": 2, "title": "全體宣導落實", "detail": "登載於機關內網常態宣導，並納入新進人員必修教育訓練課程。"},
            {"step": 3, "title": "每年適法性審查", "detail": "於年度管理審查會提報檢討，確認完全對齊最新資安法令與主管機關要求。"}
        ]
        audit_focus = "稽核員必抽查：政策是否有首長最近一年內的親筆簽核公文、是否有發文或內網公告全體知悉證明。"

    elif "MS-2" in upper or "MS 2" in upper:
        doc_level = "Level 2 二階程序書"
        sub_category = "二階核心程序書"
        summary = "本文件屬機關 ISMS / PIMS 二階核心作業程序書，明確跨部門與業務科室之權責劃分，規範各項安全控制作業之『誰做 (Who)、何時做 (When)、做什麼 (What)』，確保控制措施具備標準化流程與法規遵循性。"
        legal_basis = "ISO/IEC 27001:2022 各項控制領域要求、資通安全責任等級分級辦法附表二"
        key_points = [
            "流程剛性規範：訂定標準化事前申請、事中執行、事後覆核之審查節點，降低人為判斷誤差。",
            "跨組室權責協同：劃分系統保管人、資訊管理科、政風室、業務主辦科室之協同審定機制。",
            "佐證表單產出：程序各步驟均嚴格綁定對應之三階說明書與四階查核表單 (MS-4)，確保留痕留底。"
        ]
        sop_steps = [
            {"step": 1, "title": "依規發起申請", "detail": "業務或資訊人員遇異動或維護需求，依程序書流程填具標準表單發起。"},
            {"step": 2, "title": "權責主管審核", "detail": "科長或權責資安主管依程序規範指標進行雙重簽核核准。"},
            {"step": 3, "title": "執行並留痕歸檔", "detail": "按程序指引執行操作，將日誌或成果附件連同表單歸卷備查至少保存 3 年。"}
        ]
        audit_focus = "稽核員必抽查：是否有違反程序擅自口頭授權之情事、表單各關卡簽核日期順序是否合規、異常事件是否依程序啟動升級機制。"

    elif "MS-3" in upper or "MS 3" in upper:
        doc_level = "Level 3 三階作業說明書"
        sub_category = "三階具體作業指引"
        summary = "本文件屬 ISMS 三階作業指導書，針對具體核心業務系統（如消費稅籍、跨機關查調、財產申報、備份還原）提供第一線技術人員或承辦人員之步驟化操作 SOP 與安全配置基準。"
        legal_basis = "資通系統防護基準控制條款、機關核心業務標準作業規範"
        key_points = [
            "細部操作步驟指引：條列詳細之操作畫面、輸入欄位檢核規則、防呆禁令與系統參數設定值。",
            "作業安全基準要求：針對稅籍機敏資料查詢、列印、匯出與傳輸設定多重防護防線。",
            "職務代理與標準化：確保輪值同仁或職務代理人均能產出一致之安全品質，杜絕作業斷層。"
        ]
        sop_steps = [
            {"step": 1, "title": "操作前身分鑑別", "detail": "使用自然人憑證登入系統，確認具備該項業務之合法授權。"},
            {"step": 2, "title": "循序執行作業", "detail": "遵循說明書流程逐一填報或處理，嚴禁將大量稅籍個資未加密匯出。"},
            {"step": 3, "title": "操作日誌審查", "detail": "作業完竣自動寫入稽核日誌，定期由科長於次月完成抽查審定。"}
        ]
        audit_focus = "稽核員必抽查：第一線承辦人操作畫面是否與作業指導書版本一致、是否有私自安裝未授權巨集或轉檔小工具。"

    elif "MS-4" in upper or "MS 4" in upper:
        doc_level = "Level 4 四階表單紀錄"
        sub_category = "四階稽核留痕表單"
        # 針對具體 MS-4 表單進行深入專屬解析
        if "150" in fname:
            clean_title = "MS-4-150 資通系統安全防護基準應辦事項檢核表"
            summary = "核心系統安全等級檢核工具，對照數位發展部資通系統防護基準，針對中高級系統之身分驗證、存取控制、稽核日誌、傳輸加密、實體環境及雲端防護逐項自評與抽驗。"
            legal_basis = "資通安全責任等級分級辦法附表十（資通系統防護基準）"
            key_points = [
                "涵蓋普中高三級基準：嚴格檢核連續失敗鎖定、閒置逾時登出 (15分鐘)、密碼複雜度 (>=12碼)。",
                "雲端防護增補條款：若系統採用政府雲或公有雲，強制要求通過 ISO 27017/27018 雲端安全驗證。",
                "每年滾動式抽驗：核心業務系統每年至少填報 1 次，並由資安長指派專案小組現場實地抽驗組態。"
            ]
        elif "91" in fname:
            clean_title = "MS-4-91 稅務資料庫存取紀錄抽核結果清單"
            summary = "賦稅核心資料庫之稽核留痕機制，科長每月針對正式區資料庫之連線日誌、非上班時段存取、大量查詢進行隨機抽驗，防範內部舞弊與非法查調個資。"
            legal_basis = "個人資料保護法第 27 條、稅捐稽徵法第 33 條（保密義務）"
            key_points = [
                "每月定期隨機抽核：科長每月抽驗至少 5% 樣本，並比對公文案號與查調正當性。",
                "異常樣態重點標示：包含深夜連線、假日批次查詢、跨區調閱特定名冊皆列為必查紅旗。",
                "日誌保存至少 1 年：資料庫 Audit Log 必須獨立備份於 WORM 儲存設備，保存至少 1 年備查。"
            ]
        elif "127" in fname:
            clean_title = "MS-4-127 全景評鑑表與利害關係人期望清單"
            summary = "鑑別機關內外部環境議題、法規要求及利害關係人（納稅人、主管機關、審計部、外部廠商）對資安與個資保護之期望，為整個 ISMS/PIMS 體系之核心依據。"
            legal_basis = "ISO/IEC 27001:2022 條款 4.1 與 4.2、資通安全法第 10 條"
            key_points = [
                "內外部議題鑑別：評估資安威脅情勢、公務雲端轉型、遠距辦公及人力資源之風險與機會。",
                "利害關係人法律義務：界定財政部財政資訊中心、地方審計處、法務部廉政署之法定要求。",
                "年度管理審查報告：全景評鑑結果納入管審會議案，由首長核定因應對策與預算編列。"
            ]
        elif "124" in fname:
            clean_title = "MS-4-124 資訊系統安全等級評估表"
            summary = "評定機關內各資訊系統之機密性、完整性、可用性衝擊等級，進而劃分普級、中級、高級安全責任等級，決定後續應落實之資通系統防護基準控制強度。"
            legal_basis = "資通安全責任等級分級辦法附表十、資通安全防護基準"
            key_points = [
                "CIA 三維度量化打分：機密性（個資筆數）、完整性（財務與稅籍正確性）、可用性（可容忍中斷時間）。",
                "等級判定標準：單一維度達高衝擊即評定為『高級系統』，達中衝擊評定為『中級系統』。",
                "決定防護控管要求：高級與中級系統強制實施原始碼檢測、弱點掃描、滲透測試與日誌留存。"
            ]
        elif "15" in fname and "風險" in clean_title:
            clean_title = "MS-4-15 風險等級定義表"
            summary = "機關資安風險評估之量化準繩，定義資產重要性、威脅發生頻率與弱點嚴重性分值，劃分不可接受之高風險門檻，指導後續風險處置資源投入。"
            legal_basis = "ISO/IEC 27001:2022 條款 6.1.2（風險評鑑方法論）"
            key_points = [
                "三維矩陣計算：風險值 = 資產價值 (A) × 威脅發生率 (T) × 弱點嚴重度 (V)。",
                "不可接受風險門檻：分值達 8 分以上列為高風險，必須強制擬定改善處置計畫 (RTP)。",
                "每年定審與滾動修正：依據最新資安威脅情資（如勒索軟體、供應鏈攻擊）適時調整加權係數。"
            ]
        elif "16" in fname and "適用" in clean_title:
            clean_title = "MS-4-16 適用性聲明書 (SOA)"
            summary = "ISO 27001 國際驗證必查之核心法定文件，針對附錄 A 控制措施逐條宣告是否適用，並明確列出不適用控制措施之法律與技術合理理由。"
            legal_basis = "ISO/IEC 27001:2022 條款 6.1.3（適用性聲明書）"
            key_points = [
                "逐項控制措施對照：對齊最新版 ISO 27001 四大主題控制項（組織、人員、實體、技術）。",
                "排除適用合理說明：如機關未自建機房而採共構機房，需正式說明實體防護之權責界線與豁免理由。",
                "關聯內部規章指引：每一適用條款均明確標記對應之 MS-2 程序書編號與查核表單。"
            ]
        elif "157" in fname or "159" in fname or "132" in fname:
            clean_title = f"{fname.replace('.pdf', '')} 委外管理與個資切結表單"
            summary = "委外廠商供應鏈安全防線，規範委外團隊之個資保密切結、專案自主查核、禁止使用大陸廠牌資通訊產品，以及契約終止時之保有資料銷毀證明。"
            legal_basis = "資通安全法第 14 條、個人資料保護法第 19 條及第 20 條"
            key_points = [
                "禁止大陸廠牌產品：嚴格切結維護設備、軟體元件及程式碼庫皆不得包含大陸地區產品。",
                "終止履約銷毀保證：合約終止時必須簽署 MS-4-132，切結已完全刪除並銷毀機關所屬資料。",
                "專案定期自評查驗：委外廠商每月填報 MS-4-159 自檢表，配合機關每年 2 次實地資安稽核。"
            ]
        else:
            summary = f"本表單為機關 ISMS / PIMS 各項控制措施執行之客觀留痕紀錄，作為內部稽核、主管機關定期查核與第三方國際驗證之核心抽查佐證憑據。"
            legal_basis = "資通安全法、機關內部控制制度與 ISO 27001 文件化資訊要求"
            key_points = [
                "詳實記錄人事實地：如實記載執行人員、時間戳記、簽核主管與各項技術查驗參數。",
                "稽核佐證不可否認：作為內外部稽核時證明安全管理作為具備持續性與有效性之證據。",
                "依規定年限妥善保管：依檔案法與機關規章要求，至少妥善留存 3 至 5 年備查。"
            ]

        sop_steps = [
            {"step": 1, "title": "依規填寫表單", "detail": "作業當下即時且詳實填寫各欄位數據與檢驗結果，嚴禁事後倒填日期。"},
            {"step": 2, "title": "主管逐級審核", "detail": "呈報權責主管或科長審閱簽章，確認符合各項安控基準後決行。"},
            {"step": 3, "title": "留痕歸檔備查", "detail": "歸入資安專卷或上傳電子化留痕系統，依規定年限妥善封存備供稽核抽驗。"}
        ]
        audit_focus = "稽核員必抽查：表單是否有漏簽、日期是否與系統日誌吻合、異常數值是否有填報矯正處置作為。"

    elif "MS-F" in upper or "MS F" in upper:
        doc_level = "外部法規與基準指引"
        sub_category = "國家資安法規與防護實務"
        summary = "本文件屬國家資通安全法規、行政院數位發展部資安署規範或地方政府資安管理要點，為機關訂定內部一二三四階規章之法源上位指導基準。"
        legal_basis = "資通安全法、資通安全責任等級分級辦法、資通系統防護基準"
        key_points = [
            "法定上位規範依據：機關內部所有政策、程序與表單均不得牴觸本法規之剛性條文要求。",
            "數位發展部最新基準：對齊資安署最新發布之資通系統防護基準驗證實務與通報指引。",
            "公務員法定義務遵循：明定機關首長、資安長、專職人員及一般同仁之法律責任與懲處標準。"
        ]
        sop_steps = [
            {"step": 1, "title": "新修法令即時研析", "detail": "中央法規發布後 1 個月內，由資安推行小組分析對內部規章之衝擊與修訂需求。"},
            {"step": 2, "title": "內部規章修訂對齊", "detail": "將法規剛性指標轉化為 MS-1 至 MS-4 之條款，簽陳資安長核准修訂發布。"},
            {"step": 3, "title": "全體宣達與合規查驗", "detail": "於擴大局務會報宣導法規修正重點，並納入年度內部稽核重點查核項目。"}
        ]
        audit_focus = "稽核員必抽查：機關內部規章是否已依照最新法規版本修訂更新（版次與日期比對）。"

    elif "管審會" in clean_title or "管審" in clean_title:
        doc_level = "管理審查會專題"
        sub_category = "管理審查會決策體系"
        summary = "機關首長主持之年度最高資安治理會議紀錄與應辦事項，剛性審查 9 大法定議題，核定次年度資安預算、人力資源配置、風險處置成效與持續改善方向。"
        legal_basis = "ISO/IEC 27001 條款 9.3、資通安全法第 9 條"
        matched_diagram = "管審會9大議題.png"
        key_points = [
            "首長親自主持決策：機關首長簽准公文紀錄，全體高階主管出席率達標。",
            "審查 9 大法定議題：全景變更、目標達成度、事件檢討、風險處理、內外稽核缺失與改善成效。",
            "資源承諾與列管：首長具體裁示核可資安軟硬體採購、人員教育訓練時數與各項改善預算。"
        ]
        sop_steps = [
            {"step": 1, "title": "彙編 9 大議題報告", "detail": "會前彙整全年度維護計畫執行成效、各項稽核缺失矯正與預算執行進度。"},
            {"step": 2, "title": "召開正式審查會議", "detail": "首長主持會議，各組室主管共同審議方針妥適性與新興資安風險。"},
            {"step": 3, "title": "決議事項陳判簽准", "detail": "會後 14 日內完成會議紀錄簽陳首長核定，分發各單位列管執行。"}
        ]
        audit_focus = "稽核員必抽查：管審會議紀錄是否完整涵蓋 9 大法定議題（缺少任一項即開立缺失）、是否有首長核准簽章之正式公文簽呈。"

    elif "全景評鑑" in clean_title:
        doc_level = "組織全景專題"
        sub_category = "組織全景與利害關係人"
        summary = "鑑別機關內外部議題、市民納稅人與上級主管機關期望，產出全景評鑑表 (MS-4-127) 與全景關係圖，確立機關資安治理範疇與邊界。"
        legal_basis = "ISO/IEC 27001:2022 條款 4、個人資料保護法第 27 條"
        matched_diagram = "全景評鑑關係圖.jpg"
        key_points = [
            "鑑別內外部議題：分析科技轉型、公務雲端採用、進階持續性威脅 (APT) 等情勢。",
            "法規與利害關係人：掌握財政部、數位發展部、審計處及大眾對隱私與服務不中斷之期待。",
            "劃定 ISMS 邊界：確認核心稅務平台、內部行政網路與實體機房皆納入驗證範圍。"
        ]
        sop_steps = [
            {"step": 1, "title": "收集內外部情資", "detail": "彙整中央法令動態、同業事件案例與新興網路攻擊樣態。"},
            {"step": 2, "title": "填報全景評鑑表", "detail": "填報 MS-4-127 表單，評估各項議題對機關業務流程之潛在衝擊。"},
            {"step": 3, "title": "繪製全景架構圖", "detail": "更新全景評鑑關係圖，釐清機關內部單位與外部機關之資訊互動邊界。"}
        ]
        audit_focus = "稽核員必抽查：全景評鑑表是否每年更新、利害關係人期望是否具體對應至二階程序書控制規範。"

    elif "風險" in clean_title:
        doc_level = "風險評鑑專題"
        sub_category = "資產盤點與風險評鑑"
        summary = "資訊資產三維量化風險評估手冊與執行清冊，落實 CIA 價值評估、威脅脆弱性矩陣、不可接受風險改善處理 (RTP) 及 CDM 防禦矩陣維護。"
        legal_basis = "ISO/IEC 27001 條款 6.1.2、資通安全責任等級分級辦法"
        matched_diagram = "Day07_ISMS_PIMS_風險評鑑架構與三維量化計算全景圖.png"
        key_points = [
            "客觀量化計算模型：風險值 = 資產價值 × 威脅發生率 × 弱點嚴重度，嚴禁主觀任意打分。",
            "高風險強制改善：高於不可接受門檻 (>=8分) 必須列入處置計畫，指定負責人與改善期限。",
            "結合 CDM 防禦矩陣：對應資產組態基準 (GCB) 與弱點修補清單，定期追蹤殘餘風險。"
        ]
        sop_steps = [
            {"step": 1, "title": "資產全面清查", "detail": "盤點伺服器、網路設備與資料庫，評定 CIA 三維度衝擊價值。"},
            {"step": 2, "title": "威脅弱點評估", "detail": "套用量化矩陣計算風險分值，產出全機關不可接受之高風險清單。"},
            {"step": 3, "title": "推動改善並追蹤", "detail": "由權責單位實施防禦強化或修補，完成後執行複評確認風險已降至可接受水準。"}
        ]
        audit_focus = "稽核員必抽查：高風險項目是否有在管審會陳報、改善計畫是否如期完成並有結案佐證截圖。"

    elif "WEEK" in upper or "DAY" in upper or "60天" in clean_title:
        doc_level = "60天深度學習專案"
        sub_category = "系統化規章講義與全景圖解"
        summary = f"機關資安規章深度學習專案之核心講義與架構解析，融會貫通 ISO 27001/27701 規章體系、實務稽核必查重點與六大盲點對策，指導同仁將法規要求化為日常作業習慣。"
        legal_basis = "ISO/IEC 27001 / CNS 27701 規範體系、資通安全責任等級分級辦法"
        key_points = [
            "體系化架構串聯：跨階串接 MS-1 政策、MS-2 程序書、MS-3 說明書至 MS-4 表單紀錄。",
            "實務稽核盲點破解：深入剖析第三方驗證稽核員最常開立缺失之六大盲點與防呆對策。",
            "圖表可視化解析：配套高品質流程圖與縱深防禦架構圖，快速掌握核心控制要點。"
        ]
        sop_steps = [
            {"step": 1, "title": "精讀專案講義重點", "detail": "研讀講義中關於控制措施之法規背景、適用範疇與角色權責。"},
            {"step": 2, "title": "核對實際表單與組態", "detail": "將講義中的稽核盲點與自己主管的系統組態或表單進行逐項對照自檢。"},
            {"step": 3, "title": "持續落實日常作業", "detail": "將標準作業程序融入日常行政與系統維運，確保面對內外稽核皆能零缺失通過。"}
        ]
        audit_focus = "稽核員必抽查：同仁對業務涉及程序書之熟稔度、對緊急通報 1 小時時限之認知度。"

    else:
        doc_level = "核心資安文件"
        sub_category = "資安業務實務文件"
        summary = f"公務機關資訊安全與個人資料保護之重要實務文件（檔案：{clean_title}），提供特定資安業務節點之作業依據與稽核留痕憑據。"
        legal_basis = "資通安全法、資通安全責任等級分級辦法"
        key_points = [
            "符合機關資通安全維護計畫與合規標準要求。",
            "作業過程嚴格落實記錄留痕以備內外部抽核。",
            "定期檢核與更新以維持安全防護有效性。"
        ]
        sop_steps = [
            {"step": 1, "title": "作業申請與確認", "detail": "確認作業之業務必要性與權責長官授權。"},
            {"step": 2, "title": "遵循規範執行", "detail": "依作業規範執行並完整登載操作紀錄。"},
            {"step": 3, "title": "主管覆核備查", "detail": "呈報主管覆核並妥善歸入資安專卷備查。"}
        ]
        audit_focus = "稽核員必抽查：表單填寫完整度、主管核准程序合規性。"

    # 自動配對可用的 PNG 架構圖
    if not matched_diagram:
        diagram_dir = PUBLIC_DIAGRAMS_DIR
        for diag in diagram_dir.glob("*.png"):
            if any(k in diag.name for k in clean_title.split()):
                matched_diagram = diag.name
                break

    return {
        "title": clean_title,
        "docLevel": doc_level,
        "subCategory": sub_category,
        "summary": summary,
        "legalBasis": legal_basis,
        "keyPoints": key_points,
        "sopSteps": sop_steps,
        "auditFocus": audit_focus,
        "matchedDiagram": matched_diagram,
    }


def scan_security_files() -> List[Dict[str, Any]]:
    """遞迴掃描資安資料夾提取檔案並進行深度分析。"""
    items: List[Dict[str, Any]] = []
    if not SECURITY_ROOT.exists():
        print(f"[警告] 資安目錄不存在：{SECURITY_ROOT}", file=sys.stderr)
        return items

    supported_exts = {
        ".pdf", ".pptx", ".ppt", ".docx", ".doc", ".xlsx", ".xls",
        ".csv", ".py", ".png", ".jpg", ".jpeg", ".webp", ".gdoc",
        ".gsheet", ".gslides"
    }

    for dirpath, dirnames, filenames in os.walk(SECURITY_ROOT):
        # 排除暫存或系統資料夾
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        current_dir = Path(dirpath)
        for fname in filenames:
            file_path = current_dir / fname
            ext = file_path.suffix.lower()
            if ext not in supported_exts:
                continue

            try:
                stat = file_path.stat()
                file_size = stat.st_size
                mtime = datetime.datetime.fromtimestamp(stat.st_mtime)
                mtime_str = mtime.strftime("%Y-%m-%d %H:%M")
            except Exception:
                file_size = 0
                mtime_str = "雲端同步"

            analysis = deep_analyze_security_file(file_path)

            item = {
                "id": f"sec_{abs(hash(str(file_path)))}",
                "fileName": fname,
                "title": analysis["title"],
                "domain": "security",
                "docLevel": analysis["docLevel"],
                "subCategory": analysis["subCategory"],
                "filePath": str(file_path),
                "fileUri": file_path.as_uri(),
                "fileType": detect_file_type(ext),
                "extension": ext.replace(".", "").upper(),
                "fileSizeFormatted": format_file_size(file_size),
                "fileSizeBytes": file_size,
                "lastModified": mtime_str,
                "summary": analysis["summary"],
                "legalBasis": analysis["legalBasis"],
                "keyPoints": analysis["keyPoints"],
                "sopSteps": analysis["sopSteps"],
                "auditFocus": analysis["auditFocus"],
                "matchedDiagram": analysis["matchedDiagram"],
                "tags": [analysis["subCategory"], ext.replace(".", "").upper()]
            }
            items.append(item)

    items.sort(key=lambda x: x["lastModified"], reverse=True)
    return items


def generate_full_database() -> Dict[str, Any]:
    """產製以資安為核心之完整資料庫。"""
    scan_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. 深度掃描資安檔案
    security_items = scan_security_files()

    # 2. 為每個主題配對符合之實體檔案
    for topic in SECURITY_CURATED_TOPICS:
        keywords = topic.get("matchedKeywords", [])
        matched = []
        for it in security_items:
            f_name = it["fileName"]
            t_name = it["title"]
            if any(kw in f_name or kw in t_name for kw in keywords):
                matched.append(it)
        topic["matchedFiles"] = matched[:15]  # 取前 15 份最相關之實體文件

    database: Dict[str, Any] = {
        "metadata": {
            "version": "4.0.0",
            "lastSyncedAt": scan_time,
            "totalCount": len(security_items),
            "primaryDomain": "security",
            "domainCounts": {
                "security": len(security_items),
                "ai": 0,
                "python": 0
            },
            "rootPath": str(SECURITY_ROOT),
        },
        "topics": SECURITY_CURATED_TOPICS,
        "items": security_items,
    }
    return database


def main() -> None:
    """執行資安核心同步作業。"""
    print("[1/3] 正在深度分析資安規章、B級機關應行辦理事項與防護基準...")
    data = generate_full_database()

    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_JS_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[2/3] 寫入 JSON 資料庫至：{OUTPUT_JSON_PATH}")
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[3/3] 寫入前端靜態快取至：{OUTPUT_JS_PATH}")
    js_content = f"// 資安核心知識庫靜態快取 (最後同步：{data['metadata']['lastSyncedAt']})\n"
    js_content += f"window.WORKSPACE_KNOWLEDGE_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
    with open(OUTPUT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"\n[成功] 資安核心知識庫同步完成！")
    print(f"  - 資安核心主題：{len(data['topics'])} 組專案")
    print(f"  - 資安實體文件：{len(data['items'])} 件（深度分析業務摘要與稽核重點）")


if __name__ == "__main__":
    main()
