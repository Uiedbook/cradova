define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /**
    Write CSS media in javascript
    
    @example
    
    _.media("min-width: 790px",
    ["#container",
    {
        width: "100%",
        height: "100%",
        "background-color": "#0000"
    }],
    
    ["#header",
    {
        width: "100%",
        height: "20%",
        "background-color": "#fff"
    }]
    )
    */
    function media(value) {
        var properties = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
        }
        /* This is for creating css
       @media styles using javascipt*/
        var styS = "@media only screen and (" + value + ") " + "{", styE = "}";
        var style = "  ", aniSty = " ";
        var proplen = properties.length;
        var totalAnimation, Animation = "  ";
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
    exports["default"] = media;
});
//# sourceMappingURL=media.js.map