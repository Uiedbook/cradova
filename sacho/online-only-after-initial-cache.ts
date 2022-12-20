let CACHE_VERSION = 1;
let CURRENT_CACHES: Record<string, any> = {
  prefetch: "prefetch-cache-v" + CACHE_VERSION,
};

self.addEventListener("install", function (event: any) {
  let now = Date.now();
  let urlsToPrefetch = ["/"];
  console.log("Handling install event. Resources to prefetch:", urlsToPrefetch);
  event.waitUntil(
    caches
      .open(CURRENT_CACHES.prefetch)
      .then(async function (cache) {
        let cachePromises = urlsToPrefetch.map(async function (urlToPrefetch) {
          let url = new URL(urlToPrefetch, location.href);

          url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
          let request = new Request(url.href, { mode: "no-cors" });
          try {
            const response = await fetch(request);
            if (response.status >= 400) {
              throw new Error(
                "request for " +
                  urlToPrefetch +
                  " failed with status " +
                  response.statusText
              );
            }
            return await cache.put(urlToPrefetch, response);
          } catch (error) {
            console.error("Not caching " + urlToPrefetch + " due to " + error);
          }
        });

        await Promise.all(cachePromises);
        console.log("Pre-fetching complete.");
      })
      .catch(function (error) {
        console.error("Pre-fetching failed:", error);
      })
  );
});

self.addEventListener("activate", function (event: any) {
  let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log("Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event: any) {
  console.log("Handling fetch event for", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("Found response in cache:", response);

        return response;
      }

      console.log("No response found in cache. About to fetch from network...");
      return fetch(event.request)
        .then(function (res) {
          console.log("Response from network is:", res);
          const response = res.clone();
          caches.open(CURRENT_CACHES.prefetch).then((cache) => {
            cache.put(event.request, response);
          });
          return response;
        })
        .catch(function (error) {
          console.error("Fetching failed:", error);
          throw error;
        });
    })
  );
});
