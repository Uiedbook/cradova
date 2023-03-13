import _ from "../index.js";
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
        routesParams.path = path;
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
    console.error(" ✘  Cradova err:  not a valid screen  ", screen);
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
  let url, route, params;
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
      RouterBox["lastNavigatedRouteController"] &&
        RouterBox["lastNavigatedRouteController"].deactivate();
      await route.controller(force);
      RouterBox["lastNavigatedRoute"] = url;
      RouterBox["lastNavigatedRouteController"] = route;
      RouterBox["pageShow"] && RouterBox["pageShow"](url);
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
        RouterBox.errorHandler["all"] ||
        RouterBox.errorHandler[RouterBox.params.params.path];
      if (errorHandler) {
        errorHandler(error);
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

// if (globalThis.document) {
window.addEventListener("pageshow", RouterBox.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault();
  RouterBox.router();
});
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
