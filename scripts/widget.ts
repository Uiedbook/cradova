/**
 * Document fragment 
 * @param childrens 
 * @returns 
 */

type fragmentTYPE = (()=> any) | HTMLElement;

export const fragment = function (...childrens: fragmentTYPE[]) {
  const par = document.createDocumentFragment();
// building it's children tree.
for ( let i = 0; i < childrens.length;i++ ) {
    const ch = childrens[i];
    if (typeof ch === "function") {
      par.append(ch());
    } else {
      if (ch instanceof HTMLElement) { 
        par.append(ch);
      }
    }
  }
  return () => par;
};
