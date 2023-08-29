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
  @version  3.1.3
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

import { make, makeElement } from "./parts/elements";
import { VJS_params_TYPE } from "./types";

("use strict");

type TemplateType = <E extends HTMLElement>(
  ...element_initials: VJS_params_TYPE<E | HTMLElement>
) => E | HTMLElement | DocumentFragment;

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
  const {
    0: tag,
    1: id,
    2: className,
    3: innerText,
  } = make(element_initials[0] as unknown as string);
  const element = (
    tag ? document.createElement(tag) : new DocumentFragment()
  ) as HTMLElement;
  if (tag) {
    if (className) {
      element.className = className;
    }
    if (id) {
      element.id = id;
    }
    if (innerText) {
      element.innerText = innerText;
    }
    //  DocumentFragment does not have a tag
    element_initials.shift();
  }
  return makeElement(element, element_initials);
};

export * from "./parts/elements";
export * from "./parts/fns";
export { createSignal } from "./parts/createSignal";
export { Router } from "./parts/Router";
export { Screen } from "./parts/Screen";
export { Ajax } from "./parts/ajax";

export default _;
