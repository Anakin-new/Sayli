const CACHE_NAME = 'sayli-garden-v1';

const ASSETS = [
    './dashboard.html',
    './index.html',
    './syllabus.html',
    './history.html',
    './library.html',
    './notes.html',
    './style-sheets/dashboard.css',
    './style-sheets/auth.css',
    './style-sheets/hisory.css',
    './style-sheets/library.css',
    './style-sheets/notes.css',
    './style-sheets/syllabus.css',
    './js/dashboard.js',
    './js/auth.js',
    './js/library.js',
    './js/syllabus-script.js',
    './assets/new.mp4',
    './assets/icon.png',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
