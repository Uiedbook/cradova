// the global dispatcher
function cradovaDispatchtrack(nodes /*NodeListOf<Element>*/, stateID, state) {
    var _a;
    const updated = [];
    for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        // abort re-rendering if the state is not for this element
        if (!element.stateID || element.stateID !== stateID) {
            continue;
        }
        updated.push(element);
        if (typeof state === "object") {
            // updating the element's state
            for (const key in state) {
                // updating element styling
                if (key === "style") {
                    for (const [k, v] of Object.entries(state[key])) {
                        element.style[k] = v;
                    }
                    continue;
                }
                if (element.style[key] && key !== "src") {
                    element.style[key] = state[key];
                    continue;
                }
                if (element.style[key] === "" && key !== "src") {
                    element.style[key] = state[key];
                    continue;
                }
                if (typeof element[key] === "function") {
                    element[key]();
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
                        fullScreen(element).set();
                    }
                    else {
                        fullScreen(element).exist();
                    }
                    continue;
                }
                // adding class name to element
                if (key === "class" && typeof state[key] === "string") {
                    const classes = state[key].split(" ");
                    for (let i = 0; i < classes.length; i++) {
                        if (classes[i]) {
                            element.classList.add(classes[i]);
                        }
                    }
                    // console.log(element.className, "cl");
                    continue;
                }
                // toggling element class
                if (key === "toggleclass") {
                    element.classList.toggle(state[key]);
                    //          console.log(element.className, "tc");
                    continue;
                }
                //removing element class
                if (key === "removeclass") {
                    element.classList.remove(state[key]);
                    //  console.log(element.className, "rm");
                    continue;
                }
                //removing element class
                if (key === "remove") {
                    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove(element);
                    continue;
                }
                // changing the element children tree
                if (key === "tree") {
                    if (typeof state[key] === "function") {
                        state[key] = state[key]();
                    }
                    if (typeof state[key] === "function") {
                        state[key] = state[key]();
                    }
                    if (Array.isArray(state[key])) {
                        throw new TypeError("cradova err invalid element, should be a single element or parent element from cradova");
                    }
                    if (!(state[key] instanceof HTMLElement)) {
                        console.error("cradova err wrong element type: can't create element state on " +
                            state[key]);
                        throw new TypeError("cradova err invalid element, should be a html element from cradova");
                    }
                    // destroy the component tree
                    element.innerHTML = "";
                    // rebuild the component tree
                    // console.log(state[key]);
                    element.append(state[key]);
                    continue;
                }
                element[key] = state[key];
            }
        }
    }
    return updated;
}
/**
 * Send a new state to specified element with stateID
 *
 * @param stateID
 * @param state
 * @returns element(s)
 */
export function dispatch(stateID, state) {
    // TODO: this will be updated to use data-stateid soon
    // speed test still going on
    const nodes = document.querySelectorAll(".cra_child_doc");
    let updated = [];
    if (typeof state === "undefined" && typeof stateID === "object") {
        for (const [id, eachState] of Object.entries(stateID)) {
            const node = cradovaDispatchtrack(nodes, id, eachState);
            updated.push(...node);
        }
    }
    else {
        if (typeof stateID === "string") {
            const node = cradovaDispatchtrack(nodes, stateID, state);
            updated.push(...node);
        }
    }
    return updated;
}
// for making the dom elements fulscreen
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
/*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()
*/
