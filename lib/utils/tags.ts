import { ElementType } from "../types";
import { dispatch } from "./track";
import { isNode, reference, Rhoda, CradovaEvent } from "./fns";
import { createSignal } from "./createSignal";
import { Router } from "./Router";

export const makeElement = (
  element: Record<string, any>,
  ...ElementChildrenAndPropertyList: ElementType<HTMLElement>[]
) => {
  let beforeMount: ((this: any) => void) | null = null;
  let props: Record<string, any> | null = null,
    text: string | number | null = null;

  //? getting children ready
  if (ElementChildrenAndPropertyList.length) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let child = ElementChildrenAndPropertyList[i] as any;
      // single child lane
      if (typeof child === "function") {
        child = child() as any;
        if (typeof child === "function") {
          child = child() as any;
        }
      }
      // appending child
      try {
        if (isNode(child)) {
          element.appendChild(child);
          continue;
        }
      } catch (error) {
        console.log(element, ElementChildrenAndPropertyList);
        console.log(error);
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
        if (!props) {
          props = child;
        } else {
          props = Object.assign(props, child);
        }
        continue;
      }
      // throw an error
      if (typeof child !== "undefined") {
        // throw an error
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
      // for compatibility
      if (typeof element.style[prop] !== "undefined" && prop !== "src") {
        element.style[prop] = props[prop];
        continue;
      }
      // text content
      if (
        prop === "text" &&
        typeof props[prop] === "string" &&
        props[prop] !== ""
      ) {
        text = props[prop];
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
        props[prop][0] instanceof createSignal
      ) {
        element.updateState = dispatch.bind(null, element);
        props[prop][0].bindRef(element, {
          _element_property: prop,
          signalProperty: props[prop][1],
        });
        continue;
      }

      // reference

      if (
        prop == "reference" &&
        Array.isArray(props[prop]) &&
        props[prop][0] instanceof reference
      ) {
        element.updateState = dispatch.bind(null, element);
        props[prop][0]._appendDom(props[prop][1], element);
        continue;
      }

      // setting should update state key;
      if (prop === "shouldUpdate" && props[prop] === true) {
        element.updateState = dispatch.bind(undefined, element);
        continue;
      }

      // setting afterMount event;
      if (prop === "afterMount" && typeof props["afterMount"] === "function") {
        const avi = () => {
          props!["afterMount"].apply(element);
          CradovaEvent.removeEventListener("cradovaAftermountEvent", avi);
        };
        CradovaEvent.addEventListener("cradovaAftermountEvent", avi);
        continue;
      }
      // trying to set other values
      try {
        if (typeof element[prop] !== "undefined") {
          element[prop] = props[prop];
        } else {
          if (prop.includes("data-")) {
            element.setAttribute(prop, props[prop]);
            continue;
          }
          element[prop] = props[prop];
          if (
            prop !== "for" &&
            prop !== "text" &&
            prop !== "class" &&
            prop !== "tabindex" &&
            prop !== "disabled" &&
            !prop.includes("aria")
          ) {
            console.warn(" ✘  Cradova err:  invalid html attribute ", {
              prop,
            });
          } else {
            continue;
          }
        }
      } catch (error) {
        console.error(" ✘  Cradova err: invalid html attribute ", { props });
        console.error(" ✘  Cradova err:  ", error);
      }
    }
  }
  if (text) {
    element.appendChild(document.createTextNode(text as string));
  }
  if (typeof beforeMount === "function") {
    beforeMount.apply(element);
  }
  // adding click event to a tags
  if (element.tagName === "A" && window) {
    if (element.href.includes(window.location.origin)) {
      element.addEventListener("click", (e: any) => {
        e.preventDefault();
        Router.navigate(element.pathname);
      });
    }
  }
  return element;
};

const cra: any = (element_initials: string) => {
  return (...bo: any[]) => {
    return makeElement(
      document.createElement(element_initials) as Record<string, any>,
      ...bo
    );
  };
};
export const a: ElementType<HTMLAnchorElement> = cra("a");
export const abbr: ElementType<HTMLElement> = cra("abbr");
export const address: ElementType<HTMLElement> = cra("address");
export const area: ElementType<HTMLAreaElement> = cra("area");
export const article: ElementType<HTMLElement> = cra("article");
export const aside: ElementType<HTMLElement> = cra("aside");
export const audio: ElementType<HTMLAudioElement> = cra("audio");
export const b: ElementType<HTMLElement> = cra("b");
export const base: ElementType<HTMLBaseElement> = cra("base");
export const bdi: ElementType<HTMLElement> = cra("bdi");
export const bdo: ElementType<HTMLElement> = cra("bdo");
export const blockquote: ElementType<HTMLElement> = cra("blockquote");
export const body: ElementType<HTMLBodyElement> = cra("body");
export const br: ElementType<HTMLBRElement> = cra("br");
export const button: ElementType<HTMLButtonElement> = cra("button");
export const canvas: ElementType<HTMLCanvasElement> = cra("canvas");
export const caption: ElementType<HTMLTableCaptionElement> = cra("caption");
export const cite: ElementType<HTMLElement> = cra("cite");
export const code: ElementType<HTMLElement> = cra("code");
export const col: ElementType<HTMLTableColElement> = cra("col");
export const colgroup: ElementType<HTMLElement> = cra("colgroup");
export const data: ElementType<HTMLDataElement> = cra("data");
export const datalist: ElementType<HTMLDataListElement> = cra("datalist");
export const dd: ElementType<HTMLElement> = cra("dd");
export const del: ElementType<HTMLElement> = cra("del");
export const details: ElementType<HTMLDetailsElement> = cra("details");
export const dfn: ElementType<HTMLElement> = cra("dfn");
export const dialog: ElementType<HTMLDialogElement> = cra("dialog");
export const div: ElementType<HTMLDivElement> = cra("div");
export const dl: ElementType<HTMLElement> = cra("dl");
export const dt: ElementType<HTMLElement> = cra("dt");
export const em: ElementType<HTMLElement> = cra("em");
export const embed: ElementType<HTMLEmbedElement> = cra("embed");
export const fieldset: ElementType<HTMLFieldSetElement> = cra("fieldset");
export const figcaption: ElementType<HTMLElement> = cra("figcaption");
export const figure: ElementType<HTMLElement> = cra("figure");
export const footer: ElementType<HTMLElement> = cra("footer");
export const form: ElementType<HTMLFormElement> = cra("form");
export const h1: ElementType<HTMLHeadingElement> = cra("h1");
export const h2: ElementType<HTMLHeadingElement> = cra("h2");
export const h3: ElementType<HTMLHeadingElement> = cra("h3");
export const h4: ElementType<HTMLHeadingElement> = cra("h4");
export const h5: ElementType<HTMLHeadingElement> = cra("h5");
export const h6: ElementType<HTMLHeadingElement> = cra("h6");
export const head: ElementType<HTMLHeadElement> = cra("head");
export const header: ElementType<HTMLElement> = cra("header");
export const hr: ElementType<HTMLHRElement> = cra("hr");
export const html: ElementType<HTMLHtmlElement> = cra("html");
export const i: ElementType<HTMLElement> = cra("i");
export const iframe: ElementType<HTMLIFrameElement> = cra("iframe");
export const img: ElementType<HTMLImageElement> = cra("img");
export const input: ElementType<HTMLInputElement> = cra("input");
export const ins: ElementType<HTMLElement> = cra("ins");
export const kbd: ElementType<HTMLElement> = cra("kbd");
export const label: ElementType<HTMLLabelElement> = cra("label");
export const legend: ElementType<HTMLLegendElement> = cra("legend");
export const li: ElementType<HTMLLIElement> = cra("li");
export const link: ElementType<HTMLLinkElement> = cra("link");
export const main: ElementType<HTMLElement> = cra("main");
export const map: ElementType<HTMLMapElement> = cra("map");
export const mark: ElementType<HTMLElement> = cra("mark");
export const math: ElementType<HTMLElement> = cra("math");
export const menu: ElementType<HTMLMenuElement> = cra("menu");
export const meta: ElementType<HTMLMetaElement> = cra("meta");
export const meter: ElementType<HTMLMeterElement> = cra("meter");
export const nav: ElementType<HTMLElement> = cra("nav");
// export const noscript: ElementType<HTMLElement> = cra("noscript");
export const object: ElementType<HTMLObjectElement> = cra("object");
export const ol: ElementType<HTMLOListElement> = cra("ol");
export const optgroup: ElementType<HTMLOptGroupElement> = cra("optgroup");
export const option: ElementType<HTMLOptionElement> = cra("option");
export const output: ElementType<HTMLOutputElement> = cra("output");
export const p: ElementType<HTMLParagraphElement> = cra("p");
export const picture: ElementType<HTMLPictureElement> = cra("picture");
export const portal: ElementType<HTMLElement> = cra("portal");
export const pre: ElementType<HTMLPreElement> = cra("pre");
export const progress: ElementType<HTMLProgressElement> = cra("progress");
export const q: ElementType<HTMLQuoteElement> = cra("q");
export const rp: ElementType<HTMLElement> = cra("rp");
export const rt: ElementType<HTMLElement> = cra("rt");
export const ruby: ElementType<HTMLElement> = cra("ruby");
export const s: ElementType<HTMLElement> = cra("s");
export const samp: ElementType<HTMLElement> = cra("samp");
export const script: ElementType<HTMLScriptElement> = cra("script");
export const section: ElementType<HTMLElement> = cra("section");
export const select: ElementType<HTMLSelectElement> = cra("select");
export const slot: ElementType<HTMLSlotElement> = cra("slot");
export const small: ElementType<HTMLElement> = cra("small");
export const source: ElementType<HTMLSourceElement> = cra("source");
export const span: ElementType<HTMLSpanElement> = cra("span");
export const strong: ElementType<HTMLElement> = cra("strong");
export const style: ElementType<HTMLStyleElement> = cra("style");
export const sub: ElementType<HTMLElement> = cra("sub");
export const summary: ElementType<HTMLElement> = cra("summary");
export const sup: ElementType<HTMLElement> = cra("sup");
export const table: ElementType<HTMLTableElement> = cra("table");
export const tbody: ElementType<HTMLTableColElement> = cra("tbody");
export const td: ElementType<HTMLTableCellElement> = cra("td");
export const template: ElementType<HTMLTemplateElement> = cra("template");
export const textarea: ElementType<HTMLTextAreaElement> = cra("textarea");
export const tfoot: ElementType<HTMLElement> = cra("tfoot");
export const th: ElementType<HTMLTableSectionElement> = cra("th");
export const thead: ElementType<HTMLTableSectionElement> = cra("thead");
export const time: ElementType<HTMLTimeElement> = cra("time");
export const title: ElementType<HTMLTitleElement> = cra("title");
export const tr: ElementType<HTMLTableRowElement> = cra("tr");
export const track: ElementType<HTMLTrackElement> = cra("track");
export const u: ElementType<HTMLElement> = cra("u");
export const ul: ElementType<HTMLUListElement> = cra("ul");
export const val: ElementType<HTMLElement> = cra("val");
export const video: ElementType<HTMLVideoElement> = cra("video");
export const wbr: ElementType<HTMLElement> = cra("wbr");
