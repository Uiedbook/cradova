define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function PromptBeforeLeave() {
        window.addEventListener("beforeunload", (ev) => {
            const e = ev || window.event;
            if (e) {
                e.preventDefault();
                e.returnValue = "";
            }
            return "";
        });
    }
    exports.default = PromptBeforeLeave;
});
//# sourceMappingURL=promptbeforeleave.js.map