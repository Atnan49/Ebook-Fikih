const CACHE_NAME = 'ebook-fikih-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ebook.html',
  './kuis.html',
  './developer.html',
  './manifest.json',
  './css/common.css',
  './css/index.css',
  './css/ebook.css',
  './css/kuis.css',
  './js/app.js',
  './js/data.js',
  './js/quiz.js',
  './public/fonts/OpenDyslexic-Regular.woff2',
  './public/images/muslim_children_reading.webp',
  './audio/hadis_shollu.mp3',
  './audio/quran_2_43.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Non-critical asset cache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Network First strategy with automatic dynamic cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// ponytail: comprehensive PWA asset caching for maximum offline performance
