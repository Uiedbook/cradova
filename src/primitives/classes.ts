import { SNRU } from "./functions";
import { type CradovaScreenType } from "./types";

/**
 * Cradova event
 */
class cradovaEvent {
  private listeners: Record<string, Function[]> = {};
  private active_listeners: Record<string, Function[]> = {};
  async addEventListener(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  async addActiveEventListener(eventName: string, callback: () => void) {
    if (!this.active_listeners[eventName]) {
      this.active_listeners[eventName] = [];
    }
    this.active_listeners[eventName].push(callback);
  }
  async dispatchEvent(eventName: string, eventArgs?: unknown) {
    const eventListeners = this.listeners[eventName] || [];
    for (; eventListeners.length !== 0; ) {
      eventListeners.shift()!(eventArgs);
    }
  }
  /**
   * Active refs is a concept for delegated screens to keep their active refs alive
   * even in the case of naviagtion
   * @param eventName
   * @param eventArgs
   */
  async dispatchActiveEvent(eventName: string, eventArgs?: unknown) {
    const eventListeners = this.active_listeners[eventName] || [];
    // ? change snru.snru value
    eventListeners.length && SNRU.memo_SNRU();
    for (let i = 0; i < eventListeners.length; i++) {
      eventListeners[i](eventArgs);
    }
  }
}

export const CradovaEvent = new cradovaEvent();

/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

export class Ref<Prop extends Record<string, any> = any> {
  private component: (this: Ref<Prop>, data: Prop) => HTMLElement;
  private effects: (() => Promise<void> | void)[] = [];
  private effectuate: ((this: Ref<Prop>) => void) | null = null;
  public methods: Record<string, Function> = {};
  private rendered = false;
  private published = false;
  private preRendered: HTMLElement | null = null;
  private reference: reference = new reference();
  // private evented: boolean = false;
  Signal: createSignal<any> | undefined;
  //? hooks management
  _state: Prop[] = [];
  _state_track: { [x: number]: boolean } = {};
  _state_index = 0;

  //? public testName = null;
  public stash: Prop | undefined;
  constructor(
    component: (this: Ref<Prop>, data: Prop) => HTMLElement
    // options?: { active: boolean } | boolean
  ) {
    this.component = component.bind(this);
    CradovaEvent.addActiveEventListener("active-Refs", () => {
      this._state_index = 0;
      this.published = false;
      // if (options && (options === true || options.active)) {
      // ? we can only send stash data
      // this.updateState(this.stash);
      // }
    });
  }

  preRender(data?: Prop, stash?: boolean) {
    // ? parking
    this.preRendered = this.render(data, stash) as HTMLElement;
  }
  destroyPreRendered() {
    this.preRendered = null;
  }

  /**
   * Cradova Ref
   * ---
   * construct to add custom methods to Refs
   * @param methodName
   * @param method
   * @returns  void
   */
  define(methodName: string, method: (this: this, ...arg: any) => void) {
    if (
      typeof methodName == "string" &&
      typeof method == "function" &&
      !Object.prototype.hasOwnProperty.call(this, methodName)
    ) {
      this.methods[methodName] = method.bind(this);
    } else {
      console.error(" ✘  Cradova err :  Invalid Ref.define parameters");
    }
  }

  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(data?: Prop, stash?: boolean) {
    this.effects = [];
    this.rendered = false;
    if (stash) {
      this.stash = data;
    }
    if (!this.preRendered) {
      const html = this.component(data as Prop) as any;
      // parking
      // ! boohoo
      // if (typeof html === "function") {
      //   html = (html as Function)();
      // }

      if (html instanceof HTMLElement || html instanceof DocumentFragment) {
        this.reference._appendDomForce("html", html as unknown as HTMLElement);
        // if (!this.evented) {
        //   CradovaEvent.addActiveEventListener("onmountEvent", () => {
        //     if (this.rendered) {
        //       this.rendered = false;
        //       this.published = false;
        //       console.log(`yoohoo 3`);
        //     }
        //     console.log(`yoohoo 1`);
        //   });
        //   this.evented = true;
        // }
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
  instance() {
    return this.reference.current("html");
  }
  _setExtra(Extra: createSignal<any>) {
    this.Signal = Extra;
  }
  _roll_state(data: any, idx: number, get = false) {
    if (!get) {
      this._state[idx] = data;
    }
    return this._state[idx];
  }
  _effect(fn: () => Promise<void> | void) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }

  private async effector() {
    // console.log("yoohoo 2");
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
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns
   */

  updateState(data?: Prop, stash?: boolean) {
    if (!this.rendered) {
      this.effectuate = () => {
        if (this.published) {
          this.Activate(data);
        }
      };
    } else {
      if (this.published) {
        this.Activate(data);
      }
    }
    if (stash) {
      this.stash = data;
    }
  }

  private async Activate(data?: Prop) {
    this._state_index = 0;
    this.published = false;
    if (!this.rendered) {
      return;
    }
    const html = this.component(data as Prop) as any;
    // if (typeof html === "function") {
    //   html = (html as Function)();
    // }
    if (html instanceof HTMLElement || html instanceof DocumentFragment) {
      const node = this.reference.current("html");
      if (node) {
        node.insertAdjacentElement("beforebegin", html as Element);
        node.remove();
      }
      this.published = true;
      this.reference._appendDomForce("html", html as unknown as HTMLElement);
      CradovaEvent.dispatchEvent("onmountEvent");
    } else {
      console.error(" ✘  Cradova err :  Invalid html content, got  - " + html);
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
 * Cradova
 * ---
 * make reference to dom elements
 */

export class reference {
  tree: Record<string, any> = {};
  globalTree: Record<string, HTMLElement> = {};
  /**
   * Bind a DOM element to a reference name.
   * @param name - The name to reference the DOM element by.
   */
  bindAs(name: string) {
    return [this, name] as unknown as reference;
  }

  /**
   * Retrieve a referenced DOM element.
   * @param name - The name of the referenced DOM element.
   */
  current<ElementType extends HTMLElement = HTMLElement>(name: string) {
    if (this.tree[SNRU.snru]) {
      return this.tree[SNRU.snru][name] as ElementType;
    }
    return null as unknown as ElementType;
  }

  /**
   * Append a DOM element to the reference, overwriting any existing reference.
   * @param name - The name to reference the DOM element by.
   * @param element - The DOM element to reference.
   */
  _appendDomForce(name: string, Element: HTMLElement) {
    if (this.tree[SNRU.snru]) {
      this.tree[SNRU.snru][name] = Element;
    } else {
      this.tree[SNRU.snru] = {};
      this.tree[SNRU.snru][name] = Element;
    }
  }
  _appendDomForceGlobal(name: string, Element: HTMLElement) {
    this.globalTree[name] = Element;
  }
}
const localTree = new reference();
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

export class createSignal<Type extends Record<string, any>> {
  private callback: undefined | ((newValue: Type) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, (data?: Type) => Type | void> = {};
  private ref: {
    ref: Ref;
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
    if (this.ref.length && shouldRefRender !== false) {
      this._updateState();
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
      if (this.ref.length && shouldRefRender !== false) {
        this._updateState();
      }
      if (this.callback) {
        this.callback(this.value);
      }
    } else {
      throw new Error(
        `✘  Cradova err : can't set key ${String(
          key
        )} . store.value is not a javascript object`
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
      this.actions[name] = action;
    } else {
      throw new Error(
        `✘  Cradova err : can't create action, ${name} is not a function`
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
          `✘  Cradova err : can't create action, ${name} is not a function`
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
  fireAction(key: string, data?: Type) {
    this._updateState(key, data as Type);
    if (typeof this.actions[key] === "function") {
      return this.actions[key].call(this, data) as Type;
    } else {
      throw Error("✘  Cradova err : action " + key + "  does not exist!");
    }
  }

  /**
   * Cradova
   * ---
   * is used to bind signal data to elements and Refs
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

  private _updateState(name?: string, data?: Type) {
    if (name && data) {
      this.ref.map((ent) => {
        if (ent._event === name) {
          //
          if (ent._element_property && ent._signalProperty) {
            ent.ref.updateState({
              [ent._element_property]: data[ent._signalProperty],
            });
            return;
          }
          if (ent._element_property) {
            ent.ref.updateState({
              [ent._element_property]: data,
            });
            return;
          }
          if (ent._signalProperty) {
            ent.ref.updateState(data[ent._signalProperty]);
            return;
          }
        }
      });
    } else {
      for (let i = 0; i < this.ref.length; i++) {
        const ent = this.ref[i];
        if (ent._element_property && ent._signalProperty) {
          ent.ref.updateState({
            [ent._element_property]: this.value[ent._signalProperty],
          });
          continue;
        }
        if (ent._element_property) {
          ent.ref.updateState({
            [ent._element_property]: this.value,
          });
          continue;
        }
        if (ent._signalProperty) {
          ent.ref.updateState(this.value[ent._signalProperty]);
          continue;
        }
        if (!ent._element_property && !ent._signalProperty) {
          ent.ref.updateState(this.value);
          continue;
        }
      }
    }
  }

  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   */
  bindRef(
    ref: Ref,
    binding: {
      event?: string;
      signalProperty: string;
      _element_property: string;
    } = { signalProperty: "", _element_property: "" }
  ) {
    ref.render = ref.render.bind(ref, this.value);

    ref._setExtra(this);
    // it's an element binding, not ref, not event(fire action events)
    this.ref.push({
      ref: ref,
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
 *  Cradova Screen
 * ---
 * create instances of manageable pages
 * @param name
 * @param template
 */

export class Screen {
  /**
   * used internally
   */
  private _name: string;
  /**
   * this should be a cradova screen component
   */
  public _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  public _packed = false;
  private _template = document.createElement("div");
  private _callBack:
    | ((cradovaScreenSet: HTMLElement) => Promise<void> | void)
    | undefined;
  private _deCallBack:
    | ((cradovaScreenSet: HTMLElement) => Promise<void> | void)
    | undefined;
  private _persist = true;
  private _delegatedRoutesCount = -1;
  private _dropped = false;
  /**
   * error handler for the screen
   */
  public _errorHandler: ((err: unknown) => void) | null = null;
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel } =
      cradova_screen_initials;
    if (template instanceof Ref) {
      this._html = () => template.render({});
    } else {
      this._html = template as any;
    }
    this._name = name || "Document";
    this._template.setAttribute("id", "cradova-screen-set");
    if (renderInParallel === true) {
      this._delegatedRoutesCount = 0;
      this._persist = false!;
    } else {
      if (typeof persist === "boolean") {
        this._persist = persist!;
      }
    }
  }

  _derive() {
    return {
      _name: this._name,
      _callBack: this._callBack,
      _deCallBack: this._deCallBack,
    };
  }
  _apply_derivation(derivation: {
    _name: string;
    _callBack:
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
    _deCallBack:
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
  }) {
    this._name = derivation._name;
    this._callBack = derivation._callBack;
    this._deCallBack = derivation._deCallBack;
  }

  get _delegatedRoutes() {
    if (this._delegatedRoutesCount > 100) {
      return -1;
    }
    return this._delegatedRoutesCount;
  }

  set _delegatedRoutes(count: number) {
    if (count) {
      this._delegatedRoutesCount += 1;
    }
  }

  setErrorHandler(errorHandler: (err: unknown) => void) {
    this._errorHandler = errorHandler;
  }

  async _package() {
    SNRU.memo_SNRU();
    if (typeof this._html === "function") {
      let html = await this._html.apply(this);
      if (typeof html === "function") {
        html = (html as () => any)();
        if (html instanceof HTMLElement || html instanceof DocumentFragment) {
          this._template.innerHTML = "";
          this._template.appendChild(html);
        }
      } else {
        if (html instanceof HTMLElement || html instanceof DocumentFragment) {
          this._template.innerHTML = "";
          this._template.appendChild(html);
        } else {
          throw new Error(
            ` ✘  Cradova err:  template function for the screen with name '${this._name}' returned ${html} instead of html`
          );
        }
      }
    }
  }
  onActivate(cb: () => Promise<void> | void) {
    this._callBack = cb;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this._deCallBack = cb;
  }
  async _deActivate() {
    this._deCallBack && (await this._deCallBack(localTree.globalTree["doc"]));
  }
  drop(state?: boolean) {
    if (typeof state === "boolean") {
      this._dropped = state;
      return undefined;
    } else return this._dropped;
  }
  async _Activate(force: boolean = false) {
    // check if the screen is dropped
    if (this._dropped) {
      history.go(-1);
      return;
    }
    // packaging the screen dom
    // ? tell all active Refs to re-render
    CradovaEvent.dispatchActiveEvent("active-Refs");
    if (!this._persist || force || !this._packed) {
      await this._package();
      this._packed = true;
    }
    document.title = this._name;
    localTree.globalTree["doc"].innerHTML = "";
    localTree.globalTree["doc"].appendChild(this._template as Node);
    CradovaEvent.dispatchEvent("onmountEvent");
    // CradovaEvent.dispatchActiveEvent("onmountEvent");

    window.scrollTo({
      top: 0,
      left: 0,
      // @ts-ignore
      behavior: "instant",
    });
    this._callBack && (await this._callBack(localTree.globalTree["doc"]));
  }
}

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

class RouterBoxClass {
  lastNavigatedRouteController?: Screen;
  nextRouteController?: Screen;
  lastNavigatedRoute?: string;
  pageShow = null;
  pageHide = null;
  errorHandler?: Function;
  loadingScreen: any = null;
  params: any = {};
  routes: Record<string, Screen | (() => Promise<Screen | undefined>)> = {};
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

  route(path: string, screen: Screen) {
    // undefined is an option  here for auth routes
    if (typeof screen !== "undefined") {
      if (screen && !screen) {
        console.error(" ✘  Cradova err:  not a valid screen  ", screen);
        throw new Error(
          " ✘  Cradova err:  Not a valid cradova screen component"
        );
      }
      return (this.routes[path] = screen);
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
    let url = window.location.pathname,
      route: Screen,
      params;
    // ? abort navigation when router is paused
    if (this.paused) {
      window.location.hash = "paused";
      return;
    }
    //? abort unneeded navigation
    if (url === this.lastNavigatedRoute) {
      return;
    }
    if (this.nextRouteController) {
      route = this.nextRouteController;
      this.nextRouteController = undefined;
    } else {
      [route, params] = this.checker(url) as [Screen, any];
    }

    if (typeof route !== "undefined") {
      // we need to caught any error and propagate to the app
      try {
        // lazy loaded screens
        if (typeof route === "function") {
          if (this.loadingScreen instanceof Screen) {
            await this.loadingScreen._Activate();
          }
          route = await (route as Function)();
          // ! bad operation let's drop it
          if (!route) {
            if (this.lastNavigatedRoute) {
              history.pushState({}, url, this.lastNavigatedRoute);
            }
            return;
          }
        }
        //? delegation causing parallel rendering sequence
        if (route!._delegatedRoutes !== -1) {
          route!._delegatedRoutes = 1;
          const a = route._derive();
          route = new Screen({
            template: route!._html as any,
          });
          route._apply_derivation(a);
          this.routes[url] = route;
        }
        if (params) {
          this.params.params = params;
        }
        await route!._Activate(_force);
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
              " ✘  Cradova err:  consider adding error boundary to the specific screen  "
            );
          }
        }
      }
    } else {
      // or 404
      if (this.routes["*"]) {
        await (this.routes["*"] as Screen)._Activate(_force);
      }
    }
  }

  // checker = (method: methods, url: string) => {
  //   const routes = _JetPath_paths[method];
  //   if (url[0] !== "/") {
  //     url = url.slice(url.indexOf("/", 7));
  //   }
  //   if (routes[url]) {
  //     return routes[url];
  //   }
  //   if (typeof routes === "function") {
  //     (routes as Function)();
  //     return;
  //   }
  //   //? check for extra / in the route
  //   if (routes[url + "/"]) {
  //     return routes[url];
  //   }
  //   //? check for search in the route
  //   if (url.includes("/?")) {
  //     const sraw = [...new URLSearchParams(url).entries()];
  //     const search: Record<string, string> = {};
  //     for (const idx in sraw) {
  //       search[
  //         sraw[idx][0].includes("?") ? sraw[idx][0].split("?")[1] : sraw[idx][0]
  //       ] = sraw[idx][1];
  //     }
  //     return [routes[url.split("/?")[0] + "/?"], , search];
  //   }

  //   //? place holder & * route checks
  //   for (const path in routes) {
  //     // ? placeholder check
  //     if (path.includes(":")) {
  //       const urlFixtures = url.split("/");
  //       const pathFixtures = path.split("/");
  //       //? check for extra / in the route by normalize before checking
  //       if (url.endsWith("/")) {
  //         urlFixtures.pop();
  //       }
  //       let fixturesX = 0;
  //       let fixturesY = 0;
  //       //? length check of / (backslash)
  //       if (pathFixtures.length === urlFixtures.length) {
  //         for (let i = 0; i < pathFixtures.length; i++) {
  //           //? let's jump place holders in the path since we can't determine from them
  //           //? we increment that we skipped a position because we need the count later
  //           if (pathFixtures[i].includes(":")) {
  //             fixturesY++;
  //             continue;
  //           }
  //           //? if it is part of the path then let increment a value for it
  //           //? we will need it later
  //           if (urlFixtures[i] === pathFixtures[i]) {
  //             fixturesX++;
  //           }
  //         }
  //         //? if after the checks it all our count are equal then we got it correctly
  //         if (fixturesX + fixturesY === pathFixtures.length) {
  //           const routesParams: Record<string, string> = {};
  //           for (let i = 0; i < pathFixtures.length; i++) {
  //             if (pathFixtures[i].includes(":")) {
  //               routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
  //             }
  //           }
  //           return [routes[path], routesParams];
  //         }
  //       }
  //     }
  //     // ? * check
  //     if (path.includes("*")) {
  //       const p = path.slice(0, -1);
  //       if (url.startsWith(p)) {
  //         return [routes[path], { extraPath: url.slice(p.length) }];
  //       }
  //     }
  //   }
  //   return;
  // };

  checker(url: string): [Screen | (() => Promise<Screen | undefined>), any] {
    // first strict check
    if (this.routes[url]) {
      return [this.routes[url], { path: url }];
    }
    // check for extra / in the route
    if (this.routes[url + "/"]) {
      return [this.routes[url], { path: url }];
    }
    // place holder route check
    for (const path in this.routes) {
      if (!path.includes(":")) {
        continue;
      }
      // if (url.endsWith("/")) {
      //   url = url.slice(0, path.length - 2);
      // }
      const urlFixtures = url.split("/");
      const pathFixtures = path.split("/");
      // check for extra / in the route by normalize before checking
      if (url.endsWith("/")) {
        urlFixtures.pop();
      }
      let fixturesX = 0;
      let fixturesY = 0;
      // remove empty string after split operation
      urlFixtures.shift();
      pathFixtures.shift();
      // length check of / (backslash)
      if (pathFixtures.length === urlFixtures.length) {
        const routesParams = { _path: "" } as Record<string, string>;
        for (let i = 0; i < pathFixtures.length; i++) {
          // let's jump place holders in the path since we can't determine from them
          // we increment that we skipped a position because we need the count later
          if (pathFixtures[i].includes(":")) {
            fixturesY++;
            // fixturesY += 1;
            continue;
          }
          // if it is part of the path then let increment a value for it
          // we will need it later
          if (
            urlFixtures[i] === pathFixtures[i]
            // &&
            // pathFixtures.indexOf(urlFixtures[i]) ===
            //   pathFixtures.lastIndexOf(urlFixtures[i])
          ) {
            // fixturesX+=1;
            fixturesX++;
          }
        }
        // if after the checks it all our count are equal then we got it correctly
        if (fixturesX + fixturesY === pathFixtures.length) {
          for (let i = 0; i < pathFixtures.length; i++) {
            if (pathFixtures[i].includes(":")) {
              routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
            }
          }
          routesParams["_path"] = path;
          return [this.routes[path], routesParams];
        }
      }
    }
    return [] as unknown as [Screen, any];
  }
}

const RouterBox = new RouterBoxClass();

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param  screen the cradova document tree for the route.
 */

export class Router {
  /**
   * cradova router
   * ---
   * Registers a route.
   *
   * accepts an object containing pat and screen
   */
  static BrowserRoutes(obj: Record<string, any>) {
    for (const path in obj) {
      let screen = obj[path];
      if (
        (typeof screen === "object" && typeof screen.then === "function") ||
        typeof screen === "function"
      ) {
        // creating the lazy
        RouterBox.routes[path] = async () => {
          screen = await (typeof screen === "function"
            ? await screen()
            : await screen);
          return RouterBox.route(path, screen?.default || screen);
        };
      } else {
        RouterBox.route(path, screen);
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
   * Navigates to a designated screen in your app
   *
   * @param href string
   * @param data object
   * @param force boolean
   */
  static navigate(
    href: string,
    data: Record<string, unknown> | null = null,
    force = false
  ) {
    if (typeof href !== "string") {
      throw new TypeError(
        " ✘  Cradova err:  href must be a defined path but got " +
          href +
          " instead"
      );
    }
    let route = null,
      params;
    if (href.includes("://")) {
      window.location.href = href;
    } else {
      if (href === window.location.pathname) {
        return;
      }
      [route, params] = RouterBox.checker(href);
      if (route) {
        RouterBox.nextRouteController = route as Screen;
        window.history.pushState({}, "", href);
      }
      RouterBox.params.params = params;
      RouterBox.params.data = data;
      RouterBox.router(null, force);
    }
  }

  /**
   * Cradova
   * ---
   * Loading screen for your app
   *
   * lazy loaded loading use
   *
   * @param screen
   */
  static setLoadingScreen(screen: Screen) {
    if (screen instanceof Screen) {
      RouterBox.loadingScreen = screen;
    } else {
      throw new Error(
        " ✘  Cradova err:  Loading Screen should be a cradova screen class"
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

  /** cradova router
   * ---
   * get a screen ready before time.
   *
   * @param {string}   path Route path.
   * @param  data data for the screen.
   */
  static async packageScreen(path: string) {
    if (!RouterBox.routes[path]) {
      console.error(" ✘  Cradova err:  no screen with path " + path);
      throw new Error(
        " ✘  Cradova err:  cradova err: Not a defined screen path"
      );
    }
    let [route] = RouterBox.checker(path);
    if (typeof route === "function") {
      route = (await route()) as Screen;
    }

    //? delegation causing parallel rendering sequence
    if (route!._delegatedRoutes !== -1) {
      route!._delegatedRoutes = 1;
      const a = route._derive();
      route = new Screen({
        template: route!._html as any,
      });
      route._apply_derivation(a);
      RouterBox.routes[path] = route;
    }
    // handled asynchronously
    route._package();
    route._packed = true;
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
    let doc = document.querySelector("[data-wrapper=app]");
    if (!doc) {
      doc = document.createElement("div");
      doc.setAttribute("data-wrapper", "app");
      document.body.appendChild(doc);
      localTree._appendDomForceGlobal("doc", doc as HTMLElement);
    } else {
      localTree._appendDomForceGlobal("doc", doc as HTMLElement);
    }
    window.addEventListener("pageshow", () => RouterBox.router());
    window.addEventListener("popstate", (_e) => {
      _e.preventDefault();
      RouterBox.router();
    });
  }
}
