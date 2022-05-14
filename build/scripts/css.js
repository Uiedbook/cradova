/**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function css(indentifier, properties) {
        /*This is for creating
       css styles using javascipt*/
        const styS = "" + indentifier + "" + "{";
        const styE = "}";
        let style = "", totalStyle = "";
        for (const [k, v] of Object.entries(properties)) {
            style += "" + k + ": " + v + ";";
        }
        let styleTag = document.querySelector("style");
        if (styleTag !== null) {
            totalStyle += styleTag.innerHTML;
            totalStyle += styS + style + styE;
            styleTag.innerHTML = totalStyle;
            return;
        }
        styleTag = document.createElement("style");
        totalStyle += styleTag.innerHTML;
        totalStyle += styS + style + styE;
        styleTag.innerHTML = totalStyle;
        document.head.append(styleTag);
    }
    exports.default = css;
});
//# sourceMappingURL=css.js.map