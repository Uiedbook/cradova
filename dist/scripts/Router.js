/**
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */
export const Router = {};
Router["routes"] = {};
Router["params"] = {};
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
        if (!path.includes("$")) {
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
                if (!pathFixtures[i].includes("$") && path.includes(urlFixtures[i] + "/") && (pathFixtures.indexOf(urlFixtures[i]) === pathFixtures.lastIndexOf(urlFixtures[i]))) {
                    if (!isIt)
                        isIt = true;
                }
                else {
                    if (pathFixtures[i].includes("$")) {
                        continue;
                    }
                    isIt = false;
                }
                if (!(pathFixtures.indexOf(urlFixtures[i]) === pathFixtures.lastIndexOf(urlFixtures[i]))) {
                    throw new Error("cradova router doesn't allow paths with multiple names");
                }
            }
            if (isIt) {
                for (let i = 0; i < pathFixtures.length; i++) {
                    if (pathFixtures[i].includes("$")) {
                        routesParams[pathFixtures[i].split("$")[1]] = urlFixtures[i];
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
 * @param {Function} controller the cradova document tree for the route.
 */
Router.route = function (path = "/", controller) {
    Router.routes[path] = {
        controller: controller,
    };
};
Router.navigate = function (href, data = {}) {
    if (typeof href !== "string") {
        throw new TypeError("cradova err href must be a defined path but got " + href + " instaed");
    }
    let route = null, params, link = null;
    if (href.includes(".")) {
        try {
            if (new URL(href).pathname === window.location.pathname) {
                return;
            }
            route = Router.routes[new URL(href).pathname];
            link = new URL(href).pathname;
        }
        catch (error) {
            throw new Error("cradova: invlaid route  " + href);
        }
    }
    else {
        if (href === window.location.pathname) {
            return;
        }
        [route, params] = checker(href);
        if (route) {
            Router.params.params = params || null;
            Router.params.data = data || null;
            link = href;
            window.history.pushState({}, "", link);
            document.body.click();
        }
    }
    return;
};
Router.goTo = (path) => {
    window.location.pathname = path;
};
Router.router = function (e) {
    if (e.target.tagName === "INPUT") {
        return;
    }
    //
    let Alink;
    if (e.target.tagName === "A") {
        Alink = e.target;
        if (Alink && Alink.href.includes("#")) {
            return;
        }
    }
    if (e.target.parentElement && e.target.parentElement.tagName === "A") {
        Alink = e.target.parentElement;
    }
    if (Alink && Alink.href.includes("#")) {
        return;
    }
    if (Alink && Alink.href.includes("javascript")) {
        return;
    }
    e.preventDefault();
    if (Alink) {
        if (Alink.href === "" ||
            new URL(Alink.href).pathname === window.location.pathname) {
            return;
        }
        const [route, params] = checker(new URL(Alink.href).pathname);
        if (route) {
            Router.params.event = e;
            Router.params.params = params || null;
            Router.params.data = Router.params.data || null;
            route.controller(Router.params);
        }
        else {
            throw new Error("cradova err route doesn't exist  " + Alink.href);
        }
        window.history.pushState({}, "", new URL(Alink.href).pathname);
        return;
    }
    const url = window.location.pathname;
    const [route, params] = checker(url);
    if (route) {
        Router.params.event = e;
        Router.params.params = params || null;
        Router.params.data = Router.params.data || null;
        route.controller(Router.params);
    }
};
/**
 * Responds to click events anywhere in the document and when
 * the click happens on a link that is supposed to be handled
 * by the router, loads and displays the target page.
 *
 * @param {Event} e Click event.
 */
document.addEventListener("click", Router.router);
window.addEventListener("load", Router.router);
window.addEventListener("popstate", (e) => {
    e.preventDefault();
    Router.router(e);
});
