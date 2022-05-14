/*
 *   Cradova FrameWork
 *     @version 1.0.0
        @licence Apache v2

 @project : Cradova Framework;
 @copyright-lincense :  Apache v2;
 email > fridaymaxtour@gmail.com

                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 *       Copyright 2022 Friday Candour. All Rights Reserved.
 *       Licensed under the Apache License, Version 2.0 (the "License");
 *       you may not use this file except in compliance with the License.
 *       You may obtain a copy of the License at
 *           http://www.apache.org/licenses/LICENSE-2.0
 *       Unless required by applicable law or agreed to in writing, software
 *       distributed under the License is distributed on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *       See the License for the specific language governing permissions and
 *       limitations under the License.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./scripts/css.js", "./scripts/widget.js", "./scripts/init.js", "./scripts/swipe.js", "./scripts/media.js", "./scripts/store.js", "./scripts/Router.js", "./scripts/Screen.js", "./scripts/JsonDB.js", "./scripts/speaker.js", "./scripts/animate.js", "./scripts/file-system.js", "./scripts/localStorage.js", "./scripts/dispatcher.js", "./scripts/fullscreen.js", "./scripts/Metrics.js", "./scripts/promptbeforeleave.js", "./scripts/createState.js", "./scripts/fetcher.js", "./scripts/littleAxios.js"], function (require, exports, css_js_1, widget_js_1, init_js_1, swipe_js_1, media_js_1, store_js_1, Router_js_1, Screen_js_1, JsonDB_js_1, speaker_js_1, animate_js_1, file_system_js_1, localStorage_js_1, dispatcher_js_1, fullscreen_js_1, Metrics_js_1, promptbeforeleave_js_1, createState_js_1, fetcher_js_1, littleAxios_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    css_js_1 = __importDefault(css_js_1);
    widget_js_1 = __importDefault(widget_js_1);
    init_js_1 = __importDefault(init_js_1);
    swipe_js_1 = __importDefault(swipe_js_1);
    media_js_1 = __importDefault(media_js_1);
    store_js_1 = __importDefault(store_js_1);
    Router_js_1 = __importDefault(Router_js_1);
    Screen_js_1 = __importDefault(Screen_js_1);
    JsonDB_js_1 = __importDefault(JsonDB_js_1);
    speaker_js_1 = __importDefault(speaker_js_1);
    animate_js_1 = __importDefault(animate_js_1);
    file_system_js_1 = __importDefault(file_system_js_1);
    localStorage_js_1 = __importDefault(localStorage_js_1);
    dispatcher_js_1 = __importDefault(dispatcher_js_1);
    fullscreen_js_1 = __importDefault(fullscreen_js_1);
    Metrics_js_1 = __importDefault(Metrics_js_1);
    promptbeforeleave_js_1 = __importDefault(promptbeforeleave_js_1);
    createState_js_1 = __importDefault(createState_js_1);
    fetcher_js_1 = __importDefault(fetcher_js_1);
    littleAxios_js_1 = __importDefault(littleAxios_js_1);
    ("use strict");
    /**
     * Creates new HTML element
     *  @example
     * format for static  _`p| am a p tag`  // or _`p.class| am a p tag` or _`p#id| am a p tag` or _`p.class#id| am a p tag`
     * format for dynamic _(
     *  "p| am a p tag" // or "p.class| am a p tag" or "p#id| am a p tag" or "p.class#id| am a p tag"
     * , {
     * //props like
     * text: "am a p tag",
     * style: {
     * color: "blue"
     * }
     * },
     * // place other children here like span
     * _`span| am a span tag like so`, // this is a static child
     * _("span| am a span tag like so", {style: {color: "brown"}}) // this is a dynamic child
     * )
     * @param  {...any} element_initials
     * @returns function | HTMLElement
     *
     * // static elements cannot be given props nor children nor state but dynamic can
     *
     * // and static are useful too
     */
    const _ = (...element_initials) => {
        let properties, childrens = [];
        if (typeof element_initials[1] == "object" &&
            !(element_initials[1] instanceof HTMLElement)) {
            properties = element_initials[1];
            if (element_initials.length > 2) {
                childrens = element_initials.slice(2, element_initials.length);
            }
        }
        else {
            if (element_initials[1] instanceof HTMLElement ||
                typeof element_initials[1] === "function") {
                childrens = element_initials.slice(1, element_initials.length);
            }
        }
        if (typeof element_initials[0] === "string") {
            element_initials = element_initials[0];
        }
        // verifing the children array
        function identify(element_initials) {
            if (typeof element_initials !== "object") {
                element_initials = [element_initials];
            }
            let tag, className, ID;
            const [el, innerValue] = element_initials[0].split("|");
            if (el.indexOf("#") > -1) {
                ID = el.split("#")[1];
                tag = el.split("#")[0];
                className = ID.split(".")[1];
                if (className) {
                    ID = ID.split(".")[0];
                }
            }
            if (el.indexOf(".") > -1) {
                if (!className) {
                    className = el.split(".")[1];
                    tag = el.split(".")[0];
                    let locID = className.split("#")[1];
                    if (locID) {
                        className = className.split("#")[0];
                    }
                }
            }
            if (tag === "") {
                tag = "div";
            }
            if (!tag && tag !== "") {
                tag = el;
            }
            const initials = { tag, className, ID, innerValue };
            /**
             * params [incoming]:any elements and props object
             * @returns HTML element
             */
            return (...incoming) => {
                let childrens2rd = [], props = {}, text;
                for (let i = 0; i < incoming.length; i++) {
                    if (typeof incoming[i] === "function" ||
                        incoming[i] instanceof HTMLElement ||
                        (Array.isArray(incoming[i]) &&
                            (incoming[i][0] instanceof HTMLElement ||
                                typeof incoming[i][0] === "function"))) {
                        childrens2rd.push(incoming[i]);
                        continue;
                    }
                    //
                    if (!(incoming[i] instanceof HTMLElement) &&
                        typeof incoming[i] === "object") {
                        props = incoming[i];
                        continue;
                    }
                    if (typeof incoming[i] === "string") {
                        text = incoming[i];
                        continue;
                    }
                }
                if (childrens.length) {
                    childrens2rd.push(...childrens);
                }
                const element = document.createElement(initials.tag);
                if (initials.className) {
                    element.className = initials.className;
                }
                if (initials.ID) {
                    element.id = initials.ID;
                }
                if (initials.innerValue) {
                    element.append(initials.innerValue);
                }
                for (const prop in properties) {
                    if (prop === "style") {
                        for (const [k, v] of Object.entries(properties[prop])) {
                            element.style[k] = v;
                        }
                        continue;
                    }
                    if (prop === "class" && typeof properties[prop] === "string") {
                        element.classList.add(properties[prop]);
                        continue;
                    }
                    if (prop === "text") {
                        element.innerText = properties[prop];
                        continue;
                    }
                    element[prop] = properties[prop];
                }
                //
                // dynamic props
                // over-rides props that appear in the first level
                if (props && typeof props === "object" && !Array.isArray(props)) {
                    for (const prop in props) {
                        if (prop === "style") {
                            for (const [k, v] of Object.entries(props[prop])) {
                                element.style[k] = v;
                            }
                            continue;
                        }
                        if (prop === "text" && typeof props[prop] === "string") {
                            element.innerText = props[prop];
                            continue;
                        }
                        if (prop === "class" && typeof props[prop] === "string") {
                            element.classList.add(props[prop]);
                            continue;
                        }
                        if (prop === "fullscreen") {
                            if (properties[prop]) {
                                (0, fullscreen_js_1.default)(element).set();
                            }
                            else {
                                (0, fullscreen_js_1.default)(element).exist();
                            }
                            continue;
                        }
                        element[prop] = props[prop];
                    }
                }
                if (childrens2rd && childrens2rd[0]) {
                    //
                    for (let i = 0; i < childrens2rd.length; i++) {
                        if (typeof childrens2rd[i] === "function") {
                            element.append(childrens2rd[i](props));
                            continue;
                        }
                        if (Array.isArray(childrens2rd[i])) {
                            const arrCX = childrens2rd[i];
                            const arrSET = [];
                            for (let p = 0; p < arrCX.length; p++) {
                                if (!(arrCX[p] instanceof HTMLElement) &&
                                    typeof arrCX[p] !== "function" &&
                                    !Array.isArray(arrCX[p])) {
                                    throw new TypeError("cradova err invalid children list, should be a html element from cradova  " +
                                        arrCX[p]);
                                }
                                arrSET.push(arrCX[p]);
                            }
                            //
                            childrens2rd = [
                                ...childrens2rd.slice(0, i + 1),
                                ...arrSET,
                                ...childrens2rd.slice(i + 1, childrens2rd.length),
                            ];
                            continue;
                        }
                        element.append(childrens2rd[i]);
                    }
                }
                if (text) {
                    element.append(text);
                }
                if (element.stateID) {
                    // adding cradova dynamic signature
                    element.classList.add("cra_child_doc");
                }
                return element;
            };
        }
        let CradovaElemet;
        if (element_initials[0].raw) {
            CradovaElemet = identify(element_initials[0].raw);
        }
        else {
            CradovaElemet = identify(element_initials);
        }
        return CradovaElemet;
    };
    _.register = (name) => {
        for (const key in name) {
            _[key] = name[key];
        }
    };
    /**
     * registering added methods to the cradova object _
     *
     * these can be safely destructured to use alone
     */
    _.register({
        w: widget_js_1.default,
        css: css_js_1.default,
        Init: init_js_1.default,
        media: media_js_1.default,
        swipe: swipe_js_1.default,
        Store: store_js_1.default,
        JSONDB: JsonDB_js_1.default,
        Screen: Screen_js_1.default,
        Router: Router_js_1.default,
        LS: localStorage_js_1.default,
        FS: file_system_js_1.default,
        Speaker: speaker_js_1.default,
        metrics: Metrics_js_1.default,
        fetcher: fetcher_js_1.default,
        animate: animate_js_1.default,
        dispatch: dispatcher_js_1.default,
        littleAxios: littleAxios_js_1.default,
        createState: createState_js_1.default,
        PromptBeforeLeave: promptbeforeleave_js_1.default,
    });
    _.Init();
    window["_"] = _;
    exports.default = _;
    /**
     *
     * Registering ServiceWorker
     *
     *  */
    window.addEventListener("load", async () => {
        if ("serviceWorker" in navigator) {
            await navigator.serviceWorker
                .register("service-worker.js")
                .then(function (registration) {
                // Registration was successful
                console.log(`Service Worker registration successful. Scope: ${registration.scope}`);
            })
                .catch((err) => console.log(err));
        }
    });
});
//# sourceMappingURL=index.js.map