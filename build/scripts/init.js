var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./css.js"], function (require, exports, css_js_1) {
    "use strict";
    exports.__esModule = true;
    css_js_1 = __importDefault(css_js_1);
    var Init = function (config) {
        var Wrapper = document.createElement("div");
        Wrapper.className = "Cradova-app-wrappper";
        Wrapper.id = "app-wrapper";
        css_js_1["default"](".Cradova-app-wrappper", {
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "flex-direction": "column",
            width: "100%"
        });
        Wrapper.stateID = "Cradova-app-wrappper-id";
        document.body.append(Wrapper);
        return Wrapper;
    };
    exports["default"] = Init;
});
//# sourceMappingURL=init.js.map