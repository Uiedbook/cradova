declare module "cradova" {
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
   *  Cradova Signal
   * ----
   *  create stateful data store.
   * ability to:
   * - create a store
   * - create actions and fire them
   * - bind a Ref or RefList
   * - listen to changes
   * - persist changes to localStorage
   * - set keys instead of all values
   * - update a cradova Ref/RefList automatically
   * @constructor initial: any, props: {useHistory, persist}
   */
  export class createSignal<Type> {
    private callback;
    private persistName;
    private actions;
    private ref;
    private path;
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
      action?: (data?: Type) => void
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  fires an action if available
     * @param key - string key of the action
     * @param data - data for the action
     */
    fireAction(key: string, data?: Type): void;
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
    getParams: <D>() => { data: D | unknown; params: any };
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
   * Cradova Router
   * ---
   * Facilitates navigation within the application and initializes
   * page views based on the matched routes.
   */
  export const Router: RouterType;

  /**
   *
   */
  type CradovaScreenType = {
    /**
     * Cradova screen
     * ---
     * title of the page
     * @param data
     * @returns void
     *
     *
     * .
     */
    name: string;
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
     * Screen transition from the screen class
     * @param data
     * @returns void
     *
     *
     * .
     */
    transition?: string;
    /**
     * Cradova screen
     * ---
     * gets called when the the screen is displayed
     * @param data
     * @returns void
     *
     *
     * .
     */
    /**
     * Cradova screen
     * ---
     * Should this screen be cached after first render?
     * @param data
     * @returns void
     *
     *
     * .
     */
    persist?: boolean;
  };

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
    private html;
    /**
     * this is the name of the screen that appears as the title
     */
    private name;
    private packed;
    private secondaryChildren;
    /**
     * used internally
     */
    private template;
    private callBack;
    private deCallBack;
    errorHandler: (() => void) | null;
    /**
     * this tells cradova to persist state on the screen or not
     * persisting is better
     */
    private persist;
    private data;
    constructor(cradova_screen_initials: CradovaScreenType);
    setErrorHandler(errorHandler: () => void): void;
    package(): Promise<void>;
    onActivate(cb: () => Promise<void> | void): void;
    onDeactivate(cb: () => Promise<void> | void): void;
    addChild(...addOns: any[]): void;
    deActivate(): void;
    Activate(force?: boolean): Promise<void>;
  }

  /**
   *  Cradova simpleStore
   * ----
   *  create stateful data store.
   * ability to:
   * - create a store
   * - set keys instead of all values
   * - able to update state on any element as a property value
   * @constructor initial: any, Ref/RefList/RefElement: any
   */
  export class $<Type extends Record<string, unknown>> {
    private ref;
    value: Type;
    constructor(initial: Type);
    /**
     *  Cradova simpleStore
     * ----
     *  set simpleStore value
     * @param value - simpleStore value
     * @returns void
     */
    set(value: Type | ((value: Type) => Type), shouldRefRender?: boolean): void;
    /**
     * Cradova
     * ---
     * is used to bind store data to any element
     *
     * @param prop
     * @returns something
     */
    bind(prop: string): (string | this)[];
    private updateState;
    /**
     *  Cradova simpleStore
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @returns void
     */
    setKey<k extends keyof Type>(
      name: k,
      value: any,
      shouldRefRender?: boolean
    ): void;
    /**
     *  Cradova simpleStore
     * ----
     *  set a auto - rendering component for this store
     *
     * @param Ref component to bind to.
     * @param path a property in the object to send to attached ref
     */
    bindRef(ref: any, key: string, prop: string): void;
  }

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
  export const noscript: ElementType<HTMLElement>;
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
   * Cradova afterMount event
   */
  export let cradovaAftermountEvent: CustomEvent<unknown>;
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
  export function assert(condition: any, ...elements: any): undefined | any;

  export function loop(
    datalist: any[],
    component: (value: any, index?: number, array?: any[]) => HTMLElement
  ): any;

  export function svgNS(
    type: string,
    props: Record<string, any>,
    ...children: any
  ): HTMLElement;

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
    private stateID;
    private effects;
    private effectuate;
    private rendered;
    private published;
    private hasFirstStateUpdateRun;
    private preRendered;
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
    instance(): any;
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
