/*

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"
"   ██████╗  ██████╗    █████      ██████╗    ███████╗  ██╗   ██╗   █████  
"  ██╔════╝  ██╔══██╗  ██╔═╗██    █      ██  ██╔═════╝  ██║   ██║  ██╔═╗██ 
"  ██║        ██████╔╝  ██████╗    █      ██  ██║     ██  ██║   ██║  ██████╗    
"  ██║        ██╔══██   ██║  ██║   █      ██  ██║     ██  ╚██╗ ██╔╝  ██║  ██    
"  ╚██████╗  ██║  ██║  ██║  ██║   ███████╔╝   ██████     ╚████╔╝   ██║  ██║
"   ╚═════╝  ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝     ╚═══╝     ╚═╝  ╚═╝  
"  Sacho inside
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" =============================================================================
" By Friday Candour
" -----------------------------------------------------------------------------
" =============================================================================
"   Cradova FrameWork
"   @version 1.*.*
" -----------------------------------------------------------------------------
" License: Apache V2
" -----------------------------------------------------------------------------
" fridaymaxtour@gmail.com ...
" =============================================================================

                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
        Copyright 2022 Friday Candour. All Rights Reserved.
        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
            http://www.apache.org/licenses/LICENSE-2.0
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
*/ // importing cradova helper scripts
/**
 * swipe
 * ---
 * Now you can detect swipes the best way possible
 *
 * @param callabck
 * @param touching?
 */ function $aafaf9ebb4b860c0$export$32e668afce77959f(
  callabck,
  touching = false
) {
  if (!(typeof callabck === "function"))
    throw new Error("no function given for the swipe handler");
  let touchingState = false;
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  function handleTouchStart(event) {
    touchstartX = Math.round(event.changedTouches[0].clientX);
    touchstartY = Math.round(event.changedTouches[0].clientY);
  }
  const capturedGesture = {
    top: 0,
    tap: 0,
    down: 0,
    left: 0,
    right: 0,
    touch: 0,
  };
  function handleGesure(event) {
    touchendX = Math.round(
      event.changedTouches[event.changedTouches.length - 1].clientX
    );
    touchendY = Math.round(
      event.changedTouches[event.changedTouches.length - 1].clientY
    );
    //
    if (touching)
      capturedGesture.top =
        capturedGesture.down =
        capturedGesture.right =
        capturedGesture.left =
        capturedGesture.tap =
        capturedGesture.touch =
          0;
    if (touching) {
      if (touchingState) {
        handleTouchStart(event);
        touchingState = false;
      } else {
        capturedGesture.top =
          capturedGesture.down =
          capturedGesture.right =
          capturedGesture.left =
          capturedGesture.tap =
          capturedGesture.touch =
            0;
        touchingState = true;
      }
    }
    if (touchendX > touchstartX)
      capturedGesture.right = touchendX - touchstartX;
    if (touchendX < touchstartX) capturedGesture.left = touchstartX - touchendX;
    if (touchendY > touchstartY) capturedGesture.down = touchendY - touchstartY;
    if (touchendY < touchstartY) capturedGesture.top = touchstartY - touchendY;
    if (touchendY == touchstartY) {
      capturedGesture.tap = touching ? 0 : 1;
      capturedGesture.touch = touching ? 1 : 0;
    }
    const keys = Object.keys(capturedGesture);
    let max = keys[0];
    for (let i = 1; i < keys.length; i++) {
      var value = keys[i];
      if (capturedGesture[value] > capturedGesture[max]) max = value;
    }
    if (callabck)
      callabck({
        [max]: capturedGesture[max],
      });
  }
  const escapeTSError = document.body;
  return {
    // swipe event
    start() {
      if (touching) escapeTSError.addEventListener("touchmove", handleGesure);
      else {
        escapeTSError.addEventListener("touchstart", handleTouchStart);
        escapeTSError.addEventListener("touchend", handleGesure);
      }
    },
    stop() {
      if (touching)
        escapeTSError.removeEventListener("touchmove", handleGesure);
      else {
        escapeTSError.removeEventListener("touchstart", handleTouchStart);
        escapeTSError.removeEventListener("touchend", handleGesure);
      }
    },
  };
} /*
   *** HOW TO USE ***
import swipe from "where you saved it"  
      function handleTouch(){
       console.log("touching")
      }
      
const swiper =  swipe(handleTouch) // tapping and swiping mode
const swiper =  swipe(handleTouch, ) // touching and swiping mode (aka touch move mode)

swiper.start() // starts the swipe event
swiper.stop() // stopes the swipe event

*/

/**
 *  Cradova Signal
 * ----
 *  create stateful data store.
 * ability to:
 * - create a store
 * - create actions and fire them
 * - bind a Ref or RefList
 * - listen to changes
 * -  persist changes to localStorage
 * - go back and forward in value history
 * - set keys instead of all values
 * - update a cradova Ref/RefList automatically
 * @constructor initial: any, props: {useHistory, persist}
 */ class $833debe4edef2435$export$8210dfe1863c478 {
  persistName = "";
  actions = {};
  useHistory = false;
  history = [];
  index = 0;
  path = null;
  value = null;
  constructor(initial, props) {
    this.value = initial;
    if (props && props.persistName) {
      this.persistName = props.persistName;
      const name = localStorage.getItem(props.persistName);
      if (name && name !== "undefined") this.value = JSON.parse(name);
    }
    if (props && props.useHistory) {
      this.useHistory = props.useHistory;
      this.history.push(initial);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   */ set(value, shouldRefRender) {
    if (typeof value === "function") this.value = value(this.value);
    else this.value = value;
    if (this.persistName)
      localStorage.setItem(this.persistName, JSON.stringify(this.value));
    if (this.ref && shouldRefRender !== false) {
      if (this.path) this.ref.updateState(this.value[this.path]);
      else this.ref.updateState(this.value);
    }
    if (this.callback) this.callback(this.value);
    if (!this.useHistory) return;
    this.index += 1;
    this.history.push(value);
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key value if it's an object
   * @param name - name of the key
   * @param value - value of the key
   * @returns void
   */ setKey(name, value, shouldRefRender) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[name] = value;
      if (this.persistName)
        localStorage.setItem(this.persistName, JSON.stringify(this.value));
      if (this.ref && shouldRefRender !== false) {
        if (this.path) this.ref.updateState(this.value[this.path]);
        else this.ref.updateState(this.value);
      }
      if (this.callback) this.callback(this.value);
      if (!this.useHistory) return;
      this.history.push(this.value);
      this.index += 1;
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an object prop of the store
   * @param key - a prop of the store - object value
   * @param name - prop of the key object
   * @param value - value of the name
   * @returns void
   */ setPath(key, name, value, shouldRefRender) {
    if (this.value[key]) this.value[key][name] = value;
    else
      this.value[key] = {
        [name]: [value],
      };
    if (this.ref && shouldRefRender !== false) {
      if (this.path) this.ref.updateState(this.value[this.path]);
      else this.ref.updateState(this.value);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an array prop of the store
   * @param key - a prop of the store - object value
   * @param index - index of the key object
   * @param value - value of the index
   * @returns void
   */ setIndex(key, index, value, shouldRefRender) {
    if (Array.isArray(this.value[key])) this.value[key][index] = value;
    else
      throw new Error(
        "cradova err:  " + this.value[key] + "  is not an array "
      );
    if (this.ref && shouldRefRender !== false) {
      if (this.path) this.ref.updateState(this.value[this.path]);
      else this.ref.updateState(this.value);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */ createAction(name, action) {
    if (typeof name === "string" && typeof action === "function")
      this.actions[name] = action;
    else {
      if (typeof name === "object" && !action)
        for (const [nam, action1] of Object.entries(name)) {
          if (typeof nam === "string" && typeof action1 === "function")
            this.actions[nam] = action1;
          else throw new Error(`cradova err: can't create action ${nam}`);
        }
      else throw new Error(`cradova err: can't create action ${name}`);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param name - string name of the action
   * @param data - data for the action
   */ fireAction(name, data) {
    try {
      if (!(typeof name === "string" && this.actions[name])) throw Error("");
    } catch (_e) {
      throw Error("Cradova err: action " + name + "  does not exist!");
    }
    this.actions[name](this, data);
  }
  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */ bindRef(Ref, path) {
    if (Ref && Ref.updateState) {
      this.ref = Ref;
      if (typeof path === "string") {
        this.path = path;
        Ref.stale(this.value[path]);
      } else Ref.stale(this.value);
    } else throw new Error("Invalid ref component" + Ref);
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value to a future one
   * @returns void
   */ forward() {
    if (this.history.length > this.index + 1) {
      if (!this.useHistory) return;
      this.value = this.history[this.index + 1];
      this.index += 1;
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value to a old past one
   * @returns void
   */ backward() {
    if (this.history.length > 0 && this.index > 0) {
      if (!this.useHistory) return;
      this.set(this.history[this.index + 1]);
      this.index -= 1;
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */ listen(callback) {
    this.callback = callback;
  }
  /**
   * Cradova Signal
   * ----
   * get value */ get() {
    return this.value;
  }
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   */ clearPersist() {
    if (this.persistName)
      localStorage.setItem(this.persistName, JSON.stringify(""));
  }
}

const $14558a07fc6e8338$export$55185c17a0fcbe46 = {};
$14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRouteController"] =
  null;
$14558a07fc6e8338$export$55185c17a0fcbe46["nextRouteController"] = null;
$14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRoute"] = null;
$14558a07fc6e8338$export$55185c17a0fcbe46["pageShow"] = null;
$14558a07fc6e8338$export$55185c17a0fcbe46["pageHide"] = null;
$14558a07fc6e8338$export$55185c17a0fcbe46["params"] = {};
$14558a07fc6e8338$export$55185c17a0fcbe46["routes"] = {};
/**
 *
 * @param url
 * @returns
 */ const $14558a07fc6e8338$var$checker = (url) => {
  // first strict check
  if ($14558a07fc6e8338$export$55185c17a0fcbe46.routes[url])
    return [$14558a07fc6e8338$export$55185c17a0fcbe46.routes[url], null];
  // place holder check
  for (const path in $14558a07fc6e8338$export$55185c17a0fcbe46.routes) {
    if (!path.includes(":")) continue;
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
        if (
          !pathFixtures[i].includes(":") &&
          path.includes(urlFixtures[i] + "/") &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          if (!isIt) isIt = true;
        } else {
          if (pathFixtures[i].includes(":")) continue;
          isIt = false;
        }
        if (
          !(
            pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
          )
        )
          throw new Error(
            "cradova router doesn't allow paths with multiple names"
          );
      }
      if (isIt) {
        for (let i1 = 0; i1 < pathFixtures.length; i1++)
          if (pathFixtures[i1].includes(":"))
            routesParams[pathFixtures[i1].split(":")[1]] = urlFixtures[i1];
        return [
          $14558a07fc6e8338$export$55185c17a0fcbe46.routes[path],
          routesParams,
        ];
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
 */ $14558a07fc6e8338$export$55185c17a0fcbe46.route = function (
  path = "/",
  screen
) {
  if (!screen.Activate && screen.name) {
    console.error("not a valid screen  " + screen);
    throw new Error("cradova err: Not a valid cradova screen component");
  }
  $14558a07fc6e8338$export$55185c17a0fcbe46.routes[path] = {
    controller: (params, force) => screen.Activate(params, force),
    packager: async (params) => await screen.package(params),
    deactivate: async (params) => {
      if (screen.deactivatecallBack) await screen.deactivatecallBack(params);
    },
  };
};
/**
 * Cradova Router
 * ------
 *
 * Navigates to a designated screen in your app
 */ $14558a07fc6e8338$export$55185c17a0fcbe46.navigate = function (
  href,
  data = null,
  force = false
) {
  if (typeof data === "boolean") {
    force = true;
    data = null;
  }
  if (typeof href !== "string")
    throw new TypeError(
      "cradova err: href must be a defined path but got " + href + " instead"
    );
  let route = null,
    params,
    link = null;
  if (href.includes(".")) window.location.href = href;
  else {
    if (href === window.location.pathname) return;
    [route, params] = $14558a07fc6e8338$var$checker(href);
    if (route) {
      $14558a07fc6e8338$export$55185c17a0fcbe46["nextRouteController"] = route;
      $14558a07fc6e8338$export$55185c17a0fcbe46.params.params = params || null;
      $14558a07fc6e8338$export$55185c17a0fcbe46.params.data = data || null;
      link = href;
      $14558a07fc6e8338$export$55185c17a0fcbe46["pageHide"] &&
        $14558a07fc6e8338$export$55185c17a0fcbe46["pageHide"](
          href + " :navigated"
        );
      window.history.pushState({}, "", link);
      setTimeout(async () => {
        // INFO: this fixed a bug but isn't necessary
        await $14558a07fc6e8338$export$55185c17a0fcbe46.router(null, force);
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
 */ $14558a07fc6e8338$export$55185c17a0fcbe46.router = async function (
  e,
  force = false
) {
  let Alink, url, route, params;
  if (e && e.target.tagName) {
    Alink = e.target;
    if (Alink && Alink.href.includes("#")) return;
    if (Alink && Alink.href.includes("javascript")) return;
    e.preventDefault();
    if (Alink) url = new URL(Alink.href).pathname;
  }
  if (!url) url = window.location.pathname;
  if (url === $14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRoute"])
    return;
  if ($14558a07fc6e8338$export$55185c17a0fcbe46["nextRouteController"]) {
    route = $14558a07fc6e8338$export$55185c17a0fcbe46["nextRouteController"];
    $14558a07fc6e8338$export$55185c17a0fcbe46["nextRouteController"] = null;
    params = $14558a07fc6e8338$export$55185c17a0fcbe46.params.params;
  } else [route, params] = $14558a07fc6e8338$var$checker(url);
  if (route) {
    $14558a07fc6e8338$export$55185c17a0fcbe46.params.event = e;
    $14558a07fc6e8338$export$55185c17a0fcbe46.params.params = params || null;
    $14558a07fc6e8338$export$55185c17a0fcbe46.params.data =
      $14558a07fc6e8338$export$55185c17a0fcbe46.params.data || null;
    $14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRouteController"] &&
      $14558a07fc6e8338$export$55185c17a0fcbe46[
        "lastNavigatedRouteController"
      ].deactivate($14558a07fc6e8338$export$55185c17a0fcbe46.params);
    await route.controller(
      $14558a07fc6e8338$export$55185c17a0fcbe46.params,
      force
    );
    $14558a07fc6e8338$export$55185c17a0fcbe46["pageShow"] &&
      $14558a07fc6e8338$export$55185c17a0fcbe46["pageShow"](url);
    $14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRoute"] = url;
    $14558a07fc6e8338$export$55185c17a0fcbe46["lastNavigatedRouteController"] =
      route;
    // click handlers
    Array.from(window.document.querySelectorAll("a")).forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        $14558a07fc6e8338$export$55185c17a0fcbe46.navigate(a.pathname);
      });
    });
  } // or 404
  else if ($14558a07fc6e8338$export$55185c17a0fcbe46.routes["/404"])
    $14558a07fc6e8338$export$55185c17a0fcbe46.routes["/404"].controller(
      $14558a07fc6e8338$export$55185c17a0fcbe46.params
    );
  else {
    // or error
    console.error("No /404 route screen specified");
    throw new Error(
      "Cradova err route doesn't exist  " + url + "  did you create this route?"
    );
  }
};
$14558a07fc6e8338$export$55185c17a0fcbe46["onPageShow"] = /**
 * @param {Event} callback Click event.
 */ function (callback) {
  if (typeof callback === "function")
    $14558a07fc6e8338$export$55185c17a0fcbe46["pageShow"] = callback;
  else
    throw new Error(
      "Cradova err: callback for pageShow event is not a function"
    );
};
$14558a07fc6e8338$export$55185c17a0fcbe46["onPageHide"] = function (callback) {
  if (typeof callback === "function")
    $14558a07fc6e8338$export$55185c17a0fcbe46["pageHide"] = callback;
  else
    throw new Error(
      "Cradova err: callback for pageHide event is not a function"
    );
};
/**
 * get a screen ready before time.
 *
 * @param {string}   path     Route path.
 * @param {any} data data for the screen.
 */ $14558a07fc6e8338$export$55185c17a0fcbe46.packageScreen = async function (
  path,
  data
) {
  if (!$14558a07fc6e8338$export$55185c17a0fcbe46.routes[path]) {
    console.error("no screen with path " + path);
    throw new Error("cradova err: Not a defined screen path");
  }
  await $14558a07fc6e8338$export$55185c17a0fcbe46.routes[path].packager(data);
};
window.addEventListener(
  "pageshow",
  $14558a07fc6e8338$export$55185c17a0fcbe46.router
);
window.addEventListener("popstate", (e) => {
  e.preventDefault();
  $14558a07fc6e8338$export$55185c17a0fcbe46.router(e);
});

class $f6990bd003c706fc$export$a98515d67472a41f {
  packed = false;
  secondaryChildren = [];
  // SCREEN ANIMATION CLASSES
  static SCALE_IN = "SCALE-IN";
  static SCALE_OUT = "SCALE-OUT";
  static CIRCLE_IN = "CIRCLE-IN";
  static CIRCLE_OUT = "CIRCLE-OUT";
  static FADE_OUT = "FADE-OUT";
  static FADE_IN = "FADE-IN";
  static SLIDE_UP = "SLIDE-UP";
  static SLIDE_DOWN = "SLIDE-DOWN";
  static SLIDE_LEFT = "SLIDE-LEFT";
  static SLIDE_RIGHT = "SLIDE-RIGHT";
  /**
   * this tells cradova to persist state on the screen or not
   * persisting is better
   */ persist = true;
  constructor(cradova_screen_initials) {
    const {
      template: template,
      name: name,
      callBack: callBack,
      transition: transition,
      persist: persist,
    } = cradova_screen_initials;
    if (typeof template !== "function")
      throw new Error(
        "Cradova err: only functions that returns a cradova element is valid as screen"
      );
    this.html = template;
    this.name = name;
    this.template = document.createElement("div");
    // this.template.style.width = "100%";
    // this.template.style.display = "flex";
    // this.template.style.flexDirection = "column";
    this.template.id = "cradova-screen-set";
    this.callBack = callBack;
    this.transition = transition;
    if (typeof persist !== "undefined") this.persist = true;
    if (persist === false) this.persist = false;
  }
  async package(data) {
    if (this.template.firstChild)
      // @ts-ignore
      this.template.replaceChildren();
    // console.log(this.persist, this.name);
    if (typeof this.html === "function") {
      let fuc = await this.html(data);
      if (typeof fuc === "function") {
        fuc = fuc(data);
        if (!(fuc instanceof HTMLElement))
          throw new Error("Cradova err only parent with descendants is valid");
        else this.template.append(fuc);
      }
    }
    //  @ts-ignore
    if (!this.template.firstChild)
      throw new Error(
        "no screen is rendered, may have been past wrongly, try ()=> screen in cradova Router.route(name, screen)"
      );
    this.template.append(...this.secondaryChildren);
  }
  onActivate(cb) {
    this.callBack = cb;
  }
  onDeactivate(cb) {
    this.deactivatecallBack = cb;
  }
  addChild(...addOns) {
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i] && addOns[i] instanceof HTMLElement)
        this.secondaryChildren.push(addOns[i]);
      if (addOns[i] && typeof addOns[i] === "function")
        this.secondaryChildren.push(addOns[i]());
    }
  }
  detach() {
    // clearing the dom
    const screens = document.querySelectorAll("#cradova-screen-set");
    for (let i = 0; i < screens.length; i++) {
      const screen = screens[i];
      if (this.transition)
        screen.classList.remove("CRADOVA-UI-" + this.transition);
      screen.parentElement?.removeChild(screen);
    }
  }
  async Activate(data, force) {
    // console.log(1);
    if (!this.persist) {
      await this.package(data);
      this.packed = true;
    } else if (!this.packed) {
      await this.package(data);
      this.packed = true;
    }
    if (force) {
      await this.package(data);
      this.packed = true;
    }
    document.title = this.name;
    this.detach();
    document.getElementById("Cradova-app-wrappper").append(this.template);
    if (!this.persist) this.packed = false;
    //  @ts-ignore
    if (this.template.firstChild.afterMount)
      //  @ts-ignore
      this.template.firstChild.afterMount();
    if (this.transition)
      this.template?.classList.add("CRADOVA-UI-" + this.transition);
    if (this.callBack) await this.callBack(data);
    window.scrollTo(0, 0);
  }
}

const $8c50abc064e8cb26$export$8048b892d651b310 = function (errors, err, type) {
  for (let er = 0; er < errors.length; er++) console.error(errors[er]);
  if (!type) throw new Error(err);
  else throw new TypeError(err);
};
const $8c50abc064e8cb26$export$cc1adf6fb659c762 = function () {
  const svg = `<svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4.49975 5.625C4.3402 5.6242 4.18282 5.58788 4.03904 5.5187C3.89526 5.44951 3.76869 5.34919 3.6685 5.225L1.03725 2.0375C0.8835 1.84561 0.786745 1.61438 0.758014 1.37017C0.729283 1.12596 0.769733 0.878589 0.874753 0.65625C0.959928 0.463017 1.09892 0.298383 1.27514 0.182014C1.45136 0.0656449 1.65734 0.00245816 1.8685 0H7.131C7.34216 0.00245816 7.54815 0.0656449 7.72437 0.182014C7.90058 0.298383 8.03958 0.463017 8.12475 0.65625C8.22977 0.878589 8.27023 1.12596 8.24149 1.37017C8.21276 1.61438 8.11601 1.84561 7.96226 2.0375L5.331 5.225C5.23082 5.34919 5.10424 5.44951 4.96047 5.5187C4.81669 5.58788 4.65931 5.6242 4.49975 5.625Z" fill="#2c3e50"/>
</svg>
`;
  const icon = (styles) =>
    (0, $882b6d93070905b3$export$2e2bcd8739ae039)("div", {
      ...styles,
      innerHTML: svg,
    });
  const constr = (0, $882b6d93070905b3$export$2e2bcd8739ae039)(
    "div",
    {
      display: "flex",
      position: "fixed",
      alignContent: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      width: "80px",
      top: "4px",
      right: "4px",
      backgroundColor: "#fff",
      transform: "rotate(0deg)",
      border: "aqua 2px solid",
      borderRadius: "6px",
    },
    icon({
      transform: "rotate(90deg)",
      /* border: "red 2px solid", */ onclick() {
        window.history.back();
      },
    }),
    icon({
      transform: "rotate(270deg)",
      /* border: "red 2px solid", */ onclick() {
        window.history.forward();
      },
    })
  );
  const cont = constr();
  if (cont) document.body.append(cont);
};
function $8c50abc064e8cb26$export$31b40729666a4ae0(num = 10) {
  const Xxs = Array(num).fill("x");
  let t = Date.now ? +Date.now() : +new Date();
  return Xxs.join("").replace(/[x]/g, function (e) {
    const r = (t + 16 * Math.random()) % 16 | 0;
    return (t = Math.floor(t / 16)), ("x" === e ? r : (7 & r) | 8).toString(16);
  });
}
function $8c50abc064e8cb26$export$5313b17bb82557eb(callback) {
  window.history.pushState(
    "forward",
    "",
    window.location.pathname + "#forward"
  );
  window.addEventListener("popstate", (e) => {
    if (callback) callback(e);
    else alert("Are you sure, you want to go back?");
  });
}
function $8c50abc064e8cb26$export$987d49ffe1b0900f(value, ...properties) {
  /* This is for creating css  
 @media styles using javascript*/ const styS =
      "@media only screen and (" +
      value +
      ") " +
      "{" +
      `
`,
    styE =
      "}" +
      `
`;
  let style = "  ",
    aniSty = " ";
  const proplen = properties.length;
  let totalAnimation,
    Animation = "  ";
  const animationStep = (num) => {
    style = "  ";
    for (const [k, v] of Object.entries(properties[num][1]))
      style +=
        "" +
        k +
        ": " +
        v +
        ";" +
        `
`;
    aniSty +=
      "" +
      properties[num][0] +
      "{" +
      `
` +
      style +
      "}" +
      `
`;
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) Animation += animationStep(i);
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) aniStyleTag = document.createElement("style");
  aniStyleTag.media = "screen";
  totalAnimation =
    aniStyleTag.innerHTML +
    `

`;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
}
function $8c50abc064e8cb26$export$dbf350e5966cf602(identifier, properties) {
  /*This is for creating
 css styles using JavaScript*/ const styS =
    "" +
    identifier +
    "" +
    "{" +
    `
`;
  const styE =
    "}" +
    `
`;
  let style = "",
    totalStyle = "";
  for (const [k, v] of Object.entries(properties))
    style +=
      "" +
      k +
      ": " +
      v +
      ";" +
      `
`;
  let styleTag = document.querySelector("style");
  if (styleTag !== null) {
    totalStyle += styleTag.innerHTML;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    return;
  }
  styleTag = document.createElement("style");
  totalStyle +=
    styleTag.innerHTML +
    `

`;
  totalStyle += styS + style + styE;
  styleTag.innerHTML = totalStyle;
  document.head.append(styleTag);
}
function $8c50abc064e8cb26$export$e3607ec2d7a891c4(identifier, ...properties) {
  /*This is for creating css  
 animations  using JavaScript*/ const styS =
      "@keyframes " +
      identifier +
      " " +
      "{" +
      `
`,
    styE =
      "}" +
      `
`,
    proplen = properties.length;
  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;
  const animationStep = (num) => {
    style = "  ";
    for (const [k, v] of Object.entries(properties[num][1]))
      style +=
        "" +
        k +
        ": " +
        v +
        ";" +
        `
`;
    aniSty +=
      "" +
      properties[num][0] +
      "{" +
      `
` +
      style +
      "}" +
      `
`;
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) Animation += animationStep(i);
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) aniStyleTag = document.createElement("style");
  aniStyleTag.media = "screen";
  totalAnimation =
    aniStyleTag.innerHTML +
    `

`;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
}
function $8c50abc064e8cb26$export$a7a9523472993e97(condition, ...callback) {
  if (condition) return callback;
  return "";
}
function $8c50abc064e8cb26$export$7a68a2580db7d6aa(condition, ifTrue, ifFalse) {
  if (condition) return ifTrue;
  return ifFalse;
}
function $8c50abc064e8cb26$export$6011af8918805fc(
  element_initials = "div",
  props = {}
) {
  props.stateID = $8c50abc064e8cb26$export$31b40729666a4ae0();
  const element = (0, $882b6d93070905b3$export$2e2bcd8739ae039)(
    element_initials,
    props
  );
  return {
    render(data) {
      return element(data);
    },
    updateState(state) {
      (0, $c2ad58edccfaf3f7$export$635e15bbd66f01ea)(props.stateID, state);
    },
  };
}
const $8c50abc064e8cb26$export$e0412d591d45e9b = {};
$8c50abc064e8cb26$export$e0412d591d45e9b.store = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
$8c50abc064e8cb26$export$e0412d591d45e9b.retrieve = (name) => {
  return localStorage.getItem(name);
};
$8c50abc064e8cb26$export$e0412d591d45e9b.remove = (name) => {
  localStorage.removeItem(name);
};
$8c50abc064e8cb26$export$e0412d591d45e9b.getKey = (index) => {
  return window.localStorage.key(index);
};
$8c50abc064e8cb26$export$e0412d591d45e9b.clear = () => {
  localStorage.clear();
};
function $8c50abc064e8cb26$export$708e76f13b8a286c(e) {
  return {
    set() {
      e.requestFullscreen().catch((err) => {
        throw err;
      });
    },
    exist() {
      document.exitFullscreen();
    },
  };
}
class $8c50abc064e8cb26$export$1b6f95c075a87882 {
  stateID = $8c50abc064e8cb26$export$31b40729666a4ae0();
  parentElement = null;
  datas = [];
  constructor(component) {
    this.component = component.bind(this);
  }
  stale(datas) {
    this.datas = datas;
  }
  render(datas) {
    if (datas) this.datas = datas;
    if (!this.datas)
      throw new Error("Cradova err: RefList cannot be rendered without input");
    if (!Array.isArray(this.datas))
      throw new Error("Cradova err: RefList cannot render non-array input");
    const elements = [];
    const data = this.datas.length;
    for (let i = 0; i < data; i++) {
      const chtml = this.component(this.datas[i], i);
      const element = chtml({
        stateID: this.stateID,
      });
      elements.push(element);
    }
    return elements;
  }
  updateState(datas) {
    if (!datas)
      throw new Error("Cradova err: Ref cannot be rendered without input");
    if (!Array.isArray(datas))
      throw new Error("Cradova err: RefList cannot render non-array input");
    if (!datas[0]) return;
    if (!this.parentElement)
      // only for the first call
      this.parentElement = (0, $c2ad58edccfaf3f7$export$635e15bbd66f01ea)(
        this.stateID,
        {
          cradovaDispatchtrackBreak: true,
        }
      )[0]?.parentElement;
    if (!this.parentElement)
      throw new Error(
        "cannot update list parent element is no where to be found"
      );
    const elements = [];
    for (let i = 0; i < datas.length; i++) {
      const chtml = this.component(datas[i], i);
      const element = chtml({
        stateID: this.stateID,
      });
      elements.push(element);
    }
    try {
      // @ts-ignore
      this.parentElement.replaceChildren(...elements);
    } catch (error) {}
  }
}
class $8c50abc064e8cb26$export$9bcc32033bdd12aa {
  stateID = $8c50abc064e8cb26$export$31b40729666a4ae0();
  //  private parentElement: HTMLElement | null = null;
  data = [undefined];
  constructor(component) {
    this.component = component.bind(this);
  }
  stale(...data) {
    this.data = data;
  }
  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns html
   */ render(...data) {
    if (data) this.data = data;
    if (!this.data)
      throw new Error("Cradova err: Ref cannot be rendered without input");
    const chtml = this.component(...this.data);
    if (typeof chtml !== "function")
      throw new Error(
        "Invalid component type for cradova Ref, got  -  " + chtml
      );
    const element = chtml({
      stateID: this.stateID,
    });
    if (!(element instanceof HTMLElement))
      $8c50abc064e8cb26$export$8048b892d651b310(
        [
          `
     \x1b[35m Exception: ref only  a function that returns cradova element or cradova element tree. \x1b[35m
      
      to track and debug this element add a
      beforeMount or afterMount prop to the element
      then you can compare the parsed element and stateID

     element stateID: \x1b[4m \x1b[33m ${this.stateID} \x1b[33m \x1b[4m`,
        ],
        `Cradova can't render component make sure it's a valid component`
      );
    return () => element;
  }
  onStateUpdate(cb) {
    this.upcb = cb;
  }
  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns void
   */ updateState(...data) {
    if (!data) return;
    if (!this) {
      console.error(
        "update has been passed wrongly please send the ref where you want to call it"
      );
      console.error(" Then call as ref.updateState({ your state }) ");
    }
    const guy = (0, $c2ad58edccfaf3f7$export$635e15bbd66f01ea)(this.stateID, {
      display: "none",
    })[0];
    if (!guy)
      // console.log(this.component);
      throw new Error("Ref is not rendered but updateState was called");
    const chtml = this.component(...data);
    if (typeof chtml !== "function")
      try {
        guy.parentNode.replaceChild(chtml, guy);
      } catch (e) {
        console.error(e);
        throw new Error(
          "cradova err: Ref got an invalid datatype for ref updateSate call  got >>>  ' " +
            chtml +
            "';"
        );
      }
    const element = chtml({
      stateID: this.stateID,
    });
    const fn = element.afterMount;
    element.afterMount = undefined;
    try {
      guy.parentNode.replaceChild(element, guy);
      if (typeof fn === "function") fn(element, data);
    } catch (e0) {
      console.log(e0);
    }
    if (this.upcb) this.upcb(data);
  }
  remove() {
    (0, $c2ad58edccfaf3f7$export$635e15bbd66f01ea)(this.stateID, {
      remove: true,
    });
  }
}
const $8c50abc064e8cb26$export$6a2d9549213d3666 = function (...children) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    const ch = children[i]();
    if (typeof ch === "function") par.append(ch());
    else if (ch instanceof HTMLElement) par.append(ch);
  }
  return par;
};

// the global dispatcher
function $c2ad58edccfaf3f7$var$cradovaDispatchtrack(nodes, state) {
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
    if (typeof state === "object")
      // updating the element's state
      for (const key in state) {
        // updating element styling
        if (key === "style") {
          for (const [k, v] of Object.entries(state[key])) element.style[k] = v;
          continue;
        }
        if (element.style[key] && key !== "src") {
          element.style[key] = state[key];
          continue;
        }
        if (element.style[key] === "" && key !== "src") {
          element.style[key] = state[key];
          continue;
        }
        if (typeof element[key] === "function") {
          element[key](element);
          continue;
        }
        // updating element's inner text
        if (key === "text") {
          element.innerText = state[key];
          continue;
        }
        // setting element dimension to full screen
        if (key === "fullscreen") {
          if (state[key])
            (0, $8c50abc064e8cb26$export$708e76f13b8a286c)(element).set();
          else (0, $8c50abc064e8cb26$export$708e76f13b8a286c)(element).exist();
          continue;
        }
        // adding class name to element
        if (key === "class" && typeof state[key] === "string") {
          const classes = state[key].split(" ");
          for (let i1 = 0; i1 < classes.length; i1++)
            if (classes[i1]) element.classList.add(classes[i1]);
          continue;
        }
        // toggling element class
        if (key === "toggleclass") {
          element.classList.toggle(state[key]);
          continue;
        }
        //removing element class
        if (key === "removeclass") {
          element.classList.remove(state[key]);
          continue;
        }
        //removing element element
        if (key === "remove") {
          element.parentElement?.removeChild(element);
          continue;
        }
        // changing the element children tree
        if (key === "tree") {
          if (typeof state[key] === "function") state[key] = state[key]();
          if (typeof state[key] === "function") state[key] = state[key]();
          if (Array.isArray(state[key]))
            throw new TypeError(
              "cradova err invalid tree element type, should be a single element or parent element from cradova"
            );
          if (!(state[key] instanceof HTMLElement)) {
            console.error(
              "cradova err wrong element type: can't update element state on " +
                state[key]
            );
            throw new TypeError(
              "cradova err invalid element, should be a html element from cradova"
            );
          }
          // destroy the component tree
          element.replaceChildren();
          // rebuild the component tree
          element.append(state[key]);
          continue;
        }
        element[key] = state[key];
      }
  }
}
function $c2ad58edccfaf3f7$export$635e15bbd66f01ea(stateID, state) {
  const nodes = [];
  let updated = [];
  if (typeof state === "undefined" && typeof stateID === "object")
    for (const [id, eachState] of Object.entries(stateID)) {
      // filtering;
      const elements = document.querySelectorAll(".cra_child_doc");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (!element.stateID || element.stateID !== id) continue;
        nodes.push(element);
      }
      $c2ad58edccfaf3f7$var$cradovaDispatchtrack(nodes, eachState);
      updated.push(...nodes);
    }
  else if (typeof stateID === "string") {
    // filtering;
    const elements1 = document.querySelectorAll(".cra_child_doc");
    for (let i1 = 0; i1 < elements1.length; i1++) {
      const element1 = elements1[i1];
      if (!element1.stateID || element1.stateID !== stateID) continue;
      nodes.push(element1);
    }
    if (state?.cradovaDispatchtrackBreak) updated.push(...nodes);
    else {
      $c2ad58edccfaf3f7$var$cradovaDispatchtrack(nodes, state);
      updated.push(...nodes);
    }
  }
  return updated;
}

/**
 *
 * Cradova Ajax
 * ------------------
 * your new axios alternative
 * supports files upload
 * @param url string
 * @param {{method: string;data;header;callbacks;}} opts
 * @returns any
 */ function $2ba70f089ec95838$export$7a330199b2e76989(url, opts = {}) {
  // getting params
  let {
    method: method,
    data: data,
    header: header,
    callbacks: callbacks,
  } = opts;
  if (typeof url !== "string")
    throw new Error("Cradova err : little Axios invalid url " + url);
  // setting method
  if (!method) method = data && typeof data === "object" ? "POST" : "GET";
  // promisified xhr function
  return new Promise(function (resolve) {
    const ajax = new XMLHttpRequest();
    let formData = new FormData();
    // setting methods
    if (callbacks && typeof callbacks === "object") {
      for (const [k, v] of Object.entries(callbacks))
        if (typeof v === "function" && ajax[k]) ajax[k] = v;
    }
    ajax.addEventListener("load", function () {
      resolve(ajax.response);
    });
    if (data && typeof data === "object")
      for (const [k1, v1] of Object.entries(data)) {
        let value = v1;
        if (typeof value === "object" && value && !value.name)
          value = JSON.stringify(value);
        formData.set(k1, value);
      }
    ajax.addEventListener("error", (e) => {
      console.error("Ajax error   +", e);
      if (!navigator.onLine)
        resolve(
          JSON.stringify({
            message: `you are offline!`,
          })
        );
      else
        resolve(
          JSON.stringify({
            message: `something went wrong please try again!`,
          })
        );
    });
    ajax.open(method, url, true);
    // setting header
    if (header && typeof header === "object")
      Object.keys(header).forEach(function (key) {
        ajax.setRequestHeader(key, header[key]);
      });
    ajax.send(formData);
  });
}

const $36ff37611d9df5b9$export$d050db8f6426404e = function () {
  if (document.getElementById("Cradova-app-wrappper")) return;
  const Wrapper = document.createElement("div");
  Wrapper.id = "Cradova-app-wrappper";
  Wrapper.stateID = "Cradova-app-wrappper-id";
  document.body.append(Wrapper);
};

("use strict");
const $882b6d93070905b3$var$make = function (txx) {
  if (Array.isArray(txx)) txx = txx[0].trim();
  if (!txx)
    return {
      tag: "div",
    };
  let tag;
  const itemsPurifier = (impure, pure, items) => {
    if (!items.includes(pure)) return [];
    const pureItems = [];
    items = items.split(pure);
    for (let i = 0; i < items.length; i++) {
      if (items[i].includes(impure)) items[i] = items[i].split(impure)[0];
      pureItems.push(items[i]);
    }
    return pureItems;
  };
  let innerValue;
  if (txx.includes("|")) {
    const tc = txx.split("|");
    innerValue = tc[1];
    txx = tc[0] && tc[0];
  }
  const classes = itemsPurifier("#", ".", txx);
  const ids = itemsPurifier(".", "#", txx);
  if (typeof tag !== "string") tag = classes.shift();
  if (typeof tag !== "string") tag = ids.shift();
  if (!tag) tag = "div";
  if (!txx.includes(".") && !txx.includes("#")) {
    tag = txx;
    ids.length = 0;
    classes.length = 0;
  }
  let ID = ids[1] ? ids[1].trim() : null;
  const className = classes.join(" ");
  return {
    tag: tag,
    className: className,
    ID: ID,
    innerValue: innerValue,
  };
};
/**
 * Creates new cradova HTML element
 *  @example
 * _("p") // or _("p.class") or _("p#id") or _("p.class#id")
 * using inline props
 * _("p",{
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * )
 * adding children
 * _("p",
 * _("span",{text:" am a span tag like so",
 *  {style: {color: "brown"}
 * })
 * )
 *
 * props and children
 * _("p",
 * // props first
 * {
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * },
 * // all children goes after
 * _("span",{text:" am a span tag like so",
 *  {style: {color: "brown"}
 * })
 * )
 *
 * @param  {...any} element_initials
 * @returns function - cradova element
 */ const $882b6d93070905b3$var$_ = (...element_initials) => {
  let properties,
    childrens = [],
    beforeMount;
  if (
    typeof element_initials[1] == "object" &&
    !(
      element_initials[1] instanceof HTMLElement && !element_initials[1].tagName
    )
  ) {
    properties = element_initials[1];
    if (properties?.beforeMount) beforeMount = properties["beforeMount"];
    if (element_initials.length > 2)
      childrens = element_initials.slice(2, element_initials.length);
  } else if (
    element_initials[1] instanceof HTMLElement ||
    typeof element_initials[1] === "function" ||
    typeof element_initials[1] === "string"
  )
    childrens = element_initials.slice(1, element_initials.length);
  if (element_initials[0].raw)
    // getting the value of static cradova calls
    element_initials[0] = element_initials[0]["raw"][0];
  // verifying the children array
  function identify(element_initials) {
    if (typeof element_initials !== "object")
      element_initials = [element_initials];
    const initials = $882b6d93070905b3$var$make(element_initials[0]);
    // TODO: tag debugger
    // const { tag, className, ID, innerValue } = initials;
    /**
     *
     * --- Cradova Element Initials  ---
     * --------------------------------
     *
     * Note: this element has not been initialized!
     *
     * add to a parent element or call this return function
     *
     * .
     */ return (...incoming) => {
      /*
       *
       * --- Cradova Element Initials  ---
       * --------------------------------
       *
       * Note: this element has not been initialized!
       *
       * add to a parent element or call this return function
       *
       * .
       */ let childrens2rd = [],
        props = {},
        text;
      for (let i = 0; i < incoming.length; i++) {
        if (
          typeof incoming[i] === "function" ||
          incoming[i] instanceof HTMLElement
        ) {
          childrens2rd.push(incoming[i]);
          continue;
        }
        if (
          // !incoming[i].tagName &&
          !(incoming[i] instanceof HTMLElement) &&
          !Array.isArray(incoming[i]) &&
          typeof incoming[i] === "object" &&
          !incoming[i].tagName
        ) {
          if (incoming[i].beforeMount) {
            beforeMount = incoming[i]["beforeMount"];
            continue;
          }
          if (incoming[i].composedPath) continue;
          props = incoming[i];
          continue;
        }
        //
        if (typeof incoming[i] === "string") {
          text = incoming[i];
          continue;
        }
      }
      if (childrens.length) childrens2rd.push(...childrens);
      let element;
      try {
        element = document.createElement(initials.tag.trim());
      } catch (error) {
        throw new TypeError("cradova err invalid tag given  " + initials.tag);
      }
      if (!element) return;
      if (initials.className) element.className = initials.className.trim();
      if (initials.ID) element.id = initials.ID.trim();
      if (initials.innerValue) element.append(initials.innerValue);
      for (const prop in properties) {
        if (prop === "style" && typeof properties[prop] === "object") {
          for (const [k, v] of Object.entries(properties[prop]))
            element.style[k] = v;
          continue;
        }
        if (element.style[prop] === "" && prop !== "src") {
          element.style[prop] = properties[prop];
          continue;
        }
        if (prop === "class" && typeof properties[prop] === "string") {
          const classes = properties[prop].split(" ");
          for (let i1 = 0; i1 < classes.length; i1++)
            if (classes[i1]) element.classList.add(classes[i1]);
          continue;
        }
        if (prop === "text") {
          element.innerText = properties[prop];
          continue;
        }
        try {
          element[prop] = properties[prop];
        } catch (error1) {
          console.log(properties);
          throw new Error(
            "cradova err invalid props  " +
              prop +
              " for this element type with value " +
              properties[prop]
          );
        }
      }
      //
      // dynamic props
      // over-rides props that appear in the first level
      if (props && typeof props === "object" && !Array.isArray(props))
        for (const prop1 in props) {
          if (prop1 === "style" && typeof props[prop1] === "object") {
            for (const [k1, v1] of Object.entries(props[prop1]))
              element.style[k1] = v1;
            continue;
          }
          if (element.style[prop1] === "" && prop1 !== "src") {
            element.style[prop1] = props[prop1];
            continue;
          }
          if (prop1 === "text" && typeof props[prop1] === "string") {
            element.innerText = props[prop1];
            continue;
          }
          if (prop1 === "class" && typeof props[prop1] === "string") {
            element.classList.add(props[prop1]);
            continue;
          }
          if (prop1 === "beforeMount") {
            beforeMount = props["beforeMount"];
            continue;
          }
          try {
            element[prop1] = props[prop1];
          } catch (error2) {
            console.error(error2);
          }
        }
      // getting children ready
      if (childrens2rd.length)
        for (let i2 = 0; i2 < childrens2rd.length; i2++) {
          // single child lane
          if (typeof childrens2rd[i2] === "function") {
            let child = childrens2rd[i2]();
            if (typeof child === "function") child = child();
            try {
              if (child) element.append(child);
              if (child && child.afterMount) {
                child.afterMount(child);
                child.afterMount = undefined;
              }
            } catch (error3) {
              console.error(error3);
              if (!(child instanceof HTMLElement))
                throw new Error(
                  " cradova err invalid child type: " +
                    child +
                    " (" +
                    typeof child +
                    ")"
                );
            }
            continue;
          }
          // children array
          if (Array.isArray(childrens2rd[i2])) {
            const arrCX = childrens2rd[i2];
            const arrCXLenght = arrCX.length;
            const arrSET = [];
            for (let p = 0; p < arrCXLenght; p++) {
              if (
                !(arrCX[p] instanceof HTMLElement) &&
                typeof arrCX[p] !== "function" &&
                !Array.isArray(arrCX[p])
              ) {
                console.error(arrCX[p]);
                throw new TypeError(
                  "cradova err: invalid tag type or template literal, cradova was enable to create this element show above ⇑"
                );
              }
              arrSET.push(arrCX[p]);
            }
            //
            childrens2rd = [
              ...childrens2rd.slice(0, i2 + 1),
              ...arrSET,
              ...childrens2rd.slice(i2 + 1, childrens2rd.length),
            ];
            continue;
          }
          const child1 = childrens2rd[i2];
          if (
            child1 instanceof HTMLElement ||
            child1 instanceof DocumentFragment ||
            typeof child1 === "string"
          ) {
            element.append(child1);
            // @ts-ignore
            if (child1.afterMount) {
              // @ts-ignore
              child1.afterMount(child1);
              // @ts-ignore
              child1.afterMount = undefined;
            }
          } else {
            console.error("cradova got");
            console.error(child1);
            throw new Error(
              " cradova err invalid child type: (" + typeof child1 + ")"
            );
          }
        }
      //
      if (text) element.append(text);
      // TODO: this will be updated to use data-stateid soon
      // speed test still going on
      if (element.stateID)
        // adding cradova dynamic signature
        element.classList.add("cra_child_doc");
      if (beforeMount) beforeMount(element);
      return element;
    };
  }
  if (typeof element_initials[0] !== "string") {
    console.error("cradova err: NO TEMPLATE STRING PROVIDED");
    return () => "NO TEMPLATE STRING PROVIDED";
  }
  const CradovaElement = identify(element_initials);
  if (!CradovaElement)
    throw new Error(
      "Cradova err invalid element initials  " + element_initials
    );
  return CradovaElement;
};
(0, $36ff37611d9df5b9$export$d050db8f6426404e)();
var $882b6d93070905b3$export$2e2bcd8739ae039 = $882b6d93070905b3$var$_;

//# sourceMappingURL=index.js.map
