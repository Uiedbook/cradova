define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // for making the dom elements fulscreen
    function fullScreen(e) {
        return {
            set() {
                e.requestFullscreen().catch((err) => {
                    throw err;
                });
            },
            exist() {
                document.exitFullscreen();
            },
        };
    }
    exports.default = fullScreen;
});
/*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()
*/
//# sourceMappingURL=fullscreen.js.map