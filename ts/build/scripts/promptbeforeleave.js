define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function PromptBeforeLeave() {
        window.addEventListener("beforeunload", function (ev) {
            var e = ev || window.event;
            if (e) {
                e.preventDefault();
                e.returnValue = "";
            }
            return "";
        });
    }
    exports["default"] = PromptBeforeLeave;
});
//# sourceMappingURL=promptbeforeleave.js.map