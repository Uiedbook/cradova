/* eslint-disable no-undef */
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
*/

// importing cradova helper scripts

export { swipe } from "./sacho/swipe";
export { Signal as createSignal } from "./scripts/createSignal";
export { Router } from "./scripts/Router";
export { Screen } from "./scripts/Screen";
export { Scaffold } from "./scripts/Scaffold";
export { dispatch } from "./scripts/track";
export { Ajax } from "./scripts/ajax";
export { IsElementInView } from "./scripts/utils";

export {
  frag,
  fullScreen,
  assert,
  uuid,
  animate,
  controls,
  PromptBeforeLeave,
  RefElement,
  css,
  media,
  ls,
  Ref,
  RefList,
  assertOr,
} from "./scripts/fns";

import { Init } from "./scripts/init";

// importing types declarations

import { CradovaElementType } from "./types";

("use strict");

const make = function (txx: any) {
  if (Array.isArray(txx)) {
    txx = txx[0].trim();
  }

  if (!txx) {
    return {
      tag: "div",
    };
  }

  let tag;
  const itemsPurifier = (impure: string, pure: string, items: any) => {
    if (!items.includes(pure)) return [];
    const pureItems = [];
    items = items.split(pure);
    for (let i = 0; i < items.length; i++) {
      if (items[i].includes(impure)) {
        items[i] = items[i].split(impure)[0];
      }
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

  if (typeof tag !== "string") {
    tag = classes.shift();
  }
  if (typeof tag !== "string") {
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

  const ID = ids[1] ? ids[1].trim() : null;
  const className = classes.join(" ");
  return { tag, className, ID, innerValue };
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
      typeof element_initials[1] === "function" ||
      typeof element_initials[1] === "string"
    ) {
      childrens = element_initials.slice(1, element_initials.length);
    }
  }

  if (element_initials[0].raw) {
    // getting the value of static cradova calls
    element_initials[0] = element_initials[0]["raw"][0];
  }
  // verifying the children array

  function identify(element_initials: any) {
    if (typeof element_initials !== "object") {
      element_initials = [element_initials];
    }

    const initials = make(element_initials[0]);
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
     */
    return (...incoming: string[] | any[]) => {
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
       */
      let childrens2rd = [],
        props: Record<string, any> = {},
        text;

      for (let i = 0; i < incoming.length; i++) {
        if (
          typeof incoming[i] === "function" ||
          incoming[i] instanceof HTMLElement
        ) {
          childrens2rd.push(incoming[i]);
          continue;
        }

        if (!Array.isArray(incoming[i]) && typeof incoming[i] === "object") {
          if (incoming[i].beforeMount) {
            beforeMount = incoming[i]["beforeMount"];
            incoming[i]["beforeMount"] = undefined;
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
      // @ts-ignore
      incoming = undefined;

      if (childrens.length) {
        childrens2rd.push(...childrens);
      }

      let element: CradovaElementType | undefined;
      try {
        element = document.createElement(initials.tag.trim());
      } catch (error) {
        throw new TypeError(
          " ✘  Cradova err:  invalid tag given  " + initials.tag
        );
      }
      if (!element) {
        return;
      }
      if (initials.className) {
        element.className = initials.className.trim();
      }

      if (initials.ID) {
        element.setAttribute("id", initials.ID.trim());
      }
      if (initials.innerValue) {
        element.innerText = initials.innerValue;
      }
      for (const prop in properties) {
        if (prop === "style" && typeof properties[prop] === "object") {
          for (const [k, v] of Object.entries(properties[prop])) {
            if (element.style[k] === "" && k !== "src") {
              element.style[k] = v;
            } else {
              throw new Error(
                "✘  Cradova err :  " + k + " is not a valid css style property"
              );
            }
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
          text = properties[prop];
          continue;
        }
        try {
          element[prop] = properties[prop];
        } catch (error) {
          console.error(
            " ✘  Cradova err:  cradova got ",
            properties[prop],
            "   which is invalid!"
          );
          throw new Error(
            " ✘  Cradova err:  invalid props  " +
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
          if (prop === "style" && typeof props[prop] === "object") {
            for (const [k, v] of Object.entries(props[prop])) {
              if (typeof element.style[k] !== "undefined" && k !== "src") {
                element.style[k] = v;
              } else {
                throw new Error(
                  "✘  Cradova err :  " +
                    k +
                    " is not a valid css style property"
                );
              }
            }
            continue;
          }
          if (element.style[prop] === "" && prop !== "src") {
            element.style[prop] = props[prop];
            continue;
          }
          if (prop === "text" && typeof props[prop] === "string") {
            text = props[prop];
            continue;
          }
          if (prop === "class" && typeof props[prop] === "string") {
            element.classList.add(props[prop]);
            continue;
          }

          if (prop === "beforeMount") {
            beforeMount = props["beforeMount"];
            props["beforeMount"] = undefined;
            continue;
          }

          try {
            element[prop] = props[prop];
          } catch (error) {
            console.error(" ✘  Cradova err:  ", error);
          }
        }
      }
      // getting children ready
      if (childrens2rd.length) {
        for (let i = 0; i < childrens2rd.length; i++) {
          // single child lane
          if (typeof childrens2rd[i] === "function") {
            let child = childrens2rd[i]();
            if (typeof child === "function") {
              child = child();
            }
            try {
              if (child) {
                element.append(child);
              }
              if (child && child.afterMount) {
                child.afterMount(child);
                child.afterMount = undefined;
              }
            } catch (error) {
              console.error(" ✘  Cradova err:  ", error);
              if (!(child instanceof HTMLElement)) {
                throw new Error(
                  "  ✘  Cradova err:  invalid child type: " +
                    child +
                    " (" +
                    typeof child +
                    ")"
                );
              }
            }
            continue;
          }
          // children array
          if (Array.isArray(childrens2rd[i])) {
            const arrCX: HTMLElement[] | Function[] = childrens2rd[i];
            const arrCXLenght = arrCX.length;
            const arrSET = [];
            for (let p = 0; p < arrCXLenght; p++) {
              if (
                !(arrCX[p] instanceof HTMLElement) &&
                typeof arrCX[p] !== "function" &&
                !Array.isArray(arrCX[p])
              ) {
                console.error(" ✘  Cradova err:  ", arrCX[p]);
                throw new TypeError(
                  " ✘  Cradova err: invalid tag type or template literal, cradova was enable to create this element show above ⇑"
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
          if (
            child instanceof HTMLElement ||
            child instanceof DocumentFragment
          ) {
            element.append(child);
            // @ts-ignore
            if (child.afterMount) {
              // @ts-ignore
              child.afterMount(child);
              // @ts-ignore
              child.afterMount = undefined;
            }
          } else {
            if (typeof child === "string") {
              text = child;
            } else {
              console.error(" ✘  Cradova err:   got", child);
              throw new Error(
                "  ✘  Cradova err:  invalid child type: " +
                  "(" +
                  typeof child +
                  ")"
              );
            }
          }
        }
      }
      //
      if (text) {
        element.innerText = text;
      }
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
    console.error(" ✘  Cradova err: NO TEMPLATE STRING PROVIDED");
    return () => "NO TEMPLATE STRING PROVIDED";
  }
  // const CradovaElement: () => HTMLElement | undefined =
  //   identify(element_initials);
  // if (!CradovaElement) {
  //   throw new Error(
  //     " ✘  Cradova err:  invalid element initials  " + element_initials
  //   );
  // }
  // return CradovaElement;
  return identify(element_initials);
};

Init();

export default _;
