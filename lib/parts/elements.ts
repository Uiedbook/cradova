import { VJSType, VJS_params_TYPE, VJS_props_TYPE } from "../types";
import { dispatch } from "./track";
import { isNode, reference, Rhoda, CradovaEvent, Ref } from "./fns";
import { createSignal } from "./createSignal";
import { Router } from "./Router";

export const makeElement = (
  element: HTMLElement,
  ElementChildrenAndPropertyList: VJS_params_TYPE<HTMLElement>
) => {
  //
  let props: VJS_props_TYPE = {},
    text: string | number | null = null;
  //? getting children ready
  if (ElementChildrenAndPropertyList.length !== 0) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let child = ElementChildrenAndPropertyList[i];
      // single child lane
      if (child instanceof Ref) {
        child = child.render();
      }
      if (typeof child === "function") {
        child = child();
      }
      // appending child
      if (isNode(child)) {
        element.appendChild(child as Node);
        continue;
      }
      // children array
      if (Array.isArray(child)) {
        element.appendChild(Rhoda(child));
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
      if (typeof child !== "undefined") {
        console.error(" ✘  Cradova err:   got", { child });
        throw new Error(
          "  ✘  Cradova err:  invalid child type: " + "(" + typeof child + ")"
        );
      }
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
        for (const [k, v] of Object.entries(value!)) {
          if (
            typeof element.style[k as unknown as number] !== "undefined" &&
            k !== "src"
          ) {
            element.style[k as unknown as number] = v as string;
          } else {
            throw new Error(
              "✘  Cradova err :  " + k + " is not a valid css style property"
            );
          }
        }
        continue;
      }
      // for compatibility
      if (
        typeof element.style[prop as unknown as number] !== "undefined" &&
        prop !== "src"
      ) {
        element.style[prop as unknown as number] = value as string;
        continue;
      }
      // text content
      if (prop === "text" && typeof value === "string" && value !== "") {
        text = value as string;
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
              Router.navigate((element as HTMLAnchorElement).pathname);
            }
          );
        }
        element.setAttribute(prop, value as string);
        continue;
      }

      if (Array.isArray(value)) {
        const clas = value! as unknown[];
        // signal
        if (clas[0] instanceof createSignal) {
          (element as unknown as Record<string, unknown>)["updateState"] =
            dispatch.bind(null, element);
          clas![0].bindRef(element, {
            _element_property: prop,
            signalProperty: clas![1] as string,
          });
          continue;
        }

        // reference
        if (prop == "reference" && clas![0] instanceof reference) {
          (element as unknown as Record<string, unknown>)["updateState"] =
            dispatch.bind(null, element);
          clas![0]._appendDom(clas![1] as string, element);
          continue;
        }
      }

      // setting onmount event;
      if (prop === "onmount" && typeof props["onmount"] === "function") {
        props!["onmount"] = undefined;
        const ev = () => {
          props.onmount?.apply(element);
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
      // trying to set other values
      (element as unknown as Record<string, unknown>)[prop] = value;
      // event of error and it checking has been removed, because this happens at runtime
    }
  }
  if (text) {
    element.appendChild(document.createTextNode(text as string));
  }
  return element;
};

const cra: any = (element_initials: string) => {
  return (...initials: VJSType<HTMLElement>[]) => {
    return makeElement(document.createElement(element_initials), initials);
  };
};

export const a: VJSType<HTMLAnchorElement> = cra("a");
export const abbr: VJSType<HTMLElement> = cra("abbr");
export const address: VJSType<HTMLElement> = cra("address");
export const area: VJSType<HTMLAreaElement> = cra("area");
export const article: VJSType<HTMLElement> = cra("article");
export const aside: VJSType<HTMLElement> = cra("aside");
export const audio: VJSType<HTMLAudioElement> = cra("audio");
export const b: VJSType<HTMLElement> = cra("b");
export const base: VJSType<HTMLBaseElement> = cra("base");
export const bdi: VJSType<HTMLElement> = cra("bdi");
export const bdo: VJSType<HTMLElement> = cra("bdo");
export const blockquote: VJSType<HTMLElement> = cra("blockquote");
export const body: VJSType<HTMLBodyElement> = cra("body");
export const br: VJSType<HTMLBRElement> = cra("br");
export const button: VJSType<HTMLButtonElement> = cra("button");
export const canvas: VJSType<HTMLCanvasElement> = cra("canvas");
export const caption: VJSType<HTMLTableCaptionElement> = cra("caption");
export const cite: VJSType<HTMLElement> = cra("cite");
export const code: VJSType<HTMLElement> = cra("code");
export const col: VJSType<HTMLTableColElement> = cra("col");
export const colgroup: VJSType<HTMLElement> = cra("colgroup");
export const data: VJSType<HTMLDataElement> = cra("data");
export const datalist: VJSType<HTMLDataListElement> = cra("datalist");
export const dd: VJSType<HTMLElement> = cra("dd");
export const del: VJSType<HTMLElement> = cra("del");
export const details: VJSType<HTMLDetailsElement> = cra("details");
export const dfn: VJSType<HTMLElement> = cra("dfn");
export const dialog: VJSType<HTMLDialogElement> = cra("dialog");
export const div: VJSType<HTMLDivElement> = cra("div");
export const dl: VJSType<HTMLElement> = cra("dl");
export const dt: VJSType<HTMLElement> = cra("dt");
export const em: VJSType<HTMLElement> = cra("em");
export const embed: VJSType<HTMLEmbedElement> = cra("embed");
export const fieldset: VJSType<HTMLFieldSetElement> = cra("fieldset");
export const figcaption: VJSType<HTMLElement> = cra("figcaption");
export const figure: VJSType<HTMLElement> = cra("figure");
export const footer: VJSType<HTMLElement> = cra("footer");
export const form: VJSType<HTMLFormElement> = cra("form");
export const h1: VJSType<HTMLHeadingElement> = cra("h1");
export const h2: VJSType<HTMLHeadingElement> = cra("h2");
export const h3: VJSType<HTMLHeadingElement> = cra("h3");
export const h4: VJSType<HTMLHeadingElement> = cra("h4");
export const h5: VJSType<HTMLHeadingElement> = cra("h5");
export const h6: VJSType<HTMLHeadingElement> = cra("h6");
export const head: VJSType<HTMLHeadElement> = cra("head");
export const header: VJSType<HTMLElement> = cra("header");
export const hr: VJSType<HTMLHRElement> = cra("hr");
export const html: VJSType<HTMLHtmlElement> = cra("html");
export const i: VJSType<HTMLElement> = cra("i");
export const iframe: VJSType<HTMLIFrameElement> = cra("iframe");
export const img: VJSType<HTMLImageElement> = cra("img");
export const input: VJSType<HTMLInputElement> = cra("input");
export const ins: VJSType<HTMLElement> = cra("ins");
export const kbd: VJSType<HTMLElement> = cra("kbd");
export const label: VJSType<HTMLLabelElement> = cra("label");
export const legend: VJSType<HTMLLegendElement> = cra("legend");
export const li: VJSType<HTMLLIElement> = cra("li");
export const link: VJSType<HTMLLinkElement> = cra("link");
export const main: VJSType<HTMLElement> = cra("main");
export const map: VJSType<HTMLMapElement> = cra("map");
export const mark: VJSType<HTMLElement> = cra("mark");
export const math: VJSType<HTMLElement> = cra("math");
export const menu: VJSType<HTMLMenuElement> = cra("menu");
export const meta: VJSType<HTMLMetaElement> = cra("meta");
export const meter: VJSType<HTMLMeterElement> = cra("meter");
export const nav: VJSType<HTMLElement> = cra("nav");
// export const noscript: VJSType<HTMLElement> = cra("noscript");
export const object: VJSType<HTMLObjectElement> = cra("object");
export const ol: VJSType<HTMLOListElement> = cra("ol");
export const optgroup: VJSType<HTMLOptGroupElement> = cra("optgroup");
export const option: VJSType<HTMLOptionElement> = cra("option");
export const output: VJSType<HTMLOutputElement> = cra("output");
export const p: VJSType<HTMLParagraphElement> = cra("p");
export const picture: VJSType<HTMLPictureElement> = cra("picture");
export const portal: VJSType<HTMLElement> = cra("portal");
export const pre: VJSType<HTMLPreElement> = cra("pre");
export const progress: VJSType<HTMLProgressElement> = cra("progress");
export const q: VJSType<HTMLQuoteElement> = cra("q");
export const rp: VJSType<HTMLElement> = cra("rp");
export const rt: VJSType<HTMLElement> = cra("rt");
export const ruby: VJSType<HTMLElement> = cra("ruby");
export const s: VJSType<HTMLElement> = cra("s");
export const samp: VJSType<HTMLElement> = cra("samp");
export const script: VJSType<HTMLScriptElement> = cra("script");
export const section: VJSType<HTMLElement> = cra("section");
export const select: VJSType<HTMLSelectElement> = cra("select");
export const slot: VJSType<HTMLSlotElement> = cra("slot");
export const small: VJSType<HTMLElement> = cra("small");
export const source: VJSType<HTMLSourceElement> = cra("source");
export const span: VJSType<HTMLSpanElement> = cra("span");
export const strong: VJSType<HTMLElement> = cra("strong");
export const style: VJSType<HTMLStyleElement> = cra("style");
export const sub: VJSType<HTMLElement> = cra("sub");
export const summary: VJSType<HTMLElement> = cra("summary");
export const sup: VJSType<HTMLElement> = cra("sup");
export const table: VJSType<HTMLTableElement> = cra("table");
export const tbody: VJSType<HTMLTableColElement> = cra("tbody");
export const td: VJSType<HTMLTableCellElement> = cra("td");
export const template: VJSType<HTMLTemplateElement> = cra("template");
export const textarea: VJSType<HTMLTextAreaElement> = cra("textarea");
export const tfoot: VJSType<HTMLElement> = cra("tfoot");
export const th: VJSType<HTMLTableSectionElement> = cra("th");
export const thead: VJSType<HTMLTableSectionElement> = cra("thead");
export const time: VJSType<HTMLTimeElement> = cra("time");
export const title: VJSType<HTMLTitleElement> = cra("title");
export const tr: VJSType<HTMLTableRowElement> = cra("tr");
export const track: VJSType<HTMLTrackElement> = cra("track");
export const u: VJSType<HTMLElement> = cra("u");
export const ul: VJSType<HTMLUListElement> = cra("ul");
export const val: VJSType<HTMLElement> = cra("val");
export const video: VJSType<HTMLVideoElement> = cra("video");
export const wbr: VJSType<HTMLElement> = cra("wbr");
