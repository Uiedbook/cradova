import { RouterType, RouterRouteObject } from "../types.js";

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

export const Router: RouterType = {};

Router["lastNavigatedRouteController"] = null;
Router["nextRouteController"] = null;
Router["lastNavigatedRoute"] = null;
Router["pageShow"] = null;
Router["pageHide"] = null;
Router["params"] = {};
Router["routes"] = {};

/**
 *
 * @param url
 * @returns
 */

const checker = (
  url: string
): [RouterRouteObject, Record<string, any> | null] | [] => {
  // first strict check
  if (Router.routes[url]) {
    return [Router.routes[url], null];
  }
  // place holder check
  for (const path in Router.routes) {
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
        return [Router.routes[path], routesParams];
      }
    }
  }
  return [];
};
/**
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
  Router.routes[path] = {
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
  if (typeof data === "boolean") {
    force = true;
    data = null;
  }
  if (typeof href !== "string") {
    throw new TypeError(
      " ✘  Cradova err:  href must be a defined path but got " +
        href +
        " instead"
    );
  }
  let route = null,
    params,
    link = null;
  if (href.includes(".")) {
    window.location.href = href;
  } else {
    if (href === window.location.pathname) {
      return;
    }
    [route, params] = checker(href);
    if (route) {
      Router["nextRouteController"] = route;
      Router.params.params = params || null;
      Router.params.data = data || null;
      link = href;
      Router["pageHide"] && Router["pageHide"](href + " :navigated");
      window.history.pushState({}, "", link);
      setTimeout(async () => {
        // INFO: this fixed a bug but isn't necessary
        await Router.router(null, force);
      }, 0);
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
Router.router = async function (e: any, force = false) {
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

  if (Router["nextRouteController"]) {
    route = Router["nextRouteController"];
    Router["nextRouteController"] = null;
    params = Router.params.params;
  } else {
    [route, params] = checker(url);
  }
  if (route) {
    Router.params.event = e;
    Router.params.params = params || null;
    Router.params.data = Router.params.data || null;
    Router["lastNavigatedRouteController"] &&
      Router["lastNavigatedRouteController"].deactivate();
    await route.controller(Router.params, force);
    Router["pageShow"] && Router["pageShow"](url);
    Router["lastNavigatedRoute"] = url;
    Router["lastNavigatedRouteController"] = route;
    // click handlers
    Array.from(window.document.querySelectorAll("a")).forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        Router.navigate(a.pathname);
      });
    });
  } else {
    // or 404
    if (Router.routes["/404"]) {
      Router.routes["/404"].controller(Router.params);
    } else {
      // or error
      console.error(
        " ✘  Cradova err: route '" +
          url +
          "' does not exist and no /404 route given!"
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
      Router["pageShow"] = callback;
    } else {
      throw new Error(
        " ✘  Cradova err:  callback for pageShow event is not a function"
      );
    }
  };
Router["onPageHide"] = function (callback: () => void) {
  if (typeof callback === "function") {
    Router["pageHide"] = callback;
  } else {
    throw new Error(
      " ✘  Cradova err:  callback for pageHide event is not a function"
    );
  }
};
/**
 * get a screen ready before time.
 *
 * @param {string}   path     Route path.
 * @param {any} data data for the screen.
 */
Router.packageScreen = async function (path: string, data: any) {
  if (!Router.routes[path]) {
    console.error(" ✘  Cradova err:  no screen with path " + path);
    throw new Error(" ✘  Cradova err:  cradova err: Not a defined screen path");
  }
  await Router.routes[path].packager(data);
};
window.addEventListener("pageshow", Router.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault();
  Router.router(e);
});
