import _, { Screen as _cradovaScreen } from "../index.js";
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
RouterBox["errorHandler"] = null;
RouterBox["params"] = {};
RouterBox["routes"] = {};

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
        //        console.log(
        //          urlFixtures[i],
        //          pathFixtures[i],
        //          urlFixtures[i] === pathFixtures[i]
        //        );
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

/** cradova router
 * ---
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param {any} screen the cradova document tree for the route.
 */

Router.BrowserRoutes = function (obj: Record<string, any>) {
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
      // one of this needs to be removed
      route._paramData = params;
      RouterBox.params.data = data || null;
      //
      link = href;
      RouterBox["pageHide"] && RouterBox["pageHide"](href + " :navigated");
      window.history.pushState({}, "", link);
    }
    RouterBox.router(null, force);
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
  if (url === Router["lastNavigatedRoute"]) {
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
      RouterBox["pageShow"] && RouterBox["pageShow"](url);
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
Router.packageScreen = async function (path: string, data: any = {}) {
  if (!RouterBox.routes[path]) {
    console.error(" ✘  Cradova err:  no screen with path " + path);
    throw new Error(" ✘  Cradova err:  cradova err: Not a defined screen path");
  }
  let [route, params] = checker(path);
  if (!route._Activate && typeof route === "function") {
    // @ts-ignore
    route = (await route()) as any;
  }
  // handled asynchronously
  route._package(Object.assign(data, params || {}));
  route._packed = true;
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

Router["addErrorHandler"] = function (callback: () => void) {
  if (typeof callback === "function") {
    RouterBox["errorHandler"] = callback;
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
