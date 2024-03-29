import { type VJS_params_TYPE } from "./types";
import { Ref, reference, createSignal, CradovaEvent } from "./classes";
import { Router } from "./classes";

export const makeElement = <E extends HTMLElement>(
  element: E & HTMLElement,
  ElementChildrenAndPropertyList: VJS_params_TYPE
) => {
  let props: any = {},
    text: string | number | null = null;
  //? getting children ready
  if (ElementChildrenAndPropertyList.length !== 0) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let child = ElementChildrenAndPropertyList[i];
      // single child lane
      if (typeof child === "function") {
        child = child();
      }
      // Ref as child
      if (child instanceof Ref) {
        child = child.render();
      }

      // appending child
      if (child instanceof HTMLElement || child instanceof DocumentFragment) {
        element.appendChild(child as Node);
        continue;
      }

      // children array
      if (Array.isArray(child)) {
        element.appendChild(Rhoda(child as HTMLElement[]));
        continue;
      }

      // getting innerText
      if (typeof child === "string" || typeof child === "number") {
        text = child;
        continue;
      }

      // getting props
      if (typeof child === "object") {
        props = Object.assign(props, child);
        continue;
      }

      // throw an error
      // ! seems pointless
      // if (typeof child !== "undefined") {
      //   console.error(" ✘  Cradova err:   got", { child });
      //   throw new Error(
      //     "  ✘  Cradova err:  invalid child type: " + "(" + typeof child + ")"
      //   );
      // }
    }
  } else {
    return element;
  }

  //? adding props
  if (typeof props === "object" && element) {
    // adding attributes
    for (const [prop, value] of Object.entries(props)) {
      // adding styles
      if (prop === "style" && typeof value === "object") {
        Object.assign(element.style, value);
        continue;
      }

      // data-(s)
      if (prop.includes("data-")) {
        element.setAttribute(prop, value as string);
        continue;
      }

      // aria-(s)
      if (prop.includes("aria-")) {
        element.setAttribute(prop, value as string);
        continue;
      }

      // A tags (the only special tag)
      if (prop === "href" && typeof value === "string") {
        const href = (value || "") as string;
        if (!href.includes("://")) {
          element.addEventListener(
            "click",
            (e: { preventDefault: () => void }) => {
              e.preventDefault();
              Router.navigate(
                (element as unknown as HTMLAnchorElement).pathname
              );
              //! get url hash here and scroll into view
              if (href.includes("#")) {
                // ! needs testing
                const l = href.split("#").at(-1);
                document.getElementById("#" + l)?.scrollIntoView();
              }
            }
          );
        }
        element.setAttribute(prop, value as string);
        continue;
      }

      // for compatibility
      if (
        typeof element.style[prop as unknown as number] !== "undefined" &&
        prop !== "src"
      ) {
        element.style[prop as unknown as number] = value as string;
        continue;
      }
            if (Array.isArray(value)) {
              // reference
              if (
                prop == "reference" &&
                (value! as unknown[])![0] instanceof reference
              ) {
                ((value! as unknown[])![0] as reference)._appendDomForce(
                  (value! as unknown[])![1] as string,
                  element
                );
                continue;
              }

              // signal
              if ((value! as unknown[])[0] instanceof createSignal) {
                ((value! as unknown[])![0] as createSignal<{}>).bindRef(
                  element as unknown as Ref,
                  {
                    _element_property: prop,
                    signalProperty: (value! as unknown[])![1] as string,
                  }
                );
                continue;
              }
            }

            // setting onmount event;
            if (prop === "onmount" && typeof props["onmount"] === "function") {
              const ev = () => {
                props.onmount?.apply(element);
                props!["onmount"] = undefined;
              };
              CradovaEvent.addEventListener("onmountEvent", ev);
              continue;
            }

      // trying to set other values
      (element as unknown as Record<string, unknown>)[prop] = value;
      // event of error and it checking has been removed, because this happens at runtime
    }
  }
  if (text) {
    element.appendChild(document.createTextNode(text as string));
  }
  return element as E;
};

export const cra = <E extends HTMLElement>(tag: string) => {
  const extend = (...Children_and_Properties: VJS_params_TYPE): E =>
    makeElement<E>(document.createElement(tag) as E, Children_and_Properties);
  return extend;
};

export function Rhoda(l: VJS_params_TYPE) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (ch instanceof Ref) {
        ch = ch.render(undefined) as HTMLElement;
      }
      if (typeof ch === "function") {
        ch = ch();
        if (typeof ch === "function") {
          ch = (ch as any)();
        }
      }
      if (typeof ch === "string" || typeof ch === "number") {
        fg.appendChild(document.createTextNode(ch as string));
        continue;
      }
      if (ch instanceof HTMLElement || ch instanceof DocumentFragment) {
        fg.appendChild(ch as unknown as HTMLElement);
      } else {
        if (typeof ch !== "undefined") {
          throw new Error(
            "  ✘  Cradova err:  invalid child type: " +
              ch +
              " (" +
              typeof ch +
              ")"
          );
        }
      }
    }
  }
  return fg;
}

// export function css(identifier: string | TemplateStringsArray) {
//   /*This is for creating
//  css styles using JavaScript*/
//   if (Array.isArray(identifier)) {
//     identifier = identifier[0];
//   }
//   if (typeof identifier === "string") {
//     let styTag = document.querySelector("style");
//     if (styTag !== null) {
//       styTag.textContent = identifier + styTag.textContent!;
//       return;
//     }
//     styTag = document.createElement("style");
//     styTag.textContent = identifier;
//     document.head.appendChild(styTag);
//   }
// }

/**
 *
 * @param {expression} condition
 * @param {function} elements[]
 */

export function $if(condition: any, ...elements: VJS_params_TYPE): any {
  if (condition) {
    return elements;
  }
}

export function $ifelse(condition: any, ifTrue: any, ifFalse?: any) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
}

export function $case(value: any, ...elements: VJS_params_TYPE) {
  return (key: any) => {
    if (key === value) {
      return elements;
    }
    return undefined;
  };
}
export function $switch(
  key: unknown,
  ...cases: ((key: any) => HTMLElement[] | undefined)[]
) {
  if (cases.length) {
    for (let i = 0; i < cases.length; i++) {
      const case_N = cases[i];
      const elements = case_N(key);
      if (elements) {
        return elements;
      }
    }
  }
  return undefined;
}

type LoopData<Type> = Type[];

export function loop<Type>(
  datalist: LoopData<Type>,
  component: (
    value: Type,
    index?: number,
    array?: LoopData<Type>
  ) => HTMLElement | DocumentFragment | undefined
) {
  if (typeof component !== "function") {
    throw new Error(
      " ✘  Cradova err :  Invalid component type, must be a function that returns html  "
    );
  }
  return Array.isArray(datalist)
    ? (datalist.map(component) as unknown as HTMLElement[])
    : undefined;
}

/**  Calculate a simple numerical representation of the URL */
export const SNRU = {
  snru: "",
  memo_SNRU() {
    let key = 0;
    const url = window.location.href;
    for (let i = 0; i < url.length; i++) {
      key += url.charCodeAt(i);
    }
    this.snru = key.toString();
  },
};
/**
 * Document fragment
 * @param children
 * @returns
 */

export const frag = function (children: VJS_params_TYPE) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    let html: any = children[i];
    if (typeof html === "function") {
      html = html() as HTMLElement;
    }
    if (html instanceof HTMLElement || html instanceof DocumentFragment) {
      par.appendChild(html);
      continue;
    }
    if (html instanceof String) {
      par.appendChild(document.createTextNode(html as unknown as string));
      continue;
    }
    console.error(" ✘  Cradova err:   wrong element type" + html);
    throw new TypeError(" ✘  Cradova err:   invalid element");
  }
  return par;
};

// hooks

/**
 * Cradova
 * ---
 *  Allows functional components to manage state by providing a state value and a function to update it.
 * @param initialValue
 * @param ActiveRef
 * @returns [state, setState]
 */
export function useState<S = unknown>(
  initialValue: S,
  ActiveRef: Ref
): [S, (newState: S) => void] {
  ActiveRef._state_index += 1;
  const idx = ActiveRef._state_index;
  if (!ActiveRef._state_track[idx]) {
    ActiveRef._roll_state(initialValue, idx);
    ActiveRef._state_track[idx] = true;
  }
  /**
   * cradova
   * ---
   * set new state and re-renders Ref
   * @param newState
   */
  function setState(newState: S) {
    ActiveRef._roll_state(newState, idx);
    ActiveRef.updateState();
  }
  return [ActiveRef._roll_state(null as S, idx, true) as S, setState];
}
/**
 * Cradova
 * ---
Allows side effects to be performed in functional components (Refs), such as fetching data or subscribing to events.
 * @param effect
 * @returns 
 */
export function useEffect(effect: () => void, ActiveRef: Ref) {
  ActiveRef._effect(effect);
}
/**
 * Cradova
 * ---
Returns a mutable reference object of dom elements that persists across component renders.
 * @returns reference 
 */
export function useRef() {
  return new reference() as unknown as Record<string, HTMLElement | undefined>;
}
