import { fullScreen } from "./fns";
// the global dispatcher

function cradovaDispatchtrack(nodes: any[], state?: Record<string, any>) {
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
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
        //removing element element
        if (key === "remove") {
          element.parentElement?.removeChild(element);
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
              "cradova err invalid tree element type, should be a single element or parent element from cradova"
            );
          }

          if (!(state[key] instanceof HTMLElement)) {
            console.error(
              "cradova err wrong element type: can't update element state on " +
                state[key]
            );
            throw new TypeError(
              "cradova err invalid element, should be a html element from cradova"
            );
          }
          // destroy the component tree
          element.replaceChildren();
          // rebuild the component tree
          element.append(state[key]);
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
  const nodes: Node[] = [];
  const updated: Node[] = [];
  if (typeof state === "undefined" && typeof stateID === "object") {
    for (const [id, eachState] of Object.entries(stateID)) {
      // filtering;
      const elements = document.querySelectorAll(".cra_child_doc");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as any;
        if (!element.stateID || element.stateID !== id) {
          continue;
        }
        nodes.push(element);
      }
      cradovaDispatchtrack(nodes, eachState);
      updated.push(...nodes);
    }
  } else {
    if (typeof stateID === "string") {
      // filtering;
      const elements = document.querySelectorAll(".cra_child_doc");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as any;
        if (!element.stateID || element.stateID !== stateID) {
          continue;
        }
        nodes.push(element);
      }
      if (state?.cradovaDispatchtrackBreak) {
        updated.push(...nodes);
      } else {
        cradovaDispatchtrack(nodes, state);
        updated.push(...nodes);
      }
    }
  }
  return updated;
}
