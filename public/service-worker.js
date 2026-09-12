const CACHE_NAME = "weather-app-v1"
const FILES_TO_CACHE = ["/", "/css/style.css","/css/all.css","/js/script.js","icon-192.png","icon-512.png"]
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})