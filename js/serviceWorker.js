const staticMemoryCards = "memory-cards-site";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/index.js",
  "/js/gameData.js",
  "/js/router.js",
  "/js/routers.js",
  "/favicon.png",
  "/sounds/lose.mp3",
  "/sounds/win.mp3",

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
