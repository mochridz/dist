const CACHE_NAME = 'sembagi-green-v1'
const urlsToCache = [
  '/sembagigreenresources/',
  './assets/css/index.css',
  './assets/js/index.js',
  './assets/images/14-logo-navbar.png',
  './assets/images/2-gogreen.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
]

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    })
  )
})

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
