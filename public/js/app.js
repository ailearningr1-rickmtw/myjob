/**
 * 工作中樞平台前端核心邏輯 (ES6+)
 * 負責管理五大主題路由、關鍵字檢索、主題配色切換、構想筆記，
 * 以及「主題五：多元活動與非正式任務中心」旗下之兩大關聯子系統：
 * 1. 多功能問卷調查與尾牙餐點/活動票選系統 (與尾牙抽獎共用員工名單，支援選項附檔檢視、網頁評價查詢、Canvas 統計分析與一鍵複製 LINE 群組通知)
 * 2. 歲末年終尾牙自動化抽獎系統 (支援全畫面沉浸模式、左右懸掛搖曳鞭炮串與宮燈、獨立匯入頁、大型開獎舞台、手動控制輪動與煙花特效)
 */

const WORKSPACE_THEMES = [
    {
        id: "theme-01",
        code: "MOD-01",
        navShortName: "任務專案",
        title: "主題一：任務與專案中樞",
        subtitle: "Task & Project Nexus",
        status: "預留擴充區",
        description: "整合日常工作待辦、專案進度追蹤、里程碑檢視與優先級排程的核心管理區塊。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path></svg>`,
        slots: [
            { name: "每日重點工作清單與看板", tag: "SLOT-1A", detail: "支援拖曳狀態與優先級標記的輕量化工作看板。" },
            { name: "專案時程與里程碑追蹤", tag: "SLOT-1B", detail: "視覺化檢視各專案階段目標與交付期限。" },
            { name: "會議紀錄與行動項目追蹤", tag: "SLOT-1C", detail: "快速整理會議結論並轉化為具體可執行任務。" }
        ]
    },
    {
        id: "theme-02",
        code: "MOD-02",
        navShortName: "效率工具",
        title: "主題二：自動化與效率工具箱",
        subtitle: "Automation & Utility Lab",
        status: "預留擴充區",
        description: "放置常用工作腳本觸發器、格式轉換工具、表單生成器與批次處理小工具的效率引擎。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>`,
        slots: [
            { name: "結構化資料與文字格式轉換器", tag: "SLOT-2A", detail: "提供 JSON、CSV、Markdown 等常見工作格式快速互轉。" },
            { name: "常用參數計算與範本生成器", tag: "SLOT-2B", detail: "一鍵套用標準化工作信件、報告或指令範本。" },
            { name: "Python 後端自動化腳本連動介面", tag: "SLOT-2C", detail: "銜接 src 目錄下之 Python 腳本產出結果與靜態報表。" }
        ]
    },
    {
        id: "theme-03",
        code: "MOD-03",
        navShortName: "數據觀測",
        title: "主題三：數據觀測與視覺化儀表板",
        subtitle: "Metrics & Analytics Pulse",
        status: "預留擴充區",
        description: "呈現關鍵業務指標、系統運維狀態、工作產出統計與各類圖表分析的視覺化觀測站。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="2" y1="20" x2="22" y2="20"></line></svg>`,
        slots: [
            { name: "核心工作指標即時概覽", tag: "SLOT-3A", detail: "彙整週期性關鍵績效數據與趨勢變化。" },
            { name: "專案資源分配與工時統計圖表", tag: "SLOT-3B", detail: "清楚掌握各工作項目投入比例與負荷狀態。" },
            { name: "外部資料源靜態快照匯入檢視", tag: "SLOT-3C", detail: "支援讀取本地或遠端 JSON 數據檔並渲染圖表。" }
        ]
    },
    {
        id: "theme-04",
        code: "MOD-04",
        navShortName: "知識文件",
        title: "主題四：知識庫與技術文件中心",
        subtitle: "Knowledge & Docs Vault",
        status: "預留擴充區",
        description: "集中管理標準作業流程（SOP）、技術筆記、問題排解指南與常見問答的結構化智庫。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
        slots: [
            { name: "標準作業流程 (SOP) 快速檢索", tag: "SLOT-4A", detail: "依分類標籤快速查找工作規範與執行步驟。" },
            { name: "技術筆記與程式碼片段收藏庫", tag: "SLOT-4B", detail: "儲存常用指令、架構設計與除錯紀錄。" },
            { name: "專案架構與常見問題知識索引", tag: "SLOT-4C", detail: "建立跨部門或個人工作交接所需的完整文件索引。" }
        ]
    },
    {
        id: "theme-05",
        code: "MOD-05",
        navShortName: "多元活動",
        title: "主題五：多元活動與非正式任務中心",
        subtitle: "Special Events & Informal Hub",
        status: "雙核心系統已啟用",
        description: "收納公司節慶活動、餐飲票選調查與非正式專案任務的彈性工作區。內建共用員工名單之「多功能問卷調查與餐點票選系統」與「年終尾牙自動化抽獎系統」。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        slots: [
            { name: "前置系統：多功能問卷調查與餐點票選 (已啟用)", tag: "SYS-5A", detail: "與尾牙共用員工名單，支援主餐與飲料設定、附檔介紹檢視、網頁評價查詢、統計圖表與一鍵複製 LINE 通知。" },
            { name: "活動系統：歲末年終尾牙自動化抽獎 (已啟用)", tag: "SYS-5B", detail: "承接問卷名單，具備左右懸掛鞭炮串、紅金喜慶大舞台、手動控制輪動與全螢幕煙花。" },
            { name: "擴充預留：團隊競賽計分與臨時任務看板 (預留)", tag: "SLOT-5C", detail: "預留供日後擴充活動即時排行榜、趣味問答計分與現場互動任務。" }
        ]
    }
];

const DEFAULT_PRIZE_CONFIGS = [
    { name: "頭獎", amount: "NT$ 50,000" },
    { name: "貳獎", amount: "NT$ 30,000" },
    { name: "參獎", amount: "NT$ 15,000" },
    { name: "肆獎", amount: "NT$ 8,000" },
    { name: "伍獎", amount: "NT$ 5,000" },
    { name: "特別加碼獎", amount: "NT$ 10,000" }
];

const REHEARSAL_SAMPLE_NAMES = [
    "研發一部 - 陳建宏", "研發一部 - 林雅婷", "研發一部 - 張家豪", "研發一部 - 許詩涵", "研發一部 - 王冠宇",
    "研發二部 - 李宗翰", "研發二部 - 吳佳穎", "研發二部 - 劉承恩", "研發二部 - 蔡宜蓁", "研發二部 - 楊俊傑",
    "產品設計部 - 鄭宇軒", "產品設計部 - 謝欣妤", "產品設計部 - 郭柏翰", "產品設計部 - 洪千惠", "產品設計部 - 邱品睿",
    "營運企劃部 - 曾郁婷", "營運企劃部 - 廖家瑋", "營運企劃部 - 賴佩珊", "營運企劃部 - 徐瑋倫", "營運企劃部 - 周心怡",
    "業務拓展部 - 葉哲瑋", "業務拓展部 - 蘇庭萱", "業務拓展部 - 莊博鈞", "業務拓展部 - 呂思穎", "業務拓展部 - 江政勳",
    "行政管理部 - 何佳琪", "行政管理部 - 蕭宇廷", "行政管理部 - 羅雅雯", "行政管理部 - 高志豪", "行政管理部 - 潘怡君"
];

/**
 * 預設內建之多主題票選活動範本（支援尾牙餐點票選、部門聚餐下午茶與任意自訂票選主題）
 */
const DEFAULT_SURVEY_CAMPAIGNS = [
    {
        id: "campaign-yearend-meal",
        title: "歲末年終尾牙 — 當日主餐與飲品票選調查",
        description: "請各位同仁於尾牙活動前完成當日「主餐」與「飲品」票選，可點選各品項下方按鈕查看菜單附檔介紹或查詢網路食記評價。",
        primaryCategoryLabel: "第一部分：當日主餐選擇（必選一項）",
        secondaryCategoryLabel: "第二部分：當日飲品選擇（必選一項）",
        officialUrl: "https://www.google.com/search?q=%E5%B0%BE%E7%89%99+%E7%B2%BE%E7%B7%BB%E5%A5%97%E9%A4%90+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
        attachmentTitle: "歲末年終尾牙盛宴 — 完整菜單與過敏原說明書.doc",
        attachmentContent: "【歲末年終尾牙盛宴・主廚精選菜單介紹】\n\n一、主餐供應說明：\n1. 炙燒頂級肋眼牛排套餐：嚴選美國 Prime 等級肋眼（建議熟度 5 至 7 分熟），佐黑松露紅酒醬與季節時蔬。\n2. 法式香草烤春雞佐松露醬：採用屏東放牧春雞，以迷迭香與百里香低溫慢烤，外皮酥脆肉質多汁。\n3. 北海道干貝明蝦海鮮雙拼：生食級北海道大干貝香煎搭配澎湖野生大明蝦，佐檸檬奶油白酒醬。\n4. 松露野菇堅果蔬食燉飯（全素可用）：義大利 Carnaroli 米燉煮牛肝菌、黑松露醬與烘烤核桃。\n\n二、飲品供應說明：\n所有飲品皆可於備註欄註明冰塊（正常／少冰／去冰／溫／熱）與甜度需求。",
        attachmentDataUrl: "",
        primaryOptions: [
            {
                id: "main-01",
                name: "炙燒頂級肋眼牛排套餐",
                tag: "人氣首選",
                desc: "嚴選 Prime 肋眼牛排（建議 7 分熟），搭配黑松露紅酒沾醬、爐烤蒜球與季節時蔬。",
                refUrl: "https://www.google.com/search?q=%E7%82%99%E7%87%92%E8%82%8B%E7%9C%BC%E7%89%9B%E6%8E%92%E5%A5%97%E9%A4%90+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "【餐點規格】10 oz 美國 Prime 肋眼牛排\n【包含配菜】松露薯泥、蘆筍、紅酒牛肉汁\n【備註提醒】如需全熟或更改醬料請於下方備註欄填寫。",
                attachDataUrl: ""
            },
            {
                id: "main-02",
                name: "法式香草烤春雞佐松露醬",
                tag: "不吃牛推薦",
                desc: "鮮嫩春雞以多種法式香草醃製慢烤，表皮金黃酥脆，附烤馬鈴薯角與溫野菜。",
                refUrl: "https://www.google.com/search?q=%E6%B3%95%E5%BC%8F%E9%A6%99%E8%8D%89%E7%83%A4%E6%98%A5%E9%9B%9E+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "【餐點規格】整隻法式普羅旺斯香草烤春雞\n【風味特色】迷迭香、百里香、初榨橄欖油爐烤，無牛肉成分。",
                attachDataUrl: ""
            },
            {
                id: "main-03",
                name: "北海道干貝明蝦海鮮雙拼",
                tag: "主廚海味",
                desc: "生食級大干貝與野生海大蝦鐵板香煎，佐法式番紅花檸檬奶油醬。",
                refUrl: "https://www.google.com/search?q=%E5%B9%B2%E8%B2%9D%E6%98%8E%E8%9D%A6%E6%B5%B7%E9%AE%AE%E9%9B%99%E6%8B%BC+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "【餐點規格】北海道 2L 干貝 3 顆 ＋ 野生大明蝦 2 尾\n【過敏原提示】本餐點含甲殼類與貝類海鮮。",
                attachDataUrl: ""
            },
            {
                id: "main-04",
                name: "松露野菇堅果蔬食燉飯 (全素)",
                tag: "精緻蔬食",
                desc: "嚴選義大利米與頂級黑松露醬、綜合森林野菇及烘烤堅果慢火燉煮（全素可食）。",
                refUrl: "https://www.google.com/search?q=%E6%9D%BE%E9%9C%B2%E9%87%8E%E8%8F%87%E7%87%89%E9%A3%AF+%E7%94%A8%E9%A4%90%E8%A9%95%E5%83%B9",
                attachNote: "【餐點規格】全素／蛋奶素皆可調整（預設為全素無五辛）\n【主要食材】黑松露醬、杏鮑菇、鴻喜菇、松子、腰果。",
                attachDataUrl: ""
            }
        ],
        secondaryOptions: [
            {
                id: "drink-01",
                name: "手沖蜜香紅烏龍 (微糖/無糖)",
                tag: "台灣特色茶",
                desc: "台東鹿野蜜香紅烏龍，帶有天然熟果香與蜂蜜尾韻，冷熱皆宜。",
                refUrl: "https://www.google.com/search?q=%E8%9C%9C%E9%A6%99%E7%B4%85%E7%83%8F%E9%BE%8D+%E9%A3%B2%E6%96%99+%E8%A9%95%E5%83%B9",
                attachNote: "【甜度冰塊】預設微糖少冰，如需無糖或熱飲請於備註欄說明。",
                attachDataUrl: ""
            },
            {
                id: "drink-02",
                name: "鮮榨紅心芭樂檸檬綠茶",
                tag: "清爽解膩",
                desc: "新鮮紅心芭樂原汁搭配屏東檸檬與茉莉綠茶，富含維他命 C，清爽解膩。",
                refUrl: "https://www.google.com/search?q=%E7%B4%85%E5%BF%83%E8%8A%AD%E6%A8%82%E6%AA%B8%E6%AA%AC%E7%B6%A0+%E8%A9%95%E5%83%B9",
                attachNote: "【飲品特色】新鮮現榨果汁調和，僅提供冷飲（少冰／去冰）。",
                attachDataUrl: ""
            },
            {
                id: "drink-03",
                name: "莊園精品拿鐵咖啡 (冰/熱)",
                tag: "經典醇厚",
                desc: "中深焙阿拉比卡精品配方豆萃取，融合小農鮮乳，口感滑順濃厚。",
                refUrl: "https://www.google.com/search?q=%E8%8E%8A%E5%9C%92%E6%8B%BF%E9%90%B5%E5%92%96%E5%95%A1+%E8%A9%95%E5%83%B9",
                attachNote: "【飲品特色】無加糖配方，可選冰拿鐵或熱拿鐵。",
                attachDataUrl: ""
            },
            {
                id: "drink-04",
                name: "氣泡接骨木花果茶 (無咖啡因)",
                tag: "無咖啡因",
                desc: "歐洲接骨木花蜜融合綜合莓果與綿密氣泡水，完全無咖啡因負擔。",
                refUrl: "https://www.google.com/search?q=%E6%8E%A5%E9%AA%A8%E6%9C%A8%E8%8A%B1%E6%9E%9C%E6%B0%A3%E6%B3%A1%E9%A3%B2+%E8%A9%95%E5%83%B9",
                attachNote: "【飲品特色】0 咖啡因，孕婦與對咖啡因敏感之同仁皆可安心飲用。",
                attachDataUrl: ""
            }
        ],
        votes: {}
    },
    {
        id: "campaign-team-outing",
        title: "年度部門聚餐與下午茶 — 餐廳與飲品汎用票選",
        description: "通用型多主題票選範例：可用於部門聚餐餐廳決策、下午茶團購、員工旅遊地點或福委會禮品方案調查。",
        primaryCategoryLabel: "第一部分：聚餐餐廳／主食方案選擇",
        secondaryCategoryLabel: "第二部分：搭配下午茶／飲品方案選擇",
        officialUrl: "https://www.google.com/search?q=%E9%83%A8%E9%96%80%E8%81%9A%E9%A4%90+%E4%BA%BA%E6%B0%A3%E9%A4%90%E5%BB%B3+%E6%8E%A8%E8%96%A6",
        attachmentTitle: "部門聚餐候選餐廳價位與交通資訊彙整表.doc",
        attachmentContent: "【部門聚餐候選餐廳彙整說明】\n1. 日式和牛燒肉專門店：位於捷運站步行 3 分鐘，提供獨立包廂。\n2. 義式手工窯烤披薩餐酒館：適合多人分享，提供素食義大利麵選項。\n3. 泰式皇家料理合菜餐廳：酸辣開胃，十人圓桌配置。",
        attachmentDataUrl: "",
        primaryOptions: [
            {
                id: "out-main-01",
                name: "日式和牛燒肉專門店",
                tag: "獨立包廂",
                desc: "專人代烤頂級和牛與伊比利豬拼盤，附無限量日式小菜與甜點。",
                refUrl: "https://www.google.com/search?q=%E6%97%A5%E5%BC%8F%E5%92%8C%E7%89%9B%E7%87%92%E8%82%89+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "人均預算約 NT$ 1,200，設有三間獨立十人包廂。",
                attachDataUrl: ""
            },
            {
                id: "out-main-02",
                name: "義式手工窯烤披薩餐酒館",
                tag: "輕鬆聚會",
                desc: "拿坡里認證龍眼木窯烤披薩、手工寬扁麵與歐陸開胃小點分享餐。",
                refUrl: "https://www.google.com/search?q=%E7%BE%A9%E5%BC%8F%E7%AA%AF%E7%83%A4%E6%8A%AB%E8%96%A9%E9%A4%90%E9%85%92%E9%A4%A8+%E8%A9%95%E5%83%B9",
                attachNote: "提供多款奶蛋素與全素窯烤料理，適合跨部門交流。",
                attachDataUrl: ""
            }
        ],
        secondaryOptions: [
            {
                id: "out-drink-01",
                name: "精品手搖茶飲外送方案",
                tag: "人手一杯",
                desc: "精選台灣原葉鮮奶茶與鮮果茶系列。",
                refUrl: "https://www.google.com/search?q=%E4%BA%BA%E6%B0%A3%E6%89%8B%E6%90%96%E9%A3%B2+%E5%BF%85%E5%96%9D+%E8%A9%95%E5%83%B9",
                attachNote: "可自選甜度與冰塊。",
                attachDataUrl: ""
            },
            {
                id: "out-drink-02",
                name: "法式千層蛋糕與濾掛咖啡組",
                tag: "甜點組合",
                desc: "手作水果千層切片蛋糕搭配莊園精品濾掛咖啡包。",
                refUrl: "https://www.google.com/search?q=%E6%B3%95%E5%BC%8F%E5%8D%83%E5%B1%A4%E8%9B%8B%E7%B3%95+%E4%B8%8B%E5%8D%88%E8%8C%B6+%E8%A9%95%E5%83%B9",
                attachNote: "蛋奶素可食。",
                attachDataUrl: ""
            }
        ],
        votes: {}
    }
];

const STORAGE_KEYS = {
    THEME_MODE: "aero_workspace_theme_mode",
    SCRATCHPAD: "aero_workspace_scratchpad",
    IDEA_BACKLOG: "aero_workspace_idea_backlog",
    LOTTERY_STATE: "aero_workspace_lottery_state_v2",
    LOTTERY_PASSCODE: "aero_workspace_lottery_passcode",
    LOTTERY_UNLOCKED_SESSION: "aero_workspace_lottery_unlocked",
    SURVEY_STATE: "aero_workspace_survey_state_v1"
};

/**
 * 全螢幕得獎慶祝煙花粒子引擎 (HTML5 Canvas 2D)
 */
class FireworksController {
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl ? canvasEl.getContext("2d") : null;
        this.particles = [];
        this.animationFrameId = null;
        this.burstTimerId = null;
        this.stopTimerId = null;

        if (this.canvas) {
            window.addEventListener("resize", () => this.resizeCanvas());
        }
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    launchCelebration(durationMs = 4800) {
        if (!this.canvas || !this.ctx) return;
        this.stop();
        this.resizeCanvas();
        this.canvas.classList.remove("is-hidden");

        this.spawnBurst(window.innerWidth * 0.22, window.innerHeight * 0.3);
        this.spawnBurst(window.innerWidth * 0.78, window.innerHeight * 0.3);
        this.spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.22);

        this.burstTimerId = setInterval(() => {
            const x = window.innerWidth * (0.16 + Math.random() * 0.68);
            const y = window.innerHeight * (0.15 + Math.random() * 0.45);
            this.spawnBurst(x, y);
        }, 380);

        this.stopTimerId = setTimeout(() => {
            if (this.burstTimerId) {
                clearInterval(this.burstTimerId);
                this.burstTimerId = null;
            }
        }, durationMs);

        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = this.particles.length - 1; i >= 0; i -= 1) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.065;
                p.vx *= 0.985;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }

            if (this.particles.length > 0 || this.burstTimerId !== null) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                this.stop();
            }
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    spawnBurst(centerX, centerY) {
        const palette = [
            "#fbbf24", "#f59e0b", "#fef08a", "#ef4444",
            "#f43f5e", "#10b981", "#38bdf8", "#a855f7"
        ];
        const count = 60;
        for (let i = 0; i < count; i += 1) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.22;
            const speed = 2.4 + Math.random() * 6.8;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 2.2 + Math.random() * 3,
                color: palette[Math.floor(Math.random() * palette.length)],
                alpha: 1,
                decay: 0.011 + Math.random() * 0.014
            });
        }
    }

    stop() {
        if (this.burstTimerId) {
            clearInterval(this.burstTimerId);
            this.burstTimerId = null;
        }
        if (this.stopTimerId) {
            clearTimeout(this.stopTimerId);
            this.stopTimerId = null;
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.particles = [];
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvas.classList.add("is-hidden");
        }
    }
}

/**
 * 應用程式狀態管理類別
 */
class WorkspaceApp {
    constructor() {
        this.activeRoute = "overview";
        this.searchQuery = "";
        this.ideaBacklog = this.loadIdeaBacklog();
        this.lotteryState = this.loadLotteryState();
        this.surveyState = this.loadSurveyState();
        this.isRolling = false;
        this.rollingIntervalId = null;
        this.isStageDrawerCollapsed = false;

        // 問卷互動暫存狀態
        this.selectedVoterName = "";
        this.selectedPrimaryOptionId = "";
        this.selectedSecondaryOptionId = "";
        this.voterCustomNote = "";
        this.lineTemplateMode = "summary"; // summary | detailed | reminder

        this.cacheDomElements();
        this.fireworks = new FireworksController(this.fireworksCanvas);
        this.initThemeMode();
        this.initClock();
        this.initScratchpad();
        this.bindEvents();
        this.handleInitialRoute();
    }

    cacheDomElements() {
        this.navTabsContainer = document.getElementById("nav-tabs");
        this.themesGrid = document.getElementById("themes-grid");
        this.overviewSection = document.getElementById("overview-section");
        this.focusSection = document.getElementById("focus-section");
        this.searchInput = document.getElementById("theme-search-input");
        this.themeToggleBtn = document.getElementById("theme-toggle-btn");
        this.clockDisplay = document.getElementById("clock-text");
        this.scratchpadInput = document.getElementById("quick-scratchpad-input");
        this.scratchpadStatus = document.getElementById("scratchpad-save-status");
        this.totalIdeasCountEl = document.getElementById("total-ideas-count");
        this.fireworksCanvas = document.getElementById("fireworks-canvas");
    }

    initThemeMode() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_MODE) || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleThemeMode() {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, nextTheme);
        this.updateThemeIcon(nextTheme);
    }

    updateThemeIcon(theme) {
        if (!this.themeToggleBtn) return;
        if (theme === "dark") {
            this.themeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
            this.themeToggleBtn.setAttribute("title", "切換至清新亮色模式");
        } else {
            this.themeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
            this.themeToggleBtn.setAttribute("title", "切換至深邃微光模式");
        }
    }

    initClock() {
        const updateClock = () => {
            if (!this.clockDisplay) return;
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            this.clockDisplay.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    initScratchpad() {
        if (!this.scratchpadInput) return;
        const savedText = localStorage.getItem(STORAGE_KEYS.SCRATCHPAD);
        if (savedText !== null) {
            this.scratchpadInput.value = savedText;
        }

        this.scratchpadInput.addEventListener("input", () => {
            localStorage.setItem(STORAGE_KEYS.SCRATCHPAD, this.scratchpadInput.value);
            if (this.scratchpadStatus) {
                const now = new Date();
                const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
                this.scratchpadStatus.textContent = `已自動儲存 (${timeStr})`;
            }
        });
    }

    loadIdeaBacklog() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.IDEA_BACKLOG);
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (err) {
            console.error("讀取構想紀錄失敗:", err);
        }
        return {};
    }

    saveIdeaBacklog() {
        try {
            localStorage.setItem(STORAGE_KEYS.IDEA_BACKLOG, JSON.stringify(this.ideaBacklog));
            this.updateTotalIdeasCounter();
        } catch (err) {
            console.error("儲存構想紀錄失敗:", err);
        }
    }

    loadLotteryState() {
        const defaultState = {
            allParticipants: [...REHEARSAL_SAMPLE_NAMES],
            remainingPool: [...REHEARSAL_SAMPLE_NAMES],
            winnersHistory: [],
            prizeConfigs: [...DEFAULT_PRIZE_CONFIGS],
            batchSize: 1,
            currentPrize: "頭獎",
            currentAmount: "NT$ 50,000",
            latestDrawnWinners: [],
            latestDrawnPrize: "",
            latestDrawnAmount: "",
            isRehearsalMode: true
        };
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.LOTTERY_STATE);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed.prizeConfigs) || parsed.prizeConfigs.length === 0) {
                    parsed.prizeConfigs = [...DEFAULT_PRIZE_CONFIGS];
                }
                return { ...defaultState, ...parsed };
            }
        } catch (err) {
            console.error("讀取抽獎狀態失敗:", err);
        }
        return defaultState;
    }

    saveLotteryState() {
        try {
            localStorage.setItem(STORAGE_KEYS.LOTTERY_STATE, JSON.stringify(this.lotteryState));
        } catch (err) {
            console.error("儲存抽獎狀態失敗:", err);
        }
    }

    /**
     * 讀取與儲存多功能問卷調查與餐點票選狀態
     */
    loadSurveyState() {
        const defaultSurvey = {
            activeCampaignId: DEFAULT_SURVEY_CAMPAIGNS[0].id,
            campaigns: JSON.parse(JSON.stringify(DEFAULT_SURVEY_CAMPAIGNS))
        };
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.SURVEY_STATE);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0) {
                    return parsed;
                }
            }
        } catch (err) {
            console.error("讀取問卷狀態失敗:", err);
        }
        return defaultSurvey;
    }

    saveSurveyState() {
        try {
            localStorage.setItem(STORAGE_KEYS.SURVEY_STATE, JSON.stringify(this.surveyState));
        } catch (err) {
            console.error("儲存問卷狀態失敗:", err);
        }
    }

    getActiveCampaign() {
        const found = this.surveyState.campaigns.find((c) => c.id === this.surveyState.activeCampaignId);
        return found || this.surveyState.campaigns[0];
    }

    getPasscode() {
        return localStorage.getItem(STORAGE_KEYS.LOTTERY_PASSCODE) || "8888";
    }

    setPasscode(newCode) {
        localStorage.setItem(STORAGE_KEYS.LOTTERY_PASSCODE, newCode);
    }

    isLotteryUnlocked() {
        return sessionStorage.getItem(STORAGE_KEYS.LOTTERY_UNLOCKED_SESSION) === "true";
    }

    setLotteryUnlocked(unlocked) {
        if (unlocked) {
            sessionStorage.setItem(STORAGE_KEYS.LOTTERY_UNLOCKED_SESSION, "true");
        } else {
            sessionStorage.removeItem(STORAGE_KEYS.LOTTERY_UNLOCKED_SESSION);
        }
    }

    updateTotalIdeasCounter() {
        if (!this.totalIdeasCountEl) return;
        let total = 0;
        Object.values(this.ideaBacklog).forEach((list) => {
            if (Array.isArray(list)) {
                total += list.length;
            }
        });
        this.totalIdeasCountEl.textContent = String(total);
    }

    bindEvents() {
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener("click", () => this.toggleThemeMode());
        }

        if (this.searchInput) {
            this.searchInput.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.trim().toLowerCase();
                this.renderThemesGrid();
            });
        }

        window.addEventListener("hashchange", () => {
            this.stopRollingIfNeeded();
            this.syncRouteFromHash();
        });
    }

    stopRollingIfNeeded() {
        if (this.rollingIntervalId) {
            clearInterval(this.rollingIntervalId);
            this.rollingIntervalId = null;
        }
        this.isRolling = false;
    }

    handleInitialRoute() {
        this.renderNavTabs();
        this.updateTotalIdeasCounter();
        this.syncRouteFromHash();
    }

    syncRouteFromHash() {
        const hash = window.location.hash.replace("#", "").trim();
        const specialRoutes = [
            "theme-05-draw",
            "theme-05-admin",
            "theme-05-survey-vote",
            "theme-05-survey-setup",
            "theme-05-survey-stats"
        ];
        if (specialRoutes.includes(hash)) {
            this.setRoute(hash);
            return;
        }
        const matchedTheme = WORKSPACE_THEMES.find((t) => t.id === hash);
        if (matchedTheme) {
            this.setRoute(matchedTheme.id);
        } else {
            this.setRoute("overview");
        }
    }

    setRoute(routeId) {
        this.activeRoute = routeId;
        this.updateActiveNavTab();

        const isFestiveActivity = routeId === "theme-05-draw" || routeId === "theme-05-admin";
        const isSurveyActivity = routeId.startsWith("theme-05-survey");

        document.body.classList.toggle("is-festive-gala-mode", isFestiveActivity);
        document.body.classList.toggle("is-survey-activity-mode", isSurveyActivity);

        if (routeId === "overview") {
            this.overviewSection.classList.remove("is-hidden");
            this.focusSection.classList.add("is-hidden");
            this.renderThemesGrid();
            return;
        }

        this.overviewSection.classList.add("is-hidden");
        this.focusSection.classList.remove("is-hidden");

        const theme05Obj = WORKSPACE_THEMES.find((t) => t.id === "theme-05");
        if (routeId === "theme-05") {
            this.renderTheme05InformalHub(theme05Obj);
        } else if (routeId === "theme-05-draw") {
            this.renderLotterySubpage(theme05Obj, "draw");
        } else if (routeId === "theme-05-admin") {
            this.renderLotterySubpage(theme05Obj, "admin");
        } else if (routeId === "theme-05-survey-vote") {
            this.renderSurveyPage("vote");
        } else if (routeId === "theme-05-survey-setup") {
            this.renderSurveyPage("setup");
        } else if (routeId === "theme-05-survey-stats") {
            this.renderSurveyPage("stats");
        } else {
            const themeObj = WORKSPACE_THEMES.find((t) => t.id === routeId);
            if (themeObj) {
                this.renderFocusSection(themeObj);
            }
        }
    }

    renderNavTabs() {
        if (!this.navTabsContainer) return;

        const overviewBtnHtml = `
            <button type="button" class="nav-tab-btn" data-route="overview">
                <span>總覽</span>
            </button>
        `;

        const themeBtnsHtml = WORKSPACE_THEMES.map((theme, idx) => `
            <button type="button" class="nav-tab-btn" data-route="${theme.id}">
                <span class="nav-tab-code">0${idx + 1}</span>
                <span>${this.escapeHtml(theme.navShortName)}</span>
            </button>
        `).join("");

        this.navTabsContainer.innerHTML = overviewBtnHtml + themeBtnsHtml;

        this.navTabsContainer.querySelectorAll(".nav-tab-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const targetRoute = btn.getAttribute("data-route");
                window.location.hash = targetRoute === "overview" ? "overview" : targetRoute;
            });
        });
    }

    updateActiveNavTab() {
        if (!this.navTabsContainer) return;
        const normalizedRoute = this.activeRoute.startsWith("theme-05") ? "theme-05" : this.activeRoute;
        this.navTabsContainer.querySelectorAll(".nav-tab-btn").forEach((btn) => {
            const route = btn.getAttribute("data-route");
            if (route === normalizedRoute) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    /**
     * 產生左右兩側懸掛式立體紅金鞭炮串與喜慶宮燈 SVG 裝飾
     */
    getFestiveSideHangingsHtml() {
        const renderStringSvg = (emblemText) => `
            <svg class="firecracker-svg" viewBox="0 0 100 660" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="46" y="0" width="8" height="28" fill="#f59e0b" />
                <circle cx="50" cy="28" r="7" fill="#fbbf24" stroke="#b91c1c" stroke-width="2" />
                <rect x="32" y="34" width="36" height="8" rx="3" fill="#fbbf24" stroke="#991b1b" stroke-width="1.5" />
                <ellipse cx="50" cy="72" rx="34" ry="30" fill="#dc2626" stroke="#fbbf24" stroke-width="2.5" />
                <path d="M32 45 C24 62, 24 82, 32 99" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity="0.7" />
                <path d="M68 45 C76 62, 76 82, 68 99" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity="0.7" />
                <circle cx="50" cy="72" r="15" fill="#991b1b" stroke="#fde047" stroke-width="1.5" />
                <text x="50" y="78" text-anchor="middle" fill="#fef08a" font-size="16" font-weight="900" font-family="Noto Sans TC, sans-serif">${emblemText}</text>
                <rect x="34" y="100" width="32" height="8" rx="3" fill="#fbbf24" stroke="#991b1b" stroke-width="1.5" />
                <line x1="50" y1="108" x2="50" y2="540" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
                <line x1="50" y1="108" x2="50" y2="540" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 6" />
                <g transform="translate(26, 135) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 160) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(26, 205) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 230) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(26, 275) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 300) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(26, 345) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 370) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(26, 415) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 440) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(26, 485) rotate(-22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <g transform="translate(74, 508) rotate(22)"><rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" /><rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" /><rect x="-10" y="11" width="20" height="5" fill="#fbbf24" /></g>
                <polygon points="50,535 64,550 50,565 36,550" fill="#dc2626" stroke="#fbbf24" stroke-width="2" />
                <line x1="45" y1="564" x2="42" y2="615" stroke="#dc2626" stroke-width="2.5" />
                <line x1="50" y1="565" x2="50" y2="622" stroke="#f59e0b" stroke-width="2.5" />
                <line x1="55" y1="564" x2="58" y2="615" stroke="#dc2626" stroke-width="2.5" />
                <g class="firecracker-spark-group">
                    <circle cx="50" cy="595" r="5" fill="#fef08a" />
                    <line x1="50" y1="572" x2="50" y2="618" stroke="#fbbf24" stroke-width="2.2" />
                    <line x1="26" y1="595" x2="74" y2="595" stroke="#fbbf24" stroke-width="2.2" />
                    <line x1="33" y1="578" x2="67" y2="612" stroke="#f43f5e" stroke-width="2" />
                    <line x1="67" y1="578" x2="33" y2="612" stroke="#f43f5e" stroke-width="2" />
                </g>
            </svg>
        `;

        return `
            <div class="festive-side-hangings is-left" aria-hidden="true">
                ${renderStringSvg("福")}
            </div>
            <div class="festive-side-hangings is-right" aria-hidden="true">
                ${renderStringSvg("旺")}
            </div>
        `;
    }

    renderThemesGrid() {
        if (!this.themesGrid) return;

        const filtered = WORKSPACE_THEMES.filter((theme) => {
            if (!this.searchQuery) return true;
            const matchTitle = theme.title.toLowerCase().includes(this.searchQuery);
            const matchSub = theme.subtitle.toLowerCase().includes(this.searchQuery);
            const matchDesc = theme.description.toLowerCase().includes(this.searchQuery);
            const matchSlots = theme.slots.some((s) => s.name.toLowerCase().includes(this.searchQuery));
            return matchTitle || matchSub || matchDesc || matchSlots;
        });

        if (filtered.length === 0) {
            this.themesGrid.innerHTML = `
                <div class="theme-card">
                    <div class="theme-card-top">
                        <h3 class="theme-title">查無符合條件的主題模組</h3>
                        <p class="theme-desc">請嘗試其他關鍵字，或清空搜尋欄位以檢視完整五大主題。</p>
                    </div>
                </div>
            `;
            return;
        }

        this.themesGrid.innerHTML = filtered.map((theme) => {
            const customIdeas = this.ideaBacklog[theme.id] || [];
            const slotsHtml = theme.slots.map((slot) => `
                <li class="slot-item">
                    <span class="slot-item-name">
                        <span class="slot-bullet"></span>
                        <span>${this.escapeHtml(slot.name)}</span>
                    </span>
                    <span class="slot-tag">${this.escapeHtml(slot.tag)}</span>
                </li>
            `).join("");

            return `
                <article class="theme-card">
                    <div class="theme-card-top">
                        <div class="theme-card-header">
                            <div class="theme-icon-box">
                                ${theme.iconSvg}
                            </div>
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">${this.escapeHtml(theme.code)}</span>
                                <span class="theme-status-badge">${this.escapeHtml(theme.status)}</span>
                            </div>
                        </div>
                        <h3 class="theme-title">${this.escapeHtml(theme.title)}</h3>
                        <p class="theme-subtitle">${this.escapeHtml(theme.subtitle)}</p>
                        <p class="theme-desc">${this.escapeHtml(theme.description)}</p>
                        <ul class="slot-list">
                            ${slotsHtml}
                        </ul>
                    </div>
                    <div class="theme-card-footer">
                        <span class="theme-route-hint">已紀錄構想：${customIdeas.length} 項</span>
                        <button type="button" class="explore-btn" data-open-theme="${theme.id}">
                            <span>進入主題工作區</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </article>
            `;
        }).join("");

        this.themesGrid.querySelectorAll("[data-open-theme]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-open-theme");
                window.location.hash = targetId;
            });
        });
    }

    /**
     * 渲染主題五：多元活動與非正式任務中心（包含階段一：多功能問卷與尾牙餐點票選、階段二：年終尾牙抽獎）
     */
    renderTheme05InformalHub(theme) {
        if (!this.focusSection) return;
        const ideas = this.ideaBacklog[theme.id] || [];
        const totalEmployees = this.lotteryState.allParticipants.length;
        const remainingCount = this.lotteryState.remainingPool.length;
        const winnersCount = totalEmployees - remainingCount;

        const activeCampaign = this.getActiveCampaign();
        const votedCount = Object.keys(activeCampaign.votes || {}).length;

        const ideasListHtml = ideas.length > 0
            ? ideas.map((item, idx) => `
                <li class="idea-list-item">
                    <span>${this.escapeHtml(item)}</span>
                    <button type="button" class="delete-idea-btn" data-delete-idx="${idx}">移除</button>
                </li>
            `).join("")
            : `<li class="idea-list-item"><span>目前尚無其他非正式主題構想，可於上方輸入框新增未來想加入的趣味或活動系統。</span></li>`;

        this.focusSection.innerHTML = `
            <div class="theme-focus-panel">
                <div class="focus-header">
                    <div class="focus-title-group">
                        <div class="theme-meta-tags">
                            <span class="theme-code-badge">${this.escapeHtml(theme.code)}</span>
                            <span class="theme-status-badge">共用員工名單：${totalEmployees} 人</span>
                        </div>
                        <h2 class="focus-title">${this.escapeHtml(theme.title)}</h2>
                        <p class="theme-desc">${this.escapeHtml(theme.description)}</p>
                    </div>
                    <button type="button" class="back-overview-btn" id="back-to-overview-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>返回五大主題總覽</span>
                    </button>
                </div>

                <div>
                    <h3 class="section-heading">非正式任務與節慶活動子系統列表 (前後關聯雙系統已啟用)</h3>
                    <p class="section-subheading">「問卷調查與餐點票選系統」與「年終尾牙抽獎系統」共用同一份員工名單，可先完成當日主餐與飲料票選，再無縫接軌尾牙抽獎：</p>
                </div>

                <div class="informal-systems-grid">
                    <!-- 階段一：多功能問卷調查與尾牙餐點票選系統 -->
                    <article class="informal-system-card is-featured">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SYS-5A // 第一階段：活動前調查</span>
                                <span class="theme-status-badge">已實作啟用</span>
                            </div>
                            <h4 class="theme-title">多功能問卷調查與餐點票選系統</h4>
                            <p class="theme-desc">
                                與尾牙抽獎共用員工名單！支援當日主餐與飲料設定、菜單附檔預覽、一鍵查詢網路食記與餐廳評價、視覺化統計圖表，以及一鍵複製 LINE 群組通知文案。亦可用於其他各類票選活動。
                            </p>
                            <p class="theme-route-hint">
                                當前活動：${this.escapeHtml(activeCampaign.title)}（已填 ${votedCount} / ${totalEmployees} 人）
                            </p>
                        </div>
                        <div class="informal-card-actions">
                            <button type="button" class="primary-btn" id="go-survey-vote-btn">
                                進入同仁餐點票選頁
                            </button>
                            <button type="button" class="secondary-btn" id="go-survey-setup-btn">
                                設定餐點與附檔
                            </button>
                            <button type="button" class="secondary-btn" id="go-survey-stats-btn">
                                統計分析與 LINE 通知
                            </button>
                        </div>
                    </article>

                    <!-- 階段二：年終尾牙自動化抽獎系統 -->
                    <article class="informal-system-card is-featured">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SYS-5B // 第二階段：現場開獎</span>
                                <span class="theme-status-badge">節慶展演版已啟用</span>
                            </div>
                            <h4 class="theme-title">歲末年終尾牙自動化抽獎系統</h4>
                            <p class="theme-desc">
                                直接沿用問卷系統之員工名單！進入後自動切換全畫面喜慶紅金佈置與左右懸掛鞭炮串，具備獨立「大型開獎展演舞台」與「名單獎金設定頁」。
                            </p>
                            <p class="theme-route-hint">
                                目前抽獎池狀態：待抽 ${remainingCount} 人 / 已中獎 ${winnersCount} 人
                            </p>
                        </div>
                        <div class="informal-card-actions">
                            <button type="button" class="primary-btn" id="go-lottery-stage-btn">
                                開啟尾牙開獎大舞台
                            </button>
                            <button type="button" class="secondary-btn" id="go-lottery-admin-btn">
                                名單匯入與獎項金額設定
                            </button>
                        </div>
                    </article>

                    <!-- 子系統 3：預留非正式任務 -->
                    <article class="informal-system-card">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SLOT-5C</span>
                                <span class="theme-status-badge">預留擴充槽</span>
                            </div>
                            <h4 class="module-placeholder-title">團隊活動計分與分組競賽看板</h4>
                            <p class="module-placeholder-desc">
                                預留供日後擴充 Team Building 分組競賽即時積分榜與臨時趣味任務看板。
                            </p>
                        </div>
                        <div class="informal-card-actions">
                            <span class="theme-route-hint">模組插槽待命擴充中</span>
                        </div>
                    </article>
                </div>

                <!-- 主題五非正式任務構想紀錄器 -->
                <div class="idea-capture-box">
                    <h3 class="section-heading">其他非正式主題任務構想清單 (Informal Tasks Backlog)</h3>
                    <p class="section-subheading">若您想到其他非正式活動或趣味工作小工具，可先記錄於此：</p>
                    <form class="idea-form-row" id="idea-add-form">
                        <input type="text" class="idea-input" id="idea-text-input" placeholder="輸入想在主題五新增的其他非正式任務，例如：交換禮物配對器..." required />
                        <button type="submit" class="primary-btn">新增任務構想</button>
                    </form>
                    <ul class="idea-list" id="theme-idea-list">
                        ${ideasListHtml}
                    </ul>
                </div>
            </div>
        `;

        const backBtn = document.getElementById("back-to-overview-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                window.location.hash = "overview";
            });
        }

        const goSurveyVoteBtn = document.getElementById("go-survey-vote-btn");
        if (goSurveyVoteBtn) {
            goSurveyVoteBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-survey-vote";
            });
        }

        const goSurveySetupBtn = document.getElementById("go-survey-setup-btn");
        if (goSurveySetupBtn) {
            goSurveySetupBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-survey-setup";
            });
        }

        const goSurveyStatsBtn = document.getElementById("go-survey-stats-btn");
        if (goSurveyStatsBtn) {
            goSurveyStatsBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-survey-stats";
            });
        }

        const goStageBtn = document.getElementById("go-lottery-stage-btn");
        if (goStageBtn) {
            goStageBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-draw";
            });
        }

        const goAdminBtn = document.getElementById("go-lottery-admin-btn");
        if (goAdminBtn) {
            goAdminBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-admin";
            });
        }

        const ideaForm = document.getElementById("idea-add-form");
        const ideaInput = document.getElementById("idea-text-input");
        if (ideaForm && ideaInput) {
            ideaForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const val = ideaInput.value.trim();
                if (!val) return;
                if (!Array.isArray(this.ideaBacklog[theme.id])) {
                    this.ideaBacklog[theme.id] = [];
                }
                this.ideaBacklog[theme.id].push(val);
                this.saveIdeaBacklog();
                this.renderTheme05InformalHub(theme);
            });
        }

        this.focusSection.querySelectorAll("[data-delete-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idx = Number(btn.getAttribute("data-delete-idx"));
                if (Array.isArray(this.ideaBacklog[theme.id])) {
                    this.ideaBacklog[theme.id].splice(idx, 1);
                    this.saveIdeaBacklog();
                    this.renderTheme05InformalHub(theme);
                }
            });
        });
    }

    /* ==========================================================================
       多功能問卷調查與餐點/活動票選系統 (SYS-5A)
       支援：通用多主題切換、與尾牙共用員工名單、附檔介紹檢視、網頁食記評價查詢、
            Canvas 統計圖表分析、一鍵複製 LINE 群組通知文案
       ========================================================================== */

    renderSurveyPage(subView) {
        if (!this.focusSection) return;
        const campaign = this.getActiveCampaign();
        const employees = this.lotteryState.allParticipants;
        const votedCount = Object.keys(campaign.votes || {}).length;

        const campaignOptionsHtml = this.surveyState.campaigns.map((c) => `
            <option value="${this.escapeHtml(c.id)}" ${c.id === campaign.id ? "selected" : ""}>
                ${this.escapeHtml(c.title)}
            </option>
        `).join("");

        const headerHtml = `
            <!-- 問卷系統頂部導覽列 -->
            <div class="survey-header-bar">
                <div class="festive-brand-emblem">
                    <span class="theme-code-badge">SYS-5A // 問卷與票選中心</span>
                    <span class="section-heading">多功能問卷調查與尾牙餐點票選系統</span>
                </div>
                <div class="lottery-subpage-tabs">
                    <button type="button" class="subpage-tab-btn ${subView === "vote" ? "active" : ""}" id="tab-survey-vote">
                        <span>1. 同仁餐點與項目票選</span>
                    </button>
                    <button type="button" class="subpage-tab-btn ${subView === "setup" ? "active" : ""}" id="tab-survey-setup">
                        <span>2. 設定餐點、附檔與共用名單</span>
                    </button>
                    <button type="button" class="subpage-tab-btn ${subView === "stats" ? "active" : ""}" id="tab-survey-stats">
                        <span>3. 統計分析與 LINE 群組通知 (${votedCount}/${employees.length})</span>
                    </button>
                    <button type="button" class="secondary-btn" id="jump-to-lottery-btn">
                        <span>前往尾牙抽獎</span>
                    </button>
                    <button type="button" class="back-overview-btn" id="survey-back-hub-btn">
                        <span>離開系統</span>
                    </button>
                </div>
            </div>

            <!-- 票選活動主題切換器（支援尾牙餐點與其他任意票選用途） -->
            <div class="survey-campaign-bar">
                <div class="campaign-select-group">
                    <label class="live-input-label" for="survey-campaign-select">切換票選主題專案：</label>
                    <select id="survey-campaign-select" class="campaign-select">
                        ${campaignOptionsHtml}
                    </select>
                    <button type="button" class="secondary-btn" id="create-new-campaign-btn">＋ 新增其他票選主題</button>
                </div>
                <span class="theme-route-hint">
                    與尾牙系統共用名單：共 ${employees.length} 位員工 ｜ 本主題已投票：${votedCount} 人
                </span>
            </div>
        `;

        let bodyContentHtml = "";
        if (subView === "vote") {
            bodyContentHtml = this.getSurveyVoteViewHtml(campaign, employees);
        } else if (subView === "setup") {
            bodyContentHtml = this.getSurveySetupViewHtml(campaign, employees);
        } else {
            bodyContentHtml = this.getSurveyStatsViewHtml(campaign, employees);
        }

        this.focusSection.innerHTML = `
            <div class="survey-system-shell">
                ${headerHtml}
                ${bodyContentHtml}
            </div>
            <div id="attachment-modal-root" class="is-hidden"></div>
        `;

        this.bindSurveyCommonEvents(subView);
        if (subView === "vote") {
            this.bindSurveyVoteEvents(campaign);
        } else if (subView === "setup") {
            this.bindSurveySetupEvents(campaign);
        } else {
            this.bindSurveyStatsEvents(campaign, employees);
            this.drawSurveyStatsCharts(campaign);
        }
    }

    /**
     * 子視圖 1：同仁互動點餐與票選頁面
     */
    getSurveyVoteViewHtml(campaign, employees) {
        if (!this.selectedVoterName && employees.length > 0) {
            this.selectedVoterName = employees[0];
            this.loadExistingVoteForSelectedEmployee(campaign);
        }

        if (!this.selectedPrimaryOptionId && campaign.primaryOptions.length > 0) {
            this.selectedPrimaryOptionId = campaign.primaryOptions[0].id;
        }
        if (!this.selectedSecondaryOptionId && campaign.secondaryOptions.length > 0) {
            this.selectedSecondaryOptionId = campaign.secondaryOptions[0].id;
        }

        const voterOptionsHtml = employees.length > 0
            ? employees.map((emp) => {
                const hasVoted = Boolean(campaign.votes && campaign.votes[emp]);
                const statusTag = hasVoted ? "[已完成票選]" : "[尚未填寫]";
                return `<option value="${this.escapeHtml(emp)}" ${emp === this.selectedVoterName ? "selected" : ""}>${this.escapeHtml(emp)} ${statusTag}</option>`;
            }).join("")
            : `<option value="">請先至「設定餐點、附檔與共用名單」匯入員工姓名</option>`;

        const renderOptionCards = (options, selectedId, groupType) => options.map((opt) => {
            const isSelected = opt.id === selectedId;
            const searchQueryUrl = `https://www.google.com/search?q=${encodeURIComponent(opt.name + " 餐點介紹 評價 食記")}`;
            const mapQueryUrl = `https://www.google.com/maps/search/${encodeURIComponent(opt.name)}`;
            return `
                <article class="survey-option-card ${isSelected ? "is-selected" : ""}" data-select-group="${groupType}" data-option-id="${this.escapeHtml(opt.id)}">
                    <div class="informal-card-body">
                        <div class="option-card-header">
                            <div>
                                <span class="option-tag-pill">${this.escapeHtml(opt.tag || "精選項目")}</span>
                                <h4 class="option-title">${this.escapeHtml(opt.name)}</h4>
                            </div>
                            <div class="option-radio-indicator" aria-hidden="true"></div>
                        </div>
                        <p class="option-desc">${this.escapeHtml(opt.desc)}</p>
                    </div>
                    <div class="option-links-bar">
                        <button type="button" class="external-link-btn" data-view-opt-attach="${this.escapeHtml(opt.id)}" data-view-opt-group="${groupType}">
                            <span>查看附檔介紹資料</span>
                        </button>
                        ${opt.refUrl ? `
                            <a href="${this.escapeHtml(opt.refUrl)}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                                <span>介紹網頁</span>
                            </a>
                        ` : ""}
                        <a href="${searchQueryUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                            <span>查詢網路評價</span>
                        </a>
                        <a href="${mapQueryUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                            <span>地圖評價</span>
                        </a>
                    </div>
                </article>
            `;
        }).join("");

        return `
            <!-- 活動整體菜單附檔與外部介紹連結橫幅 -->
            <div class="campaign-resources-banner">
                <div class="resource-info-col">
                    <span class="resource-title">${this.escapeHtml(campaign.title)}</span>
                    <span class="resource-desc">${this.escapeHtml(campaign.description)}</span>
                </div>
                <div class="resource-actions-row">
                    <button type="button" class="primary-btn" id="view-campaign-attachment-btn">
                        查看完整菜單／活動介紹附檔 (${this.escapeHtml(campaign.attachmentTitle || "介紹文件")})
                    </button>
                    <a href="${this.escapeHtml(campaign.officialUrl || "https://www.google.com")}" target="_blank" rel="noopener noreferrer" class="external-link-btn">
                        <span>開啟餐廳／活動官方介紹網頁</span>
                    </a>
                </div>
            </div>

            <!-- 步驟一：選擇投票員工姓名與特殊飲食備註 -->
            <div class="voter-identity-card">
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-employee-select">步驟一：請選擇您的員工姓名（與尾牙抽獎系統共用名單）</label>
                    <select id="voter-employee-select" class="live-stage-input">
                        ${voterOptionsHtml}
                    </select>
                </div>
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-custom-note-input">個人飲食或票選備註（如：牛排 7 分熟、飲料去冰無糖、不加蔥等）</label>
                    <input
                        type="text"
                        id="voter-custom-note-input"
                        class="live-stage-input"
                        value="${this.escapeHtml(this.voterCustomNote)}"
                        placeholder="選填：輸入您的熟度、冰塊甜度或過敏原備註..."
                    />
                </div>
            </div>

            <!-- 步驟二：主餐（第一分類）選擇 -->
            <div class="survey-category-section">
                <h3 class="section-heading">${this.escapeHtml(campaign.primaryCategoryLabel)}</h3>
                <p class="section-subheading">點擊卡片即可選取；點擊卡片下方按鈕可檢視附檔規格介紹或開啟網頁查詢真實評價：</p>
                <div class="survey-options-grid">
                    ${renderOptionCards(campaign.primaryOptions, this.selectedPrimaryOptionId, "primary")}
                </div>
            </div>

            <!-- 步驟三：飲料（第二分類）選擇 -->
            <div class="survey-category-section">
                <h3 class="section-heading">${this.escapeHtml(campaign.secondaryCategoryLabel)}</h3>
                <div class="survey-options-grid">
                    ${renderOptionCards(campaign.secondaryOptions, this.selectedSecondaryOptionId, "secondary")}
                </div>
            </div>

            <!-- 送出票選按鈕 -->
            <div class="grand-stage-controls">
                <button type="button" class="primary-btn" id="submit-survey-vote-btn" ${employees.length === 0 ? "disabled" : ""}>
                    確認送出「${this.escapeHtml(this.selectedVoterName || "同仁")}」的票選結果
                </button>
            </div>
        `;
    }

    /**
     * 子視圖 2：餐點、飲料、附檔介紹資料與外部連結設定管理頁
     */
    getSurveySetupViewHtml(campaign, employees) {
        const primaryListHtml = campaign.primaryOptions.map((opt, idx) => `
            <li class="prize-config-item">
                <div class="prize-config-info">
                    <span class="option-tag-pill">${this.escapeHtml(opt.tag)}</span>
                    <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                    <span class="theme-route-hint">${this.escapeHtml(opt.desc)}</span>
                </div>
                <button type="button" class="delete-idea-btn" data-del-primary-idx="${idx}">移除</button>
            </li>
        `).join("");

        const secondaryListHtml = campaign.secondaryOptions.map((opt, idx) => `
            <li class="prize-config-item">
                <div class="prize-config-info">
                    <span class="option-tag-pill">${this.escapeHtml(opt.tag)}</span>
                    <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                    <span class="theme-route-hint">${this.escapeHtml(opt.desc)}</span>
                </div>
                <button type="button" class="delete-idea-btn" data-del-secondary-idx="${idx}">移除</button>
            </li>
        `).join("");

        return `
            <div class="lottery-top-bar">
                <div class="privacy-shield-info">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>在此設定主餐、飲料、附檔介紹資料與評價網址；匯入的員工名單將自動與「年終尾牙抽獎系統」同步共用。</span>
                </div>
                <div class="lottery-top-actions">
                    <button type="button" class="secondary-btn" id="simulate-votes-btn">一鍵產生模擬投票數據 (測試統計與 LINE 通知)</button>
                    <button type="button" class="danger-outline-btn" id="clear-campaign-votes-btn">清空本活動投票紀錄</button>
                </div>
            </div>

            <div class="lottery-admin-grid">
                <!-- 左欄：新增餐點／飲料選項、附檔介紹與評價網址 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、新增餐點／飲料選項與附檔介紹</span>
                        <span class="theme-code-badge">OPTIONS & ATTACHMENTS</span>
                    </div>

                    <form class="idea-capture-box" id="add-survey-option-form">
                        <div class="live-input-group">
                            <label class="live-input-label" for="new-opt-category">選擇所屬分類</label>
                            <select id="new-opt-category" class="live-stage-input">
                                <option value="primary">${this.escapeHtml(campaign.primaryCategoryLabel)}</option>
                                <option value="secondary">${this.escapeHtml(campaign.secondaryCategoryLabel)}</option>
                            </select>
                        </div>
                        <div class="idea-form-row">
                            <input type="text" id="new-opt-name" class="idea-input" placeholder="項目名稱（如：龍蝦海陸大餐、黑糖珍珠鮮奶）" required />
                            <input type="text" id="new-opt-tag" class="idea-input" placeholder="特色標籤（如：主廚推薦、熱飲可）" />
                        </div>
                        <input type="text" id="new-opt-desc" class="idea-input" placeholder="餐點／項目簡短介紹說明..." required />
                        <input type="url" id="new-opt-url" class="idea-input" placeholder="介紹與評價網頁連結 URL（選填，未填亦支援自動 Google 評價查詢）" />
                        <textarea id="new-opt-attach-note" class="roster-textarea" placeholder="附檔詳細介紹文字（如：食材產地、卡路里、甜度冰塊說明，同仁點擊『查看附檔介紹』時會顯示）..."></textarea>
                        <div class="file-upload-row">
                            <label class="file-upload-label" for="new-opt-file-input">
                                <span>上傳餐點介紹圖片附檔 (選填，支援 JPG/PNG)</span>
                            </label>
                            <input type="file" id="new-opt-file-input" class="hidden-file-input" accept="image/*" />
                            <span class="theme-route-hint" id="new-opt-file-status">尚未選擇圖片附檔</span>
                        </div>
                        <button type="submit" class="primary-btn">新增至票選選項列表</button>
                    </form>

                    <div>
                        <h4 class="lottery-panel-title">${this.escapeHtml(campaign.primaryCategoryLabel)} (${campaign.primaryOptions.length} 項)</h4>
                        <ul class="prize-config-list">${primaryListHtml}</ul>
                    </div>

                    <div>
                        <h4 class="lottery-panel-title">${this.escapeHtml(campaign.secondaryCategoryLabel)} (${campaign.secondaryOptions.length} 項)</h4>
                        <ul class="prize-config-list">${secondaryListHtml}</ul>
                    </div>
                </div>

                <!-- 右欄：活動整體菜單附檔設定 ＋ 共用員工名單匯入 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>二、活動整體介紹附檔與官方連結設定</span>
                        <span class="theme-code-badge">MENU ATTACHMENT</span>
                    </div>

                    <div class="idea-capture-box">
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-campaign-title">活動主題名稱</label>
                            <input type="text" id="setup-campaign-title" class="idea-input" value="${this.escapeHtml(campaign.title)}" />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-campaign-url">餐廳官網／網路食記評價總連結</label>
                            <input type="url" id="setup-campaign-url" class="idea-input" value="${this.escapeHtml(campaign.officialUrl)}" />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-attach-title">完整菜單／介紹附檔標題</label>
                            <input type="text" id="setup-attach-title" class="idea-input" value="${this.escapeHtml(campaign.attachmentTitle)}" />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-attach-content">完整菜單／附檔內容說明</label>
                            <textarea id="setup-attach-content" class="roster-textarea">${this.escapeHtml(campaign.attachmentContent)}</textarea>
                        </div>
                        <div class="file-upload-row">
                            <label class="file-upload-label" for="campaign-menu-file-input">
                                <span>上傳完整菜單圖片或 TXT 附檔</span>
                            </label>
                            <input type="file" id="campaign-menu-file-input" class="hidden-file-input" accept="image/*,.txt" />
                            <button type="button" class="primary-btn" id="save-campaign-meta-btn">儲存活動與附檔設定</button>
                        </div>
                    </div>

                    <div class="lottery-panel-title">
                        <span>三、共用員工名單管理（與尾牙抽獎同步，共 ${employees.length} 人）</span>
                        <span class="theme-code-badge">SHARED ROSTER</span>
                    </div>

                    <textarea
                        id="survey-roster-paste-input"
                        class="roster-textarea"
                        placeholder="在此貼上員工名單（每行一位，如：研發一部 - 陳建宏），匯入後問卷調查與尾牙抽獎將同時更新..."
                    ></textarea>

                    <div class="file-upload-row">
                        <button type="button" class="primary-btn" id="survey-import-roster-btn">匯入共用員工名單</button>
                        <button type="button" class="secondary-btn" id="survey-load-sample-roster-btn">載入 30 人預設名單</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 子視圖 3：統計分析圖表與一鍵複製 LINE 群組通知頁
     */
    getSurveyStatsViewHtml(campaign, employees) {
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const unvotedNames = employees.filter((emp) => !votesMap[emp]);
        const completionRate = employees.length > 0
            ? Math.round((votedNames.length / employees.length) * 100)
            : 0;

        const lineText = this.generateLineGroupNotificationText(campaign, employees, this.lineTemplateMode);

        const detailedRecordsHtml = votedNames.length > 0
            ? votedNames.map((empName) => {
                const v = votesMap[empName];
                return `
                    <li class="winner-history-item">
                        <div class="winner-history-left">
                            <span class="winner-history-names">${this.escapeHtml(empName)}</span>
                            <span class="winner-prize-badge">${this.escapeHtml(v.primaryName)}</span>
                            <span class="prize-amount-badge">${this.escapeHtml(v.secondaryName)}</span>
                            ${v.note ? `<span class="theme-route-hint">備註：${this.escapeHtml(v.note)}</span>` : ""}
                        </div>
                        <span class="winner-history-time">${this.escapeHtml(v.time)}</span>
                    </li>
                `;
            }).join("")
            : `<li class="winner-history-item"><span class="theme-desc">目前尚無同仁送出票選（可至「設定頁」點擊「一鍵產生模擬投票數據」預覽統計與 LINE 通知效果）。</span></li>`;

        const unvotedChipsHtml = unvotedNames.length > 0
            ? unvotedNames.map((name) => `<span class="pool-person-chip">${this.escapeHtml(name)}</span>`).join("")
            : `<span class="theme-status-badge">全員皆已完成票選！</span>`;

        return `
            <!-- 統計頂部數據卡 -->
            <div class="lottery-stats-grid">
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">${employees.length}</span>
                    <span class="lottery-stat-label">應填員工總數 (共用名單)</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">${votedNames.length} (${completionRate}%)</span>
                    <span class="lottery-stat-label">已完成票選人數与比例</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">${unvotedNames.length}</span>
                    <span class="lottery-stat-label">尚未填寫人數</span>
                </div>
            </div>

            <div class="survey-stats-grid">
                <!-- 左欄：Canvas 視覺化統計長條圖與未投票名單 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、各品項得票數與比例統計分析</span>
                        <button type="button" class="secondary-btn" id="sync-voted-to-lottery-btn">
                            將已完成投票者同步為尾牙抽獎池 (${votedNames.length}人)
                        </button>
                    </div>

                    <div class="stats-canvas-wrap">
                        <canvas id="survey-stats-canvas" class="stats-chart-canvas" width="640" height="420"></canvas>
                    </div>

                    <div>
                        <div class="lottery-panel-title">
                            <span>尚未完成票選同仁名單 (${unvotedNames.length} 人)</span>
                        </div>
                        <div class="pool-preview-chips">
                            ${unvotedChipsHtml}
                        </div>
                    </div>
                </div>

                <!-- 右欄：LINE 群組通知文案一鍵產生器 -->
                <div class="line-generator-card">
                    <div class="line-badge-header">
                        <div>
                            <span class="line-green-tag">LINE GROUP NOTIFIER</span>
                            <h3 class="lottery-panel-title">二、一鍵產生並複製 LINE 群組通知文案</h3>
                        </div>
                        <button type="button" class="secondary-btn" id="export-survey-csv-btn" ${votedNames.length === 0 ? "disabled" : ""}>
                            匯出完整點餐 CSV 報表
                        </button>
                    </div>

                    <p class="section-subheading">選擇通知用途，系統將自動排版成最適合貼在 LINE 群組的格式：</p>

                    <div class="prize-preset-chips">
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "summary" ? "active" : ""}" data-line-mode="summary">
                            格式一：餐點數量彙整版 (訂餐/總務核對)
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "detailed" ? "active" : ""}" data-line-mode="detailed">
                            格式二：群組公告＋個人選擇明細核對版
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "reminder" ? "active" : ""}" data-line-mode="reminder">
                            格式三：尚未投票同仁催票提醒版
                        </button>
                    </div>

                    <textarea id="line-notification-textarea" class="line-preview-textarea" readonly>${this.escapeHtml(lineText)}</textarea>

                    <button type="button" class="line-copy-btn" id="copy-line-text-btn">
                        一鍵複製 LINE 通知文案（直接貼上群組）
                    </button>
                </div>
            </div>

            <!-- 下方：每位同仁投票明細列表 -->
            <div class="lottery-panel-card">
                <div class="lottery-panel-title">
                    <span>三、同仁票選結果明細總表 (${votedNames.length} 筆)</span>
                </div>
                <ul class="winners-history-list">
                    ${detailedRecordsHtml}
                </ul>
            </div>
        `;
    }

    loadExistingVoteForSelectedEmployee(campaign) {
        const existing = campaign.votes && campaign.votes[this.selectedVoterName];
        if (existing) {
            this.selectedPrimaryOptionId = existing.primaryId;
            this.selectedSecondaryOptionId = existing.secondaryId;
            this.voterCustomNote = existing.note || "";
        } else {
            this.voterCustomNote = "";
        }
    }

    bindSurveyCommonEvents(subView) {
        const tabVote = document.getElementById("tab-survey-vote");
        const tabSetup = document.getElementById("tab-survey-setup");
        const tabStats = document.getElementById("tab-survey-stats");
        const jumpLottery = document.getElementById("jump-to-lottery-btn");
        const backHub = document.getElementById("survey-back-hub-btn");

        if (tabVote) tabVote.addEventListener("click", () => { window.location.hash = "theme-05-survey-vote"; });
        if (tabSetup) tabSetup.addEventListener("click", () => { window.location.hash = "theme-05-survey-setup"; });
        if (tabStats) tabStats.addEventListener("click", () => { window.location.hash = "theme-05-survey-stats"; });
        if (jumpLottery) jumpLottery.addEventListener("click", () => { window.location.hash = "theme-05-draw"; });
        if (backHub) backHub.addEventListener("click", () => { window.location.hash = "theme-05"; });

        const campaignSelect = document.getElementById("survey-campaign-select");
        if (campaignSelect) {
            campaignSelect.addEventListener("change", () => {
                this.surveyState.activeCampaignId = campaignSelect.value;
                this.selectedPrimaryOptionId = "";
                this.selectedSecondaryOptionId = "";
                this.saveSurveyState();
                this.renderSurveyPage(subView);
            });
        }

        const createNewCampaignBtn = document.getElementById("create-new-campaign-btn");
        if (createNewCampaignBtn) {
            createNewCampaignBtn.addEventListener("click", () => {
                const title = window.prompt("請輸入新票選主題名稱（例如：春季員工旅遊地點與房型票選、中秋禮盒票選）：");
                if (!title || !title.trim()) return;
                const cat1 = window.prompt("請輸入第一分類標題：", "第一部分：主要方案選擇") || "第一部分：主要方案選擇";
                const cat2 = window.prompt("請輸入第二分類標題：", "第二部分：搭配項目選擇") || "第二部分：搭配項目選擇";

                const newId = `campaign-${Date.now()}`;
                this.surveyState.campaigns.push({
                    id: newId,
                    title: title.trim(),
                    description: "請同仁選擇偏好的方案，可點擊下方按鈕檢視附檔資料或搜尋網路評價。",
                    primaryCategoryLabel: cat1.trim(),
                    secondaryCategoryLabel: cat2.trim(),
                    officialUrl: "https://www.google.com",
                    attachmentTitle: `${title.trim()} — 說明附檔.doc`,
                    attachmentContent: `【${title.trim()}】詳細說明資料，可於「設定餐點、附檔與共用名單」頁面編輯內容或上傳圖片附檔。`,
                    attachmentDataUrl: "",
                    primaryOptions: [
                        { id: `p-${Date.now()}-1`, name: "方案 A（請於設定頁新增或修改）", tag: "選項 A", desc: "預設方案 A 說明", refUrl: "", attachNote: "方案 A 附檔介紹", attachDataUrl: "" },
                        { id: `p-${Date.now()}-2`, name: "方案 B（請於設定頁新增或修改）", tag: "選項 B", desc: "預設方案 B 說明", refUrl: "", attachNote: "方案 B 附檔介紹", attachDataUrl: "" }
                    ],
                    secondaryOptions: [
                        { id: `s-${Date.now()}-1`, name: "搭配項目 1", tag: "規格 1", desc: "預設搭配項目 1", refUrl: "", attachNote: "搭配項目 1 說明", attachDataUrl: "" },
                        { id: `s-${Date.now()}-2`, name: "搭配項目 2", tag: "規格 2", desc: "預設搭配項目 2", refUrl: "", attachNote: "搭配項目 2 說明", attachDataUrl: "" }
                    ],
                    votes: {}
                });
                this.surveyState.activeCampaignId = newId;
                this.selectedPrimaryOptionId = "";
                this.selectedSecondaryOptionId = "";
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        }
    }

    bindSurveyVoteEvents(campaign) {
        const voterSelect = document.getElementById("voter-employee-select");
        const noteInput = document.getElementById("voter-custom-note-input");

        if (voterSelect) {
            voterSelect.addEventListener("change", () => {
                this.selectedVoterName = voterSelect.value;
                this.loadExistingVoteForSelectedEmployee(campaign);
                this.renderSurveyPage("vote");
            });
        }

        if (noteInput) {
            noteInput.addEventListener("input", () => {
                this.voterCustomNote = noteInput.value;
            });
        }

        // 點擊查看活動整體菜單附檔
        const viewCampaignAttachBtn = document.getElementById("view-campaign-attachment-btn");
        if (viewCampaignAttachBtn) {
            viewCampaignAttachBtn.addEventListener("click", () => {
                this.openAttachmentPreviewModal(
                    campaign.attachmentTitle || "活動介紹附檔",
                    campaign.attachmentContent || "尚無文字說明",
                    campaign.attachmentDataUrl || ""
                );
            });
        }

        // 點擊查看單一餐點／飲料附檔介紹
        this.focusSection.querySelectorAll("[data-view-opt-attach]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const optId = btn.getAttribute("data-view-opt-attach");
                const group = btn.getAttribute("data-view-opt-group");
                const list = group === "primary" ? campaign.primaryOptions : campaign.secondaryOptions;
                const opt = list.find((item) => item.id === optId);
                if (opt) {
                    this.openAttachmentPreviewModal(
                        `${opt.name} — 餐點介紹與規格附檔`,
                        `${opt.desc}\n\n${opt.attachNote || "無額外附註"}`,
                        opt.attachDataUrl || ""
                    );
                }
            });
        });

        this.focusSection.querySelectorAll("[data-stop-card-click]").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });

        // 點選主餐或飲料卡片
        this.focusSection.querySelectorAll("[data-select-group]").forEach((card) => {
            card.addEventListener("click", () => {
                const group = card.getAttribute("data-select-group");
                const optId = card.getAttribute("data-option-id");
                if (group === "primary") {
                    this.selectedPrimaryOptionId = optId;
                } else {
                    this.selectedSecondaryOptionId = optId;
                }
                this.renderSurveyPage("vote");
            });
        });

        // 送出票選
        const submitBtn = document.getElementById("submit-survey-vote-btn");
        if (submitBtn) {
            submitBtn.addEventListener("click", () => {
                if (!this.selectedVoterName) {
                    window.alert("請先選擇您的員工姓名。");
                    return;
                }
                const primaryObj = campaign.primaryOptions.find((o) => o.id === this.selectedPrimaryOptionId);
                const secondaryObj = campaign.secondaryOptions.find((o) => o.id === this.selectedSecondaryOptionId);

                if (!primaryObj || !secondaryObj) {
                    window.alert("請確認已各選擇一項主項目與副項目。");
                    return;
                }

                const now = new Date();
                const timeStr = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

                if (!campaign.votes) {
                    campaign.votes = {};
                }
                campaign.votes[this.selectedVoterName] = {
                    primaryId: primaryObj.id,
                    primaryName: primaryObj.name,
                    secondaryId: secondaryObj.id,
                    secondaryName: secondaryObj.name,
                    note: (this.voterCustomNote || "").trim(),
                    time: timeStr
                };

                this.saveSurveyState();
                window.alert(`已成功記錄「${this.selectedVoterName}」的票選結果：\n・${primaryObj.name}\n・${secondaryObj.name}`);
                this.renderSurveyPage("vote");
            });
        }
    }

    openAttachmentPreviewModal(title, textContent, dataUrl) {
        const modalRoot = document.getElementById("attachment-modal-root");
        if (!modalRoot) return;

        const mediaHtml = dataUrl
            ? `<img src="${dataUrl}" alt="${this.escapeHtml(title)}" class="attachment-preview-media" />`
            : "";

        modalRoot.classList.remove("is-hidden");
        modalRoot.innerHTML = `
            <div class="attachment-modal-backdrop" id="close-modal-backdrop">
                <div class="attachment-modal-card" id="modal-card-inner">
                    <div class="lottery-panel-title">
                        <span>附檔檢視器：${this.escapeHtml(title)}</span>
                        <button type="button" class="secondary-btn" id="close-attachment-modal-btn">關閉預覽</button>
                    </div>
                    ${mediaHtml}
                    <div class="attachment-doc-box">${this.escapeHtml(textContent)}</div>
                </div>
            </div>
        `;

        const closeBtn = document.getElementById("close-attachment-modal-btn");
        const backdrop = document.getElementById("close-modal-backdrop");
        const cardInner = document.getElementById("modal-card-inner");

        if (cardInner) {
            cardInner.addEventListener("click", (e) => e.stopPropagation());
        }
        if (closeBtn) {
            closeBtn.addEventListener("click", () => modalRoot.classList.add("is-hidden"));
        }
        if (backdrop) {
            backdrop.addEventListener("click", () => modalRoot.classList.add("is-hidden"));
        }
    }

    bindSurveySetupEvents(campaign) {
        let pendingOptionImageDataUrl = "";
        const optFileInput = document.getElementById("new-opt-file-input");
        const optFileStatus = document.getElementById("new-opt-file-status");

        if (optFileInput) {
            optFileInput.addEventListener("change", (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    pendingOptionImageDataUrl = String(evt.target.result || "");
                    if (optFileStatus) {
                        optFileStatus.textContent = `已載入附檔：${file.name}`;
                    }
                };
                reader.readAsDataURL(file);
            });
        }

        const addOptForm = document.getElementById("add-survey-option-form");
        if (addOptForm) {
            addOptForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const cat = document.getElementById("new-opt-category").value;
                const name = document.getElementById("new-opt-name").value.trim();
                const tag = document.getElementById("new-opt-tag").value.trim() || "精選項目";
                const desc = document.getElementById("new-opt-desc").value.trim();
                const url = document.getElementById("new-opt-url").value.trim();
                const attachNote = document.getElementById("new-opt-attach-note").value.trim();

                if (!name || !desc) return;

                const newOption = {
                    id: `${cat}-${Date.now()}`,
                    name,
                    tag,
                    desc,
                    refUrl: url,
                    attachNote: attachNote || `${name} 詳細規格說明`,
                    attachDataUrl: pendingOptionImageDataUrl
                };

                if (cat === "primary") {
                    campaign.primaryOptions.push(newOption);
                } else {
                    campaign.secondaryOptions.push(newOption);
                }

                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        }

        this.focusSection.querySelectorAll("[data-del-primary-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (campaign.primaryOptions.length <= 1) {
                    window.alert("每個分類請至少保留一個選項。");
                    return;
                }
                const idx = Number(btn.getAttribute("data-del-primary-idx"));
                campaign.primaryOptions.splice(idx, 1);
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        });

        this.focusSection.querySelectorAll("[data-del-secondary-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (campaign.secondaryOptions.length <= 1) {
                    window.alert("每個分類請至少保留一個選項。");
                    return;
                }
                const idx = Number(btn.getAttribute("data-del-secondary-idx"));
                campaign.secondaryOptions.splice(idx, 1);
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        });

        // 儲存活動整體菜單附檔與連結
        const menuFileInput = document.getElementById("campaign-menu-file-input");
        if (menuFileInput) {
            menuFileInput.addEventListener("change", (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                if (file.type.startsWith("image/")) {
                    reader.onload = (evt) => {
                        campaign.attachmentDataUrl = String(evt.target.result || "");
                        campaign.attachmentTitle = file.name;
                        this.saveSurveyState();
                        window.alert(`已成功載入菜單圖片附檔：${file.name}`);
                    };
                    reader.readAsDataURL(file);
                } else {
                    reader.onload = (evt) => {
                        campaign.attachmentContent = String(evt.target.result || "");
                        campaign.attachmentTitle = file.name;
                        this.saveSurveyState();
                        this.renderSurveyPage("setup");
                    };
                    reader.readAsText(file, "UTF-8");
                }
            });
        }

        const saveMetaBtn = document.getElementById("save-campaign-meta-btn");
        if (saveMetaBtn) {
            saveMetaBtn.addEventListener("click", () => {
                campaign.title = document.getElementById("setup-campaign-title").value.trim() || campaign.title;
                campaign.officialUrl = document.getElementById("setup-campaign-url").value.trim();
                campaign.attachmentTitle = document.getElementById("setup-attach-title").value.trim() || "活動附檔";
                campaign.attachmentContent = document.getElementById("setup-attach-content").value;
                this.saveSurveyState();
                window.alert("已儲存活動與完整菜單附檔設定！");
                this.renderSurveyPage("setup");
            });
        }

        // 共用員工名單匯入（同步更新尾牙抽獎名單）
        const importRosterBtn = document.getElementById("survey-import-roster-btn");
        const rosterInput = document.getElementById("survey-roster-paste-input");
        if (importRosterBtn && rosterInput) {
            importRosterBtn.addEventListener("click", () => {
                const names = this.parseParticipantNames(rosterInput.value);
                if (names.length === 0) {
                    window.alert("請先貼上至少一位員工姓名。");
                    return;
                }
                this.applyImportedParticipants(names, false);
                window.alert(`已成功更新共用員工名單（共 ${names.length} 人），尾牙抽獎系統已同步更新！`);
                this.renderSurveyPage("setup");
            });
        }

        const loadSampleBtn = document.getElementById("survey-load-sample-roster-btn");
        if (loadSampleBtn) {
            loadSampleBtn.addEventListener("click", () => {
                this.applyImportedParticipants(REHEARSAL_SAMPLE_NAMES, true);
                this.renderSurveyPage("setup");
            });
        }

        // 一鍵產生模擬同仁投票數據
        const simulateBtn = document.getElementById("simulate-votes-btn");
        if (simulateBtn) {
            simulateBtn.addEventListener("click", () => {
                if (this.lotteryState.allParticipants.length === 0) {
                    this.applyImportedParticipants(REHEARSAL_SAMPLE_NAMES, true);
                }
                const emps = this.lotteryState.allParticipants;
                const pOpts = campaign.primaryOptions;
                const sOpts = campaign.secondaryOptions;
                if (pOpts.length === 0 || sOpts.length === 0) return;

                const sampleNotes = ["", "少冰無糖", "7分熟", "去冰微糖", "溫飲", ""];
                campaign.votes = {};
                // 模擬約 80% 同仁已完成投票，留下少數未投票供測試催票功能
                const simCount = Math.max(1, Math.floor(emps.length * 0.8));
                for (let i = 0; i < simCount; i += 1) {
                    const emp = emps[i];
                    const pPick = pOpts[this.getCryptoRandomInt(pOpts.length)];
                    const sPick = sOpts[this.getCryptoRandomInt(sOpts.length)];
                    const notePick = sampleNotes[this.getCryptoRandomInt(sampleNotes.length)];
                    campaign.votes[emp] = {
                        primaryId: pPick.id,
                        primaryName: pPick.name,
                        secondaryId: sPick.id,
                        secondaryName: sPick.name,
                        note: notePick,
                        time: "10/18 09:30"
                    };
                }
                this.saveSurveyState();
                window.location.hash = "theme-05-survey-stats";
            });
        }

        const clearVotesBtn = document.getElementById("clear-campaign-votes-btn");
        if (clearVotesBtn) {
            clearVotesBtn.addEventListener("click", () => {
                if (!window.confirm("確定要清空本活動目前已收到的票選紀錄嗎？")) return;
                campaign.votes = {};
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        }
    }

    bindSurveyStatsEvents(campaign, employees) {
        this.focusSection.querySelectorAll("[data-line-mode]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.lineTemplateMode = btn.getAttribute("data-line-mode") || "summary";
                this.renderSurveyPage("stats");
            });
        });

        const copyLineBtn = document.getElementById("copy-line-text-btn");
        const lineTextarea = document.getElementById("line-notification-textarea");
        if (copyLineBtn && lineTextarea) {
            copyLineBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(lineTextarea.value).then(() => {
                    const originalText = copyLineBtn.textContent;
                    copyLineBtn.textContent = "已成功複製到剪貼簿！現在可直接至 LINE 群組貼上 (Ctrl+V)";
                    setTimeout(() => {
                        copyLineBtn.textContent = originalText;
                    }, 2800);
                });
            });
        }

        const syncToLotteryBtn = document.getElementById("sync-voted-to-lottery-btn");
        if (syncToLotteryBtn) {
            syncToLotteryBtn.addEventListener("click", () => {
                const votedNames = Object.keys(campaign.votes || {});
                if (votedNames.length === 0) {
                    window.alert("目前尚無已完成投票之員工。");
                    return;
                }
                this.lotteryState.remainingPool = [...votedNames];
                this.saveLotteryState();
                window.alert(`已將 ${votedNames.length} 位完成問卷票選的同仁同步至「尾牙抽獎待抽池」！`);
            });
        }

        const exportCsvBtn = document.getElementById("export-survey-csv-btn");
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener("click", () => {
                this.exportSurveyVotesToCsv(campaign, employees);
            });
        }
    }

    /**
     * 使用 HTML5 Canvas 繪製主餐與飲料得票統計橫向長條圖（無任何 Inline CSS）
     */
    drawSurveyStatsCharts(campaign) {
        const canvas = document.getElementById("survey-stats-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const votesList = Object.values(campaign.votes || {});
        const totalVotes = votesList.length;

        const primaryCounts = campaign.primaryOptions.map((opt) => ({
            name: opt.name,
            count: votesList.filter((v) => v.primaryId === opt.id || v.primaryName === opt.name).length
        }));

        const secondaryCounts = campaign.secondaryOptions.map((opt) => ({
            name: opt.name,
            count: votesList.filter((v) => v.secondaryId === opt.id || v.secondaryName === opt.name).length
        }));

        const totalRows = primaryCounts.length + secondaryCounts.length;
        const canvasHeight = Math.max(320, 110 + totalRows * 42);
        canvas.height = canvasHeight;

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const textColor = isDark ? "#f1f5f9" : "#0f172a";
        const mutedColor = isDark ? "#94a3b8" : "#475569";
        const trackBg = isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(14, 165, 233, 0.1)";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "700 14px 'Noto Sans TC', sans-serif";

        let currentY = 28;

        const drawSection = (sectionTitle, items, barColor) => {
            ctx.fillStyle = textColor;
            ctx.font = "800 15px 'Noto Sans TC', sans-serif";
            ctx.fillText(sectionTitle, 16, currentY);
            currentY += 22;

            items.forEach((item) => {
                const pct = totalVotes > 0 ? Math.round((item.count / totalVotes) * 100) : 0;
                const labelText = item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name;

                ctx.fillStyle = mutedColor;
                ctx.font = "600 13px 'Noto Sans TC', sans-serif";
                ctx.fillText(labelText, 16, currentY + 15);

                const barX = 235;
                const maxBarW = 300;
                const barH = 20;

                ctx.fillStyle = trackBg;
                ctx.beginPath();
                ctx.roundRect(barX, currentY, maxBarW, barH, 6);
                ctx.fill();

                const fillW = totalVotes > 0 ? Math.max(6, (item.count / totalVotes) * maxBarW) : 0;
                if (fillW > 0) {
                    ctx.fillStyle = barColor;
                    ctx.beginPath();
                    ctx.roundRect(barX, currentY, fillW, barH, 6);
                    ctx.fill();
                }

                ctx.fillStyle = textColor;
                ctx.font = "700 13px 'JetBrains Mono', monospace";
                ctx.fillText(`${item.count} 票 (${pct}%)`, barX + maxBarW + 14, currentY + 15);

                currentY += 36;
            });

            currentY += 16;
        };

        drawSection(campaign.primaryCategoryLabel, primaryCounts, "#0ea5e9");
        drawSection(campaign.secondaryCategoryLabel, secondaryCounts, "#14b8a6");
    }

    /**
     * 產生可一鍵貼上 LINE 群組的通知文案（無任何表情符號，版面清晰易讀）
     */
    generateLineGroupNotificationText(campaign, employees, mode) {
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const unvotedNames = employees.filter((emp) => !votesMap[emp]);
        const votesList = Object.values(votesMap);

        const primarySummaryLines = campaign.primaryOptions.map((opt) => {
            const cnt = votesList.filter((v) => v.primaryId === opt.id || v.primaryName === opt.name).length;
            return `・${opt.name}：${cnt} 份`;
        });

        const secondarySummaryLines = campaign.secondaryOptions.map((opt) => {
            const cnt = votesList.filter((v) => v.secondaryId === opt.id || v.secondaryName === opt.name).length;
            return `・${opt.name}：${cnt} 杯/份`;
        });

        const pageUrl = `${window.location.origin}${window.location.pathname}#theme-05-survey-vote`;

        if (mode === "reminder") {
            return [
                `【群組通知】${campaign.title} — 尚未填寫提醒`,
                `----------------------------------------`,
                `各位同仁好，目前「${campaign.title}」已完成 ${votedNames.length} / ${employees.length} 人登記。`,
                ``,
                `【尚未完成票選同仁名單（共 ${unvotedNames.length} 人）】`,
                unvotedNames.length > 0 ? unvotedNames.map((n) => `・${n}`).join("\n") : "・全員皆已完成登記！",
                ``,
                `請尚未填寫的同仁點選以下線上連結查看菜單介紹並完成票選：`,
                pageUrl
            ].join("\n");
        }

        if (mode === "detailed") {
            const detailLines = votedNames.map((name, idx) => {
                const v = votesMap[name];
                const notePart = v.note ? `（備註：${v.note}）` : "";
                return `${String(idx + 1).padStart(2, "0")}. ${name}：${v.primaryName} ＋ ${v.secondaryName}${notePart}`;
            });

            return [
                `【群組公告】${campaign.title} — 統計與個人明細核對`,
                `----------------------------------------`,
                `應填人數：${employees.length} 人 ｜ 已完成：${votedNames.length} 人`,
                ``,
                `【${campaign.primaryCategoryLabel} 數量統計】`,
                ...primarySummaryLines,
                ``,
                `【${campaign.secondaryCategoryLabel} 數量統計】`,
                ...secondarySummaryLines,
                ``,
                `【各別同仁點餐／票選明細】`,
                ...(detailLines.length > 0 ? detailLines : ["（尚無填答紀錄）"]),
                ``,
                `如需修改或查看菜單介紹，請開啟線上票選頁面：`,
                pageUrl
            ].join("\n");
        }

        // 預設 summary 模式（數量統計彙整版）
        return [
            `【統計通知】${campaign.title} — 數量彙整總表`,
            `----------------------------------------`,
            `統計進度：已完成 ${votedNames.length} / ${employees.length} 人（待填 ${unvotedNames.length} 人）`,
            ``,
            `【${campaign.primaryCategoryLabel}】`,
            ...primarySummaryLines,
            ``,
            `【${campaign.secondaryCategoryLabel}】`,
            ...secondarySummaryLines,
            ``,
            `線上票選與明細檢視網址：`,
            pageUrl
        ].join("\n");
    }

    exportSurveyVotesToCsv(campaign, employees) {
        const votesMap = campaign.votes || {};
        const rows = [["員工姓名", "填答狀態", campaign.primaryCategoryLabel, campaign.secondaryCategoryLabel, "個人備註", "登記時間"]];

        employees.forEach((emp) => {
            const v = votesMap[emp];
            if (v) {
                rows.push([emp, "已完成", v.primaryName, v.secondaryName, v.note || "", v.time || ""]);
            } else {
                rows.push([emp, "尚未填寫", "", "", "", ""]);
            }
        });

        const csvContent = rows
            .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\r\n");

        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${campaign.title}_統計明細報表.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /* ==========================================================================
       年終尾牙自動化抽獎系統 (SYS-5B)
       ========================================================================== */

    renderLotterySubpage(theme, subpageMode) {
        if (!this.focusSection) return;

        if (!this.isLotteryUnlocked()) {
            this.renderLotteryPasscodeGate(theme, subpageMode);
            return;
        }

        if (subpageMode === "admin") {
            this.renderLotteryAdminPage(theme);
        } else {
            this.renderLotteryGrandStagePage(theme);
        }
    }

    renderLotteryPasscodeGate(theme, targetSubpageMode) {
        this.focusSection.innerHTML = `
            ${this.getFestiveSideHangingsHtml()}
            <div class="festive-gala-panel">
                <div class="festive-header-ribbon">
                    <div class="festive-brand-emblem">
                        <span class="festive-emblem-badge">吉慶尾牙</span>
                        <span class="festive-emblem-title">歲末年終尾牙歡慶盛典 — 安全驗證</span>
                    </div>
                    <button type="button" class="back-overview-btn" id="back-to-hub-btn">
                        <span>離開活動（返回主題五）</span>
                    </button>
                </div>

                <div class="passcode-gate-card">
                    <div class="gate-icon-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h3 class="gate-title">尾牙主持人通行碼驗證</h3>
                    <p class="gate-desc">
                        此抽獎系統與「問卷調查與餐點票選系統」共用本機員工名單，資料絕不會上傳至 GitHub。請輸入通行碼以進入尾牙活動頁面。
                    </p>
                    <form class="gate-form" id="passcode-gate-form">
                        <input
                            type="password"
                            id="passcode-gate-input"
                            class="gate-input"
                            placeholder="請輸入通行碼"
                            autocomplete="off"
                            required
                        />
                        <button type="submit" class="primary-btn">驗證解鎖</button>
                    </form>
                    <p class="gate-error-msg is-hidden" id="passcode-error-msg">通行碼不正確，請重新輸入。</p>
                    <span class="gate-hint">預設管理員通行碼：8888（解鎖後可於設定頁修改）</span>
                </div>
            </div>
        `;

        const backBtn = document.getElementById("back-to-hub-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                window.location.hash = "theme-05";
            });
        }

        const gateForm = document.getElementById("passcode-gate-form");
        const gateInput = document.getElementById("passcode-gate-input");
        const errorMsg = document.getElementById("passcode-error-msg");

        if (gateInput) {
            gateInput.focus();
        }

        if (gateForm && gateInput) {
            gateForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const entered = gateInput.value.trim();
                if (entered === this.getPasscode()) {
                    this.setLotteryUnlocked(true);
                    this.renderLotterySubpage(theme, targetSubpageMode);
                } else {
                    if (errorMsg) {
                        errorMsg.classList.remove("is-hidden");
                    }
                    gateInput.value = "";
                    gateInput.focus();
                }
            });
        }
    }

    renderLotteryAdminPage(theme) {
        const totalCount = this.lotteryState.allParticipants.length;
        const remainingCount = this.lotteryState.remainingPool.length;
        const winnersCount = totalCount - remainingCount;
        const modeBadgeText = this.lotteryState.isRehearsalMode ? "彩排測試名單模式" : "正式本機名單模式";

        const prizeConfigListHtml = this.lotteryState.prizeConfigs.map((item, idx) => `
            <li class="prize-config-item">
                <div class="prize-config-info">
                    <span class="prize-config-name">${this.escapeHtml(item.name)}</span>
                    <span class="prize-amount-badge">${this.escapeHtml(item.amount)}</span>
                </div>
                <button type="button" class="delete-idea-btn" data-remove-prize-idx="${idx}">刪除</button>
            </li>
        `).join("");

        const poolPreviewHtml = this.lotteryState.remainingPool.length > 0
            ? this.lotteryState.remainingPool.map((person) => `
                <span class="pool-person-chip">${this.escapeHtml(person)}</span>
            `).join("")
            : `<span class="theme-desc">目前待抽池為空，請由上方貼上員工名單、上傳 CSV 或載入彩排測試名單。</span>`;

        const historyHtml = this.lotteryState.winnersHistory.length > 0
            ? this.lotteryState.winnersHistory.map((record) => `
                <li class="winner-history-item">
                    <div class="winner-history-left">
                        <span class="theme-code-badge">第 ${record.round} 輪</span>
                        <span class="winner-prize-badge">${this.escapeHtml(record.prize)}</span>
                        <span class="prize-amount-badge">${this.escapeHtml(record.amount || "未指定金額")}</span>
                        <span class="winner-history-names">${record.winners.map((w) => this.escapeHtml(w)).join("、")}</span>
                    </div>
                    <span class="winner-history-time">${this.escapeHtml(record.time)}</span>
                </li>
            `).join("")
            : `<li class="winner-history-item"><span class="theme-desc">目前尚無開獎紀錄。</span></li>`;

        this.focusSection.innerHTML = `
            ${this.getFestiveSideHangingsHtml()}
            <div class="festive-gala-panel">
                <div class="festive-header-ribbon">
                    <div class="festive-brand-emblem">
                        <span class="festive-emblem-badge">後台配置</span>
                        <span class="festive-emblem-title">年終尾牙 — 人員名單匯入與獎項金額設定</span>
                    </div>
                    <div class="lottery-subpage-tabs">
                        <button type="button" class="subpage-tab-btn is-festive-tab" id="switch-to-draw-btn">
                            <span>前往大型開獎展演舞台</span>
                        </button>
                        <button type="button" class="subpage-tab-btn is-festive-tab active" id="switch-to-admin-btn">
                            <span>名單與獎金設定 (${remainingCount}人待抽)</span>
                        </button>
                        <button type="button" class="secondary-btn" id="jump-to-survey-btn">前往餐點問卷系統</button>
                        <button type="button" class="secondary-btn" id="admin-lock-btn">上鎖</button>
                        <button type="button" class="back-overview-btn" id="back-to-hub-btn">離開活動</button>
                    </div>
                </div>

                <div class="lottery-top-bar">
                    <div class="privacy-shield-info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>【${modeBadgeText}】此名單與「問卷調查與餐點票選系統」即時同步共用，僅保存在本機瀏覽器。</span>
                    </div>
                    <div class="lottery-top-actions">
                        <button type="button" class="secondary-btn" id="load-rehearsal-btn">載入 30 人彩排測試名單</button>
                        <button type="button" class="secondary-btn" id="change-passcode-btn">修改通行碼</button>
                        <button type="button" class="danger-outline-btn" id="clear-all-lottery-btn">清空所有名單與紀錄 (正式尾牙歸零)</button>
                    </div>
                </div>

                <div class="lottery-admin-grid">
                    <div class="lottery-panel-card">
                        <div class="lottery-panel-title">
                            <span>一、參與員工名單匯入管理（與問卷系統通用）</span>
                            <span class="theme-code-badge">ROSTER SETUP</span>
                        </div>

                        <div class="lottery-stats-grid">
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num">${totalCount}</span>
                                <span class="lottery-stat-label">總參與人數</span>
                            </div>
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num">${remainingCount}</span>
                                <span class="lottery-stat-label">剩餘待抽人數</span>
                            </div>
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num">${winnersCount}</span>
                                <span class="lottery-stat-label">已中獎人數</span>
                            </div>
                        </div>

                        <textarea
                            id="roster-paste-input"
                            class="roster-textarea"
                            placeholder="請在此貼上參與尾牙的員工名單（每行一位，例如：研發部 - 王小明，或以逗號分隔）..."
                        ></textarea>

                        <div class="file-upload-row">
                            <button type="button" class="primary-btn" id="import-paste-btn">匯入並更新名單池</button>
                            <label class="file-upload-label" for="csv-file-input">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <span>從電腦讀取 CSV / TXT 名單</span>
                            </label>
                            <input type="file" id="csv-file-input" class="hidden-file-input" accept=".csv,.txt" />
                            <button type="button" class="secondary-btn" id="reset-pool-only-btn">將已中獎者放回待抽池</button>
                        </div>

                        <div>
                            <div class="lottery-panel-title">
                                <span>目前待抽池名單預覽 (${remainingCount} 人)</span>
                            </div>
                            <div class="pool-preview-chips">
                                ${poolPreviewHtml}
                            </div>
                        </div>
                    </div>

                    <div class="lottery-panel-card">
                        <div class="lottery-panel-title">
                            <span>二、獎項名稱與預設金額設定</span>
                            <span class="theme-code-badge">PRIZE & AMOUNT</span>
                        </div>
                        <p class="section-subheading">
                            在此預先設定尾牙各獎項與對應獎金金額，開獎大舞台即可一鍵點選套用（大舞台亦支援現場臨時輸入加碼金額）：
                        </p>

                        <form class="prize-config-form" id="add-prize-config-form">
                            <input
                                type="text"
                                id="new-prize-name-input"
                                class="idea-input"
                                placeholder="獎項名稱 (如：特獎、加碼獎)"
                                required
                            />
                            <input
                                type="text"
                                id="new-prize-amount-input"
                                class="idea-input"
                                placeholder="獎項金額 (如：NT$ 88,000)"
                                required
                            />
                            <button type="submit" class="primary-btn">新增或更新獎項</button>
                        </form>

                        <ul class="prize-config-list">
                            ${prizeConfigListHtml}
                        </ul>

                        <div class="section-toolbar">
                            <span class="lottery-panel-title">三、中獎紀錄與報表匯出 (${this.lotteryState.winnersHistory.length} 輪)</span>
                            <button
                                type="button"
                                class="secondary-btn"
                                id="export-winners-csv-btn"
                                ${this.lotteryState.winnersHistory.length === 0 ? "disabled" : ""}
                            >
                                匯出含金額中獎結果 CSV
                            </button>
                        </div>

                        <ul class="winners-history-list">
                            ${historyHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        this.bindLotteryAdminEvents(theme);
    }

    renderLotteryGrandStagePage(theme) {
        const remainingCount = this.lotteryState.remainingPool.length;
        const totalCount = this.lotteryState.allParticipants.length;

        const prizeChipsHtml = this.lotteryState.prizeConfigs.map((cfg) => {
            const isActive = this.lotteryState.currentPrize === cfg.name && this.lotteryState.currentAmount === cfg.amount;
            return `
                <button
                    type="button"
                    class="prize-chip-btn ${isActive ? "active" : ""}"
                    data-select-prize="${this.escapeHtml(cfg.name)}"
                    data-select-amount="${this.escapeHtml(cfg.amount)}"
                >
                    <span>${this.escapeHtml(cfg.name)}</span>
                    <span>(${this.escapeHtml(cfg.amount)})</span>
                </button>
            `;
        }).join("");

        const batchOptions = [1, 3, 5];
        const batchBtnsHtml = batchOptions.map((size) => {
            const activeClass = this.lotteryState.batchSize === size ? "active" : "";
            return `
                <button type="button" class="batch-option-btn ${activeClass}" data-batch-size="${size}">
                    <span class="batch-option-num">${size}</span>
                    <span class="batch-option-label">人 / 次</span>
                </button>
            `;
        }).join("");

        let showcaseCardsHtml = "";
        if (this.lotteryState.latestDrawnWinners.length > 0) {
            const displayPrize = this.lotteryState.latestDrawnPrize || this.lotteryState.currentPrize;
            const displayAmount = this.lotteryState.latestDrawnAmount || this.lotteryState.currentAmount;
            showcaseCardsHtml = this.lotteryState.latestDrawnWinners.map((name, idx) => `
                <div class="grand-winner-card is-celebrating">
                    <span class="grand-winner-slot-badge">鴻運當頭 // WINNER #0${idx + 1}</span>
                    <div class="grand-winner-name">${this.escapeHtml(name)}</div>
                    <span class="grand-winner-Bonus-note">恭賀榮獲：${this.escapeHtml(displayPrize)}（${this.escapeHtml(displayAmount)}）</span>
                </div>
            `).join("");
        } else {
            const slotsCount = this.lotteryState.batchSize;
            const placeholders = [];
            for (let i = 0; i < slotsCount; i += 1) {
                placeholders.push(`
                    <div class="grand-winner-card">
                        <span class="grand-winner-slot-badge">吉星高照 // SLOT #0${i + 1}</span>
                        <div class="grand-winner-name">吉時待開獎</div>
                        <span class="grand-winner-Bonus-note">${this.escapeHtml(this.lotteryState.currentPrize)} — ${this.escapeHtml(this.lotteryState.currentAmount)}</span>
                    </div>
                `);
            }
            showcaseCardsHtml = placeholders.join("");
        }

        const historyHtml = this.lotteryState.winnersHistory.length > 0
            ? this.lotteryState.winnersHistory.map((record) => `
                <li class="winner-history-item">
                    <div class="winner-history-left">
                        <span class="theme-code-badge">第 ${record.round} 輪</span>
                        <span class="winner-prize-badge">${this.escapeHtml(record.prize)}</span>
                        <span class="prize-amount-badge">${this.escapeHtml(record.amount || "")}</span>
                        <span class="winner-history-names">${record.winners.map((w) => this.escapeHtml(w)).join("、")}</span>
                    </div>
                    <span class="winner-history-time">${this.escapeHtml(record.time)}</span>
                </li>
            `).join("")
            : `<li class="winner-history-item"><span class="theme-desc">尚無開獎紀錄，完成抽選後將顯示於此。</span></li>`;

        const drawerToggleLabel = this.isStageDrawerCollapsed ? "展開獎項與加碼金額設定" : "收合設定列（放大舞台）";

        this.focusSection.innerHTML = `
            ${this.getFestiveSideHangingsHtml()}

            <div class="festive-gala-panel">
                <div class="festive-header-ribbon">
                    <div class="festive-brand-emblem">
                        <span class="festive-emblem-badge">鴻運尾牙</span>
                        <span class="festive-emblem-title">歲末年終尾牙歡慶盛典 — 幸運大抽獎</span>
                    </div>
                    <div class="lottery-subpage-tabs">
                        <button type="button" class="secondary-btn" id="toggle-stage-drawer-btn">
                            ${drawerToggleLabel}
                        </button>
                        <button type="button" class="secondary-btn" id="replay-fireworks-btn">
                            施放慶祝煙花
                        </button>
                        <button type="button" class="subpage-tab-btn is-festive-tab" id="switch-to-admin-btn">
                            <span>名單匯入與獎金設定 (${remainingCount}/${totalCount}人)</span>
                        </button>
                        <button type="button" class="back-overview-btn" id="back-to-hub-btn">
                            <span>離開活動</span>
                        </button>
                    </div>
                </div>

                <div class="stage-config-drawer ${this.isStageDrawerCollapsed ? "is-hidden" : ""}" id="stage-config-drawer">
                    <div class="stage-preset-bar">
                        <span class="live-input-label">快速點選預設獎項與金額（或於下方直接輸入臨時加碼獎項與金額）：</span>
                        <div class="prize-preset-chips">
                            ${prizeChipsHtml}
                        </div>
                    </div>

                    <div class="stage-live-inputs-row">
                        <div class="live-input-group">
                            <label class="live-input-label" for="live-prize-name-input">本輪獎項名稱（支援臨時輸入）</label>
                            <input
                                type="text"
                                id="live-prize-name-input"
                                class="live-stage-input"
                                value="${this.escapeHtml(this.lotteryState.currentPrize)}"
                                placeholder="例如：董事長現場加碼大紅包"
                            />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="live-prize-amount-input">本輪獎項金額（支援臨時輸入金額）</label>
                            <input
                                type="text"
                                id="live-prize-amount-input"
                                class="live-stage-input live-amount-highlight"
                                value="${this.escapeHtml(this.lotteryState.currentAmount)}"
                                placeholder="例如：NT$ 88,000"
                            />
                        </div>
                        <div class="live-input-group">
                            <span class="live-input-label">單次同時抽出人數（1 / 3 / 5 人）</span>
                            <div class="batch-size-selector">
                                ${batchBtnsHtml}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grand-stage-arena">
                    <div class="stage-corner-ornament top-left" aria-hidden="true"></div>
                    <div class="stage-corner-ornament top-right" aria-hidden="true"></div>
                    <div class="stage-corner-ornament bottom-left" aria-hidden="true"></div>
                    <div class="stage-corner-ornament bottom-right" aria-hidden="true"></div>

                    <div class="grand-stage-header">
                        <span class="festive-stage-kicker">YEAR-END GALA LUCKY DRAW // 金玉滿堂・鴻運當頭</span>
                        <div class="grand-prize-banner">
                            <span class="grand-prize-title" id="stage-banner-prize">${this.escapeHtml(this.lotteryState.currentPrize)}</span>
                            <span class="grand-prize-amount" id="stage-banner-amount">${this.escapeHtml(this.lotteryState.currentAmount)}</span>
                        </div>
                        <span class="grand-pool-counter">
                            待抽池剩餘人數：${remainingCount} 人 ｜ 本輪每次抽出：${this.lotteryState.batchSize} 人
                        </span>
                    </div>

                    <div class="grand-winners-showcase" id="grand-winners-showcase">
                        ${showcaseCardsHtml}
                    </div>

                    <div class="grand-stage-controls">
                        <button
                            type="button"
                            class="grand-action-btn"
                            id="grand-roll-toggle-btn"
                            ${remainingCount === 0 ? "disabled" : ""}
                        >
                            ${remainingCount === 0
                                ? "目前待抽池無名單（請點選右上方「名單匯入與獎金設定」匯入或載入彩排名單）"
                                : `啟動姓名高速輪動（抽出 ${Math.min(this.lotteryState.batchSize, remainingCount)} 位幸運得主）`}
                        </button>
                        <span class="grand-pool-counter">
                            操作提示：按一下啟動姓名持續高速輪動，主持人喊停時再按一下立即定格揭曉並施放煙花
                        </span>
                    </div>
                </div>

                <div class="lottery-panel-card">
                    <div class="section-toolbar">
                        <span class="lottery-panel-title">尾牙榮譽紅榜紀錄 (${this.lotteryState.winnersHistory.length} 輪)</span>
                        <button
                            type="button"
                            class="secondary-btn"
                            id="stage-export-csv-btn"
                            ${this.lotteryState.winnersHistory.length === 0 ? "disabled" : ""}
                        >
                            匯出含金額中獎結果 CSV 報表
                        </button>
                    </div>
                    <ul class="winners-history-list">
                        ${historyHtml}
                    </ul>
                </div>
            </div>
        `;

        this.bindLotteryGrandStageEvents(theme);
    }

    bindLotteryAdminEvents(theme) {
        const switchToDrawBtn = document.getElementById("switch-to-draw-btn");
        if (switchToDrawBtn) {
            switchToDrawBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-draw";
            });
        }

        const jumpSurveyBtn = document.getElementById("jump-to-survey-btn");
        if (jumpSurveyBtn) {
            jumpSurveyBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-survey-vote";
            });
        }

        const backToHubBtn = document.getElementById("back-to-hub-btn");
        if (backToHubBtn) {
            backToHubBtn.addEventListener("click", () => {
                window.location.hash = "theme-05";
            });
        }

        const lockBtn = document.getElementById("admin-lock-btn");
        if (lockBtn) {
            lockBtn.addEventListener("click", () => {
                this.setLotteryUnlocked(false);
                this.renderLotterySubpage(theme, "admin");
            });
        }

        const changePassBtn = document.getElementById("change-passcode-btn");
        if (changePassBtn) {
            changePassBtn.addEventListener("click", () => {
                const newCode = window.prompt("請輸入新的主持人通行碼：", this.getPasscode());
                if (newCode && newCode.trim().length > 0) {
                    this.setPasscode(newCode.trim());
                    window.alert("通行碼已更新完成。");
                }
            });
        }

        const rehearsalBtn = document.getElementById("load-rehearsal-btn");
        if (rehearsalBtn) {
            rehearsalBtn.addEventListener("click", () => {
                this.applyImportedParticipants(REHEARSAL_SAMPLE_NAMES, true);
                this.renderLotteryAdminPage(theme);
            });
        }

        const clearAllBtn = document.getElementById("clear-all-lottery-btn");
        if (clearAllBtn) {
            clearAllBtn.addEventListener("click", () => {
                const confirmed = window.confirm("確定要清空所有員工名單與中獎紀錄嗎？");
                if (!confirmed) return;
                this.lotteryState.allParticipants = [];
                this.lotteryState.remainingPool = [];
                this.lotteryState.winnersHistory = [];
                this.lotteryState.latestDrawnWinners = [];
                this.lotteryState.isRehearsalMode = false;
                this.saveLotteryState();
                this.renderLotteryAdminPage(theme);
            });
        }

        const importPasteBtn = document.getElementById("import-paste-btn");
        const rosterTextarea = document.getElementById("roster-paste-input");
        if (importPasteBtn && rosterTextarea) {
            importPasteBtn.addEventListener("click", () => {
                const names = this.parseParticipantNames(rosterTextarea.value);
                if (names.length === 0) {
                    window.alert("請先在文字框中貼上至少一位員工姓名。");
                    return;
                }
                this.applyImportedParticipants(names, false);
                this.renderLotteryAdminPage(theme);
            });
        }

        const csvInput = document.getElementById("csv-file-input");
        if (csvInput) {
            csvInput.addEventListener("change", (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const content = String(evt.target.result || "");
                    const names = this.parseParticipantNames(content);
                    if (names.length === 0) {
                        window.alert("檔案中未偵測到有效的員工姓名。");
                        return;
                    }
                    this.applyImportedParticipants(names, false);
                    this.renderLotteryAdminPage(theme);
                };
                reader.readAsText(file, "UTF-8");
            });
        }

        const resetPoolBtn = document.getElementById("reset-pool-only-btn");
        if (resetPoolBtn) {
            resetPoolBtn.addEventListener("click", () => {
                if (this.lotteryState.allParticipants.length === 0) return;
                const confirmed = window.confirm("確定要將已中獎員工全數放回待抽池，並清除歷史中獎紀錄嗎？");
                if (!confirmed) return;
                this.lotteryState.remainingPool = [...this.lotteryState.allParticipants];
                this.lotteryState.winnersHistory = [];
                this.lotteryState.latestDrawnWinners = [];
                this.saveLotteryState();
                this.renderLotteryAdminPage(theme);
            });
        }

        const addPrizeForm = document.getElementById("add-prize-config-form");
        const newPrizeNameInput = document.getElementById("new-prize-name-input");
        const newPrizeAmountInput = document.getElementById("new-prize-amount-input");
        if (addPrizeForm && newPrizeNameInput && newPrizeAmountInput) {
            addPrizeForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const nameVal = newPrizeNameInput.value.trim();
                const amountVal = newPrizeAmountInput.value.trim();
                if (!nameVal || !amountVal) return;

                const existingIdx = this.lotteryState.prizeConfigs.findIndex((p) => p.name === nameVal);
                if (existingIdx >= 0) {
                    this.lotteryState.prizeConfigs[existingIdx].amount = amountVal;
                } else {
                    this.lotteryState.prizeConfigs.unshift({ name: nameVal, amount: amountVal });
                }

                this.lotteryState.currentPrize = nameVal;
                this.lotteryState.currentAmount = amountVal;
                this.saveLotteryState();
                this.renderLotteryAdminPage(theme);
            });
        }

        this.focusSection.querySelectorAll("[data-remove-prize-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idx = Number(btn.getAttribute("data-remove-prize-idx"));
                if (this.lotteryState.prizeConfigs.length <= 1) {
                    window.alert("請至少保留一個預設獎項。");
                    return;
                }
                this.lotteryState.prizeConfigs.splice(idx, 1);
                this.saveLotteryState();
                this.renderLotteryAdminPage(theme);
            });
        });

        const exportCsvBtn = document.getElementById("export-winners-csv-btn");
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener("click", () => {
                this.exportWinnersToCsv();
            });
        }
    }

    bindLotteryGrandStageEvents(theme) {
        const switchToAdminBtn = document.getElementById("switch-to-admin-btn");
        if (switchToAdminBtn) {
            switchToAdminBtn.addEventListener("click", () => {
                this.stopRollingIfNeeded();
                window.location.hash = "theme-05-admin";
            });
        }

        const backToHubBtn = document.getElementById("back-to-hub-btn");
        if (backToHubBtn) {
            backToHubBtn.addEventListener("click", () => {
                this.stopRollingIfNeeded();
                window.location.hash = "theme-05";
            });
        }

        const toggleDrawerBtn = document.getElementById("toggle-stage-drawer-btn");
        const stageDrawer = document.getElementById("stage-config-drawer");
        if (toggleDrawerBtn && stageDrawer) {
            toggleDrawerBtn.addEventListener("click", () => {
                this.isStageDrawerCollapsed = !this.isStageDrawerCollapsed;
                stageDrawer.classList.toggle("is-hidden", this.isStageDrawerCollapsed);
                toggleDrawerBtn.textContent = this.isStageDrawerCollapsed
                    ? "展開獎項與加碼金額設定"
                    : "收合設定列（放大舞台）";
            });
        }

        const replayFireworksBtn = document.getElementById("replay-fireworks-btn");
        if (replayFireworksBtn) {
            replayFireworksBtn.addEventListener("click", () => {
                this.fireworks.launchCelebration(4500);
            });
        }

        const livePrizeInput = document.getElementById("live-prize-name-input");
        const liveAmountInput = document.getElementById("live-prize-amount-input");
        const stageBannerPrize = document.getElementById("stage-banner-prize");
        const stageBannerAmount = document.getElementById("stage-banner-amount");

        const syncLiveInputs = () => {
            if (livePrizeInput) {
                this.lotteryState.currentPrize = livePrizeInput.value.trim() || "尾牙獎項";
            }
            if (liveAmountInput) {
                this.lotteryState.currentAmount = liveAmountInput.value.trim() || "驚喜獎金";
            }
            if (stageBannerPrize) {
                stageBannerPrize.textContent = this.lotteryState.currentPrize;
            }
            if (stageBannerAmount) {
                stageBannerAmount.textContent = this.lotteryState.currentAmount;
            }
            this.saveLotteryState();
        };

        if (livePrizeInput) {
            livePrizeInput.addEventListener("input", syncLiveInputs);
        }
        if (liveAmountInput) {
            liveAmountInput.addEventListener("input", syncLiveInputs);
        }

        this.focusSection.querySelectorAll("[data-select-prize]").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (this.isRolling) return;
                this.lotteryState.currentPrize = btn.getAttribute("data-select-prize") || "頭獎";
                this.lotteryState.currentAmount = btn.getAttribute("data-select-amount") || "NT$ 50,000";
                this.saveLotteryState();
                this.renderLotteryGrandStagePage(theme);
            });
        });

        this.focusSection.querySelectorAll("[data-batch-size]").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (this.isRolling) return;
                const size = Number(btn.getAttribute("data-batch-size"));
                if ([1, 3, 5].includes(size)) {
                    this.lotteryState.batchSize = size;
                    this.lotteryState.latestDrawnWinners = [];
                    this.saveLotteryState();
                    this.renderLotteryGrandStagePage(theme);
                }
            });
        });

        const rollToggleBtn = document.getElementById("grand-roll-toggle-btn");
        if (rollToggleBtn) {
            rollToggleBtn.addEventListener("click", () => {
                if (!this.isRolling) {
                    this.startContinuousRolling();
                } else {
                    this.stopRollingAndConfirmWinners(theme);
                }
            });
        }

        const exportCsvBtn = document.getElementById("stage-export-csv-btn");
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener("click", () => {
                this.exportWinnersToCsv();
            });
        }
    }

    startContinuousRolling() {
        const pool = this.lotteryState.remainingPool;
        if (!Array.isArray(pool) || pool.length === 0) return;

        this.fireworks.stop();
        this.isRolling = true;
        const drawCount = Math.min(this.lotteryState.batchSize, pool.length);
        const showcaseContainer = document.getElementById("grand-winners-showcase");
        const rollToggleBtn = document.getElementById("grand-roll-toggle-btn");

        if (rollToggleBtn) {
            rollToggleBtn.classList.add("is-stop-mode");
            rollToggleBtn.textContent = `按下停止！立即鎖定並揭曉 ${drawCount} 位幸運得獎人`;
        }

        const renderRollingTick = () => {
            if (!showcaseContainer) return;
            const tempPicked = [];
            const poolLen = pool.length;
            for (let i = 0; i < drawCount; i += 1) {
                const randIdx = this.getCryptoRandomInt(poolLen);
                tempPicked.push(pool[randIdx]);
            }

            showcaseContainer.innerHTML = tempPicked.map((name, idx) => `
                <div class="grand-winner-card is-rolling">
                    <span class="grand-winner-slot-badge">高速輪動抽選中 // SLOT #0${idx + 1}</span>
                    <div class="grand-winner-name">${this.escapeHtml(name)}</div>
                    <span class="grand-winner-Bonus-note">${this.escapeHtml(this.lotteryState.currentPrize)} — ${this.escapeHtml(this.lotteryState.currentAmount)}</span>
                </div>
            `).join("");
        };

        renderRollingTick();
        this.rollingIntervalId = setInterval(renderRollingTick, 65);
    }

    stopRollingAndConfirmWinners(theme) {
        this.stopRollingIfNeeded();

        const poolCopy = [...this.lotteryState.remainingPool];
        if (poolCopy.length === 0) return;

        const drawCount = Math.min(this.lotteryState.batchSize, poolCopy.length);
        const selectedWinners = [];

        for (let i = 0; i < drawCount; i += 1) {
            const randIndex = this.getCryptoRandomInt(poolCopy.length);
            const [picked] = poolCopy.splice(randIndex, 1);
            selectedWinners.push(picked);
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
        const nextRound = this.lotteryState.winnersHistory.length + 1;
        const prizeTitle = this.lotteryState.currentPrize || "尾牙獎項";
        const prizeAmount = this.lotteryState.currentAmount || "驚喜獎金";

        this.lotteryState.remainingPool = poolCopy;
        this.lotteryState.latestDrawnWinners = selectedWinners;
        this.lotteryState.latestDrawnPrize = prizeTitle;
        this.lotteryState.latestDrawnAmount = prizeAmount;

        this.lotteryState.winnersHistory.unshift({
            round: nextRound,
            prize: prizeTitle,
            amount: prizeAmount,
            winners: selectedWinners,
            time: timeStr
        });

        this.saveLotteryState();
        this.renderLotteryGrandStagePage(theme);
        this.fireworks.launchCelebration(5000);
    }

    parseParticipantNames(rawText) {
        const lines = rawText
            .split(/\r?\n|,|;/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

        const headerKeywords = ["姓名", "員工姓名", "name", "employee", "名單"];
        const uniqueNames = [];
        const seen = new Set();

        lines.forEach((line, idx) => {
            if (idx === 0 && headerKeywords.includes(line.toLowerCase())) {
                return;
            }
            if (!seen.has(line)) {
                seen.add(line);
                uniqueNames.push(line);
            }
        });

        return uniqueNames;
    }

    applyImportedParticipants(names, isRehearsal) {
        this.lotteryState.allParticipants = [...names];
        this.lotteryState.remainingPool = [...names];
        this.lotteryState.winnersHistory = [];
        this.lotteryState.latestDrawnWinners = [];
        this.lotteryState.isRehearsalMode = isRehearsal;
        this.saveLotteryState();
    }

    getCryptoRandomInt(maxExclusive) {
        if (maxExclusive <= 1) return 0;
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % maxExclusive;
    }

    exportWinnersToCsv() {
        if (!this.lotteryState.winnersHistory || this.lotteryState.winnersHistory.length === 0) {
            return;
        }

        const rows = [["抽選輪次", "獎項名稱", "獎項金額", "中獎員工姓名", "抽出時間"]];
        const chronological = [...this.lotteryState.winnersHistory].reverse();

        chronological.forEach((record) => {
            record.winners.forEach((winnerName) => {
                rows.push([
                    `第 ${record.round} 輪`,
                    record.prize,
                    record.amount || "",
                    winnerName,
                    record.time
                ]);
            });
        });

        const csvContent = rows
            .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\r\n");

        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const now = new Date();
        const dateTag = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `尾牙中獎名單報表_${dateTag}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    renderFocusSection(theme) {
        if (!this.focusSection) return;
        const ideas = this.ideaBacklog[theme.id] || [];

        const modulesHtml = theme.slots.map((slot) => `
            <div class="module-placeholder-card">
                <div class="theme-meta-tags">
                    <span class="theme-code-badge">${this.escapeHtml(slot.tag)}</span>
                    <span class="theme-status-badge">模組插槽就緒</span>
                </div>
                <h4 class="module-placeholder-title">${this.escapeHtml(slot.name)}</h4>
                <p class="module-placeholder-desc">${this.escapeHtml(slot.detail)}</p>
            </div>
        `).join("");

        const ideasListHtml = ideas.length > 0
            ? ideas.map((item, idx) => `
                <li class="idea-list-item">
                    <span>${this.escapeHtml(item)}</span>
                    <button type="button" class="delete-idea-btn" data-delete-idx="${idx}">移除</button>
                </li>
            `).join("")
            : `<li class="idea-list-item"><span>目前尚無自訂功能構想，可於上方輸入框隨時新增待開發項目。</span></li>`;

        this.focusSection.innerHTML = `
            <div class="theme-focus-panel">
                <div class="focus-header">
                    <div class="focus-title-group">
                        <div class="theme-meta-tags">
                            <span class="theme-code-badge">${this.escapeHtml(theme.code)}</span>
                            <span class="theme-status-badge">${this.escapeHtml(theme.subtitle)}</span>
                        </div>
                        <h2 class="focus-title">${this.escapeHtml(theme.title)}</h2>
                        <p class="theme-desc">${this.escapeHtml(theme.description)}</p>
                    </div>
                    <button type="button" class="back-overview-btn" id="back-to-overview-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>返回五大主題總覽</span>
                    </button>
                </div>

                <div>
                    <h3 class="section-heading">預留子模組架構 (Reserved Slots)</h3>
                    <p class="section-subheading">以下為此主題預先規劃的 3 個標準化擴充插槽，後續可直接替換為實際功能元件：</p>
                </div>

                <div class="focus-modules-grid">
                    ${modulesHtml}
                </div>

                <div class="idea-capture-box">
                    <h3 class="section-heading">此主題的功能構想清單 (Feature Backlog)</h3>
                    <p class="section-subheading">當您想到希望加入此主題的新功能或工具時，可先記錄於此（儲存在瀏覽器本地端）：</p>
                    <form class="idea-form-row" id="idea-add-form">
                        <input type="text" class="idea-input" id="idea-text-input" placeholder="輸入想要在此主題新增的功能想法，例如：串接匯率 API、新增番茄鐘..." required />
                        <button type="submit" class="primary-btn">新增功能構想</button>
                    </form>
                    <ul class="idea-list" id="theme-idea-list">
                        ${ideasListHtml}
                    </ul>
                </div>
            </div>
        `;

        const backBtn = document.getElementById("back-to-overview-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                window.location.hash = "overview";
            });
        }

        const ideaForm = document.getElementById("idea-add-form");
        const ideaInput = document.getElementById("idea-text-input");
        if (ideaForm && ideaInput) {
            ideaForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const val = ideaInput.value.trim();
                if (!val) return;
                if (!Array.isArray(this.ideaBacklog[theme.id])) {
                    this.ideaBacklog[theme.id] = [];
                }
                this.ideaBacklog[theme.id].push(val);
                this.saveIdeaBacklog();
                this.renderFocusSection(theme);
            });
        }

        this.focusSection.querySelectorAll("[data-delete-idx]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idx = Number(btn.getAttribute("data-delete-idx"));
                if (Array.isArray(this.ideaBacklog[theme.id])) {
                    this.ideaBacklog[theme.id].splice(idx, 1);
                    this.saveIdeaBacklog();
                    this.renderFocusSection(theme);
                }
            });
        });
    }

    escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new WorkspaceApp();
});
