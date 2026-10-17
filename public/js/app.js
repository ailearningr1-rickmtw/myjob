/**
 * 工作中樞平台前端核心邏輯 (ES6+)
 * 負責管理五大主題路由、關鍵字檢索、主題配色切換、構想筆記，
 * 以及「主題五：多元活動與非正式任務中心」旗下之「年終尾牙自動化抽獎系統」
 * （支援特定活動全畫面沉浸模式、左右懸掛動態鞭炮串與喜慶宮燈、獨立匯入頁、大型開獎舞台、手動控制輪動與煙花特效）
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
        status: "含已啟用子系統",
        description: "專門收納公司節慶活動、團隊交流、臨時性趣味工具與非正式專案任務的彈性工作區，目前已內建「年終尾牙自動化抽獎系統」。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        slots: [
            { name: "子系統一：年終尾牙自動化抽獎系統 (已啟用)", tag: "SYS-5A", detail: "進入時自動隱藏上方工作導覽列，展開左右懸掛鞭炮串與紅金喜慶大舞台。" },
            { name: "子系統二：部門聚餐與下午茶隨機抽選器 (預留)", tag: "SLOT-5B", detail: "預留供日後擴充餐廳決策轉盤、飲料團購統計與隨機分組小工具。" },
            { name: "子系統三：團康競賽計分與互動投票看板 (預留)", tag: "SLOT-5C", detail: "預留供日後擴充活動即時排行榜、趣味問答計分與現場互動任務。" }
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

const STORAGE_KEYS = {
    THEME_MODE: "aero_workspace_theme_mode",
    SCRATCHPAD: "aero_workspace_scratchpad",
    IDEA_BACKLOG: "aero_workspace_idea_backlog",
    LOTTERY_STATE: "aero_workspace_lottery_state_v2",
    LOTTERY_PASSCODE: "aero_workspace_lottery_passcode",
    LOTTERY_UNLOCKED_SESSION: "aero_workspace_lottery_unlocked"
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
        this.isRolling = false;
        this.rollingIntervalId = null;
        this.isStageDrawerCollapsed = false;

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
            allParticipants: [],
            remainingPool: [],
            winnersHistory: [],
            prizeConfigs: [...DEFAULT_PRIZE_CONFIGS],
            batchSize: 1,
            currentPrize: "頭獎",
            currentAmount: "NT$ 50,000",
            latestDrawnWinners: [],
            latestDrawnPrize: "",
            latestDrawnAmount: "",
            isRehearsalMode: false
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
        if (hash === "theme-05-draw" || hash === "theme-05-admin") {
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

        // 當進入特定活動（尾牙抽獎舞台或尾牙後台管理頁）時，自動啟用節慶沉浸模式並隱藏上方工作導覽列
        const isFestiveActivity = routeId === "theme-05-draw" || routeId === "theme-05-admin";
        document.body.classList.toggle("is-festive-gala-mode", isFestiveActivity);

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
                <!-- 頂部祥雲金鉤與紅繩 -->
                <rect x="46" y="0" width="8" height="28" fill="#f59e0b" />
                <circle cx="50" cy="28" r="7" fill="#fbbf24" stroke="#b91c1c" stroke-width="2" />
                <!-- 喜慶大紅宮燈 -->
                <rect x="32" y="34" width="36" height="8" rx="3" fill="#fbbf24" stroke="#991b1b" stroke-width="1.5" />
                <ellipse cx="50" cy="72" rx="34" ry="30" fill="#dc2626" stroke="#fbbf24" stroke-width="2.5" />
                <path d="M32 45 C24 62, 24 82, 32 99" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity="0.7" />
                <path d="M68 45 C76 62, 76 82, 68 99" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity="0.7" />
                <circle cx="50" cy="72" r="15" fill="#991b1b" stroke="#fde047" stroke-width="1.5" />
                <text x="50" y="78" text-anchor="middle" fill="#fef08a" font-size="16" font-weight="900" font-family="Noto Sans TC, sans-serif">${emblemText}</text>
                <rect x="34" y="100" width="32" height="8" rx="3" fill="#fbbf24" stroke="#991b1b" stroke-width="1.5" />

                <!-- 中央編織金紅主繩 -->
                <line x1="50" y1="108" x2="50" y2="540" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
                <line x1="50" y1="108" x2="50" y2="540" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 6" />

                <!-- 左右交錯懸掛之八響立體紅金鞭炮串 -->
                <!-- 第 1 對鞭炮 -->
                <g transform="translate(26, 135) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 160) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 第 2 對鞭炮 -->
                <g transform="translate(26, 205) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 230) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 第 3 對鞭炮 -->
                <g transform="translate(26, 275) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 300) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 第 4 對鞭炮 -->
                <g transform="translate(26, 345) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 370) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 第 5 對鞭炮 -->
                <g transform="translate(26, 415) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 440) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#dc2626" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 第 6 對鞭炮 -->
                <g transform="translate(26, 485) rotate(-22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>
                <g transform="translate(74, 508) rotate(22)">
                    <rect x="-10" y="-22" width="20" height="44" rx="4" fill="#e11d48" stroke="#fbbf24" stroke-width="1.5" />
                    <rect x="-10" y="-16" width="20" height="5" fill="#fbbf24" />
                    <rect x="-10" y="11" width="20" height="5" fill="#fbbf24" />
                </g>

                <!-- 底部中國結與流蘇吊穗 -->
                <polygon points="50,535 64,550 50,565 36,550" fill="#dc2626" stroke="#fbbf24" stroke-width="2" />
                <line x1="45" y1="564" x2="42" y2="615" stroke="#dc2626" stroke-width="2.5" />
                <line x1="50" y1="565" x2="50" y2="622" stroke="#f59e0b" stroke-width="2.5" />
                <line x1="55" y1="564" x2="58" y2="615" stroke="#dc2626" stroke-width="2.5" />

                <!-- 鞭炮尾端閃耀金紅火花特效 -->
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
     * 渲染主題五：多元活動與非正式任務中心（年終尾牙抽獎作為其中一個獨立子系統）
     */
    renderTheme05InformalHub(theme) {
        if (!this.focusSection) return;
        const ideas = this.ideaBacklog[theme.id] || [];
        const remainingCount = this.lotteryState.remainingPool.length;
        const winnersCount = this.lotteryState.allParticipants.length - remainingCount;

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
                    <h3 class="section-heading">非正式任務與節慶活動子系統列表 (Informal Subsystems)</h3>
                    <p class="section-subheading">點選進入特定活動系統時，網頁將自動隱藏頂部工作導覽列並切換為專屬節慶活動佈置：</p>
                </div>

                <div class="informal-systems-grid">
                    <!-- 子系統 1：年終尾牙自動化抽獎系統 -->
                    <article class="informal-system-card is-featured">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SYS-5A</span>
                                <span class="theme-status-badge">節慶展演版已啟用</span>
                            </div>
                            <h4 class="theme-title">歲末年終尾牙自動化抽獎系統</h4>
                            <p class="theme-desc">
                                進入後自動切換全畫面喜慶紅金佈置與左右懸掛鞭炮串，並拆分為獨立的「大型開獎展演舞台」與「名單匯入與獎金設定頁」。
                            </p>
                            <p class="theme-route-hint">
                                目前名單池狀態：待抽 ${remainingCount} 人 / 已中獎 ${winnersCount} 人
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

                    <!-- 子系統 2：預留非正式任務 -->
                    <article class="informal-system-card">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SLOT-5B</span>
                                <span class="theme-status-badge">預留擴充槽</span>
                            </div>
                            <h4 class="module-placeholder-title">部門聚餐與下午茶隨機抽選器</h4>
                            <p class="module-placeholder-desc">
                                預留供日後擴充部門聚餐餐廳決策轉盤、下午茶團購點餐彙整與隨機值日生指派等非正式任務。
                            </p>
                        </div>
                        <div class="informal-card-actions">
                            <span class="theme-route-hint">模組插槽待命擴充中</span>
                        </div>
                    </article>

                    <!-- 子系統 3：預留非正式任務 -->
                    <article class="informal-system-card">
                        <div class="informal-card-body">
                            <div class="theme-meta-tags">
                                <span class="theme-code-badge">SLOT-5C</span>
                                <span class="theme-status-badge">預留擴充槽</span>
                            </div>
                            <h4 class="module-placeholder-title">團隊活動計分與互動投票看板</h4>
                            <p class="module-placeholder-desc">
                                預留供日後擴充 Team Building 分組競賽即時積分榜、活動趣味投票與臨時性任務看板。
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
                    <p class="section-subheading">除了年終尾牙抽獎外，若您想到其他非正式活動或趣味工作小工具，可先記錄於此：</p>
                    <form class="idea-form-row" id="idea-add-form">
                        <input type="text" class="idea-input" id="idea-text-input" placeholder="輸入想在主題五新增的其他非正式任務，例如：交換禮物配對器、下午茶轉盤..." required />
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

    /**
     * 尾牙子系統路由入口：支援切換「大型開獎展演舞台 (draw)」與「名單匯入與獎金設定頁 (admin)」
     */
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

    /**
     * 渲染專屬通行碼驗證畫面（同樣帶有左右鞭炮串與喜慶裝飾）
     */
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
                        此抽獎系統採「純本機記憶體與瀏覽器本地儲存」架構，員工姓名絕不會上傳至 GitHub。請輸入通行碼以進入尾牙活動頁面。
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

    /**
     * 獨立頁面 A：人員名單匯入與獎項金額設定頁 (#theme-05-admin)
     */
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
                <!-- 頂部尾牙專屬橫額與子頁面切換列（已自動隱藏占空間的全局導覽列） -->
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
                        <button type="button" class="secondary-btn" id="admin-lock-btn">上鎖</button>
                        <button type="button" class="back-overview-btn" id="back-to-hub-btn">離開活動</button>
                    </div>
                </div>

                <!-- 隱私安全狀態與快速操作列 -->
                <div class="lottery-top-bar">
                    <div class="privacy-shield-info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>【${modeBadgeText}】員工姓名僅保存在本機瀏覽器，絕不上傳至 GitHub。</span>
                    </div>
                    <div class="lottery-top-actions">
                        <button type="button" class="secondary-btn" id="load-rehearsal-btn">載入 30 人彩排測試名單</button>
                        <button type="button" class="secondary-btn" id="change-passcode-btn">修改通行碼</button>
                        <button type="button" class="danger-outline-btn" id="clear-all-lottery-btn">清空所有名單與紀錄 (正式尾牙歸零)</button>
                    </div>
                </div>

                <!-- 雙欄管理版面：左欄人員匯入、右欄獎項金額設定與得獎報表 -->
                <div class="lottery-admin-grid">
                    <!-- 左欄：參與員工名單匯入與待抽池檢視 -->
                    <div class="lottery-panel-card">
                        <div class="lottery-panel-title">
                            <span>一、參與員工名單匯入管理</span>
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

                    <!-- 右欄：獎項與獎金金額預設設定 ＋ 中獎歷史報表匯出 -->
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

    /**
     * 獨立頁面 B：大型開獎展演舞台頁 (#theme-05-draw)
     * 支援：全畫面隱藏頂部工作列、左右懸掛搖曳鞭炮串與宮燈、可收合獎金設定抽屜、手動控制持續輪動、鴻運金榜得獎特效與全螢幕煙花
     */
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

        // 渲染舞台中央大型鴻運金榜得獎人卡片
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
            <!-- 左右兩側懸掛式立體紅金鞭炮串與喜慶宮燈 -->
            ${this.getFestiveSideHangingsHtml()}

            <div class="festive-gala-panel">
                <!-- 緊湊型節慶頂部控制橫額（已隱藏原本占空間的全局導覽列） -->
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

                <!-- 可收合式舞台獎項、臨時加碼金額與抽選人數設定抽屜 -->
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

                <!-- 超大型紅金喜慶展演開獎主舞台 -->
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

                    <!-- 大型鴻運金榜得獎人卡片展示區 -->
                    <div class="grand-winners-showcase" id="grand-winners-showcase">
                        ${showcaseCardsHtml}
                    </div>

                    <!-- 手動控制啟動輪動 / 按下確定開獎巨型按鈕 -->
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

                <!-- 舞台下方最近中獎紅榜紀錄快覽 -->
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

    /**
     * 綁定「名單匯入與獎項金額設定頁」事件
     */
    bindLotteryAdminEvents(theme) {
        const switchToDrawBtn = document.getElementById("switch-to-draw-btn");
        if (switchToDrawBtn) {
            switchToDrawBtn.addEventListener("click", () => {
                window.location.hash = "theme-05-draw";
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

    /**
     * 綁定「大型開獎展演舞台頁」事件
     */
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

    /**
     * 第一階段：按下按鈕後讓員工姓名在舞台卡片上持續高速輪動（直到使用者再次按下按鈕才確定）
     */
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

    /**
     * 第二階段：使用者按下停止按鈕時，立即抽出得獎者、展示鴻運金榜流光特效並觸發全螢幕煙花
     */
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
