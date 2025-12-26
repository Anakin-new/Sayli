const CACHE_NAME = 'sayli-garden-v2';

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

// --- KEEP YOUR ASSETS LIST AT THE TOP ---

// Install Event: Forces the new service worker to become active immediately
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Event: Cleans up old v1 cache and takes control of the app
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            // This line forces all open windows/tabs to use the new version immediately
            return self.clients.claim();
        })
    );
});

// Fetch Event: Serves files from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});







