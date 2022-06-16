define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ls = {};
    ls.store = function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    };
    ls.retrieve = function (name) {
        return localStorage.getItem(name);
    };
    ls.remove = function (name) {
        localStorage.removeItem(name);
    };
    ls.getKey = function (index) {
        return window.localStorage.key(index);
    };
    ls.clear = function () {
        localStorage.clear();
    };
    exports["default"] = ls;
});
//# sourceMappingURL=localStorage.js.map