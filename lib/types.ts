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
        assert?: any;
      }
  )[]
) => T;

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

export type RouterRouteObject = {
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
  // onActivate: (fn: (data: any) => void) => Promise<void>;
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
  getParams: <D>() => { data: D | unknown; params: any };
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
