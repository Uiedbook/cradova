import { fullScreen } from "./fns";
// the global dispatcher

function cradovaDispatchTrack(nodes: any[], state?: Record<string, any>) {
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
    if (!element) {
      continue;
    }
    if (typeof state === "object" && !Array.isArray(state)) {
      // updating the element's state
      for (const key in state) {
        // updating element styling
        if (key === "style") {
          for (const [k, v] of Object.entries(state[key])) {
            if (typeof element.style[k] !== "undefined" && k !== "src") {
              element.style[k] = v;
            } else {
              throw new Error(
                "✘  Cradova err : " + k + " is not a valid css style property"
              );
            }
          }
          continue;
        }

        if (typeof element.style[key] !== "undefined" && key !== "src") {
          element.style[key] = state[key];
          continue;
        }
        if (typeof element[key] === "function") {
          element[key](element);
          continue;
        }
        // updating element's inner text
        if (key === "text") {
          element.innerText = state[key];
          continue;
        }
        // setting element dimension to full screen
        if (key === "fullscreen") {
          if (state[key]) {
            fullScreen(element).set();
          } else {
            fullScreen(element).exist();
          }
          continue;
        }
        // adding class name to element
        if (
          key === "class" &&
          typeof state[key] === "string" &&
          state[key] !== ""
        ) {
          const classes = state[key].split(" ");
          for (let i = 0; i < classes.length; i++) {
            if (classes[i]) {
              element.classList.add(classes[i]);
            }
          }
          continue;
        }
        // toggling element class
        if (key === "toggleclass" && state[key] !== "") {
          element.classList.toggle(state[key]);
          //          console.log(element.className, "tc");
          continue;
        }
        //removing element class
        if (key === "removeclass" && state[key] !== "") {
          element.classList.remove(state[key]);
          //  console.log(element.className, "rm");
          continue;
        }
        //removing element element
        if (key === "remove") {
          element.parentElement?.removeChild(element);
          continue;
        }

        //
        // setting data attribute
        if (key.includes("$")) {
          element.setAttribute("data-" + key.split("$")[1], state[key]);
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
            throw new TypeError(
              " ✘  Cradova err:   invalid tree element type, should be a single element or parent element from cradova"
            );
          }

          if (!(state[key] instanceof HTMLElement)) {
            console.error(
              " ✘  Cradova err:   wrong element type: can't update tree using " +
                state[key]
            );
            throw new TypeError(
              " ✘  Cradova err:   invalid element, should be a html element from cradova"
            );
          }
          // replace the component tree
          element.replaceChildren(state[key]);
          continue;
        }
        element[key] = state[key];
      }
    }
  }
}

/**
 * Send a new state to specified element with stateID
 *
 * @param stateID
 * @param state
 * @returns element(s)
 */

export function dispatch(
  stateID: string | Record<string, any>,
  state?: Record<string, any>
) {
  let ele;
  if (stateID instanceof HTMLElement) {
    ele = stateID;
  }
  let updated = undefined;
  if (typeof state === "undefined" && typeof stateID === "object" && !ele) {
    for (const [id, eachState] of Object.entries(stateID)) {
      const elements = document.querySelectorAll(
        "[data-cra-id=" + id + "]"
      ) as any;
      updated = elements.length === 1 ? elements[0] : elements;
      cradovaDispatchTrack(elements, eachState);
    }
  } else {
    if (typeof stateID === "string") {
      const elements = document.querySelectorAll(
        "[data-cra-id=" + stateID + "]"
      ) as any;
      if (elements.length) {
        updated = elements.length === 1 ? elements[0] : elements;
        if (!state?.cradovaDispatchTrackBreak) {
          cradovaDispatchTrack(elements, state);
        }
      }
    }
    if (ele) {
      cradovaDispatchTrack([ele] as any, state);
    }
  }
  return updated;
}
