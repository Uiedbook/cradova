import { RouterType, RouterRouteObject } from "../types.js";

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

export const Router: RouterType = {};
const RouterBox: RouterType = {};

RouterBox["lastNavigatedRouteController"] = null;
RouterBox["nextRouteController"] = null;
RouterBox["lastNavigatedRoute"] = null;
RouterBox["pageShow"] = null;
RouterBox["pageHide"] = null;
RouterBox["params"] = {};
RouterBox["routes"] = {};

/**
 *
 * @param url
 * @returns
 */

const checker = (
  url: string
): [RouterRouteObject, Record<string, any> | null] | [] => {
  // first strict check
  if (RouterBox.routes[url]) {
    return [RouterBox.routes[url], null];
  }
  // place holder check
  for (const path in RouterBox.routes) {
    if (!path.includes(":")) {
      continue;
    }
    //
    const urlFixtures = url.split("/");
    const pathFixtures = path.split("/");
    // length check
    if (pathFixtures.length === urlFixtures.length) {
      urlFixtures.shift();
      pathFixtures.shift();
      let isIt = true;
      const routesParams: Record<string, any> = {};
      for (let i = 0; i < pathFixtures.length; i++) {
        // loosely item checking by N indexes & includes
        // FIXME: may be problematic but works faster than any other solutions
        // NO regex :)
        // this is faster and better
        if (
          !pathFixtures[i].includes(":") &&
          path.includes(urlFixtures[i] + "/") &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          if (!isIt) isIt = true;
        } else {
          if (pathFixtures[i].includes(":")) {
            continue;
          }
          isIt = false;
        }

        if (
          !(
            pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
          )
        ) {
          throw new Error(
            " ✘  Cradova err:  cradova router doesn't allow paths with multiple names"
          );
        }
      }
      if (isIt) {
        for (let i = 0; i < pathFixtures.length; i++) {
          if (pathFixtures[i].includes(":")) {
            routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
          }
        }
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};
/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param {any} screen the cradova document tree for the route.
 */
Router.route = function (path = "/", screen: any) {
  if (!screen.Activate && screen.name) {
    console.error(" ✘  Cradova err:  not a valid screen  " + screen);
    throw new Error(" ✘  Cradova err:  Not a valid cradova screen component");
  }
  RouterBox.routes[path] = {
    controller: (params: any, force?: boolean) =>
      screen.Activate(params, force),
    packager: async (params: any) => await screen.package(params),
    deactivate: () => {
      screen.deActivate();
    },
  };
};

/**
 * Cradova Router
 * ------
 *
 * Navigates to a designated screen in your app
 */
Router.navigate = function (
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
    params,
    link = null;
  if (href.includes("://")) {
    window.location.href = href;
  } else {
    if (href === window.location.pathname) {
      return;
    }
    [route, params] = checker(href);
    if (route) {
      RouterBox["nextRouteController"] = route;
      RouterBox.params.params = params || null;
      RouterBox.params.data = data || null;
      link = href;
      RouterBox["pageHide"] && RouterBox["pageHide"](href + " :navigated");
      window.history.pushState({}, "", link);
      (async () => {
        await RouterBox.router(null, force);
      })();
    }
  }
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
  let Alink, url, route, params;
  if (e && e.target.tagName) {
    Alink = e.target;
    if (Alink && Alink.href.includes("#")) {
      return;
    }
    if (Alink && Alink.href.includes("javascript")) {
      return;
    }
    e.preventDefault();
    if (Alink) {
      url = new URL(Alink.href).pathname;
    }
  }
  if (!url) {
    url = window.location.pathname;
  }
  if (url === Router["lastNavigatedRoute"]) {
    return;
  }

  if (RouterBox["nextRouteController"]) {
    route = RouterBox["nextRouteController"];
    RouterBox["nextRouteController"] = null;
    params = RouterBox.params.params;
  } else {
    [route, params] = checker(url);
  }
  if (route) {
    RouterBox.params.event = e;
    RouterBox.params.params = params || RouterBox.params.params || null;
    RouterBox.params.data = RouterBox.params.data || null;
    RouterBox["lastNavigatedRouteController"] &&
      RouterBox["lastNavigatedRouteController"].deactivate();
    await route.controller(force);
    RouterBox["pageShow"] && RouterBox["pageShow"](url);
    RouterBox["lastNavigatedRoute"] = url;
    RouterBox["lastNavigatedRouteController"] = route;
    // click handlers
    Array.from(window.document.querySelectorAll("a")).forEach((a) => {
      if (a.href.includes(window.location.origin)) {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          Router.navigate(a.pathname);
        });
      }
    });
  } else {
    // or 404
    if (RouterBox.routes["/404"]) {
      RouterBox.routes["/404"].controller(RouterBox.params);
    } else {
      // or error
      console.error(
        " ✘  Cradova err: route '" +
          url +
          "' does not exist and no '/404' route given!"
      );
    }
  }
};

Router["onPageShow"] =
  /**
   * @param {Event} callback Click event.
   */
  function (callback: () => void) {
    if (typeof callback === "function") {
      RouterBox["pageShow"] = callback;
    } else {
      throw new Error(
        " ✘  Cradova err:  callback for pageShow event is not a function"
      );
    }
  };
Router["onPageHide"] = function (callback: () => void) {
  if (typeof callback === "function") {
    RouterBox["pageHide"] = callback;
  } else {
    throw new Error(
      " ✘  Cradova err:  callback for pageHide event is not a function"
    );
  }
};
/** cradova router
 * ---
 * get a screen ready before time.
 *
 * @param {string}   path     Route path.
 * @param {any} data data for the screen.
 */
Router.packageScreen = async function (path: string, data: any) {
  if (!RouterBox.routes[path]) {
    console.error(" ✘  Cradova err:  no screen with path " + path);
    throw new Error(" ✘  Cradova err:  cradova err: Not a defined screen path");
  }
  await RouterBox.routes[path].packager(data);
};

/**
 * Cradova Router
 * ------
 *
 * return last set router params
 *
 * .
 */

Router.getParams = function () {
  return RouterBox["params"];
};
window.addEventListener("pageshow", RouterBox.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault();
  RouterBox.router(e);
});
