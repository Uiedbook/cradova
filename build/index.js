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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./scripts/css.js", "./scripts/widget.js", "./scripts/init.js", "./scripts/swipe.js", "./scripts/media.js", "./scripts/store.js", "./scripts/Router.js", "./scripts/Screen.js", "./scripts/JsonDB.js", "./scripts/speaker.js", "./scripts/animate.js", "./scripts/file-system.js", "./scripts/localStorage.js", "./scripts/dispatcher.js", "./scripts/fullscreen.js", "./scripts/Metrics.js", "./scripts/promptbeforeleave.js", "./scripts/createState.js", "./scripts/fetcher.js", "./scripts/littleAxios.js"], function (require, exports, css_js_1, widget_js_1, init_js_1, swipe_js_1, media_js_1, store_js_1, Router_js_1, Screen_js_1, JsonDB_js_1, speaker_js_1, animate_js_1, file_system_js_1, localStorage_js_1, dispatcher_js_1, fullscreen_js_1, Metrics_js_1, promptbeforeleave_js_1, createState_js_1, fetcher_js_1, littleAxios_js_1) {
    "use strict";
    exports.__esModule = true;
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
    var _ = function () {
        var element_initials = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            element_initials[_i] = arguments[_i];
        }
        var properties, childrens = [];
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
            var tag, className, ID;
            var _a = element_initials[0].split("|"), el = _a[0], innerValue = _a[1];
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
                    var locID = className.split("#")[1];
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
            var initials = { tag: tag, className: className, ID: ID, innerValue: innerValue };
            /**
             * params [incoming]:any elements and props object
             * @returns HTML element
             */
            return function () {
                var incoming = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    incoming[_i] = arguments[_i];
                }
                var childrens2rd = [], props = {}, text;
                for (var i = 0; i < incoming.length; i++) {
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
                    childrens2rd.push.apply(childrens2rd, childrens);
                }
                var element = document.createElement(initials.tag);
                if (initials.className) {
                    element.className = initials.className;
                }
                if (initials.ID) {
                    element.id = initials.ID;
                }
                if (initials.innerValue) {
                    element.append(initials.innerValue);
                }
                for (var prop in properties) {
                    if (prop === "style") {
                        for (var _a = 0, _b = Object.entries(properties[prop]); _a < _b.length; _a++) {
                            var _c = _b[_a], k = _c[0], v = _c[1];
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
                    for (var prop in props) {
                        if (prop === "style") {
                            for (var _d = 0, _e = Object.entries(props[prop]); _d < _e.length; _d++) {
                                var _f = _e[_d], k = _f[0], v = _f[1];
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
                                fullscreen_js_1["default"](element).set();
                            }
                            else {
                                fullscreen_js_1["default"](element).exist();
                            }
                            continue;
                        }
                        element[prop] = props[prop];
                    }
                }
                if (childrens2rd && childrens2rd[0]) {
                    //
                    for (var i = 0; i < childrens2rd.length; i++) {
                        if (typeof childrens2rd[i] === "function") {
                            element.append(childrens2rd[i](props));
                            continue;
                        }
                        if (Array.isArray(childrens2rd[i])) {
                            var arrCX = childrens2rd[i];
                            var arrSET = [];
                            for (var p = 0; p < arrCX.length; p++) {
                                if (!(arrCX[p] instanceof HTMLElement) &&
                                    typeof arrCX[p] !== "function" &&
                                    !Array.isArray(arrCX[p])) {
                                    throw new TypeError("cradova err invalid children list, should be a html element from cradova  " +
                                        arrCX[p]);
                                }
                                arrSET.push(arrCX[p]);
                            }
                            //
                            childrens2rd = __spreadArrays(childrens2rd.slice(0, i + 1), arrSET, childrens2rd.slice(i + 1, childrens2rd.length));
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
        var CradovaElemet;
        if (element_initials[0].raw) {
            CradovaElemet = identify(element_initials[0].raw);
        }
        else {
            CradovaElemet = identify(element_initials);
        }
        return CradovaElemet;
    };
    _.register = function (name) {
        for (var key in name) {
            _[key] = name[key];
        }
    };
    /**
     * registering added methods to the cradova object _
     *
     * these can be safely destructured to use alone
     */
    _.register({
        w: widget_js_1["default"],
        css: css_js_1["default"],
        Init: init_js_1["default"],
        media: media_js_1["default"],
        swipe: swipe_js_1["default"],
        Store: store_js_1["default"],
        JSONDB: JsonDB_js_1["default"],
        Screen: Screen_js_1["default"],
        Router: Router_js_1["default"],
        LS: localStorage_js_1["default"],
        FS: file_system_js_1["default"],
        Speaker: speaker_js_1["default"],
        metrics: Metrics_js_1["default"],
        fetcher: fetcher_js_1["default"],
        animate: animate_js_1["default"],
        dispatch: dispatcher_js_1["default"],
        littleAxios: littleAxios_js_1["default"],
        createState: createState_js_1["default"],
        PromptBeforeLeave: promptbeforeleave_js_1["default"]
    });
    _.Init();
    window["_"] = _;
    exports["default"] = _;
    /**
     *
     * Registering ServiceWorker
     *
     *  */
    window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!("serviceWorker" in navigator)) return [3 /*break*/, 2];
                    return [4 /*yield*/, navigator.serviceWorker
                            .register("service-worker.js")
                            .then(function (registration) {
                            // Registration was successful
                            console.log("Service Worker registration successful. Scope: " + registration.scope);
                        })["catch"](function (err) { return console.log(err); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.js.map