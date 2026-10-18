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
 * 飲品甜度與冰塊標準點選清單（供點餐頁面按鈕直接點選）
 */
const SURVEY_SUGAR_OPTIONS = [
    "正常糖 (10分)",
    "少糖 (7分)",
    "半糖 (5分)",
    "微糖 (3分)",
    "一分糖 (1分)",
    "無糖"
];

const SURVEY_ICE_OPTIONS = [
    "正常冰",
    "少冰",
    "微冰",
    "去冰",
    "完全去冰",
    "常溫",
    "溫飲",
    "熱飲"
];

/**
 * 預設內建之多主題票選活動範本（採用兩階段設計：第一階段先票選餐廳與飲料店，第二階段只針對最高票當選的那一家餐廳與飲料店進行點餐）
 */
const DEFAULT_SURVEY_CAMPAIGNS = [
    {
        id: "campaign-yearend-meal",
        title: "活動當日午餐與手搖飲 — 兩階段店家票選與最高票餐廳點餐",
        description: "【兩階段流程】第一階段：先由全體同仁票選想吃的「午餐餐廳」與「手搖飲料店」；第二階段：只針對第一階段「得票最高的那一家餐廳與飲料店」開放全體點餐（避免點到未當選餐廳需重新點餐）。飲料享公司限額補助 60 元，超額自動計算自付差額。",
        primaryCategoryLabel: "午餐餐廳",
        secondaryCategoryLabel: "手搖飲料店",
        currentPhase: "phase1",
        lockedPrimaryVendorId: "",
        lockedSecondaryVendorId: "",
        primarySubsidyLimit: 0,
        drinkSubsidyLimit: 60,
        enableDrinkSelectors: true,
        officialUrl: "https://www.google.com/search?q=%E4%B8%8A%E7%8F%AD%E6%97%8F+%E4%BA%BA%E6%B0%A3%E4%BE%BF%E7%95%B6+%E6%89%8B%E6%90%96%E9%A3%B2+%E8%8F%9C%E5%96%AE%E5%83%B9%E7%9B%AE%E8%A1%A8",
        attachmentTitle: "各家候選餐廳菜單介紹與手搖飲最新價目表總覽.doc",
        attachmentContent: "【兩階段店家票選與點餐・完整菜單與補助規則說明】\n\n■ 第一階段（店家票選）：\n請各位同仁先從 5 家候選午餐餐廳與 5 家手搖飲料店中，各投下您最想吃／最想喝的一家店（可點擊卡片下方按鈕查看各家官方菜單介紹與最新價目表 Menu）。\n\n■ 第二階段（針對最高票當選店家進行全體點餐）：\n第一階段截止後，系統自動選出「最高票當選餐廳」與「最高票當選飲料店」，全體同仁統一只針對當選的那一家餐廳與飲料店點選具體餐點、甜度與冰塊，不會跨多家餐廳點餐！\n\n■ 飲料限額補助規則（上限 60 元）：\n・點選 60 元（含）以下飲品：全額補助，免貼差額（自付 0 元）。\n・點選超過 60 元之飲品：需自行貼補差額（例如點選 75 元飲品，需自付差額 15 元）。",
        attachmentDataUrl: "",
        primaryOptions: [
            {
                id: "main-01",
                vendor: "梁社漢排骨",
                name: "五星名廚厚切排骨／玫瑰油雞便當專門店",
                price: 115,
                tag: "均價 $110~$125",
                desc: "兩岸十大名廚監製，主打厚切炸排骨、滷排骨、玫瑰油雞與椒麻雞便當，配菜清爽少油。",
                refUrl: "https://www.buygood.com.tw/",
                attachNote: "【梁社漢排骨 門市完整菜單價目表】\n1. 炸排骨便當：NT$ 115\n2. 滷排骨便當：NT$ 115\n3. 玫瑰油雞便當：NT$ 115\n4. 椒麻雞便當：NT$ 125\n5. 黃金塔塔鱈魚排便當：NT$ 120\n6. 紅糟肉便當：NT$ 110",
                attachDataUrl: "",
                menuItems: [
                    { id: "m1-1", name: "炸排骨便當", price: 115, tag: "鎮店招牌", desc: "厚切里肌炸排骨，外酥內嫩肉汁飽滿，附四樣清爽季節配菜。" },
                    { id: "m1-2", name: "滷排骨便當", price: 115, tag: "經典入味", desc: "先炸後滷獨門秘製醬汁，排骨軟嫩鹹香下飯。" },
                    { id: "m1-3", name: "玫瑰油雞便當", price: 115, tag: "鮮嫩雞腿", desc: "港式秘製滷水玫瑰油雞腿，皮 Q 肉嫩搭配特製油蔥。" },
                    { id: "m1-4", name: "椒麻雞便當", price: 125, tag: "微辣開胃", desc: "酥炸無骨雞腿排淋上特製花椒酸辣醬汁，開胃首選。" },
                    { id: "m1-5", name: "黃金塔塔鱈魚排便當", price: 120, tag: "海鮮推薦", desc: "金黃酥脆鱈魚排佐酸甜塔塔醬。" },
                    { id: "m1-6", name: "紅糟肉便當", price: 110, tag: "古早風味", desc: "紅麴醃製酥炸五花肉條，香氣濃郁。" }
                ]
            },
            {
                id: "main-02",
                vendor: "八方雲集",
                name: "現煎鍋貼／手工水餃／酸辣湯國民美食",
                price: 105,
                tag: "均價 $105~$140",
                desc: "現煎金黃酥脆鍋貼與飽滿水餃（招牌、韭菜、韓式辣味、咖哩、鮮蝦），搭配酸辣湯或玉米濃湯。",
                refUrl: "https://www.8way.com.tw/menu",
                attachNote: "【八方雲集 門市完整菜單價目表】\n1. 招牌鍋貼 10 顆 + 酸辣湯：NT$ 105\n2. 韭菜鍋貼 10 顆 + 酸辣湯：NT$ 105\n3. 韓式辣味鍋貼 10 顆 + 玉米濃湯：NT$ 105\n4. 招牌水餃 10 顆 + 酸辣湯：NT$ 105\n5. 鮮蝦水餃 10 顆 + 玉米濃湯：NT$ 140",
                attachDataUrl: "",
                menuItems: [
                    { id: "m2-1", name: "招牌鍋貼 10 顆 + 酸辣湯", price: 105, tag: "人氣冠軍", desc: "現煎金黃酥脆招牌高麗菜豬肉鍋貼 10 顆搭配酸辣湯。" },
                    { id: "m2-2", name: "韭菜鍋貼 10 顆 + 酸辣湯", price: 105, tag: "濃郁韭香", desc: "新鮮翠綠韭菜豬肉鍋貼 10 顆搭配酸辣湯。" },
                    { id: "m2-3", name: "韓式辣味鍋貼 10 顆 + 玉米濃湯", price: 105, tag: "微辣過癮", desc: "韓式泡菜辣味鍋貼 10 顆搭配香甜玉米濃湯。" },
                    { id: "m2-4", name: "招牌水餃 10 顆 + 酸辣湯", price: 105, tag: "Q彈水餃", desc: "皮 Q 餡多招牌水餃 10 顆搭配酸辣湯。" },
                    { id: "m2-5", name: "鮮蝦水餃 10 顆 + 玉米濃湯", price: 140, tag: "整尾鮮蝦", desc: "每顆包入整尾鮮甜蝦仁水餃 10 顆搭配玉米濃湯。" }
                ]
            },
            {
                id: "main-03",
                vendor: "正忠排骨飯",
                name: "超大塊帶骨排骨／蜜汁燒雞腿便當",
                price: 110,
                tag: "均價 $105~$120",
                desc: "經典超大片滷炸帶骨排骨或蜜汁烤雞腿、酥炸大雞腿，搭配三樣家常配菜與辣菜脯。",
                refUrl: "https://www.jengjong.tw/",
                attachNote: "【正忠排骨飯 門市完整菜單價目表】\n1. 正忠排骨飯：NT$ 110\n2. 蜜汁燒雞腿飯：NT$ 120\n3. 酥炸雞腿飯：NT$ 120\n4. 宮保雞丁飯：NT$ 105\n5. 日式豬排飯：NT$ 115",
                attachDataUrl: "",
                menuItems: [
                    { id: "m3-1", name: "正忠排骨飯", price: 110, tag: "鎮店招牌", desc: "超大片獨門醃製滷炸帶骨排骨便當。" },
                    { id: "m3-2", name: "蜜汁燒雞腿飯", price: 120, tag: "人氣烤腿", desc: "蜜汁醬烤大雞腿，外皮焦香肉質多汁。" },
                    { id: "m3-3", name: "酥炸雞腿飯", price: 120, tag: "金黃酥脆", desc: "現炸酥脆大雞腿便當，份量十足。" },
                    { id: "m3-4", name: "宮保雞丁飯", price: 105, tag: "香辣下飯", desc: "大火快炒花生乾辣椒與鮮嫩雞丁便當。" }
                ]
            },
            {
                id: "main-04",
                vendor: "鬍鬚張魯肉飯",
                name: "黃金粹魯便當／唐山排骨／雞腿便當",
                price: 120,
                tag: "均價 $100~$135",
                desc: "台灣魯肉飯名店，經典黃金粹魯搭配唐山排骨、黃金雞腿與原盅燉湯。",
                refUrl: "https://www.fmsc.com.tw/menu",
                attachNote: "【鬍鬚張 門市完整菜單價目表】\n1. 唐山排骨便當：NT$ 120\n2. 黃金雞腿便當：NT$ 130\n3. 魯肉飯便當 + 苦瓜排骨湯：NT$ 145\n4. 雞肉飯便當：NT$ 95",
                attachDataUrl: "",
                menuItems: [
                    { id: "m4-1", name: "唐山排骨便當", price: 120, tag: "人氣排骨", desc: "招牌粹魯飯搭配軟嫩入味唐山排骨與季節配菜。" },
                    { id: "m4-2", name: "黃金雞腿便當", price: 130, tag: "酥炸雞腿", desc: "招牌粹魯飯搭配黃金酥炸雞腿與滷蛋筍絲。" },
                    { id: "m4-3", name: "魯肉飯便當 + 苦瓜排骨湯", price: 145, tag: "經典湯組", desc: "魯肉飯便當搭配原盅慢燉苦瓜排骨湯。" },
                    { id: "m4-4", name: "雞絲魯肉雙拼便當", price: 105, tag: "雙重享受", desc: "鮮嫩雞肉絲與黃金粹魯雙拼便當。" }
                ]
            },
            {
                id: "main-05",
                vendor: "Subway 潛艇堡",
                name: "現烤麵包鮮蔬潛艇堡（輕食／素食友善）",
                price: 125,
                tag: "均價 $99~$135",
                desc: "現烤麵包搭配滿滿新鮮生菜與低脂肉片，清爽無負擔（提供全素／蛋奶素潛艇堡）。",
                refUrl: "https://subway.com.tw/GoWeb2/include/index.php?Page=2",
                attachNote: "【Subway 門市完整菜單價目表】\n1. 6 吋百味俱樂部潛艇堡：NT$ 125\n2. 6 吋嫩切雞肉潛艇堡：NT$ 120\n3. 6 吋燒烤牛肉潛艇堡：NT$ 135\n4. 6 吋鮮蔬潛艇堡 (素食可)：NT$ 99",
                attachDataUrl: "",
                menuItems: [
                    { id: "m5-1", name: "6 吋百味俱樂部潛艇堡", price: 125, tag: "經典人氣", desc: "火雞胸肉、火腿與烤牛肉三種肉片搭配新鮮生菜。" },
                    { id: "m5-2", name: "6 吋嫩切雞肉潛艇堡", price: 120, tag: "低脂清爽", desc: "鮮嫩雞胸肉片搭配生菜、番茄與自選醬料。" },
                    { id: "m5-3", name: "6 吋燒烤牛肉潛艇堡", price: 135, tag: "醇厚牛肉", desc: "嫩切燒烤牛肉片搭配豐富鮮蔬。" },
                    { id: "m5-4", name: "6 吋鮮蔬潛艇堡 (素食可)", price: 99, tag: "健康蔬食", desc: "滿滿生菜、番茄、青椒、黃瓜與橄欖（素食可用）。" }
                ]
            }
        ],
        secondaryOptions: [
            {
                id: "drink-01",
                vendor: "50嵐",
                name: "經典四季春珍波椰 (1號)／波霸奶茶／紅茶拿鐵",
                price: 50,
                tag: "多數品項 $60 內免貼",
                desc: "國民手搖飲首選，人氣冠軍「1號」四季春珍波椰 $50、波霸奶茶 $55 皆在 60 元補助內免貼差額！",
                refUrl: "https://www.google.com/search?q=50%E5%B5%90+%E6%9C%80%E6%96%B0%E8%8F%9C%E5%96%AE+%E5%83%B9%E7%9B%AE%E8%A1%A8",
                attachNote: "【50嵐 最新門市價目表 Menu（大杯 L 價格）】\n・四季春青茶 / 茉莉綠茶 / 阿薩姆紅茶：NT$ 40（免貼差額）\n・1號 四季春珍波椰：NT$ 50（免貼差額）\n・波霸奶茶 / 珍珠奶茶 / 燕麥奶茶：NT$ 55（免貼差額）\n・8冰綠 / 檸檬綠茶：NT$ 55（免貼差額）\n・紅茶拿鐵 / 烏龍拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）\n・波霸紅茶拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）",
                attachDataUrl: "",
                menuItems: [
                    { id: "d1-1", name: "1號 四季春珍波椰 (大杯)", price: 50, tag: "60元內免貼", desc: "四季春青茶搭配波霸、珍珠與椰果（免貼差額）。" },
                    { id: "d1-2", name: "波霸奶茶 / 珍珠奶茶 (大杯)", price: 55, tag: "60元內免貼", desc: "經典香醇奶茶搭配 Q 彈波霸（免貼差額）。" },
                    { id: "d1-3", name: "四季春青茶 / 茉莉綠茶 (大杯)", price: 40, tag: "60元內免貼", desc: "清爽回甘原葉純茶（免貼差額）。" },
                    { id: "d1-4", name: "8冰綠 / 檸檬綠茶 (大杯)", price: 55, tag: "60元內免貼", desc: "新鮮金桔梅子或檸檬綠茶，酸甜解膩（免貼差額）。" },
                    { id: "d1-5", name: "紅茶拿鐵 / 烏龍拿鐵 (大杯)", price: 65, tag: "超額補 +$5", desc: "濃郁茶湯融合鮮乳（單價 65 元，超過 60 元需貼差額 5 元）。" },
                    { id: "d1-6", name: "波霸紅茶拿鐵 (大杯)", price: 65, tag: "超額補 +$5", desc: "人氣鮮奶茶加波霸（單價 65 元，超過 60 元需貼差額 5 元）。" }
                ]
            },
            {
                id: "drink-02",
                vendor: "可不可熟成紅茶",
                name: "熟成紅茶／胭脂紅茶／白玉歐蕾專門店",
                price: 45,
                tag: "純茶 $45~$50 免貼",
                desc: "主打果香桂圓韻味熟成紅茶、蜜桃香胭脂紅茶與白玉歐蕾鮮奶茶。",
                refUrl: "https://www.kebuke.com/menu/",
                attachNote: "【可不可熟成紅茶 最新門市價目表 Menu（大杯 L 價格）】\n・熟成紅茶 / 麗春紅茶 / 春芽綠茶：NT$ 45（免貼差額）\n・胭脂紅茶 / 春芽冷露 / 熟成冷露：NT$ 50（免貼差額）\n・熟成歐蕾（鮮奶茶）：NT$ 65（超過 60 元，需貼差額 5 元）\n・白玉歐蕾（白玉珍珠鮮奶茶）：NT$ 75（超過 60 元，需貼差額 15 元）",
                attachDataUrl: "",
                menuItems: [
                    { id: "d2-1", name: "熟成紅茶 (大杯)", price: 45, tag: "60元內免貼", desc: "經典果香與桂圓尾韻紅茶，解油膩首選（免貼差額）。" },
                    { id: "d2-2", name: "春芽綠茶 / 麗春紅茶 (大杯)", price: 45, tag: "60元內免貼", desc: "清爽綠茶或淡雅花香紅茶（免貼差額）。" },
                    { id: "d2-3", name: "胭脂紅茶 / 春芽冷露 (大杯)", price: 50, tag: "60元內免貼", desc: "水蜜桃果香紅茶或古早味冬瓜綠茶（免貼差額）。" },
                    { id: "d2-4", name: "熟成歐蕾 (大杯)", price: 65, tag: "超額補 +$5", desc: "熟成紅茶融合濃醇鮮乳（單價 65 元，需貼差額 5 元）。" },
                    { id: "d2-5", name: "白玉歐蕾 (大杯)", price: 75, tag: "超額補 +$15", desc: "熟成歐蕾搭配 Q 彈白玉珍珠（單價 75 元，需貼差額 15 元）。" }
                ]
            },
            {
                id: "drink-03",
                vendor: "得正 Oolong Tea Project",
                name: "三分火輕烏龍／檸檬春烏龍／黃金珍珠鮮奶",
                price: 60,
                tag: "烏龍茶飲人氣王",
                desc: "專注三種不同焙火程度烏龍茶，招牌檸檬春烏龍 $55、輕烏龍鮮奶 $60、加黃金珍珠 $70。",
                refUrl: "https://dejeng.com/#menu",
                attachNote: "【得正 Oolong Tea Project 最新門市價目表 Menu（大杯 L 價格）】\n・春烏龍 / 輕烏龍 / 焙烏龍：NT$ 40（免貼差額）\n・檸檬春烏龍：NT$ 55（免貼差額）\n・芝士奶蓋春烏龍 / 輕烏龍：NT$ 60（免貼差額）\n・輕烏龍鮮奶 / 焙烏龍鮮奶：NT$ 60（免貼差額）\n・輕烏龍鮮奶 + 黃金珍珠：NT$ 70（超過 60 元，需貼差額 10 元）",
                attachDataUrl: "",
                menuItems: [
                    { id: "d3-1", name: "春烏龍 / 輕烏龍 / 焙烏龍 (大杯)", price: 40, tag: "60元內免貼", desc: "招牌三種焙火程度精品烏龍純茶（免貼差額）。" },
                    { id: "d3-2", name: "檸檬春烏龍 (大杯)", price: 55, tag: "60元內免貼", desc: "新鮮屏東檸檬原汁搭配清爽春烏龍（免貼差額）。" },
                    { id: "d3-3", name: "芝士奶蓋春烏龍 (大杯)", price: 60, tag: "60元內免貼", desc: "鹹甜綿密芝士奶蓋佐春烏龍（剛好 60 元免貼差額）。" },
                    { id: "d3-4", name: "輕烏龍鮮奶 / 焙烏龍鮮奶 (大杯)", price: 60, tag: "60元內免貼", desc: "三分火輕烏龍融合鮮乳（剛好 60 元免貼差額）。" },
                    { id: "d3-5", name: "輕烏龍鮮奶 + 黃金珍珠 (大杯)", price: 70, tag: "超額補 +$10", desc: "人氣烏龍鮮奶加 Q 彈黃金珍珠（單價 70 元，需貼差額 10 元）。" }
                ]
            },
            {
                id: "drink-04",
                vendor: "迷客夏 Milksha",
                name: "綠光牧場鮮奶茶／蜂蜜珍珠／手搗芋頭鮮奶",
                price: 65,
                tag: "小農鮮奶專門店",
                desc: "自家綠光牧場鮮乳調配，主打大正紅茶拿鐵、白玉蜂蜜珍珠與手搗大甲芋頭鮮奶。",
                refUrl: "https://www.milksha.com/products.php",
                attachNote: "【迷客夏 Milksha 最新門市價目表 Menu】\n・決明大麥 / 茉莉原淬綠茶 / 琥珀烏龍 (L)：NT$ 40（免貼差額）\n・柳丁綠茶 / 冰萃檸檬 (L)：NT$ 60（免貼差額）\n・大正紅茶拿鐵 / 伯爵紅茶拿鐵 (L)：NT$ 65（超過 60 元，需貼差額 5 元）\n・大正紅茶拿鐵 + 蜂蜜珍珠 (L)：NT$ 75（超過 60 元，需貼差額 15 元）\n・手搗芋頭鮮奶 (M)：NT$ 75（超過 60 元，需貼差額 15 元）",
                attachDataUrl: "",
                menuItems: [
                    { id: "d4-1", name: "決明大麥 / 茉莉原淬綠茶 (大杯)", price: 40, tag: "60元內免貼", desc: "無咖啡因大麥茶或清爽綠茶（免貼差額）。" },
                    { id: "d4-2", name: "柳丁綠茶 / 冰萃檸檬 (大杯)", price: 60, tag: "60元內免貼", desc: "鮮榨台灣柳丁綠茶（剛好 60 元免貼差額）。" },
                    { id: "d4-3", name: "大正紅茶拿鐵 (大杯)", price: 65, tag: "超額補 +$5", desc: "綠光牧場鮮奶搭配古早味紅茶（單價 65 元，需貼差額 5 元）。" },
                    { id: "d4-4", name: "大正紅茶拿鐵 + 蜂蜜珍珠 (大杯)", price: 75, tag: "超額補 +$15", desc: "招牌鮮奶茶加白玉蜂蜜珍珠（單價 75 元，需貼差額 15 元）。" },
                    { id: "d4-5", name: "手搗芋頭鮮奶 (中杯)", price: 75, tag: "超額補 +$15", desc: "大甲芋頭手工壓泥配綠光鮮奶（單價 75 元，需貼差額 15 元）。" }
                ]
            },
            {
                id: "drink-05",
                vendor: "麻古茶坊 MACU",
                name: "鮮果茶飲霸主：金萱雙Q／柳橙果粒／芝芝葡萄",
                price: 75,
                tag: "鮮果茶飲首選",
                desc: "主打新鮮果肉茶飲，高山金萱 $35、金萱雙Q $50（免貼差額），柳橙果粒 $75、芝芝葡萄果粒 $85。",
                refUrl: "https://www.macutea.com.tw/product.php",
                attachNote: "【麻古茶坊 MACU 最新門市價目表 Menu（大杯 L 價格）】\n・高山金萱茶 / 翡翠綠茶：NT$ 35~40（免貼差額）\n・金萱雙Q (波霸+椰果)：NT$ 50（免貼差額）\n・波霸紅茶拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）\n・翡翠柳橙 / 香橙果粒茶：NT$ 70~80（超過 60 元，需貼差額 10~20 元）\n・芝芝葡萄果粒 / 楊枝甘露 2.0：NT$ 85（超過 60 元，需貼差額 25 元）",
                attachDataUrl: "",
                menuItems: [
                    { id: "d5-1", name: "高山金萱茶 / 翡翠綠茶 (大杯)", price: 35, tag: "60元內免貼", desc: "清香回甘台灣原葉好茶（免貼差額）。" },
                    { id: "d5-2", name: "金萱雙Q（波霸+椰果）(大杯)", price: 50, tag: "60元內免貼", desc: "高山金萱搭配波霸與椰果（免貼差額）。" },
                    { id: "d5-3", name: "波霸紅茶拿鐵 (大杯)", price: 65, tag: "超額補 +$5", desc: "香醇紅茶拿鐵加波霸（單價 65 元，需貼差額 5 元）。" },
                    { id: "d5-4", name: "翡翠柳橙 (大杯)", price: 70, tag: "超額補 +$10", desc: "新鮮柳橙原汁搭翡翠綠茶（單價 70 元，需貼差額 10 元）。" },
                    { id: "d5-5", name: "芝芝葡萄果粒 / 楊枝甘露 (大杯)", price: 85, tag: "超額補 +$25", desc: "巨峰葡萄果肉冰沙佐紐西蘭起司奶蓋（單價 85 元，需貼差額 25 元）。" }
                ]
            }
        ],
        phase1Votes: {},
        votes: {}
    },
    {
        id: "campaign-team-outing",
        title: "部門聚餐餐廳與下午茶方案 — 通用多主題票選範例",
        description: "通用型多主題票選範例：除日常午餐與飲料外，本系統亦可用於部門聚餐餐廳決策、員工旅遊地點或福委會禮品方案調查。",
        primaryCategoryLabel: "聚餐餐廳方案",
        secondaryCategoryLabel: "搭配下午茶方案",
        currentPhase: "phase1",
        lockedPrimaryVendorId: "",
        lockedSecondaryVendorId: "",
        primarySubsidyLimit: 0,
        drinkSubsidyLimit: 0,
        enableDrinkSelectors: false,
        officialUrl: "https://www.google.com/search?q=%E9%83%A8%E9%96%80%E8%81%9A%E9%A4%90+%E4%BA%BA%E6%B0%A3%E9%A4%90%E5%BB%B3+%E6%8E%A8%E8%96%A6",
        attachmentTitle: "部門聚餐候選餐廳價位與交通資訊彙整表.doc",
        attachmentContent: "【部門聚餐候選餐廳彙整說明】\n1. 日式燒肉專門店：位於捷運站步行 3 分鐘，提供獨立包廂。\n2. 義式手工窯烤披薩餐酒館：適合多人分享，提供素食義大利麵選項。",
        attachmentDataUrl: "",
        primaryOptions: [
            {
                id: "out-main-01",
                vendor: "燒肉專門店",
                name: "日式燒肉多人包廂方案",
                price: 800,
                tag: "獨立包廂",
                desc: "專人代烤精選肉品拼盤，附無限量日式小菜與甜點。",
                refUrl: "https://www.google.com/search?q=%E6%97%A5%E5%BC%8F%E7%87%92%E8%82%89+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "設有三間獨立十人包廂。",
                attachDataUrl: "",
                menuItems: [
                    { id: "om1-1", name: "極上和牛燒肉套餐", price: 800, tag: "吃牛推薦", desc: "和牛與精選豚肉拼盤。" },
                    { id: "om1-2", name: "伊比利豬與海鮮燒肉套餐 (不吃牛)", price: 800, tag: "不吃牛推薦", desc: "伊比利松阪豬與干貝大蝦拼盤。" }
                ]
            },
            {
                id: "out-main-02",
                vendor: "義式餐酒館",
                name: "手工窯烤披薩與義麵分享餐",
                price: 650,
                tag: "輕鬆聚會",
                desc: "拿坡里龍眼木窯烤披薩、手工寬扁麵與歐陸開胃小點分享餐。",
                refUrl: "https://www.google.com/search?q=%E7%BE%A9%E5%BC%8F%E7%AA%AF%E7%83%A4%E6%8A%AB%E8%96%A9%E9%A4%90%E9%85%92%E9%A4%A8+%E8%A9%95%E5%83%B9",
                attachNote: "提供多款奶蛋素與全素窯烤料理。",
                attachDataUrl: "",
                menuItems: [
                    { id: "om2-1", name: "松露牛肝菌寬扁麵套餐", price: 650, tag: "人氣招牌", desc: "手工義麵搭配開胃前菜與濃湯。" },
                    { id: "om2-2", name: "瑪格麗特窯烤披薩套餐 (素食可)", price: 650, tag: "蔬食友善", desc: "正統拿坡里窯烤披薩套餐。" }
                ]
            }
        ],
        secondaryOptions: [
            {
                id: "out-drink-01",
                vendor: "手作甜點坊",
                name: "法式水果塔與濾掛咖啡禮盒",
                price: 150,
                tag: "甜點組合",
                desc: "手作水果塔切片蛋糕搭配莊園精品濾掛咖啡包。",
                refUrl: "https://www.google.com/search?q=%E6%B3%95%E5%BC%8F%E6%B0%B4%E6%9E%9C%E5%A1%94+%E4%B8%8B%E5%8D%88%E8%8C%B6+%E8%A9%95%E5%83%B9",
                attachNote: "蛋奶素可食。",
                attachDataUrl: "",
                menuItems: [
                    { id: "od1-1", name: "法式草莓千層塔 + 莊園濾掛咖啡", price: 150, tag: "人氣首選", desc: "新鮮草莓塔配中深焙濾掛。" },
                    { id: "od1-2", name: "靜岡抹茶生巧塔 + 蜜香紅烏龍茶包", price: 150, tag: "茶香推薦", desc: "濃郁抹茶塔配台灣紅烏龍。" }
                ]
            }
        ],
        phase1Votes: {},
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
    SURVEY_STATE: "aero_workspace_survey_state_v3"
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

        // 問卷與餐點票選互動暫存狀態（支援甜度冰塊點選、依價目表微調品項金額與差額試算）
        this.selectedVoterName = "";
        this.selectedPrimaryOptionId = "";
        this.selectedSecondaryOptionId = "";
        this.selectedSugar = "微糖 (3分)";
        this.selectedIce = "少冰";
        this.customPrimaryItemName = "";
        this.customPrimaryPrice = 0;
        this.customSecondaryItemName = "";
        this.customSecondaryPrice = 0;
        this.voterCustomNote = "";
        this.lineTemplateMode = "summary"; // summary | copay | detailed | reminder

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

    /**
     * 計算第一階段各候選餐廳與飲料店之得票數，並選出「最高票當選餐廳」與「最高票當選飲料店」
     */
    getWinningVendors(campaign) {
        const p1Map = campaign.phase1Votes || {};
        const p1List = Object.values(p1Map);

        const primaryCountsMap = {};
        campaign.primaryOptions.forEach((opt) => {
            primaryCountsMap[opt.id] = 0;
        });
        const secondaryCountsMap = {};
        campaign.secondaryOptions.forEach((opt) => {
            secondaryCountsMap[opt.id] = 0;
        });

        p1List.forEach((v) => {
            if (v.primaryVendorId && primaryCountsMap[v.primaryVendorId] !== undefined) {
                primaryCountsMap[v.primaryVendorId] += 1;
            }
            if (v.secondaryVendorId && secondaryCountsMap[v.secondaryVendorId] !== undefined) {
                secondaryCountsMap[v.secondaryVendorId] += 1;
            }
        });

        let primaryWinner = campaign.primaryOptions[0] || null;
        if (campaign.lockedPrimaryVendorId) {
            const lockedP = campaign.primaryOptions.find((o) => o.id === campaign.lockedPrimaryVendorId);
            if (lockedP) primaryWinner = lockedP;
        } else {
            let maxPVotes = -1;
            campaign.primaryOptions.forEach((opt) => {
                const cnt = primaryCountsMap[opt.id] || 0;
                if (cnt > maxPVotes) {
                    maxPVotes = cnt;
                    primaryWinner = opt;
                }
            });
        }

        let secondaryWinner = campaign.secondaryOptions[0] || null;
        if (campaign.lockedSecondaryVendorId) {
            const lockedS = campaign.secondaryOptions.find((o) => o.id === campaign.lockedSecondaryVendorId);
            if (lockedS) secondaryWinner = lockedS;
        } else {
            let maxSVotes = -1;
            campaign.secondaryOptions.forEach((opt) => {
                const cnt = secondaryCountsMap[opt.id] || 0;
                if (cnt > maxSVotes) {
                    maxSVotes = cnt;
                    secondaryWinner = opt;
                }
            });
        }

        // 確保當選店家必有 menuItems 可供第二階段點餐
        if (primaryWinner && (!Array.isArray(primaryWinner.menuItems) || primaryWinner.menuItems.length === 0)) {
            primaryWinner.menuItems = [
                {
                    id: `${primaryWinner.id}-default-1`,
                    name: primaryWinner.name,
                    price: Number(primaryWinner.price) || 110,
                    tag: "招牌餐點",
                    desc: primaryWinner.desc || "店家招牌餐點"
                }
            ];
        }
        if (secondaryWinner && (!Array.isArray(secondaryWinner.menuItems) || secondaryWinner.menuItems.length === 0)) {
            secondaryWinner.menuItems = [
                {
                    id: `${secondaryWinner.id}-default-1`,
                    name: secondaryWinner.name,
                    price: Number(secondaryWinner.price) || 50,
                    tag: "招牌飲品",
                    desc: secondaryWinner.desc || "店家招牌飲品"
                }
            ];
        }

        return {
            primaryWinner,
            primaryWinnerVotes: primaryWinner ? (primaryCountsMap[primaryWinner.id] || 0) : 0,
            primaryCountsMap,
            secondaryWinner,
            secondaryWinnerVotes: secondaryWinner ? (secondaryCountsMap[secondaryWinner.id] || 0) : 0,
            secondaryCountsMap,
            totalPhase1Votes: p1List.length
        };
    }

    renderSurveyPage(subView) {
        if (!this.focusSection) return;
        const campaign = this.getActiveCampaign();
        if (!campaign.currentPhase) {
            campaign.currentPhase = "phase1";
        }
        if (!campaign.phase1Votes) {
            campaign.phase1Votes = {};
        }
        if (!campaign.votes) {
            campaign.votes = {};
        }

        const employees = this.lotteryState.allParticipants;
        const p1VotedCount = Object.keys(campaign.phase1Votes).length;
        const p2OrderedCount = Object.keys(campaign.votes).length;
        const winInfo = this.getWinningVendors(campaign);

        const campaignOptionsHtml = this.surveyState.campaigns.map((c) => `
            <option value="${this.escapeHtml(c.id)}" ${c.id === campaign.id ? "selected" : ""}>
                ${this.escapeHtml(c.title)}
            </option>
        `).join("");

        const headerHtml = `
            <!-- 問卷系統頂部導覽列 -->
            <div class="survey-header-bar">
                <div class="festive-brand-emblem">
                    <span class="theme-code-badge">SYS-5A // 兩階段票選與點餐中心</span>
                    <span class="section-heading">多功能問卷調查與兩階段餐廳票選／點餐系統</span>
                </div>
                <div class="lottery-subpage-tabs">
                    <button type="button" class="subpage-tab-btn ${subView === "vote" ? "active" : ""}" id="tab-survey-vote">
                        <span>1. 同仁票選店家 ＆ 點餐大廳</span>
                    </button>
                    <button type="button" class="subpage-tab-btn ${subView === "setup" ? "active" : ""}" id="tab-survey-setup">
                        <span>2. 設定候選餐廳、菜單價目表與名單</span>
                    </button>
                    <button type="button" class="subpage-tab-btn ${subView === "stats" ? "active" : ""}" id="tab-survey-stats">
                        <span>3. 統計分析、差額收款與 LINE 通知 (票選:${p1VotedCount} / 點餐:${p2OrderedCount})</span>
                    </button>
                    <button type="button" class="secondary-btn" id="jump-to-lottery-btn">
                        <span>前往尾牙抽獎</span>
                    </button>
                    <button type="button" class="back-overview-btn" id="survey-back-hub-btn">
                        <span>離開系統</span>
                    </button>
                </div>
            </div>

            <!-- 票選活動主題切換器 -->
            <div class="survey-campaign-bar">
                <div class="campaign-select-group">
                    <label class="live-input-label" for="survey-campaign-select">切換票選主題專案：</label>
                    <select id="survey-campaign-select" class="campaign-select">
                        ${campaignOptionsHtml}
                    </select>
                    <button type="button" class="secondary-btn" id="create-new-campaign-btn">＋ 新增其他票選主題</button>
                </div>
                <span class="theme-route-hint">
                    共用名單：${employees.length} 人 ｜ 階段一已投店家：${p1VotedCount} 人 ｜ 階段二已點餐：${p2OrderedCount} 人
                </span>
            </div>

            <!-- 兩階段流程切換列（解決先點餐卻沒選上該餐廳需重點餐的問題） -->
            <div class="survey-phase-stepper">
                <button type="button" class="phase-step-card ${campaign.currentPhase === "phase1" ? "is-active-phase" : ""}" data-switch-phase="phase1">
                    <div class="phase-step-info">
                        <span class="phase-step-badge">STAGE 01 // 第一階段：先決定哪一家店</span>
                        <span class="phase-step-title">第一階段：候選餐廳 ＆ 手搖飲料店票選</span>
                        <span class="phase-step-desc">
                            先投票選出大家最想吃的餐廳與飲料店（不先點餐）。目前最高票領先：【${this.escapeHtml(winInfo.primaryWinner ? winInfo.primaryWinner.vendor : "未定")}】＋【${this.escapeHtml(winInfo.secondaryWinner ? winInfo.secondaryWinner.vendor : "未定")}】
                        </span>
                    </div>
                    <span class="vote-count-pill">已投 ${p1VotedCount}/${employees.length} 人</span>
                </button>

                <button type="button" class="phase-step-card ${campaign.currentPhase === "phase2" ? "is-active-phase" : ""}" data-switch-phase="phase2">
                    <div class="phase-step-info">
                        <span class="phase-step-badge">STAGE 02 // 第二階段：只針對最高票當選店家點餐</span>
                        <span class="phase-step-title">第二階段：針對最高票當選餐廳 ＆ 飲料店進行點餐</span>
                        <span class="phase-step-desc">
                            只開放最高票當選的【${this.escapeHtml(winInfo.primaryWinner ? winInfo.primaryWinner.vendor : "")}】與【${this.escapeHtml(winInfo.secondaryWinner ? winInfo.secondaryWinner.vendor : "")}】菜單供全體同仁點餐、選甜度冰塊與計算 60 元超額差額！
                        </span>
                    </div>
                    <span class="vote-count-pill">已點 ${p2OrderedCount}/${employees.length} 人</span>
                </button>
            </div>
        `;

        let bodyContentHtml = "";
        if (subView === "vote") {
            bodyContentHtml = this.getSurveyVoteViewHtml(campaign, employees, winInfo);
        } else if (subView === "setup") {
            bodyContentHtml = this.getSurveySetupViewHtml(campaign, employees, winInfo);
        } else {
            bodyContentHtml = this.getSurveyStatsViewHtml(campaign, employees, winInfo);
        }

        this.focusSection.innerHTML = `
            <div class="survey-system-shell">
                ${headerHtml}
                ${bodyContentHtml}
            </div>
            <div id="attachment-modal-root" class="is-hidden"></div>
        `;

        this.bindSurveyCommonEvents(subView, campaign);
        if (subView === "vote") {
            this.bindSurveyVoteEvents(campaign, winInfo);
        } else if (subView === "setup") {
            this.bindSurveySetupEvents(campaign);
        } else {
            this.bindSurveyStatsEvents(campaign, employees, winInfo);
            this.drawSurveyStatsCharts(campaign, winInfo);
        }
    }

    /**
     * 子視圖 1：依當前階段顯示「第一階段：票選哪一家餐廳／飲料店」或「第二階段：只針對最高票當選餐廳／飲料店點餐」
     */
    getSurveyVoteViewHtml(campaign, employees, winInfo) {
        if (!this.selectedVoterName && employees.length > 0) {
            this.selectedVoterName = employees[0];
            this.loadExistingVoteForSelectedEmployee(campaign, winInfo);
        }

        const isPhase1 = campaign.currentPhase === "phase1";

        const resourcesBannerHtml = `
            <div class="campaign-resources-banner">
                <div class="resource-info-col">
                    <span class="resource-title">${this.escapeHtml(campaign.title)}</span>
                    <span class="resource-desc">${this.escapeHtml(campaign.description)}</span>
                </div>
                <div class="resource-actions-row">
                    <button type="button" class="primary-btn" id="view-campaign-attachment-btn">
                        檢視完整菜單與手搖飲價目表總覽 (${this.escapeHtml(campaign.attachmentTitle || "介紹文件")})
                    </button>
                    <a href="${this.escapeHtml(campaign.officialUrl || "https://www.google.com")}" target="_blank" rel="noopener noreferrer" class="external-link-btn">
                        <span>查詢各家餐廳／手搖飲最新價目表</span>
                    </a>
                </div>
            </div>
        `;

        // =========================================================================
        // 【第一階段視圖】只投哪一家餐廳 ＆ 哪一家飲料店（可看各家菜單介紹與價目表，不先點餐）
        // =========================================================================
        if (isPhase1) {
            if (!this.selectedPrimaryOptionId && campaign.primaryOptions.length > 0) {
                this.selectedPrimaryOptionId = campaign.primaryOptions[0].id;
            }
            if (!this.selectedSecondaryOptionId && campaign.secondaryOptions.length > 0) {
                this.selectedSecondaryOptionId = campaign.secondaryOptions[0].id;
            }

            const voterOptionsP1Html = employees.length > 0
                ? employees.map((emp) => {
                    const p1Rec = campaign.phase1Votes && campaign.phase1Votes[emp];
                    const statusTag = p1Rec
                        ? `[階段一已投：${p1Rec.primaryVendorName} + ${p1Rec.secondaryVendorName}]`
                        : "[階段一尚未投票]";
                    return `<option value="${this.escapeHtml(emp)}" ${emp === this.selectedVoterName ? "selected" : ""}>${this.escapeHtml(emp)} ${statusTag}</option>`;
                }).join("")
                : `<option value="">請先至「設定頁」匯入員工姓名</option>`;

            const renderVendorCardsP1 = (options, selectedId, groupType, countsMap) => options.map((opt) => {
                const isSelected = opt.id === selectedId;
                const voteCnt = countsMap[opt.id] || 0;
                const isDrinkGroup = groupType === "secondary";
                const menuBtnLabel = isDrinkGroup ? "查看最新價目表 Menu" : "查看餐廳菜單介紹附檔";
                const webMenuLabel = isDrinkGroup ? "官方最新價目表網頁" : "連結餐廳菜單介紹";
                const searchQueryUrl = isDrinkGroup
                    ? `https://www.google.com/search?q=${encodeURIComponent((opt.vendor || opt.name) + " 最新菜單 價目表 必喝推薦")}`
                    : `https://www.google.com/search?q=${encodeURIComponent((opt.vendor || opt.name) + " 菜單 餐點介紹 評價")}`;
                const mapQueryUrl = `https://www.google.com/maps/search/${encodeURIComponent(opt.vendor || opt.name)}`;
                const sampleMenuSummary = Array.isArray(opt.menuItems) && opt.menuItems.length > 0
                    ? `店內招牌品項：${opt.menuItems.map((m) => `${m.name}($${m.price})`).join("、")}`
                    : "";

                return `
                    <article class="survey-option-card ${isSelected ? "is-selected" : ""}" data-select-group="${groupType}" data-option-id="${this.escapeHtml(opt.id)}">
                        <div class="informal-card-body">
                            <div class="option-card-header">
                                <div>
                                    <div class="option-badges-row">
                                        <span class="vendor-name-badge">${this.escapeHtml(opt.vendor || opt.name)}</span>
                                        <span class="option-tag-pill">${this.escapeHtml(opt.tag || "候選店家")}</span>
                                        <span class="vote-count-pill">目前得票：${voteCnt} 票</span>
                                    </div>
                                    <h4 class="option-title">${this.escapeHtml(opt.vendor ? `${opt.vendor} — ${opt.name}` : opt.name)}</h4>
                                </div>
                                <div class="option-radio-indicator" aria-hidden="true"></div>
                            </div>
                            <p class="option-desc">${this.escapeHtml(opt.desc)}</p>
                            ${sampleMenuSummary ? `<p class="theme-route-hint">${this.escapeHtml(sampleMenuSummary)}</p>` : ""}
                        </div>
                        <div class="option-links-bar">
                            <button type="button" class="external-link-btn" data-view-opt-attach="${this.escapeHtml(opt.id)}" data-view-opt-group="${groupType}">
                                <span>${menuBtnLabel}</span>
                            </button>
                            ${opt.refUrl ? `
                                <a href="${this.escapeHtml(opt.refUrl)}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                                    <span>${webMenuLabel}</span>
                                </a>
                            ` : ""}
                            <a href="${searchQueryUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                                <span>Google 評價查詢</span>
                            </a>
                            <a href="${mapQueryUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                                <span>地圖位置</span>
                            </a>
                        </div>
                    </article>
                `;
            }).join("");

            return `
                ${resourcesBannerHtml}

                <!-- 第一階段說明橫幅 -->
                <div class="winner-vendor-banner">
                    <div class="resource-info-col">
                        <span class="resource-title">【第一階段：先票選決定哪一家餐廳與飲料店】（避免同仁點了未當選餐廳的餐點還需要重新點餐）</span>
                        <span class="resource-desc">
                            請先從下方候選名單選出您最想吃的「午餐餐廳」與「手搖飲料店」。投票截止後，系統只會針對「得票最高的那一家餐廳與飲料店」開放第二階段全體點餐！
                        </span>
                    </div>
                    <button type="button" class="secondary-btn" id="lock-winner-and-go-phase2-btn">
                        第一階段截止：依目前最高票店家進入「第二階段點餐」
                    </button>
                </div>

                <!-- 選擇投票員工姓名 -->
                <div class="voter-identity-card">
                    <div class="live-input-group">
                        <label class="live-input-label" for="voter-employee-select">步驟一：請選擇您的員工姓名（與尾牙抽獎系統共用名單）</label>
                        <select id="voter-employee-select" class="live-stage-input">
                            ${voterOptionsP1Html}
                        </select>
                    </div>
                    <div class="live-input-group">
                        <span class="live-input-label">目前第一階段最高票領先店家</span>
                        <span class="copay-highlight-pill">
                            領先餐廳：【${this.escapeHtml(winInfo.primaryWinner ? winInfo.primaryWinner.vendor : "尚無")}】(${winInfo.primaryWinnerVotes}票) ｜ 領先飲料：【${this.escapeHtml(winInfo.secondaryWinner ? winInfo.secondaryWinner.vendor : "尚無")}】(${winInfo.secondaryWinnerVotes}票)
                        </span>
                    </div>
                </div>

                <!-- 候選午餐餐廳票選 -->
                <div class="survey-category-section">
                    <div class="lottery-panel-title">
                        <h3 class="section-heading">步驟二：票選您想吃的「${this.escapeHtml(campaign.primaryCategoryLabel)}」（共 ${campaign.primaryOptions.length} 家候選餐廳）</h3>
                        <span class="theme-code-badge">可點選下方按鈕查看各餐廳菜單介紹與評價</span>
                    </div>
                    <div class="survey-options-grid">
                        ${renderVendorCardsP1(campaign.primaryOptions, this.selectedPrimaryOptionId, "primary", winInfo.primaryCountsMap)}
                    </div>
                </div>

                <!-- 候選手搖飲料店票選 -->
                <div class="survey-category-section">
                    <div class="lottery-panel-title">
                        <h3 class="section-heading">步驟三：票選您想喝的「${this.escapeHtml(campaign.secondaryCategoryLabel)}」（共 ${campaign.secondaryOptions.length} 家候選飲料店）</h3>
                        <span class="theme-code-badge">可點選下方按鈕查看各飲料店最新價目表 Menu</span>
                    </div>
                    <div class="survey-options-grid">
                        ${renderVendorCardsP1(campaign.secondaryOptions, this.selectedSecondaryOptionId, "secondary", winInfo.secondaryCountsMap)}
                    </div>
                </div>

                <!-- 送出第一階段店家票選按鈕 -->
                <div class="grand-stage-controls">
                    <button type="button" class="primary-btn" id="submit-phase1-vote-btn" ${employees.length === 0 ? "disabled" : ""}>
                        送出「${this.escapeHtml(this.selectedVoterName || "同仁")}」的第一階段店家票選結果
                    </button>
                </div>
            `;
        }

        // =========================================================================
        // 【第二階段視圖】只針對第一階段「最高票當選餐廳」與「最高票當選飲料店」進行點餐！
        // =========================================================================
        const winningRestaurant = winInfo.primaryWinner;
        const winningDrinkShop = winInfo.secondaryWinner;
        const mealMenuItems = winningRestaurant ? winningRestaurant.menuItems : [];
        const drinkMenuItems = winningDrinkShop ? winningDrinkShop.menuItems : [];

        if (!this.selectedPrimaryOptionId || !mealMenuItems.some((m) => m.id === this.selectedPrimaryOptionId)) {
            if (mealMenuItems.length > 0) {
                this.selectedPrimaryOptionId = mealMenuItems[0].id;
                this.customPrimaryItemName = mealMenuItems[0].name;
                this.customPrimaryPrice = Number(mealMenuItems[0].price) || 0;
            }
        }
        if (!this.selectedSecondaryOptionId || !drinkMenuItems.some((d) => d.id === this.selectedSecondaryOptionId)) {
            if (drinkMenuItems.length > 0) {
                this.selectedSecondaryOptionId = drinkMenuItems[0].id;
                this.customSecondaryItemName = drinkMenuItems[0].name;
                this.customSecondaryPrice = Number(drinkMenuItems[0].price) || 0;
            }
        }

        const primarySubsidyLimit = Number(campaign.primarySubsidyLimit) || 0;
        const drinkSubsidyLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const enableDrinkSelectors = campaign.enableDrinkSelectors !== false;

        const currentMealItem = mealMenuItems.find((m) => m.id === this.selectedPrimaryOptionId) || mealMenuItems[0];
        const currentDrinkItem = drinkMenuItems.find((d) => d.id === this.selectedSecondaryOptionId) || drinkMenuItems[0];

        const activeMealPrice = Number(this.customPrimaryPrice) || (currentMealItem ? Number(currentMealItem.price) || 0 : 0);
        const activeDrinkPrice = Number(this.customSecondaryPrice) || (currentDrinkItem ? Number(currentDrinkItem.price) || 0 : 0);

        const mealCopay = primarySubsidyLimit > 0 ? Math.max(0, activeMealPrice - primarySubsidyLimit) : 0;
        const drinkCopay = drinkSubsidyLimit > 0 ? Math.max(0, activeDrinkPrice - drinkSubsidyLimit) : 0;
        const totalCopay = mealCopay + drinkCopay;

        const voterOptionsP2Html = employees.length > 0
            ? employees.map((emp) => {
                const vRecord = campaign.votes && campaign.votes[emp];
                const statusTag = vRecord
                    ? `[已完成點餐：${vRecord.primaryName} + ${vRecord.secondaryName}｜${vRecord.totalCopay > 0 ? `需補差額 $${vRecord.totalCopay}` : "免補差額"}]`
                    : "[尚未點餐]";
                return `<option value="${this.escapeHtml(emp)}" ${emp === this.selectedVoterName ? "selected" : ""}>${this.escapeHtml(emp)} ${statusTag}</option>`;
            }).join("")
            : `<option value="">請先至「設定頁」匯入員工姓名</option>`;

        const renderPhase2MenuCards = (menuItems, vendorObj, selectedItemId, groupType, subsidyLimit) => menuItems.map((item) => {
            const isSelected = item.id === selectedItemId;
            const priceVal = Number(item.price) || 0;
            const itemCopay = subsidyLimit > 0 ? Math.max(0, priceVal - subsidyLimit) : 0;
            const priceLabelText = priceVal > 0
                ? (itemCopay > 0 ? `NT$ ${priceVal} (超額補 +$${itemCopay})` : `NT$ ${priceVal} (補助內免貼)`)
                : "依菜單計價";

            return `
                <article class="survey-option-card ${isSelected ? "is-selected" : ""}" data-select-p2-group="${groupType}" data-item-id="${this.escapeHtml(item.id)}">
                    <div class="informal-card-body">
                        <div class="option-card-header">
                            <div>
                                <div class="option-badges-row">
                                    <span class="vendor-name-badge">${this.escapeHtml(vendorObj ? vendorObj.vendor : "")}</span>
                                    <span class="option-price-pill ${itemCopay > 0 ? "is-over-limit" : ""}">${this.escapeHtml(priceLabelText)}</span>
                                    <span class="option-tag-pill">${this.escapeHtml(item.tag || "店內品項")}</span>
                                </div>
                                <h4 class="option-title">${this.escapeHtml(item.name)}</h4>
                            </div>
                            <div class="option-radio-indicator" aria-hidden="true"></div>
                        </div>
                        <p class="option-desc">${this.escapeHtml(item.desc || "")}</p>
                    </div>
                </article>
            `;
        }).join("");

        const sugarPillsHtml = SURVEY_SUGAR_OPTIONS.map((sugar) => `
            <button type="button" class="selector-pill-btn ${this.selectedSugar === sugar ? "active" : ""}" data-select-sugar="${this.escapeHtml(sugar)}">
                ${this.escapeHtml(sugar)}
            </button>
        `).join("");

        const icePillsHtml = SURVEY_ICE_OPTIONS.map((ice) => `
            <button type="button" class="selector-pill-btn ${this.selectedIce === ice ? "active" : ""}" data-select-ice="${this.escapeHtml(ice)}">
                ${this.escapeHtml(ice)}
            </button>
        `).join("");

        const overridePrimarySelectHtml = campaign.primaryOptions.map((opt) => `
            <option value="${this.escapeHtml(opt.id)}" ${winningRestaurant && opt.id === winningRestaurant.id ? "selected" : ""}>
                當選餐廳：${this.escapeHtml(opt.vendor || opt.name)} (${winInfo.primaryCountsMap[opt.id] || 0} 票)
            </option>
        `).join("");

        const overrideSecondarySelectHtml = campaign.secondaryOptions.map((opt) => `
            <option value="${this.escapeHtml(opt.id)}" ${winningDrinkShop && opt.id === winningDrinkShop.id ? "selected" : ""}>
                當選飲料店：${this.escapeHtml(opt.vendor || opt.name)} (${winInfo.secondaryCountsMap[opt.id] || 0} 票)
            </option>
        `).join("");

        return `
            ${resourcesBannerHtml}

            <!-- 第二階段：最高票當選店家公告與該店專屬菜單連結橫幅 -->
            <div class="winner-vendor-banner">
                <div class="resource-info-col">
                    <span class="resource-title">
                        【第二階段：針對最高票當選店家進行全體點餐】當選餐廳：【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】｜當選飲料店：【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】
                    </span>
                    <span class="resource-desc">
                        全體同仁統一只針對第一階段票選最高票的「${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}」與「${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}」進行點餐，不會跨多家餐廳點餐！
                    </span>
                </div>
                <div class="campaign-select-group">
                    <select id="lock-primary-vendor-select" class="campaign-select" title="預設自動選取最高票餐廳，同票時可手動指定">
                        ${overridePrimarySelectHtml}
                    </select>
                    <select id="lock-secondary-vendor-select" class="campaign-select" title="預設自動選取最高票飲料店，同票時可手動指定">
                        ${overrideSecondarySelectHtml}
                    </select>
                </div>
            </div>

            <!-- 步驟一：選擇點餐員工姓名與飲食備註 -->
            <div class="voter-identity-card">
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-employee-select">步驟一：請選擇您的員工姓名（與尾牙抽獎系統共用名單）</label>
                    <select id="voter-employee-select" class="live-stage-input">
                        ${voterOptionsP2Html}
                    </select>
                </div>
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-custom-note-input">其他飲食備註（選填：如便當飯少、不加酸菜、加白玉珍珠等）</label>
                    <input
                        type="text"
                        id="voter-custom-note-input"
                        class="live-stage-input"
                        value="${this.escapeHtml(this.voterCustomNote)}"
                        placeholder="選填：輸入您的個人飲食客製備註..."
                    />
                </div>
            </div>

            <!-- 步驟二：只顯示「最高票當選餐廳」的店內餐點選項 -->
            <div class="survey-category-section">
                <div class="lottery-panel-title">
                    <div>
                        <span class="vendor-name-badge">最高票當選餐廳 (${winInfo.primaryWinnerVotes} 票)</span>
                        <h3 class="section-heading">步驟二：【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】專屬餐點點選</h3>
                    </div>
                    <div class="resource-actions-row">
                        <button type="button" class="external-link-btn" data-view-opt-attach="${this.escapeHtml(winningRestaurant ? winningRestaurant.id : "")}" data-view-opt-group="primary">
                            <span>查看【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】上傳菜單附檔</span>
                        </button>
                        ${winningRestaurant && winningRestaurant.refUrl ? `
                            <a href="${this.escapeHtml(winningRestaurant.refUrl)}" target="_blank" rel="noopener noreferrer" class="external-link-btn">
                                <span>開啟【${this.escapeHtml(winningRestaurant.vendor)}】官方菜單介紹網頁</span>
                            </a>
                        ` : ""}
                    </div>
                </div>
                <p class="section-subheading">請從【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】的菜單中點選您的主餐（若想點該店完整菜單上的其他品項，亦可於下方微調欄直接填入）：</p>
                <div class="survey-options-grid">
                    ${renderPhase2MenuCards(mealMenuItems, winningRestaurant, this.selectedPrimaryOptionId, "primary", primarySubsidyLimit)}
                </div>

                <div class="drink-custom-panel">
                    <div class="custom-order-adjust-grid">
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-primary-item-input">
                                當選餐廳【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】— 您點選的主餐品項名稱（可依該店菜單微調）
                            </label>
                            <input
                                type="text"
                                id="custom-primary-item-input"
                                class="live-stage-input"
                                value="${this.escapeHtml(this.customPrimaryItemName)}"
                            />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-primary-price-input">主餐單價 (NT$)</label>
                            <input
                                type="number"
                                id="custom-primary-price-input"
                                class="live-stage-input"
                                min="0"
                                step="1"
                                value="${activeMealPrice}"
                            />
                        </div>
                        <div class="live-input-group">
                            <span class="live-input-label">主餐費用試算</span>
                            <span class="copay-highlight-pill ${mealCopay > 0 ? "is-owing" : ""}" id="meal-copay-live-pill">
                                ${mealCopay > 0 ? `超額需補差額：NT$ ${mealCopay}` : `公司全額補助（自付差額 NT$ 0）`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 步驟三：只顯示「最高票當選飲料店」的飲品選項 ＋ 甜度冰塊按鈕點選 ＋ 60元限額補助差額試算 -->
            <div class="survey-category-section">
                <div class="lottery-panel-title">
                    <div>
                        <span class="vendor-name-badge">最高票當選飲料店 (${winInfo.secondaryWinnerVotes} 票)</span>
                        <h3 class="section-heading">步驟三：【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】飲品點選（補助上限 NT$ ${drinkSubsidyLimit}，超額自付差額）</h3>
                    </div>
                    <div class="resource-actions-row">
                        <button type="button" class="external-link-btn" data-view-opt-attach="${this.escapeHtml(winningDrinkShop ? winningDrinkShop.id : "")}" data-view-opt-group="secondary">
                            <span>查看【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】上傳最新價目表 Menu</span>
                        </button>
                        ${winningDrinkShop && winningDrinkShop.refUrl ? `
                            <a href="${this.escapeHtml(winningDrinkShop.refUrl)}" target="_blank" rel="noopener noreferrer" class="external-link-btn">
                                <span>開啟【${this.escapeHtml(winningDrinkShop.vendor)}】官方最新價目表網頁</span>
                            </a>
                        ` : ""}
                    </div>
                </div>
                <p class="section-subheading">請從【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】點選飲品，並在下方直接點選「甜度」與「冰塊」。若點選超過 ${drinkSubsidyLimit} 元之飲品，系統將自動計算需自行貼補的差額：</p>
                <div class="survey-options-grid">
                    ${renderPhase2MenuCards(drinkMenuItems, winningDrinkShop, this.selectedSecondaryOptionId, "secondary", drinkSubsidyLimit)}
                </div>

                <!-- 甜度與冰塊按鈕點選面板 + 飲料限額補助差額試算 -->
                <div class="drink-custom-panel">
                    ${enableDrinkSelectors ? `
                        <div class="selector-group-row">
                            <span class="live-input-label">點選飲品甜度（點擊按鈕直接切換）：</span>
                            <div class="selector-pills-wrap">
                                ${sugarPillsHtml}
                            </div>
                        </div>
                        <div class="selector-group-row">
                            <span class="live-input-label">點選飲品冰塊／溫度（點擊按鈕直接切換）：</span>
                            <div class="selector-pills-wrap">
                                ${icePillsHtml}
                            </div>
                        </div>
                    ` : ""}

                    <div class="custom-order-adjust-grid">
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-secondary-item-input">
                                當選飲料店【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】— 您點選的飲品名稱（可依最新價目表微調）
                            </label>
                            <input
                                type="text"
                                id="custom-secondary-item-input"
                                class="live-stage-input"
                                value="${this.escapeHtml(this.customSecondaryItemName)}"
                                placeholder="可對照該店最新價目表 Menu 填入其他飲品名稱..."
                            />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-secondary-price-input">依價目表飲品單價 (NT$)</label>
                            <input
                                type="number"
                                id="custom-secondary-price-input"
                                class="live-stage-input"
                                min="0"
                                step="1"
                                value="${activeDrinkPrice}"
                            />
                        </div>
                        <div class="live-input-group">
                            <span class="live-input-label">飲料限額補助（上限 NT$ ${drinkSubsidyLimit}）試算</span>
                            <span class="copay-highlight-pill ${drinkCopay > 0 ? "is-owing" : ""}" id="drink-copay-live-pill">
                                ${drinkCopay > 0 ? `超過上限 $${drinkSubsidyLimit}，需貼差額：NT$ ${drinkCopay}` : `未超過上限 $${drinkSubsidyLimit}，免貼差額 (NT$ 0)`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 即時個人點餐總結與應貼差額提示橫幅 -->
            <div class="subsidy-live-banner ${totalCopay > 0 ? "has-copay" : ""}" id="total-subsidy-summary-banner">
                <div class="subsidy-breakdown-text" id="total-subsidy-summary-text">
                    <span>點餐確認：【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】${this.escapeHtml(this.customPrimaryItemName)} ($${activeMealPrice})</span>
                    <span>＋</span>
                    <span>【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】${this.escapeHtml(this.customSecondaryItemName)} ($${activeDrinkPrice}${enableDrinkSelectors ? `｜${this.escapeHtml(this.selectedSugar)}・${this.escapeHtml(this.selectedIce)}` : ""})</span>
                </div>
                <span class="copay-highlight-pill ${totalCopay > 0 ? "is-owing" : ""}" id="total-copay-final-pill">
                    ${totalCopay > 0 ? `本次點餐您需自行貼補差額：NT$ ${totalCopay}` : `本次點餐全額補助，免貼差額 (NT$ 0)`}
                </span>
            </div>

            <!-- 送出第二階段點餐按鈕 -->
            <div class="grand-stage-controls">
                <button type="button" class="primary-btn" id="submit-survey-vote-btn" ${employees.length === 0 ? "disabled" : ""}>
                    確認送出「${this.escapeHtml(this.selectedVoterName || "同仁")}」於最高票當選店家的點餐結果
                </button>
            </div>
        `;
    }

    /**
     * 子視圖 2：候選餐廳／飲料店、店內菜單品項清單、最新價目表 Menu 上傳與補助上限設定頁
     */
    getSurveySetupViewHtml(campaign, employees, winInfo) {
        const primarySubsidyLimit = Number(campaign.primarySubsidyLimit) || 0;
        const drinkSubsidyLimit = Number(campaign.drinkSubsidyLimit) || 0;

        const primaryListHtml = campaign.primaryOptions.map((opt, idx) => {
            const menuCnt = Array.isArray(opt.menuItems) ? opt.menuItems.length : 0;
            const voteCnt = winInfo.primaryCountsMap[opt.id] || 0;
            return `
                <li class="prize-config-item">
                    <div class="prize-config-info">
                        <span class="vendor-name-badge">${this.escapeHtml(opt.vendor || opt.name)}</span>
                        <span class="vote-count-pill">階段一得票：${voteCnt} 票</span>
                        <span class="option-price-pill">內建 ${menuCnt} 道菜單品項</span>
                        <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                    </div>
                    <button type="button" class="delete-idea-btn" data-del-primary-idx="${idx}">移除</button>
                </li>
            `;
        }).join("");

        const secondaryListHtml = campaign.secondaryOptions.map((opt, idx) => {
            const menuCnt = Array.isArray(opt.menuItems) ? opt.menuItems.length : 0;
            const voteCnt = winInfo.secondaryCountsMap[opt.id] || 0;
            return `
                <li class="prize-config-item">
                    <div class="prize-config-info">
                        <span class="vendor-name-badge">${this.escapeHtml(opt.vendor || opt.name)}</span>
                        <span class="vote-count-pill">階段一得票：${voteCnt} 票</span>
                        <span class="option-price-pill">內建 ${menuCnt} 款飲品價目</span>
                        <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                    </div>
                    <button type="button" class="delete-idea-btn" data-del-secondary-idx="${idx}">移除</button>
                </li>
            `;
        }).join("");

        return `
            <div class="lottery-top-bar">
                <div class="privacy-shield-info">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>支援「第一階段：票選店家」與「第二階段：只針對最高票當選店家點餐」。可於右側按鈕一鍵模擬兩階段測試數據！</span>
                </div>
                <div class="lottery-top-actions">
                    <button type="button" class="secondary-btn" id="simulate-phase1-btn">模擬階段一：產生各店家票選數據</button>
                    <button type="button" class="primary-btn" id="simulate- votes-btn">模擬階段二：針對最高票店家產生全體點餐＆差額數據</button>
                    <button type="button" class="danger-outline-btn" id="clear-campaign-votes-btn">清空所有票選與點餐紀錄</button>
                </div>
            </div>

            <div class="lottery-admin-grid">
                <!-- 左欄：新增候選餐廳／飲料店、店內點餐品項與上傳 Menu 價目表 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、新增候選餐廳／手搖飲店與店內菜單價目表</span>
                        <span class="theme-code-badge">CANDIDATE STORES & MENU</span>
                    </div>

                    <form class="idea-capture-box" id="add-survey-option-form">
                        <div class="live-input-group">
                            <label class="live-input-label" for="new-opt-category">選擇所屬分類</label>
                            <select id="new-opt-category" class="live-stage-input">
                                <option value="primary">候選${this.escapeHtml(campaign.primaryCategoryLabel)}</option>
                                <option value="secondary">候選${this.escapeHtml(campaign.secondaryCategoryLabel)}</option>
                            </select>
                        </div>
                        <div class="idea-form-row">
                            <input type="text" id="new-opt-vendor" class="idea-input" placeholder="店家／餐廳名稱（如：梁社漢排骨、50嵐）" required />
                            <input type="number" id="new-opt-price" class="idea-input" min="0" step="1" placeholder="代表均價 (如：115 或 60)" required />
                        </div>
                        <div class="idea-form-row">
                            <input type="text" id="new-opt-name" class="idea-input" placeholder="店家主打特色標題（如：厚切炸排骨／玫瑰油雞專門店）" required />
                            <input type="text" id="new-opt-tag" class="idea-input" placeholder="標籤（如：均價 $115、純茶免貼差額）" />
                        </div>
                        <input type="text" id="new-opt-desc" class="idea-input" placeholder="店家簡短介紹說明..." required />
                        <input type="url" id="new-opt-url" class="idea-input" placeholder="該餐廳官方菜單介紹／飲料店最新價目表網頁連結 URL" />
                        <textarea id="new-opt-menu-items-text" class="roster-textarea" placeholder="【當該店在第一階段獲得最高票時，第二階段開放點餐的店內品項清單】&#10;每行輸入一項，格式為：品項名稱,單價,簡短說明&#10;範例：&#10;炸排骨便當,115,人氣招牌厚切排骨&#10;玫瑰油雞便當,115,鮮嫩油雞腿"></textarea>
                        <textarea id="new-opt-attach-note" class="roster-textarea" placeholder="完整文字版價目表 Menu 說明（同仁點擊『查看最新價目表 Menu』時彈出顯示）..."></textarea>
                        <div class="file-upload-row">
                            <label class="file-upload-label" for="new-opt-file-input">
                                <span>上傳該店最新實體 Menu 價目表圖片 (支援 JPG/PNG)</span>
                            </label>
                            <input type="file" id="new-opt-file-input" class="hidden-file-input" accept="image/*" />
                            <span class="theme-route-hint" id="new-opt-file-status">尚未選擇 Menu 圖檔</span>
                        </div>
                        <button type="submit" class="primary-btn">新增至候選店家列表</button>
                    </form>

                    <div>
                        <h4 class="lottery-panel-title">候選${this.escapeHtml(campaign.primaryCategoryLabel)} (${campaign.primaryOptions.length} 家)</h4>
                        <ul class="prize-config-list">${primaryListHtml}</ul>
                    </div>

                    <div>
                        <h4 class="lottery-panel-title">候選${this.escapeHtml(campaign.secondaryCategoryLabel)} (${campaign.secondaryOptions.length} 家)</h4>
                        <ul class="prize-config-list">${secondaryListHtml}</ul>
                    </div>
                </div>

                <!-- 右欄：補助限額設定（如飲料 60 元上限）＋ 活動總附檔 ＋ 共用員工名單匯入 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>二、補助限額設定（超額自付差額）與整體菜單附檔</span>
                        <span class="theme-code-badge">SUBSIDY & MENU</span>
                    </div>

                    <div class="idea-capture-box">
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-campaign-title">活動主題名稱</label>
                            <input type="text" id="setup-campaign-title" class="idea-input" value="${this.escapeHtml(campaign.title)}" />
                        </div>
                        <div class="idea-form-row">
                            <div class="live-input-group">
                                <label class="live-input-label" for="setup-drink-subsidy-limit">飲料補助上限金額 (元，例如 60 元；超過需自付差額)</label>
                                <input type="number" id="setup-drink-subsidy-limit" class="idea-input" min="0" step="5" value="${drinkSubsidyLimit}" />
                            </div>
                            <div class="live-input-group">
                                <label class="live-input-label" for="setup-primary-subsidy-limit">主餐補助上限金額 (元，0 代表全額補助)</label>
                                <input type="number" id="setup-primary-subsidy-limit" class="idea-input" min="0" step="10" value="${primarySubsidyLimit}" />
                            </div>
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-enable-drink-selectors">是否顯示「飲品甜度與冰塊按鈕點選面板」</label>
                            <select id="setup-enable-drink-selectors" class="live-stage-input">
                                <option value="true" ${campaign.enableDrinkSelectors !== false ? "selected" : ""}>啟用（提供正常糖/半糖/微糖/無糖、少冰/微冰/去冰/溫熱按鈕點選）</option>
                                <option value="false" ${campaign.enableDrinkSelectors === false ? "selected" : ""}>關閉（適用於一般非餐飲類問卷投票）</option>
                            </select>
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-campaign-url">餐廳菜單介紹／手搖飲價目表總連結</label>
                            <input type="url" id="setup-campaign-url" class="idea-input" value="${this.escapeHtml(campaign.officialUrl)}" />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-attach-title">完整菜單／價目表總覽附檔標題</label>
                            <input type="text" id="setup-attach-title" class="idea-input" value="${this.escapeHtml(campaign.attachmentTitle)}" />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="setup-attach-content">完整菜單與補助規則說明內容</label>
                            <textarea id="setup-attach-content" class="roster-textarea">${this.escapeHtml(campaign.attachmentContent)}</textarea>
                        </div>
                        <div class="file-upload-row">
                            <label class="file-upload-label" for="campaign-menu-file-input">
                                <span>上傳完整菜單圖片或 TXT 附檔</span>
                            </label>
                            <input type="file" id="campaign-menu-file-input" class="hidden-file-input" accept="image/*,.txt" />
                            <button type="button" class="primary-btn" id="save-campaign-meta-btn">儲存補助限額與附檔設定</button>
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
     * 子視圖 3：兩階段統計分析圖表、最高票當選店家點餐彙整、超額自付差額收款清單與一鍵複製 LINE 群組通知頁
     */
    getSurveyStatsViewHtml(campaign, employees, winInfo) {
        const p1Map = campaign.phase1Votes || {};
        const p1VotedNames = Object.keys(p1Map);
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const isPhase1 = campaign.currentPhase === "phase1";

        const activeDoneNames = isPhase1 ? p1VotedNames : votedNames;
        const unvotedNames = employees.filter((emp) => !activeDoneNames.includes(emp));

        const drinkLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const primaryLimit = Number(campaign.primarySubsidyLimit) || 0;

        let totalMealCost = 0;
        let totalDrinkCost = 0;
        let totalCopayAmount = 0;
        const copayRecords = [];

        votedNames.forEach((empName) => {
            const v = votesMap[empName];
            const mPrice = Number(v.primaryPrice) || 0;
            const dPrice = Number(v.secondaryPrice) || 0;
            const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
            const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
            const empCopay = mCopay + dCopay;

            totalMealCost += mPrice;
            totalDrinkCost += dPrice;
            totalCopayAmount += empCopay;

            if (empCopay > 0) {
                copayRecords.push({
                    empName,
                    vendor: v.secondaryVendor || "",
                    drinkName: v.secondaryName,
                    sugar: v.sugar || "",
                    ice: v.ice || "",
                    drinkPrice: dPrice,
                    mealPrice: mPrice,
                    copay: empCopay
                });
            }
        });

        const totalOrderCost = totalMealCost + totalDrinkCost;
        const totalCompanySubsidy = Math.max(0, totalOrderCost - totalCopayAmount);

        const lineText = this.generateLineGroupNotificationText(campaign, employees, this.lineTemplateMode, winInfo);

        const copayListHtml = copayRecords.length > 0
            ? copayRecords.map((item) => `
                <li class="winner-history-item">
                    <div class="winner-history-left">
                        <span class="winner-history-names">${this.escapeHtml(item.empName)}</span>
                        ${item.vendor ? `<span class="vendor-name-badge">${this.escapeHtml(item.vendor)}</span>` : ""}
                        <span class="prize-config-name">${this.escapeHtml(item.drinkName)}</span>
                        ${(item.sugar || item.ice) ? `<span class="option-tag-pill">${this.escapeHtml(item.sugar)} / ${this.escapeHtml(item.ice)}</span>` : ""}
                        <span class="theme-route-hint">飲品單價 NT$ ${item.drinkPrice}（補助上限 NT$ ${drinkLimit}）</span>
                    </div>
                    <span class="copay-highlight-pill is-owing">應收自付差額：+NT$ ${item.copay}</span>
                </li>
            `).join("")
            : `<li class="winner-history-item"><span class="theme-desc">目前無任何同仁超過補助上限（或尚未進行第二階段點餐）。</span></li>`;

        const detailedRecordsHtml = votedNames.length > 0
            ? votedNames.map((empName) => {
                const v = votesMap[empName];
                const mPrice = Number(v.primaryPrice) || 0;
                const dPrice = Number(v.secondaryPrice) || 0;
                const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
                const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
                const empCopay = mCopay + dCopay;
                const sugarIceText = (v.sugar || v.ice) ? ` (${v.sugar || ""}/${v.ice || ""})` : "";

                return `
                    <li class="winner-history-item">
                        <div class="winner-history-left">
                            <span class="winner-history-names">${this.escapeHtml(empName)}</span>
                            <span class="winner-prize-badge">
                                ${this.escapeHtml(v.primaryVendor ? `[${v.primaryVendor}] ` : "")}${this.escapeHtml(v.primaryName)} ($${mPrice})
                            </span>
                            <span class="prize-amount-badge">
                                ${this.escapeHtml(v.secondaryVendor ? `[${v.secondaryVendor}] ` : "")}${this.escapeHtml(v.secondaryName)}${this.escapeHtml(sugarIceText)} ($${dPrice})
                            </span>
                            <span class="option-price-pill ${empCopay > 0 ? "is-over-limit" : ""}">
                                ${empCopay > 0 ? `需補差額 +$${empCopay}` : "免貼差額 $0"}
                            </span>
                            ${v.note ? `<span class="theme-route-hint">備註：${this.escapeHtml(v.note)}</span>` : ""}
                        </div>
                        <span class="winner-history-time">${this.escapeHtml(v.time)}</span>
                    </li>
                `;
            }).join("")
            : `<li class="winner-history-item"><span class="theme-desc">目前尚無第二階段點餐紀錄（可點擊上方「模擬階段二」按鈕一鍵預覽當選店家點餐與差額收款明細）。</span></li>`;

        const unvotedChipsHtml = unvotedNames.length > 0
            ? unvotedNames.map((name) => `<span class="pool-person-chip">${this.escapeHtml(name)}</span>`).join("")
            : `<span class="theme-status-badge">本階段全員皆已完成！</span>`;

        return `
            <!-- 兩階段最高票當選店家狀態與快速模擬列 -->
            <div class="winner-vendor-banner">
                <div class="resource-info-col">
                    <span class="resource-title">
                        第一階段票選最高票當選店家：【${this.escapeHtml(winInfo.primaryWinner ? winInfo.primaryWinner.vendor : "未定")}】(${winInfo.primaryWinnerVotes}票) ＋ 【${this.escapeHtml(winInfo.secondaryWinner ? winInfo.secondaryWinner.vendor : "未定")}】(${winInfo.secondaryWinnerVotes}票)
                    </span>
                    <span class="resource-desc">
                        第二階段全體同仁統一只針對上述兩家最高票當選店家進行點餐與 60 元差額核算。
                    </span>
                </div>
                <div class="resource-actions-row">
                    <button type="button" class="secondary-btn" id="stats-sim-phase1-btn">一鍵模擬階段一（投店家）</button>
                    <button type="button" class="primary-btn" id="stats-sim-phase2-btn">一鍵模擬階段二（當選店家點餐＆差額）</button>
                </div>
            </div>

            <!-- 統計頂部四大財務與完成率指標卡 -->
            <div class="stats-four-grid">
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">票選 ${p1VotedNames.length} / 點餐 ${votedNames.length}</span>
                    <span class="lottery-stat-label">階段一店家票選 ／ 階段二當選店點餐人數 (共 ${employees.length} 人)</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">NT$ ${totalOrderCost.toLocaleString()}</span>
                    <span class="lottery-stat-label">階段二訂單總額 (主餐 $${totalMealCost} / 飲品 $${totalDrinkCost})</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">NT$ ${totalCompanySubsidy.toLocaleString()}</span>
                    <span class="lottery-stat-label">公司補助負擔總額 (飲料上限 $${drinkLimit}/人)</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">NT$ ${totalCopayAmount.toLocaleString()} (${copayRecords.length}人)</span>
                    <span class="lottery-stat-label">應向同仁收取之超額自付差額總計</span>
                </div>
            </div>

            <div class="survey-stats-grid">
                <!-- 左欄：Canvas 視覺化統計圖表與未完成名單 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、${isPhase1 ? "第一階段：各候選餐廳＆飲料店得票排行" : `第二階段：當選店家【${this.escapeHtml(winInfo.primaryWinner ? winInfo.primaryWinner.vendor : "")}＋${this.escapeHtml(winInfo.secondaryWinner ? winInfo.secondaryWinner.vendor : "")}】點餐統計`}</span>
                        <button type="button" class="secondary-btn" id="sync-voted-to-lottery-btn">
                            將已完成者同步為尾牙抽獎池 (${activeDoneNames.length}人)
                        </button>
                    </div>

                    <div class="stats-canvas-wrap">
                        <canvas id="survey-stats-canvas" class="stats-chart-canvas" width="640" height="440"></canvas>
                    </div>

                    <div>
                        <div class="lottery-panel-title">
                            <span>本階段尚未完成之同仁名單 (${unvotedNames.length} 人)</span>
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
                            匯出當選店家點餐＆差額 CSV 報表
                        </button>
                    </div>

                    <p class="section-subheading">依目前進度選擇通知模板（支援階段一開票結果通知、階段二當選店家訂購統計與超額差額收款）：</p>

                    <div class="prize-preset-chips">
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "phase1_winner" ? "active" : ""}" data-line-mode="phase1_winner">
                            1. 階段一開票公告：宣布最高票店家＆通知開始點餐
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "summary" ? "active" : ""}" data-line-mode="summary">
                            2. 階段二訂餐總表：當選店家品項統計＆差額總計
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "copay" ? "active" : ""}" data-line-mode="copay">
                            3. 階段二差額收款：超額需貼差額收款名單 (${copayRecords.length}人)
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "detailed" ? "active" : ""}" data-line-mode="detailed">
                            4. 階段二個人明細：餐點＋甜度冰塊＋個人差額核對
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "reminder" ? "active" : ""}" data-line-mode="reminder">
                            5. 尚未完成同仁催票／催點餐提醒
                        </button>
                    </div>

                    <textarea id="line-notification-textarea" class="line-preview-textarea" readonly>${this.escapeHtml(lineText)}</textarea>

                    <button type="button" class="line-copy-btn" id="copy-line-text-btn">
                        一鍵複製 LINE 通知文案（直接貼上群組）
                    </button>
                </div>
            </div>

            <!-- 區塊三：超額需自行貼差額之同仁收款清單 -->
            <div class="lottery-panel-card">
                <div class="lottery-panel-title">
                    <span>三、超過補助上限（NT$ ${drinkLimit}）需自付差額收款清單（共 ${copayRecords.length} 人，合計應收 NT$ ${totalCopayAmount}）</span>
                    <span class="theme-code-badge">SELF-PAY DIFFERENCE LIST</span>
                </div>
                <ul class="winners-history-list">
                    ${copayListHtml}
                </ul>
            </div>

            <!-- 區塊四：每位同仁於最高票當選店家之點餐明細列表 -->
            <div class="lottery-panel-card">
                <div class="lottery-panel-title">
                    <span>四、第二階段全體同仁於當選店家之點餐、甜度冰塊與差額明細總表 (${votedNames.length} 筆)</span>
                </div>
                <ul class="winners-history-list">
                    ${detailedRecordsHtml}
                </ul>
            </div>
        `;
    }

    loadExistingVoteForSelectedEmployee(campaign, winInfo) {
        if (campaign.currentPhase === "phase1") {
            const p1Existing = campaign.phase1Votes && campaign.phase1Votes[this.selectedVoterName];
            if (p1Existing) {
                this.selectedPrimaryOptionId = p1Existing.primaryVendorId;
                this.selectedSecondaryOptionId = p1Existing.secondaryVendorId;
            } else {
                if (campaign.primaryOptions.length > 0) {
                    this.selectedPrimaryOptionId = campaign.primaryOptions[0].id;
                }
                if (campaign.secondaryOptions.length > 0) {
                    this.selectedSecondaryOptionId = campaign.secondaryOptions[0].id;
                }
            }
            return;
        }

        // 第二階段：只針對最高票當選店家載入該店菜單品項
        const wInfo = winInfo || this.getWinningVendors(campaign);
        const mealItems = wInfo.primaryWinner ? wInfo.primaryWinner.menuItems : [];
        const drinkItems = wInfo.secondaryWinner ? wInfo.secondaryWinner.menuItems : [];

        const existing = campaign.votes && campaign.votes[this.selectedVoterName];
        if (existing && mealItems.some((m) => m.id === existing.primaryId)) {
            this.selectedPrimaryOptionId = existing.primaryId;
            this.selectedSecondaryOptionId = existing.secondaryId;
            this.customPrimaryItemName = existing.primaryName || "";
            this.customPrimaryPrice = Number(existing.primaryPrice) || 0;
            this.customSecondaryItemName = existing.secondaryName || "";
            this.customSecondaryPrice = Number(existing.secondaryPrice) || 0;
            this.selectedSugar = existing.sugar || "微糖 (3分)";
            this.selectedIce = existing.ice || "少冰";
            this.voterCustomNote = existing.note || "";
        } else {
            const pItem = mealItems[0];
            const sItem = drinkItems[0];
            if (pItem) {
                this.selectedPrimaryOptionId = pItem.id;
                this.customPrimaryItemName = pItem.name;
                this.customPrimaryPrice = Number(pItem.price) || 0;
            }
            if (sItem) {
                this.selectedSecondaryOptionId = sItem.id;
                this.customSecondaryItemName = sItem.name;
                this.customSecondaryPrice = Number(sItem.price) || 0;
            }
            this.voterCustomNote = "";
        }
    }

    bindSurveyCommonEvents(subView, campaign) {
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

        // 切換第一階段（店家票選）與第二階段（最高票當選店家點餐）
        this.focusSection.querySelectorAll("[data-switch-phase]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const targetPhase = btn.getAttribute("data-switch-phase");
                if (targetPhase === "phase1" || targetPhase === "phase2") {
                    campaign.currentPhase = targetPhase;
                    this.selectedPrimaryOptionId = "";
                    this.selectedSecondaryOptionId = "";
                    const winInfo = this.getWinningVendors(campaign);
                    this.loadExistingVoteForSelectedEmployee(campaign, winInfo);
                    if (targetPhase === "phase1" && this.lineTemplateMode === "summary") {
                        this.lineTemplateMode = "phase1_winner";
                    } else if (targetPhase === "phase2" && this.lineTemplateMode === "phase1_winner") {
                        this.lineTemplateMode = "summary";
                    }
                    this.saveSurveyState();
                    this.renderSurveyPage(subView);
                }
            });
        });

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
                const title = window.prompt("請輸入新票選主題名稱（例如：週五部門午餐與手搖飲票選、春季旅遊地點票選）：");
                if (!title || !title.trim()) return;
                const cat1 = window.prompt("請輸入第一分類標題：", "午餐餐廳") || "午餐餐廳";
                const cat2 = window.prompt("請輸入第二分類標題：", "手搖飲料店") || "手搖飲料店";
                const drinkLimitStr = window.prompt("請設定第二分類（如飲料）補助上限金額（輸入 60 代表超過 60 元需自付差額；輸入 0 代表不限額）：", "60");
                const drinkLimit = Math.max(0, Number(drinkLimitStr) || 0);

                const newId = `campaign-${Date.now()}`;
                this.surveyState.campaigns.push({
                    id: newId,
                    title: title.trim(),
                    description: "第一階段先票選最高人氣店家，第二階段統一針對最高票當選店家進行點餐。",
                    primaryCategoryLabel: cat1.trim(),
                    secondaryCategoryLabel: cat2.trim(),
                    currentPhase: "phase1",
                    lockedPrimaryVendorId: "",
                    lockedSecondaryVendorId: "",
                    primarySubsidyLimit: 0,
                    drinkSubsidyLimit: drinkLimit,
                    enableDrinkSelectors: drinkLimit > 0,
                    officialUrl: "https://www.google.com",
                    attachmentTitle: `${title.trim()} — 菜單與價目表說明附檔.doc`,
                    attachmentContent: `【${title.trim()}】詳細說明資料，可於設定頁面編輯內容或上傳最新 Menu 圖片附檔。`,
                    attachmentDataUrl: "",
                    primaryOptions: [
                        {
                            id: `p-${Date.now()}-1`,
                            vendor: "候選餐廳 A",
                            name: "招牌便當專門店 A",
                            price: 110,
                            tag: "候選 A",
                            desc: "預設候選餐廳 A 說明",
                            refUrl: "",
                            attachNote: "餐廳 A 菜單價目表說明",
                            attachDataUrl: "",
                            menuItems: [
                                { id: `pm-${Date.now()}-1`, name: "招牌排骨飯", price: 110, tag: "人氣", desc: "招牌排骨便當" },
                                { id: `pm-${Date.now()}-2`, name: "香酥雞腿飯", price: 120, tag: "推薦", desc: "現炸雞腿便當" }
                            ]
                        },
                        {
                            id: `p-${Date.now()}-2`,
                            vendor: "候選餐廳 B",
                            name: "人氣輕食專門店 B",
                            price: 115,
                            tag: "候選 B",
                            desc: "預設候選餐廳 B 說明",
                            refUrl: "",
                            attachNote: "餐廳 B 菜單價目表說明",
                            attachDataUrl: "",
                            menuItems: [
                                { id: `pm-${Date.now()}-3`, name: "經典嫩雞餐盒", price: 115, tag: "人氣", desc: "健康少油餐盒" }
                            ]
                        }
                    ],
                    secondaryOptions: [
                        {
                            id: `s-${Date.now()}-1`,
                            vendor: "候選飲料店 1",
                            name: "台灣原葉茶飲專門店",
                            price: 50,
                            tag: "候選 1",
                            desc: "預設候選飲料店 1",
                            refUrl: "",
                            attachNote: "飲料店 1 最新價目表說明",
                            attachDataUrl: "",
                            menuItems: [
                                { id: `sm-${Date.now()}-1`, name: "四季春珍波椰 (L)", price: 50, tag: "60元內免貼", desc: "清爽青茶加料" },
                                { id: `sm-${Date.now()}-2`, name: "波霸紅茶拿鐵 (L)", price: 70, tag: "超額需補差額", desc: "濃郁鮮奶茶加波霸" }
                            ]
                        }
                    ],
                    phase1Votes: {},
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

    bindSurveyVoteEvents(campaign, winInfo) {
        const voterSelect = document.getElementById("voter-employee-select");
        const noteInput = document.getElementById("voter-custom-note-input");
        const customPrimaryItemInput = document.getElementById("custom-primary-item-input");
        const customPrimaryPriceInput = document.getElementById("custom-primary-price-input");
        const customSecondaryItemInput = document.getElementById("custom-secondary-item-input");
        const customSecondaryPriceInput = document.getElementById("custom-secondary-price-input");

        // 點擊查看活動整體菜單附檔
        const viewCampaignAttachBtn = document.getElementById("view-campaign-attachment-btn");
        if (viewCampaignAttachBtn) {
            viewCampaignAttachBtn.addEventListener("click", () => {
                this.openAttachmentPreviewModal(
                    campaign.attachmentTitle || "活動介紹與價目表總覽附檔",
                    campaign.attachmentContent || "尚無文字說明",
                    campaign.attachmentDataUrl || ""
                );
            });
        }

        // 點擊查看單一餐廳菜單介紹／飲料店最新價目表 Menu 附檔
        this.focusSection.querySelectorAll("[data-view-opt-attach]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const optId = btn.getAttribute("data-view-opt-attach");
                const group = btn.getAttribute("data-view-opt-group");
                const list = group === "primary" ? campaign.primaryOptions : campaign.secondaryOptions;
                const opt = list.find((item) => item.id === optId);
                if (opt) {
                    const vendorPrefix = opt.vendor ? `【${opt.vendor}】` : "";
                    this.openAttachmentPreviewModal(
                        `${vendorPrefix}${opt.name} — 餐廳菜單介紹與最新價目表 Menu`,
                        `${opt.desc}\n\n${opt.attachNote || "無額外價目表附註"}`,
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

        if (voterSelect) {
            voterSelect.addEventListener("change", () => {
                this.selectedVoterName = voterSelect.value;
                this.loadExistingVoteForSelectedEmployee(campaign, winInfo);
                this.renderSurveyPage("vote");
            });
        }

        // 若目前在「第一階段：票選哪一家餐廳與飲料店」
        if (campaign.currentPhase === "phase1") {
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

            const lockAndGoPhase2Btn = document.getElementById("lock-winner-and-go-phase2-btn");
            if (lockAndGoPhase2Btn) {
                lockAndGoPhase2Btn.addEventListener("click", () => {
                    campaign.currentPhase = "phase2";
                    this.selectedPrimaryOptionId = "";
                    this.selectedSecondaryOptionId = "";
                    const latestWin = this.getWinningVendors(campaign);
                    this.loadExistingVoteForSelectedEmployee(campaign, latestWin);
                    this.saveSurveyState();
                    this.renderSurveyPage("vote");
                });
            }

            const submitP1Btn = document.getElementById("submit-phase1-vote-btn");
            if (submitP1Btn) {
                submitP1Btn.addEventListener("click", () => {
                    if (!this.selectedVoterName) {
                        window.alert("請先選擇您的員工姓名。");
                        return;
                    }
                    const pVendorObj = campaign.primaryOptions.find((o) => o.id === this.selectedPrimaryOptionId);
                    const sVendorObj = campaign.secondaryOptions.find((o) => o.id === this.selectedSecondaryOptionId);
                    if (!pVendorObj || !sVendorObj) {
                        window.alert("請選擇一家想吃的午餐餐廳與一家想喝的手搖飲料店。");
                        return;
                    }
                    const now = new Date();
                    const timeStr = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

                    if (!campaign.phase1Votes) {
                        campaign.phase1Votes = {};
                    }
                    campaign.phase1Votes[this.selectedVoterName] = {
                        primaryVendorId: pVendorObj.id,
                        primaryVendorName: pVendorObj.vendor || pVendorObj.name,
                        secondaryVendorId: sVendorObj.id,
                        secondaryVendorName: sVendorObj.vendor || sVendorObj.name,
                        time: timeStr
                    };
                    this.saveSurveyState();
                    window.alert(
                        `已記錄「${this.selectedVoterName}」的第一階段店家票選：\n` +
                        `・候選午餐餐廳：【${pVendorObj.vendor || pVendorObj.name}】\n` +
                        `・候選手搖飲店：【${sVendorObj.vendor || sVendorObj.name}】\n\n` +
                        `待第一階段截止選出最高票店家後，即可進入「第二階段」只針對最高票當選店家點餐！`
                    );
                    this.renderSurveyPage("vote");
                });
            }
            return;
        }

        // =========================================================================
        // 第二階段事件綁定（只針對最高票當選餐廳＆當選飲料店點餐、選甜度冰塊與計算差額）
        // =========================================================================
        const winningRestaurant = winInfo.primaryWinner;
        const winningDrinkShop = winInfo.secondaryWinner;
        const mealMenuItems = winningRestaurant ? winningRestaurant.menuItems : [];
        const drinkMenuItems = winningDrinkShop ? winningDrinkShop.menuItems : [];

        const lockPrimarySelect = document.getElementById("lock-primary-vendor-select");
        if (lockPrimarySelect) {
            lockPrimarySelect.addEventListener("change", () => {
                campaign.lockedPrimaryVendorId = lockPrimarySelect.value;
                this.selectedPrimaryOptionId = "";
                this.saveSurveyState();
                this.renderSurveyPage("vote");
            });
        }

        const lockSecondarySelect = document.getElementById("lock-secondary-vendor-select");
        if (lockSecondarySelect) {
            lockSecondarySelect.addEventListener("change", () => {
                campaign.lockedSecondaryVendorId = lockSecondarySelect.value;
                this.selectedSecondaryOptionId = "";
                this.saveSurveyState();
                this.renderSurveyPage("vote");
            });
        }

        const updateLiveCopayDisplay = () => {
            const pLimit = Number(campaign.primarySubsidyLimit) || 0;
            const dLimit = Number(campaign.drinkSubsidyLimit) || 0;
            const mPrice = Math.max(0, Number(this.customPrimaryPrice) || 0);
            const dPrice = Math.max(0, Number(this.customSecondaryPrice) || 0);
            const mCopay = pLimit > 0 ? Math.max(0, mPrice - pLimit) : 0;
            const dCopay = dLimit > 0 ? Math.max(0, dPrice - dLimit) : 0;
            const totalCopay = mCopay + dCopay;

            const mealPill = document.getElementById("meal-copay-live-pill");
            if (mealPill) {
                mealPill.textContent = mCopay > 0 ? `超額需補差額：NT$ ${mCopay}` : `公司全額補助（自付差額 NT$ 0）`;
                mealPill.classList.toggle("is-owing", mCopay > 0);
            }

            const drinkPill = document.getElementById("drink-copay-live-pill");
            if (drinkPill) {
                drinkPill.textContent = dCopay > 0
                    ? `超過上限 $${dLimit}，需貼差額：NT$ ${dCopay}`
                    : `未超過上限 $${dLimit}，免貼差額 (NT$ 0)`;
                drinkPill.classList.toggle("is-owing", dCopay > 0);
            }

            const banner = document.getElementById("total-subsidy-summary-banner");
            const finalPill = document.getElementById("total-copay-final-pill");
            const summaryText = document.getElementById("total-subsidy-summary-text");

            if (banner) {
                banner.classList.toggle("has-copay", totalCopay > 0);
            }
            if (finalPill) {
                finalPill.textContent = totalCopay > 0
                    ? `本次點餐您需自行貼補差額：NT$ ${totalCopay}`
                    : `本次點餐全額補助，免貼差額 (NT$ 0)`;
                finalPill.classList.toggle("is-owing", totalCopay > 0);
            }
            if (summaryText) {
                const sugarIcePart = campaign.enableDrinkSelectors !== false
                    ? `｜${this.escapeHtml(this.selectedSugar)}・${this.escapeHtml(this.selectedIce)}`
                    : "";
                summaryText.innerHTML = `
                    <span>點餐確認：【${this.escapeHtml(winningRestaurant ? winningRestaurant.vendor : "")}】${this.escapeHtml(this.customPrimaryItemName)} ($${mPrice})</span>
                    <span>＋</span>
                    <span>【${this.escapeHtml(winningDrinkShop ? winningDrinkShop.vendor : "")}】${this.escapeHtml(this.customSecondaryItemName)} ($${dPrice}${sugarIcePart})</span>
                `;
            }
        };

        if (noteInput) {
            noteInput.addEventListener("input", () => {
                this.voterCustomNote = noteInput.value;
            });
        }

        if (customPrimaryItemInput) {
            customPrimaryItemInput.addEventListener("input", () => {
                this.customPrimaryItemName = customPrimaryItemInput.value;
                updateLiveCopayDisplay();
            });
        }

        if (customPrimaryPriceInput) {
            customPrimaryPriceInput.addEventListener("input", () => {
                this.customPrimaryPrice = Math.max(0, Number(customPrimaryPriceInput.value) || 0);
                updateLiveCopayDisplay();
            });
        }

        if (customSecondaryItemInput) {
            customSecondaryItemInput.addEventListener("input", () => {
                this.customSecondaryItemName = customSecondaryItemInput.value;
                updateLiveCopayDisplay();
            });
        }

        if (customSecondaryPriceInput) {
            customSecondaryPriceInput.addEventListener("input", () => {
                this.customSecondaryPrice = Math.max(0, Number(customSecondaryPriceInput.value) || 0);
                updateLiveCopayDisplay();
            });
        }

        // 點選甜度按鈕
        this.focusSection.querySelectorAll("[data-select-sugar]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.selectedSugar = btn.getAttribute("data-select-sugar") || "微糖 (3分)";
                this.renderSurveyPage("vote");
            });
        });

        // 點選冰塊按鈕
        this.focusSection.querySelectorAll("[data-select-ice]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.selectedIce = btn.getAttribute("data-select-ice") || "少冰";
                this.renderSurveyPage("vote");
            });
        });

        // 點選當選餐廳或當選飲料店的店內品項卡片
        this.focusSection.querySelectorAll("[data-select-p2-group]").forEach((card) => {
            card.addEventListener("click", () => {
                const group = card.getAttribute("data-select-p2-group");
                const itemId = card.getAttribute("data-item-id");
                if (group === "primary") {
                    this.selectedPrimaryOptionId = itemId;
                    const mItem = mealMenuItems.find((m) => m.id === itemId);
                    if (mItem) {
                        this.customPrimaryItemName = mItem.name;
                        this.customPrimaryPrice = Number(mItem.price) || 0;
                    }
                } else {
                    this.selectedSecondaryOptionId = itemId;
                    const dItem = drinkMenuItems.find((d) => d.id === itemId);
                    if (dItem) {
                        this.customSecondaryItemName = dItem.name;
                        this.customSecondaryPrice = Number(dItem.price) || 0;
                    }
                }
                this.renderSurveyPage("vote");
            });
        });

        // 送出第二階段點餐結果
        const submitBtn = document.getElementById("submit-survey-vote-btn");
        if (submitBtn) {
            submitBtn.addEventListener("click", () => {
                if (!this.selectedVoterName) {
                    window.alert("請先選擇您的員工姓名。");
                    return;
                }
                if (!winningRestaurant || !winningDrinkShop) {
                    window.alert("尚未選出當選餐廳與飲料店。");
                    return;
                }

                const currentMealItem = mealMenuItems.find((m) => m.id === this.selectedPrimaryOptionId) || mealMenuItems[0];
                const currentDrinkItem = drinkMenuItems.find((d) => d.id === this.selectedSecondaryOptionId) || drinkMenuItems[0];

                const finalPrimaryName = (this.customPrimaryItemName || (currentMealItem ? currentMealItem.name : "")).trim();
                const finalPrimaryPrice = Math.max(0, Number(this.customPrimaryPrice) || (currentMealItem ? Number(currentMealItem.price) : 0));
                const finalSecondaryName = (this.customSecondaryItemName || (currentDrinkItem ? currentDrinkItem.name : "")).trim();
                const finalSecondaryPrice = Math.max(0, Number(this.customSecondaryPrice) || (currentDrinkItem ? Number(currentDrinkItem.price) : 0));

                const pLimit = Number(campaign.primarySubsidyLimit) || 0;
                const dLimit = Number(campaign.drinkSubsidyLimit) || 0;
                const mealCopay = pLimit > 0 ? Math.max(0, finalPrimaryPrice - pLimit) : 0;
                const drinkCopay = dLimit > 0 ? Math.max(0, finalSecondaryPrice - dLimit) : 0;
                const totalCopay = mealCopay + drinkCopay;

                const now = new Date();
                const timeStr = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

                if (!campaign.votes) {
                    campaign.votes = {};
                }
                campaign.votes[this.selectedVoterName] = {
                    primaryId: currentMealItem ? currentMealItem.id : "custom-meal",
                    primaryVendor: winningRestaurant.vendor || winningRestaurant.name,
                    primaryName: finalPrimaryName,
                    primaryPrice: finalPrimaryPrice,
                    primaryCopay: mealCopay,
                    secondaryId: currentDrinkItem ? currentDrinkItem.id : "custom-drink",
                    secondaryVendor: winningDrinkShop.vendor || winningDrinkShop.name,
                    secondaryName: finalSecondaryName,
                    secondaryPrice: finalSecondaryPrice,
                    secondaryCopay: drinkCopay,
                    totalCopay,
                    sugar: campaign.enableDrinkSelectors !== false ? this.selectedSugar : "",
                    ice: campaign.enableDrinkSelectors !== false ? this.selectedIce : "",
                    note: (this.voterCustomNote || "").trim(),
                    time: timeStr
                };

                this.saveSurveyState();
                const copayMsg = totalCopay > 0
                    ? `\n・超額需自付差額：NT$ ${totalCopay}（飲料補助上限 NT$ ${dLimit}）`
                    : `\n・補助範圍內，免貼差額 (NT$ 0)`;
                const drinkSpecMsg = campaign.enableDrinkSelectors !== false
                    ? ` (${this.selectedSugar}／${this.selectedIce})`
                    : "";
                window.alert(
                    `已成功記錄「${this.selectedVoterName}」於最高票當選店家的點餐：\n` +
                    `・當選餐廳【${winningRestaurant.vendor}】：${finalPrimaryName} ($${finalPrimaryPrice})\n` +
                    `・當選飲料【${winningDrinkShop.vendor}】：${finalSecondaryName}${drinkSpecMsg} ($${finalSecondaryPrice})` +
                    copayMsg
                );
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
                        <span>菜單與價目表檢視器：${this.escapeHtml(title)}</span>
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

    /**
     * 輔助模擬函式：產生第一階段（投店家）與第二階段（只針對最高票當選店家點餐＆計算 60 元差額）測試資料
     */
    runSimulationForPhase(campaign, targetPhase) {
        if (this.lotteryState.allParticipants.length === 0) {
            this.applyImportedParticipants(REHEARSAL_SAMPLE_NAMES, true);
        }
        const emps = this.lotteryState.allParticipants;
        const pOpts = campaign.primaryOptions;
        const sOpts = campaign.secondaryOptions;
        if (pOpts.length === 0 || sOpts.length === 0) return;

        // 先確保第一階段有各店家的投票數據（讓第一家或特定熱門店家明顯勝出）
        campaign.phase1Votes = {};
        const simP1Count = Math.max(1, Math.floor(emps.length * 0.9));
        for (let i = 0; i < simP1Count; i += 1) {
            const emp = emps[i];
            // 讓前兩家得票較高以模擬真實最高票產生
            const pIdx = i % 3 === 0 ? 0 : this.getCryptoRandomInt(pOpts.length);
            const sIdx = i % 3 === 0 ? 4 : this.getCryptoRandomInt(sOpts.length);
            const pVendor = pOpts[Math.min(pIdx, pOpts.length - 1)];
            const sVendor = sOpts[Math.min(sIdx, sOpts.length - 1)];
            campaign.phase1Votes[emp] = {
                primaryVendorId: pVendor.id,
                primaryVendorName: pVendor.vendor || pVendor.name,
                secondaryVendorId: sVendor.id,
                secondaryVendorName: sVendor.vendor || sVendor.name,
                time: "10/18 10:15"
            };
        }

        if (targetPhase === "phase1") {
            campaign.currentPhase = "phase1";
            this.lineTemplateMode = "phase1_winner";
            this.saveSurveyState();
            window.location.hash = "theme-05-survey-stats";
            return;
        }

        // 第二階段模擬：只針對第一階段票選最高票的「當選餐廳」與「當選飲料店」進行全體點餐！
        campaign.currentPhase = "phase2";
        this.lineTemplateMode = "summary";
        const winInfo = this.getWinningVendors(campaign);
        const winRestaurant = winInfo.primaryWinner;
        const winDrinkShop = winInfo.secondaryWinner;
        const mealItems = winRestaurant ? winRestaurant.menuItems : [];
        const drinkItems = winDrinkShop ? winDrinkShop.menuItems : [];

        const pLimit = Number(campaign.primarySubsidyLimit) || 0;
        const dLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const sampleNotes = ["", "飯少", "不加酸菜", "", "加辣", ""];

        campaign.votes = {};
        const simP2Count = Math.max(1, Math.floor(emps.length * 0.85));
        for (let i = 0; i < simP2Count; i += 1) {
            const emp = emps[i];
            const mPick = mealItems[this.getCryptoRandomInt(mealItems.length)];
            const dPick = drinkItems[this.getCryptoRandomInt(drinkItems.length)];
            const sugarPick = SURVEY_SUGAR_OPTIONS[this.getCryptoRandomInt(SURVEY_SUGAR_OPTIONS.length)];
            const icePick = SURVEY_ICE_OPTIONS[this.getCryptoRandomInt(SURVEY_ICE_OPTIONS.length)];
            const notePick = sampleNotes[this.getCryptoRandomInt(sampleNotes.length)];

            const mPrice = Number(mPick.price) || 0;
            const dPrice = Number(dPick.price) || 0;
            const mCopay = pLimit > 0 ? Math.max(0, mPrice - pLimit) : 0;
            const dCopay = dLimit > 0 ? Math.max(0, dPrice - dLimit) : 0;

            campaign.votes[emp] = {
                primaryId: mPick.id,
                primaryVendor: winRestaurant.vendor || winRestaurant.name,
                primaryName: mPick.name,
                primaryPrice: mPrice,
                primaryCopay: mCopay,
                secondaryId: dPick.id,
                secondaryVendor: winDrinkShop.vendor || winDrinkShop.name,
                secondaryName: dPick.name,
                secondaryPrice: dPrice,
                secondaryCopay: dCopay,
                totalCopay: mCopay + dCopay,
                sugar: campaign.enableDrinkSelectors !== false ? sugarPick : "",
                ice: campaign.enableDrinkSelectors !== false ? icePick : "",
                note: notePick,
                time: "10/18 11:20"
            };
        }

        this.saveSurveyState();
        window.location.hash = "theme-05-survey-stats";
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
                        optFileStatus.textContent = `已載入 Menu 圖檔：${file.name}`;
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
                const vendor = document.getElementById("new-opt-vendor").value.trim();
                const price = Math.max(0, Number(document.getElementById("new-opt-price").value) || 0);
                const name = document.getElementById("new-opt-name").value.trim();
                const tag = document.getElementById("new-opt-tag").value.trim() || "候選店家";
                const desc = document.getElementById("new-opt-desc").value.trim();
                const url = document.getElementById("new-opt-url").value.trim();
                const menuItemsRaw = document.getElementById("new-opt-menu-items-text").value.trim();
                const attachNote = document.getElementById("new-opt-attach-note").value.trim();

                if (!name || !desc) return;

                const parsedMenuItems = [];
                if (menuItemsRaw) {
                    menuItemsRaw.split(/\r?\n/).forEach((line, idx) => {
                        const clean = line.trim();
                        if (!clean) return;
                        const parts = clean.split(/[,，]/);
                        const itemName = (parts[0] || "").trim();
                        const itemPrice = Math.max(0, Number((parts[1] || "").trim()) || price);
                        const itemDesc = (parts[2] || "店內精選品項").trim();
                        if (itemName) {
                            parsedMenuItems.push({
                                id: `item-${Date.now()}-${idx}`,
                                name: itemName,
                                price: itemPrice,
                                tag: "店內品項",
                                desc: itemDesc
                            });
                        }
                    });
                }

                if (parsedMenuItems.length === 0) {
                    parsedMenuItems.push({
                        id: `item-${Date.now()}-0`,
                        name,
                        price,
                        tag: "招牌品項",
                        desc
                    });
                }

                const newOption = {
                    id: `${cat}-${Date.now()}`,
                    vendor,
                    name,
                    price,
                    tag,
                    desc,
                    refUrl: url,
                    attachNote: attachNote || `【${vendor}】${name} 菜單與價目表說明`,
                    attachDataUrl: pendingOptionImageDataUrl,
                    menuItems: parsedMenuItems
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
                    window.alert("每個分類請至少保留一家候選店家。");
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
                    window.alert("每個分類請至少保留一家候選店家。");
                    return;
                }
                const idx = Number(btn.getAttribute("data-del-secondary-idx"));
                campaign.secondaryOptions.splice(idx, 1);
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        });

        // 儲存活動整體菜單附檔與補助上限設定
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
                campaign.drinkSubsidyLimit = Math.max(0, Number(document.getElementById("setup-drink-subsidy-limit").value) || 0);
                campaign.primarySubsidyLimit = Math.max(0, Number(document.getElementById("setup-primary-subsidy-limit").value) || 0);
                campaign.enableDrinkSelectors = document.getElementById("setup-enable-drink-selectors").value === "true";
                campaign.officialUrl = document.getElementById("setup-campaign-url").value.trim();
                campaign.attachmentTitle = document.getElementById("setup-attach-title").value.trim() || "活動附檔";
                campaign.attachmentContent = document.getElementById("setup-attach-content").value;
                this.saveSurveyState();
                window.alert(`已儲存設定！飲料補助上限目前設為：NT$ ${campaign.drinkSubsidyLimit}。`);
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

        const simP1Btn = document.getElementById("simulate-phase1-btn");
        if (simP1Btn) {
            simP1Btn.addEventListener("click", () => {
                this.runSimulationForPhase(campaign, "phase1");
            });
        }

        const simulateBtn = document.getElementById("simulate-votes-btn") || document.getElementById("simulate- votes-btn");
        if (simulateBtn) {
            simulateBtn.addEventListener("click", () => {
                this.runSimulationForPhase(campaign, "phase2");
            });
        }

        const clearVotesBtn = document.getElementById("clear-campaign-votes-btn");
        if (clearVotesBtn) {
            clearVotesBtn.addEventListener("click", () => {
                if (!window.confirm("確定要清空本活動第一階段店家票選與第二階段點餐紀錄嗎？")) return;
                campaign.phase1Votes = {};
                campaign.votes = {};
                this.saveSurveyState();
                this.renderSurveyPage("setup");
            });
        }
    }

    bindSurveyStatsEvents(campaign, employees, winInfo) {
        this.focusSection.querySelectorAll("[data-line-mode]").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.lineTemplateMode = btn.getAttribute("data-line-mode") || "summary";
                this.renderSurveyPage("stats");
            });
        });

        const simP1StatsBtn = document.getElementById("stats-sim-phase1-btn");
        if (simP1StatsBtn) {
            simP1StatsBtn.addEventListener("click", () => {
                this.runSimulationForPhase(campaign, "phase1");
                this.renderSurveyPage("stats");
            });
        }

        const simP2StatsBtn = document.getElementById("stats-sim-phase2-btn");
        if (simP2StatsBtn) {
            simP2StatsBtn.addEventListener("click", () => {
                this.runSimulationForPhase(campaign, "phase2");
                this.renderSurveyPage("stats");
            });
        }

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
                const doneNames = campaign.currentPhase === "phase1"
                    ? Object.keys(campaign.phase1Votes || {})
                    : Object.keys(campaign.votes || {});
                if (doneNames.length === 0) {
                    window.alert("目前尚無已完成之員工紀錄。");
                    return;
                }
                this.lotteryState.remainingPool = [...doneNames];
                this.saveLotteryState();
                window.alert(`已將 ${doneNames.length} 位完成同仁同步至「尾牙抽獎待抽池」！`);
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
     * 使用 HTML5 Canvas 繪製：
     * - 第一階段：各候選餐廳與飲料店得票排行圖表
     * - 第二階段：最高票當選餐廳與當選飲料店之店內各品項點餐數量圖表
     */
    drawSurveyStatsCharts(campaign, winInfo) {
        const canvas = document.getElementById("survey-stats-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isPhase1 = campaign.currentPhase === "phase1";
        let primaryCounts = [];
        let secondaryCounts = [];
        let totalBase = 0;
        let section1Title = "";
        let section2Title = "";

        if (isPhase1) {
            totalBase = winInfo.totalPhase1Votes;
            section1Title = `第一階段：候選${campaign.primaryCategoryLabel}得票數排行`;
            section2Title = `第一階段：候選${campaign.secondaryCategoryLabel}得票數排行`;

            primaryCounts = campaign.primaryOptions.map((opt) => ({
                name: `${opt.vendor || opt.name}${winInfo.primaryWinner && winInfo.primaryWinner.id === opt.id ? " [最高票]" : ""}`,
                count: winInfo.primaryCountsMap[opt.id] || 0
            }));
            secondaryCounts = campaign.secondaryOptions.map((opt) => ({
                name: `${opt.vendor || opt.name}${winInfo.secondaryWinner && winInfo.secondaryWinner.id === opt.id ? " [最高票]" : ""}`,
                count: winInfo.secondaryCountsMap[opt.id] || 0
            }));
        } else {
            const votesList = Object.values(campaign.votes || {});
            totalBase = votesList.length;
            const winRest = winInfo.primaryWinner;
            const winDrink = winInfo.secondaryWinner;
            section1Title = `第二階段：當選餐廳【${winRest ? winRest.vendor : ""}】各餐點份數統計`;
            section2Title = `第二階段：當選飲料店【${winDrink ? winDrink.vendor : ""}】各飲品杯數統計`;

            const mealItems = winRest ? winRest.menuItems : [];
            const drinkItems = winDrink ? winDrink.menuItems : [];

            primaryCounts = mealItems.map((m) => ({
                name: `${m.name} ($${m.price})`,
                count: votesList.filter((v) => v.primaryId === m.id || v.primaryName === m.name).length
            }));

            secondaryCounts = drinkItems.map((d) => ({
                name: `${d.name} ($${d.price})`,
                count: votesList.filter((v) => v.secondaryId === d.id || v.secondaryName === d.name).length
            }));
        }

        const totalRows = primaryCounts.length + secondaryCounts.length;
        const canvasHeight = Math.max(340, 115 + totalRows * 40);
        canvas.height = canvasHeight;

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const textColor = isDark ? "#f1f5f9" : "#0f172a";
        const mutedColor = isDark ? "#94a3b8" : "#475569";
        const trackBg = isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(14, 165, 233, 0.1)";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let currentY = 28;

        const drawSection = (sectionTitle, items, barColor) => {
            ctx.fillStyle = textColor;
            ctx.font = "800 15px 'Noto Sans TC', sans-serif";
            ctx.fillText(sectionTitle, 16, currentY);
            currentY += 22;

            items.forEach((item) => {
                const pct = totalBase > 0 ? Math.round((item.count / totalBase) * 100) : 0;
                const labelText = item.name.length > 18 ? `${item.name.slice(0, 18)}...` : item.name;

                ctx.fillStyle = mutedColor;
                ctx.font = "600 13px 'Noto Sans TC', sans-serif";
                ctx.fillText(labelText, 16, currentY + 15);

                const barX = 265;
                const maxBarW = 270;
                const barH = 20;

                ctx.fillStyle = trackBg;
                ctx.beginPath();
                ctx.roundRect(barX, currentY, maxBarW, barH, 6);
                ctx.fill();

                const fillW = totalBase > 0 ? Math.max(6, (item.count / totalBase) * maxBarW) : 0;
                if (fillW > 0 && item.count > 0) {
                    ctx.fillStyle = barColor;
                    ctx.beginPath();
                    ctx.roundRect(barX, currentY, fillW, barH, 6);
                    ctx.fill();
                }

                ctx.fillStyle = textColor;
                ctx.font = "700 13px 'JetBrains Mono', monospace";
                ctx.fillText(`${item.count} (${pct}%)`, barX + maxBarW + 12, currentY + 15);

                currentY += 35;
            });

            currentY += 16;
        };

        drawSection(section1Title, primaryCounts, "#0ea5e9");
        drawSection(section2Title, secondaryCounts, "#14b8a6");
    }

    /**
     * 產生可一鍵貼上 LINE 群組的通知文案（支援第一階段最高票店家開票公告、第二階段當選店家訂購統計、超額補差額收款明細與催票通知）
     */
    generateLineGroupNotificationText(campaign, employees, mode, winInfo) {
        const wInfo = winInfo || this.getWinningVendors(campaign);
        const winRest = wInfo.primaryWinner;
        const winDrink = wInfo.secondaryWinner;

        const p1Map = campaign.phase1Votes || {};
        const p1Names = Object.keys(p1Map);
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const votesList = Object.values(votesMap);

        const drinkLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const primaryLimit = Number(campaign.primarySubsidyLimit) || 0;
        const pageUrl = `${window.location.origin}${window.location.pathname}#theme-05-survey-vote`;

        // 格式 1：第一階段開票結果公告（宣布最高票當選餐廳＆飲料店，通知大家進入第二階段針對該店點餐）
        if (mode === "phase1_winner") {
            const p1RankLines = campaign.primaryOptions.map((opt) => {
                const cnt = wInfo.primaryCountsMap[opt.id] || 0;
                const crown = winRest && winRest.id === opt.id ? " [最高票當選！]" : "";
                return `・${opt.vendor || opt.name}：${cnt} 票${crown}`;
            });
            const s1RankLines = campaign.secondaryOptions.map((opt) => {
                const cnt = wInfo.secondaryCountsMap[opt.id] || 0;
                const crown = winDrink && winDrink.id === opt.id ? " [最高票當選！]" : "";
                return `・${opt.vendor || opt.name}：${cnt} 票${crown}`;
            });

            return [
                `【第一階段開票公告】${campaign.title}`,
                `----------------------------------------`,
                `各位同仁好，第一階段「餐廳與飲料店人氣票選」已完成統計（共 ${p1Names.length} 人投票）！`,
                ``,
                `★ 最高票當選午餐餐廳：【${winRest ? winRest.vendor : ""}】（${wInfo.primaryWinnerVotes} 票）`,
                `★ 最高票當選手搖飲店：【${winDrink ? winDrink.vendor : ""}】（${wInfo.secondaryWinnerVotes} 票）`,
                ``,
                `【各候選餐廳得票數】`,
                ...p1RankLines,
                ``,
                `【各候選飲料店得票數】`,
                ...s1RankLines,
                ``,
                `========================================`,
                `現在正式進入【第二階段：針對最高票當選店家點餐】！`,
                `請全體同仁點選下方網址，統一從【${winRest ? winRest.vendor : ""}】與【${winDrink ? winDrink.vendor : ""}】的菜單中點選您的餐點、甜度與冰塊（飲料補助上限 ${drinkLimit} 元，超過需自付差額）：`,
                pageUrl
            ].join("\n");
        }

        let totalMealCost = 0;
        let totalDrinkCost = 0;
        let totalCopayAmount = 0;
        const copayLines = [];

        votedNames.forEach((name) => {
            const v = votesMap[name];
            const mPrice = Number(v.primaryPrice) || 0;
            const dPrice = Number(v.secondaryPrice) || 0;
            const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
            const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
            const empCopay = mCopay + dCopay;

            totalMealCost += mPrice;
            totalDrinkCost += dPrice;
            totalCopayAmount += empCopay;

            if (empCopay > 0) {
                const specTag = (v.sugar || v.ice) ? ` (${v.sugar || ""}/${v.ice || ""})` : "";
                copayLines.push(`・${name}：[${v.secondaryVendor || (winDrink ? winDrink.vendor : "")}] ${v.secondaryName}${specTag}（單價 $${dPrice}，應補差額 +$${empCopay} 元）`);
            }
        });

        const totalOrderCost = totalMealCost + totalDrinkCost;
        const totalCompanySubsidy = Math.max(0, totalOrderCost - totalCopayAmount);

        // 彙整當選餐廳與當選飲料店各品項數量
        const mealItemMap = {};
        const drinkItemMap = {};
        votesList.forEach((v) => {
            const mKey = `${v.primaryName} ($${Number(v.primaryPrice) || 0})`;
            mealItemMap[mKey] = (mealItemMap[mKey] || 0) + 1;

            const specStr = (v.sugar || v.ice) ? ` [${v.sugar || ""}/${v.ice || ""}]` : "";
            const dKey = `${v.secondaryName}${specStr} ($${Number(v.secondaryPrice) || 0})`;
            drinkItemMap[dKey] = (drinkItemMap[dKey] || 0) + 1;
        });

        const mealSummaryLines = Object.keys(mealItemMap).length > 0
            ? Object.entries(mealItemMap).map(([k, cnt]) => `・${k}：${cnt} 份`)
            : ["・（尚無點餐紀錄）"];

        const drinkSummaryLines = Object.keys(drinkItemMap).length > 0
            ? Object.entries(drinkItemMap).map(([k, cnt]) => `・${k}：${cnt} 杯`)
            : ["・（尚無點飲品紀錄）"];

        if (mode === "reminder") {
            const isP1 = campaign.currentPhase === "phase1";
            const doneMap = isP1 ? p1Map : votesMap;
            const unvotedList = employees.filter((emp) => !doneMap[emp]);
            const stageLabel = isP1
                ? "第一階段：票選想吃的餐廳與飲料店"
                : `第二階段：於當選店家【${winRest ? winRest.vendor : ""}】＆【${winDrink ? winDrink.vendor : ""}】點餐`;

            return [
                `【群組提醒】${campaign.title}`,
                `----------------------------------------`,
                `目前進度：正在進行「${stageLabel}」`,
                `應填人數：${employees.length} 人 ｜ 尚有 ${unvotedList.length} 人未完成`,
                ``,
                `【尚未完成同仁名單】`,
                unvotedList.length > 0 ? unvotedList.map((n) => `・${n}`).join("\n") : "・全員皆已完成！",
                ``,
                `請尚未完成的同仁點選以下線上連結完成登記：`,
                pageUrl
            ].join("\n");
        }

        if (mode === "copay") {
            return [
                `【差額收款通知】當選飲料店【${winDrink ? winDrink.vendor : ""}】超額自付差額明細`,
                `----------------------------------------`,
                `本次飲料公司補助上限為 NT$ ${drinkLimit}，點選超過 ${drinkLimit} 元之同仁需自行貼補差額。`,
                `應收差額人數：共 ${copayLines.length} 人 ｜ 合計應收差額：NT$ ${totalCopayAmount} 元`,
                ``,
                `【需補差額同仁收款明細】`,
                ...(copayLines.length > 0 ? copayLines : ["・本次無人超額，全員免補差額！"]),
                ``,
                `請以上同仁協助準備零錢交予主辦／總務人員，謝謝配合！`
            ].join("\n");
        }

        if (mode === "detailed") {
            const detailLines = votedNames.map((name, idx) => {
                const v = votesMap[name];
                const mPrice = Number(v.primaryPrice) || 0;
                const dPrice = Number(v.secondaryPrice) || 0;
                const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
                const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
                const empCopay = mCopay + dCopay;
                const specPart = (v.sugar || v.ice) ? ` (${v.sugar || ""}/${v.ice || ""})` : "";
                const copayPart = empCopay > 0 ? ` ｜ 需補差額 +$${empCopay}` : " ｜ 免補差額";
                const notePart = v.note ? `（備註：${v.note}）` : "";
                return `${String(idx + 1).padStart(2, "0")}. ${name}：${v.primaryName} ($${mPrice}) ＋ ${v.secondaryName}${specPart} ($${dPrice})${copayPart}${notePart}`;
            });

            return [
                `【群組公告】當選店家【${winRest ? winRest.vendor : ""}＋${winDrink ? winDrink.vendor : ""}】個人點餐與差額核對表`,
                `----------------------------------------`,
                `應點人數：${employees.length} 人 ｜ 已完成點餐：${votedNames.length} 人`,
                `訂單總額：NT$ ${totalOrderCost}（公司補助 NT$ ${totalCompanySubsidy} ／ 同仁自付差額合計 NT$ ${totalCopayAmount}）`,
                ``,
                `【各別同仁點餐、甜度冰塊與補差額明細】`,
                ...(detailLines.length > 0 ? detailLines : ["（尚無第二階段點餐紀錄）"]),
                ``,
                `如需修改點餐或查看最新價目表，請開啟線上頁面：`,
                pageUrl
            ].join("\n");
        }

        // 預設 summary 模式（第二階段：當選店家訂購數量彙整＋差額收款總表）
        return [
            `【訂餐統計總表】最高票當選店家：【${winRest ? winRest.vendor : ""}】＆【${winDrink ? winDrink.vendor : ""}】`,
            `----------------------------------------`,
            `點餐進度：已完成 ${votedNames.length} / ${employees.length} 人`,
            `費用總計：總金額 NT$ ${totalOrderCost} ＝ 公司補助 NT$ ${totalCompanySubsidy} ＋ 同仁自付差額 NT$ ${totalCopayAmount}`,
            ``,
            `【當選餐廳：${winRest ? winRest.vendor : ""} 訂購品項統計】`,
            ...mealSummaryLines,
            ``,
            `【當選飲料店：${winDrink ? winDrink.vendor : ""} 訂購品項與甜度冰塊統計】`,
            ...drinkSummaryLines,
            ``,
            `【超過補助上限 ($${drinkLimit}) 需補差額名單（共 ${copayLines.length} 人，合計 +$${totalCopayAmount}）】`,
            ...(copayLines.length > 0 ? copayLines : ["・無人超額"]),
            ``,
            `線上點餐與明細核對網址：`,
            pageUrl
        ].join("\n");
    }

    exportSurveyVotesToCsv(campaign, employees) {
        const p1Map = campaign.phase1Votes || {};
        const votesMap = campaign.votes || {};
        const drinkLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const primaryLimit = Number(campaign.primarySubsidyLimit) || 0;

        const rows = [[
            "員工姓名",
            "階段一票選餐廳",
            "階段一票選飲料店",
            "階段二點餐狀態",
            "當選餐廳名稱",
            "點選主餐品項",
            "主餐單價",
            "當選飲料店名稱",
            "點選飲品品項",
            "甜度",
            "冰塊/溫度",
            "飲品單價",
            `飲料補助上限(${drinkLimit}元)`,
            "需自付差額(元)",
            "個人備註",
            "點餐時間"
        ]];

        employees.forEach((emp) => {
            const p1 = p1Map[emp];
            const v = votesMap[emp];
            if (v) {
                const mPrice = Number(v.primaryPrice) || 0;
                const dPrice = Number(v.secondaryPrice) || 0;
                const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
                const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
                rows.push([
                    emp,
                    p1 ? p1.primaryVendorName : "",
                    p1 ? p1.secondaryVendorName : "",
                    "已完成點餐",
                    v.primaryVendor || "",
                    v.primaryName || "",
                    mPrice,
                    v.secondaryVendor || "",
                    v.secondaryName || "",
                    v.sugar || "",
                    v.ice || "",
                    dPrice,
                    drinkLimit,
                    mCopay + dCopay,
                    v.note || "",
                    v.time || ""
                ]);
            } else {
                rows.push([
                    emp,
                    p1 ? p1.primaryVendorName : "未投",
                    p1 ? p1.secondaryVendorName : "未投",
                    "尚未點餐",
                    "", "", "", "", "", "", "", "", drinkLimit, "", "", ""
                ]);
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
        link.setAttribute("download", `${campaign.title}_兩階段票選與點餐差額報表.csv`);
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
