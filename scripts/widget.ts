export const w = function (...childrens: any[]) {
 let props;

  // finding the props where it's posotion if available

for ( let i = 0; i < childrens.length;i++ ) {
    const ch = childrens[i];
  if (
    typeof ch === "object" &&
    !(ch instanceof HTMLElement)
  ) {
    props = ch;
    childrens = childrens.splice(i,1);
  }
}
 
  const par = document.createDocumentFragment();

// building it's children tree.

for ( let i = 0; i < childrens.length;i++ ) {
    const ch = childrens[i];
    if (typeof ch === "function") {
      par.append(ch());
    } else {
      par.append(ch);
    }
  }
  return () => par;
};
