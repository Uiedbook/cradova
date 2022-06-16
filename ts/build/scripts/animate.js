/**
Write animation value in javascript

@example

_.animate("popanimation",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function animate(indentifier) {
        var properties = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
        }
        /*This is for creating css
       animations  using javascipt*/
        var styS = "@keyframes " + indentifier + " " + "{", styE = "}", proplen = properties.length;
        var style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
        var animationStep = function (num) {
            for (var _i = 0, _a = Object.entries(properties[num][1]); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                style += "" + k + ": " + v + ";";
            }
            aniSty += "" + properties[num][0] + "{" + style + "}";
            return aniSty;
        };
        for (var i = 0; i < proplen; i++) {
            Animation += animationStep(i);
        }
        var aniStyleTag = document.querySelector("style");
        if (aniStyleTag === null) {
            aniStyleTag = document.createElement("style");
        }
        aniStyleTag.media = "screen";
        totalAnimation = aniStyleTag.innerHTML;
        totalAnimation += styS + Animation + styE;
        aniStyleTag.innerHTML = totalAnimation;
        document.head.append(aniStyleTag);
    }
    exports["default"] = animate;
});
//# sourceMappingURL=animate.js.map