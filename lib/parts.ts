/*! *****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { VJSType, VJS_Child_TYPE } from "./types";
import { createSignal } from "./Signal";

export const isNode = (element: unknown) =>
  element instanceof HTMLElement || element instanceof DocumentFragment;

/**
 * Cradova event
 */

class cradovaEvent {
  private listeners: Record<string, Function[]> = {};
  private active_listeners: Record<string, Function[]> = {};
  async addEventListener(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  async addActiveEventListener(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.active_listeners[eventName].push(callback);
  }
  // removeEventListener(eventName: string, num: number) {
  //   this.listeners[eventName].splice(num, 1);
  // }
  async dispatchEvent(eventName: string, eventArgs?: unknown) {
    const eventListeners = this.listeners[eventName] || [];
    for (; eventListeners.length !== 0; ) {
      eventListeners.shift()!(eventArgs);
    }
  }
  async dispatchActiveEvent(eventName: string, eventArgs?: unknown) {
    const eventListeners = this.listeners[eventName] || [];
    // ? change snru value
    eventListeners.length && memo_SNRU();
    for (let i = 0; i < eventListeners.length; i++) {
      eventListeners[i](eventArgs);
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
        ch = ch.render(undefined) as HTMLElement;
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

export function $if<Type>(
  condition: boolean,
  ...elements: VJS_Child_TYPE<Type | HTMLElement>[]
) {
  if (condition) {
    return elements as HTMLElement[];
  }
  return undefined;
}

export function $ifelse<Type>(
  condition: boolean,
  ifTrue: VJS_Child_TYPE<Type | HTMLElement>,
  ifFalse: VJS_Child_TYPE<Type | HTMLElement>
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
}

export function $case<Type>(
  value: any,
  ...elements: VJS_Child_TYPE<Type | HTMLElement>[]
) {
  return (key: any) => {
    if (key === value) {
      return elements as HTMLElement[];
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
let SNRU: string;
export function memo_SNRU() {
  let key = 0;
  const url = window.location.href;
  for (let i = 0; i < url.length; i++) {
    key += url.charCodeAt(i);
  }
  SNRU = key.toString();
}

/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

export class Ref<D> {
  private component: (this: Ref<D>, data: D) => HTMLElement | DocumentFragment;
  private effects: (() => Promise<void> | void)[] = [];
  private effectuate: ((this: Ref<D>) => void) | null = null;
  private rendered = false;
  private published = false;
  private preRendered: HTMLElement | null = null;
  private reference: reference = new reference();
  Signal: createSignal<any> | undefined;
  //? hooks management
  _state: D[] = [];
  _state_track: { [x: number]: boolean } = {};
  _state_index = 0;
  //? public testName = null;
  public stash: D | undefined;
  constructor(
    component: (this: Ref<D>, data: D) => HTMLElement | DocumentFragment,
    options?: { active: boolean } | boolean
  ) {
    this.component = component.bind(this);
    if (options && (options === true || options.active)) {
      CradovaEvent.addActiveEventListener("active-Refs", () => {
        // ? we can only send stash data
        this.updateState(this.stash);
      });
    }
  }

  preRender(data?: D, stash?: boolean) {
    // ? parking
    this.reference._appendDomForce(
      "html",
      this.render(data, stash) as HTMLElement
    );
  }
  destroyPreRendered() {
    this.preRendered = null;
  }

  /**
   * Cradova Ref
   * ---
   * construct to add custom methods to Refs
   * @param methodName
   * @param method
   * @returns  void
   */
  define(methodName: string, method: () => void) {
    if (
      typeof methodName == "string" &&
      typeof method == "function" &&
      !Object.prototype.hasOwnProperty.call(this, methodName)
    ) {
      (this as unknown as Record<string, Function>)[methodName] =
        method.bind(this);
    } else {
      console.error(" ✘  Cradova err :  Invalid Ref.define parameters");
    }
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
    let html = this.component(data as D);
    // parking
    if (typeof html === "function") {
      html = (html as Function)();
    }
    if (!html) {
      html = this.preRendered as unknown as HTMLElement;
    }
    if (stash) {
      this.stash = data;
    }
    if (isNode(html)) {
      this.reference._appendDomForce("html", html as unknown as HTMLElement);
      this.effector.apply(this);
      this.rendered = true;
      this.published = true;
    } else {
      console.error(" ✘  Cradova err :  Invalid html content, got  - " + html);
    }
    return html as HTMLElement | DocumentFragment;
  }
  instance() {
    return this.reference.current("html");
  }
  _setExtra(Extra: createSignal<any>) {
    this.Signal = Extra;
  }
  _roll_state(data: D, idx: number, get = false) {
    if (!get) {
      this._state[idx] = data;
    }
    return this._state[idx];
  }
  _effect(fn: () => Promise<void> | void) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }

  private async effector() {
    if (!this.rendered) {
      for (let i = 0; i < this.effects.length; i++) {
        await this.effects[i].apply(this);
      }
      this.effects = [];
    }
    // first update
    if (this.effectuate) {
      this.effectuate();
      this.effectuate = null;
    }
  }

  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns
   */

  updateState(data?: D, stash?: boolean) {
    if (!this.rendered) {
      this.effectuate = () => {
        if (this.published) {
          this.Activate(data);
        }
      };
    } else {
      if (this.published) {
        this.Activate(data);
      }
    }
    if (stash) {
      this.stash = data;
    }
  }

  private async Activate(data?: D) {
    this._state_index = 0;
    this.published = false;
    if (!this.rendered) {
      return;
    }
    let html = this.component(data as D);
    if (typeof html === "function") {
      html = (html as Function)();
    }
    if (isNode(html)) {
      const node = this.reference.current("html");
      if (node) {
        node.insertAdjacentElement("beforebegin", html as Element);
        node.remove();
      }
      this.published = true;
      this.reference._appendDomForce("html", html as unknown as HTMLElement);
      CradovaEvent.dispatchEvent("onmountEvent");
    } else {
      console.error(" ✘  Cradova err :  Invalid html content, got  - " + html);
    }
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

/**
 * cradova
 * ---
 * lazy load a file
 */
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
  tree: Record<string, any> = {};
  globalTree: Record<string, HTMLElement> = {};
  /**
   * Bind a DOM element to a reference name.
   * @param name - The name to reference the DOM element by.
   */
  bindAs(name: string) {
    return [this, name] as unknown as reference;
  }

  /**
   * Retrieve a referenced DOM element.
   * @param name - The name of the referenced DOM element.
   */
  current<ElementType extends HTMLElement = HTMLElement>(name: string) {
    if (this.tree[SNRU]) {
      return this.tree[SNRU][name] as ElementType;
    }
    return null as unknown as ElementType;
  }

  /**
   * Append a DOM element to the reference, overwriting any existing reference.
   * @param name - The name to reference the DOM element by.
   * @param element - The DOM element to reference.
   */
  _appendDomForce(name: string, Element: HTMLElement) {
    if (this.tree[SNRU]) {
      this.tree[SNRU][name] = Element;
    } else {
      this.tree[SNRU] = {};
      this.tree[SNRU][name] = Element;
    }
  }
  _appendDomForceGlobal(name: string, Element: HTMLElement) {
    this.globalTree[name] = Element;
  }
}

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
  ActiveRef: Ref<unknown>
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
    ActiveRef.updateState(newState);
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
export function useEffect(effect: () => void, ActiveRef: Ref<unknown>) {
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