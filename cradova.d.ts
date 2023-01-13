declare module "cradova" {
  type CradovaScreenType = {
    name: string;
    template: Function | HTMLElement;
    transition?: string;
    callBack?: (html?: any, data?: Record<string, any>) => void;
    persist?: boolean;
    effect?: (fn: () => any) => void;
  };
  type RefType = {
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns html
     */
    render: (data: any) => () => HTMLElement;
    /**
     * Cradova Ref
     * ---
     * runs on every state update
     *
     */
    r: (data: any) => () => HTMLElement;
    /**
     * Cradova Ref
     * ---
     * runs on every state update
     *
     */
    onStateUpdate: (callback: () => void) => void;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState: (data: any) => any;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    u: (data: any) => any;
  };
  type RouterRouteObject = {
    controller: (params: object, force?: boolean) => any;
    deactivate: (params: object) => any;
    packager: (params: any) => void;
  };
  /**
   * Cradova Router
   * ---
   * Facilitates navigation within the application and initializes
   * page views based on the matched routes.
   */
  type RouterType =
    | {
        /**
         * Registers a route.
         *
         * @param {string}   path     Route path.
         * @param {any} screen the cradova document tree for the route.
         */
        route: (path: string, screen: CradovaScreenType) => void;
        routes: Record<string, RouterRouteObject>;
        lastNavigatedRoute: string | null;
        lastNavigatedRouteController: RouterRouteObject | null;
        nextRouteController: RouterRouteObject | null;
        params: Record<string, any>;
        /**
         * n/a
         */
        router: (e: any, force?: boolean) => void;
        /**
         * get a screen ready before time.
         *
         * @param {string}   path     Route path.
         * @param {any} data data for the screen.
         */
        packageScreen: (path: string, data?: any) => void;
        pageShow: ((path: string) => void) | null;
        pageHide: ((path: string) => void) | null;
        onPageShow: (callback: () => void) => void;
        onPageHide: (callback: () => void) => void;
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
      }
    | Record<string, any>;

  /**
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
    name: string;
    private packed;
    secondaryChildren: Array<any>;
    /**
     * used internally
     */
    private template;
    /**
     * this a set of two class names
     * one for the entry transition
     * and one for the exit transition
     */
    private transition;
    private callBack;
    static SCALE_IN: string;
    static SCALE_OUT: string;
    static CIRCLE_IN: string;
    static CIRCLE_OUT: string;
    static FADE_OUT: string;
    static FADE_IN: string;
    static SLIDE_UP: string;
    static SLIDE_DOWN: string;
    static SLIDE_LEFT: string;
    static SLIDE_RIGHT: string;
    /**
     * this tells cradova to persist state on the screen or not
     * persisting is better
     */
    persist: boolean;
    rendered: boolean;
    effects: (() => unknown | Promise<unknown>)[];
    constructor(cradova_screen_initials: CradovaScreenType);
    effect(fn: () => unknown | Promise<unknown>): void;
    effector(): Promise<void>;
    package(data?: any): Promise<void>;
    onActivate(cb: (data: any) => void): void;
    addChild(...addOns: any[]): void;
    deActivate(): void;
    Activate(data?: any, force?: boolean): Promise<void>;
  }

  export class Scaffold {
    private history;
    private Scaffolds;
    push(label: string, data?: unknown, force?: boolean): Promise<void>;
    pop(data?: unknown, force?: boolean): Promise<void>;
    addScaffolds(scaffolds: Record<string, CradovaScreenType>): Promise<void>;
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
   * - bind a Ref or RefList
   * - listen to changes
   * -  persist changes to localStorage
   * - go back and forward in value history
   * - set keys instead of all values
   * - update a cradova Ref/RefList automatically
   * @constructor initial: any, props: {useHistory, persist}
   */
  export class Signal {
    private callback;
    private persistName;
    private actions;
    private useHistory;
    private history;
    private ref;
    private index;
    private path;
    value: any;
    constructor(
      initial: unknown,
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
    set(value: unknown, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @returns void
     */
    setKey(name: string, value: any, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a prop value inside an object prop of the store
     * @param key - a prop of the store - object value
     * @param name - prop of the key object
     * @param value - value of the name
     * @returns void
     */
    setPath(
      key: string,
      name: string,
      value: any,
      shouldRefRender?: boolean
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  set a prop value inside an array prop of the store
     * @param key - a prop of the store - object value
     * @param index - index of the key object
     * @param value - value of the index
     * @returns void
     */
    setIndex(
      key: string,
      index: number,
      value: any,
      shouldRefRender?: boolean
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key to signal an action
     * @param name - name of the action
     * @param action function to execute
     */
    createAction(
      name: string | Record<string, (self?: any, data?: any) => void>,
      action?: (self?: any, data?: any) => void
    ): void;
    /**
     *  Cradova Signal
     * ----
     *  fires an action if available
     * @param name - string name of the action
     * @param data - data for the action
     */
    fireAction(name: string, data?: any): void;
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
     *  set signal value to a future one
     * @returns void
     */
    forward(): void;
    /**
     *  Cradova Signal
     * ----
     *  set signal value to a old past one
     * @returns void
     */
    backward(): void;
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
   * - update a cradova Ref/RefList/RefElement automatically
   * @constructor initial: any, Ref/RefList/RefElement: any
   */

  export class simpleStore {
    private ref;
    value: any;
    constructor(initial: unknown, ref: RefType);
    /**
     *  Cradova simpleStore
     * ----
     *  set simpleStore value
     * @param value - simpleStore value
     * @returns void
     */
    set(value: unknown, shouldRefRender?: boolean): void;
    /**
     *  Cradova simpleStore
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @returns void
     */
    setKey(name: string, value: any, shouldRefRender?: boolean): void;
    /**
     *  Cradova simpleStore
     * ----
     *  set a auto - rendering component for this store
     *
     * @param Ref component to bind to.
     * @param path a property in the object to send to attached ref
     */
    bindRef(Ref: any): void;
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
          method?: string;
          data?: Record<string, any>;
          header?: Record<string, any>;
          callbacks?: Record<string, (arg: any) => void>;
        }
      | any
  ): Promise<unknown>;

  /**
   * swipe
   * ---
   * Now you can detect swipes the best way possible
   *
   * @param callback
   * @param touching?
   * @param element?
   */
  export function swipe(
    callback: (swipe_data: Record<string, number>) => void,
    touching?: boolean,
    element?: HTMLElement
  ): {
    start(): void;
    stop(): void;
  };

  export function loadCradovaUICss(seconds?: number): void;

  export function IsElementInView(element: HTMLElement): boolean;

  export const controls: () => void;
  export function uuid(): string;
  export function PromptBeforeLeave(callback?: (e: any) => void): void;
  /**
Write CSS media in javascript

@example

_.media("min-width: 790px",
["#container",
{
    width: "100%",
    height: "100%",
    "background-color": "#0000"
}],

["#header",
{
    width: "100%",
    height: "20%",
    "background-color": "#fff"
}]
)
*/
  export function media(value: string, ...properties: any[]): void;
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
    properties: Record<string, string>
  ): void;
  /**
Write animation value in javascript

@example

_.animate("polarization",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/
  export function animate(identifier: string, ...properties: any[]): void;
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
  export function RefElement(
    element_initials?: string,
    props?: any,
    ...other: any
  ): {
    render(data?: any): any;
    r(data?: any): any;
    instance(): any;
    i(): any;
    updateState(state: Record<string, any>): void;
    u(state: Record<string, any>): void;
  };
  export const ls: Record<string, Function>;
  export function fullScreen(e: Element): {
    set(): void;
    exist(): void;
  };
  export class RefList {
    private component;
    private stateID;
    private parentElement;
    private datas;
    constructor(component: (...data: any) => any);
    stale(datas: any): void;
    r(d?: any): any;
    u(d?: any): void;
    render(datas?: any): any;
    updateState(datas: any[]): void;
    remove(): void;
    instance(): any;
    i(): any;
  }
  /**
   * Cradova Ref
   * -------
   * create dynamic components
   *
   */
  export class Ref {
    private component;
    private stateID;
    private upcb;
    private data;
    constructor(component: (...data: any) => any);
    stale(data: any): void;
    r(d?: any): () => any;
    u(d?: any): void;
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns () => HTMLElement
     */
    render(data?: any): () => any;
    instance(): any;
    i(): any;
    /**
     * Cradova Ref
     * ---
     * runs on every state update
     *
     */
    onStateUpdate(cb: any): void;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState(data: any): void;
    remove(): void;
  }
  /**
   * Document fragment
   * @param children
   * @returns
   */
  type fragmentTYPE = () => (() => HTMLElement) | HTMLElement;
  export const frag: (...children: fragmentTYPE[]) => DocumentFragment;
  /**
   * Creates new cradova HTML element
   *  @example
   * _("p") // or _("p.class") or _("p#id") or _("p.class#id")
   * using inline props
   * _("p",{
   * text: "am a p tag",
   * style: {
   * color: "blue"
   * }
   * )
   * adding children
   * _("p",
   * _("span",{text:" am a span tag like so",
   *  {style: {color: "brown"}
   * })
   * )
   *
   * props and children
   * _("p",
   * // props first
   * {
   * text: "am a p tag",
   * style: {
   * color: "blue"
   * },
   * // all children goes after
   * _("span",{text:" am a span tag like so",
   *  {style: {color: "brown"}
   * })
   * )
   *
   * @param  {...any} element_initials
   * @returns function - cradova element
   */

  /**
   * Creates new cradova HTML element
   *  @example
   * _("p") // or _("p.class") or _("p#id") or _("p.class#id")
   * using inline props
   * _("p",{
   * text: "am a p tag",
   * style: {
   * color: "blue"
   * }
   * )
   * adding children
   * _("p",
   * _("span",{text:" am a span tag like so",
   *  {style: {color: "brown"}
   * })
   * )
   *
   * props and children
   * _("p",
   * // props first
   * {
   * text: "am a p tag",
   * style: {
   * color: "blue"
   * },
   * // all children goes after
   * _("span",{text:" am a span tag like so",
   *  {style: {color: "brown"}
   * })
   * )
   *
   * @param  {...any} element_initials
   * @returns function - cradova element
   */
  const _: any;
  export default _;
}
