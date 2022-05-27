"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CACHE_VERSION = 1;
var CURRENT_CACHES = {
    prefetch: "prefetch-cache-v" + CACHE_VERSION
};
self.addEventListener("install", function (event) {
    var now = Date.now();
    var urlsToPrefetch = ["/"];
    // All of these logging statements should be visible via the "Inspect" interface
    // for the relevant SW accessed via chrome://serviceworker-internals
    console.log("Handling install event. Resources to prefetch:", urlsToPrefetch);
    event.waitUntil(caches
        .open(CURRENT_CACHES.prefetch)
        .then(function (cache) {
        return __awaiter(this, void 0, void 0, function () {
            var cachePromises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachePromises = urlsToPrefetch.map(function (urlToPrefetch) {
                            return __awaiter(this, void 0, void 0, function () {
                                var url, request, response, error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            url = new URL(urlToPrefetch, location.href);
                                            // Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
                                            // This is particularly important when precaching resources that are later used in the
                                            // fetch handler as responses directly, without consulting the network (i.e. cache-first).
                                            // If we were to get back a response from the HTTP browser cache for this precaching request
                                            // then that stale response would be used indefinitely, or at least until the next time
                                            // the service worker script changes triggering the install flow.
                                            url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
                                            request = new Request(url, { mode: "no-cors" });
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            return [4 /*yield*/, fetch(request)];
                                        case 2:
                                            response = _a.sent();
                                            if (response.status >= 400) {
                                                throw new Error("request for " +
                                                    urlToPrefetch +
                                                    " failed with status " +
                                                    response.statusText);
                                            }
                                            return [4 /*yield*/, cache.put(urlToPrefetch, response)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                        case 4:
                                            error_1 = _a.sent();
                                            console.error("Not caching " + urlToPrefetch + " due to " + error_1);
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [4 /*yield*/, Promise.all(cachePromises)];
                    case 1:
                        _a.sent();
                        console.log("Pre-fetching complete.");
                        return [2 /*return*/];
                }
            });
        });
    })["catch"](function (error) {
        console.error("Pre-fetching failed:", error);
    }));
});
self.addEventListener("activate", function (event) {
    // Delete all caches that aren't named in CURRENT_CACHES.
    // While there is only one cache in this example, the same logic will handle the case where
    // there are multiple versioned caches.
    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
        return CURRENT_CACHES[key];
    });
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (expectedCacheNames.indexOf(cacheName) === -1) {
                // If this cache name isn't present in the array of "expected" cache names, then delete it.
                console.log("Deleting out of date cache:", cacheName);
                return caches["delete"](cacheName);
            }
        }));
    }));
});
self.addEventListener("fetch", function (event) {
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
            var response = res.clone();
            caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
                cache.put(event.request, response);
            });
            return response;
        })["catch"](function (error) {
            // This catch() will handle exceptions thrown from the fetch() operation.
            // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
            // It will return a normal response object that has the appropriate error code set.
            console.error("Fetching failed:", error);
            throw error;
        });
    }));
});
//# sourceMappingURL=online-only-after-initial-cache.js.map