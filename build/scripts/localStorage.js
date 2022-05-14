define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ls = {};
    ls.store = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };
    ls.retrieve = (name) => {
        return localStorage.getItem(name);
    };
    ls.remove = (name) => {
        localStorage.removeItem(name);
    };
    ls.getKey = (index) => {
        return window.localStorage.key(index);
    };
    ls.clear = () => {
        localStorage.clear();
    };
    exports.default = ls;
});
//# sourceMappingURL=localStorage.js.map