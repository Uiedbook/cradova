// the global dispatcher
import fullScreen from "./fullscreen.js";

export default function dispatch(state, stateID) {
  const nodes = document.querySelectorAll(".cra_child_doc");
  window._.globalState = { state: state, stateID: stateID };
  let node;
  nodes.forEach((element) => {
    // check if the element is mounted
    if (!element.parentElement && !element.parentElement.parentElement) {
      throw new Error("can't render an unmouted element");
    }
    // abort rendering if the state is not for this element
    if (!element.stateID && element.stateID !== window._.globalState.stateID) {
      return;
    }
    if (element.stateID !== window._.globalState.stateID) {
      return;
    }

    // updating the element's state
    for (const key in window._.globalState.state) {
      if (key === "style") {
        for (const [k, v] of Object.entries(window._.globalState.state[key])) {
          element.style[k] = v;
        }
        continue;
      }
      if (key === "text") {
        element.innerText = window._.globalState.state[key];
        continue;
      }
      if (key === "fullscreen") {
        if (window._.globalState.state[key]) {
          fullScreen(element).set();
        } else {
          fullScreen(element).exist();
        }
        continue;
      }
      if (key === "class") {
        element.classList.add(window._.globalState.state[key]);
        continue;
      }
      if (key === "toggleclass") {
        element.classList.toggle(window._.globalState.state[key]);
        continue;
      }
      if (key === "removeclass") {
        element.classList.remove(window._.globalState.state[key]);
        continue;
      }
      element[key] = window._.globalState.state[key];
    }
    node = element;
  });
  return node;
}
