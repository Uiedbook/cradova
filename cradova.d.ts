declare module "cradova" {
  type CradovaScreenTyping = {
    name: string;
    template: Function | HTMLElement;
    transition?: string;
    persist?: boolean;
    /**
     * Cradova screen
     * ---
     * runs once after first render
     *
     */
  };

  type CradovaScreenType = {
    /**
     * Cradova screen
     * ---
     * runs once after first render
     *
     */
    effect?(fn: () => void | Promise<void>): void;
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
  };

  type CradovaElementType = Record<string, any>;

  type RefType = {
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns HTMLElement
     */
    render(data?: any): () => any;
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
    updateState(data: any): void;
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
    route: (path: string, screen: CradovaScreenType) => void;
    /**
     * get a screen ready before time.
     *
     * @param {string}   path     Route path.
     * @param {any} data data for the screen.
     */
    packageScreen: (path: string, data?: any) => void;
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
   * @param transitions
   */
  export class Screen {
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
     *  Cradova Screen
     * ---
     * create instances of manageable pages
     * @param name
     * @param template
     * @param transitions
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
  export class createSignal {
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
   * - update a cradova Ref automatically
   * @constructor initial: any, Ref: any
   */

  export class $ {
    private ref;
    value: any;
    constructor(initial: unknown);
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
          method?: string;
          data?: Record<string, any>;
          header?: Record<string, any>;
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

  export const ls: Record<string, Function>;

  /**
   * Cradova Ref
   * -------
   * create dynamic components
   *
   */
  export class Ref {
    constructor(component: (...data: any) => any);
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns HTMLElement
     */
    render(data?: any): () => any;
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
    updateState(data: any): void;
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
