// the global dispatcher
import fullScreen from "./fullscreen.js";

export default function dispatch(stateID, state) {
  const nodes = document.querySelectorAll(".cra_child_doc");
  if (typeof state === "undefined" && typeof stateID === "object") {
    for (const [id, eachState] of Object.entries(stateID)) {
      nodes.forEach((element) => {
        // abort rendering if the state is not for this element
        if (!element.stateID || element.stateID !== id) {
          return;
        }
        if (typeof eachState === "object") {
          // updating the element's eachState
          for (const key in eachState) {
            // updating element styling
            if (key === "style") {
              for (const [k, v] of Object.entries(eachState[key])) {
                element.style[k] = v;
              }
              continue;
            }
            if (typeof element[key] === "function") {
              element[key]();
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
                fullScreen(element).set();
              } else {
                fullScreen(element).exist();
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
                console.error(
                  "wrong element type: can't create element eachState on " +
                    eachState[key]
                );
                throw new TypeError(
                  "cradova err invalid element, should be a html element from cradova"
                );
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
    }
  } else {
    nodes.forEach((element) => {
      // abort rendering if the state is not for this element
      if (!element.stateID || element.stateID !== stateID) {
        return;
      }
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
            } else {
              fullScreen(element).exist();
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
              console.error(
                "wrong element type: can't create element state on " +
                  state[key]
              );
              throw new TypeError(
                "cradova err invalid element, should be a html element from cradova"
              );
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
