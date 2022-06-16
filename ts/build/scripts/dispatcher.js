var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./fullscreen.js"], function (require, exports, fullscreen_js_1) {
    "use strict";
    exports.__esModule = true;
    fullscreen_js_1 = __importDefault(fullscreen_js_1);
    function dispatch(stateID, state) {
        if (typeof stateID !== "string" ||
            typeof state !== "object" ||
            typeof state !== "string") {
            throw new TypeError("Invalid arguments type for state dispatcher  ");
        }
        var nodes = document.querySelectorAll(".cra_child_doc");
        if (typeof state === "undefined" && typeof stateID === "object") {
            var _loop_1 = function (id, eachState) {
                nodes.forEach(function (element) {
                    // abort rendering if the state is not for this element
                    if (!element.stateID || element.stateID !== id) {
                        return;
                    }
                    if (typeof eachState === "object") {
                        // updating the element's eachState
                        for (var key in eachState) {
                            // updating element styling
                            if (key === "style") {
                                for (var _i = 0, _a = Object.entries(eachState[key]); _i < _a.length; _i++) {
                                    var _b = _a[_i], k = _b[0], v = _b[1];
                                    element.style[k] = v;
                                }
                                continue;
                            }
                            // updating element's inner text
                            if (key === "text") {
                                element.innerText = eachState[key];
                                continue;
                            }
                            // setting element dimesion to full screen
                            if (key === "fullscreen") {
                                if (eachState[key]) {
                                    fullscreen_js_1["default"](element).set();
                                }
                                else {
                                    fullscreen_js_1["default"](element).exist();
                                }
                                continue;
                            }
                            // adding class name to element
                            if (key === "class") {
                                element.classList.add(eachState[key]);
                                continue;
                            }
                            // toggling element class
                            if (key === "toggleclass") {
                                element.classList.toggle(eachState[key]);
                                continue;
                            }
                            //removing element class
                            if (key === "removeclass") {
                                element.classList.remove(eachState[key]);
                                continue;
                            }
                            // changing the element children tree
                            if (key === "tree") {
                                if (typeof eachState[key] === "function") {
                                    eachState[key] = eachState[key]();
                                }
                                if (!eachState[key] instanceof HTMLElement) {
                                    console.error("wrong element type: can't create element eachState on " +
                                        eachState[key]);
                                    throw new TypeError("cradova err invalid element, should be a html element from cradova");
                                }
                                // destroy the component tree
                                element.innerHTML = "";
                                // rebuild the component tree
                                element.append(eachState[key]);
                                continue;
                            }
                            element[key] = eachState[key];
                        }
                    }
                });
            };
            for (var _i = 0, _a = Object.entries(stateID); _i < _a.length; _i++) {
                var _b = _a[_i], id = _b[0], eachState = _b[1];
                _loop_1(id, eachState);
            }
        }
        else {
            nodes.forEach(function (element) {
                // abort rendering if the state is not for this element
                if (!element.stateID || element.stateID !== stateID) {
                    return;
                }
                if (typeof state === "object") {
                    // updating the element's state
                    for (var key in state) {
                        // updating element styling
                        if (key === "style") {
                            for (var _i = 0, _a = Object.entries(state[key]); _i < _a.length; _i++) {
                                var _b = _a[_i], k = _b[0], v = _b[1];
                                element.style[k] = v;
                            }
                            continue;
                        }
                        // updating element's inner text
                        if (key === "text") {
                            element.innerText = state[key];
                            continue;
                        }
                        // setting element dimesion to full screen
                        if (key === "fullscreen") {
                            if (state[key]) {
                                fullscreen_js_1["default"](element).set();
                            }
                            else {
                                fullscreen_js_1["default"](element).exist();
                            }
                            continue;
                        }
                        // adding class name to element
                        if (key === "class") {
                            element.classList.add(state[key]);
                            continue;
                        }
                        // toggling element class
                        if (key === "toggleclass") {
                            element.classList.toggle(state[key]);
                            continue;
                        }
                        //removing element class
                        if (key === "removeclass") {
                            element.classList.remove(state[key]);
                            continue;
                        }
                        // changing the element children tree
                        if (key === "tree") {
                            if (typeof state[key] === "function") {
                                state[key] = state[key]();
                            }
                            if (!state[key] instanceof HTMLElement) {
                                console.error("wrong element type: can't create element state on " +
                                    state[key]);
                                throw new TypeError("cradova err invalid element, should be a html element from cradova");
                            }
                            // destroy the component tree
                            element.innerHTML = "";
                            // rebuild the component tree
                            element.append(state[key]);
                            continue;
                        }
                        element[key] = state[key];
                    }
                }
            });
        }
    }
    exports["default"] = dispatch;
});
//# sourceMappingURL=dispatcher.js.map