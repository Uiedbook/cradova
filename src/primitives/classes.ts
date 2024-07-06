import { type CradovaPageType, type promisedPage } from "./types";

/**
 * Cradova event
 */
class cradovaEvent {
  private afterMount: Function[] = [];
  private beforeMountActive: Function[] = [];
  /**
   *  add an event to an exhaustible list of events
   * the events runs only once and removed.
   * these event are call and removed once when when a comp is rendered to the dom
   * @param callback
   */
  async addAfterMount(callback: () => void) {
    this.afterMount.push(callback);
  }
  /**
   *  add an event to a list of events
   * the events runs many times.
   * these event are called before a comp is rendered to the dom
   * @param callback
   */
  async addBeforeMountActive(callback: () => void) {
    if (!this.beforeMountActive) {
      this.beforeMountActive = [];
    }
    this.beforeMountActive.push(callback);
  }
  /**
   * Dispatch any event
   * @param eventName
   */
  dispatchEvent(eventName: "beforeMountActive" | "afterMount") {
    const eventListeners = this[eventName];
    for (let i = 0; i < eventListeners.length; i++) {
      if (eventName.includes("Active")) {
        eventListeners[i]();
      } else {
        eventListeners.shift()!();
      }
    }
  }
}

export const CradovaEvent = new cradovaEvent();

/**
 * Cradova Comp
 * -------
 * create dynamic components
 *
 */
export class Comp<Prop extends Record<string, any> = any> {
  private component: (this: Comp<Prop>) => HTMLElement;
  private effects: (() => Promise<void> | void)[] = [];
  private effectuate: ((this: Comp<Prop>) => void) | null = null;
  private rendered = false;
  private published = false;
  private preRendered: HTMLElement | null = null;
  private reference: HTMLElement | null = null;
  Signal: createSignal<any> | undefined;
  //? hooks management
  _state: Prop[] = [];
  _state_index = 0;
  test?: string;

  //? public testName = null;
  constructor(component: (this: Comp<Prop>) => HTMLElement) {
    this.component = component.bind(this);
  }

  preRender() {
    // ? parking
    this.preRendered = this.render() as HTMLElement;
  }

  /**
   * Cradova Comp
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render() {
    this.effects = [];
    this.rendered = false;
    if (!this.preRendered) {
      this._state_index = 0;
      this._state = [];
      const html = this.component() as any;
      // parking

      if (html instanceof HTMLElement) {
        this.reference = html;
        this.effector.apply(this);
        this.rendered = true;
        this.published = true;
      } else {
        console.error(
          " ✘  Cradova err :  Invalid html content, got  - " + html
        );
      }
      return html;
    } else {
      return this.preRendered;
    }
  }
  _setExtra(Extra: createSignal<any>) {
    this.Signal = Extra;
  }

  _effect(fn: () => Promise<void> | void) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }

  private async effector() {
    // if (!this.rendered) {
    for (let i = 0; i < this.effects.length; i++) {
      await this.effects[i].apply(this);
    }
    this.effects = [];
    // }
    // first update
    if (this.effectuate) {
      this.effectuate();
      this.effectuate = null;
    }
  }

  /**
   * Cradova Comp
   * ---
   * update comp component with new data and update the dom.
   * @param data
   * @returns
   */

  recall() {
    if (!this.rendered) {
      this.effectuate = () => {
        if (this.published) {
          this.activate();
        }
      };
    } else {
      if (this.published) {
        this.activate();
      }
    }
  }

  private async activate() {
    //
    this.published = false;
    if (!this.rendered) {
      return;
    }
    this._state_index = 0;
    const html = this.component() as any;
    if (html instanceof HTMLElement) {
      const node = this.reference;
      if (node) {
        node.insertAdjacentElement("beforebegin", html as Element);
        node.remove();
      }
      this.published = true;
      this.reference = html;
      CradovaEvent.dispatchEvent("afterMount");
      (async () => {
        if (!document.contains(html)) {
          this.rendered = false;
        }
      })();
    } else {
      console.error(" ✘  Cradova err :  Invalid html, got  - " + html);
    }
  }
}

/**
 * cradova
 * ---
 * lazy load a file
 */
export class lazy<Type> {
  public content: Type | undefined;
  private _cb: () => Promise<unknown>;
  constructor(cb: () => Promise<unknown>) {
    this._cb = cb;
  }
  async load() {
    let content = await this._cb();
    if (typeof content === "function") {
      content = await content();
    } else {
      content = await content;
    }
    const def = content as { default: unknown };
    if (def.default) {
      this.content = def?.default as Type;
    }
  }
}

/**
 *  Cradova Signal
 * ----
 *  Create stateful data store.
 *  Features:
 * - create a store
 * - create actions and fire them
 * - bind a Comp and elements
 * - listen to updates
 * - set object keys instead of all values
 * - persist changes to localStorage
 * - update a cradova Comp automatically
 * @constructor initial: unknown, props: {useHistory, persist}
 */

export class createSignal<Type extends Record<string, any>> {
  private callback: undefined | ((newValue: Type) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, (data?: unknown) => void> = {};
  private comp: {
    comp: Comp;
    _event?: string;
    _signalProperty?: string;
    _element_property?: string;
  }[] = [];

  value: Type;
  constructor(initial: Type, props?: { persistName?: string | undefined }) {
    this.value = initial;
    if (props && props.persistName) {
      this.persistName = props.persistName;
      const key = localStorage.getItem(props.persistName);
      if (key && key !== "undefined") {
        this.value = JSON.parse(key);
      }
      if (typeof initial === "object") {
        for (const key in initial) {
          if (!Object.prototype.hasOwnProperty.call(this.value, key)) {
            this.value[key] = initial[key];
          }
        }
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   */
  set(value: Type | ((value: Type) => Type), shouldRefRender?: boolean) {
    if (typeof value === "function") {
      // value could be a promise
      this.value = value(this.value);
    } else {
      this.value = value;
    }
    if (this.persistName) {
      localStorage.setItem(this.persistName, JSON.stringify(this.value));
    }
    if (this.comp.length && shouldRefRender !== false) {
      this.updateState();
    }
    if (this.callback) {
      this.callback(this.value);
    }
  }
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
  ) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[key] = value as any;
      if (this.persistName) {
        localStorage.setItem(this.persistName, JSON.stringify(this.value));
      }
      if (this.comp.length && shouldRefRender !== false) {
        this.updateState();
      }
      if (this.callback) {
        this.callback(this.value);
      }
    } else {
      throw new Error(
        `✘  Cradova err : can't set key ${String(
          key
        )} store.value is not an object`
      );
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */
  createAction(name: string, action: (data?: unknown) => void) {
    if (typeof name === "string" && typeof action === "function") {
      this.actions[name] = action.bind(this);
    } else {
      throw new Error(
        `✘  Cradova err : can't create action ${name}, check values`
      );
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  creates man y actions at a time
   * @param name - name of the action
   * @param action function to execute
   */
  createActions(Actions: Record<string, (data?: unknown) => void>) {
    for (const [name, action] of Object.entries(Actions)) {
      if (typeof name === "string" && typeof action === "function") {
        this.actions[name] = action;
      } else {
        throw new Error(
          `✘  Cradova err : can't create action ${name} check values`
        );
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param key - string key of the action
   * @param data - data for the action
   */
  fireAction(key: string) {
    if (typeof this.actions[key] === "function") {
      this.updateState(key);
      return this.actions[key].call(this);
    } else {
      throw Error("✘  Cradova err : action " + key + "  does not exist!");
    }
  }

  /**
   * Cradova
   * ---
   * is used to bind signal data to elements and Comps
   *
   * @param prop
   * @returns something
   */

  bind(prop: string): any {
    if (
      typeof this.value === "object" &&
      typeof this.value[prop] !== "undefined"
    ) {
      return [this, prop];
    } else {
      throw new Error(
        "✘  Cradova err : can't bind an unavailable property!  " + prop
      );
    }
  }

  private updateState(name?: string) {
    for (let i = 0; i < this.comp.length; i++) {
      const ent = this.comp[i];
      if (ent._event && ent._event === name) {
        continue;
      }
      // ? for normal elements
      if (ent._element_property && ent._signalProperty) {
        ent.comp[ent._element_property as "render"] =
          this.value[ent._signalProperty];
        continue;
      }
      // ? for Comps
      ent.comp.recall();
    }
  }

  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Comp component to bind to.
   */
  bindRef(
    comp: Comp,
    binding: {
      event?: string;
      signalProperty: string;
      _element_property: string;
    } = { signalProperty: "", _element_property: "" }
  ) {
    if (comp instanceof Comp) {
      comp.render = comp.render.bind(comp);
      comp._setExtra(this);
    }
    // it's an element binding, not comp, not event(fire action events)
    this.comp.push({
      comp: comp,
      _signalProperty: binding.signalProperty,
      _element_property: binding._element_property,
      _event: binding.event,
    });
  }

  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */
  listen(callback: (a: Type) => void) {
    this.callback = callback;
  }
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   *
   */
  clearPersist() {
    if (this.persistName) {
      localStorage.removeItem(this.persistName);
    }
  }
}

/**
 *  Cradova Page
 * ---
 * create instances of manageable pages
 * @param name
 * @param template
 */

export class Page {
  /**
   * used internally
   */
  private _name: string;
  /**
   * this should be a cradova page component
   */
  public _html: (this: Page) => HTMLElement;
  private _template = document.createElement("div");
  private _callBack: (() => Promise<void> | void) | undefined;
  private _deCallBack: (() => Promise<void> | void) | undefined;
  private _dropped = false;
  /**
   * error handler for the page
   */
  public _errorHandler: ((err: unknown) => void) | null = null;
  constructor(cradova_page_initials: CradovaPageType) {
    const { template, name } = cradova_page_initials;
    this._html = template;
    this._name = name || "Document";
    this._template.setAttribute("id", "page");
  }

  set errorHandler(errorHandler: (err: unknown) => void) {
    this._errorHandler = errorHandler;
  }

  onActivate(cb: () => Promise<void> | void) {
    this._callBack = cb;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this._deCallBack = cb;
  }
  async _deActivate() {
    this._deCallBack && (await this._deCallBack());
  }
  drop(state?: boolean) {
    if (typeof state === "boolean") {
      this._dropped = state;
      return undefined;
    } else return this._dropped;
  }
  async _activate() {
    //? check if the page is dropped
    if (this._dropped) {
      history.go(-1);
      return;
    }
    //? packaging the page dom
    //? parking
    let html = this._html.apply(this);
    if (html instanceof HTMLElement) {
      this._template.innerHTML = "";
      this._template.appendChild(html);
    } else {
      throw new Error(
        ` ✘  Cradova err:  template function for the page returned ${html} instead of html`
      );
    }
    // ?
    document.title = this._name;
    RouterBox.doc!.innerHTML = "";
    // ? tell all Comps to re-render
    CradovaEvent.dispatchEvent("beforeMountActive");
    RouterBox.doc!.appendChild(this._template);
    // ? call any onmount event added in the cradova event loop
    CradovaEvent.dispatchEvent("afterMount");
    window.scrollTo({
      top: 0,
      left: 0,
      // @ts-ignore
      behavior: "instant",
    });
    this._callBack && (await this._callBack());
  }
}

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

class RouterBoxClass {
  doc: null | HTMLElement = null;
  lastNavigatedRouteController?: Page;
  nextRouteController?: Page;
  lastNavigatedRoute?: string;
  pageShow = null;
  pageHide = null;
  errorHandler?: Function;
  loadingPage: any = null;
  params: any = {};
  routes: Record<string, Page | (() => Promise<Page | undefined>)> = {};
  pageevents: Function[] = [];
  // tarcking paused state of navigation
  paused = false;
  async start_pageevents(url: string) {
    setTimeout(() => {
      for (let ci = 0; ci < this.pageevents.length; ci++) {
        this.pageevents[ci](url);
      }
      // always starts events a moment later
    }, 50);
  }

  route(path: string, page: Page) {
    // undefined is an option  here for auth routes
    if (typeof page !== "undefined") {
      if (page && !page) {
        console.error(" ✘  Cradova err:  not a valid page  ", page);
        // throw new Error(" ✘  Cradova err:  Not a valid cradova page component");
      }
      return (this.routes[path] = page);
    }
    return undefined;
  }

  /**
   * Cradova Router
   * ----
   * * The whole magic happens here
   * -
   * Responds to click events an y where in the document and when
   * the click happens on a link that is supposed to be handled
   * by the router, it loads and displays the target page.
   * * Responds to popstate and load events and does it's job
   * @param {Event} _e  popstate event | load event.
   */

  async router(_e?: unknown, _force?: boolean) {
    let url = window.location.href,
      route: Page,
      params;
    // ? abort navigation when router is paused
    if (this.paused) {
      window.location.hash = "paused";
      return;
    }
    //? abort unneeded navigation
    // if (url === this.lastNavigatedRoute) {
    //   return;
    // }
    if (this.nextRouteController) {
      route = this.nextRouteController;
      this.nextRouteController = undefined;
    } else {
      [route, params] = this.checker(url) as [Page, any];
    }
    if (typeof route !== "undefined") {
      // we need to caught any error and propagate to the app
      try {
        // lazy loaded pages
        if (typeof route === "function") {
          if (this.loadingPage instanceof Page) {
            await this.loadingPage._activate();
          }
          route = await (route as () => Promise<any>)();
          // ! bad operation let's drop it and revert
          if (!route) {
            if (this.lastNavigatedRoute) {
              history.pushState({}, url, this.lastNavigatedRoute);
            }
            return;
          }
        }
        if (params) {
          this.params.params = params;
        }
        await route!._activate();
        this.start_pageevents(url);
        this.lastNavigatedRouteController &&
          this.lastNavigatedRouteController._deActivate();
        this.lastNavigatedRoute = url;
        this.lastNavigatedRouteController = route;
      } catch (error) {
        if (route && route["_errorHandler"]) {
          route._errorHandler(error);
        } else {
          if (typeof this.errorHandler === "function") {
            this.errorHandler(error);
          } else {
            console.error(error);
            throw new Error(
              " ✘  Cradova err:  consider adding error boundary to the specific page  "
            );
          }
        }
      }
    } else {
      // or 404
      if (this.routes["*"]) {
        await (this.routes["*"] as Page)._activate();
      }
    }
  }

  checker(
    url: string
  ): [Page | (() => Promise<Page | undefined>), Record<string, any>] {
    if (url[0] !== "/") {
      url = url.slice(url.indexOf("/", 8));
    }

    if (this.routes[url]) {
      return [this.routes[url], { path: url }];
    }
    // ! {2} this is commented out because it's has been handled by the navigating method
    //? check for search in the route
    // if (url.includes("/?")) {
    //   const sraw = [...new URLSearchParams(url).entries()];
    //   const search: Record<string, string> = {};
    //   for (const idx in sraw) {
    //     search[
    //       sraw[idx][0].includes("?") ? sraw[idx][0].split("?")[1] : sraw[idx][0]
    //     ] = sraw[idx][1];
    //   }
    //   const path = url.slice(0, url.indexOf("/?") + 2)
    //   return [this.routes[path], { path, search }];
    // }
    //  ! {2} that's why we handle it differently.
    if (url.includes("?")) {
      let search;
      const params: Record<string, string> = {};
      [url, search] = url.split("?");
      new URLSearchParams(search).forEach((val, key) => {
        params[key] = val;
      });
      if (this.routes[url]) {
        return [this.routes[url], { data: params, path: url }];
      }
    }
    //? place holder & * route checks
    for (const path in this.routes) {
      // ? placeholder check
      if (path.includes(":")) {
        const urlFixtures = url.split("/");
        const pathFixtures = path.split("/");
        //? check for extra / in the route by normalize before checking
        if (url.endsWith("/")) {
          urlFixtures.pop();
        }
        let fixturesX = 0;
        let fixturesY = 0;
        //? length check of / (backslash)
        if (pathFixtures.length === urlFixtures.length) {
          for (let i = 0; i < pathFixtures.length; i++) {
            //? let's jump place holders in the path since we can't determine from them
            //? we increment that we skipped a position because we need the count later
            if (pathFixtures[i].includes(":")) {
              fixturesY++;
              continue;
            }
            //? if it is part of the path then let increment a value for it
            //? we will need it later
            if (urlFixtures[i] === pathFixtures[i]) {
              fixturesX++;
            }
          }
          //? if after the checks it all our count are equal then we got it correctly
          if (fixturesX + fixturesY === pathFixtures.length) {
            const routesParams: Record<string, string> = {};
            for (let i = 0; i < pathFixtures.length; i++) {
              if (pathFixtures[i].includes(":")) {
                routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
              }
            }
            return [this.routes[path], { param: routesParams }];
          }
        }
      }
      // ? * check
      if (path.includes("*")) {
        const p = path.slice(0, -1);
        if (url.startsWith(p)) {
          return [this.routes[path], { extraPath: url.slice(p.length) }];
        }
      }
    }
    return [] as unknown as [Page, any];
  }
}

const RouterBox = new RouterBoxClass();

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param  page the cradova document tree for the route.
 */

export class Router {
  /**
   * cradova router
   * ---
   * Registers a route.
   *
   * accepts an object containing pat and page
   */
  static BrowserRoutes(obj: Record<string, Page | promisedPage>) {
    // ! remove these as any later
    for (const path in obj) {
      let page = obj[path];
      if (
        (typeof page === "object" &&
          typeof (page as any).then === "function") ||
        typeof page === "function"
      ) {
        // creating the lazy
        RouterBox.routes[path] = async () => {
          page = await (typeof page === "function" ? await page() : await page);
          return RouterBox.route(path, (page as any)?.default || page);
        };
      } else {
        RouterBox.route(path, page);
      }
    }
    Router._mount();
  }
  /** 
    Go back in Navigation history
    */
  static back() {
    history.go(-1);
  }
  /** 
    Go forward in Navigation history
    */
  static forward() {
    history.go(1);
  }
  /** 
    Pause navigation
    */
  static pauseNaviagtion() {
    RouterBox["paused"] = true;
    window.location.hash = "paused";
  }
  /** 
   resume navigation
  */
  static resumeNaviagtion() {
    RouterBox["paused"] = false;
    window.location.replace(window.location.pathname + window.location.search);
    history.go(-1);
  }
  /**
   * Cradova Router
   * ------
   *
   * Navigates to a designated page in your app
   *
   * @param href string
   * @param data object
   * @param force boolean
   */
  static navigate(href: string, data: Record<string, unknown> | null = null) {
    if (typeof href !== "string") {
      console.error(
        " ✘  Cradova err:  href must be a defined path but got " +
          href +
          " instead"
      );
    }
    let route = null,
      params;
    if (href.includes(".")) {
      window.location.href = href;
    } else {
      // if (href === window.location.href) {
      //   return;
      // }
      [route, params] = RouterBox.checker(href);
      if (route) {
        RouterBox.nextRouteController = route as Page;
        window.history.pushState({}, "", href);
      }
      RouterBox.params.params = params;
      RouterBox.params.data = data;
      RouterBox.router(null);
    }
  }

  /**
   * Cradova
   * ---
   * Loading page for your app
   *
   * lazy loaded loading use
   *
   * @param page
   */
  static setLoadingPage(page: Page) {
    if (page instanceof Page) {
      RouterBox.loadingPage = page;
    } else {
      throw new Error(
        " ✘  Cradova err:  Loading Page should be a cradova page class"
      );
    }
  }

  /** cradova router
   * ---
   * Listen for navigation events
   *
   * @param callback   () => void
   */
  static onPageEvent(callback: () => void) {
    if (typeof callback === "function") {
      RouterBox["pageevents"].push(callback);
    } else {
      throw new Error(
        " ✘  Cradova err:  callback for pageShow event is not a function"
      );
    }
  }

  /**
   * Cradova Router
   * ------
   *
   * return last set router params
   *
   * .
   */

  static get Params() {
    return RouterBox.params;
  }

  /**
   * Cradova
   * ---
   * Error Handler for your app
   *
   * @param callback
   * @param path? page path
   */

  static addErrorHandler(callback: (err: unknown) => void) {
    if (typeof callback === "function") {
      RouterBox["errorHandler"] = callback;
    } else {
      throw new Error(
        " ✘  Cradova err:  callback for error event is not a function"
      );
    }
  }

  static _mount() {
    // creating mount point
    let doc = document.querySelector("[data-wrapper=app]") as HTMLElement;
    if (!doc) {
      doc = document.createElement("div");
      doc.setAttribute("data-wrapper", "app");
      document.body.appendChild(doc);
      RouterBox.doc = doc;
    } else {
      RouterBox.doc = doc;
    }
    window.addEventListener("pageshow", () => RouterBox.router());
    window.addEventListener("popstate", (_e) => {
      _e.preventDefault();
      RouterBox.router();
    });
  }
}
