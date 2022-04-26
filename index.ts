/*         _____
 *        /     \
 *       /   /\  \
 *      /   /  \__\
 *     /   /    _    _
 *    /   /    (_)  (_)
 *   (    \    ___ 
 *    \    \  /  /
 *     \    \/  /
 *      \      /
 *       \____/
 * 
 *   Cradova FrameWork
 *     @version 1.0.0
        @licence Apache v2

 @publisher : Friday Candour;
 @project : Cradova Framework;
 @copyright-lincense :  Apache v2;
 email > fridaymaxtour@gmail.com
 github > www.github.com/FridayCandour
 telegram > @uiedbooker

                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 *       Copyright 2022 Friday Candour. All Rights Reserved.
 *       Licensed under the Apache License, Version 2.0 (the "License");
 *       you may not use this file except in compliance with the License.
 *       You may obtain a copy of the License at
 *           http://www.apache.org/licenses/LICENSE-2.0
 *       Unless required by applicable law or agreed to in writing, software
 *       distributed under the License is distributed on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *       See the License for the specific language governing permissions and
 *       limitations under the License.
 *       
*/

import css from "./scripts/css.js";
import w from "./scripts/widget.js";
import Init from "./scripts/init.js";
import swipe from "./scripts/swipe.js";
import media from "./scripts/media.js";
import Store from "./scripts/store.js";
import Router from "./scripts/Router.js";
import Screen from "./scripts/Screen.js";
import JSONDB from "./scripts/JsonDB.js";
import Speaker from "./scripts/speaker.js";
import animate from "./scripts/animate.js";
import fs from "./scripts/file-system.js";
import ls from "./scripts/localStorage.js";
import dispatch from "./scripts/dispatcher.js";
import fullScreen from "./scripts/fullscreen.js";
import metrics from "./scripts/Metrics.js";

("use strict");

/**
 * Acts as a function or object depending on how it is referenced.
 *
 * :: schemes
 *  @example
 *  // creating html elements
 * @param  element_initials | <html template string, props object?, children?>.
 * @returns Cradova element base function.
 * @example
 * // html template strings examples
 *
 * //template literals example, can't accept props object or children
 *
 * _`p| am a p tag`
 * // equivilent <p> am a p tag</p>
 *
 * or _`p.class| am a p tag`
 * // equivilent <p class="class"> am a p tag </p>
 *
 * or _`p#id| am a p tag`
 * // equivilent <p id="id"> am a p tag </p>
 *
 * or _`p.class#id| am a p tag`
 * // equivilent <p id="id" class="class"> am a p tag </p>
 *
 * // using props and children
 *
 *  _("p| am a p tag" ,{
 *  //props like
 *  text: "am a dynamic paragraph tag", // this will override text value above
 *  style: {
 *   color: "blue"
 *  }
 * },
 * // place other children here like span
 * _`span| am a span tag like so`,
 * _("span| am a span tag like so", {style: {color: "brown"}})
 * )
 *
 * every other cradova methods like _.dispatch, _.reuse ... can be distructured
 * vist the docs for more info.
 * Enjoy!
 */

const _ = (...element_initials: { raw: any }[]) => {
  let properties: { [x: string]: any },
    childrens: string | any[] = [];
  // getting props and children set
  if (
    typeof element_initials[1] == "object" &&
    !(element_initials[1] instanceof HTMLElement)
  ) {
    properties = element_initials[1];
    if (element_initials.length > 2) {
      childrens = element_initials.slice(2, element_initials.length);
    }
  } else {
    if (
      element_initials[1] instanceof HTMLElement ||
      typeof element_initials[1] === "function"
    ) {
      childrens = element_initials.slice(1, element_initials.length);
    }
  }
  // don't move this up
  if (typeof element_initials[0] === "string") {
    element_initials = element_initials[0];
  }
  // verifing the children array
  for (let i = 0; i < childrens.length; i++) {
    if (
      !(childrens[i] instanceof HTMLElement) &&
      typeof childrens[i] !== "function"
    ) {
      throw new Error(
        "cradova err invalid children list, should be a Cradova element base  " +
          childrens[i]
      );
    }
  }
  /**
   * sorts props and creates cradova element base
   * @param element_initials
   * @returns cradova element base
   */
  function identify(element_initials: any[]) {
    if (typeof element_initials !== "object") {
      element_initials = [element_initials];
    }
    // getting element id, class and text value if available
    let tag, className, ID;
    const [el, innerValue] = element_initials[0].split("|");

    if (el.indexOf("#") > -1) {
      ID = el.split("#")[1];
      tag = el.split("#")[0];
      className = ID.split(".")[1];
      if (className) {
        ID = ID.split(".")[0];
      }
    }

    if (el.indexOf(".") > -1) {
      if (!className) {
        className = el.split(".")[1];
        tag = el.split(".")[0];
        let locID = className.split("#")[1];
        if (locID) {
          className = className.split("#")[0];
        }
      }
    }

    if (tag === "") {
      tag = "div";
    }
    if (!tag && tag !== "") {
      tag = el;
    }

    const initials = { tag, className, ID, innerValue };

    /**
     * params [incoming]:any elements and props object
     * @returns HTML element
     */

    return (...incoming: string | any[]) => {
      let childrens2rd = [],
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
        //
        if (
          !(incoming[i] instanceof HTMLElement) &&
          typeof incoming[i] === "object"
        ) {
          props = incoming[i];
          continue;
        }
        if (typeof incoming[i] === "string") {
          text = incoming[i];
          continue;
        }
        //
        if (childrens[0]) {
          if (childrens2rd) {
            childrens2rd.push(...childrens);
          } else {
            childrens2rd = childrens;
          }
          continue;
        }
      }

      const element = document.createElement(initials.tag);
      if (initials.className) {
        element.className = initials.className;
      }

      if (initials.ID) {
        element.id = initials.ID;
      }
      if (initials.innerValue) {
        element.append(initials.innerValue);
      }

      for (const prop in properties) {
        if (prop === "style") {
          for (const [k, v] of Object.entries(properties[prop])) {
            element.style[k] = v;
          }
          continue;
        }
        if (prop === "class") {
          element.classList.add(properties[prop]);
          continue;
        }
        if (prop === "text") {
          element.innerText = properties[prop];
          continue;
        }
        element[prop] = properties[prop];
      }

      // over-rides props that appear in the first level

      if (props && typeof props === "object" && !Array.isArray(props)) {
        for (const prop in props) {
          if (prop === "style") {
            for (const [k, v] of Object.entries(props[prop])) {
              element.style[k] = v;
            }
            continue;
          }
          if (prop === "text") {
            element.innerText = props[prop];
            continue;
          }
          if (prop === "class") {
            element.classList.add(props[prop]);
            continue;
          }
          if (prop === "fullscreen") {
            if (properties[prop]) {
              fullScreen(element).set();
            } else {
              fullScreen(element).exist();
            }
            continue;
          }
          element[prop] = props[prop];
        }
      }
      // building parent tree if children are available
      if (childrens2rd && childrens2rd[0]) {
        for (let i = 0; i < childrens2rd.length; i++) {
          if (typeof childrens2rd[i] === "function") {
            element.append(childrens2rd[i]());
            continue;
          }
          element.append(childrens2rd[i]);
        }
      }
      // adds text content if available
      if (text) {
        element.append(text);
      }
      if (element.stateID) {
        // adding cradova dynamic state signature as class name
        element.classList.add("cra_child_doc");
      }
      return element;
    };
  }
  if (element_initials[0].raw) {
    element_initials = identify(element_initials[0].raw);
  } else {
    element_initials = identify(element_initials);
  }

  return element_initials;
};

_.register = (name: any) => {
  for (const key in name) {
    _[key] = name[key];
  }
};

/**
 * registering added methods to the cradova object _
 *
 * these can be safely destructured to use alone
 */
_.register({
  w,
  css,
  Init,
  media,
  swipe,
  Store,
  JSONDB,
  Screen,
  Router,
  LS: ls,
  FS: fs,
  Speaker,
  metrics,
  animate,
  dispatch,
  //  App: window.app,
  globalState: { state: {}, stateID: "" },
});

_.Init();
window._ = _;

export default _;

/**
 *
 * Registering ServiceWorker
 *
 *  */
window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        // Registration was successful
        //         console.log(
        //           `Service Worker registration successful. Scope: ${registration.scope}
        // comment this line out at nodemodules/cradova/index.js line 362`
        //         );
      })
      .catch((err) => console.log(err));
  }
});
