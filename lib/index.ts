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
  @version  2.4.0
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
import { makeElement } from "./parts/elements";
import { VJS_params_TYPE } from "./types";

("use strict");
const make = function (txx: string) {
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
  let teak;
  if (!txx.includes("#")) {
    teak = txx.split(".");
    tag = teak.shift();
    if (!tag) {
      tag = "DIV";
    }
    return [tag, undefined, teak.join(" "), innerValue];
  } else {
    if (!txx.includes(".")) {
      teak = txx.split("#");
      tag = teak.shift();
      if (!tag) {
        tag = "DIV";
      }
      if (teak[0].includes(" ")) {
        teak = [teak[0].split(" ")[1]];
      }
      return [tag, teak[0], undefined, innerValue];
    }
  }
  teak = txx.split(".");
  const classes = [];
  const IDs = [];
  tag = !teak[0].includes("#") && teak.shift();
  if (!tag) {
    tag = "DIV";
  }
  for (let i = 0; i < teak.length; i++) {
    if (teak[i].includes("#")) {
      const item = teak[i].split("#");
      IDs.push(item[1]);
      if (i === 0) {
        tag = item[0];
        continue;
      }
      classes.push(item[0]);
      continue;
    }
    classes.push(teak[i]);
  }
  return [tag || "DIV", IDs[0], classes.join(" "), innerValue];
};

type TemplateType = (
  ...element_initials: VJS_params_TYPE<HTMLElement>
) => HTMLElement;

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
 * @param element_initials
 * @returns function - cradova element
 */

const _: TemplateType = (...element_initials) => {
  const initials = make(element_initials.shift() as unknown as string);
  let props: Partial<HTMLElement> | undefined;
  const element: HTMLElement = document.createElement(initials[0] as string);
  if (initials[2]) {
    if (props) {
      props["className"] = initials[2];
    } else {
      props = { className: initials[2] };
    }
  }
  if (initials[1]) {
    if (props) {
      props["id"] = initials[1];
    } else {
      props = { id: initials[1] };
    }
  }
  if (initials[3]) {
    if (props) {
      props["innerText"] = initials[3];
    } else {
      props = { innerText: initials[3] };
    }
  }
  if (element_initials.length === 0) {
    return element;
  }
  // adding the property object to children list
  props && element_initials.push(props);
  return makeElement(element, ...element_initials);
};

export * from "./parts/elements";
export { createSignal } from "./parts/createSignal";
export { Router } from "./parts/Router";
export { Screen } from "./parts/Screen";
export { assert, assertOr, css, lazy, loop, Ref, reference } from "./parts/fns";
export { Ajax } from "./parts/ajax";

export default _;
