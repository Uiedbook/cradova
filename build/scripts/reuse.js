define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function reuse(element) {
        return function () {
            var incoming = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                incoming[_i] = arguments[_i];
            }
            var childrens2rd, props, text;
            for (var i = 0; i < incoming.length; i++) {
                if (typeof incoming[i] === "function" ||
                    incoming[i] instanceof HTMLElement) {
                    if (Array.isArray(childrens2rd)) {
                        childrens2rd.push(incoming[i]);
                    }
                    else {
                        childrens2rd = [incoming[i]];
                    }
                    continue;
                }
                //
                if (!(incoming[i] instanceof HTMLElement) &&
                    typeof incoming[i] === "object") {
                    props = incoming[i];
                    continue;
                }
                if (typeof incoming[i] === "string") {
                    text = incoming[i];
                    continue;
                }
            }
            //
            // dynamic props
            //
            if (props && typeof props === "object" && !Array.isArray(props)) {
                for (var prop in props) {
                    if (prop === "style") {
                        for (var _a = 0, _b = Object.entries(props[prop]); _a < _b.length; _a++) {
                            var _c = _b[_a], k = _c[0], v = _c[1];
                            element.style[k] = v;
                        }
                        continue;
                    }
                    if (prop === "text") {
                        element.innerText = props[prop];
                        continue;
                    }
                    if (prop === "class") {
                        element.classList.add(props[prop]);
                        continue;
                    }
                    element[prop] = props[prop];
                }
            }
            if (childrens2rd && childrens2rd[0]) {
                for (var i = 0; i < childrens2rd.length; i++) {
                    if (typeof childrens2rd[i] === "function") {
                        element.append(childrens2rd[i](props));
                        continue;
                    }
                    element.append(childrens2rd[i]);
                }
            }
            if (text) {
                element.append(text);
            }
            if (element.stateID) {
                // adding cradova dynamic signature
                element.classList.add("cra_child_doc");
            }
            return element;
        };
    }
    exports["default"] = reuse;
});
//# sourceMappingURL=reuse.js.map