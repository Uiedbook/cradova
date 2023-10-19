/*
============================================================================="
    ██████╗   ██████╗    █████═╗   ███████╗    ███████╗    ██╗   ██╗  █████╗   
   ██╔════╝   ██╔══██╗  ██╔═╗██║   █      ██  ██╔═════╝█   ██║   ██║  ██╔═╗██  
   ██║        ██████╔╝  ███████║   █      ██  ██║     ██   ██║   ██║  ██████╗  
   ██║        ██╔══██╗  ██║  ██║   █      ██  ██║     ██   ╚██╗ ██╔╝  ██║  ██╗ 
   ╚██████╗   ██║  ██║  ██║  ██║   ███████╔╝   ████████      ╚███╔╝   ██║  ██║ 
    ╚═════╝   ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝        ╚══╝    ╚═╝  ╚═╝ 
    =============================================================================
    Cradova FrameWork
    @version  3.0.0
    License: Apache V2
Copyright 2022 Friday Candour. 
Repository - https://github.com/fridaycandour/cradova
=============================================================================
*/
import * as CSS from "csstype";

/**
 *  Cradova Signal
 * ----
 *  Create stateful data store.
 *  Features:
 * - create a store
 * - create actions and fire them
 * - bind a Ref and elements
 * - listen to updates
 * - set object keys instead of all values
 * - persist changes to localStorage
 * - update a cradova Ref automatically
 * @constructor initial: unknown, props: {useHistory, persist}
 */
declare class createSignal<Type extends Record<string, unknown>> {
  private callback;
  private persistName;
  private actions;
  private ref;
  value: Type;
  constructor(
    initial: Type,
    props?: {
      persistName?: string | undefined;
    }
  );
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   */
  set(value: Type | ((value: Type) => Type), shouldRefRender?: boolean): void;
  /**
   *  Cradova Signal
   * ----
   *  set a key value if it's an object
   * @param key - key of the key
   * @param value - value of the key
   * @returns void
   */
  setKey<k extends keyof Type>(
    key: k,
    value: unknown,
    shouldRefRender?: boolean
  ): void;
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */
  createAction(name: string, action: (data?: unknown) => void): void;
  /**
   *  Cradova Signal
   * ----
   *  creates man y actions at a time
   * @param name - name of the action
   * @param action function to execute
   */
  createActions(Actions: Record<string, (data?: unknown) => void>): void;
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param key - string key of the action
   * @param data - data for the action
   */
  fireAction(key: string, data?: Type): Type;
  /**
   * Cradova
   * ---
   * is used to bind signal data to elements and Refs
   *
   * @param prop
   * @returns something
   */
  bind(prop: string): any;
  private _updateState;
  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */
  bindRef(
    ref: Partial<Ref<unknown>>,
    binding?: {
      event?: string;
      signalProperty: string;
      _element_property: string;
    }
  ): void;
  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */
  listen(callback: (a: Type) => void): void;
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   *
   */
  clearPersist(): void;
}

declare const isNode: (element: unknown) => boolean;
/**
 * Cradova event
 */
declare class cradovaEvent {
  private listeners;
  addEventListener(eventName: string, callback: () => void): Promise<void>;
  dispatchEvent(eventName: string, eventArgs?: unknown): Promise<void>;
}
declare const CradovaEvent: cradovaEvent;
declare function Rhoda(
  l: VJSType<HTMLElement>[] | (() => any)[] | Ref<unknown>[] | HTMLElement[]
): DocumentFragment;
declare function css(identifier: string | TemplateStringsArray): void;
/**
 *
 * @param {expression} condition
 * @param {function} elements[]
 */
declare function assert<Type>(
  condition: boolean,
  ...elements: VJS_Child_TYPE<Type | HTMLElement>[]
): HTMLElement[] | undefined;
declare function assertOr<Type>(
  condition: boolean,
  ifTrue: VJS_Child_TYPE<Type | HTMLElement>,
  ifFalse: VJS_Child_TYPE<Type | HTMLElement>
): VJS_Child_TYPE<HTMLElement | Type>;
type LoopData<Type> = Type[];
declare function loop<Type>(
  datalist: LoopData<Type>,
  component: (
    value: Type,
    index?: number,
    array?: LoopData<Type>
  ) => HTMLElement | DocumentFragment | undefined
): HTMLElement[] | undefined;
/**
 * Cradova Ref
 * -------
 * create dynamic components
 */
declare class Ref<D> {
  private component;
  private effects;
  private effectuate;
  private rendered;
  private published;
  private preRendered;
  private reference;
  private current_id?;
  Signal: createSignal<any> | undefined;
  _state: D[];
  _state_track: {
    [x: number]: boolean;
  };
  _state_index: number;
  stash: D | undefined;
  constructor(
    component: (this: Ref<D>, data: D) => HTMLElement | DocumentFragment
  );
  preRender(data?: D, stash?: boolean): void;
  destroyPreRendered(): void;
  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(data?: D, stash?: boolean): HTMLElement | DocumentFragment;
  instance(): Record<string, any>;
  _setExtra(Extra: createSignal<any>): void;
  _roll_state(data: D, idx: number, get?: boolean): D;
  _effect(fn: () => Promise<void> | void): void;
  private effector;
  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns
   */
  updateState(data?: D, stash?: boolean): void;
  private Activate;
}
/**
 * Document fragment
 * @param children
 * @returns
 */
declare const frag: (children: VJSType<HTMLElement>[]) => DocumentFragment;
/**
 * cradova
 * ---
 * lazy load a file
 */
declare class lazy<Type> {
  content: Type | undefined;
  private _cb;
  constructor(cb: () => Promise<unknown>);
  load(): Promise<void>;
}
/**
 * Cradova
 * ---
 * make reference to dom elements
 */
declare class reference {
  [x: string]: Record<string, any>;
  /**
   * Bind a DOM element to a reference name.
   * @param name - The name to reference the DOM element by.
   */
  bindAs(name: string): reference;
  /**
   * Retrieve a referenced DOM element.
   * @param name - The name of the referenced DOM element.
   */
  dom<ElementType extends HTMLElement>(name: string): ElementType | undefined;
  /**
   * Append a DOM element to the reference, overwriting any existing reference.
   * @param name - The name to reference the DOM element by.
   * @param element - The DOM element to reference.
   */
  _appendDomForce(name: string, Element: HTMLElement): void;
}
/**
 * Cradova
 * ---
 *  Allows functional components to manage state by providing a state value and a function to update it.
 * @param initialValue
 * @param ActiveRef
 * @returns [state, setState]
 */
declare function useState<S = unknown>(
  initialValue: S,
  ActiveRef: Ref<unknown>
): [S, (newState: S) => void];
/**
 * Cradova
 * ---
Allows side effects to be performed in functional components (Refs), such as fetching data or subscribing to events.
 * @param effect
 * @returns
 */
declare function useEffect(effect: () => void, ActiveRef: Ref<unknown>): void;
/**
 * Cradova
 * ---
Returns a mutable reference object of dom elements that persists across component renders.
 * @returns reference
 */
declare function useRef(): Record<string, HTMLElement | undefined>;

/**
 *  Cradova Screen
 * ---
 * create instances of manageable pages and scaffolds
 * @param name
 * @param template
 * @param transitions
 */
declare class Screen {
  /**
   * this should be a cradova screen component
   */
  _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  /**
   * error handler for the screen
   */
  _errorHandler: ((err: unknown) => void) | null;
  /**
   * used internally
   */
  _name: string;
  private _packed;
  private _template;
  private _callBack;
  private _deCallBack;
  private _persist;
  private _delegatedRoutesCount;
  private _transition;
  private _dropped;
  constructor(cradova_screen_initials: CradovaScreenType);
  get _delegatedRoutes(): boolean;
  set _delegatedRoutes(count: boolean);
  setErrorHandler(errorHandler: (err: unknown) => void): void;
  _package(): Promise<void>;
  onActivate(cb: () => Promise<void> | void): void;
  onDeactivate(cb: () => Promise<void> | void): void;
  _deActivate(): Promise<void>;
  drop(state?: boolean): boolean | undefined;
  _Activate(force?: boolean): Promise<void>;
}

type DataAttributes = {
  [key: `data-${string}`]: string;
};
type AriaAttributes = {
  [key: `aria-${string}`]: string;
};
type VJSType<T> = (
  ...VJS: (
    | undefined
    | string
    | HTMLElement
    | HTMLElement[]
    | Ref<unknown>
    | Ref<unknown>[]
    | DocumentFragment
    | DocumentFragment[]
    | TemplateStringsArray
    | Partial<T>
    | (() => HTMLElement)
    | Partial<DataAttributes>
    | Partial<AriaAttributes>
    | CSS.Properties
    | {
        style?: CSS.Properties;
        onmount?: (this: T) => void;
        reference?: reference;
      }
  )[]
) => T;
type VJS_params_TYPE<T> = (
  | undefined
  | string
  | HTMLElement
  | HTMLElement[]
  | Ref<unknown>
  | Ref<unknown>[]
  | DocumentFragment
  | DocumentFragment[]
  | TemplateStringsArray
  | Partial<T>
  | (() => HTMLElement)
  | Partial<DataAttributes>
  | Partial<AriaAttributes>
  | CSS.Properties<string | number>
  | {
      src?: string;
      href?: string;
      placeholder?: string;
      type?: string;
      action?: string;
      name?: string;
      alt?: string;
      for?: string;
      method?: string;
      rows?: string;
      value?: string;
      target?: string;
      rel?: string;
      required?: string;
      frameBorder?: string;
      style?: CSS.Properties;
      onmount?: (this: T) => void;
      reference?: reference;
    }
)[];
type VJS_Child_TYPE<T> = undefined | string | T | (() => T);
type VJS_props_TYPE = {
  style?: CSS.Properties;
  onmount?: () => void;
  reference?: reference;
};
type CradovaScreenType<T = unknown> = {
  /**
   * Cradova screen
   * ---
   * title of the page
   * .
   */
  name: string;
  /**
   * Cradova screen
   * ---
   * a css className to add to screen when rendering it
   * Usually for adding css transitions
   * .
   */
  transition?: string;
  /**
   * Cradova screen
   * ---
   * The component for the screen
   * @param data
   * @returns void
   * .
   */
  template:
    | ((this: Screen, data?: T | unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  /**
   * Cradova screen
   * ---
   * Allows this screen render in parallel for unique routes
   *
   * limit is 1000
   *
   * .
   */
  renderInParallel?: boolean;
  /**
   * Cradova screen
   * ---
   * Should this screen be cached after first render?
   * you can use Route.navigate(url, null, true) to force later
   *
   * .
   */
  persist?: boolean;
};

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param  screen the cradova document tree for the route.
 */
declare class Router {
  /** cradova router
   * ---
   * Registers a route.
   *
   * accepts an object containing
   *
   * @param {string}   path     Route path.
   * @param  screen the cradova screen.
   */
  static BrowserRoutes(obj: Record<string, any>): void;
  /**
      Go back in Navigation history
      */
  static back(): void;
  /**
      Go forward in Navigation history
      */
  static forward(): void;
  /**
      Pause navigation
      */
  static pauseNaviagtion(): void;
  /**
     resume navigation
    */
  static resumeNaviagtion(): void;
  /**
   * Cradova Router
   * ------
   *
   * Navigates to a designated screen in your app
   *
   * @param href string
   * @param data object
   * @param force boolean
   */
  static navigate(
    href: string,
    data?: Record<string, unknown> | null,
    force?: boolean
  ): void;
  /**
   * Cradova Router
   * ------
   *
   * Navigates to a designated screen in your app by loading a seperate page;
   *
   * @param pathname string
   */
  static navigateNauturally(pathname: string): void;
  /**
   * Cradova
   * ---
   * Loading screen for your app
   *
   * lazy loaded loading use
   *
   * @param screen
   */
  static setLoadingScreen(screen: Screen): void;
  /** cradova router
   * ---
   * Listen for navigation events
   *
   * @param callback   () => void
   */
  static onPageEvent(callback: () => void): void;
  /** cradova router
   * ---
   * get a screen ready before time.
   *
   * @param {string}   path Route path.
   * @param  data data for the screen.
   */
  static packageScreen(
    path: string,
    data?: Record<string, unknown>
  ): Promise<void>;
  /**
   * Cradova Router
   * ------
   *
   * return last set router params
   *
   * .
   */
  static getParams(): any;
  /**
   * Cradova
   * ---
   * Error Handler for your app
   *
   * @param callback
   * @param path? page path
   */
  static addErrorHandler(callback: (err: unknown) => void): void;
  static _mount(): void;
}

declare const makeElement: <E extends HTMLElement>(
  element: E & HTMLElement,
  ElementChildrenAndPropertyList: VJS_params_TYPE<E>
) => E;
declare const make: (descriptor: any) => any[];
declare const a: VJSType<HTMLAnchorElement>;
declare const area: VJSType<HTMLAreaElement>;
declare const article: VJSType<HTMLElement>;
declare const aside: VJSType<HTMLElement>;
declare const audio: VJSType<HTMLAudioElement>;
declare const b: VJSType<HTMLElement>;
declare const base: VJSType<HTMLBaseElement>;
declare const blockquote: VJSType<HTMLElement>;
declare const br: VJSType<HTMLBRElement>;
declare const button: VJSType<HTMLButtonElement>;
declare const canvas: VJSType<HTMLCanvasElement>;
declare const caption: VJSType<HTMLTableCaptionElement>;
declare const code: VJSType<HTMLElement>;
declare const col: VJSType<HTMLTableColElement>;
declare const colgroup: VJSType<HTMLOptGroupElement>;
declare const data: VJSType<HTMLDataElement>;
declare const datalist: VJSType<HTMLDataListElement>;
declare const details: VJSType<HTMLDetailsElement>;
declare const dialog: VJSType<HTMLDialogElement>;
declare const div: VJSType<HTMLDivElement>;
declare const em: VJSType<HTMLElement>;
declare const embed: VJSType<HTMLEmbedElement>;
declare const figure: VJSType<HTMLElement>;
declare const footer: VJSType<HTMLElement>;
declare const form: VJSType<HTMLFormElement>;
declare const h1: VJSType<HTMLHeadingElement>;
declare const h2: VJSType<HTMLHeadingElement>;
declare const h3: VJSType<HTMLHeadingElement>;
declare const h4: VJSType<HTMLHeadingElement>;
declare const h5: VJSType<HTMLHeadingElement>;
declare const h6: VJSType<HTMLHeadingElement>;
declare const head: VJSType<HTMLHeadElement>;
declare const header: VJSType<HTMLHeadElement>;
declare const hr: VJSType<HTMLHRElement>;
declare const i: VJSType<HTMLLIElement>;
declare const iframe: VJSType<HTMLIFrameElement>;
declare const img: VJSType<HTMLImageElement>;
declare const input: VJSType<HTMLInputElement>;
declare const label: VJSType<HTMLLabelElement>;
declare const legend: VJSType<HTMLLegendElement>;
declare const li: VJSType<HTMLLIElement>;
declare const link: VJSType<HTMLLinkElement>;
declare const main: VJSType<HTMLElement>;
declare const menu: VJSType<HTMLMenuElement>;
declare const nav: VJSType<HTMLElement>;
declare const object: VJSType<HTMLObjectElement>;
declare const ol: VJSType<HTMLOListElement>;
declare const optgroup: VJSType<HTMLOptGroupElement>;
declare const option: VJSType<HTMLOptionElement>;
declare const p: VJSType<HTMLParagraphElement>;
declare const pre: VJSType<HTMLPreElement>;
declare const progress: VJSType<HTMLProgressElement>;
declare const q: VJSType<HTMLQuoteElement>;
declare const section: VJSType<HTMLElement>;
declare const select: VJSType<HTMLSelectElement>;
declare const source: VJSType<HTMLSourceElement>;
declare const span: VJSType<HTMLSpanElement>;
declare const strong: VJSType<HTMLElement>;
declare const summary: VJSType<HTMLElement>;
declare const table: VJSType<HTMLTableElement>;
declare const tbody: VJSType<HTMLTableColElement>;
declare const td: VJSType<HTMLTableCellElement>;
declare const template: VJSType<HTMLTemplateElement>;
declare const textarea: VJSType<HTMLTextAreaElement>;
declare const th: VJSType<HTMLTableSectionElement>;
declare const title: VJSType<HTMLTitleElement>;
declare const tr: VJSType<HTMLTableRowElement>;
declare const track: VJSType<HTMLTrackElement>;
declare const u: VJSType<HTMLUListElement>;
declare const ul: VJSType<HTMLUListElement>;
declare const video: VJSType<HTMLVideoElement>;
declare const svg: (
  svg: string,
  properties?: VJS_props_TYPE
) => HTMLSpanElement;

/**
 *
 * Cradova Ajax
 * ------------------
 * your new axios alternative
 * supports files upload
 * @param url string
 * @param {{method: string;data;header;callbacks;}} opts
 * @returns unknown
 */
declare function Ajax(
  url: string | URL,
  opts?: {
    method?: "GET" | "POST";
    data?: Record<string, unknown>;
    header?: {
      "content-type"?: string;
    } & Record<string, string>;
    callbacks?: Record<string, (arg: Function) => void>;
  }
): Promise<string>;

type TemplateType = <E extends HTMLElement>(
  ...element_initials: VJS_params_TYPE<E | HTMLElement>
) => E | HTMLElement | DocumentFragment;
/**
 * Cradova
 * ---
 * Creates new cradova HTML element
 *  @example
 * // using template
 * const p = _("p");
 * _("p.class");
 * _("p#id");
 * _("p.class#id");
 * _("p.foo.bar#poo.loo");
 *
 * // using inline props
 *
 * _("p",{
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * })
 *
 * // props and children
 * _("p", // template first
 *  // property next if wanted
 *  {style: {color: "brown"}, // optional
 *  // the rest should be children or text
 * _("span", " am a span tag text like so"),
 * ...
 * )
 *
 * @param element_initials
 * @returns function - cradova element
 */
declare const _: TemplateType;

export {
  Ajax,
  CradovaEvent,
  Ref,
  Rhoda,
  Router,
  Screen,
  a,
  area,
  article,
  aside,
  assert,
  assertOr,
  audio,
  b,
  base,
  blockquote,
  br,
  button,
  canvas,
  caption,
  code,
  col,
  colgroup,
  createSignal,
  css,
  data,
  datalist,
  _ as default,
  details,
  dialog,
  div,
  em,
  embed,
  figure,
  footer,
  form,
  frag,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hr,
  i,
  iframe,
  img,
  input,
  isNode,
  label,
  lazy,
  legend,
  li,
  link,
  loop,
  main,
  make,
  makeElement,
  menu,
  nav,
  object,
  ol,
  optgroup,
  option,
  p,
  pre,
  progress,
  q,
  reference,
  section,
  select,
  source,
  span,
  strong,
  summary,
  svg,
  table,
  tbody,
  td,
  template,
  textarea,
  th,
  title,
  tr,
  track,
  u,
  ul,
  useEffect,
  useRef,
  useState,
  video,
};
