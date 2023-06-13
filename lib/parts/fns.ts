import { VJSType, VJS_Child_TYPE } from "../types";
import { createSignal } from "./createSignal";

export const isNode = (node: any) =>
  typeof node === "object" && typeof node.nodeType === "number";

/**
 * Cradova event
 */

export class cradovaEvent {
  private listeners: Record<string, Function[]> = {};
  addEventListener(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  // removeEventListener(eventName: string, num: number) {
  //   this.listeners[eventName].splice(num, 1);
  // }
  dispatchEvent(eventName: string, eventArgs?: unknown) {
    const eventListeners = this.listeners[eventName] || [];
    for (; eventListeners.length !== 0; ) {
      eventListeners.shift()?.call(undefined, eventArgs);
    }
  }
}

export const CradovaEvent = new cradovaEvent();

export function Rhoda(
  l: VJSType<HTMLElement>[] | (() => any)[] | Ref<unknown>[] | HTMLElement[]
) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (ch instanceof Ref) {
        ch = ch.render(undefined);
      }
      if (typeof ch === "function") {
        ch = ch() as VJSType<HTMLElement>;
        if (typeof ch === "function") {
          ch = ch() as VJSType<HTMLElement>;
        }
      }
      if (typeof ch === "string" || typeof ch === "number") {
        fg.appendChild(document.createTextNode(ch as string));
        continue;
      }
      if (isNode(ch)) {
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

export function css(identifier: string | TemplateStringsArray) {
  /*This is for creating
 css styles using JavaScript*/
  if (Array.isArray(identifier)) {
    identifier = identifier[0];
  }
  if (typeof identifier === "string") {
    let styTag = document.querySelector("style");
    if (styTag !== null) {
      styTag.textContent = identifier + styTag.textContent!;
      return;
    }
    styTag = document.createElement("style");
    styTag.textContent = identifier;
    document.head.appendChild(styTag);
  }
}

/**
 *
 * @param {expression} condition
 * @param {function} elements[]
 */

export function assert(
  condition: boolean,
  ...elements: VJS_Child_TYPE<HTMLElement>[]
) {
  if (condition) {
    return elements;
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
  ) => HTMLElement | undefined
) {
  if (typeof component !== "function") {
    throw new Error(
      " ✘  Cradova err :  Invalid component type, must be a function that returns html  "
    );
  }
  return Array.isArray(datalist)
    ? (datalist.map(component) as unknown as HTMLElement)
    : undefined;
}

export function assertOr(
  condition: boolean,
  ifTrue: HTMLElement | HTMLElement[],
  ifFalse: HTMLElement | HTMLElement[]
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
}

// type RefProps<T> = Record<string, T> | T;
// RefProps<string | number | Record<string, unknown> | undefined | null>;
/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

export class Ref<D> {
  private component: (this: Ref<D>, data: D) => HTMLElement;
  private effects: (() => Promise<void> | void)[] = [];
  private effectuate: ((this: Ref<D>) => void) | null = null;
  private rendered = false;
  private published = false;
  private hasFirstStateUpdateRun = false;
  private preRendered: HTMLElement | null = null;
  private reference: reference = new reference();
  Signal: createSignal<any> | undefined;
  // public testName = null;
  public stash: D | undefined;

  constructor(component: (this: Ref<D>, data: D) => HTMLElement) {
    this.component = component.bind(this);
  }

  preRender(data?: D) {
    // parking
    let ihtml = this.component(data as D);
    let phtml;
    if (typeof ihtml === "function") {
      phtml = ihtml as Function;
      ihtml = phtml();
    }
    if (ihtml instanceof HTMLElement) {
      this.preRendered = ihtml;
    }
    if (!this.preRendered) {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref got  -  " +
          this.preRendered
      );
    }
    this.reference._appendDomForce("element", this.preRendered);
  }
  destroyPreRendered() {
    this.preRendered = null;
  }

  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(data?: D, stash?: boolean) {
    this.effects = [];
    this.rendered = false;
    this.hasFirstStateUpdateRun = false;
    let element: HTMLElement | null = null;
    if (!this.preRendered) {
      // parking
      let ihtml = this.component(data as D);
      let phtml;
      if (typeof ihtml === "function") {
        phtml = ihtml as Function;
        ihtml = phtml();
      }
      if (ihtml instanceof HTMLElement) {
        element = ihtml;
      }

      if (!element) {
        throw new Error(
          " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
            element
        );
      }
    }
    if (stash) {
      this.stash = data;
    }
    const av = async () => {
      await this.effector.apply(this);
      // CradovaEvent.removeEventListener("onmountEvent", num);
    };
    CradovaEvent.addEventListener("onmountEvent", av);
    this.effector();
    this.published = true;
    this.rendered = true;
    if (!element) {
      element = this.preRendered;
    }
    this.reference._appendDomForce("element", element as HTMLElement);
    return element as HTMLElement;
  }
  instance() {
    return this.reference.element;
  }
  _setExtra(Extra: createSignal<any>) {
    this.Signal = Extra;
  }

  /**
   * Cradova Ref
   * ---
   * runs on first state update
   *
   */
  effect(fn: () => Promise<void> | void) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }

  private async effector() {
    if (!this.rendered) {
      for (let i = 0; i < this.effects.length; i++) {
        await this.effects[i].apply(this);
      }
    }
    // first update
    if (!this.hasFirstStateUpdateRun && this.effectuate) {
      await this.effectuate();
    }
    this.hasFirstStateUpdateRun = true;
  }

  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns void
   *
   *
   * .
   */

  updateState(data: D, stash?: boolean) {
    if (!this) {
      console.error(
        " ✘  Cradova err:  Ref.updateState has is passed out of scope"
      );
      return;
    }
    if (!this.rendered) {
      async function updateState(this: Ref<D>, data: D) {
        await this.Activate(data);
      }
      this.effectuate = updateState.bind(this, data);
    } else {
      if (this.published) {
        (async () => {
          await this.Activate(data);
        })();
      }
    }
    if (stash) {
      this.stash = data;
    }
  }

  private async Activate(data: D) {
    if (!data) {
      return;
    }

    this.published = false;

    if (!this.reference.element) {
      return;
    }
    let ihtml = this.component(data as D);
    let element;
    let phtml;
    if (typeof ihtml === "function") {
      phtml = ihtml as Function;
      ihtml = phtml();
    }
    if (ihtml instanceof HTMLElement) {
      element = ihtml;
    }
    if (!element) {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
          element
      );
    }
    this.reference.element.insertAdjacentElement("beforebegin", element);
    if (this.reference.element.parentElement) {
      this.reference.element.parentElement.removeChild(this.reference.element);
    } else {
      this.reference.element.remove();
    }
    this.reference._appendDomForce("element", element);
    this.published = true;
    CradovaEvent.dispatchEvent("onmountEvent");
  }
  remove() {
    this.reference.element.remove();
  }
}

/**
 * Document fragment
 * @param children
 * @returns
 */

export const frag = function (children: VJSType<HTMLElement>[]) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    let a: HTMLElement | (() => HTMLElement) = children[i];
    if (typeof a === "function") {
      a = a() as HTMLElement;
    }
    if (isNode(a)) {
      par.appendChild(a);
      continue;
    }
    if (a instanceof String) {
      par.appendChild(document.createTextNode(a as unknown as string));
      continue;
    }
    console.error(" ✘  Cradova err:   wrong element type" + a);
    throw new TypeError(" ✘  Cradova err:   invalid element");
  }
  return par;
};

// export const svgNS = (
//   type: string,
//   props: Record<string, unknown>,
//   ...children: unknown
// ) => {
//   const sc = document.createElementNS(
//     props.xmlns || "http://www.w3.org/2000/svg",
//     type
//   );
//   delete props.xmlns;
//   for (const p in props) {
//     sc.setAttributeNS(null, p, props[p]);
//   }
//   for (let ch of children) {
//     if (typeof ch === "function") {
//       ch = ch();
//     }
//     if (typeof ch === "function") {
//       ch = ch();
//     }
//     sc.appendChild(ch);
//   }
//   return sc;
// };

export class lazy<Type> {
  public content: Type | undefined;
  private _cb: () => Promise<unknown>;
  constructor(cb: () => Promise<unknown>) {
    this._cb = cb;
  }
  async load() {
    let content = await this._cb();
    if (typeof content === "function") {
      content = await content();
    } else {
      content = await content;
    }
    const def = content as { default: unknown };
    if (def.default) {
      this.content = def?.default as Type;
    }
  }
}

/**
 * Cradova
 * ---
 * make reference to dom elements
 */

export class reference {
  [x: string]: Record<string, any>;

  bindAs(name: string) {
    return [this, name] as unknown as reference;
  }

  // _appendDom(name: string, Element: HTMLElement) {
  //   if (!Object.hasOwnProperty.call(this, name)) {
  //     this[name] = Element;
  //   } else {
  //     if (Array.isArray(this[name])) {
  //       this[name].push(Element);
  //     } else {
  //       this[name] = [this[name], Element];
  //     }
  //   }
  // }

  _appendDomForce(name: string, Element: HTMLElement) {
    this[name] = Element;
  }
}
