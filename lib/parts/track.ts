import { VJSType, stateType } from "../types";
import { addInvalidProperty, frag, reference } from "./fns";

/**
 * Send a new state to specified element with stateID
 *
 * @param stateID
 * @param state
 * @returns element(s)
 */

export function dispatch(element: Record<string, any>, state: stateType) {
  if (!element) {
    return;
  }
  if (typeof state === "object" && !Array.isArray(state)) {
    // updating the element's state
    for (const key in state) {
      // updating element styling
      if (key === "style" && typeof state[key] === "object") {
        for (const [k, v] of Object.entries(state[key]!)) {
          if (
            typeof element.style[k as unknown as number] !== "undefined" &&
            k !== "src" &&
            typeof v === "string"
          ) {
            element.style[k as unknown as number] = v;
          } else {
            throw new Error(
              "✘  Cradova err : " + k + " is not a valid css style property"
            );
          }
        }
        continue;
      }

      const stateK = state as {
        text?: string;
        reference?: reference;
        tree?: HTMLElement | (() => HTMLElement);
      } & { [x: string]: unknown };

      if (typeof element[key] === "function") {
        if (key.startsWith("on")) {
          element[key] = stateK[key];
        } else {
          element[key].apply(element);
        }
        continue;
      }
      // updating element's inner text
      if (key === "text") {
        element.innerText = stateK[key] as string;
        continue;
      }

      // changing the element children tree
      if (key === "tree") {
        // replace the component tree
        element.innerHTML = "";
        element.appendChild(frag([stateK[key] as VJSType<HTMLElement>]));
        continue;
      }
      // trying to set other values

      if (key.includes("data-")) {
        element.setAttribute(key, stateK[key] as string);
        continue;
      }
      addInvalidProperty(element, key, stateK[key] as unknown);
    }
  }
  if (typeof state === "string") {
    element.innerText = state;
    return;
  }
  if (typeof state === "function") {
    element.appendChild(frag([state as VJSType<HTMLElement>]));
    return;
  }

  if (state instanceof HTMLElement) {
    element.appendChild(state);
  }
  if (!(typeof state === "object" && !Array.isArray(state))) {
    throw new Error(
      " ✘  Cradova err: Cradova got invalid state  => \n" + String(state)
    );
  }
}
