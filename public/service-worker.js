const cacheName = "svelte-hn-sw-" + Date.now()

const filesToCache = [
  "/index.html",
  "/build/bundle.css",
  "/build/bundle.js",
  "/fonts/Inter.woff2",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName)
          }
        })
      )
    })
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
