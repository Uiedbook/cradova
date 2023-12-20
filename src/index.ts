/*! *****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
********************************************************************************/

import { make, makeElement } from "./primitives/functions";
import { VJS_params_TYPE } from "./primitives/types";

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
 * _("p.foo.bar#poo.loo");
 *
 * // full example
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

export default _;
export * from "./primitives/classes";
export * from "./primitives/functions";
export * from "./primitives/dom-objects";
