define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var w = function () {
        var childrens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childrens[_i] = arguments[_i];
        }
        var props;
        if (typeof childrens[0] === "object" &&
            !(childrens[0] instanceof HTMLElement)) {
            props = childrens[0];
            childrens = childrens.slice(1, childrens.length);
        }
        var par = document.createDocumentFragment();
        childrens.forEach(function (ch) {
            if (typeof ch === "function") {
                par.append(ch(props));
            }
            else {
                par.append(ch);
            }
        });
        return function () { return par; };
    };
    exports["default"] = w;
});
//# sourceMappingURL=widget.js.map