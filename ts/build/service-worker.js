"use strict";
var store = "sample_store";
var assets = [
    // put all the files you want cached here
    "/",
];
self.addEventListener("install", function (e) {
    e.waitUntil(assets.forEach(function (asset) {
        fetch(asset)
            .then(function (res) {
            var response = res.clone();
            caches.open(store).then(function (cache) {
                cache.put(e.request, response);
            });
            return res;
        })["catch"](function (err) { return console.log(err); });
    }));
    self["skipWaiting"]();
});
self.addEventListener("activate", function (e) {
    e.waitUntil(caches.keys().then(function (cach) {
        if (cach !== store) {
            return caches["delete"](cach);
        }
    }));
    return self.clients.claim();
});
self.addEventListener("fetch", function (e) {
    e.waitUntil(e.respondWith(fetch(e.request)
        .then(function (res) {
        var response = res.clone();
        caches.open(store).then(function (cache) {
            console.log(response, "    fetching");
            cache.put(e.request, response);
        });
        return res;
    })["catch"](function () { return caches.match(e.request).then(function (res) { return res; }); })));
    self["skipWaiting"]();
});
//# sourceMappingURL=service-worker.js.map