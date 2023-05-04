import _, { Screen as _cradovaScreen } from "../index.js";
import { RouterRouteObject } from "../types.js";

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

const RouterBox: Record<string, any> = {};

RouterBox["lastNavigatedRouteController"] = null;
RouterBox["nextRouteController"] = null;
RouterBox["lastNavigatedRoute"] = null;
RouterBox["pageShow"] = null;
RouterBox["pageHide"] = null;
RouterBox["errorHandler"] = null;
RouterBox["params"] = {};
RouterBox["routes"] = {};
RouterBox["pageevents"] = [];

RouterBox["start_pageevents"] = function (lastR: string, newR: string) {
  for (let ci = 0; ci < RouterBox["pageevents"].length; ci++) {
    RouterBox["pageevents"][ci](lastR, newR);
  }
};

/**
 *
 * @param url
 * @returns
 */

const checker = (url: string) => {
  // first strict check
  if (RouterBox.routes[url]) {
    return [RouterBox.routes[url], { path: url }];
  }
  // check for extra / in the route
  if (RouterBox.routes[url + "/"]) {
    return [RouterBox.routes[url], { path: url }];
  }
  // place holder route check
  for (const path in RouterBox.routes) {
    if (!path.includes(":")) {
      continue;
    }
    // check for extra / in the route by normalize before checking
    if (url.endsWith("/")) {
      url = url.slice(0, path.length - 2);
    }
    const urlFixtures = url.split("/");
    const pathFixtures = path.split("/");
    let fixturesX = 0;
    let fixturesY = 0;
    // remove empty string after split operation
    urlFixtures.shift();
    pathFixtures.shift();
    // length check of / (backslash)
    if (pathFixtures.length === urlFixtures.length) {
      const routesParams = { _path: "" };
      for (let i = 0; i < pathFixtures.length; i++) {
        // let's jump place holders in the path since we can't determine from them
        // we increment that we skipped a position because we need later
        if (pathFixtures[i].includes(":")) {
          fixturesY += 1;
          continue;
        }
        // if this is part of the path then let increment a value for it
        // we will need it later
        if (
          urlFixtures[i] === pathFixtures[i] &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          fixturesX += 1;
        }
      }
      // if after the checks it all our count are equal then we got it correctly
      if (fixturesX + fixturesY === pathFixtures.length) {
        for (let i = 0; i < pathFixtures.length; i++) {
          if (pathFixtures[i].includes(":")) {
            // @ts-ignore
            routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
          }
        }
        routesParams._path = path;
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};

RouterBox.route = (path: string, screen: any) => {
  if (!screen || !screen._Activate) {
    console.error(" ✘  Cradova err:  not a valid screen  ", screen);
    throw new Error(" ✘  Cradova err:  Not a valid cradova screen component");
  }
  RouterBox.routes[path] = screen;
  return RouterBox.routes[path];
};

/**
 * Cradova Router
 * ----
 * * The whole magic happens here
 * -
 * Responds to click events anywhere in the document and when
 * the click happens on a link that is supposed to be handled
 * by the router, it loads and displays the target page.
 * * Responds to popstate and load events and does it's job
 * @param {Event} e Click event | popstate event | load event.
 */

RouterBox.router = async function (e: any, force = false) {
  let url, route: RouterRouteObject | undefined, params;
  if (e) {
    const Alink = e.target.tagName === "A" && e.target;
    if (Alink) {
      if (Alink.href.includes("#")) {
        const l = Alink.href.split("#");
        document.getElementById("#" + l[l.length - 1])?.scrollIntoView();
        return;
      }
      if (Alink.href.includes("javascript")) {
        return;
      }
      e.preventDefault();
      url = new URL(Alink.href).pathname;
    }
  }
  if (!url) {
    url = window.location.pathname;
  }
  if (url === RouterBox["lastNavigatedRoute"]) {
    return;
  }
  if (RouterBox["nextRouteController"]) {
    route = RouterBox["nextRouteController"];
    RouterBox["nextRouteController"] = null;
  } else {
    [route, params] = checker(url);
  }

  if (typeof route !== "undefined") {
    try {
      if (params) {
        RouterBox.params.params = params;
      }
      if (!route._Activate && typeof route === "function") {
        // @ts-ignore
        route = (await route()) as any;
      }
      // delegation
      if (route!._delegatedRoutes !== -1 && route!._delegatedRoutes !== 1) {
        route!._delegatedRoutes = true;
        route = new _cradovaScreen({
          name: route!._name,
          template: route!._html,
        }) as any;
        RouterBox.routes[url] = route;
      }
      await route!._Activate(force);
      RouterBox["lastNavigatedRouteController"] &&
        RouterBox["lastNavigatedRouteController"]._deActivate();
      RouterBox["lastNavigatedRoute"] = url;
      RouterBox["lastNavigatedRouteController"] = route;
    } catch (error) {
      let errorHandler;
      if (RouterBox.routes[RouterBox.params.params._path]) {
        errorHandler =
          RouterBox.routes[RouterBox.params.params._path].errorHandler ||
          RouterBox.errorHandler;
      }
      if (errorHandler) {
        errorHandler(error);
      }
    }
  } else {
    // or 404
    if (RouterBox.routes["/404"]) {
      RouterBox.routes["/404"].controller();
    }
  }
};

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param {any} screen the cradova document tree for the route.
 */

class RouterClass {
  /** cradova router
   * ---
   * Registers a route.
   *
   * accepts an object containing
   *
   * @param {string}   path     Route path.
   * @param {any} screen the cradova screen.
   */
  BrowserRoutes(obj: Record<string, any>) {
    for (const path in obj) {
      let screen = obj[path];
      if (screen.catch || typeof screen === "function") {
        RouterBox["routes"][path] = async () => {
          if (typeof screen === "function") {
            screen = await screen();
          } else {
            screen = await screen;
          }
          return RouterBox.route(path, screen.default);
        };
      } else {
        RouterBox.route(path, screen);
      }
    }
    this._mount();
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
  navigate(
    href: string,
    data: Record<string, any> | null = null,
    force = false
  ) {
    if (typeof href !== "string") {
      throw new TypeError(
        " ✘  Cradova err:  href must be a defined path but got " +
          href +
          " instead"
      );
    }
    if (typeof data === "boolean") {
      force = true;
      data = null;
    }
    let route = null,
      params;
    if (href.includes("://")) {
      window.location.href = href;
    } else {
      const lastR = window.location.pathname;
      if (href === lastR) {
        return;
      }
      [route, params] = checker(href);
      if (route) {
        RouterBox["nextRouteController"] = route;
        RouterBox.params.params = params;
        // one of this needs to be removed
        route._paramData = params;
        RouterBox.params.data = data || null;
        window.history.pushState({}, "", href);
      }
      RouterBox.router(null, force);
      RouterBox["start_pageevents"](lastR, href);
    }
  }

  /** cradova router
   * ---
   * Listen for navigation events
   *
   * @param callback   () => void
   */
  onPageEvent(callback: () => void) {
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
   * @param {any} data data for the screen.
   */
  async packageScreen(path: string, data: any = {}) {
    if (!RouterBox.routes[path]) {
      console.error(" ✘  Cradova err:  no screen with path " + path);
      throw new Error(
        " ✘  Cradova err:  cradova err: Not a defined screen path"
      );
    }
    let [route, params] = checker(path);
    if (!route._Activate && typeof route === "function") {
      // @ts-ignore
      route = (await route()) as any;
    }
    // handled asynchronously
    route._package(Object.assign(data, params || {}));
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

  getParams = function () {
    return RouterBox["params"];
  };

  /**
   * Cradova
   * ---
   * Error Handler for your app
   *
   * @param callback
   * @param path? page path
   */

  addErrorHandler(callback: () => void) {
    if (typeof callback === "function") {
      RouterBox["errorHandler"] = callback;
    } else {
      throw new Error(
        " ✘  Cradova err:  callback for ever event event is not a function"
      );
    }
  }

  _mount() {
    window.addEventListener("pageshow", RouterBox.router);
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      RouterBox.router();
    });
  }
}

export const Router = new RouterClass();
