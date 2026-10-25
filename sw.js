// Service worker: cache the app shell so it runs offline once installed.
//
// Bump the cache name whenever the app shell changes so installed clients
// drop their old copy on the next visit. Changing this file at all also
// triggers a service-worker update, which is what re-runs `install`.
const CACHE = 'arabic-dialects-v4';

const APP_SHELL = [
    './',
    './index.html',
    './css/style.css',
    './data/dialects.js',
    './data/roots.js',
    './data/lessonData.js',
    './data/sentences.js',
    './js/sentenceEngine.js',
    './js/app.js',
    './manifest.webmanifest',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/icon-maskable-512.png',
    './assets/apple-touch-icon.png'
];

// Anything under these prefixes is code or curriculum data: small, and it has
// to stay current. Cache-first would pin users to an old curriculum forever.
const FRESH_PREFIXES = ['./data/', './js/', './css/', './manifest.webmanifest'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Network-first, falling back to the cache only when offline. Keeps the app
// usable offline without ever serving stale lessons to a user who is online.
function networkFirst(request) {
    return fetch(request).then(response => {
        if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
    }).catch(() => caches.match(request));
}

// Cache-first for static images: these never change between releases.
function cacheFirst(request) {
    return caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
            if (response && response.status === 200 && response.type === 'basic') {
                const copy = response.clone();
                caches.open(CACHE).then(cache => cache.put(request, copy));
            }
            return response;
        });
    });
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    // Pages themselves are already network-first so updates land.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const local = path.startsWith(new URL(self.registration.scope).pathname)
        ? '.' + path.slice(new URL(self.registration.scope).pathname.length - 1)
        : path;

    const isFresh = FRESH_PREFIXES.some(p => local === p || local.startsWith(p));

    event.respondWith(isFresh ? networkFirst(request) : cacheFirst(request));
});
