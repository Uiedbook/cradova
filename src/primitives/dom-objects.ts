/*! *****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
********************************************************************************/

import { VJS_props_TYPE } from "./types";
import { cra, makeElement } from "./functions";

export const a = cra<HTMLAnchorElement>("a");
export const article = cra<HTMLElement>("article");
export const audio = cra<HTMLAudioElement>("audio");
export const br = cra<HTMLBRElement>("br");
export const button = cra<HTMLButtonElement>("button");
export const canvas = cra<HTMLCanvasElement>("canvas");
export const caption = cra<HTMLTableCaptionElement>("caption");
export const col = cra<HTMLTableColElement>("col");
export const colgroup = cra<HTMLOptGroupElement>("colgroup");
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
export const li = cra<HTMLLIElement>("li");
export const main = cra<HTMLElement>("main");
export const nav = cra<HTMLElement>("nav");
export const ol = cra<HTMLOListElement>("ol");
export const optgroup = cra<HTMLOptGroupElement>("optgroup");
export const option = cra<HTMLOptionElement>("option");
export const p = cra<HTMLParagraphElement>("p");
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