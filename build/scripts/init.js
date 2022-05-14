var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./css.js"], function (require, exports, css_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    css_js_1 = __importDefault(css_js_1);
    const Init = function (config) {
        const Wrapper = document.createElement("div");
        Wrapper.className = "Cradova-app-wrappper";
        Wrapper.id = "app-wrapper";
        (0, css_js_1.default)(".Cradova-app-wrappper", {
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "flex-direction": "column",
            width: "100%",
        });
        Wrapper.stateID = "Cradova-app-wrappper-id";
        document.body.append(Wrapper);
        return Wrapper;
    };
    exports.default = Init;
});
//# sourceMappingURL=init.js.map