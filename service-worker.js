const CACHE_NAME = "japan-travel-phrase-pwa-v12";
const DATA_CACHE_NAME = "japan-travel-phrase-pwa-data-v12";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        const oldKeys = keys.filter((key) => key !== CACHE_NAME && key !== DATA_CACHE_NAME);
        return Promise.all(oldKeys.map((key) => caches.delete(key)))
          .then(() => self.clients.claim());
      })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  if (new URL(request.url).pathname.endsWith("/phrases.json")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => (
        cache.match(request).then((cached) => {
          const fresh = fetch(request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type === "opaque") return response;
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || fresh;
        })
      ))
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
