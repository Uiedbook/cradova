const w = function (...childrens) {
  let props;
  if (
    typeof childrens[0] === "object" &&
    !(childrens[0] instanceof HTMLElement)
  ) {
    props = childrens[0];
    childrens = childrens.slice(1, childrens.length);
  }
  const par = document.createDocumentFragment();
  childrens.forEach((ch) => {
    if (typeof ch === "function") {
      par.append(ch(props));
    } else {
      par.append(ch);
    }
  });
  return () => par;
};

export default w;
