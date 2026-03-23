const CACHE_NAME = "evaluate-satisfaction-v3";
const urlsToCache = ["/", "/manifest.json", "/favicon.ico", "/pwa-icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME && key.startsWith("evaluate-satisfaction-")) {
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isNavigationRequest = event.request.mode === "navigate";
  const isNextAsset = isSameOrigin && requestUrl.pathname.startsWith("/_next/");

  if (isNavigationRequest || isNextAsset) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        if (isNavigationRequest) {
          const cachedHome = await caches.match("/");
          if (cachedHome) {
            return cachedHome;
          }
        }
        throw new Error("Network unavailable and no cache match");
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (isSameOrigin) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
