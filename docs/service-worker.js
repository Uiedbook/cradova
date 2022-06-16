// This is the "Offline copy of pages" service worker

const CACHE_VERSION = 1;
const CACHES = {
  prefetch: "cradova-docs-prefetch-cache-v" + CACHE_VERSION,
};
const urlsToPrefetch = ["/"];

const deleteCache = async (key) => {
  await caches.delete(key);
};
const enableNavigationPreload = async () => {
  // Enable navigation preloads!
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
  await deleteOldCaches();
};

const deleteOldCaches = async () => {
  const cacheKeepList = ["v2"];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHES.prefetch);
  for (let i = 0; i < resources.length; i++) {
    await cache.add(resources[i]);
  }
};

const putInCache = async (request, response) => {
  if (request.method === "POST") {
    return;
  }
  const cache = await caches.open(CACHES.prefetch);
  try {
    await cache.put(request, response);
    return " ";
  } catch (error) {
    return "";
  }
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use (and cache) the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

// Enable navigation preload

self.addEventListener("activate", (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(urlsToPrefetch));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    })
  );
});
