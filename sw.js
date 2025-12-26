const CACHE_NAME = 'sayli-garden-v4';

// List every file needed to make the app run offline
const ASSETS = [
    './',                 // Covers index.html if it's the root
    './index.html',       // Explicitly add login/landing page
    './dashboard.html',
    './syllabus.html',
    './history.html',
    './library.html',
    './notes.html',
    './test.html', 
    './style-sheets/auth.css',
    './style-sheets/dashboard.css',
    './style-sheets/syllabus.css',
    './style-sheets/library.css',
    './style-sheets/notes.css',
    './js/dashboard.js',
    './js/library.js',
    './js/auth.js',
    './js/syllabus-script.js',
    './js/test.js',              // Added: The test logic (timer, scoring)
    './js/test-data.js',         // Added: Your 50 Percentage questions
    './assets/new.mp4',
    './assets/pop.mp3',          // Added: Your custom sound file
    './manifest.json',
    './assets/icon.png'        // Added: Your main icon
     
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




