const CACHE_NAME = 'khet-bari-light-v5';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker and Cache Assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching App Assets...');
      return cache.addAll(assets);
    })
  );
});

// Activate and Clean Old Caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetching assets from cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
