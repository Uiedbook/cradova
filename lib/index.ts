/*
============================================================================="

    ██████╗   ██████╗    █████═╗   ███████╗    ███████╗    ██╗   ██╗  █████╗   
   ██╔════╝   ██╔══██╗  ██╔═╗██║   █      ██  ██╔═════╝█   ██║   ██║  ██╔═╗██  
   ██║        ██████╔╝  ███████║   █      ██  ██║     ██   ██║   ██║  ██████╗  
   ██║        ██╔══██╗  ██║  ██║   █      ██  ██║     ██   ╚██╗ ██╔╝  ██║  ██╗ 
   ╚██████╗   ██║  ██║  ██║  ██║   ███████╔╝   ████████      ╚███╔╝   ██║  ██║ 
    ╚═════╝   ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝        ╚══╝    ╚═╝  ╚═╝ 

=============================================================================
=============================================================================
  
  Cradova FrameWork
  @version 1.3.0
  License: Apache V2
  
  -----------------------------------------------------------------------------

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
  -----------------------------------------------------------------------------
*/

// importing cradova scripts
export { Screen } from "./scripts/Screen";
export { Router } from "./scripts/Router";
export { dispatch } from "./scripts/track";
import { dispatch } from "./scripts/track";
export { createSignal } from "./scripts/createSignal";
export { simpleStore as $ } from "./scripts/simplestore";
import { simpleStore } from "./scripts/simplestore";
export { Ajax } from "./scripts/ajax";
export { loadCradovaUICss } from "./sacho/loadCss";
// export { IsElementInView } from "./scripts/utils";

export {
  assert,
  assertOr,
  css,
  frag,
  ls,
  Ref,
  cradovaAftermountEvent,
} from "./scripts/fns";
import { Init } from "./scripts/init";

// importing types declarations

import { CradovaElementType } from "./types";

("use strict");

const make = function (txx: any) {
  if (!txx) {
    return {
      tag: "div",
    };
  }
  let tag;
  let innerValue: string = "";
  if (txx.includes("|")) {
    const tc = txx.split("|");
    innerValue = tc[1];
    txx = tc[0] && tc[0];
  }
  const itemsPurifier = () => {
    if (!txx.includes("#")) {
      txx = txx.split(".") as any;
      tag = txx[0];
      if (tag) {
        txx.shift();
      } else {
        tag = "div";
      }
      return [txx, []];
    } else {
      if (!txx.includes(".")) {
        txx = txx.split("#") as any;
        tag = txx[0];
        if (tag) {
          txx.shift();
        } else {
          tag = "div";
        }
        if (txx[0].includes(" ")) {
          txx = [txx[0].split(" ")[1]];
        }
        return [[], txx];
      }
    }
    txx = txx.split(".") as any;
    const pureItems = [];
    const impureItems = [];
    tag = !txx[0].includes("#") && txx[0];
    if (tag) {
      txx.shift();
    }
    for (let i = 0; i < txx.length; i++) {
      if (txx[i].includes("#")) {
        const item = txx[i].split("#");
        impureItems.push(item[1]);
        if (i === 0) {
          tag = item[0];
          continue;
        }
        pureItems.push(item[0]);
        continue;
      }
      pureItems.push(txx[i]);
    }
    if (!tag) {
      tag = "div";
    }
    return [pureItems, impureItems];
  };

  const [classes, ids] = itemsPurifier() as any;
  const ID = ids && ids[0];
  const className = classes && classes.join(" ");
  return { tag, className, ID, innerValue };
};

/**
 * Cradova
 * ---
 * Creates new cradova HTML element
 *  @example
 * // using template
 * const p = _("p");
 * _("p.class");
 * _("p#id");
 * _("p.class#id");
 * _("p.foo.bar#poo.loo");
 *
 * // using inline props
 *
 * _("p",{
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * })
 * // or no style props it works!
 * _("p",{
 * text: "am a p tag",
 * color: "blue"
 * })
 *
 * // props and children
 * _("p", // template first
 *  // property next if wanted
 *  {style: {color: "brown"}, // optional
 *  // the rest should be children or text
 * _("span", " am a span tag text like so"),
 * ...
 * )
 *
 * // list of children
 * _("p",
 * // all children goes after
 * _("span",
 * {
 * text:" am a span tag like so",
 *  color: "brown",
 * }),
 * ...
 * )
 *
 * @param  {...any[]} element_initials
 * @returns function - cradova element
 */

const _: any = (...element_initials: any[]) => {
  //
  if (element_initials[0].raw) {
    // getting the value of static cradova calls
    element_initials[0] = element_initials[0]["raw"][0];
  }
  if (typeof element_initials[0] !== "string") {
    console.error(" ✘  Cradova err: NO TEMPLATE STRING PROVIDED");
    return () => " ✘ NO TEMPLATE STRING PROVIDED";
  }
  let beforeMount: ((this: CradovaElementType) => void) | null = null,
    firstLevelChildren: any[] = [];
  if (element_initials.length > 1) {
    firstLevelChildren = element_initials.splice(1);
  }

  if (typeof element_initials !== "object") {
    element_initials = [element_initials];
  }

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
  return (...incoming: any) => {
    // TODO: tag debugger
    const initials = make(element_initials[0]);
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
    let secondLevelChildren = [],
      props: Record<string, any> | null = null,
      text: string | number | null = null;

    if (firstLevelChildren.length) {
      // ! performance cost here maybe
      secondLevelChildren.push(...firstLevelChildren);
    }

    if (incoming.length) {
      // ! performance cost here maybe
      secondLevelChildren.push(...incoming);
    }

    let element: CradovaElementType;
    try {
      element = document.createElement(initials.tag!.trim());
    } catch (error) {
      throw new TypeError(
        " ✘  Cradova err:  invalid tag given  " + initials.tag
      );
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
    // getting children ready
    if (secondLevelChildren.length) {
      for (let i = 0; i < secondLevelChildren.length; i++) {
        // single child lane
        if (typeof secondLevelChildren[i] === "function") {
          let child = secondLevelChildren[i]();
          if (typeof child === "function") {
            child = child();
          }
          try {
            if (
              child instanceof HTMLElement ||
              child instanceof DocumentFragment
            ) {
              element.appendChild(child);
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
        // html child
        if (
          secondLevelChildren[i] instanceof HTMLElement ||
          secondLevelChildren[i] instanceof DocumentFragment
        ) {
          element.appendChild(secondLevelChildren[i]);
          continue;
        }
        // children array
        if (Array.isArray(secondLevelChildren[i])) {
          const arrCX: HTMLElement[] | Function[] = secondLevelChildren[i];
          const arrCXLength = arrCX.length;
          const arrSET = [];
          for (let p = 0; p < arrCXLength; p++) {
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
          secondLevelChildren = [
            ...secondLevelChildren.slice(0, i + 1),
            ...arrSET,
            ...secondLevelChildren.slice(i + 1, secondLevelChildren.length),
          ];
          continue;
        }
        const child = secondLevelChildren[i];
        if (child instanceof HTMLElement || child instanceof DocumentFragment) {
          element.appendChild(child);
        } else {
          // getting props
          if (
            typeof child === "object" &&
            !Array.isArray(child) &&
            !(child instanceof HTMLElement)
          ) {
            if (!props) {
              props = child;
            } else {
              const po = child as any;
              for (const p in po) {
                props[p] = po[p];
              }
            }
            continue;
          }
          //
          if (typeof child === "string") {
            text = child;
            continue;
          }

          if (typeof child === "string" || typeof child === "number") {
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

    if (props) {
      if (props.beforeMount) {
        beforeMount = props["beforeMount"];
        // props["beforeMount"] = undefined;
      }
      // adding attributes
      for (const prop in props) {
        // adding styles
        if (prop === "style" && typeof props[prop] === "object") {
          for (const [k, v] of Object.entries(props[prop])) {
            if (typeof element.style[k] !== "undefined" && k !== "src") {
              element.style[k] = v;
            } else {
              throw new Error(
                "✘  Cradova err :  " + k + " is not a valid css style property"
              );
            }
          }
          continue;
        }
        // adding styles that appears as normal props
        if (typeof element.style[prop] !== "undefined" && prop !== "src") {
          element.style[prop] = props[prop];
          continue;
        }
        // text content
        if (
          prop === "text" &&
          (typeof props[prop] === "string" ||
            typeof props[prop] === "number") &&
          props[prop] !== ""
        ) {
          text = props[prop];
          continue;
        }
        // class name
        if (
          prop === "class" &&
          typeof props[prop] === "string" &&
          props[prop] !== ""
        ) {
          element.classList.add(props[prop]);
          continue;
        }
        // before mount event
        if (prop === "beforeMount") {
          beforeMount = props["beforeMount"];
          continue;
        }
        // setting state id
        if (prop === "stateID") {
          element.setAttribute("data-cra-id", props[prop]);
          continue;
        }
        // setting data attribute
        if (prop.includes("$")) {
          element.setAttribute("data-" + prop.split("$")[1], props[prop]);
          continue;
        }
        if (
          Array.isArray(props[prop]) &&
          props[prop][0] instanceof simpleStore
        ) {
          element.updateState = dispatch.bind(null, element);
          props[prop][0].bindRef(element, prop, props[prop][1]);
          continue;
        }
        // setting should update state key;
        if (prop === "shouldUpdate" && props[prop] === true) {
          element.updateState = dispatch.bind(null, element);
          continue;
        }

        // setting afterMount event;
        if (
          prop === "afterMount" &&
          typeof props["afterMount"] === "function"
        ) {
          const av = () => {
            props!["afterMount"].apply(element);
            window.removeEventListener("cradova-aftermount", av);
          };
          window.addEventListener("cradova-aftermount", av);
          continue;
        }
        // trying to set other values
        try {
          if (typeof element[prop] !== "undefined") {
            element[prop] = props[prop];
          } else {
            element[prop] = props[prop];

            if (
              prop !== "for" &&
              prop !== "text" &&
              prop !== "class" &&
              !prop.includes("aria")
            ) {
              console.error(" ✘  Cradova err:  invalid html attribute " + prop);
            }
          }
        } catch (error) {
          console.error(" ✘  Cradova err: Cradova got ", props);
          console.error(" ✘  Cradova err:  ", error);
        }
      }
    }
    //
    if (text) {
      element.innerText = text;
    }
    if (typeof beforeMount === "function") {
      beforeMount.apply(element);
    }
    return element;
  };
};
Init();
export default _;
