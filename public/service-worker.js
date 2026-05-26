// This is the cache name for the current version of the app.
// If we make big changes later, we can change this to v3, v4, etc.
const CACHE_NAME = "games-app-cache-v3";

// These are the basic files we want available offline.
// The "./" path helps the app load from the GitHub Pages project folder.
const APP_SHELL_FILES = [
  "./",
  "./manifest.webmanifest",
];

// These files should always be fetched fresh from the network.
// app-version.json must not be cached, because it is used to detect updates.
const NEVER_CACHE_FILES = ["app-version.json"];

// When the service worker installs, save the basic app files.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES))
  );

  self.skipWaiting();
});

// When the service worker activates, delete old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

// For app requests, try the network first.
// If the network fails, use the cached version.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  // Only handle requests from this app.
  // This avoids caching browser extensions or outside websites.
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  const shouldNeverCache = NEVER_CACHE_FILES.some((fileName) =>
    requestUrl.pathname.endsWith(fileName)
  );

  if (shouldNeverCache) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful responses.
        if (!response || !response.ok) {
          return response;
        }

        const responseCopy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});