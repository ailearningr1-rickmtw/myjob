/**
 * 尾牙抽獎與工作中樞 PWA 離線快取服務 (Service Worker)
 * 於線上開啟一次後即自動快取核心靜態資源，無網路環境仍可開啟使用。
 */
const CACHE_NAME = "aero-nexus-lottery-offline-v20261114v1";

const CORE_ASSETS = [
    "./",
    "./index.html",
    "./lottery.html",
    "./manifest.webmanifest",
    "./css/style.css?v=20261114v1",
    "./js/app.js?v=20261114v1",
    "./js/lottery_audio_data.js?v=20261114v1",
    "./js/lottery_export_pack.js?v=20261114v1",
    "./js/knowledge_data.js?v=20261105v6",
    "./js/youtube_ai_data.js?v=20261105v6",
    "./audio/grand_win_cheer.mp3"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                CORE_ASSETS.map((assetUrl) => cache.add(assetUrl).catch(() => null))
            );
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const req = event.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(req, { ignoreSearch: false }).then((cachedResp) => {
            if (cachedResp) {
                // 背景檢查更新 (Stale-While-Revalidate)
                fetch(req).then((networkResp) => {
                    if (networkResp && networkResp.ok) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResp.clone()));
                    }
                }).catch(() => {});
                return cachedResp;
            }
            return fetch(req).then((networkResp) => {
                if (networkResp && networkResp.ok) {
                    const cloned = networkResp.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, cloned));
                }
                return networkResp;
            }).catch(() => caches.match(req, { ignoreSearch: true }));
        })
    );
});
