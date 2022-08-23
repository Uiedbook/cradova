const store = "sample_store";

const assets = [
  // put all the files you want cached here
  "/",
];

self.addEventListener("install", function (e: any) {
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
  const sf = self as any;
  sf.skipWaiting();
});

self.addEventListener("activate", function (e: any) {
  e.waitUntil(
    caches.keys().then((cach) => {
      console.log(cach, store);
      for (let i = 0; i < cach.length; i++) {
        if (cach[i] !== store) {
          return caches.delete(cach[i]);
        }
      }
      return undefined;
    })
  );
  const sf = self as any;
  return sf.clients.claim();
});

self.addEventListener("fetch", function (e: any) {
  e.waitUntil(
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const response = res.clone();
          caches.open(store).then((cache) => {
            cache.put(e.request, response);
          });
          return res;
        })
        .catch(() => caches.match(e.request).then((res) => res))
    )
  );
  const sf = self as any;
  sf.skipWaiting();
});

export {};
