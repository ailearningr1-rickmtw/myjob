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
 * 預設內建之多主題票選活動範本
 * 支援不同家平民午餐餐廳票選、不同家手搖飲料店票選、甜度冰塊按鈕點選、餐廳菜單介紹與最新價目表連結，以及飲料補助限額（如 60 元）超額自付差額統計
 */
const DEFAULT_SURVEY_CAMPAIGNS = [
    {
        id: "campaign-yearend-meal",
        title: "活動當日午餐與手搖飲 — 跨店家餐點票選與差額統計",
        description: "請各位同仁選擇偏好的「午餐餐廳餐點」與「手搖飲料店飲品」。點選卡片按鈕可連結至該餐廳菜單介紹、查看飲料店最新價目表或檢視上傳的 Menu。飲料享有公司限額補助（上限 60 元），超過 60 元將自動計算需自行貼補之差額。",
        primaryCategoryLabel: "第一部分：午餐餐廳與平民美食票選（不同家餐廳選項）",
        secondaryCategoryLabel: "第二部分：不同家手搖飲票選（補助上限 60 元，超額需自付差額）",
        primarySubsidyLimit: 0,
        drinkSubsidyLimit: 60,
        enableDrinkSelectors: true,
        officialUrl: "https://www.google.com/search?q=%E4%B8%8A%E7%8F%AD%E6%97%8F+%E4%BA%BA%E6%B0%A3%E4%BE%BF%E7%95%B6+%E6%89%8B%E6%90%96%E9%A3%B2+%E8%8F%9C%E5%96%AE%E5%83%B9%E7%9B%AE%E8%A1%A8",
        attachmentTitle: "各家候選餐廳菜單介紹與手搖飲最新價目表總覽.doc",
        attachmentContent: "【跨店家午餐與手搖飲票選・完整菜單與補助差額說明】\n\n一、午餐候選餐廳一覽（公司全額補助）：\n1. 【梁社漢排骨】招牌炸排骨飯 ($115)、滷排骨飯 ($115)、玫瑰油雞飯 ($115)、椒麻雞飯 ($125)。\n2. 【八方雲集】招牌鍋貼 10 顆 + 酸辣湯套餐 ($105)、韓式辣味鍋貼套餐 ($105)、鮮蝦水餃套餐 ($140)。\n3. 【正忠排骨飯】正忠排骨飯 ($110)、蜜汁燒雞腿飯 ($120)、酥炸雞腿飯 ($120)。\n4. 【鬍鬚張魯肉飯】唐山排骨便當 ($120)、黃金粹魯便當 + 苦瓜排骨湯 ($120)。\n5. 【Subway 潛艇堡】6 吋百味俱樂部 ($125)、6 吋嫩切雞肉 ($120)、6 吋鮮蔬潛艇堡（素食可，$99）。\n\n二、手搖飲料店補助規則（限額補助 60 元，超額自付差額）：\n・每杯飲品公司補助上限為 NT$ 60。\n・點選 60 元（含）以下飲品：全額補助，免貼差額（自付 0 元）。\n・點選超過 60 元之飲品：需自行貼補差額（例如點選 75 元飲品，需自付差額 15 元；點選 85 元飲品，需自付差額 25 元）。\n・同仁點開各飲料店「最新價目表 Menu」後，亦可於下方微調自己想點的該店其他飲品名稱與實際金額，系統將自動試算差額！",
        attachmentDataUrl: "",
        primaryOptions: [
            {
                id: "main-01",
                vendor: "梁社漢排骨",
                name: "炸排骨 / 玫瑰油雞便當",
                price: 115,
                tag: "人氣便當名店",
                desc: "五星名廚監製厚切炸排骨、玫瑰油雞或椒麻雞便當，配菜清爽少油，米飯飽滿 Q 彈。",
                refUrl: "https://www.buygood.com.tw/",
                attachNote: "【梁社漢排骨 最新門市菜單介紹與價目表】\n・炸排骨飯：NT$ 115\n・滷排骨飯：NT$ 115\n・玫瑰油雞飯：NT$ 115\n・紅糟肉飯：NT$ 110\n・黃金塔塔鱈魚排飯：NT$ 120\n・椒麻雞飯：NT$ 125\n（若想改點同店其他品項，選取此卡片後可於下方欄位微調具體餐點名稱與金額）",
                attachDataUrl: ""
            },
            {
                id: "main-02",
                vendor: "八方雲集",
                name: "招牌鍋貼 10 顆 + 酸辣湯套餐",
                price: 105,
                tag: "國民鍋貼水餃",
                desc: "現煎金黃酥脆招牌鍋貼或水餃（可換韭菜、韓式辣味、咖哩），搭配酸辣湯或玉米濃湯。",
                refUrl: "https://www.8way.com.tw/menu",
                attachNote: "【八方雲集 最新門市菜單介紹與價目表】\n・招牌鍋貼 / 水餃 (10顆)：NT$ 70\n・韭菜 / 韓式辣味 / 咖哩鍋貼 (10顆)：NT$ 70\n・玉米鍋貼 / 水餃 (10顆)：NT$ 70\n・鮮蝦水餃 (10顆)：NT$ 105\n・酸辣湯 / 玉米濃湯 / 蕈菇湯：NT$ 35\n・無糖豆漿 / 招牌豆漿：NT$ 20",
                attachDataUrl: ""
            },
            {
                id: "main-03",
                vendor: "正忠排骨飯",
                name: "招牌正忠排骨飯 / 燒雞腿飯",
                price: 110,
                tag: "大份量飽足",
                desc: "經典超大塊帶骨滷炸排骨或蜜汁烤雞腿，搭配三樣家常配菜與菜脯，份量十足。",
                refUrl: "https://www.jengjong.tw/",
                attachNote: "【正忠排骨飯 最新門市菜單介紹與價目表】\n・正忠排骨飯：NT$ 110\n・蜜汁燒雞腿飯：NT$ 120\n・酥炸雞腿飯：NT$ 120\n・宮保雞丁飯：NT$ 105\n・日式豬排飯：NT$ 115",
                attachDataUrl: ""
            },
            {
                id: "main-04",
                vendor: "鬍鬚張魯肉飯",
                name: "唐山排骨便當 / 粹魯便當組",
                price: 120,
                tag: "台式經典魯肉",
                desc: "招牌黃金粹魯飯搭配軟嫩唐山排骨、筍絲與滷蛋，鹹香入味下飯。",
                refUrl: "https://www.fmsc.com.tw/menu",
                attachNote: "【鬍鬚張 最新門市菜單介紹與價目表】\n・魯肉飯便當：NT$ 85\n・雞肉飯便當：NT$ 85\n・唐山排骨便當：NT$ 120\n・黃金雞腿便當：NT$ 130\n・苦瓜排骨湯 / 四神湯：NT$ 60",
                attachDataUrl: ""
            },
            {
                id: "main-05",
                vendor: "Subway 潛艇堡",
                name: "6 吋百味俱樂部 / 鮮蔬潛艇堡 (素可)",
                price: 125,
                tag: "清爽輕食/素食可",
                desc: "現烤帕瑪森乾酪麵包搭配新鮮生菜與嫩切肉片（素食同仁可選鮮蔬或鷹嘴豆泥潛艇堡）。",
                refUrl: "https://subway.com.tw/GoWeb2/include/index.php?Page=2",
                attachNote: "【Subway 最新門市菜單介紹與價目表】\n・6 吋百味俱樂部：NT$ 125\n・6 吋嫩切雞肉 / 火雞胸肉：NT$ 120\n・6 吋鮪魚潛艇堡：NT$ 115\n・6 吋鮮蔬潛艇堡 (全素/蛋奶素可)：NT$ 99",
                attachDataUrl: ""
            }
        ],
        secondaryOptions: [
            {
                id: "drink-01",
                vendor: "50嵐",
                name: "四季春珍波椰 (1號) / 波霸奶茶",
                price: 50,
                tag: "60元內免貼差額",
                desc: "50嵐人氣冠軍「1號」四季春青茶加波霸、珍珠、椰果（大杯 50 元，補助上限 60 元內免貼錢）。",
                refUrl: "https://www.google.com/search?q=50%E5%B5%90+%E6%9C%80%E6%96%B0%E8%8F%9C%E5%96%AE+%E5%83%B9%E7%9B%AE%E8%A1%A8",
                attachNote: "【50嵐 最新門市價目表 Menu（大杯 L 價格）】\n・茉莉綠茶 / 阿薩姆紅茶 / 四季春青茶 / 黃金烏龍：NT$ 40（免貼差額）\n・1號 四季春珍波椰：NT$ 50（免貼差額）\n・波霸奶茶 / 珍珠奶茶 / 燕麥奶茶：NT$ 55（免貼差額）\n・檸檬綠茶 / 8冰綠：NT$ 55（免貼差額）\n・紅茶拿鐵 / 綠茶拿鐵 / 烏龍拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）\n・波霸紅茶拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）\n（如需改點價目表上其他品項，可於下方直接修改飲品名稱與實際價格）",
                attachDataUrl: ""
            },
            {
                id: "drink-02",
                vendor: "可不可熟成紅茶",
                name: "熟成紅茶 / 胭脂紅茶 (大杯)",
                price: 45,
                tag: "60元內免貼差額",
                desc: "經典果香桂圓韻味熟成紅茶或蜜桃香氣胭脂紅茶（大杯 45~50 元，亦可改點白玉歐蕾 75 元補差額）。",
                refUrl: "https://www.kebuke.com/menu/",
                attachNote: "【可不可熟成紅茶 最新門市價目表 Menu（大杯 L 價格）】\n・熟成紅茶 / 麗春紅茶 / 春芽綠茶：NT$ 45（免貼差額）\n・胭脂紅茶 / 熟成冷露 / 春芽冷露：NT$ 50（免貼差額）\n・雪藏紅茶（冰淇淋紅茶）：NT$ 65（超過 60 元，需貼差額 5 元）\n・熟成歐蕾（鮮奶茶）：NT$ 65（超過 60 元，需貼差額 5 元）\n・白玉歐蕾（珍珠鮮奶茶）：NT$ 75（超過 60 元，需貼差額 15 元）",
                attachDataUrl: ""
            },
            {
                id: "drink-03",
                vendor: "得正 Oolong Tea Project",
                name: "輕烏龍鮮奶 + 黃金珍珠 (大杯)",
                price: 70,
                tag: "超額需補 10 元",
                desc: "三分火輕烏龍茶韻融合鮮乳與 Q 彈黃金珍珠（單價 70 元，超過補助 60 元需自行貼差額 10 元）。",
                refUrl: "https://dejeng.com/#menu",
                attachNote: "【得正 Oolong Tea Project 最新門市價目表 Menu（大杯 L 價格）】\n・春烏龍 / 輕烏龍 / 焙烏龍：NT$ 40（免貼差額）\n・檸檬春烏龍 / 優酪春烏龍：NT$ 55~60（免貼差額）\n・芝士奶蓋春烏龍 / 芝士奶蓋焙烏龍：NT$ 60（免貼差額）\n・輕烏龍鮮奶 / 焙烏龍鮮奶：NT$ 60（免貼差額）\n・輕烏龍鮮奶 + 黃金珍珠：NT$ 70（超過 60 元，需貼差額 10 元）",
                attachDataUrl: ""
            },
            {
                id: "drink-04",
                vendor: "迷客夏 Milksha",
                name: "大正紅茶拿鐵 + 蜂蜜珍珠 (大杯)",
                price: 75,
                tag: "超額需補 15 元",
                desc: "自家綠光鮮奶搭配大正紅茶與現熬白玉蜂蜜珍珠（單價 75 元，超過補助 60 元需自行貼差額 15 元）。",
                refUrl: "https://www.milksha.com/products.php",
                attachNote: "【迷客夏 Milksha 最新門市價目表 Menu】\n・決明大麥 / 茉莉原淬綠茶 / 琥珀高峰烏龍 (L)：NT$ 40（免貼差額）\n・柳丁綠茶 / 冰萃檸檬 (L)：NT$ 60（免貼差額）\n・大正紅茶拿鐵 / 伯爵紅茶拿鐵 (L)：NT$ 65（超過 60 元，需貼差額 5 元）\n・大正紅茶拿鐵 + 珍珠 (L)：NT$ 75（超過 60 元，需貼差額 15 元）\n・手搗芋頭鮮奶 (M/L)：NT$ 75~90（超過 60 元，需貼差額 15~30 元）",
                attachDataUrl: ""
            },
            {
                id: "drink-05",
                vendor: "麻古茶坊 MACU",
                name: "芝芝葡萄果粒 / 楊枝甘露 (大杯)",
                price: 85,
                tag: "超額需補 25 元",
                desc: "新鮮巨峰葡萄果肉冰沙搭配紐西蘭起司奶蓋與綠茶凍（單價 85 元，超過補助 60 元需自行貼差額 25 元）。",
                refUrl: "https://www.macutea.com.tw/product.php",
                attachNote: "【麻古茶坊 MACU 最新門市價目表 Menu（大杯 L 價格）】\n・高山金萱茶 / 翡翠綠茶：NT$ 35~40（免貼差額）\n・梅子冰茶 / 金萱雙Q：NT$ 50（免貼差額）\n・波霸紅茶拿鐵：NT$ 65（超過 60 元，需貼差額 5 元）\n・翡翠柳橙：NT$ 70（超過 60 元，需貼差額 10 元）\n・香橙果粒茶：NT$ 80（超過 60 元，需貼差額 20 元）\n・芝芝葡萄果粒 / 楊枝甘露 2.0：NT$ 85（超過 60 元，需貼差額 25 元）",
                attachDataUrl: ""
            }
        ],
        votes: {}
    },
    {
        id: "campaign-team-outing",
        title: "部門聚餐餐廳與下午茶方案 — 通用多主題票選範例",
        description: "通用型多主題票選範例：除日常午餐與飲料外，本系統亦可用於部門聚餐餐廳決策、員工旅遊地點或福委會禮品方案調查。",
        primaryCategoryLabel: "第一部分：聚餐餐廳方案選擇",
        secondaryCategoryLabel: "第二部分：搭配下午茶方案選擇",
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
                name: "日式燒肉多人套餐方案",
                price: 800,
                tag: "獨立包廂",
                desc: "專人代烤精選肉品拼盤，附無限量日式小菜與甜點。",
                refUrl: "https://www.google.com/search?q=%E6%97%A5%E5%BC%8F%E7%87%92%E8%82%89+%E9%A3%9F%E8%A8%98+%E8%A9%95%E5%83%B9",
                attachNote: "設有三間獨立十人包廂。",
                attachDataUrl: ""
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
                attachDataUrl: ""
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
    SURVEY_STATE: "aero_workspace_survey_state_v2"
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
     * 子視圖 1：同仁互動點餐與票選頁面（支援不同家餐廳/飲料店、甜度冰塊點選、菜單價目表連結與超額補差額即時試算）
     */
    getSurveyVoteViewHtml(campaign, employees) {
        if (!this.selectedVoterName && employees.length > 0) {
            this.selectedVoterName = employees[0];
            this.loadExistingVoteForSelectedEmployee(campaign);
        }

        if (!this.selectedPrimaryOptionId && campaign.primaryOptions.length > 0) {
            const firstPrimary = campaign.primaryOptions[0];
            this.selectedPrimaryOptionId = firstPrimary.id;
            this.customPrimaryItemName = firstPrimary.name;
            this.customPrimaryPrice = Number(firstPrimary.price) || 0;
        }
        if (!this.selectedSecondaryOptionId && campaign.secondaryOptions.length > 0) {
            const firstSecondary = campaign.secondaryOptions[0];
            this.selectedSecondaryOptionId = firstSecondary.id;
            this.customSecondaryItemName = firstSecondary.name;
            this.customSecondaryPrice = Number(firstSecondary.price) || 0;
        }

        const primarySubsidyLimit = Number(campaign.primarySubsidyLimit) || 0;
        const drinkSubsidyLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const enableDrinkSelectors = campaign.enableDrinkSelectors !== false;

        const currentPrimaryObj = campaign.primaryOptions.find((o) => o.id === this.selectedPrimaryOptionId) || campaign.primaryOptions[0];
        const currentSecondaryObj = campaign.secondaryOptions.find((o) => o.id === this.selectedSecondaryOptionId) || campaign.secondaryOptions[0];

        const activeMealPrice = Number(this.customPrimaryPrice) || (currentPrimaryObj ? Number(currentPrimaryObj.price) || 0 : 0);
        const activeDrinkPrice = Number(this.customSecondaryPrice) || (currentSecondaryObj ? Number(currentSecondaryObj.price) || 0 : 0);

        const mealCopay = primarySubsidyLimit > 0 ? Math.max(0, activeMealPrice - primarySubsidyLimit) : 0;
        const drinkCopay = drinkSubsidyLimit > 0 ? Math.max(0, activeDrinkPrice - drinkSubsidyLimit) : 0;
        const totalCopay = mealCopay + drinkCopay;

        const voterOptionsHtml = employees.length > 0
            ? employees.map((emp) => {
                const vRecord = campaign.votes && campaign.votes[emp];
                const statusTag = vRecord
                    ? `[已完成｜${vRecord.totalCopay > 0 ? `需補差額 $${vRecord.totalCopay}` : "免補差額"}]`
                    : "[尚未填寫]";
                return `<option value="${this.escapeHtml(emp)}" ${emp === this.selectedVoterName ? "selected" : ""}>${this.escapeHtml(emp)} ${statusTag}</option>`;
            }).join("")
            : `<option value="">請先至「設定餐點、附檔與共用名單」匯入員工姓名</option>`;

        const renderOptionCards = (options, selectedId, groupType, subsidyLimit) => options.map((opt) => {
            const isSelected = opt.id === selectedId;
            const vendorTitle = opt.vendor ? `${opt.vendor} ${opt.name}` : opt.name;
            const priceVal = Number(opt.price) || 0;
            const itemCopay = subsidyLimit > 0 ? Math.max(0, priceVal - subsidyLimit) : 0;
            const priceLabelText = priceVal > 0
                ? (itemCopay > 0 ? `NT$ ${priceVal} (超額補 +$${itemCopay})` : `NT$ ${priceVal} (補助內免貼)`)
                : "依菜單計價";

            const isDrinkGroup = groupType === "secondary";
            const menuBtnLabel = isDrinkGroup ? "查看上傳最新價目表 Menu" : "查看餐廳菜單與介紹附檔";
            const webMenuLabel = isDrinkGroup ? "官方最新價目表網頁" : "連結餐廳菜單介紹";
            const searchQueryUrl = isDrinkGroup
                ? `https://www.google.com/search?q=${encodeURIComponent((opt.vendor || opt.name) + " 最新菜單 價目表 必喝推薦")}`
                : `https://www.google.com/search?q=${encodeURIComponent((opt.vendor || opt.name) + " 菜單 餐點介紹 評價")}`;
            const mapQueryUrl = `https://www.google.com/maps/search/${encodeURIComponent(opt.vendor || opt.name)}`;

            return `
                <article class="survey-option-card ${isSelected ? "is-selected" : ""}" data-select-group="${groupType}" data-option-id="${this.escapeHtml(opt.id)}">
                    <div class="informal-card-body">
                        <div class="option-card-header">
                            <div>
                                <div class="option-badges-row">
                                    ${opt.vendor ? `<span class="vendor-name-badge">${this.escapeHtml(opt.vendor)}</span>` : ""}
                                    <span class="option-price-pill ${itemCopay > 0 ? "is-over-limit" : ""}">${this.escapeHtml(priceLabelText)}</span>
                                    <span class="option-tag-pill">${this.escapeHtml(opt.tag || "精選項目")}</span>
                                </div>
                                <h4 class="option-title">${this.escapeHtml(opt.name)}</h4>
                            </div>
                            <div class="option-radio-indicator" aria-hidden="true"></div>
                        </div>
                        <p class="option-desc">${this.escapeHtml(opt.desc)}</p>
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
                            <span>查詢菜單與評價</span>
                        </a>
                        <a href="${mapQueryUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn" data-stop-card-click="true">
                            <span>地圖評論</span>
                        </a>
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

        return `
            <!-- 活動整體菜單附檔與外部介紹連結橫幅 -->
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

            <!-- 步驟一：選擇投票員工姓名與特殊飲食備註 -->
            <div class="voter-identity-card">
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-employee-select">步驟一：請選擇您的員工姓名（與尾牙抽獎系統共用名單）</label>
                    <select id="voter-employee-select" class="live-stage-input">
                        ${voterOptionsHtml}
                    </select>
                </div>
                <div class="live-input-group">
                    <label class="live-input-label" for="voter-custom-note-input">其他飲食備註（選填：如便當飯少、不加酸菜、加購白玉珍珠等）</label>
                    <input
                        type="text"
                        id="voter-custom-note-input"
                        class="live-stage-input"
                        value="${this.escapeHtml(this.voterCustomNote)}"
                        placeholder="選填：輸入您的個人飲食客製備註..."
                    />
                </div>
            </div>

            <!-- 步驟二：不同家餐廳平民午餐選項 -->
            <div class="survey-category-section">
                <div class="lottery-panel-title">
                    <h3 class="section-heading">${this.escapeHtml(campaign.primaryCategoryLabel)}</h3>
                    <span class="theme-code-badge">
                        ${primarySubsidyLimit > 0 ? `午餐補助上限：NT$ ${primarySubsidyLimit}` : "午餐公司全額補助"}
                    </span>
                </div>
                <p class="section-subheading">點選您想吃的餐廳餐點卡片；點擊卡片下方按鈕可開啟該餐廳菜單介紹網頁或檢視上傳菜單。若想改點同餐廳菜單上的其他便當，可於下方微調：</p>
                <div class="survey-options-grid">
                    ${renderOptionCards(campaign.primaryOptions, this.selectedPrimaryOptionId, "primary", primarySubsidyLimit)}
                </div>

                <!-- 依餐廳菜單微調具體餐點品項與金額 -->
                <div class="drink-custom-panel">
                    <div class="custom-order-adjust-grid">
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-primary-item-input">
                                已選餐廳：【${this.escapeHtml(currentPrimaryObj ? (currentPrimaryObj.vendor || currentPrimaryObj.name) : "")}】— 確認／微調您依該餐廳菜單點的品項名稱
                            </label>
                            <input
                                type="text"
                                id="custom-primary-item-input"
                                class="live-stage-input"
                                value="${this.escapeHtml(this.customPrimaryItemName)}"
                                placeholder="例如：炸排骨飯、玫瑰油雞飯、招牌鍋貼 10 顆..."
                            />
                        </div>
                        <div class="live-input-group">
                            <label class="live-input-label" for="custom-primary-price-input">餐點單價 (NT$)</label>
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
                                ${mealCopay > 0 ? `超額需補差額：NT$ ${mealCopay}` : `補助範圍內（自付差額 NT$ 0）`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 步驟三：不同家手搖飲料店選擇 ＋ 甜度冰塊點選 ＋ 60元限額補助差額即時試算 -->
            <div class="survey-category-section">
                <div class="lottery-panel-title">
                    <h3 class="section-heading">${this.escapeHtml(campaign.secondaryCategoryLabel)}</h3>
                    <span class="theme-code-badge">
                        ${drinkSubsidyLimit > 0 ? `飲料限額補助上限：NT$ ${drinkSubsidyLimit}（超過需自行貼差額）` : "不限額"}
                    </span>
                </div>
                <p class="section-subheading">點選飲料店卡片，點擊卡片下方「查看上傳最新價目表 Menu」或「官方最新價目表網頁」可查看完整飲品價格；下方可直接點選甜度與冰塊：</p>
                <div class="survey-options-grid">
                    ${renderOptionCards(campaign.secondaryOptions, this.selectedSecondaryOptionId, "secondary", drinkSubsidyLimit)}
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
                                已選店家：【${this.escapeHtml(currentSecondaryObj ? (currentSecondaryObj.vendor || currentSecondaryObj.name) : "")}】— 確認／依最新價目表填入飲品名稱
                            </label>
                            <input
                                type="text"
                                id="custom-secondary-item-input"
                                class="live-stage-input"
                                value="${this.escapeHtml(this.customSecondaryItemName)}"
                                placeholder="可依該店最新價目表填入想喝的品項（如：四季春珍波椰、芝芝葡萄果粒）..."
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
                    <span>點餐確認：【${this.escapeHtml(currentPrimaryObj ? (currentPrimaryObj.vendor || "") : "")}】${this.escapeHtml(this.customPrimaryItemName)} ($${activeMealPrice})</span>
                    <span>＋</span>
                    <span>【${this.escapeHtml(currentSecondaryObj ? (currentSecondaryObj.vendor || "") : "")}】${this.escapeHtml(this.customSecondaryItemName)} ($${activeDrinkPrice}${enableDrinkSelectors ? `｜${this.escapeHtml(this.selectedSugar)}・${this.escapeHtml(this.selectedIce)}` : ""})</span>
                </div>
                <span class="copay-highlight-pill ${totalCopay > 0 ? "is-owing" : ""}" id="total-copay-final-pill">
                    ${totalCopay > 0 ? `本次點餐您需自行貼補差額：NT$ ${totalCopay}` : `本次點餐全額補助，免貼差額 (NT$ 0)`}
                </span>
            </div>

            <!-- 送出票選按鈕 -->
            <div class="grand-stage-controls">
                <button type="button" class="primary-btn" id="submit-survey-vote-btn" ${employees.length === 0 ? "disabled" : ""}>
                    確認送出「${this.escapeHtml(this.selectedVoterName || "同仁")}」的點餐票選與差額登記
                </button>
            </div>
        `;
    }

    /**
     * 子視圖 2：不同家餐廳／飲料店選項、最新價目表 Menu 上傳與補助上限設定頁
     */
    getSurveySetupViewHtml(campaign, employees) {
        const primarySubsidyLimit = Number(campaign.primarySubsidyLimit) || 0;
        const drinkSubsidyLimit = Number(campaign.drinkSubsidyLimit) || 0;

        const primaryListHtml = campaign.primaryOptions.map((opt, idx) => `
            <li class="prize-config-item">
                <div class="prize-config-info">
                    ${opt.vendor ? `<span class="vendor-name-badge">${this.escapeHtml(opt.vendor)}</span>` : ""}
                    <span class="option-price-pill">NT$ ${Number(opt.price) || 0}</span>
                    <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                    <span class="theme-route-hint">${this.escapeHtml(opt.desc)}</span>
                </div>
                <button type="button" class="delete-idea-btn" data-del-primary-idx="${idx}">移除</button>
            </li>
        `).join("");

        const secondaryListHtml = campaign.secondaryOptions.map((opt, idx) => {
            const p = Number(opt.price) || 0;
            const copay = drinkSubsidyLimit > 0 ? Math.max(0, p - drinkSubsidyLimit) : 0;
            return `
                <li class="prize-config-item">
                    <div class="prize-config-info">
                        ${opt.vendor ? `<span class="vendor-name-badge">${this.escapeHtml(opt.vendor)}</span>` : ""}
                        <span class="option-price-pill ${copay > 0 ? "is-over-limit" : ""}">
                            NT$ ${p} ${copay > 0 ? `(超額補 +$${copay})` : "(補助內)"}
                        </span>
                        <span class="prize-config-name">${this.escapeHtml(opt.name)}</span>
                        <span class="theme-route-hint">${this.escapeHtml(opt.desc)}</span>
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
                    <span>在此新增不同家午餐餐廳與手搖飲料店、設定飲料補助上限（預設 60 元）並上傳各店最新 Menu 價目表。</span>
                </div>
                <div class="lottery-top-actions">
                    <button type="button" class="secondary-btn" id="simulate-votes-btn">一鍵產生模擬點餐與補差額數據 (測試統計與 LINE 通知)</button>
                    <button type="button" class="danger-outline-btn" id="clear-campaign-votes-btn">清空本活動投票紀錄</button>
                </div>
            </div>

            <div class="lottery-admin-grid">
                <!-- 左欄：新增餐廳／飲料店選項、單價、菜單連結與上傳 Menu 附檔 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、新增不同家餐廳／手搖飲店選項與 Menu 價目表</span>
                        <span class="theme-code-badge">RESTAURANTS & DRINKS</span>
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
                            <input type="text" id="new-opt-vendor" class="idea-input" placeholder="店家／餐廳名稱（如：梁社漢排骨、50嵐、麻古茶坊）" required />
                            <input type="number" id="new-opt-price" class="idea-input" min="0" step="1" placeholder="代表品項單價 (如：115 或 75)" required />
                        </div>
                        <div class="idea-form-row">
                            <input type="text" id="new-opt-name" class="idea-input" placeholder="代表餐點／飲品名稱（如：炸排骨便當、芝芝葡萄果粒）" required />
                            <input type="text" id="new-opt-tag" class="idea-input" placeholder="標籤（如：人氣便當、超額需補差額）" />
                        </div>
                        <input type="text" id="new-opt-desc" class="idea-input" placeholder="餐點／店家特色簡短介紹..." required />
                        <input type="url" id="new-opt-url" class="idea-input" placeholder="該餐廳官方菜單介紹／飲料店最新價目表網頁連結 URL" />
                        <textarea id="new-opt-attach-note" class="roster-textarea" placeholder="在此貼上該店家的完整文字價目表 Menu（同仁點擊『查看最新價目表 Menu』時會彈出顯示）..."></textarea>
                        <div class="file-upload-row">
                            <label class="file-upload-label" for="new-opt-file-input">
                                <span>上傳該店最新實體 Menu 價目表圖片 (支援 JPG/PNG)</span>
                            </label>
                            <input type="file" id="new-opt-file-input" class="hidden-file-input" accept="image/*" />
                            <span class="theme-route-hint" id="new-opt-file-status">尚未選擇 Menu 圖檔</span>
                        </div>
                        <button type="submit" class="primary-btn">新增餐廳／飲料店選項</button>
                    </form>

                    <div>
                        <h4 class="lottery-panel-title">${this.escapeHtml(campaign.primaryCategoryLabel)} (${campaign.primaryOptions.length} 家)</h4>
                        <ul class="prize-config-list">${primaryListHtml}</ul>
                    </div>

                    <div>
                        <h4 class="lottery-panel-title">${this.escapeHtml(campaign.secondaryCategoryLabel)} (${campaign.secondaryOptions.length} 家)</h4>
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
                                <label class="live-input-label" for="setup-drink-subsidy-limit">飲料補助上限金額 (元，例如 60 元；0 為不限額)</label>
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
                            <label class="live-input-label" for="setup-attach-content">完整菜單与補助規則說明內容</label>
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
     * 子視圖 3：統計分析圖表、超額自付差額收款統計與一鍵複製 LINE 群組通知頁
     */
    getSurveyStatsViewHtml(campaign, employees) {
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const unvotedNames = employees.filter((emp) => !votesMap[emp]);
        const completionRate = employees.length > 0
            ? Math.round((votedNames.length / employees.length) * 100)
            : 0;

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

        const lineText = this.generateLineGroupNotificationText(campaign, employees, this.lineTemplateMode);

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
            : `<li class="winner-history-item"><span class="theme-desc">目前無任何同仁超過補助上限（無須收取自付差額）。</span></li>`;

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
            : `<li class="winner-history-item"><span class="theme-desc">目前尚無同仁送出票選（可至「設定頁」點擊「一鍵產生模擬點餐與補差額數據」預覽統計與 LINE 通知效果）。</span></li>`;

        const unvotedChipsHtml = unvotedNames.length > 0
            ? unvotedNames.map((name) => `<span class="pool-person-chip">${this.escapeHtml(name)}</span>`).join("")
            : `<span class="theme-status-badge">全員皆已完成票選！</span>`;

        return `
            <!-- 統計頂部四大財務與完成率指標卡 -->
            <div class="stats-four-grid">
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">${votedNames.length} / ${employees.length} (${completionRate}%)</span>
                    <span class="lottery-stat-label">已完成點餐票選人數（待填 ${unvotedNames.length} 人）</span>
                </div>
                <div class="lottery-stat-box">
                    <span class="lottery-stat-num">NT$ ${totalOrderCost.toLocaleString()}</span>
                    <span class="lottery-stat-label">餐點＋飲品訂單總金額 (餐 $${totalMealCost} / 飲 $${totalDrinkCost})</span>
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
                <!-- 左欄：Canvas 視覺化各餐廳/飲料店得票統計圖表與未投票名單 -->
                <div class="lottery-panel-card">
                    <div class="lottery-panel-title">
                        <span>一、各餐廳與手搖飲店得票數統計分析</span>
                        <button type="button" class="secondary-btn" id="sync-voted-to-lottery-btn">
                            將已完成投票者同步為尾牙抽獎池 (${votedNames.length}人)
                        </button>
                    </div>

                    <div class="stats-canvas-wrap">
                        <canvas id="survey-stats-canvas" class="stats-chart-canvas" width="640" height="440"></canvas>
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
                            匯出完整點餐與差額 CSV 報表
                        </button>
                    </div>

                    <p class="section-subheading">點選下方按鈕切換通知格式（含店家統計、甜度冰塊、超額補差額收款明細與催票通知）：</p>

                    <div class="prize-preset-chips">
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "summary" ? "active" : ""}" data-line-mode="summary">
                            格式一：各店數量＆差額總計版
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "copay" ? "active" : ""}" data-line-mode="copay">
                            格式二：超額補差額收款通知版 (${copayRecords.length}人)
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "detailed" ? "active" : ""}" data-line-mode="detailed">
                            格式三：個人餐點＋甜度冰塊明細版
                        </button>
                        <button type="button" class="prize-chip-btn ${this.lineTemplateMode === "reminder" ? "active" : ""}" data-line-mode="reminder">
                            格式四：未投票同仁催票提醒版
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

            <!-- 區塊四：每位同仁完整投票明細列表 -->
            <div class="lottery-panel-card">
                <div class="lottery-panel-title">
                    <span>四、全體同仁點餐、甜度冰塊與差額明細總表 (${votedNames.length} 筆)</span>
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
            this.customPrimaryItemName = existing.primaryName || "";
            this.customPrimaryPrice = Number(existing.primaryPrice) || 0;
            this.customSecondaryItemName = existing.secondaryName || "";
            this.customSecondaryPrice = Number(existing.secondaryPrice) || 0;
            this.selectedSugar = existing.sugar || "微糖 (3分)";
            this.selectedIce = existing.ice || "少冰";
            this.voterCustomNote = existing.note || "";
        } else {
            const pObj = campaign.primaryOptions.find((o) => o.id === this.selectedPrimaryOptionId) || campaign.primaryOptions[0];
            const sObj = campaign.secondaryOptions.find((o) => o.id === this.selectedSecondaryOptionId) || campaign.secondaryOptions[0];
            if (pObj) {
                this.selectedPrimaryOptionId = pObj.id;
                this.customPrimaryItemName = pObj.name;
                this.customPrimaryPrice = Number(pObj.price) || 0;
            }
            if (sObj) {
                this.selectedSecondaryOptionId = sObj.id;
                this.customSecondaryItemName = sObj.name;
                this.customSecondaryPrice = Number(sObj.price) || 0;
            }
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
                const title = window.prompt("請輸入新票選主題名稱（例如：週五部門午餐與手搖飲票選、春季旅遊地點票選）：");
                if (!title || !title.trim()) return;
                const cat1 = window.prompt("請輸入第一分類標題：", "第一部分：午餐餐廳／主要方案選擇") || "第一部分：午餐餐廳／主要方案選擇";
                const cat2 = window.prompt("請輸入第二分類標題：", "第二部分：手搖飲料店／搭配方案選擇") || "第二部分：手搖飲料店／搭配方案選擇";
                const drinkLimitStr = window.prompt("請設定第二分類（如飲料）補助上限金額（輸入 60 代表超過 60 元需自付差額；輸入 0 代表不限額）：", "60");
                const drinkLimit = Math.max(0, Number(drinkLimitStr) || 0);

                const newId = `campaign-${Date.now()}`;
                this.surveyState.campaigns.push({
                    id: newId,
                    title: title.trim(),
                    description: "請同仁選擇偏好的方案，可點擊下方按鈕檢視菜單價目表附檔或查詢網路評價。",
                    primaryCategoryLabel: cat1.trim(),
                    secondaryCategoryLabel: cat2.trim(),
                    primarySubsidyLimit: 0,
                    drinkSubsidyLimit: drinkLimit,
                    enableDrinkSelectors: drinkLimit > 0,
                    officialUrl: "https://www.google.com",
                    attachmentTitle: `${title.trim()} — 菜單與價目表說明附檔.doc`,
                    attachmentContent: `【${title.trim()}】詳細說明資料，可於「設定餐點、附檔與共用名單」頁面編輯內容或上傳最新 Menu 圖片附檔。`,
                    attachmentDataUrl: "",
                    primaryOptions: [
                        { id: `p-${Date.now()}-1`, vendor: "候選店家 A", name: "招牌餐點 A", price: 110, tag: "選項 A", desc: "預設方案 A 說明", refUrl: "", attachNote: "店家 A 菜單價目表說明", attachDataUrl: "" },
                        { id: `p-${Date.now()}-2`, vendor: "候選店家 B", name: "招牌餐點 B", price: 115, tag: "選項 B", desc: "預設方案 B 說明", refUrl: "", attachNote: "店家 B 菜單價目表說明", attachDataUrl: "" }
                    ],
                    secondaryOptions: [
                        { id: `s-${Date.now()}-1`, vendor: "飲料店 1", name: "人氣茶飲 1", price: 50, tag: "補助內免貼", desc: "預設搭配項目 1", refUrl: "", attachNote: "飲料店 1 最新價目表說明", attachDataUrl: "" },
                        { id: `s-${Date.now()}-2`, vendor: "飲料店 2", name: "人氣鮮奶茶 2", price: 75, tag: "超額需補差額", desc: "預設搭配項目 2", refUrl: "", attachNote: "飲料店 2 最新價目表說明", attachDataUrl: "" }
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
        const customPrimaryItemInput = document.getElementById("custom-primary-item-input");
        const customPrimaryPriceInput = document.getElementById("custom-primary-price-input");
        const customSecondaryItemInput = document.getElementById("custom-secondary-item-input");
        const customSecondaryPriceInput = document.getElementById("custom-secondary-price-input");

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
                mealPill.textContent = mCopay > 0 ? `超額需補差額：NT$ ${mCopay}` : `補助範圍內（自付差額 NT$ 0）`;
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
            const pObj = campaign.primaryOptions.find((o) => o.id === this.selectedPrimaryOptionId);
            const sObj = campaign.secondaryOptions.find((o) => o.id === this.selectedSecondaryOptionId);

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
                    <span>點餐確認：【${this.escapeHtml(pObj ? (pObj.vendor || "") : "")}】${this.escapeHtml(this.customPrimaryItemName)} ($${mPrice})</span>
                    <span>＋</span>
                    <span>【${this.escapeHtml(sObj ? (sObj.vendor || "") : "")}】${this.escapeHtml(this.customSecondaryItemName)} ($${dPrice}${sugarIcePart})</span>
                `;
            }
        };

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

        // 點選主餐餐廳卡片或飲料店卡片
        this.focusSection.querySelectorAll("[data-select-group]").forEach((card) => {
            card.addEventListener("click", () => {
                const group = card.getAttribute("data-select-group");
                const optId = card.getAttribute("data-option-id");
                if (group === "primary") {
                    this.selectedPrimaryOptionId = optId;
                    const pObj = campaign.primaryOptions.find((o) => o.id === optId);
                    if (pObj) {
                        this.customPrimaryItemName = pObj.name;
                        this.customPrimaryPrice = Number(pObj.price) || 0;
                    }
                } else {
                    this.selectedSecondaryOptionId = optId;
                    const sObj = campaign.secondaryOptions.find((o) => o.id === optId);
                    if (sObj) {
                        this.customSecondaryItemName = sObj.name;
                        this.customSecondaryPrice = Number(sObj.price) || 0;
                    }
                }
                this.renderSurveyPage("vote");
            });
        });

        // 送出票選與差額結果
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
                    window.alert("請確認已各選擇一項主餐餐廳與飲料店選項。");
                    return;
                }

                const finalPrimaryName = (this.customPrimaryItemName || primaryObj.name).trim();
                const finalPrimaryPrice = Math.max(0, Number(this.customPrimaryPrice) || Number(primaryObj.price) || 0);
                const finalSecondaryName = (this.customSecondaryItemName || secondaryObj.name).trim();
                const finalSecondaryPrice = Math.max(0, Number(this.customSecondaryPrice) || Number(secondaryObj.price) || 0);

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
                    primaryId: primaryObj.id,
                    primaryVendor: primaryObj.vendor || "",
                    primaryName: finalPrimaryName,
                    primaryPrice: finalPrimaryPrice,
                    primaryCopay: mealCopay,
                    secondaryId: secondaryObj.id,
                    secondaryVendor: secondaryObj.vendor || "",
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
                    `已成功記錄「${this.selectedVoterName}」的點餐票選：\n` +
                    `・主餐：[${primaryObj.vendor || "主餐"}] ${finalPrimaryName} ($${finalPrimaryPrice})\n` +
                    `・飲品：[${secondaryObj.vendor || "飲品"}] ${finalSecondaryName}${drinkSpecMsg} ($${finalSecondaryPrice})` +
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
                const tag = document.getElementById("new-opt-tag").value.trim() || "人氣選項";
                const desc = document.getElementById("new-opt-desc").value.trim();
                const url = document.getElementById("new-opt-url").value.trim();
                const attachNote = document.getElementById("new-opt-attach-note").value.trim();

                if (!name || !desc) return;

                const newOption = {
                    id: `${cat}-${Date.now()}`,
                    vendor,
                    name,
                    price,
                    tag,
                    desc,
                    refUrl: url,
                    attachNote: attachNote || `【${vendor}】${name} 菜單與價目表說明`,
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

        // 一鍵產生模擬同仁點餐、甜度冰塊與超額補差額數據
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

                const pLimit = Number(campaign.primarySubsidyLimit) || 0;
                const dLimit = Number(campaign.drinkSubsidyLimit) || 0;
                const sampleNotes = ["", "飯少", "不加酸菜", "", "加辣", ""];

                campaign.votes = {};
                // 模擬約 85% 同仁已完成點餐，包含 60 元以下免貼差額與 70~85 元需貼差額之訂單
                const simCount = Math.max(1, Math.floor(emps.length * 0.85));
                for (let i = 0; i < simCount; i += 1) {
                    const emp = emps[i];
                    const pPick = pOpts[this.getCryptoRandomInt(pOpts.length)];
                    const sPick = sOpts[this.getCryptoRandomInt(sOpts.length)];
                    const sugarPick = SURVEY_SUGAR_OPTIONS[this.getCryptoRandomInt(SURVEY_SUGAR_OPTIONS.length)];
                    const icePick = SURVEY_ICE_OPTIONS[this.getCryptoRandomInt(SURVEY_ICE_OPTIONS.length)];
                    const notePick = sampleNotes[this.getCryptoRandomInt(sampleNotes.length)];

                    const mPrice = Number(pPick.price) || 0;
                    const dPrice = Number(sPick.price) || 0;
                    const mCopay = pLimit > 0 ? Math.max(0, mPrice - pLimit) : 0;
                    const dCopay = dLimit > 0 ? Math.max(0, dPrice - dLimit) : 0;

                    campaign.votes[emp] = {
                        primaryId: pPick.id,
                        primaryVendor: pPick.vendor || "",
                        primaryName: pPick.name,
                        primaryPrice: mPrice,
                        primaryCopay: mCopay,
                        secondaryId: sPick.id,
                        secondaryVendor: sPick.vendor || "",
                        secondaryName: sPick.name,
                        secondaryPrice: dPrice,
                        secondaryCopay: dCopay,
                        totalCopay: mCopay + dCopay,
                        sugar: campaign.enableDrinkSelectors !== false ? sugarPick : "",
                        ice: campaign.enableDrinkSelectors !== false ? icePick : "",
                        note: notePick,
                        time: "10/18 09:45"
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
     * 使用 HTML5 Canvas 繪製不同家餐廳與手搖飲店得票統計橫向長條圖（無任何 Inline CSS）
     */
    drawSurveyStatsCharts(campaign) {
        const canvas = document.getElementById("survey-stats-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const votesList = Object.values(campaign.votes || {});
        const totalVotes = votesList.length;

        const primaryCounts = campaign.primaryOptions.map((opt) => {
            const label = opt.vendor ? `[${opt.vendor}] ${opt.name}` : opt.name;
            return {
                name: label,
                count: votesList.filter((v) => v.primaryId === opt.id || v.primaryName === opt.name).length
            };
        });

        const secondaryCounts = campaign.secondaryOptions.map((opt) => {
            const label = opt.vendor ? `[${opt.vendor}] ${opt.name}` : opt.name;
            return {
                name: label,
                count: votesList.filter((v) => v.secondaryId === opt.id || v.secondaryName === opt.name).length
            };
        });

        const totalRows = primaryCounts.length + secondaryCounts.length;
        const canvasHeight = Math.max(340, 115 + totalRows * 42);
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
                const labelText = item.name.length > 17 ? `${item.name.slice(0, 17)}...` : item.name;

                ctx.fillStyle = mutedColor;
                ctx.font = "600 13px 'Noto Sans TC', sans-serif";
                ctx.fillText(labelText, 16, currentY + 15);

                const barX = 255;
                const maxBarW = 280;
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
     * 產生可一鍵貼上 LINE 群組的通知文案（包含店家票數、甜度冰塊、飲料補助超額貼差額收款明細與催票通知）
     */
    generateLineGroupNotificationText(campaign, employees, mode) {
        const votesMap = campaign.votes || {};
        const votedNames = Object.keys(votesMap);
        const unvotedNames = employees.filter((emp) => !votesMap[emp]);
        const votesList = Object.values(votesMap);
        const drinkLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const primaryLimit = Number(campaign.primarySubsidyLimit) || 0;

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
                const vendorTag = v.secondaryVendor ? `[${v.secondaryVendor}] ` : "";
                const specTag = (v.sugar || v.ice) ? ` (${v.sugar || ""}/${v.ice || ""})` : "";
                copayLines.push(`・${name}：${vendorTag}${v.secondaryName}${specTag}（單價 $${dPrice}，應補差額 +$${empCopay} 元）`);
            }
        });

        const totalOrderCost = totalMealCost + totalDrinkCost;
        const totalCompanySubsidy = Math.max(0, totalOrderCost - totalCopayAmount);

        const primarySummaryLines = campaign.primaryOptions.map((opt) => {
            const cnt = votesList.filter((v) => v.primaryId === opt.id).length;
            const vPrefix = opt.vendor ? `【${opt.vendor}】` : "";
            return `・${vPrefix}${opt.name} ($${Number(opt.price) || 0})：${cnt} 份`;
        });

        const secondarySummaryLines = campaign.secondaryOptions.map((opt) => {
            const cnt = votesList.filter((v) => v.secondaryId === opt.id).length;
            const vPrefix = opt.vendor ? `【${opt.vendor}】` : "";
            return `・${vPrefix}${opt.name} ($${Number(opt.price) || 0})：${cnt} 杯`;
        });

        const pageUrl = `${window.location.origin}${window.location.pathname}#theme-05-survey-vote`;

        if (mode === "reminder") {
            return [
                `【群組通知】${campaign.title} — 尚未點餐提醒`,
                `----------------------------------------`,
                `各位同仁好，目前「${campaign.title}」已完成 ${votedNames.length} / ${employees.length} 人登記。`,
                `（飲料補助上限為 ${drinkLimit} 元，超過需自付差額）`,
                ``,
                `【尚未完成票選同仁名單（共 ${unvotedNames.length} 人）】`,
                unvotedNames.length > 0 ? unvotedNames.map((n) => `・${n}`).join("\n") : "・全員皆已完成登記！",
                ``,
                `請尚未填寫的同仁點選以下線上連結查看各家餐廳菜單與飲料價目表並完成點選：`,
                pageUrl
            ].join("\n");
        }

        if (mode === "copay") {
            return [
                `【差額收款通知】${campaign.title} — 超額自付差額明細`,
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
                const pVendor = v.primaryVendor ? `[${v.primaryVendor}] ` : "";
                const sVendor = v.secondaryVendor ? `[${v.secondaryVendor}] ` : "";
                const specPart = (v.sugar || v.ice) ? ` (${v.sugar || ""}/${v.ice || ""})` : "";
                const copayPart = empCopay > 0 ? ` ｜ 需補差額 +$${empCopay}` : " ｜ 免補差額";
                const notePart = v.note ? `（備註：${v.note}）` : "";
                return `${String(idx + 1).padStart(2, "0")}. ${name}：${pVendor}${v.primaryName} ＋ ${sVendor}${v.secondaryName}${specPart}${copayPart}${notePart}`;
            });

            return [
                `【群組公告】${campaign.title} — 個人點餐與差額核對表`,
                `----------------------------------------`,
                `應填人數：${employees.length} 人 ｜ 已完成：${votedNames.length} 人`,
                `訂單總額：NT$ ${totalOrderCost}（公司補助 NT$ ${totalCompanySubsidy} ／ 同仁自付差額合計 NT$ ${totalCopayAmount}）`,
                ``,
                `【各別同仁點餐、甜度冰塊與補差額明細】`,
                ...(detailLines.length > 0 ? detailLines : ["（尚無填答紀錄）"]),
                ``,
                `如需修改或查看菜單價目表，請開啟線上票選頁面：`,
                pageUrl
            ].join("\n");
        }

        // 預設 summary 模式（各店統計＋差額收款彙整版）
        return [
            `【統計通知】${campaign.title} — 店家統計與差額總表`,
            `----------------------------------------`,
            `統計進度：已完成 ${votedNames.length} / ${employees.length} 人（待填 ${unvotedNames.length} 人）`,
            `費用統計：總金額 NT$ ${totalOrderCost} ＝ 公司補助 NT$ ${totalCompanySubsidy} ＋ 同仁自付差額 NT$ ${totalCopayAmount}`,
            ``,
            `【${campaign.primaryCategoryLabel}】`,
            ...primarySummaryLines,
            ``,
            `【${campaign.secondaryCategoryLabel}】`,
            ...secondarySummaryLines,
            ``,
            `【超過補助上限 ($${drinkLimit}) 需補差額名單（共 ${copayLines.length} 人，合計 +$${totalCopayAmount}）】`,
            ...(copayLines.length > 0 ? copayLines : ["・無人超額"]),
            ``,
            `線上點餐與菜單價目表檢視網址：`,
            pageUrl
        ].join("\n");
    }

    exportSurveyVotesToCsv(campaign, employees) {
        const votesMap = campaign.votes || {};
        const drinkLimit = Number(campaign.drinkSubsidyLimit) || 0;
        const primaryLimit = Number(campaign.primarySubsidyLimit) || 0;

        const rows = [[
            "員工姓名",
            "填答狀態",
            "主餐餐廳",
            "主餐品項",
            "主餐單價",
            "飲料店家",
            "飲品品項",
            "甜度",
            "冰塊/溫度",
            "飲品單價",
            `飲料補助上限(${drinkLimit}元)`,
            "需自付差額(元)",
            "個人備註",
            "登記時間"
        ]];

        employees.forEach((emp) => {
            const v = votesMap[emp];
            if (v) {
                const mPrice = Number(v.primaryPrice) || 0;
                const dPrice = Number(v.secondaryPrice) || 0;
                const mCopay = primaryLimit > 0 ? Math.max(0, mPrice - primaryLimit) : (Number(v.primaryCopay) || 0);
                const dCopay = drinkLimit > 0 ? Math.max(0, dPrice - drinkLimit) : (Number(v.secondaryCopay) || 0);
                rows.push([
                    emp,
                    "已完成",
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
                rows.push([emp, "尚未填寫", "", "", "", "", "", "", "", "", drinkLimit, "", "", ""]);
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
        link.setAttribute("download", `${campaign.title}_點餐與補差額統計報表.csv`);
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
