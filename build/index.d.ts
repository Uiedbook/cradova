/**
 * Creates new HTML element
 *  @example
 * format for static  _`p| am a p tag`  // or _`p.class| am a p tag` or _`p#id| am a p tag` or _`p.class#id| am a p tag`
 * format for dynamic _(
 *  "p| am a p tag" // or "p.class| am a p tag" or "p#id| am a p tag" or "p.class#id| am a p tag"
 * , {
 * //props like
 * text: "am a p tag",
 * style: {
 * color: "blue"
 * }
 * },
 * // place other children here like span
 * _`span| am a span tag like so`, // this is a static child
 * _("span| am a span tag like so", {style: {color: "brown"}}) // this is a dynamic child
 * )
 * @param  {...any} element_initials
 * @returns function | HTMLElement
 *
 * // static elements cannot be given props nor children nor state but dynamic can
 *
 * // and static are useful too
 */
declare const _: any | Record<string, any>;
export default _;
