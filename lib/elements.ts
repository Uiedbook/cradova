/*! *****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { VJSType, VJS_params_TYPE, VJS_props_TYPE } from "./types";
import { isNode, reference, Rhoda, CradovaEvent, Ref } from "./parts";
import { createSignal } from "./Signal";
import { Router } from "./Router";

export const makeElement = <E extends HTMLElement>(
  element: E & HTMLElement,
  ElementChildrenAndPropertyList: VJS_params_TYPE<E>
) => {
  let props: VJS_props_TYPE = {},
    text: string | number | null = null;
  //? getting children ready
  if (ElementChildrenAndPropertyList.length !== 0) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let child = ElementChildrenAndPropertyList[i];
      // single child lane
      if (typeof child === "function") {
        child = child();
      }
      // Ref as child
      if (child instanceof Ref) {
        child = child.render();
      }

      // appending child
      if (isNode(child)) {
        element.appendChild(child as Node);
        continue;
      }

      // children array
      if (Array.isArray(child)) {
        element.appendChild(Rhoda(child as HTMLElement[]));
        continue;
      }

      // getting innerText
      if (typeof child === "string" || typeof child === "number") {
        text = child;
        continue;
      }

      // getting props
      if (typeof child === "object") {
        props = Object.assign(props, child);
        continue;
      }

      // throw an error
      // ! seems pointless
      // if (typeof child !== "undefined") {
      //   console.error(" ✘  Cradova err:   got", { child });
      //   throw new Error(
      //     "  ✘  Cradova err:  invalid child type: " + "(" + typeof child + ")"
      //   );
      // }
    }
  } else {
    return element;
  }

  //? adding props
  if (typeof props === "object" && element) {
    // adding attributes
    for (const [prop, value] of Object.entries(props)) {
      // adding styles
      if (prop === "style" && typeof value === "object") {
        Object.assign(element.style, value);
        continue;
      }

      if (Array.isArray(value)) {
        // reference
        if (
          prop == "reference" &&
          (value! as unknown[])![0] instanceof reference
        ) {
          ((value! as unknown[])![0] as reference)._appendDomForce(
            (value! as unknown[])![1] as string,
            element
          );
          continue;
        }

        // signal
        if ((value! as unknown[])[0] instanceof createSignal) {
          ((value! as unknown[])![0] as createSignal<{}>).bindRef(
            element as unknown as Ref<unknown>,
            {
              _element_property: prop,
              signalProperty: (value! as unknown[])![1] as string,
            }
          );
          continue;
        }
      }

      // setting onmount event;
      if (prop === "onmount" && typeof props["onmount"] === "function") {
        const ev = () => {
          props.onmount?.apply(element);
          props!["onmount"] = undefined;
        };
        CradovaEvent.addEventListener("onmountEvent", ev);
        continue;
      }

      // data-(s)
      if (prop.includes("data-")) {
        element.setAttribute(prop, value as string);
        continue;
      }

      // aria-(s)
      if (prop.includes("aria-")) {
        element.setAttribute(prop, value as string);
        continue;
      }

      // A tags (the only special tag)
      if (prop === "href" && typeof value === "string") {
        const href = (value || "") as string;
        if (!href.includes("://")) {
          element.addEventListener(
            "click",
            (e: { preventDefault: () => void }) => {
              e.preventDefault();
              Router.navigate(
                (element as unknown as HTMLAnchorElement).pathname
              );
              //! get url hash here and scroll into view
              if (href.includes("#")) {
                // ! needs testing
                const l = href.split("#").at(-1);
                document.getElementById("#" + l)?.scrollIntoView();
              }
            }
          );
        }
        element.setAttribute(prop, value as string);
        continue;
      }

      // for compatibility
      if (
        typeof element.style[prop as unknown as number] !== "undefined" &&
        prop !== "src"
      ) {
        element.style[prop as unknown as number] = value as string;
        // throw new Error("boohoo");
        continue;
      }

      // trying to set other values
      (element as unknown as Record<string, unknown>)[prop] = value;
      // event of error and it checking has been removed, because this happens at runtime
    }
  }
  if (text) {
    element.appendChild(document.createTextNode(text as string));
  }
  return element as E;
};

export const make = function (descriptor: any) {
  if (typeof descriptor !== "string") {
    return [];
  }
  if (Array.isArray(descriptor)) {
    descriptor = descriptor[0];
  }
  let innerValue = "";
  if (descriptor.includes("|")) {
    [descriptor, innerValue] = descriptor.split("|");
    if (!descriptor) {
      return ["P", undefined, undefined, innerValue];
    }
  }
  let tag;
  if (!descriptor.includes("#")) {
    descriptor = descriptor.split(".");
    tag = descriptor.shift();
    if (!tag) {
      tag = "DIV";
    }
    return [tag, undefined, descriptor.join(" "), innerValue];
  } else {
    if (!descriptor.includes(".")) {
      descriptor = descriptor.split("#");
      tag = descriptor.shift();
      if (!tag) {
        tag = "DIV";
      }
      if (descriptor[0].includes(" ")) {
        descriptor = [descriptor[0].split(" ")[1]];
      }
      return [tag, descriptor[0], undefined, innerValue];
    }
  }
  descriptor = descriptor.split(".");
  const classes = [];
  const IDs = [];
  tag = !descriptor[0].includes("#") && descriptor.shift();
  if (!tag) {
    tag = "DIV";
  }
  for (let i = 0; i < descriptor.length; i++) {
    if (descriptor[i].includes("#")) {
      const item = descriptor[i].split("#");
      IDs.push(item[1]);
      if (i === 0) {
        tag = item[0];
        continue;
      }
      classes.push(item[0]);
      continue;
    }
    classes.push(descriptor[i]);
  }
  return [tag, IDs[0], classes.join(" "), innerValue];
};

const cra = <E extends HTMLElement>(tag: string) => {
  const extend = (...Children_and_Properties: VJSType<E>[]): E =>
    makeElement<E>(document.createElement(tag) as E, Children_and_Properties);
  return extend as VJSType<E>;
};

export const a = cra<HTMLAnchorElement>("a");
// export const area = cra<HTMLAreaElement>("area");
export const article = cra<HTMLElement>("article");
// export const aside = cra<HTMLElement>("aside");
export const audio = cra<HTMLAudioElement>("audio");
// export const b = cra<HTMLElement>("b");
// export const base = cra<HTMLBaseElement>("base");
// export const blockquote = cra<HTMLElement>("blockquote");
export const br = cra<HTMLBRElement>("br");
export const button = cra<HTMLButtonElement>("button");
export const canvas = cra<HTMLCanvasElement>("canvas");
export const caption = cra<HTMLTableCaptionElement>("caption");
// export const code = cra<HTMLElement>("code");
export const col = cra<HTMLTableColElement>("col");
export const colgroup = cra<HTMLOptGroupElement>("colgroup");
// export const data = cra<HTMLDataElement>("data");
export const datalist = cra<HTMLDataListElement>("datalist");
export const details = cra<HTMLDetailsElement>("details");
export const dialog = cra<HTMLDialogElement>("dialog");
export const div = cra<HTMLDivElement>("div");
export const em = cra<HTMLElement>("em");
export const embed = cra<HTMLEmbedElement>("embed");
export const figure = cra<HTMLElement>("figure");
export const footer = cra<HTMLElement>("footer");
export const form = cra<HTMLFormElement>("form");
export const h1 = cra<HTMLHeadingElement>("h1");
export const h2 = cra<HTMLHeadingElement>("h2");
export const h3 = cra<HTMLHeadingElement>("h3");
export const h4 = cra<HTMLHeadingElement>("h4");
export const h5 = cra<HTMLHeadingElement>("h5");
export const h6 = cra<HTMLHeadingElement>("h6");
export const head = cra<HTMLHeadElement>("head");
export const header = cra<HTMLHeadElement>("header");
export const hr = cra<HTMLHRElement>("hr");
export const i = cra<HTMLLIElement>("i");
export const iframe = cra<HTMLIFrameElement>("iframe");
export const img = cra<HTMLImageElement>("img");
export const input = cra<HTMLInputElement>("input");
export const label = cra<HTMLLabelElement>("label");
// export const legend = cra<HTMLLegendElement>("legend");
export const li = cra<HTMLLIElement>("li");
// export const link = cra<HTMLLinkElement>("link");
export const main = cra<HTMLElement>("main");
// export const menu = cra<HTMLMenuElement>("menu");
export const nav = cra<HTMLElement>("nav");
// export const object = cra<HTMLObjectElement>("object");
export const ol = cra<HTMLOListElement>("ol");
export const optgroup = cra<HTMLOptGroupElement>("optgroup");
export const option = cra<HTMLOptionElement>("option");
export const p = cra<HTMLParagraphElement>("p");
// export const pre = cra<HTMLPreElement>("pre");
export const progress = cra<HTMLProgressElement>("progress");
export const q = cra<HTMLQuoteElement>("q");
export const section = cra<HTMLElement>("section");
export const select = cra<HTMLSelectElement>("select");
export const source = cra<HTMLSourceElement>("source");
export const span = cra<HTMLSpanElement>("span");
export const strong = cra<HTMLElement>("strong");
export const summary = cra<HTMLElement>("summary");
export const table = cra<HTMLTableElement>("table");
export const tbody = cra<HTMLTableColElement>("tbody");
export const td = cra<HTMLTableCellElement>("td");
export const template = cra<HTMLTemplateElement>("template");
export const textarea = cra<HTMLTextAreaElement>("textarea");
export const th = cra<HTMLTableSectionElement>("th");
export const title = cra<HTMLTitleElement>("title");
export const tr = cra<HTMLTableRowElement>("tr");
export const track = cra<HTMLTrackElement>("track");
export const u = cra<HTMLUListElement>("u");
export const ul = cra<HTMLUListElement>("ul");
export const video = cra<HTMLVideoElement>("video");
export const svg = (
  svg: string,
  properties?: VJS_props_TYPE
): HTMLSpanElement => {
  const span = document.createElement("span");
  span.innerHTML = svg;
  return makeElement<HTMLSpanElement>(span, [properties]);
};
export const raw = (html: string): HTMLElement[] => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return Array.from(div.children) as HTMLElement[];
};
