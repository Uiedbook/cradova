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
  @version  2.3.0
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
// import { frag } from "./utils/fns";
import { makeElement } from "./utils/tags";
// importing types declarations

("use strict");

const make = function (txx: any) {
  if (!txx.length) {
    return ["DIV"];
  }
  if (Array.isArray(txx)) {
    txx = txx[0];
  }
  let innerValue = "";
  if (txx.includes("|")) {
    [txx, innerValue] = txx.split("|");
    if (!txx) {
      return ["P", undefined, undefined, innerValue];
    }
  }
  let tag;
  if (!txx.includes("#")) {
    txx = txx.split(".");
    tag = txx.shift();
    if (!tag) {
      tag = "DIV";
    }
    return [tag, undefined, txx.join(" "), innerValue];
  } else {
    if (!txx.includes(".")) {
      txx = txx.split("#");
      tag = txx.shift();
      if (!tag) {
        tag = "DIV";
      }
      if (txx[0].includes(" ")) {
        txx = [txx[0].split(" ")[1]];
      }
      return [tag, txx[0], undefined, innerValue];
    }
  }
  txx = txx.split(".");
  const classes = [];
  const IDs = [];
  tag = !txx[0].includes("#") && txx.shift();
  if (!tag) {
    tag = "DIV";
  }
  for (let i = 0; i < txx.length; i++) {
    if (txx[i].includes("#")) {
      const item = txx[i].split("#");
      IDs.push(item[1]);
      if (i === 0) {
        tag = item[0];
        continue;
      }
      classes.push(item[0]);
      continue;
    }
    classes.push(txx[i]);
  }
  return [tag || "DIV", IDs[0], classes.join(" "), innerValue];
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
  const initials = make(element_initials.shift());

  let props: any = undefined;
  let element: Record<string, any>;
  try {
    element = document.createElement(initials[0]);
  } catch (error) {
    throw new TypeError(" ✘  Cradova err:  invalid tag given  " + initials[0]);
  }
  if (initials[2]) {
    if (props) {
      // @ts-ignore js knows
      props["className"] = initials[2];
    } else {
      props = { className: initials[2] };
    }
  }
  if (initials[1]) {
    if (props) {
      // @ts-ignore js knows
      props["id"] = initials[1];
    } else {
      props = { id: initials[1] };
    }
  }
  if (initials[3]) {
    if (props) {
      // @ts-ignore js knows
      props["innerText"] = initials[3];
    } else {
      props = { innerText: initials[3] };
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
  CradovaEvent,
  css,
  lazy,
  loop,
  Ref,
  svgNS,
  reference,
} from "./utils/fns";

export default _;
