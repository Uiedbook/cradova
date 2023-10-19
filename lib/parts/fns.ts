import { VJSType, VJS_Child_TYPE } from "../types";
import { createSignal } from "./createSignal";
// import { createSignal } from "./createSignal";

export const isNode = (element: unknown) =>
  element instanceof HTMLElement || element instanceof DocumentFragment;

/**
 * Cradova event
 */

class cradovaEvent {
  private listeners: Record<string, Function[]> = {};
  async addEventListener(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  // removeEventListener(eventName: string, num: number) {
  //   this.listeners[eventName].splice(num, 1);
  // }
  async dispatchEvent(eventName: string, eventArgs?: unknown) {
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

export function assert<Type>(
  condition: boolean,
  ...elements: VJS_Child_TYPE<Type | HTMLElement>[]
) {
  if (condition) {
    return elements as HTMLElement[];
  }
  return undefined;
}

export function assertOr<Type>(
  condition: boolean,
  ifTrue: VJS_Child_TYPE<Type | HTMLElement>,
  ifFalse: VJS_Child_TYPE<Type | HTMLElement>
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
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
function SNRU(url: string) {
  let key = 0;
  for (let i = 0; i < url.length; i++) {
    key += url.charCodeAt(i);
  }
  return key.toString();
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
  private current_id?: string;
  Signal: createSignal<any> | undefined;
  //? hooks management
  _state: D[] = [];
  _state_track: { [x: number]: boolean } = {};
  _state_index = 0;
  //? public testName = null;
  public stash: D | undefined;
  constructor(
    component: (this: Ref<D>, data: D) => HTMLElement | DocumentFragment
  ) {
    this.component = component.bind(this);
    CradovaEvent.addEventListener("onTransition", () => {
      //? kick of screen id ref logic
      this.current_id = SNRU(location.href);
    });
  }

  preRender(data?: D, stash?: boolean) {
    // ? parking
    this.reference._appendDomForce(
      this.current_id!,
      this.render(data, stash) as HTMLElement
    );
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
      this.reference._appendDomForce(
        this.current_id!,
        html as unknown as HTMLElement
      );
      this.effector.apply(this);
      this.rendered = true;
      this.published = true;
    } else {
      console.error(" ✘  Cradova err :  Invalid html content, got  - " + html);
    }
    return html as HTMLElement | DocumentFragment;
  }
  instance() {
    return this.reference.html;
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
    this.current_id = SNRU(location.href);
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
      this.reference.html.insertAdjacentElement("beforebegin", html);
      this.reference.html.remove();
      this.published = true;
      this.reference._appendDomForce(
        this.current_id!,
        html as unknown as HTMLElement
      );
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
  [x: string]: Record<string, any>;

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
  dom<ElementType extends HTMLElement>(name: string) {
    return this[name] as ElementType | undefined;
  }

  /**
   * Append a DOM element to the reference, overwriting any existing reference.
   * @param name - The name to reference the DOM element by.
   * @param element - The DOM element to reference.
   */
  _appendDomForce(name: string, Element: HTMLElement) {
    this[name] = Element;
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
