/**
 * Acts as a function or object depending on how it is referenced.
 *
 * :: schemes
 *  @example
 *  // creating html elements
 * @param  element_initials | <html template string, props object?, children?>.
 * @returns Cradova element base function.
 * @example
 * // html template strings examples
 *
 * //template literals example, can't accept props object or children
 *
 * _`p| am a p tag`
 * // equivilent <p> am a p tag</p>
 *
 * or _`p.class| am a p tag`
 * // equivilent <p class="class"> am a p tag </p>
 *
 * or _`p#id| am a p tag`
 * // equivilent <p id="id"> am a p tag </p>
 *
 * or _`p.class#id| am a p tag`
 * // equivilent <p id="id" class="class"> am a p tag </p>
 *
 * // using props and children
 *
 *  _("p| am a p tag" ,{
 *  //props like
 *  text: "am a dynamic paragraph tag", // this will override text value above
 *  style: {
 *   color: "blue"
 *  }
 * },
 * // place other children here like span
 * _`span| am a span tag like so`,
 * _("span| am a span tag like so", {style: {color: "brown"}})
 * )
 *
 * every other cradova methods like _.dispatch, _.reuse ... can be distructured
 * vist the docs for more info.
 * Enjoy!
 */
declare const _: {
    (...element_initials: {
        raw: any;
    }[]): {
        raw: any;
    }[];
    register(name: any): void;
};
export default _;
