/*! *****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import _, { Screen as _cradovaScreen } from "./index.js";
import { RouterRouteObject } from "./types.js";
import { localTree } from "./Screen.js";

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
RouterBox["loadingScreen"] = null;
RouterBox["params"] = {};
RouterBox["routes"] = {};
RouterBox["pageevents"] = [];
// tarcking paused state of navigation
RouterBox["paused"] = false;

RouterBox["start_pageevents"] = async function (url: string) {
  setTimeout(() => {
    for (let ci = 0; ci < RouterBox["pageevents"].length; ci++) {
      RouterBox["pageevents"][ci](url);
    }
    // always starts events a moment later
  }, 100);
};

/**
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
        routesParams._path = path;
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};

RouterBox.route = (path: string, screen: _cradovaScreen) => {
  // undefined is an option  here for auth routes
  if (typeof screen !== "undefined") {
    if (screen && !screen._Activate) {
      console.error(" ✘  Cradova err:  not a valid screen  ", screen);
      throw new Error(" ✘  Cradova err:  Not a valid cradova screen component");
    }
    return (RouterBox.routes[path] = screen);
  }
  return undefined;
};

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

RouterBox.router = async function (
  _e: { preventDefault: () => void },
  _force: boolean
) {
  let url = window.location.pathname,
    route: RouterRouteObject | undefined,
    params;
  // ? abort navigation when router is paused
  if (RouterBox["paused"]) {
    window.location.hash = "paused";
    return;
  }
  //? abort unneeded navigation
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
    // we need to caught any error and propagate to the app
    try {
      // lazy loaded screens
      if (typeof route === "function") {
        if (
          RouterBox["LoadingScreen"] &&
          RouterBox["LoadingScreen"]._Activate
        ) {
          await (RouterBox["LoadingScreen"] as _cradovaScreen)._Activate();
        }
        route = await (route as Function)();
        // ! bad operation let's drop it
        if (!route) {
          if (RouterBox["lastNavigatedRoute"]) {
            history.pushState({}, url, RouterBox["lastNavigatedRoute"]);
          }
          return;
        }
      }
      //? delegation causing parallel rendering sequence
      if (route!._delegatedRoutes !== -1) {
        route!._delegatedRoutes = true;
        const a = route._derive();
        route = new _cradovaScreen({
          template: route!._html,
        });
        route._apply_derivation(a);
        RouterBox.routes[url] = route;
      }
      if (params) {
        RouterBox.params.params = params;
      }
      await route!._Activate(_force);
      RouterBox["start_pageevents"](url);
      RouterBox["lastNavigatedRouteController"] &&
        RouterBox["lastNavigatedRouteController"]._deActivate();
      RouterBox["lastNavigatedRoute"] = url;
      RouterBox["lastNavigatedRouteController"] = route;
    } catch (error) {
      if (route && route["_errorHandler"]) {
        route._errorHandler(error);
      } else {
        if (RouterBox["errorHandler"]) {
          RouterBox["errorHandler"](error);
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
    if (RouterBox.routes["*"]) {
      await RouterBox.routes["*"]!._Activate(_force);
    }
  }
};

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param  screen the cradova document tree for the route.
 */

export class Router {
  /** cradova router
   * ---
   * Registers a route.
   *
   * accepts an object containing
   *
   * @param {string}   path     Route path.
   * @param  screen the cradova screen.
   */

  static BrowserRoutes(obj: Record<string, any>) {
    for (const path in obj) {
      let screen = obj[path];
      if (
        (typeof screen === "object" && typeof screen.then === "function") ||
        typeof screen === "function"
      ) {
        // creating the lazy
        RouterBox["routes"][path] = async () => {
          screen = await (typeof screen === "function"
            ? await screen()
            : await screen);
          // const s = await screen;
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
      [route, params] = checker(href);
      if (route) {
        RouterBox["nextRouteController"] = route;
        window.history.pushState({}, "", href);
      }
      RouterBox.params.params = params;
      RouterBox.params.data = data;
      RouterBox.router(null, force);
    }
  }
  /**
   * Cradova Router
   * ------
   *
   * Navigates to a designated screen in your app by loading a seperate page;
   *
   * @param pathname string
   */
  static navigateNauturally(pathname: string) {
    if (typeof pathname !== "string") {
      throw new TypeError(
        " ✘  Cradova err:  pathname must be a defined path but got " +
          pathname +
          " instead"
      );
    }
    window.location.pathname = pathname;
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
  static setLoadingScreen(screen: _cradovaScreen) {
    if (screen instanceof _cradovaScreen) {
      RouterBox["LoadingScreen"] = screen;
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
  static async packageScreen(path: string, data: Record<string, unknown> = {}) {
    if (!RouterBox.routes[path]) {
      console.error(" ✘  Cradova err:  no screen with path " + path);
      throw new Error(
        " ✘  Cradova err:  cradova err: Not a defined screen path"
      );
    }
    let [route, params] = checker(path);
    if (!route._Activate && typeof route === "function") {
      route = await route();
    }
    // delegation causing parallel rendering sequence
    if (route!._delegatedRoutes !== -1) {
      route!._delegatedRoutes = true;
      route = new _cradovaScreen({
        name: route!._name,
        template: route!._html,
      });
      RouterBox.routes[path] = route;
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

  static getParams() {
    return RouterBox["params"];
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
    window.addEventListener("pageshow", RouterBox.router);
    window.addEventListener("popstate", (_e) => {
      _e.preventDefault();
      RouterBox.router();
    });
  }
}

// export const Router = new RouterClass();
