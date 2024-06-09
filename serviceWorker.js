const staticMemoryCards = "memory-cards-site";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/index.js",
  "/js/gameData.js",
  "/js/router.js",
  "/js/routers.js",
  "/favicon.ico",
  "/sounds/lose.mp3",
  "/sounds/win.mp3",
  
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",


];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticMemoryCards).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
