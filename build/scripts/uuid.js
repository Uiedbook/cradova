define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function uuid(len) {
        if (len === void 0) { len = 10; }
        function dec2hex(dec) {
            return dec.toString(16).padStart(2, "0");
        }
        len = Math.round(len / 2);
        return Array.from(crypto.getRandomValues(new Uint8Array(len || 10)), dec2hex).join("");
    }
    exports["default"] = uuid;
});
//# sourceMappingURL=uuid.js.map