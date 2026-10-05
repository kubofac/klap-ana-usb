const CACHE_NAME = 'KLAP-ANA-USB-v1';

// アプリ本体の自ドメイン内静的ファイルのみキャッシュ
const urlsToCache = [
  './',
  './index.html',
  './g_usb2.html',
  './g_usbw.html',
  './manifest.json',
  './192.png',
  './512.png',
  './circuit_data.js'
];

// インストールイベント
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// フェッチイベント
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // オフライン時のエラーハンドリング（必要に応じて）
      });
    })
  );
});

// アクティベートイベント（古いキャッシュの削除）
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

});



