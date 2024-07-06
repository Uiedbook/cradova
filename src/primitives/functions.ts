import { type VJS_params_TYPE } from "./types";
import { Comp, createSignal, CradovaEvent, Router } from "./classes";

// ? NOTE: this class below is copied here for brevity
/**
 * Cradova
 * ---
 * make reference to dom elements
 */

class __raw_ref {
  tree: Record<string, any> = {};
  /**
   * Bind a DOM element to a reference name.
   * @param name - The name to reference the DOM element by.
   */
  bindAs(name: string) {
    return [this, name] as unknown as __raw_ref;
  }
  /**
   * Retrieve a referenced DOM element.
   * @param name - The name of the referenced DOM element.
   */
  current<ElementType extends HTMLElement = HTMLElement>(name: string) {
    return this.tree[name] as ElementType | undefined;
  }

  /**
   * Append a DOM element to the reference, overwriting any existing reference.
   * @param name - The name to reference the DOM element by.
   * @param element - The DOM element to reference.
   */
  _append(name: string, Element: HTMLElement) {
    this.tree[name] = Element;
  }
}

export const makeElement = <E extends HTMLElement>(
  element: E & HTMLElement,
  ElementChildrenAndPropertyList: VJS_params_TYPE<E>
) => {
  const props: Record<string, any> = {};
  let text: string | undefined = undefined;
  //? getting children ready
  if (ElementChildrenAndPropertyList.length !== 0) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let child = ElementChildrenAndPropertyList[i];
      // single child lane
      if (typeof child === "function") {
        child = child();
      }
      // Comp as child
      if (child instanceof Comp) {
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
      if (typeof child === "string") {
        text = child;
        continue;
      }

      // getting props
      if (typeof child === "object") {
        Object.assign(props, child);
        continue;
      }
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

      // A tags (the only special tag)
      if (prop === "href") {
        const href = (value || "") as string;
        if (!href.includes("://")) {
          element.addEventListener(
            "click",
            (e: { preventDefault: () => void }) => {
              e.preventDefault();

              Router.navigate((element as unknown as HTMLAnchorElement).href);
              //? get url hash here and scroll into view
              if (href.includes("#")) {
                const l = href.split("#").at(-1);
                document.getElementById("#" + l)?.scrollIntoView();
              }
            }
          );
        }
        element.setAttribute(prop, value as string);
        continue;
      }

      if (Array.isArray(value)) {
        // reference
        if (
          prop == "reference" &&
          (value! as unknown[])![0] instanceof __raw_ref
        ) {
          ((value! as unknown[])![0] as __raw_ref)._append(
            (value! as unknown[])![1] as string,
            element
          );
          continue;
        }
        // signal
        if ((value! as unknown[])[0] instanceof createSignal) {
          ((value! as unknown[])![0] as createSignal<{}>).bindRef(
            element as unknown as Comp,
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
          props["onmount"]?.apply(element);
          props!["onmount"] = undefined;
        };
        CradovaEvent.addAfterMount(ev);
        continue;
      }

      // data-(s) &  aria-(s)
      if (prop.includes("data-") || prop.includes("aria-")) {
        element.setAttribute(prop, value as string);
        continue;
      }

      // trying to set other values

      (element as unknown as Record<string, unknown>)[prop] = value;
    }
  }
  if (text !== undefined) {
    element.appendChild(document.createTextNode(text as string));
  }
  return element as E;
};

export const cra = <E extends HTMLElement>(tag: string) => {
  return (...Children_and_Properties: VJS_params_TYPE<E>): E =>
    makeElement<E>(document.createElement(tag) as E, Children_and_Properties);
};

export function Rhoda(l: VJS_params_TYPE<HTMLElement>) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (ch instanceof Comp) {
        ch = ch.render() as HTMLElement;
      }
      if (typeof ch === "function") {
        ch = ch();
        if (typeof ch === "function") {
          ch = (ch as any)();
        }
      }
      if (ch instanceof HTMLElement || ch instanceof DocumentFragment) {
        fg.appendChild(ch as unknown as HTMLElement);
        continue;
      }
      if (typeof ch === "string") {
        fg.appendChild(document.createTextNode(ch as string));
      }
    }
  }
  return fg;
}

/**
 *
 * @param {expression} condition
 * @param {function} elements[]
 */

export function $if<E>(condition: any, ...elements: VJS_params_TYPE<E>): any {
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

export function $case<E = HTMLElement>(
  value: any,
  ...elements: VJS_params_TYPE<E>
) {
  return (key: any) => {
    if (key === value) {
      return elements;
    }
    return undefined;
  };
}
export function $switch(key: unknown, ...cases: ((key: any) => any)[]) {
  let elements;
  if (cases.length) {
    for (let i = 0; i < cases.length; i++) {
      elements = cases[i](key);
      if (elements) {
        break;
      }
    }
  }
  return elements;
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
  return Array.isArray(datalist)
    ? (datalist.map(component) as unknown as HTMLElement[])
    : undefined;
}

/**
 * Document fragment
 * @param children
 * @returns
 */

export const frag = function (children: VJS_params_TYPE<HTMLElement>) {
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
    // throw new TypeError(" ✘  Cradova err:   invalid element");
  }
  return par;
};

// hooks

/**
 * Cradova
 * ---
 *  Allows functional components to manage state by providing a state value and a function to update it.
 * @param initialValue
 * @param Comp
 * @returns [state, setState]
 */
export function useState<S = unknown>(
  newState: S,
  Comp: Comp
): [S, (newState: S | ((preS: S) => S)) => void] {
  Comp._state_index += 1;
  const idx = Comp._state_index;
  if (idx >= Comp._state.length) {
    Comp._state[idx] = newState;
  }
  // if (Comp.test) {
  //   console.log({
  //     state: Comp._state,
  //     idx: Comp._state_index,
  //   });
  // }
  /**
   * cradova
   * ---
   * set new state and re-renders Comp
   * @param newState
   */
  function setState(newState: S | ((preS: S) => S)) {
    if (typeof newState === "function") {
      newState = (newState as (preS: S) => S)(Comp._state[idx]);
    }
    Comp._state[idx] = newState;
    Comp.recall();
  }
  return [Comp._state[idx] as S, setState];
}
/**
 * Cradova
 * ---
Allows side effects to be performed in functional components (Comps), such as fetching data or subscribing to events.
 * @param effect
 * @returns 
 */
export function useEffect(effect: () => void, Comp: Comp) {
  Comp._effect(effect);
}

/**
 * Cradova
 * ---
Returns a mutable reference object of dom elements.
 * @returns reference 
 */
export function useRef() {
  return new __raw_ref();
}
