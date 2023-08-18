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

declare module "cradova" {
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
  export class createSignal<Type extends Record<string, unknown>> {
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

  export const isNode: (element: unknown) => boolean;
  /**
   * Cradova event
   */
  export class cradovaEvent {
    private listeners;
    addEventListener(eventName: string, callback: () => void): void;
    dispatchEvent(eventName: string, eventArgs?: unknown): void;
  }
  export const CradovaEvent: cradovaEvent;
  export function Rhoda(
    l: VJSType<HTMLElement>[] | (() => any)[] | Ref<unknown>[] | HTMLElement[]
  ): DocumentFragment;
  export function css(identifier: string | TemplateStringsArray): void;
  /**
   *
   * @param {expression} condition
   * @param {function} elements[]
   */
  export function assert<Type>(
    condition: boolean,
    ...elements: VJS_Child_TYPE<Type | HTMLElement>[]
  ): HTMLElement[] | undefined;
  export function assertOr<Type>(
    condition: boolean,
    ifTrue: VJS_Child_TYPE<Type | HTMLElement>,
    ifFalse: VJS_Child_TYPE<Type | HTMLElement>
  ): VJS_Child_TYPE<HTMLElement | Type>;
  type LoopData<Type> = Type[];
  export function loop<Type>(
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
  export class Ref<D> {
    private component;
    private effects;
    private effectuate;
    private rendered;
    private published;
    private preRendered;
    private reference;
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
    preRender(data?: D): void;
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
  export const frag: (children: VJSType<HTMLElement>[]) => DocumentFragment;
  /**
   * cradova
   * ---
   * lazy load a file
   */
  export class lazy<Type> {
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
  export class reference {
    [x: string]: Record<string, any>;
    bindAs(name: string): reference;
    dom<ElementType>(name: string): ElementType | undefined;
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
  export function useState<S = unknown>(
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
  export function useEffect(effect: () => void, ActiveRef: Ref<unknown>): void;
  /**
     * Cradova
     * ---
    Returns a mutable reference object of dom elements that persists across component renders.
     * @returns reference
     */
  export function useRef(): Record<string, HTMLElement | undefined>;

  /**
   *  Cradova Screen
   * ---
   * create instances of manageable pages and scaffolds
   * @param name
   * @param template
   * @param transitions
   */
  export class Screen {
    /**
     * this should be a cradova screen component
     */
    _html:
      | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
      | HTMLElement
      | DocumentFragment;
    /**
     * this is a set of added html to the screen
     */
    _secondaryChildren: VJSType<HTMLElement>[];
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
    constructor(cradova_screen_initials: CradovaScreenType);
    get _delegatedRoutes(): boolean;
    set _delegatedRoutes(count: boolean);
    setErrorHandler(errorHandler: (err: unknown) => void): void;
    _package(): Promise<void>;
    onActivate(cb: () => Promise<void> | void): void;
    onDeactivate(cb: () => Promise<void> | void): void;
    addChildren(...addOns: VJSType<HTMLElement>[]): void;
    _deActivate(): Promise<void>;
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

  export const makeElement: <E extends HTMLElement>(
    element: E & HTMLElement,
    ElementChildrenAndPropertyList: VJS_params_TYPE<E>
  ) => E;
  export const make: (descriptor: any) => any[];
  export const a: VJSType<HTMLAnchorElement>;
  export const area: VJSType<HTMLAreaElement>;
  export const article: VJSType<HTMLElement>;
  export const aside: VJSType<HTMLElement>;
  export const audio: VJSType<HTMLAudioElement>;
  export const b: VJSType<HTMLElement>;
  export const base: VJSType<HTMLBaseElement>;
  export const blockquote: VJSType<HTMLElement>;
  export const br: VJSType<HTMLBRElement>;
  export const button: VJSType<HTMLButtonElement>;
  export const canvas: VJSType<HTMLCanvasElement>;
  export const caption: VJSType<HTMLTableCaptionElement>;
  export const code: VJSType<HTMLElement>;
  export const col: VJSType<HTMLTableColElement>;
  export const colgroup: VJSType<HTMLOptGroupElement>;
  export const data: VJSType<HTMLDataElement>;
  export const datalist: VJSType<HTMLDataListElement>;
  export const details: VJSType<HTMLDetailsElement>;
  export const dialog: VJSType<HTMLDialogElement>;
  export const div: VJSType<HTMLDivElement>;
  export const em: VJSType<HTMLElement>;
  export const embed: VJSType<HTMLEmbedElement>;
  export const figure: VJSType<HTMLElement>;
  export const footer: VJSType<HTMLElement>;
  export const form: VJSType<HTMLFormElement>;
  export const h1: VJSType<HTMLHeadingElement>;
  export const h2: VJSType<HTMLHeadingElement>;
  export const h3: VJSType<HTMLHeadingElement>;
  export const h4: VJSType<HTMLHeadingElement>;
  export const h5: VJSType<HTMLHeadingElement>;
  export const h6: VJSType<HTMLHeadingElement>;
  export const head: VJSType<HTMLHeadElement>;
  export const header: VJSType<HTMLHeadElement>;
  export const hr: VJSType<HTMLHRElement>;
  export const i: VJSType<HTMLLIElement>;
  export const iframe: VJSType<HTMLIFrameElement>;
  export const img: VJSType<HTMLImageElement>;
  export const input: VJSType<HTMLInputElement>;
  export const label: VJSType<HTMLLabelElement>;
  export const legend: VJSType<HTMLLegendElement>;
  export const li: VJSType<HTMLLIElement>;
  export const link: VJSType<HTMLLinkElement>;
  export const main: VJSType<HTMLElement>;
  export const menu: VJSType<HTMLMenuElement>;
  export const nav: VJSType<HTMLElement>;
  export const object: VJSType<HTMLObjectElement>;
  export const ol: VJSType<HTMLOListElement>;
  export const optgroup: VJSType<HTMLOptGroupElement>;
  export const option: VJSType<HTMLOptionElement>;
  export const p: VJSType<HTMLParagraphElement>;
  export const pre: VJSType<HTMLPreElement>;
  export const progress: VJSType<HTMLProgressElement>;
  export const q: VJSType<HTMLQuoteElement>;
  export const section: VJSType<HTMLElement>;
  export const select: VJSType<HTMLSelectElement>;
  export const source: VJSType<HTMLSourceElement>;
  export const span: VJSType<HTMLSpanElement>;
  export const strong: VJSType<HTMLElement>;
  export const summary: VJSType<HTMLElement>;
  export const table: VJSType<HTMLTableElement>;
  export const tbody: VJSType<HTMLTableColElement>;
  export const td: VJSType<HTMLTableCellElement>;
  export const template: VJSType<HTMLTemplateElement>;
  export const textarea: VJSType<HTMLTextAreaElement>;
  export const th: VJSType<HTMLTableSectionElement>;
  export const title: VJSType<HTMLTitleElement>;
  export const tr: VJSType<HTMLTableRowElement>;
  export const track: VJSType<HTMLTrackElement>;
  export const u: VJSType<HTMLUListElement>;
  export const ul: VJSType<HTMLUListElement>;
  export const video: VJSType<HTMLVideoElement>;

  /** cradova router
   * ---
   * Registers a route.
   *
   * @param {string}   path     Route path.
   * @param  screen the cradova document tree for the route.
   */
  export class RouterClass {
    /** cradova router
     * ---
     * Registers a route.
     *
     * accepts an object containing
     *
     * @param {string}   path     Route path.
     * @param  screen the cradova screen.
     */
    BrowserRoutes(obj: Record<string, any>): void;
    /**
          Go back in Navigation history
          */
    back(): void;
    /**
          Go forward in Navigation history
          */
    forward(): void;
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
    navigate(
      href: string,
      data?: Record<string, unknown> | null,
      force?: boolean
    ): void;
    /**
     * Cradova
     * ---
     * Loading screen for your app
     *
     * lazy loaded loading use
     *
     * @param screen
     */
    setLoadingScreen(screen: Screen): void;
    /** cradova router
     * ---
     * Listen for navigation events
     *
     * @param callback   () => void
     */
    onPageEvent(callback: () => void): void;
    /** cradova router
     * ---
     * get a screen ready before time.
     *
     * @param {string}   path Route path.
     * @param  data data for the screen.
     */
    packageScreen(path: string, data?: Record<string, unknown>): Promise<void>;
    /**
     * Cradova Router
     * ------
     *
     * return last set router params
     *
     * .
     */
    getParams(): any;
    /**
     * Cradova
     * ---
     * Error Handler for your app
     *
     * @param callback
     * @param path? page path
     */
    addErrorHandler(callback: (err: unknown) => void): void;
    _mount(): void;
  }
  export const Router: RouterClass;

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
  export function Ajax(
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
  const _: TemplateType;
  export default _;
}
