/*

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"
"   ██████╗  ██████╗    █████      ██████╗    ███████╗  ██╗   ██╗   █████  
"  ██╔════╝  ██╔══██╗  ██╔═╗██    █      ██  ██╔═════╝  ██║   ██║  ██╔═╗██ 
"  ██║        ██████╔╝  ██████╗    █      ██  ██║     ██  ██║   ██║  ██████╗    
"  ██║        ██╔══██   ██║  ██║   █      ██  ██║     ██  ╚██╗ ██╔╝  ██║  ██    
"  ╚██████╗  ██║  ██║  ██║  ██║   ███████╔╝   ███████     ╚████╔╝   ██║  ██║
"   ╚═════╝  ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝     ╚═══╝     ╚═╝  ╚═╝  
"  JSONDB inside
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
*/

// importing cradova helper scripts

import { frag } from "./scripts/widget.js";
import { swipe } from "./scripts/swipe.js";
import { Store } from "./scripts/store.js";
import { Router } from "./scripts/Router.js";
import { Screen } from "./scripts/Screen.js";
import { JSONDB } from "./scripts/JsonDB.js";
import { littleAxios, fetcher } from "./scripts/ajax.js";
import { loadCradovaUICss } from "./scripts/loadCss.js";
import {
  assert,
  animate,
  PromptBeforeLeave,
  css,
  media,
  ls,
  list,
} from "./scripts/fns.js";
import { dispatch, fullScreen } from "./scripts/track.js";
import { uuid } from "./scripts/fns.js";

import { Init } from "./scripts/init.js";

// importing types declarations

import { CradovaElemetType } from "./types.js";

("use strict");

const make = function (txx: any) {
  if (Array.isArray(txx)) {
    txx = txx[0].trim();
  }

  if (!txx) {
    return {
      tag: "div",
      Classes: undefined,
      ID: undefined,
      innerValue: undefined,
    };
  }

  let tag;
  const itemsPurifier = (impure: string, items: Array<String>) => {
    const pureItems = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].includes(impure)) {
        items[i] = items[i].split(impure)[0];
      }
      pureItems.push(items[i]);
    }
    return pureItems;
  };

  let textContent;
  tag = txx.trim()[0] === "|" && "p";
  if (txx.includes("|")) {
    textContent = txx.split("|")[1];
    txx = txx.split("|")[0] && txx.split("|")[0];
  }

  const classes = itemsPurifier("#", txx.split("."));

  const ids = itemsPurifier(".", txx.split("#"));

  if (!tag) {
    tag = classes.shift();
  }
  if (!tag) {
    tag = ids.shift();
  }
  if (!tag) {
    tag = "div";
  }

  if (!txx.includes(".") && !txx.includes("#")) {
    tag = txx;
    ids.length = 0;
    classes.length = 0;
  }

  let ID = ids[1] ? ids[1].trim() : null;
  const className = classes.join(" ");
  let innerValue;
  if (textContent) {
    innerValue = textContent;
  }
  return { tag, className, ID, innerValue };
};

/**
 * Creates new cradova HTML element
 *  @example
 * format for static  _`p| am a p tag`  // or _`p.class| am a p tag` or _`p#id| am a p tag` or _`p.class#id| am a p tag`
 * format for dynamic _(
 *  "p| am a p tag" // or "p.class| am a p tag" or "p#id| am a p tag" or "p.class#id| am a p tag"
 * , {
 * //props like
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * },
 * // place other children here like span
 * _`span| am a span tag like so`, // this is a static child
 * _("span| am a span tag like so", {style: {color: "brown"}}) // this is a dynamic child
 * )
 * @param  {...any} element_initials
 * @returns function | HTMLElement
 *
 *  static elements cannot be given props nor children nor state but dynamic can
 *
 *  and static are useful too
 */

const _: any = (...element_initials: any) => {
  let properties: Record<string, any>,
    childrens: string | any[] = [],
    beforeMount: (self: HTMLElement) => void;

  if (
    typeof element_initials[1] == "object" &&
    !(
      element_initials[1] instanceof HTMLElement && !element_initials[1].tagName
    )
  ) {
    properties = element_initials[1];
    if (properties?.beforeMount) {
      beforeMount = properties["beforeMount"];
    }
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

  if (element_initials[0].raw) {
    // getting the value of static cradova calls
    element_initials[0] = element_initials[0]["raw"][0];
  }
  // verifing the children array

  function identify(element_initials: any) {
    if (typeof element_initials !== "object") {
      element_initials = [element_initials];
    }
    const initials = make(element_initials[0]);
    // TODO: tag debugger
    // const { tag, className, ID, innerValue } = initials;
    // if (tag === "div" && properties?.style?.pp === "o") {
    //   // console.log(properties.beforeMount);
    //   properties.beforeMount();
    // }

    /**
     *
     * --- Cradova Element Initials  ---
     * --------------------------------
     *
     * Note: this element has not been initialised!
     *
     * add to a parent element or call this return fuction
     *
     * .
     */
    return (...incoming: string[] | any[]) => {
      /*
       *
       * --- Cradova Element Initials  ---
       * --------------------------------
       *
       * Note: this element has not been initialised!
       *
       * add to a parent element or call this return fuction
       *
       * .
       */
      let childrens2rd = [],
        props: Record<string, any> = {},
        text;

      for (let i = 0; i < incoming.length; i++) {
        if (
          typeof incoming[i] === "function" ||
          incoming[i] instanceof HTMLElement
          // ||
          // incoming[i].tagName
        ) {
          childrens2rd.push(incoming[i]);
          continue;
        }
        //         if (
        //           !incoming[i]
        //         ) {
        // console.log(incoming[i]);
        //           continue;
        //         }
        //
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
          if (incoming[i].composedPath) {
            continue;
          }
          props = incoming[i];
          continue;
        }
        //
        if (typeof incoming[i] === "string") {
          text = incoming[i];
          continue;
        }
      }

      if (childrens.length) {
        childrens2rd.push(...childrens);
      }

      let element: CradovaElemetType | undefined;

      try {
        element = document.createElement(initials.tag.trim());
      } catch (error) {
        throw new TypeError("cradova err invalid tag given  " + initials.tag);
      }
      if (!element) {
        return;
      }
      if (initials.className) {
        element.className = initials.className.trim();
      }

      if (initials.ID) {
        element.id = initials.ID.trim();
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

        if (element.style[prop] === "" && prop !== "src") {
          element.style[prop] = properties[prop];
          continue;
        }

        if (prop === "class" && typeof properties[prop] === "string") {
          const classes = properties[prop].split(" ");
          for (let i = 0; i < classes.length; i++) {
            if (classes[i]) {
              element.classList.add(classes[i]);
            }
          }
          continue;
        }
        if (prop === "text") {
          element.innerText = properties[prop];
          continue;
        }
        try {
          element[prop] = properties[prop];
        } catch (error) {
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

      if (props && typeof props === "object" && !Array.isArray(props)) {
        for (const prop in props) {
          if (prop === "style") {
            for (const [k, v] of Object.entries(props[prop])) {
              element.style[k] = v;
            }
            continue;
          }
          if (prop === "text" && typeof props[prop] === "string") {
            element.innerText = props[prop];
            continue;
          }
          if (prop === "class" && typeof props[prop] === "string") {
            element.classList.add(props[prop]);
            continue;
          }

          if (prop === "beforeMount") {
            beforeMount = props["beforeMount"];
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
          try {
            element[prop] = props[prop];
          } catch (error) {
            // console.log(element);
            // console.log(props);
            console.error(error);
          }
        }
      }
      if (childrens2rd && childrens2rd[0]) {
        //
        for (let i = 0; i < childrens2rd.length; i++) {
          if (typeof childrens2rd[i] === "function") {
            const child = childrens2rd[i]();
            element.append(child);
            if (child.afterMount) {
              child.afterMount(child);
              child.afterMount = undefined;
            }
            continue;
          }
          if (Array.isArray(childrens2rd[i])) {
            const arrCX: HTMLElement[] | Function[] = childrens2rd[i];
            const arrSET = [];
            for (let p = 0; p < arrCX.length; p++) {
              if (
                !(arrCX[p] instanceof HTMLElement) &&
                typeof arrCX[p] !== "function" &&
                !Array.isArray(arrCX[p])
              ) {
                throw new TypeError(
                  "cradova err invalid children list, should be a html element from cradova  " +
                    arrCX[p]
                );
              }
              arrSET.push(arrCX[p]);
            }
            //
            childrens2rd = [
              ...childrens2rd.slice(0, i + 1),
              ...arrSET,
              ...childrens2rd.slice(i + 1, childrens2rd.length),
            ];
            continue;
          }
          const child = childrens2rd[i];
          element.append(child);
          if (child.afterMount) {
            child.afterMount(child);
            child.afterMount = undefined;
          }
        }
      }
      if (text) {
        element.append(text);
      }
      // TODO: this will be updated to use data-stateid soon
      // spped test still going on
      if (element.stateID) {
        // adding cradova dynamic signature
        element.classList.add("cra_child_doc");
      }

      if (beforeMount) {
        beforeMount(element);
      }

      return element;
    };
  }
  if (typeof element_initials[0] !== "string") {
    return () => "empty cradova call";
  }
  const CradovaElemet: () => HTMLElement | undefined =
    identify(element_initials);
  if (!CradovaElemet) {
    throw new Error(
      "Cradova err invalid element initials  " + element_initials
    );
  }
  return CradovaElemet;
};

Init(_);

/**
 * Create element and get a callback to update their state
 * no need to manage stateIDs
 * ----------------------------------------------------------------
 *
 * @param element_initials
 * @param props
 * @returns
 */

function $(element_initials = "div", props: Record<string, string> = {}) {
  props.stateID = uuid();
  const element = _(element_initials, props);
  return [element, dispatch.bind(null, props.stateID)];
}

const controls = function () {
  const svg = `<svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4.49975 5.625C4.3402 5.6242 4.18282 5.58788 4.03904 5.5187C3.89526 5.44951 3.76869 5.34919 3.6685 5.225L1.03725 2.0375C0.8835 1.84561 0.786745 1.61438 0.758014 1.37017C0.729283 1.12596 0.769733 0.878589 0.874753 0.65625C0.959928 0.463017 1.09892 0.298383 1.27514 0.182014C1.45136 0.0656449 1.65734 0.00245816 1.8685 0H7.131C7.34216 0.00245816 7.54815 0.0656449 7.72437 0.182014C7.90058 0.298383 8.03958 0.463017 8.12475 0.65625C8.22977 0.878589 8.27023 1.12596 8.24149 1.37017C8.21276 1.61438 8.11601 1.84561 7.96226 2.0375L5.331 5.225C5.23082 5.34919 5.10424 5.44951 4.96047 5.5187C4.81669 5.58788 4.65931 5.6242 4.49975 5.625Z" fill="#2c3e50"/>
</svg>
`;
  const icon = (styles: any) => _("div", { ...styles, innerHTML: svg });
  const constr = _(
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
  if (cont) {
    document.body.append(cont);
  }
};

function register(modules: any[]) {
  for (let i = 0; i < modules.length; i++) {
    _[modules[i]] = modules[i];
  }
}

register([
  frag,
  swipe,
  Store,
  Router,
  Screen,
  JSONDB,
  fetcher,
  littleAxios,
  loadCradovaUICss,
  assert,
  animate,
  PromptBeforeLeave,
  css,
  media,
  ls,
  list,
  $,
  controls,
]);

for (const key in _) {
  console.log(key);
}

export default _;
