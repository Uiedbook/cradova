const store = "app_store_v1";

const assets = [
  // put all the files you want cached here
  "/",
];

self.addEventListener("install", function (e: any) {
  e.waitUntil(
    assets.forEach((asset) => {
      fetch(asset)
        .then(async (res) => {
          const response = res.clone();
          caches.open(store).then((cache) => {
            cache.put(e.request, response);
          });
          return res;
        })
        .catch((err) => console.log(err));
    })
  );
});

self.addEventListener("activate", function (e: any) {
  e.waitUntil(
    caches.keys().then((cach) => {
      if (cach[0] !== store) {
        return caches.delete(cach[0]);
      }
    })
  );
});
// need request interceptor to serve /pages without extensions the index.html file from cache iff svs
self.addEventListener("fetch", function (e: any) {
  e.waitUntil(
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const response = res.clone();
          caches.open(store).then((cache) => {
            // ! FIXME: put server url where page files comes from as origin
            // ? why? you don't want to cache other extensions files along if  a page has some

            const origin = self.origin;
            if (e.request.url.includes(origin)) {
              cache.put(e.request, response);
            }
          });
          return res;
        })
        .catch(() => caches.match(e.request).then((res) => res))
    )
  );
});
