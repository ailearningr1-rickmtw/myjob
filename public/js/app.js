/**
 * 工作中樞平台前端核心邏輯 (ES6+)
 * 負責管理五大預留主題資料、路由切換、關鍵字檢索、主題配色切換與本地端構想筆記儲存
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
        title: "主題五：跨域資源與外部連結導航",
        subtitle: "Resource & Portal Hub",
        status: "預留擴充區",
        description: "彙整日常高頻使用的內部系統入口、雲端協作平台、API 文件與外部參考資源的快速跳板。",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
        slots: [
            { name: "常用工作平台與系統快速入口", tag: "SLOT-5A", detail: "分類收納每日必開的後台管理、信箱與雲端硬碟連結。" },
            { name: "AI 協作工具與模型提示詞庫", tag: "SLOT-5B", detail: "整理高效 Prompt 範本與常用 AI 輔助工作流入口。" },
            { name: "設計規範與外部參考素材庫", tag: "SLOT-5C", detail: "集中保存品牌色票、字型規範與公開技術資源連結。" }
        ]
    }
];

const STORAGE_KEYS = {
    THEME_MODE: "aero_workspace_theme_mode",
    SCRATCHPAD: "aero_workspace_scratchpad",
    IDEA_BACKLOG: "aero_workspace_idea_backlog"
};

/**
 * 應用程式狀態管理類別
 */
class WorkspaceApp {
    constructor() {
        this.activeRoute = "overview";
        this.searchQuery = "";
        this.ideaBacklog = this.loadIdeaBacklog();

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
                this.renderFocusSection(themeObj);
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
                        <p class="theme-desc">請嘗試其他關鍵字，或清空搜尋欄位以檢視完整五大預留主題。</p>
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
