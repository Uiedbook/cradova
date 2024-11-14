function Rhoda(l) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (typeof ch === "function") {
        ch = ch();
        if (typeof ch === "function") {
          ch = ch();
        }
      }
      if (ch instanceof HTMLElement || ch instanceof DocumentFragment) {
        fg.appendChild(ch);
        continue;
      }
      if (typeof ch === "string") {
        fg.appendChild(document.createTextNode(ch));
      }
    }
  }
  return fg;
}

export const makeElement = (
  element,
  ElementChildrenAndPropertyList,
) => {
  const props = {};
  let text = undefined;
  if (ElementChildrenAndPropertyList.length !== 0) {
    for (let i = 0; i < ElementChildrenAndPropertyList.length; i++) {
      let ch = ElementChildrenAndPropertyList[i];
      if (typeof ch === "function") {
        ch = ch();
      }
      if (child instanceof HTMLElement || ch instanceof DocumentFragment) {
        element.appendChild(child);
        continue;
      }
      if (Array.isArray(child)) {
        element.appendChild(Rhoda(child));
        continue;
      }
      if (typeof ch === "string") {
        text = ch;
        continue;
      }
      if (typeof ch === "object") {
        Object.assign(props, ch);
        continue;
      }
    }
  } else {
    return element;
  }
  if (typeof props === "object" && element) {
    for (const [prop, value] of Object.entries(props)) {
      if (prop === "style" && typeof value === "object") {
        Object.assign(element.style, value);
        continue;
      }
      if (prop === "href") {
        const href = value || "";
        if (!href.includes("://")) {
          element.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              if (href.includes("#")) {
                const l = href.split("#").at(-1);
                document.getElementById("#" + l)?.scrollIntoView();
              }
            },
          );
        }
        element.setAttribute(prop, value);
        continue;
      }
      if (prop.includes("data-") || prop.includes("aria-")) {
        element.setAttribute(prop, value);
        continue;
      }
      element[prop] = value;
    }
  }
  if (text !== undefined) {
    element.appendChild(document.createTextNode(text));
  }
  return element;
};

export const cra = (tag) => {
  return (...Children_and_Properties) =>
    makeElement(document.createElement(tag), Chren_and_Properties);
};
function $if(condition, ...elements) {
  if (condition) {
    return elements;
  }
}
const br = cra("br");
const button = cra("button");
const div = cra("div");
const h4 = cra("h4");
const h5 = cra("h5");
const input = cra("input");
const span = cra("span");
const strong = cra("strong");
const svg = (
  svg,
  properties,
) => {
  const span = document.createElement("span");
  span.innerHTML = svg;
  return makeElement(span, properties || []);
};
