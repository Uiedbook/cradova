export type ElementType<T> = (
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

export type CradovaHTMLElementType = (
  ...element_initials: any[]
) =>
  | ((...element_initials: any[]) => "NO TEMPLATE STRING PROVIDED")
  | ((...element_initials: any[]) => HTMLElement | undefined);

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

export type SignalType = {
  // constructor(
  //   initial: unknown,
  //   props?: { useHistory?: boolean; persistName?: string | undefined }
  // ): void;
  /**
   * Cradova Signal
   * ----
   * current value of this signal*/
  value: any;
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   *
   *
   * .
   *
   */
  set: (value: unknown, shouldRefRender?: boolean) => void;

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

  setKey: (name: string, value: any, shouldRefRender?: boolean) => void;
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */
  createAction: (
    name: string | Record<string, (self?: any, data?: any) => void>,
    action?: (self?: any, data?: any) => void
  ) => void;
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param name - string name of the action
   * @param data - data for the action
   */
  fireAction: (name: string, data?: any) => void;

  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */
  bindRef: (Ref: any, path?: string) => void;
  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */
  listen: (callback: (a: any) => void) => void;
  /**
   * Cradova Signal
   * ----
   * get value */ addErrorHandler: (callback: () => void) => void;
  get: () => any;
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   */
  clearPersist: (data: any) => void;
};

export type RouterRouteObject = {
  html(): any;
  controller: (params: object, force?: boolean) => any;
  deactivate: (params: object) => any;
  packager: (params: any) => void;
};

/**
 *
 */

export type CradovaScreenType = {
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
  // onActivate: (fn: (data: any) => void) => Promise<void>;
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
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

export type RouterType = {
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
   * Cradova Router
   * ------
   *
   * return last set router params
   *
   * .
   */
  getParams: () => unknown;
  /**
   * get a screen ready before time.
   *
   * @param {string}   path     Route path.
   * @param {any} data data for the screen.
   */
  packageScreen: (path: string, data?: any) => Promise<void>;
  pageShow: ((path: string) => void) | null;
  pageHide: ((path: string) => void) | null;
  onPageShow: (callback: () => void) => void;
  onPageHide: (callback: () => void) => void;
  addErrorHandler: (callback: () => void) => void;
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
};

/**
 *
 * Cradova Ajax
 * ------------------
 * your new axios alternative
 * supports files upload
 * @param url - string
 * @param opts - {method?: string; data?: object; header?: object; callbacks?: function;}
 * @returns any
 */

export type Ajax = (url: string | URL, opts?: any) => Promise<any>;
