export type CradovaElementType = Record<string, any>;
// FIXME: This is too rough for use a type for cradova element type
// replaced with any for

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

export type CradovaScreenType = {
  name: string;
  template: Function | HTMLElement;
  transition?: string;
  callBack?: (html?: any, data?: Record<string, any>) => void;
  persist?: boolean;
  effect?: (fn: () => any) => void;
};

export type RefType = {
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
   */
  set: (value: unknown, shouldRefRender?: boolean) => void;

  /**
   *  Cradova Signal
   * ----
   *  set a key value if it's an object
   * @param name - name of the key
   * @param value - value of the key
   * @returns void
   */

  setKey: (name: string, value: any, shouldRefRender?: boolean) => void;
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an object prop of the store
   * @param key - a prop of the store - object value
   * @param name - prop of the key object
   * @param value - value of the name
   * @returns void
   */

  setPath: (
    key: string,
    name: string,
    value: any,
    shouldRefRender?: boolean
  ) => void;
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an array prop of the store
   * @param key - a prop of the store - object value
   * @param index - index of the key object
   * @param value - value of the index
   * @returns void
   */
  setIndex: (
    key: string,
    index: number,
    value: any,
    shouldRefRender?: boolean
  ) => void;
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
   *  set signal value to a future one
   * @returns void
   */
  forward: (data: any) => any;
  /**
   *  Cradova Signal
   * ----
   *  set signal value to a old past one
   * @returns void
   */
  backward: () => void;
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
   * get value */
  get: () => any;
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   */
  clearPersist: (data: any) => void;
};

export type RouterRouteObject = {
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

export type RouterType =
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

export type fragmentTYPE = () => (() => HTMLElement) | HTMLElement;

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
