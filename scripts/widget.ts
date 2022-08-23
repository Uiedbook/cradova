/**
 * Document fragment
 * @param childrens
 * @returns
 */

export const frag = function (...childrens: any[]) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < childrens.length; i++) {
    let ch = childrens[i];
    if (typeof ch === "function") {
      if (typeof ch === "function") {
        ch = ch();
      }
      if (ch instanceof HTMLElement) {
        par.append(ch);
      }
    } else {
      if (ch instanceof HTMLElement) {
        par.append(ch);
      }
    }
  }
  return par;
};
