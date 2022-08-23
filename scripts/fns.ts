import { dispatch } from "./track.js";

/**
 * @param {number} num
 * @returns uuid
 */
export function uuid(num: number = 10) {
  function dec2hex(dec: { toString: (arg0: number) => string }) {
    return dec.toString(16).padStart(2, "0");
  }
  function generateId(len: number) {
    len = Math.round(len);
    return Array.from(
      crypto.getRandomValues(new Uint8Array(len || 10)),
      dec2hex
    ).join("");
  }
  return generateId(num);
}

export function PromptBeforeLeave() {
  window.addEventListener("beforeunload", (ev) => {
    const e = ev || window.event;
    if (e) {
      e.preventDefault();
      e.returnValue = "";
    }
    return "";
  });
}

/**
Write CSS media in javascript

@example

media("min-width: 790px",
["#container",
{
    width: "100%",
    height: "100%",
    "background-color": "#0000"
}],

["#header",
{
    width: "100%",
    height: "20%",
    "background-color": "#fff"
}]
)
*/
export function media(value: string, ...properties: any[]) {
  /* This is for creating css  
 @media styles using javascipt*/
  const styS =
      "@media only screen and (" +
      value +
      ") " +
      "{" +
      `
`,
    styE =
      "}" +
      `
`;
  let style = "  ",
    aniSty = " ";
  const proplen = properties.length;
  let totalAnimation,
    Animation = "  ";

  const animationStep = (num: number) => {
    style = "  ";
    for (const [k, v] of Object.entries(properties[num][1])) {
      style +=
        "" +
        k +
        ": " +
        v +
        ";" +
        `
`;
    }
    aniSty +=
      "" +
      properties[num][0] +
      "{" +
      `
` +
      style +
      "}" +
      `
`;
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) {
    Animation += animationStep(i);
  }
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) {
    aniStyleTag = document.createElement("style");
  }
  aniStyleTag.media = "screen";
  totalAnimation =
    aniStyleTag.innerHTML +
    `

`;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
}

/**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/

export function css(indentifier: string, properties: Record<string, string>) {
  /*This is for creating
 css styles using javascipt*/

  const styS =
    "" +
    indentifier +
    "" +
    "{" +
    `
`;
  const styE =
    "}" +
    `
`;
  let style = "",
    totalStyle = "";
  for (const [k, v] of Object.entries(properties)) {
    style +=
      "" +
      k +
      ": " +
      v +
      ";" +
      `
`;
  }
  let styleTag = document.querySelector("style");
  if (styleTag !== null) {
    totalStyle += styleTag.innerHTML;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    return;
  }
  styleTag = document.createElement("style");
  totalStyle +=
    styleTag.innerHTML +
    `

`;
  totalStyle += styS + style + styE;
  styleTag.innerHTML = totalStyle;
  document.head.append(styleTag);
}

/**
Write animation value in javascript 

@example

animate("popanimation",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/

export function animate(indentifier: string, ...properties: any[]) {
  /*This is for creating css  
 animations  using javascipt*/
  const styS =
      "@keyframes " +
      indentifier +
      " " +
      "{" +
      `
`,
    styE =
      "}" +
      `
`,
    proplen = properties.length;

  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;

  const animationStep = (num: number) => {
    style = "  ";
    for (const [k, v] of Object.entries(properties[num][1])) {
      style +=
        "" +
        k +
        ": " +
        v +
        ";" +
        `
`;
    }
    aniSty +=
      "" +
      properties[num][0] +
      "{" +
      `
` +
      style +
      "}" +
      `
`;
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) {
    Animation += animationStep(i);
  }
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) {
    aniStyleTag = document.createElement("style");
  }
  aniStyleTag.media = "screen";
  totalAnimation =
    aniStyleTag.innerHTML +
    `

`;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
}

/**
 *
 * @param {expession} condition
 * @param {function} callback
 */

export function assert(condition: any, callback: (arg: boolean) => any) {
  if (condition) {
    return callback(condition);
  }
  // That didn't went well
  return " ";
}

export const ls: Record<string, Function> = {};
ls.store = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};
ls.retrieve = (name: string) => {
  return localStorage.getItem(name);
};

ls.remove = (name: string) => {
  localStorage.removeItem(name);
};
ls.getKey = (index: number) => {
  return window.localStorage.key(index);
};
ls.clear = () => {
  localStorage.clear();
};

export class list {
  #component: (data: any) => any;
  #stateID = uuid();
  #parentElement: HTMLElement | null = null;
  constructor(component: (data: Record<string, any>) => any) {
    this.#component = component;
  }

  build(datas: any[]) {
    if (!datas[0]) {
      return;
    }
    const elements: any = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const chtml = this.#component(data);
      const element = chtml({ stateID: this.#stateID });
      elements.push(element);
    }
    return elements;
  }

  update(datas: any[]) {
    if (!datas[0]) {
      return;
    }
    if (!this.#parentElement) {
      // only for the first call
      this.#parentElement = dispatch(this.#stateID, {
        display: "none",
      })![0].parentElement;
    }
    dispatch(this.#stateID, { remove: true });
    if (!this.#parentElement) {
      throw new Error("cannot update list");
    }
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const chtml = this.#component(data);
      const element = chtml({ stateID: this.#stateID });
      this.#parentElement?.append(element);
    }
  }
}
