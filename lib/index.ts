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
  @version  2.1.2
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
import { Init } from "./utils/init";
import { frag } from "./utils/fns";
import { makeElement } from "./utils/tags";
// importing types declarations

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
 * @param  {...any[]} element_initials
 * @returns function - cradova element
 */

const _: any = (...element_initials: any[]) => {
  if (element_initials[0].raw) {
    // @ts-ignore
    element_initials[0] = element_initials["raw"][0];
  }
  if (typeof element_initials[0] !== "string") {
    return frag(element_initials);
  }
  const initials = make(element_initials.shift());
  let props: any = undefined;
  let element: Record<string, any>;
  try {
    element = document.createElement(initials.tag!.trim());
  } catch (error) {
    throw new TypeError(" ✘  Cradova err:  invalid tag given  " + initials.tag);
  }
  if (initials.className) {
    if (props) {
      // @ts-ignore js knows
      props["className"] = initials.className.trim();
    } else {
      props = { className: initials.className.trim() };
    }
  }
  if (initials.ID) {
    if (props) {
      // @ts-ignore js knows
      props["id"] = initials.ID.trim();
    } else {
      props = { id: initials.ID.trim() };
    }
  }
  if (initials.innerValue) {
    if (props) {
      // @ts-ignore js knows
      props["innerText"] = initials.innerValue;
    } else {
      props = { innerText: initials.innerValue };
    }
  }

  return makeElement(element, props, ...element_initials);
};
Init();
export * from "./utils/tags";
export { Ajax } from "./utils/ajax";
export { createSignal } from "./utils/createSignal";
export { dispatch } from "./utils/track";
export { Router } from "./utils/Router";
export { Screen } from "./utils/Screen";

export {
  assert,
  assertOr,
  cradovaAftermountEvent,
  css,
  lazy,
  loop,
  Ref,
  svgNS,
} from "./utils/fns";

export default _;
