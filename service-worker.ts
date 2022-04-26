const store = "sample_store";

const assets = [
  // put all the files you want cached here
  "/",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    assets.forEach((asset) => {
      fetch(asset)
        .then((res) => {
          const response = res.clone();
          caches.open(store).then((cache) => {
            cache.put(e.request, response);
          });
          return res;
        })
        .catch((err) => console.log(err));
    })
  );
  self["skipWaiting"]();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((cach) => {
      if (cach !== store) {
        return caches.delete(cach);
      }
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  e.waitUntil(
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const response = res.clone();
          caches.open(store).then((cache) => {
            console.log(response, "    fetching");
            cache.put(e.request, response);
          });
          return res;
        })
        .catch(() => caches.match(e.request).then((res) => res))
    )
  );
  self["skipWaiting"]();
});
