var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Cradova Router
 * ---
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */
export const Router = {};
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
const checker = (url) => {
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
            let routesParams = {};
            for (let i = 0; i < pathFixtures.length; i++) {
                // loosely item checking by N indexes & includes
                // FIXME: may be problematic but works faster than any other solutions
                // NO regex :)
                // this is faster and better
                if (!pathFixtures[i].includes(":") &&
                    path.includes(urlFixtures[i] + "/") &&
                    pathFixtures.indexOf(urlFixtures[i]) ===
                        pathFixtures.lastIndexOf(urlFixtures[i])) {
                    if (!isIt)
                        isIt = true;
                }
                else {
                    if (pathFixtures[i].includes(":")) {
                        continue;
                    }
                    isIt = false;
                }
                if (!(pathFixtures.indexOf(urlFixtures[i]) ===
                    pathFixtures.lastIndexOf(urlFixtures[i]))) {
                    throw new Error("cradova router doesn't allow paths with multiple names");
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
Router.route = function (path = "/", screen) {
    if (!screen.Activate && screen.name) {
        console.error("not a valid screen  " + screen);
        throw new Error("cradova err: Not a valid cradova screen component");
    }
    Router.routes[path] = {
        controller: (params, force) => screen.Activate(params, force),
        packager: (params) => __awaiter(this, void 0, void 0, function* () { return yield screen.package(params); }),
        deactivate: (params) => __awaiter(this, void 0, void 0, function* () {
            if (screen.deactivatecallBack) {
                yield screen.deactivatecallBack(params);
            }
        }),
    };
};
/**
 * Cradova Router
 * ------
 *
 * Navigates to a designated screen in your app
 */
Router.navigate = function (href, data = null, force = false) {
    if (typeof data === "boolean") {
        force = true;
        data = null;
    }
    if (typeof href !== "string") {
        throw new TypeError("cradova err: href must be a defined path but got " + href + " instead");
    }
    let route = null, params, link = null;
    if (href.includes(".")) {
        window.location.href = href;
    }
    else {
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
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                // INFO: this fixed a bug but isn't necessary
                yield Router.router(null, force);
            }), 0);
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
Router.router = function (e, force = false) {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        else {
            [route, params] = checker(url);
        }
        if (route) {
            Router.params.event = e;
            Router.params.params = params || null;
            Router.params.data = Router.params.data || null;
            Router["lastNavigatedRouteController"] &&
                Router["lastNavigatedRouteController"].deactivate(Router.params);
            yield route.controller(Router.params, force);
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
        }
        else {
            // or 404
            if (Router.routes["/404"]) {
                Router.routes["/404"].controller(Router.params);
            }
            else {
                // or error
                console.error("No /404 route screen specified");
                throw new Error("Cradova err route doesn't exist  " +
                    url +
                    "  did you create this route?");
            }
        }
    });
};
Router["onPageShow"] =
    /**
     * @param {Event} callback Click event.
     */
    function (callback) {
        if (typeof callback === "function") {
            Router["pageShow"] = callback;
        }
        else {
            throw new Error("Cradova err: callback for pageShow event is not a function");
        }
    };
Router["onPageHide"] = function (callback) {
    if (typeof callback === "function") {
        Router["pageHide"] = callback;
    }
    else {
        throw new Error("Cradova err: callback for pageHide event is not a function");
    }
};
/**
 * get a screen ready before time.
 *
 * @param {string}   path     Route path.
 * @param {any} data data for the screen.
 */
Router.packageScreen = function (path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Router.routes[path]) {
            console.error("no screen with path " + path);
            throw new Error("cradova err: Not a defined screen path");
        }
        yield Router.routes[path].packager(data);
    });
};
window.addEventListener("pageshow", Router.router);
window.addEventListener("popstate", (e) => {
    e.preventDefault();
    Router.router(e);
});
