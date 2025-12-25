const CACHE_NAME = 'sayli-garden-v1';

// List every file needed to make the app run offline
const ASSETS = [
    './dashboard.html',
    './syllabus.html',
    './history.html',
    './library.html',
    './notes.html',
    './style-sheets/dashboard.css',
    './style-sheets/syllabus.css',
    './style-sheets/library.css',
    './style-sheets/notes.css',
    './js/dashboard.js',
    './js/library.js',
    './js/syllabus-script.js',
    './assets/new.mp4',
    './manifest.json',
    './assets/icon-192.png',
    './assets/icon-512.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});