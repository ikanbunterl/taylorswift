// Service Worker untuk Taylor Swift Eras Website
// Ini memungkinkan website bekerja offline dan menambah ke home screen

const CACHE_NAME = 'taylor-eras-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap'
];

// Install event - cache files saat first visit
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if available
                if (response) {
                    return response;
                }

                // Otherwise, fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if response is not ok
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the response
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return offline page if available
                        return caches.match('/index.html');
                    });
            })
    );
});

// Background sync untuk form submissions (jika ada)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-fan-messages') {
        event.waitUntil(syncFanMessages());
    }
});

async function syncFanMessages() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const messages = JSON.parse(localStorage.getItem('fanMessages') || '[]');
        
        // Dalam implementasi nyata, ini akan mengirim ke server
        console.log('Syncing fan messages:', messages);
        
        return Promise.resolve();
    } catch (error) {
        console.error('Error syncing messages:', error);
        return Promise.reject(error);
    }
}

// Push notifications (optional)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23c9a961" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="120" fill="white" font-family="serif" font-weight="bold">✨</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23c9a961" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="120" fill="white">✨</text></svg>',
        tag: 'taylor-eras-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('Taylor Swift Eras', options)
    );
});

// Notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                // Check if there's already a window/tab open
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not, open a new window/tab
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// Periodic background sync (untuk check updates)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'check-updates') {
        event.waitUntil(checkUpdates());
    }
});

async function checkUpdates() {
    try {
        const response = await fetch('/manifest.json');
        console.log('Checking for updates...');
        return Promise.resolve();
    } catch (error) {
        console.error('Error checking updates:', error);
        return Promise.reject(error);
    }
}

console.log('Service Worker registered successfully!');
