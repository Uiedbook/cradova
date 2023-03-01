declare module "cradova" {
  type CradovaScreenTyping = {
    /*
    name of the page
    */
    name: string;
    /*
   content to render
   */
    template: Function | HTMLElement;
    persist?: boolean;
  };

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
          stateID?: string;
          shouldUpdate?: boolean;
        }
    )[]
  ) => T;

  export type RefType<D> = {
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns HTMLElement
     */
    render(data?: D): () => any;
    /**
     * Cradova Ref
     * ---
     * checks if element is in the dom and returns it.
     * @param data
     * @return HTMLElement
     */
    instance(): HTMLElement | null;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState(data: D, stash?: boolean): void;
    /**
     * Cradova Ref
     * ---
     * remove element from the dom
     * @param data
     * @returns () => HTMLElement
     */
    remove(): void;
    /**
     * Cradova Ref
     * ---
     * runs once on render
     *
     */
    effect(fn: (data: unknown) => Promise<void> | void): void;
    /**
     * Cradova Ref
     * ---
     * returns last set stashed Ref data
     *
     */
    stash: D;
  };

  /**
   * Cradova Router
   * ---
   * Facilitates navigation within the application and initializes
   * page views based on the matched routes.
   */
  type RouterType = {
    /**
     * Registers a route.
     *
     * @param {string}   path     Route path.
     * @param {any} screen the cradova document tree for the route.
     */
    route: (path: string, screen: Screen) => void;
    /**
     * get a screen ready before time.
     *
     * @param {string}   path     Route path.
     * @param {any} data data for the screen.
     */
    packageScreen: (path: string, data?: any) => Promise<void>;
    onPageShow: (callback: () => void) => void;
    onPageHide: (callback: () => void) => void;
    /**
     * Cradova Router
     * ------
     *
     * return last set router params
     *
     * .
     */
    getParams: () => unknown;
    /**
     * Cradova Router
     * ------
     *
     * Navigates to a designated screen in your app
     */
    navigate: (
      href: string,
      data?: Record<string, any> | null,
      force?: boolean
    ) => void;

    /**
     * Cradova
     * ---
     * Error Handler for your app
     *
     * @param callback
     * @param path? page path
     */

    addErrorHandler: (callback: (error: string) => void, path?: string) => void;
  };

  /**
   * Cradova
   * ---
   * Cradova afterMount event
   *
   * dispatch this manually if you are not using a cradova screen object
   *
   */

  export const cradovaAftermountEvent: CustomEvent<string>;

  /**
   *  Cradova Screen
   * ---
   * create instances of manageable pages
   * @param name
   * @param template
   */
  export class Screen {
    /**
     *  Cradova Screen
     * ---
     * create instances of manageable pages
     * @param name
     * @param template
     */
    constructor(cradova_screen_initials: CradovaScreenTyping);
    /**
     * Cradova Screen
     * ---
     * runs once after first render
     *
     */
    effect(fn: () => void | Promise<void>): void;
    package(data?: any): Promise<void>;
    onActivate(cb: (data: any) => void): void;
    addChild(...addOns: any[]): void;
    deActivate(): void;
    Activate(data?: any, force?: boolean): Promise<void>;
    /**
     * Cradova Screen
     * ---
     * re-renders the screen -
     *
     * first level call will only be called once
     * lower level calls will be continuously called
     * @param data .
     *
     * *
     */

    updateState(data: unknown): void;
  }

  /**
   * Cradova Router
   * ---
   * Facilitates navigation within the application and initializes
   * page views based on the matched routes.
   */
  export const Router: RouterType;

  /**
   * Send a new state to specified element with stateID
   *
   * @param stateID
   * @param state
   * @returns element(s)
   */
  export function dispatch(
    stateID: string | Record<string, any>,
    state?: Record<string, any>
  ): any;

  /**
   *  Cradova Signal
   * ----
   *  create stateful data store.
   * ability to:
   * - create a store
   * - create actions and fire them
   * - bind a Ref
   * - listen to changes
   * -  persist changes to localStorage
   * - go back and forward in value history
   * - set keys instead of all values
   * - update a cradova Ref automatically
   * @constructor initial: any, props: {useHistory, persist}
   */
  export class createSignal<Type> {
    private callback;
    private persistName;
    private actions;
    private ref;
    private path;
    value: any;
    constructor(
      initial: Type,
      props?: {
        useHistory?: boolean;
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
    set(value: Type, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @param shouldRefRender? boolean
     * @returns void
     *
     *
     * .
     *
     */
    setKey(name: string, value: unknown, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key to signal an action
     * @param name - name of the action
     * @param action function to execute
     */
    createAction(
      name: string | Record<string, (self?: this, data?: Type) => void>,
      action?: (self?: this, data?: any) => void
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  fires an action if available
     * @param name - string name of the action
     * @param data - data for the action
     */
    fireAction(name: string, data?: Type): void;
    /**
     *  Cradova Signal
     * ----
     *  set a auto - rendering component for this store
     *
     * @param Ref component to bind to.
     * @param path a property in the object to send to attached ref
     */
    bindRef(Ref: any, path?: string): void;
    /**
     *  Cradova Signal
     * ----
     *  set a update listener on value changes
     * @param callback
     */
    listen(callback: (data: Type) => void): void;
    /**
     *  Cradova Signal
     * ----
     * clear the history on local storage
     */
    clearPersist(): void;
  }

  /**
   *  Cradova simpleStore
   * ----
   *  create stateful data store.
   * ability to:
   * - create a store
   * - set keys instead of all values
   * - update a cradova Ref automatically
   * @constructor initial: any, Ref: any
   */

  export class $<Type> {
    private ref;
    value: any;
    constructor(initial: Type);
    /**
     *  Cradova simpleStore
     * ----
     *  set simpleStore value
     * @param value - simpleStore value
     * @returns void
     */
    set(value: Type, shouldRefRender?: boolean): void;
    /**
     *  Cradova simpleStore
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @returns void
     */
    setKey(name: string, value: unknown, shouldRefRender?: boolean): void;
    /**
     *  Cradova simpleStore
     * ---
     * is used to bind store data to any element
     *
     * @param prop
     * @returns something
     */

    bind(prop: string): void;
  }

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
          header?: { "content-type": string } & Record<string, any>;
          callbacks?: Record<string, (arg: any) => void>;
        }
      | any
  ): Promise<unknown>;

  export function loadCradovaUICss(seconds?: number): void;
  export function uuid(): string;

  /**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/
  export function css(
    identifier: string,
    properties?: Record<string, string>
  ): void;
  /**
   *
   * @param {expression} condition
   * @param {function} callback
   */
  export function assert(
    condition: any,
    ...callback: (() => any)[]
  ): "" | (() => any)[];
  export function assertOr(
    condition: any,
    ifTrue: () => any,
    ifFalse: () => any
  ): () => any;
  /**
   * Create element and get a callback to update their state
   * no need to manage stateIDs
   * ----------------------------------------------------------------
   *
   * @param element_initials
   * @param props
   * @returns
   */
  type RefProps<D> = D | unknown;

  /**
   * Cradova Ref
   * -------
   * create dynamic components
   *
   */
  export class Ref<D> {
    constructor(component: (data: RefProps<D>) => any);
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns HTMLElement
     */
    render(data?: D, stash?: boolean): () => any;
    /**
     * Cradova Ref
     * ---
     * checks if element is in the dom and returns it.
     * @param data
     * @return HTMLElement
     */
    instance(): HTMLElement | null;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState(data: D, stashed?: boolean): void;
    /**
     * Cradova Ref
     * ---
     * remove element from the dom
     * @param data
     * @returns () => HTMLElement
     */
    remove(): void;
    /**
     * Cradova Ref
     * ---
     * runs once on render
     *
     */
    effect(fn: (data: unknown) => Promise<void> | void): void;
    /**
     * Cradova Ref
     * ---
     * returns last set stashed Ref data
     *
     */
    stash: D;
  }

  export const a: ElementType<HTMLAnchorElement>;
  export const address: ElementType<HTMLElement>;
  export const abbr: ElementType<HTMLElement>;
  export const article: ElementType<HTMLElement>;
  export const area: ElementType<HTMLAreaElement>;
  export const audio: ElementType<HTMLAudioElement>;
  export const aside: ElementType<HTMLElement>;
  export const base: ElementType<HTMLBaseElement>;
  export const b: ElementType<HTMLElement>;
  export const bdo: ElementType<HTMLElement>;
  export const bdi: ElementType<HTMLElement>;
  export const body: ElementType<HTMLBodyElement>;
  export const blockquote: ElementType<HTMLElement>;
  export const button: ElementType<HTMLButtonElement>;
  export const br: ElementType<HTMLBRElement>;
  export const caption: ElementType<HTMLTableCaptionElement>;
  export const canvas: ElementType<HTMLCanvasElement>;
  export const code: ElementType<HTMLElement>;
  export const cite: ElementType<HTMLElement>;
  export const colgroup: ElementType<HTMLElement>;
  export const col: ElementType<HTMLTableColElement>;
  export const datalist: ElementType<HTMLDataListElement>;
  export const data: ElementType<HTMLDataElement>;
  export const del: ElementType<HTMLElement>;
  export const dd: ElementType<HTMLElement>;
  export const dfn: ElementType<HTMLElement>;
  export const details: ElementType<HTMLDetailsElement>;
  export const div: ElementType<HTMLDivElement>;
  export const dialog: ElementType<HTMLDialogElement>;
  export const dt: ElementType<HTMLElement>;
  export const dl: ElementType<HTMLElement>;
  export const embed: ElementType<HTMLEmbedElement>;
  export const em: ElementType<HTMLElement>;
  export const figcaption: ElementType<HTMLElement>;
  export const fieldset: ElementType<HTMLFieldSetElement>;
  export const footer: ElementType<HTMLElement>;
  export const figure: ElementType<HTMLElement>;
  export const h1: ElementType<HTMLHeadingElement>;
  export const form: ElementType<HTMLFormElement>;
  export const h3: ElementType<HTMLHeadingElement>;
  export const h2: ElementType<HTMLHeadingElement>;
  export const h5: ElementType<HTMLHeadingElement>;
  export const h4: ElementType<HTMLHeadingElement>;
  export const head: ElementType<HTMLHeadElement>;
  export const h6: ElementType<HTMLHeadingElement>;
  export const hr: ElementType<HTMLHRElement>;
  export const header: ElementType<HTMLElement>;
  export const i: ElementType<HTMLElement>;
  export const html: ElementType<HTMLHtmlElement>;
  export const img: ElementType<HTMLImageElement>;
  export const iframe: ElementType<HTMLIFrameElement>;
  export const ins: ElementType<HTMLElement>;
  export const input: ElementType<HTMLInputElement>;
  export const label: ElementType<HTMLLabelElement>;
  export const kbd: ElementType<HTMLElement>;
  export const li: ElementType<HTMLLIElement>;
  export const legend: ElementType<HTMLLegendElement>;
  export const main: ElementType<HTMLElement>;
  export const link: ElementType<HTMLLinkElement>;
  export const mark: ElementType<HTMLElement>;
  export const map: ElementType<HTMLMapElement>;
  export const menu: ElementType<HTMLMenuElement>;
  export const math: ElementType<HTMLElement>;
  export const meter: ElementType<HTMLMeterElement>;
  export const meta: ElementType<HTMLMetaElement>;
  export const noscript: ElementType<HTMLElement>;
  export const nav: ElementType<HTMLElement>;
  export const ol: ElementType<HTMLOListElement>;
  export const object: ElementType<HTMLObjectElement>;
  export const option: ElementType<HTMLOptionElement>;
  export const optgroup: ElementType<HTMLOptGroupElement>;
  export const p: ElementType<HTMLParagraphElement>;
  export const output: ElementType<HTMLOutputElement>;
  export const portal: ElementType<HTMLElement>;
  export const picture: ElementType<HTMLPictureElement>;
  export const progress: ElementType<HTMLProgressElement>;
  export const pre: ElementType<HTMLPreElement>;
  export const rp: ElementType<HTMLElement>;
  export const q: ElementType<HTMLQuoteElement>;
  export const ruby: ElementType<HTMLElement>;
  export const rt: ElementType<HTMLElement>;
  export const samp: ElementType<HTMLElement>;
  export const s: ElementType<HTMLElement>;
  export const section: ElementType<HTMLElement>;
  export const script: ElementType<HTMLScriptElement>;
  export const slot: ElementType<HTMLSlotElement>;
  export const select: ElementType<HTMLSelectElement>;
  export const source: ElementType<HTMLSourceElement>;
  export const small: ElementType<HTMLElement>;
  export const strong: ElementType<HTMLElement>;
  export const span: ElementType<HTMLSpanElement>;
  export const sub: ElementType<HTMLElement>;
  export const style: ElementType<HTMLStyleElement>;
  export const sup: ElementType<HTMLElement>;
  export const summary: ElementType<HTMLElement>;
  export const table: ElementType<HTMLTableElement>;
  export const svg: ElementType<HTMLOrSVGElement>;
  export const td: ElementType<HTMLTableCellElement>;
  export const tbody: ElementType<HTMLTableColElement>;
  export const textarea: ElementType<HTMLTextAreaElement>;
  export const template: ElementType<HTMLTemplateElement>;
  export const th: ElementType<HTMLTableSectionElement>;
  export const tfoot: ElementType<HTMLElement>;
  export const time: ElementType<HTMLTimeElement>;
  export const thead: ElementType<HTMLTableSectionElement>;
  export const tr: ElementType<HTMLTableRowElement>;
  export const title: ElementType<HTMLTitleElement>;
  export const u: ElementType<HTMLElement>;
  export const track: ElementType<HTMLTrackElement>;
  export const val: ElementType<HTMLElement>;
  export const ul: ElementType<HTMLUListElement>;
  export const wbr: ElementType<HTMLElement>;
  export const video: ElementType<HTMLVideoElement>;

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
   * // or no style props it works!
   * _("p",{
   * text: "am a p tag",
   * color: "blue"
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
   * // list of children
   * _("p",
   * // all children goes after
   * _("span",
   * {
   * text:" am a span tag like so",
   *  color: "brown",
   * }),
   * ...
   * )
   *
   * @param  {...any[]} element_initials
   * @returns function - cradova element
   */

  const _: any;
  export default _;
}
