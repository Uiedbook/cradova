declare module "cradova" {
  type ElementType<T> = (
    ...VJS: (
      | string
      | undefined
      | Partial<T>
      | HTMLElement
      | (() => HTMLElement)
      | {
          style?: Partial<CSSStyleDeclaration>;
          beforeMount?: () => void;
          afterMount?: () => void;
          text?: string;
          reference?: any;
          stateID?: string;
          shouldUpdate?: boolean;
        }
    )[]
  ) => T;
  /**
   *
   */
  type CradovaScreenType = {
    /**
     * Cradova screen
     * ---
     * title of the page
     *
     *
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
     *
     *
     * .
     */
    template: Function | HTMLElement;
    /**
     * Cradova screen
     * ---
     * Allows this screen render in parallel for unique routes
     *
     * limit is 1000
     *
     *
     *
     * .
     */
    renderInParallel?: boolean;
    /**
     * Cradova screen
     * ---
     * gets called when the the screen is displayed
     *
     *
     * .
     */
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

  export const a: ElementType<HTMLAnchorElement>;
  export const abbr: ElementType<HTMLElement>;
  export const address: ElementType<HTMLElement>;
  export const area: ElementType<HTMLAreaElement>;
  export const article: ElementType<HTMLElement>;
  export const aside: ElementType<HTMLElement>;
  export const audio: ElementType<HTMLAudioElement>;
  export const b: ElementType<HTMLElement>;
  export const base: ElementType<HTMLBaseElement>;
  export const bdi: ElementType<HTMLElement>;
  export const bdo: ElementType<HTMLElement>;
  export const blockquote: ElementType<HTMLElement>;
  export const body: ElementType<HTMLBodyElement>;
  export const br: ElementType<HTMLBRElement>;
  export const button: ElementType<HTMLButtonElement>;
  export const canvas: ElementType<HTMLCanvasElement>;
  export const caption: ElementType<HTMLTableCaptionElement>;
  export const cite: ElementType<HTMLElement>;
  export const code: ElementType<HTMLElement>;
  export const col: ElementType<HTMLTableColElement>;
  export const colgroup: ElementType<HTMLElement>;
  export const data: ElementType<HTMLDataElement>;
  export const datalist: ElementType<HTMLDataListElement>;
  export const dd: ElementType<HTMLElement>;
  export const del: ElementType<HTMLElement>;
  export const details: ElementType<HTMLDetailsElement>;
  export const dfn: ElementType<HTMLElement>;
  export const dialog: ElementType<HTMLDialogElement>;
  export const div: ElementType<HTMLDivElement>;
  export const dl: ElementType<HTMLElement>;
  export const dt: ElementType<HTMLElement>;
  export const em: ElementType<HTMLElement>;
  export const embed: ElementType<HTMLEmbedElement>;
  export const fieldset: ElementType<HTMLFieldSetElement>;
  export const figcaption: ElementType<HTMLElement>;
  export const figure: ElementType<HTMLElement>;
  export const footer: ElementType<HTMLElement>;
  export const form: ElementType<HTMLFormElement>;
  export const h1: ElementType<HTMLHeadingElement>;
  export const h2: ElementType<HTMLHeadingElement>;
  export const h3: ElementType<HTMLHeadingElement>;
  export const h4: ElementType<HTMLHeadingElement>;
  export const h5: ElementType<HTMLHeadingElement>;
  export const h6: ElementType<HTMLHeadingElement>;
  export const head: ElementType<HTMLHeadElement>;
  export const header: ElementType<HTMLElement>;
  export const hr: ElementType<HTMLHRElement>;
  export const html: ElementType<HTMLHtmlElement>;
  export const i: ElementType<HTMLElement>;
  export const iframe: ElementType<HTMLIFrameElement>;
  export const img: ElementType<HTMLImageElement>;
  export const input: ElementType<HTMLInputElement>;
  export const ins: ElementType<HTMLElement>;
  export const kbd: ElementType<HTMLElement>;
  export const label: ElementType<HTMLLabelElement>;
  export const legend: ElementType<HTMLLegendElement>;
  export const li: ElementType<HTMLLIElement>;
  export const link: ElementType<HTMLLinkElement>;
  export const main: ElementType<HTMLElement>;
  export const map: ElementType<HTMLMapElement>;
  export const mark: ElementType<HTMLElement>;
  export const math: ElementType<HTMLElement>;
  export const menu: ElementType<HTMLMenuElement>;
  export const meta: ElementType<HTMLMetaElement>;
  export const meter: ElementType<HTMLMeterElement>;
  export const nav: ElementType<HTMLElement>;
  export const object: ElementType<HTMLObjectElement>;
  export const ol: ElementType<HTMLOListElement>;
  export const optgroup: ElementType<HTMLOptGroupElement>;
  export const option: ElementType<HTMLOptionElement>;
  export const output: ElementType<HTMLOutputElement>;
  export const p: ElementType<HTMLParagraphElement>;
  export const picture: ElementType<HTMLPictureElement>;
  export const portal: ElementType<HTMLElement>;
  export const pre: ElementType<HTMLPreElement>;
  export const progress: ElementType<HTMLProgressElement>;
  export const q: ElementType<HTMLQuoteElement>;
  export const rp: ElementType<HTMLElement>;
  export const rt: ElementType<HTMLElement>;
  export const ruby: ElementType<HTMLElement>;
  export const s: ElementType<HTMLElement>;
  export const samp: ElementType<HTMLElement>;
  export const script: ElementType<HTMLScriptElement>;
  export const section: ElementType<HTMLElement>;
  export const select: ElementType<HTMLSelectElement>;
  export const slot: ElementType<HTMLSlotElement>;
  export const small: ElementType<HTMLElement>;
  export const source: ElementType<HTMLSourceElement>;
  export const span: ElementType<HTMLSpanElement>;
  export const strong: ElementType<HTMLElement>;
  export const style: ElementType<HTMLStyleElement>;
  export const sub: ElementType<HTMLElement>;
  export const summary: ElementType<HTMLElement>;
  export const sup: ElementType<HTMLElement>;
  export const table: ElementType<HTMLTableElement>;
  export const tbody: ElementType<HTMLTableColElement>;
  export const td: ElementType<HTMLTableCellElement>;
  export const template: ElementType<HTMLTemplateElement>;
  export const textarea: ElementType<HTMLTextAreaElement>;
  export const tfoot: ElementType<HTMLElement>;
  export const th: ElementType<HTMLTableSectionElement>;
  export const thead: ElementType<HTMLTableSectionElement>;
  export const time: ElementType<HTMLTimeElement>;
  export const title: ElementType<HTMLTitleElement>;
  export const tr: ElementType<HTMLTableRowElement>;
  export const track: ElementType<HTMLTrackElement>;
  export const u: ElementType<HTMLElement>;
  export const ul: ElementType<HTMLUListElement>;
  export const val: ElementType<HTMLElement>;
  export const video: ElementType<HTMLVideoElement>;
  export const wbr: ElementType<HTMLElement>;

  /**
   *
   * Cradova Ajax
   * ------------------
   * your new axios alternative
   * supports files upload
   * @param url string
   * @param {{method: string;data;header;callbacks;}} opts
   * @returns any
   */
  export function Ajax(
    url: string | URL,
    opts?:
      | {
          method?: "GET" | "POST";
          data?: Record<string, any>;
          header?: {
            "content-type": string;
          } & Record<string, any>;
          callbacks?: Record<string, (arg: any) => void>;
        }
      | any
  ): Promise<unknown>;

  /**
   * Cradova event
   */
  export class cradovaEvent {
    private listeners;
    addEventListener(eventName: string, callback: any): void;
    removeEventListener(eventName: string, callback: any): void;
    dispatchEvent(eventName: string, eventArgs?: any): void;
  }
  export const CradovaEvent: cradovaEvent;
  export function css(identifier: string | TemplateStringsArray): void;
  /**
   *
   * @param {expression} condition
   * @param {function} elements[]
   */
  export function assert(condition: any, ...elements: any): any;
  export function loop(
    datalist: any[],
    component: (value: any, index?: number, array?: any[]) => any
  ): HTMLElement | undefined;
  export function assertOr(
    condition: boolean,
    ifTrue: () => any,
    ifFalse: () => any
  ): () => any;
  /**
   * Cradova Ref
   * -------
   * create dynamic components
   */
  type RefProps<D> = D | any;
  export class Ref<D> {
    private component;
    private effects;
    private effectuate;
    private rendered;
    private published;
    private hasFirstStateUpdateRun;
    private preRendered;
    private reference;
    Signal: createSignal<any> | undefined;
    stash: D | undefined;
    constructor(component: (data?: RefProps<D>) => any);
    preRender(data?: RefProps<D>): void;
    destroyPreRendered(): void;
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns () => HTMLElement
     */
    render(data?: D, stash?: boolean): HTMLElement;
    instance(): Record<string, any>;
    _setExtra(Extra: createSignal<any>): void;
    /**
     * Cradova Ref
     * ---
     * runs on first state update
     *
     */
    effect(fn: () => Promise<unknown>): void;
    private effector;
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
    updateState(data: D, stash?: boolean): void;
    private Activate;
    remove(): void;
  }
  export const svgNS: (
    type: string,
    props: Record<string, any>,
    ...children: any
  ) => HTMLElement;
  export class lazy {
    content: any;
    private _cb;
    constructor(cb: () => Promise<any>);
    load(): Promise<void>;
  }
  export class reference {
    [x: string]: Record<string, any>;
    bindAs(name: string): any;
    _appendDom(name: string, Element: any): void;
    _appendDomForce(name: string, Element: any): void;
  }

  /**
   *  Cradova Signal
   * ----
   *  create stateful data store.
   * ability to:
   * - create store
   * - create actions and fire them
   * - bind a Ref
   * - listen to changes
   * - persist changes to localStorage
   * - set keys instead of all values
   * - update a cradova Ref and bindings automatically
   * @constructor initial: any, props: {useHistory, persist}
   */

  export class createSignal<Type extends Record<string, any>> {
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
      value: any,
      shouldRefRender?: boolean
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key to signal an action
     * @param key - key of the action
     * @param action function to execute
     */
    createAction(
      key: string | Record<string, (data?: Type) => void>,
      action?: ((data?: Type) => void) | Ref<unknown>
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  fires an action if available
     * @param key - string key of the action
     * @param data - data for the action
     */
    fireAction(key: string, data?: unknown): void;
    /**
     * Cradova
     * ---
     * is used to bind store data to any element
     *
     * @param prop
     * @returns something
     */
    bind(prop: string): (string | this)[];
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
      ref: any,
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
    listen(callback: (a: any) => void): void;
    /**
     *  Cradova Signal
     * ----
     * clear the history on local storage
     *
     *
     * .
     */
    clearPersist(): void;
  }

  type stateType =
    | Partial<HTMLElement>
    | {
        class?: string;
        text?: string;
        style?: Partial<CSSStyleDeclaration>;
        tree?: Function | HTMLElement;
        remove?: boolean;
      };
  type stateID = string;
  /**
   * Send a new state to specified element with stateID
   *
   * @param stateID
   * @param state
   * @returns element(s)
   */
  export function dispatch(
    stateID: stateID | Record<stateID, stateType>,
    state?: stateType
  ): any;

  /** cradova router
   * ---
   * Registers a route.
   *
   * @param {string}   path     Route path.
   * @param {any} screen the cradova document tree for the route.
   */
  class RouterClass {
    /** cradova router
     * ---
     * Registers a route.
     *
     * accepts an object containing
     *
     * @param {string}   path     Route path.
     * @param {any} screen the cradova screen.
     */
    BrowserRoutes(obj: Record<string, any>): void;
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
      data?: Record<string, any> | null,
      force?: boolean
    ): void;
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
     * @param {any} data data for the screen.
     */
    packageScreen(path: string, data?: any): Promise<void>;
    /**
     * Cradova Router
     * ------
     *
     * return last set router params
     *
     * .
     */
    getParams: () => any;
    /**
     * Cradova
     * ---
     * Error Handler for your app
     *
     * @param callback
     * @param path? page path
     */
    addErrorHandler(callback: () => void): void;
    _mount(): void;
  }
  export const Router: RouterClass;

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
    _html: Function;
    /**
     * this is a set of added html to the screen
     */
    _secondaryChildren: Array<Node>;
    /**
     * error handler for the screen
     */
    errorHandler: (() => void) | null;
    /**
     * used internally
     */
    _name: string;
    private _packed;
    private _template;
    private _callBack;
    private _deCallBack;
    private _persist;
    private _data;
    _params: Record<string, any> | null;
    private _delegatedRoutesCount;
    private _transition;
    constructor(cradova_screen_initials: CradovaScreenType);
    get _delegatedRoutes(): boolean;
    set _delegatedRoutes(count: boolean);
    get _paramData(): typeof this._params;
    set _paramData(params: typeof this._params);
    setErrorHandler(errorHandler: () => void): void;
    _package(): Promise<void>;
    onActivate(cb: () => Promise<void> | void): void;
    onDeactivate(cb: () => Promise<void> | void): void;
    addChild(...addOns: any[]): void;
    _deActivate(): Promise<void>;
    _Activate(force?: boolean): Promise<void>;
  }

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
   * @param  {...any[]} element_initials
   * @returns function - cradova element
   */
  const _: any;
  export default _;
}
