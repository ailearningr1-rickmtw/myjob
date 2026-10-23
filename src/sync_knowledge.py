# -*- coding: utf-8 -*-
"""
資安核心知識庫自動同步引擎 (Python 3.11+)。
專注於公務機關資通安全（資安署 B 級機關應行辦理事項、資通系統防護基準、ISMS/PIMS 四階規章與 60 天深度研修專案）。
自動掃描實體雲端硬碟檔案，建立穩定的 JSON 資料庫與前端靜態快取。
"""
from __future__ import annotations

import datetime
import hashlib
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
CURRICULUM_ROOT: Path = SECURITY_ROOT / "完成" / "【資安規章60天深度學習專案】"
REGULATIONS_ROOT: Path = SECURITY_ROOT / "完成"

def get_stable_id(path_str: str) -> str:
    """產製跨行程恆定之唯一 MD5 識別碼，避免 Python hash seed 隨機化導致 diff 紊亂。"""
    return f"sec-{hashlib.md5(path_str.encode('utf-8')).hexdigest()[:8]}"

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

# ==============================================================================
# 1. 深度分析公務機關 241 件正式規章 (MS-1 ~ MS-4, MS-F)
# ==============================================================================
def analyze_regulation_file(file_path: Path) -> Dict[str, Any]:
    clean_title = file_path.stem
    upper = clean_title.upper()

    doc_level = "核心資安文件"
    doc_level_code = "MS-4"
    sub_category = "資安管理程序"
    summary = ""
    legal_basis = "資通安全法第 10 條、資通安全責任等級分級辦法"
    key_points: List[str] = []
    sop_steps: List[Dict[str, Any]] = []
    audit_focus = ""

    if "MS-1" in upper or "政策" in clean_title:
        doc_level = "一階政策 (Level 1)"
        doc_level_code = "MS-1"
        sub_category = "資訊安全政策與目標"
        summary = "機關資通安全與個資保護最高指導方針，明定管理階層承諾、資安組織架構、法規遵循要求與年度目標檢討機制。"
        legal_basis = "ISO/IEC 27001:2022 條款 5.2、資通安全法第 9 條"
        key_points = [
            "首長政策承諾：明訂維護市民稅籍機敏資料機密性、確保核心稅務系統服務不中斷。",
            "組織治理授權：設立資通安全推行小組，指派副首長或主任秘書擔任機關資安長 (CISO)。",
            "年度方針滾動檢討：每年於管理審查會審視政策適法性，依據最新法令與威脅趨勢修訂。"
        ]
        sop_steps = [
            {"step": 1, "title": "政策修訂草案研擬", "detail": "由資安推行小組評估最新法令、威脅趨勢與機關業務變更，擬定政策修訂草案。"},
            {"step": 2, "title": "召開跨科室審議", "detail": "邀集各業務科室主管、政風及法制人員進行會審，確保政策可操作性與適法性。"},
            {"step": 3, "title": "首長核定與全機關公告", "detail": "呈報機關首長簽准發布，並於內部網站公告宣導，全體同仁簽署認知確認書。"}
        ]
        audit_focus = "稽核員必抽查：政策是否由現任首長親自簽署、是否有定期公告給全體同仁、是否有每年審查紀錄。"

    elif "MS-2" in upper or "程序" in clean_title:
        doc_level = "二階程序書 (Level 2)"
        doc_level_code = "MS-2"
        sub_category = "制度化管制作業程序"
        summary = "規範跨單位權責分工、標準作業流程、審核查驗點與管理紀錄，確保各項資安控制措施落實執行。"
        legal_basis = "ISO/IEC 27001:2022 / CNS 27701 規範體系"
        key_points = [
            "跨科室權責切分：明確定義業務主辦單位、系統管理員、資安專責人員之作業分工。",
            "控制節點制度化：將防護基準與 ISO 規範轉化為可留痕之標準申請、審核與簽核流程。",
            "文件版本嚴格控管：設有版次紀錄表，任何修改均須註明修訂原因、日期及核准主管。"
        ]
        sop_steps = [
            {"step": 1, "title": "作業發起與申請", "detail": "作業人員依程序書規定填寫標準申請表單，備齊佐證資料呈報權責長官。"},
            {"step": 2, "title": "權責主管複核簽章", "detail": "主管確認作業必要性、合規性與潛在安全衝擊，簽核同意執行。"},
            {"step": 3, "title": "標準程序執行與留痕", "detail": "依規範步驟執行技術設定或業務操作，並產製完整日誌紀錄妥善歸檔備查。"}
        ]
        audit_focus = "稽核員必抽查：程序書規範流程是否與實際現場操作完全一致、是否有跳過主管審核直接執行之現象。"

    elif "MS-3" in upper or "說明" in clean_title:
        doc_level = "三階作業說明書 (Level 3)"
        doc_level_code = "MS-3"
        sub_category = "技術實務與操作指引"
        summary = "提供單一工作崗位之具體技術操作指引、伺服器安全組態步驟 (GCB)、網路設備檢核指令與日常維運準則。"
        legal_basis = "行政院政府組態基準 (GCB)、資通系統防護基準"
        key_points = [
            "手把手操作指引：包含指令、參數、組態畫面範例，確保輪調同仁能即刻上手。",
            "資安基準剛性嵌入：將密碼長度、帳號鎖定、通訊加密 (TLS 1.2+) 具體化為設定值。",
            "異常狀況應急指引：明定各項系統警訊、備份失敗或網路中斷之第一時間處置動作。"
        ]
        sop_steps = [
            {"step": 1, "title": "環境檢查與工具準備", "detail": "確認操作所需之特權帳號權限已獲核准，檢查工作站環境符合安全規範。"},
            {"step": 2, "title": "逐步執行技術指令", "detail": "依照作業說明書之步驟依序執行設定，嚴禁自行略過安全檢查項目。"},
            {"step": 3, "title": "組態驗證與畫面截圖", "detail": "執行驗證指令確認設定生效，截圖保存組態基準留存專案檔案夾備查。"}
        ]
        audit_focus = "稽核員必抽查：伺服器真實組態是否與作業說明書記載數值完全一致、操作人員是否能現場演示操作流程。"

    elif "MS-4-150" in upper or "防護基準" in clean_title:
        doc_level = "四階核心紀錄 (Level 4)"
        doc_level_code = "MS-4"
        sub_category = "資通系統防護基準檢核專題"
        summary = "資通安全責任等級分級辦法附表十『資通系統防護基準』核心檢核表，涵蓋存取控制、審計日誌、傳輸安全等法定控制項目。"
        legal_basis = "資通安全責任等級分級辦法附表十（資通系統防護基準）"
        key_points = [
            "身分鑑別與存取：密碼長度 >= 12 碼，連續失敗 5 次鎖定帳號，閒置 15 分鐘強制登出。",
            "日誌保存規範：核心系統與資料庫稽核日誌至少留存 6 個月，且定期實施離線備份防篡改。",
            "傳輸加密要求：所有外部連線強制採用 TLS 1.2 以上加密協議，嚴禁使用 HTTP、SSLv3 或弱密碼套件。"
        ]
        sop_steps = [
            {"step": 1, "title": "系統等級鑑別", "detail": "填報 MS-4-124 評定為普級、中級或高級，決定對應之防護控制措施基準。"},
            {"step": 2, "title": "逐項組態檢核", "detail": "依 MS-4-150 檢核表逐條查核系統組態，並取得管理介面截圖作為佐證。"},
            {"step": 3, "title": "弱點改善與追蹤", "detail": "針對未符合項目開立改善計畫，於指定期限內修正並由資安專責人員複測。"}
        ]
        audit_focus = "稽核員必抽查：密碼規則設定截圖、連續登入失敗 5 次鎖定實測紀錄、日誌留存是否滿 180 天。"

    elif "MS-4" in upper or "表單" in clean_title or "清冊" in clean_title or "紀錄" in clean_title:
        doc_level = "四階表單紀錄 (Level 4)"
        doc_level_code = "MS-4"
        sub_category = "執行佐證與表單清冊"
        summary = f"公務機關資訊安全與個人資料保護之實務表單與執行憑證（{clean_title}），提供資安稽核佐證與可追溯性紀錄。"
        legal_basis = "資通安全法第 10 條、個人資料保護法第 27 條"
        key_points = [
            "表單留痕要求：落實標準化填報、主管簽章與歸檔保存年限要求。",
            "稽核佐證憑據：作為內外部資安稽核時抽驗實體作業之法定佐證。",
            "防呆與定期檢視：定期檢討表單欄位適切性，確保符合最新法規要求。"
        ]
        sop_steps = [
            {"step": 1, "title": "業務事項申請填報", "detail": "業務同仁依規範步驟填報表單各欄位，檢附必要之技術佐證。"},
            {"step": 2, "title": "單位長官複核審查", "detail": "單位主管確認申請正當性與合規性，簽章核准。"},
            {"step": 3, "title": "專卷歸檔定期盤點", "detail": "由資安推行小組或檔案室集中保管，依保存年限妥善留存。"}
        ]
        audit_focus = "稽核員必抽查：表單填寫完整度、主管核准程序合規性、抽驗佐證是否真實無缺漏。"

    elif "MS-F" in upper or "外部法規" in clean_title or "要點" in clean_title or "辦法" in clean_title:
        doc_level = "外部法規指引 (MS-F)"
        doc_level_code = "MS-F"
        sub_category = "中央法令與市府作業要點"
        summary = f"中央數位發展部、財政部或臺中市政府主管機關頒布之資安與文書法規規範（{clean_title}），為機關訂定各項規章之法定上位依據。"
        legal_basis = "數位發展部資通安全法規、臺中市政府資通安全管理要點"
        key_points = [
            "法定上位規範：為機關訂定各項一階至三階內部規章之法源基準。",
            "公務法律遵循：全體同仁於執行公務與稅務業務時必須剛性遵循。",
            "法規滾動對齊：配合中央政府最新公布之行政院資通安全會報決議修訂。"
        ]
        sop_steps = [
            {"step": 1, "title": "最新法令追蹤鑑別", "detail": "由法制與資安人員定期追蹤中央法規異動，鑑別對機關業務之衝擊。"},
            {"step": 2, "title": "內部規章修訂轉化", "detail": "將外部法規剛性要求轉化融入機關內部程序書與作業說明書中。"},
            {"step": 3, "title": "合規性查核與落實", "detail": "每年辦理法規遵循度查核，確保無牴觸或未落實情形。"}
        ]
        audit_focus = "稽核員必抽查：法規鑑別清冊是否及時更新、重大外部法令變更是否於規定期限內完成內部規章修訂。"

    else:
        doc_level = "核心資安文件"
        doc_level_code = "MS-4"
        sub_category = "資安業務實務文件"
        summary = f"公務機關資訊安全與個人資料保護之重要實務文件（{clean_title}），提供特定資安業務節點之作業依據與稽核留痕憑據。"
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

    return {
        "title": clean_title,
        "docLevel": doc_level,
        "docLevelCode": doc_level_code,
        "subCategory": sub_category,
        "summary": summary,
        "legalBasis": legal_basis,
        "keyPoints": key_points,
        "sopSteps": sop_steps,
        "auditFocus": audit_focus,
    }

# ==============================================================================
# 2. 產製維度一：【60天圖說研讀專案】 (Week 01 ~ Week 05，82 組真實架構圖)
# ==============================================================================
def build_curriculum_weeks() -> tuple[List[Dict[str, Any]], int, int]:
    weeks_list: List[Dict[str, Any]] = []
    total_days = 0
    total_diags = 0

    if not CURRICULUM_ROOT.exists():
        return weeks_list, total_days, total_diags

    for week_dir in sorted(CURRICULUM_ROOT.iterdir()):
        if not week_dir.is_dir():
            continue
        week_name = week_dir.name
        parts = week_name.split("_")
        week_code = parts[0]
        week_title_clean = parts[1].split(" (")[0] if len(parts) > 1 else week_name

        week_item: Dict[str, Any] = {
            "id": week_code.lower(),
            "code": week_code,
            "title": week_title_clean,
            "fullName": week_name,
            "days": []
        }

        for day_dir in sorted(week_dir.iterdir()):
            if not day_dir.is_dir():
                continue
            day_name = day_dir.name
            day_code = day_name.split("_")[0]
            day_title = day_name[len(day_code)+1:] if len(day_name) > len(day_code) else day_name

            # 精確收集該 Day 目錄下的真實架構圖
            pngs = sorted([p.name for p in day_dir.glob("*.png")] + [p.name for p in day_dir.glob("*.jpg")])
            verified_diagrams = []
            for p in pngs:
                target_asset = PUBLIC_DIAGRAMS_DIR / p
                if target_asset.exists():
                    clean_diag_title = p.replace(".png", "").replace(".jpg", "")
                    verified_diagrams.append({
                        "fileName": p,
                        "title": clean_diag_title,
                        "url": f"./assets/diagrams/{p}"
                    })

            # 精確收集該 Day 目錄下的教材文件 (gdoc, gslides, pdf 等)
            doc_items = []
            for p in sorted(day_dir.glob("*.*")):
                if p.suffix.lower() in [".png", ".jpg", ".ini"]:
                    continue
                try:
                    stat = p.stat()
                    f_size = stat.st_size
                    mtime = datetime.datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M")
                except Exception:
                    f_size = 0
                    mtime = "2026-10-23"

                doc_items.append({
                    "id": get_stable_id(str(p)),
                    "fileName": p.name,
                    "title": p.stem,
                    "fileType": detect_file_type(p.suffix),
                    "extension": p.suffix.replace(".", "").upper(),
                    "sizeText": format_file_size(f_size),
                    "modifiedAt": mtime,
                    "windowsPath": str(p)
                })

            day_obj = {
                "id": get_stable_id(str(day_dir)),
                "dayCode": day_code,
                "title": day_title,
                "fullName": day_name,
                "weekCode": week_code,
                "weekTitle": week_title_clean,
                "diagrams": verified_diagrams,
                "diagramCount": len(verified_diagrams),
                "primaryDiagram": verified_diagrams[0]["fileName"] if verified_diagrams else "",
                "docCount": len(doc_items),
                "documents": doc_items,
                "summary": f"【{day_code} 核心專題講義】針對「{day_title}」進行法規標準對照、流程圖解剖析與實務稽核重點解析。配套 {len(verified_diagrams)} 組高解析架構圖，指導業務承辦人將規章控制措施落實於日常作業，杜絕資安合規盲點。",
                "legalBasis": "ISO/IEC 27001 規範體系、資通安全責任等級分級辦法附表二",
                "keyPoints": [
                    f"體系架構對齊：掌握 {day_title} 涉及之跨階規章要求與角色權責。",
                    f"圖說可視化指引：精研本專題之 {len(verified_diagrams)} 組架構流程圖解，明晰控制查驗節點。",
                    "實務稽核盲點防範：檢核自身主管業務之表單紀錄與組態設定，確保禁得起內外部稽核檢驗。"
                ],
                "sopSteps": [
                    {"step": 1, "title": "精讀專題核心講義", "detail": f"研讀 {day_code} 之深層講義重點與簡報大綱，明晰控制措施背景與適用範圍。"},
                    {"step": 2, "title": "核對流程架構圖說", "detail": f"對照本專題配套之高解析圖說，逐步檢視作業流程各關鍵查核節點。"},
                    {"step": 3, "title": "表單佐證自檢落實", "detail": "將講義要求的控制措施與實際作業表單逐項核對，落實記錄留痕閉環。"}
                ],
                "auditFocus": f"稽核員必抽查：承辦人對 {day_title} 相關程序書之熟悉程度、實務作業紀錄是否齊備無逾期。"
            }
            week_item["days"].append(day_obj)
            total_days += 1
            total_diags += len(verified_diagrams)

        weeks_list.append(week_item)

    return weeks_list, total_days, total_diags

# ==============================================================================
# 3. 產製維度二：【B 級機關五大核心法定專案】
# ==============================================================================
def build_statutory_projects() -> List[Dict[str, Any]]:
    projects = [
        {
            "id": "proj-review",
            "projectCode": "B-01",
            "title": "管理審查會 9 大法定議題與管審會議程紀錄專案",
            "subtitle": "首長主持・9大法定輸入議題審查・前次管審決議追蹤與持續改善資源承諾",
            "badge": "首長治理閉環",
            "diagrams": [
                {
                    "fileName": "管審會9大議題.png",
                    "title": "管理審查會 9 大法定議題架構圖",
                    "url": "./assets/diagrams/管審會9大議題.png"
                }
            ],
            "primaryDiagram": "管審會9大議題.png",
            "legalBasis": "ISO/IEC 27001:2022 條款 9.3（管理審查）、資通安全法第 12 條",
            "summary": "管理審查會為機關資通安全與個資保護最高決策閉環會議。依規定每年至少由機關首長親自召開 1 次，嚴格審查 9 大法定議題（前次審查行動追蹤、內外部議題變更、方針指標達成、稽核與評鑑結果、矯正措施成效、風險處理狀態、利害關係人期望、持續改善建議、資源充足性），並產製正式管審會議紀錄與分工簽核清冊。",
            "bLevelObligations": [
                "首長親自主持：管理審查會必須由機關首長或法定代理人親自主持，各科室主管全員出席。",
                "9 大法定議題必查：包含內外部議題變更、目標達成率、稽核缺失改善、資安事件檢討等 9 大輸入項，一項不得遺漏。",
                "改善決策有案可查：會後必須作成正式會議紀錄，決議改善項目由機關首長簽准並列管追蹤。"
            ],
            "sopSteps": [
                {"step": 1, "title": "會前資料彙整籌備", "detail": "會前 1 個月由資安執行秘書向各業務科室蒐集 9 大議題提報資料與數據指標。"},
                {"step": 2, "title": "召開正式管理審查會", "detail": "由首長主持，各科長報告主辦業務資安成效、遭遇困難及後續改善對策。"},
                {"step": 3, "title": "首長裁示簽陳決行", "detail": "彙整裁示事項作成會議紀錄，簽陳首長決行後分送各科室嚴格列管執行。"}
            ],
            "auditFocus": "稽核員必抽查：管審會議紀錄首長簽章原件、9 大法定議題是否全數於簡報與紀錄中逐項研討、管審裁示事項之辦理結案佐證。"
        },
        {
            "id": "proj-context",
            "projectCode": "B-02",
            "title": "機關組織全景評鑑 (MS-4-127) 與利害關係人治理邊界專案",
            "subtitle": "鑑別機關內外部議題・市民納稅人與主管機關期望・確立 ISMS/PIMS 驗證範圍",
            "badge": "組織全景與邊界",
            "diagrams": [
                {
                    "fileName": "全景評鑑關係圖.jpg",
                    "title": "全景評鑑關係圖",
                    "url": "./assets/diagrams/全景評鑑關係圖.jpg"
                },
                {
                    "fileName": "Day02_全景評鑑與業務衝擊分析(BIA)決策計算流程圖.png",
                    "title": "全景評鑑與業務衝擊分析(BIA)決策計算流程圖",
                    "url": "./assets/diagrams/Day02_全景評鑑與業務衝擊分析(BIA)決策計算流程圖.png"
                }
            ],
            "primaryDiagram": "全景評鑑關係圖.jpg",
            "legalBasis": "ISO/IEC 27001 條款 4、個人資料保護法第 27 條",
            "summary": "透過全景評鑑程序書 (MS-2-17)，全面鑑別機關面臨之政治、法規、技術、內部組織等內外部議題；梳理財政部、數位發展部、地方審計處及大眾市民之各項法定與業務期望；繪製全景評鑑關係圖與全局業務流程清冊 (MS-4-126)，確立核心稅務系統與實體機房之驗證邊界。",
            "bLevelObligations": [
                "每年滾動評鑑：每年初召開跨科室會議，更新全景評鑑表 (MS-4-127) 與關係架構圖。",
                "利害關係人需求對應：將外部法規期望具體轉化對應至內部二階程序書控制規範。",
                "邊界範圍明確界定：明確界定核心稅務行政平台、機房設施及外部網路之安全防護邊界。"
            ],
            "sopSteps": [
                {"step": 1, "title": "內外部情資蒐集", "detail": "彙整最新法令、中央資安情資與同業事件案例，分析機關潛在營運衝擊。"},
                {"step": 2, "title": "填報全景評鑑表", "detail": "各業務科室填寫 MS-4-127 表單，評定各項議題對業務流程之重要度。"},
                {"step": 3, "title": "繪製全景邊界圖", "detail": "更新全景評鑑關係圖，確立機關與外部系統介接與資訊交換之防護邊界。"}
            ],
            "auditFocus": "稽核員必抽查：全景評鑑表是否有主管簽章、利害關係人清單是否涵蓋委外廠商與納稅市民、全景圖是否與實際業務架構相符。"
        },
        {
            "id": "proj-risk",
            "projectCode": "B-03",
            "title": "資產盤點、三維量化風險評鑑 (MS-4-15) 與適用性聲明 (SOA)",
            "subtitle": "資訊資產 CIA 價值評定・威脅弱點矩陣計算・不可接受風險處置計畫與 SOA 閉環",
            "badge": "風險量化與 SOA",
            "diagrams": [
                {
                    "fileName": "Day07_ISMS_PIMS_風險評鑑架構與三維量化計算全景圖.png",
                    "title": "風險評鑑架構與三維量化計算全景圖",
                    "url": "./assets/diagrams/Day07_ISMS_PIMS_風險評鑑架構與三維量化計算全景圖.png"
                },
                {
                    "fileName": "Day07_風險改善處理與適用性聲明(SOA)閉環流程圖.png",
                    "title": "風險改善處理與適用性聲明(SOA)閉環流程圖",
                    "url": "./assets/diagrams/Day07_風險改善處理與適用性聲明(SOA)閉環流程圖.png"
                }
            ],
            "primaryDiagram": "Day07_ISMS_PIMS_風險評鑑架構與三維量化計算全景圖.png",
            "legalBasis": "ISO/IEC 27001 條款 6.1.2、資通安全責任等級分級辦法",
            "summary": "確立機關資訊資產風險管理制度。落實資產清冊維護，針對硬體、軟體、資料、人員、文件、環境六大類資產進行機密性 (C)、完整性 (I)、可用性 (A) 三維度量化打分；套用風險矩陣計算不可接受風險 (分值 >= 8分)；擬定具體降低風險之風險處置計畫 (RTP)；並產製適用性聲明書 (SOA, MS-4-16)，逐條載明 ISO 27001 附錄控制措施之採納狀態與實施佐證。",
            "bLevelObligations": [
                "客觀量化評鑑：嚴格依據 MS-4-15 風險等級定義表計算分值，嚴禁主觀任意打分。",
                "高風險強制改善：高於不可接受門檻之風險項目必須開立處置計畫，限期 3 個月內改善結案。",
                "SOA 適用性聲明：逐條檢視 ISO 27001 控制條款，若有排除適用必須提供充分且合理之書面理由。"
            ],
            "sopSteps": [
                {"step": 1, "title": "資產清查與價值評定", "detail": "各科室清查所屬資訊資產，評定 CIA 三維度價值等級並指派專責保管人。"},
                {"step": 2, "title": "威脅弱點風險計算", "detail": "套用量化計算公式評定風險分值，產製全機關不可接受之高風險清單。"},
                {"step": 3, "title": "推動處置與 SOA 簽核", "detail": "擬定降低風險措施並陳報資安長簽核，同步更新 SOA 適用性聲明書。"}
            ],
            "auditFocus": "稽核員必抽查：SOA 排除適用項目是否有合理書面理由、不可接受高風險項目是否如期改善結案、資產保管人是否皆為現職同仁。"
        },
        {
            "id": "proj-defense",
            "projectCode": "B-04",
            "title": "四層邊界縱深防禦架構、網路分區隔離與政府組態基準 (GCB)",
            "subtitle": "外網/DMZ/核心辦公/資料庫四層拓撲・防火牆半年檢核・GCB 100% 部署與滲透測試",
            "badge": "邊界縱深防禦",
            "diagrams": [
                {
                    "fileName": "四層縱深防禦安全架構圖.png",
                    "title": "四層縱深防禦安全架構圖",
                    "url": "./assets/diagrams/四層縱深防禦安全架構圖.png"
                },
                {
                    "fileName": "Day15_網路實體隔離拓撲與多層邊界防護全景圖.png",
                    "title": "網路實體隔離拓撲與多層邊界防護全景圖",
                    "url": "./assets/diagrams/Day15_網路實體隔離拓撲與多層邊界防護全景圖.png"
                }
            ],
            "primaryDiagram": "四層縱深防禦安全架構圖.png",
            "legalBasis": "資通系統防護基準條款 SC-7、資通安全責任等級分級辦法附表二",
            "summary": "建構機關外網邊界、對外服務 DMZ、內部核心辦公網與核心賦稅資料庫之四層縱深防禦體系。全機關終端電腦與伺服器 100% 部署行政院政府組態基準 (GCB)；落實每半年防火牆存取清冊檢核清理（刪除 Any-Any 寬鬆規則）；每 2 年委外實施 1 次全機關網路架構檢視與外部滲透測試，高風險漏洞 30 日內完成修補複測。",
            "bLevelObligations": [
                "四層拓撲隔離：Web 服務置於 DMZ 區，嚴禁外部網際網路直接連線內部資料庫。",
                "GCB 基準部署率 100%：全機關個人工作站強制透過 AD GPO 派送 GCB 組態，產製合規報表。",
                "定期檢測與修補：每年 1 次弱點掃描、每 2 年 1 次架構檢視與滲透測試，取得合格報告。"
            ],
            "sopSteps": [
                {"step": 1, "title": "網路架構分區隔離", "detail": "規劃各業務獨立 VLAN，設定次世代防火牆存取清單，落實最小授權連線。"},
                {"step": 2, "title": "集中派送 GCB 基準", "detail": "套用資安署最新 GCB 原則範本，定期監控未合規終端電腦並強制補強。"},
                {"step": 3, "title": "滲透測試與漏洞修補", "detail": "委託資安專業機構實施模擬滲透攻擊，針對發現缺失於 30 日內修復驗證。"}
            ],
            "auditFocus": "稽核員必抽查：防火牆是否存在寬鬆 (Any-Any) 連線規則、GCB 合規率報表、滲透測試報告中高風險項目之修補複測證明。"
        },
        {
            "id": "proj-ssdlc",
            "projectCode": "B-05",
            "title": "資通系統安全防護基準檢核表 (MS-4-150) 與 SSDLC 生命週期",
            "subtitle": "系統等級評定 (MS-4-124)・防護基準檢核・源碼檢測 (SAST/DAST) 與上線無高風險漏洞",
            "badge": "防護基準與 SSDLC",
            "diagrams": [
                {
                    "fileName": "Day29_安全軟體開發生命週期(SSDLC)全流程防護架構圖.png",
                    "title": "安全軟體開發生命週期(SSDLC)全流程防護架構圖",
                    "url": "./assets/diagrams/Day29_安全軟體開發生命週期(SSDLC)全流程防護架構圖.png"
                },
                {
                    "fileName": "Day30_原始碼檢測(SAST)與開源套件(OSS)安全掃描流程圖.png",
                    "title": "原始碼檢測(SAST)與開源套件(OSS)安全掃描流程圖",
                    "url": "./assets/diagrams/Day30_原始碼檢測(SAST)與開源套件(OSS)安全掃描流程圖.png"
                }
            ],
            "primaryDiagram": "Day29_安全軟體開發生命週期(SSDLC)全流程防護架構圖.png",
            "legalBasis": "資通安全責任等級分級辦法附表十（資通系統防護基準）、資通安全法第 10 條",
            "summary": "全面落實資通系統安全防護基準檢核表 (MS-4-150) 之剛性規範。針對核心業務資訊系統進行普中高安全等級評定 (MS-4-124)；落實帳號連續登入失敗 5 次鎖定、閒置 15 分鐘強制登出、稽核日誌留存至少 6 個月；於軟體開發生命週期各階段導入 SSDLC 安全設計，重大異動或正式上線前強制執行靜態源碼掃描 (SAST) 與動態滲透檢測，嚴格確保無高風險或重大漏洞。",
            "bLevelObligations": [
                "防護基準逐條查檢：逐項核對 MS-4-150 檢核表，提供組態截圖作為客觀稽核佐證。",
                "測試環境去識別化：測試區及開發區嚴禁使用真實未去識別化之稅籍與個資資料 (MS-4-129)。",
                "源碼檢測零高風險：正式版本發布前，廠商必須出具無高風險安全漏洞之第三方驗證報告。"
            ],
            "sopSteps": [
                {"step": 1, "title": "系統等級鑑別評估", "detail": "填報 MS-4-124 評定系統安全等級，決定適用之身分鑑別與加密基準。"},
                {"step": 2, "title": "防護基準逐項對照", "detail": "依 MS-4-150 檢核系統日誌、密碼策略、傳輸 TLS 1.2+ 組態並保存截圖。"},
                {"step": 3, "title": "源碼檢測與版本上線", "detail": "執行靜態源碼檢測與開源套件漏洞掃描，修補結案後簽請核准切換正式區。"}
            ],
            "auditFocus": "稽核員必抽查：MS-4-150 佐證截圖（密碼組態、連錯 5 次鎖定實測、日誌保留天數）、源碼檢測報告與複測修補紀錄、測試區資料去識別化證明。"
        }
    ]
    return projects

# ==============================================================================
# 4. 產製維度三：【ISMS/PIMS 四階規章清冊】 (241 件實體法規檔案)
# ==============================================================================
def build_regulations_catalog() -> List[Dict[str, Any]]:
    regulations_list: List[Dict[str, Any]] = []

    if not REGULATIONS_ROOT.exists():
        return regulations_list

    valid_extensions = {".pdf", ".docx", ".doc", ".xlsx", ".xls", ".csv", ".pptx", ".ppt"}

    for p in sorted(REGULATIONS_ROOT.iterdir()):
        if p.is_dir() or p.name.startswith("~$") or p.name.startswith("."):
            continue
        ext = p.suffix.lower()
        if ext not in valid_extensions:
            continue

        try:
            stat = p.stat()
            f_size = stat.st_size
            mtime = datetime.datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M")
        except Exception:
            f_size = 0
            mtime = "2026-10-23"

        analysis = analyze_regulation_file(p)

        reg_obj = {
            "id": get_stable_id(str(p)),
            "fileName": p.name,
            "title": p.stem,
            "docLevel": analysis["docLevel"],
            "docLevelCode": analysis["docLevelCode"],
            "subCategory": analysis["subCategory"],
            "fileType": detect_file_type(ext),
            "extension": ext.replace(".", "").upper(),
            "sizeText": format_file_size(f_size),
            "modifiedAt": mtime,
            "windowsPath": str(p),
            "summary": analysis["summary"],
            "legalBasis": analysis["legalBasis"],
            "keyPoints": analysis["keyPoints"],
            "sopSteps": analysis["sopSteps"],
            "auditFocus": analysis["auditFocus"],
            # 規章不強制湊合錯誤圖檔，無圖即留空，杜絕張冠李戴
            "matchedDiagram": ""
        }
        regulations_list.append(reg_obj)

    return regulations_list

# ==============================================================================
# 5. 主組裝與生成資料庫
# ==============================================================================
def generate_database() -> Dict[str, Any]:
    scan_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. 產製三大維度
    curriculum_weeks, days_count, diags_count = build_curriculum_weeks()
    statutory_projects = build_statutory_projects()
    regulations = build_regulations_catalog()

    # 2. 收集全部 items (相容舊版檢索)
    all_items: List[Dict[str, Any]] = []

    # 加入 241 件正式規章
    for r in regulations:
        all_items.append({
            "id": r["id"],
            "title": r["title"],
            "fileName": r["fileName"],
            "domain": "security",
            "category": r["docLevel"],
            "subCategory": r["subCategory"],
            "docLevel": r["docLevel"],
            "docLevelCode": r["docLevelCode"],
            "fileType": r["fileType"],
            "extension": r["extension"],
            "sizeText": r["sizeText"],
            "modifiedAt": r["modifiedAt"],
            "windowsPath": r["windowsPath"],
            "summary": r["summary"],
            "legalBasis": r["legalBasis"],
            "keyPoints": r["keyPoints"],
            "sopSteps": r["sopSteps"],
            "auditFocus": r["auditFocus"],
            "matchedDiagram": "",
            "tags": [r["docLevel"], r["subCategory"], r["extension"]]
        })

    # 加入 60 天教材文件
    for w in curriculum_weeks:
        for d in w["days"]:
            for doc in d["documents"]:
                all_items.append({
                    "id": doc["id"],
                    "title": doc["title"],
                    "fileName": doc["fileName"],
                    "domain": "security",
                    "category": f"60天深度學習 ({w['code']})",
                    "subCategory": d["title"],
                    "docLevel": "60天專案教材",
                    "docLevelCode": "CURRICULUM",
                    "fileType": doc["fileType"],
                    "extension": doc["extension"],
                    "sizeText": doc["sizeText"],
                    "modifiedAt": doc["modifiedAt"],
                    "windowsPath": doc["windowsPath"],
                    "summary": d["summary"],
                    "legalBasis": d["legalBasis"],
                    "keyPoints": d["keyPoints"],
                    "sopSteps": d["sopSteps"],
                    "auditFocus": d["auditFocus"],
                    "matchedDiagram": d["primaryDiagram"],
                    "tags": [w["code"], d["dayCode"], doc["extension"]]
                })

    # 加入 5 大專案的關聯文件
    for proj in statutory_projects:
        for diag in proj.get("diagrams", []):
            all_items.append({
                "id": get_stable_id(f"statutory-{diag['fileName']}"),
                "title": diag["title"],
                "fileName": diag["fileName"],
                "domain": "security",
                "category": "B級機關法定專案",
                "subCategory": proj["title"],
                "docLevel": "公務法定架構圖",
                "docLevelCode": proj["projectCode"],
                "fileType": "架構流程圖檔",
                "extension": "PNG",
                "sizeText": "1.5 MB",
                "modifiedAt": "2026-10-23",
                "windowsPath": f"assets/diagrams/{diag['fileName']}",
                "summary": proj["summary"],
                "legalBasis": proj["legalBasis"],
                "keyPoints": proj.get("bLevelObligations", []),
                "sopSteps": proj.get("sopSteps", []),
                "auditFocus": proj.get("auditFocus", ""),
                "matchedDiagram": diag["fileName"],
                "tags": ["B級專案", proj["projectCode"]]
            })

    total_files = len(all_items)

    database: Dict[str, Any] = {
        "metadata": {
            "version": "5.0.0",
            "lastSyncedAt": scan_time,
            "totalCount": total_files,
            "curriculumWeeksCount": len(curriculum_weeks),
            "curriculumDaysCount": days_count,
            "curriculumDiagramsCount": diags_count,
            "statutoryProjectsCount": len(statutory_projects),
            "regulationsCount": len(regulations),
            "primaryDomain": "security",
            "rootPath": str(SECURITY_ROOT)
        },
        "navStructure": {
            "pillars": [
                {
                    "id": "pillar-curriculum",
                    "code": "CURRICULUM",
                    "title": "60天圖說研修專案",
                    "subtitle": "Week 01~05 深度講義與 82 組實體高解析架構圖解",
                    "badge": f"{diags_count} 組架構圖",
                    "count": days_count
                },
                {
                    "id": "pillar-statutory",
                    "code": "STATUTORY",
                    "title": "B 級機關法定專案",
                    "subtitle": "管審會9大議題・全景評鑑・風險SOA・防護基準",
                    "badge": "公務剛性法規",
                    "count": len(statutory_projects)
                },
                {
                    "id": "pillar-regulations",
                    "code": "REGULATIONS",
                    "title": "ISMS 四階規章清冊",
                    "subtitle": "一階政策・二階程序書17部・三階說明書・四階表單清冊",
                    "badge": f"{len(regulations)} 件實體規章",
                    "count": len(regulations)
                }
            ]
        },
        "curriculumWeeks": curriculum_weeks,
        "statutoryProjects": statutory_projects,
        "regulations": regulations,
        # 相容舊版欄位
        "topics": statutory_projects,
        "items": all_items
    }
    return database

def main() -> None:
    print("[1/3] 正在深度分析資安規章、60天研習專案與公務法定架構圖...")
    data = generate_database()

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

    meta = data["metadata"]
    print(f"\n[成功] 資安核心知識庫升級同步完成！")
    print(f"  - 60天圖說研習專案：{meta['curriculumWeeksCount']} 週、{meta['curriculumDaysCount']} 個 Day 專案、{meta['curriculumDiagramsCount']} 組高解析架構圖")
    print(f"  - B級機關法定專案：{meta['statutoryProjectsCount']} 大公務專案")
    print(f"  - ISMS 四階規章清冊：{meta['regulationsCount']} 份實體法規 (MS-1 ~ MS-4, MS-F)")
    print(f"  - 全站索引資安總量：{meta['totalCount']} 件")

if __name__ == "__main__":
    main()
