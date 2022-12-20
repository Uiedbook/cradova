import { dispatch } from "./track.js";
import _ from "../index.js";
export const err = function (errors, err, type) {
    for (let er = 0; er < errors.length; er++) {
        console.error(errors[er]);
    }
    if (!type) {
        throw new Error(err);
    }
    else {
        throw new TypeError(err);
    }
};
export const controls = function () {
    const svg = `<svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4.49975 5.625C4.3402 5.6242 4.18282 5.58788 4.03904 5.5187C3.89526 5.44951 3.76869 5.34919 3.6685 5.225L1.03725 2.0375C0.8835 1.84561 0.786745 1.61438 0.758014 1.37017C0.729283 1.12596 0.769733 0.878589 0.874753 0.65625C0.959928 0.463017 1.09892 0.298383 1.27514 0.182014C1.45136 0.0656449 1.65734 0.00245816 1.8685 0H7.131C7.34216 0.00245816 7.54815 0.0656449 7.72437 0.182014C7.90058 0.298383 8.03958 0.463017 8.12475 0.65625C8.22977 0.878589 8.27023 1.12596 8.24149 1.37017C8.21276 1.61438 8.11601 1.84561 7.96226 2.0375L5.331 5.225C5.23082 5.34919 5.10424 5.44951 4.96047 5.5187C4.81669 5.58788 4.65931 5.6242 4.49975 5.625Z" fill="#2c3e50"/>
</svg>
`;
    const icon = (styles) => _("div", Object.assign(Object.assign({}, styles), { innerHTML: svg }));
    const constr = _("div", {
        display: "flex",
        position: "fixed",
        alignContent: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        width: "80px",
        top: "4px",
        right: "4px",
        backgroundColor: "#fff",
        transform: "rotate(0deg)",
        border: "aqua 2px solid",
        borderRadius: "6px",
    }, icon({
        transform: "rotate(90deg)",
        /* border: "red 2px solid", */ onclick() {
            window.history.back();
        },
    }), icon({
        transform: "rotate(270deg)",
        /* border: "red 2px solid", */ onclick() {
            window.history.forward();
        },
    }));
    const cont = constr();
    if (cont) {
        document.body.append(cont);
    }
};
export function uuid(num = 10) {
    const Xxs = Array(num).fill("x");
    let t = Date.now ? +Date.now() : +new Date();
    return Xxs.join("").replace(/[x]/g, function (e) {
        const r = (t + 16 * Math.random()) % 16 | 0;
        return (t = Math.floor(t / 16)), ("x" === e ? r : (7 & r) | 8).toString(16);
    });
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
export function media(value, ...properties) {
    /* This is for creating css
   @media styles using javascript*/
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
export function css(identifier, properties) {
    /*This is for creating
   css styles using JavaScript*/
    const styS = "" +
        identifier +
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

_.animate("polarization",
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
export function animate(identifier, ...properties) {
    /*This is for creating css
   animations  using JavaScript*/
    const styS = "@keyframes " +
        identifier +
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
 * @param {expression} condition
 * @param {function} callback
 */
export function assert(condition, ...callback) {
    if (condition) {
        return callback;
    }
    return "";
}
export function assertOr(condition, ifTrue, ifFalse) {
    if (condition) {
        return ifTrue;
    }
    return ifFalse;
}
/**
 * Create element and get a callback to update their state
 * no need to manage stateIDs
 * ----------------------------------------------------------------
 *
 * @param element_initials
 * @param props
 * @returns
 */
export function RefElement(element_initials = "div", props = {}) {
    props.stateID = uuid();
    const element = _(element_initials, props);
    return {
        render(data) {
            return element(data);
        },
        updateState(state) {
            dispatch(props.stateID, state);
        },
    };
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
// for making the dom elements fullscreen
export function fullScreen(e) {
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
export class RefList {
    constructor(component) {
        this.stateID = uuid();
        this.parentElement = null;
        this.datas = [];
        this.component = component.bind(this);
    }
    stale(datas) {
        this.datas = datas;
    }
    render(datas) {
        if (datas) {
            this.datas = datas;
        }
        if (!this.datas) {
            throw new Error("Cradova err: RefList cannot be rendered without input");
        }
        if (!Array.isArray(this.datas)) {
            throw new Error("Cradova err: RefList cannot render non-array input");
        }
        const elements = [];
        const data = this.datas.length;
        for (let i = 0; i < data; i++) {
            const chtml = this.component(this.datas[i], i);
            const element = chtml({ stateID: this.stateID });
            elements.push(element);
        }
        return elements;
    }
    updateState(datas) {
        var _a;
        if (!datas) {
            throw new Error("Cradova err: Ref cannot be rendered without input");
        }
        if (!Array.isArray(datas)) {
            throw new Error("Cradova err: RefList cannot render non-array input");
        }
        if (!datas[0]) {
            return;
        }
        if (!this.parentElement) {
            // only for the first call
            this.parentElement = (_a = dispatch(this.stateID, {
                cradovaDispatchtrackBreak: true,
            })[0]) === null || _a === void 0 ? void 0 : _a.parentElement;
        }
        if (!this.parentElement) {
            throw new Error("cannot update list parent element is no where to be found");
        }
        const elements = [];
        for (let i = 0; i < datas.length; i++) {
            const chtml = this.component(datas[i], i);
            const element = chtml({ stateID: this.stateID });
            elements.push(element);
        }
        try {
            // @ts-ignore
            this.parentElement.replaceChildren(...elements);
        }
        catch (error) { }
    }
}
/**
 * Cradova Ref
 * -------
 * create dynamic components
 *
 */
export class Ref {
    constructor(component) {
        this.stateID = uuid();
        //  private parentElement: HTMLElement | null = null;
        this.data = [undefined];
        this.component = component.bind(this);
    }
    stale(...data) {
        this.data = data;
    }
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns html
     */
    render(...data) {
        if (data) {
            this.data = data;
        }
        if (!this.data) {
            throw new Error("Cradova err: Ref cannot be rendered without input");
        }
        const chtml = this.component(...this.data);
        if (typeof chtml !== "function") {
            throw new Error("Invalid component type for cradova Ref, got  -  " + chtml);
        }
        const element = chtml({ stateID: this.stateID });
        if (!(element instanceof HTMLElement)) {
            err([
                `
     \x1b[35m Exception: ref only  a function that returns cradova element or cradova element tree. \x1b[35m
      
      to track and debug this element add a
      beforeMount or afterMount prop to the element
      then you can compare the parsed element and stateID

     element stateID: \x1b[4m \x1b[33m ${this.stateID} \x1b[33m \x1b[4m`,
            ], `Cradova can't render component make sure it's a valid component`);
        }
        return () => element;
    }
    onStateUpdate(cb) {
        this.upcb = cb;
    }
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState(...data) {
        if (!data) {
            return;
        }
        if (!this) {
            console.error("update has been passed wrongly please send the ref where you want to call it");
            console.error(" Then call as ref.updateState({ your state }) ");
        }
        const guy = dispatch(this.stateID, {
            display: "none",
        })[0];
        if (!guy) {
            // console.log(this.component);
            throw new Error("Ref is not rendered but updateState was called");
        }
        const chtml = this.component(...data);
        if (typeof chtml !== "function") {
            try {
                guy.parentNode.replaceChild(chtml, guy);
            }
            catch (e) {
                console.error(e);
                throw new Error("cradova err: Ref got an invalid datatype for ref updateSate call  got >>>  ' " +
                    chtml +
                    "';");
            }
        }
        const element = chtml({ stateID: this.stateID });
        const fn = element.afterMount;
        element.afterMount = undefined;
        try {
            guy.parentNode.replaceChild(element, guy);
            if (typeof fn === "function") {
                fn(element, data);
            }
        }
        catch (e0) {
            console.log(e0);
        }
        if (this.upcb) {
            this.upcb(data);
        }
    }
    remove() {
        dispatch(this.stateID, { remove: true });
    }
}
export const frag = function (...children) {
    const par = document.createDocumentFragment();
    // building it's children tree.
    for (let i = 0; i < children.length; i++) {
        const ch = children[i]();
        if (typeof ch === "function") {
            par.append(ch());
        }
        else {
            if (ch instanceof HTMLElement) {
                par.append(ch);
            }
        }
    }
    return par;
};
