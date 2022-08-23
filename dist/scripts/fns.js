var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _component, _stateID, _parentElement;
import { dispatch } from "./track.js";
/**
 * @param {number} num
 * @returns uuid
 */
export function uuid(num = 10) {
    function dec2hex(dec) {
        return dec.toString(16).padStart(2, "0");
    }
    function generateId(len) {
        len = Math.round(len);
        return Array.from(crypto.getRandomValues(new Uint8Array(len || 10)), dec2hex).join("");
    }
    return generateId(num);
}
export function PromptBeforeLeave() {
    window.addEventListener("beforeunload", (ev) => {
        const e = ev || window.event;
        if (e) {
            e.preventDefault();
            e.returnValue = "";
        }
        return "";
    });
}
/**
Write CSS media in javascript

@example

media("min-width: 790px",
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
export function media(value, ...properties) {
    /* This is for creating css
   @media styles using javascipt*/
    const styS = "@media only screen and (" +
        value +
        ") " +
        "{" +
        `
`, styE = "}" +
        `
`;
    let style = "  ", aniSty = " ";
    const proplen = properties.length;
    let totalAnimation, Animation = "  ";
    const animationStep = (num) => {
        style = "  ";
        for (const [k, v] of Object.entries(properties[num][1])) {
            style +=
                "" +
                    k +
                    ": " +
                    v +
                    ";" +
                    `
`;
        }
        aniSty +=
            "" +
                properties[num][0] +
                "{" +
                `
` +
                style +
                "}" +
                `
`;
        return aniSty;
    };
    for (let i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    let aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation =
        aniStyleTag.innerHTML +
            `

`;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
}
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
export function css(indentifier, properties) {
    /*This is for creating
   css styles using javascipt*/
    const styS = "" +
        indentifier +
        "" +
        "{" +
        `
`;
    const styE = "}" +
        `
`;
    let style = "", totalStyle = "";
    for (const [k, v] of Object.entries(properties)) {
        style +=
            "" +
                k +
                ": " +
                v +
                ";" +
                `
`;
    }
    let styleTag = document.querySelector("style");
    if (styleTag !== null) {
        totalStyle += styleTag.innerHTML;
        totalStyle += styS + style + styE;
        styleTag.innerHTML = totalStyle;
        return;
    }
    styleTag = document.createElement("style");
    totalStyle +=
        styleTag.innerHTML +
            `

`;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    document.head.append(styleTag);
}
/**
Write animation value in javascript

@example

animate("popanimation",
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
export function animate(indentifier, ...properties) {
    /*This is for creating css
   animations  using javascipt*/
    const styS = "@keyframes " +
        indentifier +
        " " +
        "{" +
        `
`, styE = "}" +
        `
`, proplen = properties.length;
    let style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
    const animationStep = (num) => {
        style = "  ";
        for (const [k, v] of Object.entries(properties[num][1])) {
            style +=
                "" +
                    k +
                    ": " +
                    v +
                    ";" +
                    `
`;
        }
        aniSty +=
            "" +
                properties[num][0] +
                "{" +
                `
` +
                style +
                "}" +
                `
`;
        return aniSty;
    };
    for (let i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    let aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation =
        aniStyleTag.innerHTML +
            `

`;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
}
/**
 *
 * @param {expession} condition
 * @param {function} callback
 */
export function assert(condition, callback) {
    if (condition) {
        return callback(condition);
    }
    // That didn't went well
    return " ";
}
export const ls = {};
ls.store = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};
ls.retrieve = (name) => {
    return localStorage.getItem(name);
};
ls.remove = (name) => {
    localStorage.removeItem(name);
};
ls.getKey = (index) => {
    return window.localStorage.key(index);
};
ls.clear = () => {
    localStorage.clear();
};
export class list {
    constructor(component) {
        _component.set(this, void 0);
        _stateID.set(this, uuid());
        _parentElement.set(this, null);
        __classPrivateFieldSet(this, _component, component);
    }
    build(datas) {
        if (!datas[0]) {
            return;
        }
        const elements = [];
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            const chtml = __classPrivateFieldGet(this, _component).call(this, data);
            const element = chtml({ stateID: __classPrivateFieldGet(this, _stateID) });
            elements.push(element);
        }
        return elements;
    }
    update(datas) {
        var _a;
        if (!datas[0]) {
            return;
        }
        if (!__classPrivateFieldGet(this, _parentElement)) {
            // only for the first call
            __classPrivateFieldSet(this, _parentElement, dispatch(__classPrivateFieldGet(this, _stateID), {
                display: "none",
            })[0].parentElement);
        }
        dispatch(__classPrivateFieldGet(this, _stateID), { remove: true });
        if (!__classPrivateFieldGet(this, _parentElement)) {
            throw new Error("cannot update list");
        }
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            const chtml = __classPrivateFieldGet(this, _component).call(this, data);
            const element = chtml({ stateID: __classPrivateFieldGet(this, _stateID) });
            (_a = __classPrivateFieldGet(this, _parentElement)) === null || _a === void 0 ? void 0 : _a.append(element);
        }
    }
}
_component = new WeakMap(), _stateID = new WeakMap(), _parentElement = new WeakMap();
