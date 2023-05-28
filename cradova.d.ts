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
      value: k,
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
     *  creates many actions at a time
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
    fireAction(key: string, data?: unknown): void;
    /**
     * Cradova
     * ---
     * is used to bind signal data to elements and Refs
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
      ref: Partial<Ref<unknown>>, //! there's more to this friday (even elements act as ref here because of the updateState)
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

  export function css(identifier: string | TemplateStringsArray): void;
  /**
   *
   * @param {expression} condition
   * @param {function} elements[]
   */
  export function assert(
    condition: unknown,
    ...elements: VJSType<HTMLElement>[]
  ): VJSType<HTMLElement>[] | undefined;
  export function loop(
    datalist: unknown[],
    component: (
      value: unknown,
      index?: number,
      array?: unknown[]
    ) => VJSType<HTMLElement>[] | undefined
  ): HTMLElement | undefined;
  export function assertOr(
    condition: boolean,
    ifTrue: () => VJSType<HTMLElement>,
    ifFalse: () => VJSType<HTMLElement>
  ): () => VJSType<HTMLElement>;
  /**
   * Cradova Ref
   * -------
   * create dynamic components
   */
  type RefProps<D> = D | undefined;
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
    stash: RefProps<D>;
    constructor(component: (data?: RefProps<D>) => HTMLElement);
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
    effect(fn: () => Promise<void> | void): void;
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
  export class lazy {
    content: unknown;
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
    _appendDom(name: string, Element: HTMLElement): void;
    _appendDomForce(name: string, Element: HTMLElement): void;
  }

  type VJSType<T> = (
    ...VJS: (
      | undefined
      | string
      | Partial<T>
      | HTMLElement
      | (() => HTMLElement)
      | {
          style?: Partial<CSSStyleDeclaration>;
          onmount?: () => void;
          text?: string;
          reference?: reference;
        }
    )[]
  ) => T;
  type VJS_params_TYPE<T> = (
    | undefined
    | string
    | Partial<T>
    | HTMLElement
    | (() => HTMLElement)
    | {
        style?: Partial<CSSStyleDeclaration>;
        onmount?: () => void;
        text?: string;
        reference?: reference;
      }
  )[];
  /**
   *
   */
  type CradovaScreenType = {
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
    template: Function | HTMLElement;
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
     * gets called when the the screen is displayed
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

  export const makeElement: (
    element: HTMLElement,
    ...ElementChildrenAndPropertyList: VJS_params_TYPE<HTMLElement>
  ) => HTMLElement;
  export const a: VJSType<HTMLAnchorElement>;
  export const abbr: VJSType<HTMLElement>;
  export const address: VJSType<HTMLElement>;
  export const area: VJSType<HTMLAreaElement>;
  export const article: VJSType<HTMLElement>;
  export const aside: VJSType<HTMLElement>;
  export const audio: VJSType<HTMLAudioElement>;
  export const b: VJSType<HTMLElement>;
  export const base: VJSType<HTMLBaseElement>;
  export const bdi: VJSType<HTMLElement>;
  export const bdo: VJSType<HTMLElement>;
  export const blockquote: VJSType<HTMLElement>;
  export const body: VJSType<HTMLBodyElement>;
  export const br: VJSType<HTMLBRElement>;
  export const button: VJSType<HTMLButtonElement>;
  export const canvas: VJSType<HTMLCanvasElement>;
  export const caption: VJSType<HTMLTableCaptionElement>;
  export const cite: VJSType<HTMLElement>;
  export const code: VJSType<HTMLElement>;
  export const col: VJSType<HTMLTableColElement>;
  export const colgroup: VJSType<HTMLElement>;
  export const data: VJSType<HTMLDataElement>;
  export const datalist: VJSType<HTMLDataListElement>;
  export const dd: VJSType<HTMLElement>;
  export const del: VJSType<HTMLElement>;
  export const details: VJSType<HTMLDetailsElement>;
  export const dfn: VJSType<HTMLElement>;
  export const dialog: VJSType<HTMLDialogElement>;
  export const div: VJSType<HTMLDivElement>;
  export const dl: VJSType<HTMLElement>;
  export const dt: VJSType<HTMLElement>;
  export const em: VJSType<HTMLElement>;
  export const embed: VJSType<HTMLEmbedElement>;
  export const fieldset: VJSType<HTMLFieldSetElement>;
  export const figcaption: VJSType<HTMLElement>;
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
  export const header: VJSType<HTMLElement>;
  export const hr: VJSType<HTMLHRElement>;
  export const html: VJSType<HTMLHtmlElement>;
  export const i: VJSType<HTMLElement>;
  export const iframe: VJSType<HTMLIFrameElement>;
  export const img: VJSType<HTMLImageElement>;
  export const input: VJSType<HTMLInputElement>;
  export const ins: VJSType<HTMLElement>;
  export const kbd: VJSType<HTMLElement>;
  export const label: VJSType<HTMLLabelElement>;
  export const legend: VJSType<HTMLLegendElement>;
  export const li: VJSType<HTMLLIElement>;
  export const link: VJSType<HTMLLinkElement>;
  export const main: VJSType<HTMLElement>;
  export const map: VJSType<HTMLMapElement>;
  export const mark: VJSType<HTMLElement>;
  export const math: VJSType<HTMLElement>;
  export const menu: VJSType<HTMLMenuElement>;
  export const meta: VJSType<HTMLMetaElement>;
  export const meter: VJSType<HTMLMeterElement>;
  export const nav: VJSType<HTMLElement>;
  export const object: VJSType<HTMLObjectElement>;
  export const ol: VJSType<HTMLOListElement>;
  export const optgroup: VJSType<HTMLOptGroupElement>;
  export const option: VJSType<HTMLOptionElement>;
  export const output: VJSType<HTMLOutputElement>;
  export const p: VJSType<HTMLParagraphElement>;
  export const picture: VJSType<HTMLPictureElement>;
  export const portal: VJSType<HTMLElement>;
  export const pre: VJSType<HTMLPreElement>;
  export const progress: VJSType<HTMLProgressElement>;
  export const q: VJSType<HTMLQuoteElement>;
  export const rp: VJSType<HTMLElement>;
  export const rt: VJSType<HTMLElement>;
  export const ruby: VJSType<HTMLElement>;
  export const s: VJSType<HTMLElement>;
  export const samp: VJSType<HTMLElement>;
  export const script: VJSType<HTMLScriptElement>;
  export const section: VJSType<HTMLElement>;
  export const select: VJSType<HTMLSelectElement>;
  export const slot: VJSType<HTMLSlotElement>;
  export const small: VJSType<HTMLElement>;
  export const source: VJSType<HTMLSourceElement>;
  export const span: VJSType<HTMLSpanElement>;
  export const strong: VJSType<HTMLElement>;
  export const style: VJSType<HTMLStyleElement>;
  export const sub: VJSType<HTMLElement>;
  export const summary: VJSType<HTMLElement>;
  export const sup: VJSType<HTMLElement>;
  export const table: VJSType<HTMLTableElement>;
  export const tbody: VJSType<HTMLTableColElement>;
  export const td: VJSType<HTMLTableCellElement>;
  export const template: VJSType<HTMLTemplateElement>;
  export const textarea: VJSType<HTMLTextAreaElement>;
  export const tfoot: VJSType<HTMLElement>;
  export const th: VJSType<HTMLTableSectionElement>;
  export const thead: VJSType<HTMLTableSectionElement>;
  export const time: VJSType<HTMLTimeElement>;
  export const title: VJSType<HTMLTitleElement>;
  export const tr: VJSType<HTMLTableRowElement>;
  export const track: VJSType<HTMLTrackElement>;
  export const u: VJSType<HTMLElement>;
  export const ul: VJSType<HTMLUListElement>;
  export const val: VJSType<HTMLElement>;
  export const video: VJSType<HTMLVideoElement>;
  export const wbr: VJSType<HTMLElement>;

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
    _html: Function | HTMLElement;
    /**
     * this is a set of added html to the screen
     */
    _secondaryChildren: VJSType<HTMLElement>[];
    /**
     * error handler for the screen
     */
    errorHandler: ((err: unknown) => void) | null;
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
    _params: Record<string, unknown> | null;
    private _delegatedRoutesCount;
    private _transition;
    private _doc;
    constructor(cradova_screen_initials: CradovaScreenType);
    get _delegatedRoutes(): boolean;
    set _delegatedRoutes(count: boolean);
    get _paramData(): typeof this._params;
    set _paramData(params: typeof this._params);
    setErrorHandler(errorHandler: (err: unknown) => void): void;
    _package(): Promise<void>;
    onActivate(cb: () => Promise<void> | void): void;
    onDeactivate(cb: () => Promise<void> | void): void;
    addChildren(...addOns: VJSType<HTMLElement>[]): void;
    _deActivate(): Promise<void>;
    _Activate(force?: boolean): Promise<void>;
  }

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
        "content-type": string;
      } & Record<string, string>;
      callbacks?: Record<string, (arg: Function) => void>;
    }
  ): Promise<unknown>;

  type TemplateType = (
    ...element_initials: VJS_params_TYPE<HTMLElement>
  ) => HTMLElement;
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
  export const _: TemplateType;
}
