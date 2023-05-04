import { createSignal } from "./createSignal";

export const isNode = (node: any) =>
  typeof node === "object" && typeof node.nodeType === "number";

/**
 * Cradova event
 */

export class cradovaEvent {
  private listeners: Record<string, any[]> = {};
  addEventListener(eventName: string, callback: any) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  removeEventListener(eventName: string, callback: any) {
    if (this.listeners[eventName]) {
      const index = this.listeners[eventName].indexOf(callback);
      if (index !== -1) {
        this.listeners[eventName].splice(index, 1);
      }
    }
  }

  dispatchEvent(eventName: string, eventArgs?: any) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      for (let i = 0; i < eventListeners.length; i++) {
        eventListeners[i](eventArgs);
      }
    }
  }
}

export const CradovaEvent = new cradovaEvent();

export function Rhoda(l: any[]) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (typeof ch === "function") {
        ch = ch();
      }
      if (typeof ch === "function") {
        ch = ch();
      }
      if (typeof ch === "string" || typeof ch === "number") {
        fg.appendChild(document.createTextNode(ch as string));
        continue;
      }
      if (isNode(ch)) {
        fg.appendChild(ch);
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

export function css(identifier: string) {
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

export function assert(condition: any, ...elements: any) {
  if (condition) {
    return elements;
  }
  return undefined;
}
export function loop(
  datalist: any[],
  component: (value: any, index?: number, array?: any[]) => any
) {
  if (typeof component !== "function") {
    throw new Error(
      " ✘  Cradova err :  Invalid component type, must be a function that returns html  "
    );
  }
  // am trying to confuse typescript compiler, but i know what am trying to do
  return Array.isArray(datalist)
    ? (datalist.map(component) as unknown as HTMLElement)
    : undefined;
}

export function assertOr(
  condition: boolean,
  ifTrue: () => any,
  ifFalse: () => any
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

type RefProps<D> = D | any;

export class Ref<D> {
  private component: (data?: D) => HTMLElement | ((data?: D) => HTMLElement);
  private effects: (() => Promise<unknown>)[] = [];
  private effectuate: (() => unknown) | null = null;
  private rendered = false;
  private published = false;
  private hasFirstStateUpdateRun = false;
  private preRendered: HTMLElement | null = null;
  private reference: reference = new reference();
  Signal: createSignal<any> | undefined;
  // public testName = null;
  public stash: D | undefined;

  constructor(component: (data?: RefProps<D>) => any) {
    this.component = component.bind(this);
  }

  preRender(data?: RefProps<D>) {
    // parking
    const chtml = this.component(data);
    if (chtml instanceof HTMLElement) {
      this.preRendered = chtml;
    } else {
      this.preRendered = chtml();
    }
    // @ts-ignore
    if (!this.preRendered) {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref got  -  " +
          this.preRendered
      );
    }
    this.reference._appendDomForce("reference", this.preRendered);
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
      const chtml = this.component(data);
      if (chtml instanceof HTMLElement) {
        element = chtml;
      } else {
        element = chtml();
      }
      // @ts-ignore
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
      CradovaEvent.removeEventListener("cradovaAftermountEvent", av);
    };
    CradovaEvent.addEventListener("cradovaAftermountEvent", av);
    this.effector();
    this.published = true;
    this.rendered = true;
    if (!element) {
      element = this.preRendered;
    }
    this.reference._appendDomForce("reference", element);
    return element as HTMLElement;
  }
  instance() {
    // @ts-ignore
    return this.reference.reference;
  }
  _setExtra(Extra: createSignal<any>) {
    // @ts-ignore
    this.Signal = Extra;
  }

  /**
   * Cradova Ref
   * ---
   * runs on first state update
   *
   */
  effect(fn: () => Promise<unknown>) {
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
      async function updateState(this: any, data: any) {
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

  // @ts-ignore
  private async Activate(data: any) {
    if (!data) {
      return;
    }
    this.published = false;

    // @ts-ignore
    if (!this.reference.reference) {
      return;
    }
    const chtml = this.component(data);
    let element;
    if (chtml instanceof HTMLElement) {
      element = chtml;
    } else {
      element = chtml();
    }
    if (!element) {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
          element
      );
    }
    try {
      // @ts-ignore
      this.reference.reference.insertAdjacentElement("beforebegin", element);
      // @ts-ignore
      if (this.reference.reference.parentElement) {
        // @ts-ignore
        this.reference.reference.parentElement.removeChild(
          // @ts-ignore
          this.reference.reference
        );
      } else {
        // @ts-ignore
        this.reference.reference.remove();
      }
      this.reference._appendDomForce("reference", element);
    } catch (e0) {
      console.error(e0);
    }
    this.published = true;
  }
  remove() {
    // @ts-ignore
    this.reference.reference.remove();
  }
}

/**
 * Document fragment
 * @param children
 * @returns
 */

export const frag = function (children: any) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    let a = children[i];
    if (typeof a === "function") {
      a = a() as any;
    }
    if (typeof a === "function") {
      a = a() as any;
    }
    if (isNode(a)) {
      // @ts-ignore
      par.appendChild(a);
      continue;
    }
    if (a instanceof String) {
      par.appendChild(document.createTextNode(a as string));
      continue;
    }
    console.error(" ✘  Cradova err:   wrong element type" + a);
    throw new TypeError(" ✘  Cradova err:   invalid element");
  }
  return par;
};

export const svgNS = (
  type: string,
  props: Record<string, any>,
  ...children: any
) => {
  const sc = document.createElementNS(
    props.xmlns || "http://www.w3.org/2000/svg",
    type
  );
  delete props.xmlns;
  for (const p in props) {
    sc.setAttributeNS(null, p, props[p]);
  }
  for (let ch of children) {
    if (typeof ch === "function") {
      ch = ch();
    }
    if (typeof ch === "function") {
      ch = ch();
    }
    sc.appendChild(ch);
  }
  return sc;
};

export class lazy {
  public content: any = undefined;
  private _cb: () => Promise<any>;
  constructor(cb: () => Promise<any>) {
    this._cb = cb;
  }
  async load() {
    this.content = await this._cb();
    if (typeof this.content === "function") {
      this.content = await this.content;
    } else {
      this.content = await this.content;
    }
    this.content = this.content.default;
  }
}

export class reference {
  bindAs(name: string) {
    return [this, name];
  }
  _appendDom(name: string, Element: any) {
    if (!Object.hasOwnProperty.call(this, name)) {
      // @ts-ignore
      this[name] = Element;
    } else {
      // @ts-ignore
      if (Array.isArray(this[name])) {
        // @ts-ignore
        this[name].push(Element);
      } else {
        // @ts-ignore
        this[name] = [this[name], Element];
      }
      // throw new Error(
      //   `✘  Cradova err : Couldn't create reference to dom element as ${name}`
      // );
    }
  }
  _appendDomForce(name: string, Element: any) {
    // @ts-ignore
    this[name] = Element;
  }
}
