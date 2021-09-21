const staticCacheName = 'static-cache-v1';

const staticAssets = [
    './',
    './index.html',
    './images/icon-192x192.png',
    './style.css',
    './app.js',
    './script.js'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (staticCacheName !== key) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request)
    }));
});
