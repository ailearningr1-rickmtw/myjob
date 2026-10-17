/**
 * 工作中樞平台前端核心邏輯 (ES6+)
 * 負責管理五大主題資料、路由切換、關鍵字檢索、主題配色切換、本地端構想筆記儲存，
 * 以及「主題五：年終尾牙自動化抽獎系統（含專屬通行碼控管與純本機名單處理）」
 */

const WORKSPACE_THEMES = [
    {
        id: "theme-01",
        code: "MOD-01",
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
        title: "主題五：年終尾牙自動化抽獎系統",
        subtitle: "Year-End Lucky Draw Hub",
        status: "已實作啟用",
        description: "專為年終尾牙打造的自動化隨機抽獎系統，具備專屬通行碼防誤觸鎖定、純本機名單匯入（個資不上傳 GitHub）、1/3/5 人批次抽選與 CSV 報表匯出。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>`,
        slots: [
            { name: "專屬通行碼鎖與本機名單匯入 (CSV/貼上)", tag: "LIVE-5A", detail: "名單僅存於本機瀏覽器，絕不上傳雲端，並支援 30 人彩排測試模式。" },
            { name: "電腦隨機抽選引擎 (每次 1 / 3 / 5 人)", tag: "LIVE-5B", detail: "採用密碼學安全亂數搭配數位滾輪動畫，支援自訂獎項名稱與防重複中獎。" },
            { name: "中獎歷史紀錄與 CSV 完整報表匯出", tag: "LIVE-5C", detail: "即時分類紀錄各獎項得主，一鍵匯出 Excel 相容之 UTF-8 CSV 報表。" }
        ]
    }
];

const PRIZE_PRESETS = ["頭獎", "貳獎", "參獎", "肆獎", "伍獎", "特別加碼獎"];

const REHEARSAL_SAMPLE_NAMES = [
    "研發一部 - 陳建宏", "研發一部 - 林雅婷", "研發一部 - 張家豪", "研發一部 - 許詩涵", "研發一部 - 王冠宇",
    "研發二部 - 李宗翰", "研發二部 - 吳佳穎", "研發二部 - 劉承恩", "研發二部 - 蔡宜蓁", "研發二部 - 楊俊傑",
    "產品設計部 - 鄭宇軒", "產品設計部 - 謝欣妤", "產品設計部 - 郭柏翰", "產品設計部 - 洪千惠", "產品設計部 - 邱品睿",
    "營運企劃部 - 曾郁婷", "營運企劃部 - 廖家瑋", "營運企劃部 - 賴佩珊", "營運企劃部 - 徐瑋倫", "營運企劃部 - 周心怡",
    "業務拓展部 - 葉哲瑋", "業務拓展部 - 蘇庭萱", "業務拓展部 - 莊博鈞", "業務拓展部 - 呂思穎", "業務拓展部 - 江政勳",
    "行政管理部 - 何佳琪", "行政管理部 - 蕭宇廷", "行政管理部 - 羅雅雯", "行政管理部 - 高志豪", "行政管理部 - 潘怡君"
];

const STORAGE_KEYS = {
    THEME_MODE: "aero_workspace_theme_mode",
    SCRATCHPAD: "aero_workspace_scratchpad",
    IDEA_BACKLOG: "aero_workspace_idea_backlog",
    LOTTERY_STATE: "aero_workspace_lottery_state_v1",
    LOTTERY_PASSCODE: "aero_workspace_lottery_passcode",
    LOTTERY_UNLOCKED_SESSION: "aero_workspace_lottery_unlocked"
};

/**
 * 應用程式狀態管理類別
 */
class WorkspaceApp {
    constructor() {
        this.activeRoute = "overview";
        this.searchQuery = "";
        this.ideaBacklog = this.loadIdeaBacklog();
        this.lotteryState = this.loadLotteryState();
        this.isDrawing = false;

        this.cacheDomElements();
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
    }

    /**
     * 初始化亮暗色主題（預設為清新科技亮色）
     */
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

    /**
     * 即時數位系統時鐘
     */
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

    /**
     * 快速工作隨手記（自動儲存至 localStorage）
     */
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

    /**
     * 讀取與儲存各主題的擴充構想清單
     */
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

    /**
     * 讀取與儲存主題五尾牙抽獎狀態（僅存於本機瀏覽器）
     */
    loadLotteryState() {
        const defaultState = {
            allParticipants: [],
            remainingPool: [],
            winnersHistory: [],
            batchSize: 1,
            currentPrize: "頭獎",
            latestDrawnWinners: [],
            isRehearsalMode: false
        };
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.LOTTERY_STATE);
            if (raw) {
                const parsed = JSON.parse(raw);
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
            this.syncRouteFromHash();
        });
    }

    handleInitialRoute() {
        this.renderNavTabs();
        this.updateTotalIdeasCounter();
        this.syncRouteFromHash();
    }

    syncRouteFromHash() {
        const hash = window.location.hash.replace("#", "").trim();
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

        if (routeId === "overview") {
            this.overviewSection.classList.remove("is-hidden");
            this.focusSection.classList.add("is-hidden");
            this.renderThemesGrid();
        } else {
            const themeObj = WORKSPACE_THEMES.find((t) => t.id === routeId);
            if (themeObj) {
                this.overviewSection.classList.add("is-hidden");
                this.focusSection.classList.remove("is-hidden");
                if (themeObj.id === "theme-05") {
                    this.renderTheme05Lottery(themeObj);
                } else {
                    this.renderFocusSection(themeObj);
                }
            }
        }
    }

    renderNavTabs() {
        if (!this.navTabsContainer) return;

        const overviewBtnHtml = `
            <button type="button" class="nav-tab-btn" data-route="overview">
                <span>總覽儀表板</span>
            </button>
        `;

        const themeBtnsHtml = WORKSPACE_THEMES.map((theme, idx) => `
            <button type="button" class="nav-tab-btn" data-route="${theme.id}">
                <span class="nav-tab-code">0${idx + 1}</span>
                <span>${theme.title.replace(/^主題[一二三四五]：/, "")}</span>
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
        this.navTabsContainer.querySelectorAll(".nav-tab-btn").forEach((btn) => {
            const route = btn.getAttribute("data-route");
            if (route === this.activeRoute) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
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

            const footerHint = theme.id === "theme-05"
                ? `待抽池人數：${this.lotteryState.remainingPool.length} 人`
                : `已紀錄構想：${customIdeas.length} 項`;

            const btnText = theme.id === "theme-05" ? "進入尾牙抽獎系統" : "進入主題工作區";

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
                        <span class="theme-route-hint">${footerHint}</span>
                        <button type="button" class="explore-btn" data-open-theme="${theme.id}">
                            <span>${btnText}</span>
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
     * 渲染主題五：年終尾牙自動化抽獎系統（含專屬通行碼鎖與本機名單控管）
     */
    renderTheme05Lottery(theme) {
        if (!this.focusSection) return;

        if (!this.isLotteryUnlocked()) {
            this.renderLotteryPasscodeGate(theme);
            return;
        }

        const totalCount = this.lotteryState.allParticipants.length;
        const remainingCount = this.lotteryState.remainingPool.length;
        const winnersCount = totalCount - remainingCount;

        const prizeChipsHtml = PRIZE_PRESETS.map((preset) => {
            const activeClass = this.lotteryState.currentPrize === preset ? "active" : "";
            return `<button type="button" class="prize-chip-btn ${activeClass}" data-prize-preset="${this.escapeHtml(preset)}">${this.escapeHtml(preset)}</button>`;
        }).join("");

        const batchOptions = [1, 3, 5];
        const batchBtnsHtml = batchOptions.map((size) => {
            const activeClass = this.lotteryState.batchSize === size ? "active" : "";
            return `
                <button type="button" class="batch-option-btn ${activeClass}" data-batch-size="${size}">
                    <span class="batch-option-num">${size}</span>
                    <span class="batch-option-label">每次抽出 ${size} 人</span>
                </button>
            `;
        }).join("");

        const stageCardsHtml = this.lotteryState.latestDrawnWinners.length > 0
            ? this.lotteryState.latestDrawnWinners.map((name, idx) => `
                <div class="winner-stage-card">
                    <span class="winner-stage-index">WINNER #0${idx + 1}</span>
                    <span class="winner-stage-name">${this.escapeHtml(name)}</span>
                </div>
            `).join("")
            : `
                <div class="winner-stage-card">
                    <span class="winner-stage-index">READY TO DRAW</span>
                    <span class="winner-stage-name">等待啟動抽選</span>
                </div>
            `;

        const historyHtml = this.lotteryState.winnersHistory.length > 0
            ? this.lotteryState.winnersHistory.map((record) => `
                <li class="winner-history-item">
                    <div class="winner-history-left">
                        <span class="theme-code-badge">第 ${record.round} 輪</span>
                        <span class="winner-prize-badge">${this.escapeHtml(record.prize)}</span>
                        <span class="winner-history-names">${record.winners.map((w) => this.escapeHtml(w)).join("、")}</span>
                    </div>
                    <span class="winner-history-time">${this.escapeHtml(record.time)}</span>
                </li>
            `).join("")
            : `<li class="winner-history-item"><span class="theme-desc">目前尚無開獎紀錄，完成抽選後將自動依序顯示於此。</span></li>`;

        const poolPreviewHtml = this.lotteryState.remainingPool.length > 0
            ? this.lotteryState.remainingPool.map((person) => `
                <span class="pool-person-chip">${this.escapeHtml(person)}</span>
            `).join("")
            : `<span class="theme-desc">目前待抽池為空，請由左側匯入員工名單或載入彩排測試名單。</span>`;

        const modeBadgeText = this.lotteryState.isRehearsalMode ? "彩排測試名單模式" : "正式本機名單模式";

        this.focusSection.innerHTML = `
            <div class="theme-focus-panel">
                <div class="focus-header">
                    <div class="focus-title-group">
                        <div class="theme-meta-tags">
                            <span class="theme-code-badge">${this.escapeHtml(theme.code)}</span>
                            <span class="theme-status-badge">${modeBadgeText}</span>
                        </div>
                        <h2 class="focus-title">${this.escapeHtml(theme.title)}</h2>
                        <p class="theme-desc">${this.escapeHtml(theme.description)}</p>
                    </div>
                    <button type="button" class="back-overview-btn" id="back-to-overview-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>返回五大主題總覽</span>
                    </button>
                </div>

                <!-- 隱私安全狀態與頂部快速操作列 -->
                <div class="lottery-top-bar">
                    <div class="privacy-shield-info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>本機隱私保護中：員工姓名僅儲存於此台電腦瀏覽器，絕不上傳至 GitHub 伺服器。</span>
                    </div>
                    <div class="lottery-top-actions">
                        <button type="button" class="secondary-btn" id="load-rehearsal-btn">載入彩排測試名單 (30人)</button>
                        <button type="button" class="secondary-btn" id="change-passcode-btn">變更通行碼</button>
                        <button type="button" class="secondary-btn" id="lock-lottery-btn">立即鎖定畫面</button>
                        <button type="button" class="danger-outline-btn" id="clear-all-lottery-btn">清空名單與紀錄 (正式尾牙歸零)</button>
                    </div>
                </div>

                <!-- 雙欄抽獎工作區 -->
                <div class="lottery-workspace-grid">
                    <!-- 左欄：名單匯入與待抽池管理 -->
                    <div class="lottery-panel-card">
                        <div class="lottery-panel-title">
                            <span>步驟一：匯入與管理參與員工名單</span>
                            <span class="theme-code-badge">ROSTER</span>
                        </div>

                        <div class="lottery-stats-grid">
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num" id="stat-total-count">${totalCount}</span>
                                <span class="lottery-stat-label">總參與人數</span>
                            </div>
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num" id="stat-remaining-count">${remainingCount}</span>
                                <span class="lottery-stat-label">剩餘待抽人數</span>
                            </div>
                            <div class="lottery-stat-box">
                                <span class="lottery-stat-num" id="stat-winners-count">${winnersCount}</span>
                                <span class="lottery-stat-label">已中獎人數</span>
                            </div>
                        </div>

                        <textarea
                            id="roster-paste-input"
                            class="roster-textarea"
                            placeholder="請在此貼上員工名單（每行一位，例如：研發部 - 王小明，或以逗號分隔），貼上後點擊下方「匯入並更新名單池」..."
                        ></textarea>

                        <div class="file-upload-row">
                            <button type="button" class="primary-btn" id="import-paste-btn">匯入貼上名單</button>
                            <label class="file-upload-label" for="csv-file-input">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <span>讀取 CSV / TXT 檔案</span>
                            </label>
                            <input type="file" id="csv-file-input" class="hidden-file-input" accept=".csv,.txt" />
                            <button type="button" class="secondary-btn" id="reset-pool-only-btn" title="保留員工名單，僅將已中獎者放回待抽池重新抽獎">重置待抽池</button>
                        </div>

                        <div>
                            <div class="lottery-panel-title">
                                <span>目前待抽池名單預覽 (${remainingCount} 人)</span>
                            </div>
                            <div class="pool-preview-chips" id="pool-preview-container">
                                ${poolPreviewHtml}
                            </div>
                        </div>
                    </div>

                    <!-- 右欄：抽選設定、開獎舞台與得獎結果報表 -->
                    <div class="lottery-panel-card">
                        <div class="lottery-panel-title">
                            <span>步驟二：設定獎項與啟動電腦隨機抽選</span>
                            <span class="theme-code-badge">DRAW ENGINE</span>
                        </div>

                        <!-- 獎項設定 -->
                        <div>
                            <p class="section-subheading">點選快速獎項標籤或直接輸入本輪獎項名稱：</p>
                            <div class="prize-preset-chips" id="prize-preset-container">
                                ${prizeChipsHtml}
                            </div>
                        </div>

                        <div class="idea-form-row">
                            <input
                                type="text"
                                id="current-prize-input"
                                class="idea-input"
                                value="${this.escapeHtml(this.lotteryState.currentPrize)}"
                                placeholder="輸入本輪抽出獎項名稱（例如：頭獎 - 現金三萬元）"
                            />
                        </div>

                        <!-- 每次抽選人數 (1 / 3 / 5) -->
                        <div>
                            <p class="section-subheading">選擇單次電腦隨機抽出人數：</p>
                            <div class="batch-size-selector" id="batch-size-container">
                                ${batchBtnsHtml}
                            </div>
                        </div>

                        <!-- 開獎動態舞台 -->
                        <div class="draw-stage-box" id="draw-stage-box">
                            <span class="draw-stage-prize-tag" id="stage-prize-tag">本輪獎項：${this.escapeHtml(this.lotteryState.currentPrize)}（每次抽 ${this.lotteryState.batchSize} 人）</span>
                            <div class="winners-stage-cards" id="winners-stage-cards">
                                ${stageCardsHtml}
                            </div>
                        </div>

                        <button
                            type="button"
                            class="launch-draw-btn"
                            id="launch-draw-btn"
                            ${remainingCount === 0 ? "disabled" : ""}
                        >
                            ${remainingCount === 0 ? "請先於左側匯入員工名單" : `啟動電腦隨機抽選（抽出 ${Math.min(this.lotteryState.batchSize, remainingCount)} 位得獎者）`}
                        </button>

                        <!-- 得獎名單紀錄與匯出 CSV -->
                        <div class="section-toolbar">
                            <span class="lottery-panel-title">中獎結果歷史紀錄 (${this.lotteryState.winnersHistory.length} 輪)</span>
                            <button
                                type="button"
                                class="secondary-btn"
                                id="export-winners-csv-btn"
                                ${this.lotteryState.winnersHistory.length === 0 ? "disabled" : ""}
                            >
                                匯出中獎結果 CSV 報表
                            </button>
                        </div>

                        <ul class="winners-history-list" id="winners-history-list">
                            ${historyHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        this.bindTheme05Events(theme);
    }

    /**
     * 渲染主題五專屬通行碼驗證鎖定畫面
     */
    renderLotteryPasscodeGate(theme) {
        this.focusSection.innerHTML = `
            <div class="theme-focus-panel">
                <div class="focus-header">
                    <div class="focus-title-group">
                        <div class="theme-meta-tags">
                            <span class="theme-code-badge">${this.escapeHtml(theme.code)}</span>
                            <span class="theme-status-badge">安全鎖定控管中</span>
                        </div>
                        <h2 class="focus-title">${this.escapeHtml(theme.title)}</h2>
                        <p class="theme-desc">為保護員工名單隱私並防止尾牙現場誤觸抽獎面板，進入此主題需驗證主持人通行碼。</p>
                    </div>
                    <button type="button" class="back-overview-btn" id="back-to-overview-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>返回五大主題總覽</span>
                    </button>
                </div>

                <div class="passcode-gate-card">
                    <div class="gate-icon-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h3 class="gate-title">主持人通行碼驗證</h3>
                    <p class="gate-desc">
                        此抽獎系統採「純本機記憶體與瀏覽器本地儲存」架構，名單不會上傳至 GitHub。請輸入通行碼以解鎖抽獎控制台。
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
                    <span class="gate-hint">預設管理員通行碼：8888（解鎖後可自訂修改）</span>
                </div>
            </div>
        `;

        const backBtn = document.getElementById("back-to-overview-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                window.location.hash = "overview";
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
                    this.renderTheme05Lottery(theme);
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

    /**
     * 綁定主題五抽獎系統內部互動事件
     */
    bindTheme05Events(theme) {
        const backBtn = document.getElementById("back-to-overview-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                window.location.hash = "overview";
            });
        }

        const lockBtn = document.getElementById("lock-lottery-btn");
        if (lockBtn) {
            lockBtn.addEventListener("click", () => {
                this.setLotteryUnlocked(false);
                this.renderTheme05Lottery(theme);
            });
        }

        const changePassBtn = document.getElementById("change-passcode-btn");
        if (changePassBtn) {
            changePassBtn.addEventListener("click", () => {
                const newCode = window.prompt("請輸入新的主題五主持人通行碼（建議 4 至 8 碼）：", this.getPasscode());
                if (newCode && newCode.trim().length > 0) {
                    this.setPasscode(newCode.trim());
                    window.alert("通行碼已更新完成（儲存於此台電腦瀏覽器）。");
                }
            });
        }

        const rehearsalBtn = document.getElementById("load-rehearsal-btn");
        if (rehearsalBtn) {
            rehearsalBtn.addEventListener("click", () => {
                if (this.isDrawing) return;
                this.lotteryState.allParticipants = [...REHEARSAL_SAMPLE_NAMES];
                this.lotteryState.remainingPool = [...REHEARSAL_SAMPLE_NAMES];
                this.lotteryState.winnersHistory = [];
                this.lotteryState.latestDrawnWinners = [];
                this.lotteryState.isRehearsalMode = true;
                this.saveLotteryState();
                this.renderTheme05Lottery(theme);
            });
        }

        const clearAllBtn = document.getElementById("clear-all-lottery-btn");
        if (clearAllBtn) {
            clearAllBtn.addEventListener("click", () => {
                if (this.isDrawing) return;
                const confirmed = window.confirm("確定要清空所有員工名單與中獎紀錄嗎？（適合彩排結束準備進入正式尾牙時使用）");
                if (!confirmed) return;
                this.lotteryState.allParticipants = [];
                this.lotteryState.remainingPool = [];
                this.lotteryState.winnersHistory = [];
                this.lotteryState.latestDrawnWinners = [];
                this.lotteryState.isRehearsalMode = false;
                this.saveLotteryState();
                this.renderTheme05Lottery(theme);
            });
        }

        const importPasteBtn = document.getElementById("import-paste-btn");
        const rosterTextarea = document.getElementById("roster-paste-input");
        if (importPasteBtn && rosterTextarea) {
            importPasteBtn.addEventListener("click", () => {
                if (this.isDrawing) return;
                const rawText = rosterTextarea.value;
                const names = this.parseParticipantNames(rawText);
                if (names.length === 0) {
                    window.alert("請先在文字框中貼上至少一位員工姓名。");
                    return;
                }
                this.applyImportedParticipants(names, false);
                this.renderTheme05Lottery(theme);
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
                        window.alert("檔案中未偵測到有效的員工姓名，請確認檔案內容。");
                        return;
                    }
                    this.applyImportedParticipants(names, false);
                    this.renderTheme05Lottery(theme);
                };
                reader.readAsText(file, "UTF-8");
            });
        }

        const resetPoolBtn = document.getElementById("reset-pool-only-btn");
        if (resetPoolBtn) {
            resetPoolBtn.addEventListener("click", () => {
                if (this.isDrawing || this.lotteryState.allParticipants.length === 0) return;
                const confirmed = window.confirm("確定要將所有已中獎員工放回待抽池，並清空歷史中獎紀錄嗎？");
                if (!confirmed) return;
                this.lotteryState.remainingPool = [...this.lotteryState.allParticipants];
                this.lotteryState.winnersHistory = [];
                this.lotteryState.latestDrawnWinners = [];
                this.saveLotteryState();
                this.renderTheme05Lottery(theme);
            });
        }

        // 獎項名稱快選與輸入
        const prizeInput = document.getElementById("current-prize-input");
        const stagePrizeTag = document.getElementById("stage-prize-tag");
        if (prizeInput) {
            prizeInput.addEventListener("input", () => {
                this.lotteryState.currentPrize = prizeInput.value.trim() || "尾牙獎項";
                this.saveLotteryState();
                if (stagePrizeTag) {
                    stagePrizeTag.textContent = `本輪獎項：${this.lotteryState.currentPrize}（每次抽 ${this.lotteryState.batchSize} 人）`;
                }
                this.focusSection.querySelectorAll("[data-prize-preset]").forEach((btn) => {
                    if (btn.getAttribute("data-prize-preset") === this.lotteryState.currentPrize) {
                        btn.classList.add("active");
                    } else {
                        btn.classList.remove("active");
                    }
                });
            });
        }

        this.focusSection.querySelectorAll("[data-prize-preset]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const preset = btn.getAttribute("data-prize-preset");
                this.lotteryState.currentPrize = preset;
                this.saveLotteryState();
                this.renderTheme05Lottery(theme);
            });
        });

        // 單次抽選人數 (1 / 3 / 5)
        this.focusSection.querySelectorAll("[data-batch-size]").forEach((btn) => {
            btn.addEventListener("click", () => {
                if (this.isDrawing) return;
                const size = Number(btn.getAttribute("data-batch-size"));
                if ([1, 3, 5].includes(size)) {
                    this.lotteryState.batchSize = size;
                    this.saveLotteryState();
                    this.renderTheme05Lottery(theme);
                }
            });
        });

        // 啟動電腦隨機抽選按鈕
        const launchDrawBtn = document.getElementById("launch-draw-btn");
        if (launchDrawBtn) {
            launchDrawBtn.addEventListener("click", () => {
                this.executeAnimatedRandomDraw(theme);
            });
        }

        // 匯出 CSV 報表按鈕
        const exportCsvBtn = document.getElementById("export-winners-csv-btn");
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener("click", () => {
                this.exportWinnersToCsv();
            });
        }
    }

    /**
     * 解析匯入之員工姓名（支援換行、逗號或分號分隔，並自動去除標題列與重複姓名）
     */
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

    /**
     * 使用密碼學安全亂數 (Web Crypto API) 產生隨機整數
     */
    getCryptoRandomInt(maxExclusive) {
        if (maxExclusive <= 1) return 0;
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % maxExclusive;
    }

    /**
     * 執行數位跳動開獎動畫並抽出 1 / 3 / 5 位得主
     */
    executeAnimatedRandomDraw(theme) {
        if (this.isDrawing) return;
        const pool = this.lotteryState.remainingPool;
        if (!Array.isArray(pool) || pool.length === 0) return;

        this.isDrawing = true;
        const drawCount = Math.min(this.lotteryState.batchSize, pool.length);
        const stageCardsContainer = document.getElementById("winners-stage-cards");
        const launchBtn = document.getElementById("launch-draw-btn");

        if (launchBtn) {
            launchBtn.disabled = true;
            launchBtn.textContent = "電腦高速隨機抽選中...";
        }

        const totalTicks = 16;
        let currentTick = 0;

        const rollInterval = setInterval(() => {
            currentTick += 1;
            if (stageCardsContainer) {
                const tempNames = [];
                for (let i = 0; i < drawCount; i += 1) {
                    const randIdx = this.getCryptoRandomInt(pool.length);
                    tempNames.push(pool[randIdx]);
                }
                stageCardsContainer.innerHTML = tempNames.map((name, idx) => `
                    <div class="winner-stage-card is-rolling">
                        <span class="winner-stage-index">ROLLING #0${idx + 1}</span>
                        <span class="winner-stage-name">${this.escapeHtml(name)}</span>
                    </div>
                `).join("");
            }

            if (currentTick >= totalTicks) {
                clearInterval(rollInterval);
                this.finalizeDrawSelection(drawCount, theme);
            }
        }, 75);
    }

    finalizeDrawSelection(drawCount, theme) {
        const poolCopy = [...this.lotteryState.remainingPool];
        const selectedWinners = [];

        for (let i = 0; i < drawCount; i += 1) {
            const randIndex = this.getCryptoRandomInt(poolCopy.length);
            const [picked] = poolCopy.splice(randIndex, 1);
            selectedWinners.push(picked);
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
        const nextRound = this.lotteryState.winnersHistory.length + 1;

        this.lotteryState.remainingPool = poolCopy;
        this.lotteryState.latestDrawnWinners = selectedWinners;
        this.lotteryState.winnersHistory.unshift({
            round: nextRound,
            prize: this.lotteryState.currentPrize || "尾牙獎項",
            winners: selectedWinners,
            time: timeStr
        });

        this.saveLotteryState();
        this.isDrawing = false;
        this.renderTheme05Lottery(theme);
    }

    /**
     * 匯出完整中獎結果為 UTF-8 BOM CSV 檔案（支援 Excel 直接開啟不亂碼）
     */
    exportWinnersToCsv() {
        if (!this.lotteryState.winnersHistory || this.lotteryState.winnersHistory.length === 0) {
            return;
        }

        const rows = [["抽選輪次", "獎項名稱", "中獎員工姓名", "抽出時間"]];
        const chronological = [...this.lotteryState.winnersHistory].reverse();

        chronological.forEach((record) => {
            record.winners.forEach((winnerName) => {
                rows.push([
                    `第 ${record.round} 輪`,
                    record.prize,
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
