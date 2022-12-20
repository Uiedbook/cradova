export { swipe } from "./sacho/swipe.js";
export { Signal as createSignal } from "./scripts/createSignal.js";
export { Router } from "./scripts/Router.js";
export { Screen } from "./scripts/Screen.js";
export { dispatch } from "./scripts/track.js";
export { Ajax } from "./scripts/ajax.js";
export { frag, fullScreen, assert, uuid, animate, controls, PromptBeforeLeave, RefElement, css, media, ls, Ref, RefList, assertOr, } from "./scripts/fns.js";
/**
 * Creates new cradova HTML element
 *  @example
 * _("p") // or _("p.class") or _("p#id") or _("p.class#id")
 * using inline props
 * _("p",{
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * )
 * adding children
 * _("p",
 * _("span",{text:" am a span tag like so",
 *  {style: {color: "brown"}
 * })
 * )
 *
 * props and children
 * _("p",
 * // props first
 * {
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * },
 * // all children goes after
 * _("span",{text:" am a span tag like so",
 *  {style: {color: "brown"}
 * })
 * )
 *
 * @param  {...any} element_initials
 * @returns function - cradova element
 */
declare const _: any;
export default _;
