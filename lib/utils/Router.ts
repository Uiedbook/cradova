import _, { Screen as _screen } from "../index.js";
import { RouterRouteObject } from "../types.js";

/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

export const Router: Record<string, any> = {};
const RouterBox: Record<string, any> = {};

RouterBox["lastNavigatedRouteController"] = null;
RouterBox["nextRouteController"] = null;
RouterBox["lastNavigatedRoute"] = null;
RouterBox["pageShow"] = null;
RouterBox["pageHide"] = null;
RouterBox["errorHandler"] = {};
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
    // remove empty string after split operation
    urlFixtures.shift();
    pathFixtures.shift();
    // length check of / (backslash)
    if (pathFixtures.length === urlFixtures.length) {
      let isIt = false;
      const routesParams: Record<string, any> = {};
      for (let i = 0; i < pathFixtures.length; i++) {
        if (
          path.includes(urlFixtures[i] + "/") &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          //! not pure but effective
          //! fail safe XD
          if (!isIt) isIt = true;
        }
      }
      if (isIt) {
        for (let i = 0; i < pathFixtures.length; i++) {
          if (pathFixtures[i].includes(":")) {
            routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
          }
        }
        routesParams.path = path;
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};

RouterBox.loadRoute = (path: string, screen: any) => {
  if (!screen || !screen.Activate) {
    console.error(" ✘  Cradova err:  not a valid screen  ", screen);
    throw new Error(" ✘  Cradova err:  Not a valid cradova screen component");
  }
  RouterBox.routes[path] = {
    controller: async (params: any, force?: boolean) =>
      await screen.Activate(params, force),
    packager: async (params: any) => await screen.package(params),
    deactivate: async () => {
      await screen.deActivate();
    },
    delegatedRoutes: (data: any) => {
      screen.delegatedRoutes = data;
    },
    paramData: (data: any) => {
      screen.paramData = data;
    },
    delegate: screen.delegatedRoutes ? screen : null,
  };
  if (typeof screen.errorHandler === "function") {
    RouterBox["errorHandler"][path] = screen.errorHandler;
  }
  return RouterBox.routes[path];
};

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param {any} screen the cradova document tree for the route.
 */
Router.route = function (path: string, screen: any) {
  if (screen.catch || typeof screen === "function") {
    RouterBox["routes"][path] = async () => {
      screen = await screen();
      // screen = await screen;
      return RouterBox.loadRoute(path, screen.default);
    };
  } else {
    RouterBox.loadRoute(path, screen);
  }
};

Router.BrowserRoutes = function (obj: Record<string, any>) {
  for (const path in obj) {
    Router.route(path, obj[path]);
  }
  Router.mount();
};

//-
Router.delegateScreen = function (path = "/", screen: any) {
  //
  // const scr = new Screen({name: "", });
  //
  RouterBox.routes[path] = {
    controller: async (params: any, force?: boolean) =>
      await screen.Activate(params, force),
    packager: async (params: any) => await screen.package(params),
    deactivate: async () => {
      await screen.deActivate();
    },
    paramData: (data: any) => {
      screen.paramData = data;
    },
  };
  if (typeof screen.errorHandler === "function") {
    RouterBox["errorHandler"][path] = screen.errorHandler;
  }
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
      RouterBox.params.params = params;
      RouterBox.params.data = data || null;
      link = href;
      RouterBox["pageHide"] && RouterBox["pageHide"](href + " :navigated");
      window.history.pushState({}, "", link);
    }
    (async () => {
      await RouterBox.router(null, force);
    })();
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
  let url, route: any, params;
  const Alink = e && e.target.tagName === "A" && e.target;
  if (Alink) {
    if (Alink.href.includes("#")) {
      return;
    }
    if (Alink.href.includes("javascript")) {
      return;
    }
    e.preventDefault();
    url = new URL(Alink.href).pathname;
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
  } else {
    [route, params] = checker(url);
  }

  if (route) {
    try {
      if (params) {
        RouterBox.params.params = params;
      }
      if (!route.controller) {
        route = await route();
        console.log("fetched for ===> ", route);
      }
      await route.controller(force);
      RouterBox["lastNavigatedRouteController"] &&
        (await RouterBox["lastNavigatedRouteController"].deactivate());
      RouterBox["lastNavigatedRoute"] = url;
      RouterBox["lastNavigatedRouteController"] = route;
      RouterBox["pageShow"] && (await RouterBox["pageShow"](url));
      // click handlers
      for (const a of document.querySelectorAll("a")) {
        if (a.href.includes(window.location.origin)) {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            Router.navigate(a.pathname);
          });
        }
      }
    } catch (error) {
      const errorHandler =
        RouterBox.errorHandler[RouterBox.params.params.path] ||
        RouterBox.errorHandler["all"];
      if (errorHandler) {
        await errorHandler(error);
      }
    }
  } else {
    // or 404
    if (RouterBox.routes["/404"]) {
      RouterBox.routes["/404"].controller();
    } else {
      if (Object.keys(RouterBox.routes).length > 0) {
        console.error(
          " ✘  Cradova err: route '" +
            url +
            "' does not exist and no '/404' route given!"
        );
      }
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
 * @param {string}   path Route path.
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

/**
 * Cradova
 * ---
 * Error Handler for your app
 *
 * @param callback
 * @param path? page path
 */

Router["addErrorHandler"] = function (callback: () => void, path?: string) {
  if (typeof callback === "function") {
    RouterBox["errorHandler"][path || "all"] = callback;
  } else {
    throw new Error(
      " ✘  Cradova err:  callback for ever event event is not a function"
    );
  }
};

Router.mount = () => {
  window.addEventListener("pageshow", RouterBox.router);
  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    RouterBox.router();
  });
};

// if (globalThis.document) {

// }

// Router.route(
//   "/",
//   new Screen({
//     name: "cradova",
//     template: () => {
//       return _(
//         ".div#bulaba",
//         {
//           shouldUpdate: true,
//           $num: "0", // data-num
//           onclick(e: any) {
//             console.log("hello world");
//           },
//         },
//         [
//           _("h1| theres no problem in Nigeria 1"),
//           _("h1| theres no problem in Nigeria 2", { style: { color: "aqua" } }),
//         ],
//         _("h1| theres no problem in Nigeria 3"),
//         _("h1| theres no problem in Nigeria 4")
//       );
//     },
//   })
// );

// @ts-ignore
// Router["serve"] = async function (option: {
//   port?: number;
//   path?: string;
//   debug?: boolean;
// }) {
//   let fileURLToPath, _dirname;
//   const { readFile } = await import("fs/promises");
//   const dr = await import("path");
//   const fp = await import("url");
//   fileURLToPath = fp.fileURLToPath;
//   _dirname = dr
//     .dirname(fileURLToPath(import.meta.url))
//     .split("node_modules")[0];
//   let html: string;
//   try {
//     html = await readFile(dr.join(_dirname, "index.html"), "utf-8");
//   } catch (error) {
//     console.log(error);
//     throw new Error("cradova err: index.html not found in serving dir");
//   }
//   if (option.port) {
//     const { createServer } = await import("http");
//     createServer(handler).listen(option.port, start_callback);
//     function start_callback() {
//       console.log(
//         "\x1B[32m Running Cradova on port " + option.port + " \x1B[39m"
//       );
//     }
//     async function handler(req: any, res: any) {
//       if (option.debug) {
//         const clientIP = req.connection.remoteAddress;
//         const connectUsing = req.connection.encrypted ? "SSL" : "HTTP";
//         console.log(
//           "Request received: " + connectUsing + " " + req.method + " " + req.url
//         );
//         console.log("Client IP: " + clientIP);
//       }
//       const [route, params] = checker(req.url);
//       console.log(route, params);
//       res.writeHead(200, "OK", { "Content-Type": "text/html" });
//       if (route) {
//         // @ts-ignore
//         res.end(await route.html());
//       } else {
//         if (RouterBox.routes["/404"]) {
//           res.end(await RouterBox.routes["/404"].html());
//         } else {
//           console.error(
//             " ✘  Cradova err: route '" +
//               req.url +
//               "' does not exist and no '/404' route given!"
//           );
//         }
//       }
//       return;
//     }
//   } else {
//     if (option.path) {
//       // const [route, params] = checker(option.path);
//       // console.log(route, params);
//       return html;
//     } else {
//       console.log(
//         "\x1B[32m Cradova did not serve! - no port or path provided \x1B[39m"
//       );
//     }
//   }
// };
// Router.serve({ port: 3000 });

// ! building the server side middleware and basic sever
// with dir detection
