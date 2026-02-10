/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

// Self-destructing service worker — clears all caches and unregisters itself
// This replaces the old Workbox precaching SW that was serving stale files

// Required by CRA build process — not actually used
// eslint-disable-next-line no-unused-vars
const ignored = self.__WB_MANIFEST;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName))),
      )
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister()),
  );
});
