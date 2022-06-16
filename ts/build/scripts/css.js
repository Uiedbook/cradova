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
    exports.__esModule = true;
    function css(indentifier, properties) {
        /*This is for creating
       css styles using javascipt*/
        var styS = "" + indentifier + "" + "{";
        var styE = "}";
        var style = "", totalStyle = "";
        for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            style += "" + k + ": " + v + ";";
        }
        var styleTag = document.querySelector("style");
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
    exports["default"] = css;
});
//# sourceMappingURL=css.js.map