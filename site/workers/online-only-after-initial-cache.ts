let CACHE_VERSION = 1;
let CURRENT_CACHES: Record<string, any> = {
  prefetch: "prefetch-cache-v" + CACHE_VERSION,
};

self.addEventListener("install", function (event: any) {
  let now = Date.now();

  let urlsToPrefetch = ["/"];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log("Handling install event. Resources to prefetch:", urlsToPrefetch);

  event.waitUntil(
    caches
      .open(CURRENT_CACHES.prefetch)
      .then(async function (cache) {
        let cachePromises = urlsToPrefetch.map(async function (urlToPrefetch) {
          // This constructs a new URL object using the service worker's script location as the base
          // for relative URLs.
          let url = new URL(urlToPrefetch, location.href);
          // Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
          // This is particularly important when precaching resources that are later used in the
          // fetch handler as responses directly, without consulting the network (i.e. cache-first).
          // If we were to get back a response from the HTTP browser cache for this precaching request
          // then that stale response would be used indefinitely, or at least until the next time
          // the service worker script changes triggering the install flow.
          url.search += (url.search ? "&" : "?") + "cache-bust=" + now;

          // It's very important to use {mode: 'no-cors'} if there is any chance that
          // the resources being fetched are served off of a server that doesn't support
          // CORS (http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
          // In this example, www.chromium.org doesn't support CORS, and the fetch()
          // would fail if the default mode of 'cors' was used for the fetch() request.
          // The drawback of hardcoding {mode: 'no-cors'} is that the response from all
          // cross-origin hosts will always be opaque
          // (https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#cross-origin-resources)
          // and it is not possible to determine whether an opaque response represents a success or failure
          // (https://github.com/whatwg/fetch/issues/14).
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
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
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
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("Found response in cache:", response);

        return response;
      }

      console.log("No response found in cache. About to fetch from network...");

      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
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
          // This catch() will handle exceptions thrown from the fetch() operation.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error("Fetching failed:", error);

          throw error;
        });
    })
  );
});

export {};
