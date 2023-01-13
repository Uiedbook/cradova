import { dispatch } from "./track";
import _ from "../index";
export const err = function (errors: string[], err: string, type?: string) {
  for (let er = 0; er < errors.length; er++) {
    console.error(" ✘  Cradova err:  ", errors[er]);
  }
  if (!type) {
    throw new Error(" ✘  Cradova err:  " + err);
  } else {
    throw new TypeError(" ✘  Cradova err:  " + err);
  }
};

export const controls = function () {
  const svg = `<svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4.49975 5.625C4.3402 5.6242 4.18282 5.58788 4.03904 5.5187C3.89526 5.44951 3.76869 5.34919 3.6685 5.225L1.03725 2.0375C0.8835 1.84561 0.786745 1.61438 0.758014 1.37017C0.729283 1.12596 0.769733 0.878589 0.874753 0.65625C0.959928 0.463017 1.09892 0.298383 1.27514 0.182014C1.45136 0.0656449 1.65734 0.00245816 1.8685 0H7.131C7.34216 0.00245816 7.54815 0.0656449 7.72437 0.182014C7.90058 0.298383 8.03958 0.463017 8.12475 0.65625C8.22977 0.878589 8.27023 1.12596 8.24149 1.37017C8.21276 1.61438 8.11601 1.84561 7.96226 2.0375L5.331 5.225C5.23082 5.34919 5.10424 5.44951 4.96047 5.5187C4.81669 5.58788 4.65931 5.6242 4.49975 5.625Z" fill="#2c3e50"/>
</svg>
`;
  const icon = (styles: any) => _("div", { ...styles, innerHTML: svg });

  const constr = _(
    "div",
    {
      display: "flex",
      position: "fixed",
      alignContent: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      width: "80px",
      top: "4px",
      right: "4px",
      backgroundColor: "#fff",
      transform: "rotate(0deg)",
      border: "aqua 2px solid",
      borderRadius: "6px",
    },
    icon({
      transform: "rotate(90deg)",
      /* border: "red 2px solid", */ onclick() {
        window.history.back();
      },
    }),
    icon({
      transform: "rotate(270deg)",
      /* border: "red 2px solid", */ onclick() {
        window.history.forward();
      },
    })
  );
  const cont = constr();
  if (cont) {
    document.body.append(cont);
  }
};

export function uuid() {
  let t = Date.now ? +Date.now() : +new Date();
  return "cradova-id-xxxxxxxxxx".replace(/[x]/g, function (e) {
    const r = (t + 16 * Math.random()) % 16 | 0;
    return ("x" === e ? r : (7 & r) | 8).toString(16);
  });
}

export function PromptBeforeLeave(callback?: (e: any) => void) {
  window.history.pushState(
    "forward",
    "",
    window.location.pathname + "#forward"
  );
  window.addEventListener("popstate", (e) => {
    if (callback) {
      callback(e);
    } else {
      alert("Are you sure, you want to go back?");
    }
  });
}

/**
Write CSS media in javascript

@example

_.media("min-width: 790px",
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
 @media styles using javascript*/
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

export function css(identifier: string, properties: Record<string, string>) {
  /*This is for creating
 css styles using JavaScript*/

  const styS =
    "" +
    identifier +
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

_.animate("polarization",
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

export function animate(identifier: string, ...properties: any[]) {
  /*This is for creating css  
 animations  using JavaScript*/
  const styS =
      "@keyframes " +
      identifier +
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
 * @param {expression} condition
 * @param {function} callback
 */

export function assert(condition: any, ...callback: (() => any)[]) {
  if (condition) {
    return callback;
  }
  return "";
}
export function assertOr(
  condition: any,
  ifTrue: () => any,
  ifFalse: () => any
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
}

/**
 * Create element and get a callback to update their state
 * no need to manage stateIDs
 * ----------------------------------------------------------------
 *
 * @param element_initials
 * @param props
 * @returns
 */

export function RefElement(
  element_initials = "div",
  props: any = {},
  ...other: any
) {
  const stateID = uuid();
  if (Object.prototype.toString.call(props) !== "[object Object]") {
    other = props;
    props = { stateID };
  } else {
    props["stateID"] = stateID;
  }
  const element = _(element_initials, props, other);
  return {
    render(data?: any) {
      return element(data);
    },
    r(data?: any) {
      return element(data);
    },
    instance() {
      return dispatch(stateID, {
        cradovaDispatchTrackBreak: true,
      });
    },
    i() {
      return dispatch(stateID, {
        cradovaDispatchTrackBreak: true,
      });
    },
    updateState(state: Record<string, any>) {
      dispatch(stateID, state);
    },
    u(state: Record<string, any>) {
      // console.log(stateID, state);
      dispatch(stateID, state);
    },
  };
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

// for making the dom elements fullscreen
export function fullScreen(e: Element) {
  return {
    set() {
      e.requestFullscreen().catch((err: any) => {
        throw err;
      });
    },
    exist() {
      document.exitFullscreen();
    },
  };
}

export class RefList {
  private component: (data: any, index: number) => any;
  private stateID = uuid();
  private parentElement: HTMLElement | null = null;
  private datas: any[] = [];
  constructor(component: (...data: any) => any) {
    this.component = component.bind(this);
  }
  stale(datas: any) {
    this.datas = datas;
  }
  r(d?: any) {
    return this.render(d);
  }
  u(d?: any) {
    return this.updateState(d);
  }
  render(datas?: any) {
    if (datas) {
      this.datas = datas;
    }

    if (!this.datas) {
      throw new Error(
        " ✘  Cradova err:  RefList cannot be rendered without input"
      );
    }
    if (!Array.isArray(this.datas)) {
      throw new Error(
        " ✘  Cradova err:  RefList cannot render non-array input"
      );
    }
    const elements: any = [];
    const data = this.datas.length;
    for (let i = 0; i < data; i++) {
      elements.push(
        this.component(this.datas[i], i)({ stateID: this.stateID })
      );
    }
    return elements;
  }

  updateState(datas: any[]) {
    if (!datas) {
      throw new Error(" ✘  Cradova err:  Ref cannot be rendered without input");
    }
    if (!Array.isArray(datas)) {
      throw new Error(
        " ✘  Cradova err:  RefList cannot render non-array input"
      );
    }
    if (!datas[0]) {
      return;
    }

    if (!this.parentElement) {
      // only for the first call
      this.parentElement = dispatch(this.stateID, {
        cradovaDispatchTrackBreak: true,
      })!?.parentElement;
    }
    if (!this.parentElement) {
      throw new Error(
        "✘  Cradova err :  cannot update list, the RefList was never rendered!"
      );
    }
    const elements: Node[] = [];
    for (let i = 0; i < datas.length; i++) {
      elements.push(this.component(datas[i], i)({ stateID: this.stateID }));
    }
    try {
      // @ts-ignore
      this.parentElement.replaceChildren(...elements);
    } catch (err) {
      console.error(err);
      throw new Error(" ✘  Cradova err:  an error occured");
    }
  }
  remove() {
    dispatch(this.stateID, { remove: true });
  }
  instance() {
    return dispatch(this.stateID, {
      cradovaDispatchTrackBreak: true,
    });
  }
  i() {
    return dispatch(this.stateID, {
      cradovaDispatchTrackBreak: true,
    });
  }
}

/**
 * Cradova Ref
 * -------
 * create dynamic components
 *
 */

export class Ref {
  private component: (data?: any) => any;
  private stateID = uuid();
  private upcb: any;
  //  private parentElement: HTMLElement | null = null;
  private data: any = undefined;

  constructor(component: (...data: any) => any) {
    this.component = component.bind(this);
  }
  stale(data: any) {
    this.data = data;
  }
  r(d?: any) {
    return this.render(d);
  }
  u(d?: any) {
    return this.updateState(d);
  }

  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(data?: any) {
    if (data) {
      this.data = data;
    }
    // if (!this.data) {
    //   throw new Error(" ✘  Cradova err : Ref cannot be rendered without input");
    // }
    const chtml = this.component(this.data);
    if (typeof chtml !== "function") {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
          chtml
      );
    }

    const element = chtml({ stateID: this.stateID });
    if (!(element instanceof HTMLElement)) {
      err(
        [
          `
     \x1b[35m Exception: ref only  a function that returns cradova element or cradova element tree. \x1b[35m
      
      to track and debug this element add a
      beforeMount or afterMount prop to the element
      then you can compare the parsed element and stateID

     element stateID: \x1b[4m \x1b[33m ${this.stateID} \x1b[33m \x1b[4m`,
        ],
        `Cradova can't render component make sure it's a valid component`
      );
    }
    return () => element;
  }

  instance() {
    return dispatch(this.stateID, {
      cradovaDispatchTrackBreak: true,
    });
  }
  i() {
    return dispatch(this.stateID, {
      cradovaDispatchTrackBreak: true,
    });
  }
  /**
   * Cradova Ref
   * ---
   * runs on every state update
   *
   */
  onStateUpdate(cb: any) {
    this.upcb = cb;
  }
  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns void
   */
  updateState(data: any) {
    if (!data) {
      return;
    }
    if (!this) {
      console.error(
        " ✘  Cradova err:  update has been passed wrongly please send the ref where you want to call it"
      );
      console.error(
        " ✘  Cradova err: Then call as ref.updateState({ your new data }) = ui state"
      );
    }

    const guy = dispatch(this.stateID, {
      cradovaDispatchTrackBreak: true,
    });
    if (!guy) {
      console.error(this.component);
      throw new Error(
        " ✘  Cradova err:  Ref is not rendered but updateState was called"
      );
    }
    const chtml = this.component(data);
    if (typeof chtml !== "function") {
      try {
        guy.parentNode!.replaceChild(chtml, guy);
      } catch (e) {
        console.error(" ✘  Cradova err:  ", e);
        throw new Error(
          " ✘  Cradova err:   Ref got an invalid datatype for ref updateSate call  got >>>  ' " +
            chtml +
            "';"
        );
      }
    }
    const element = chtml({ stateID: this.stateID });
    const fn = element.afterMount;
    element.afterMount = undefined;
    try {
      guy.parentNode!.replaceChild(element, guy);
      if (typeof fn === "function") {
        fn(element, data);
      }
    } catch (e0) {
      console.log(e0);
    }
    if (this.upcb) {
      this.upcb(data);
    }
  }
  remove() {
    dispatch(this.stateID, { remove: true });
  }
}

/**
 * Document fragment
 * @param children
 * @returns
 */

type fragmentTYPE = () => (() => HTMLElement) | HTMLElement;

export const frag = function (...children: fragmentTYPE[]) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    const ch = children[i]();
    if (typeof ch === "function") {
      par.append(ch());
    } else {
      if (ch instanceof HTMLElement) {
        par.append(ch);
      }
    }
  }
  return par;
};
