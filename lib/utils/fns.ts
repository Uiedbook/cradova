import { dispatch } from "./track";
export const isNode = (node: any) =>
  typeof node === "object" && typeof node.nodeType === "number";

/**
 * Cradova afterMount event
 */

export let cradovaAftermountEvent = new CustomEvent("cradova-aftermount");
export function uuid() {
  let t = Date.now ? +Date.now() : +new Date();
  return "cradova-id-xxxxxx".replace(/[x]/g, function (e) {
    const r = (t + 16 * Math.random()) % 16 | 0;
    return ("x" === e ? r : (7 & r) | 8).toString(16);
  });
}

export function Rhoda(l: any[]) {
  const fg = new DocumentFragment();
  for (let ch of l) {
    if (Array.isArray(ch)) {
      fg.appendChild(Rhoda(ch));
    } else {
      if (typeof ch === "function") {
        ch = ch();
      }
      if (typeof ch === "function") {
        ch = ch();
      }
      if (typeof ch === "string" || typeof ch === "number") {
        fg.appendChild(document.createTextNode(ch as string));
        continue;
      }
      if (isNode(ch)) {
        fg.appendChild(ch);
      } else {
        if (typeof ch !== "undefined") {
          throw new Error(
            "  ✘  Cradova err:  invalid child type: " +
              ch +
              " (" +
              typeof ch +
              ")"
          );
        }
      }
    }
  }
  return fg;
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

export function css(identifier: string, properties?: Record<string, string>) {
  /*This is for creating
 css styles using JavaScript*/
  if (typeof identifier === "string" && typeof properties === "undefined") {
    let styTag = document.querySelector("style");
    if (styTag !== null) {
      identifier += styTag.textContent!;
      styTag.textContent = identifier;
      return;
    }
    styTag = document.createElement("style");
    styTag.textContent = identifier;
    document.head.appendChild(styTag);
    return;
  }

  if (!properties) {
    return;
  }

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
  for (const [k, v] of Object.entries(properties!)) {
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
  document.head.appendChild(styleTag);
}

/**
 *
 * @param {expression} condition
 * @param {function} elements[]
 */

export function assert(condition: any, ...elements: any) {
  if (condition) {
    return elements;
  }
  return undefined;
}
export function loop(
  datalist: any[],
  component: (value: any, index?: number, array?: any[]) => any
) {
  if (typeof component !== "function") {
    throw new Error(
      " ✘  Cradova err :  Invalid component type, must be a function that returns html  "
    );
  }
  // am trying to confuse typescript compiler, but i know what am trying to do
  return Array.isArray(datalist)
    ? (datalist.map(component) as unknown as HTMLElement)
    : undefined;
}

export function assertOr(
  condition: boolean,
  ifTrue: () => any,
  ifFalse: () => any
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
}

// type RefProps<T> = Record<string, T> | T;
// RefProps<string | number | Record<string, unknown> | undefined | null>;
/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

type RefProps<D> = D | any;

export class Ref<D> {
  private component: (
    data?: RefProps<D>
  ) => HTMLElement | ((data?: D) => HTMLElement);
  private stateID = uuid();
  private effects: (() => Promise<unknown>)[] = [];
  private effectuate: (() => unknown) | null = null;
  private rendered = false;
  private published = false;
  private hasFirstStateUpdateRun = false;
  private preRendered: HTMLElement | null = null;
  // public testName = null;
  public stash: D | undefined;

  constructor(component: (data?: RefProps<D>) => any) {
    this.component = component.bind(this);
  }

  preRender(data?: RefProps<D>) {
    // parking
    const chtml = this.component(data);
    if (chtml instanceof HTMLElement) {
      chtml.setAttribute("data-cra-id", this.stateID);
      this.preRendered = chtml;
    } else {
      this.preRendered = chtml({ stateID: this.stateID } as any);
    }
    // @ts-ignore
    if (typeof this.preRendered === "undefined") {
      throw new Error(
        " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
          this.preRendered
      );
    }
  }
  destroyPreRendered() {
    this.preRendered = null;
  }

  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(data?: D, stash?: boolean) {
    // if (this.testName) {
    //   console.log("boohoo 1", this.rendered, this.hasFirstStateUpdateRun);
    // }
    this.effects = [];
    this.rendered = false;
    this.hasFirstStateUpdateRun = false;
    let element: HTMLElement | null = null;
    if (!this.preRendered) {
      // parking
      const chtml = this.component(data);
      if (chtml instanceof HTMLElement) {
        chtml.setAttribute("data-cra-id", this.stateID);
        element = chtml;
      } else {
        element = chtml({ stateID: this.stateID } as any);
      }
      // @ts-ignore
      if (typeof element === "undefined") {
        throw new Error(
          " ✘  Cradova err :  Invalid component type for cradova Ref, got  -  " +
            element
        );
      }
    }
    if (stash) {
      this.stash = data;
    }
    const av = async () => {
      await this.effector.apply(this);
      window.removeEventListener("cradova-aftermount", av);
    };
    window.addEventListener("cradova-aftermount", av);
    this.published = true;
    this.rendered = true;
    this.effector();
    if (!element) {
      element = this.preRendered;
    }
    return element as HTMLElement;
  }
  instance() {
    return dispatch(this.stateID, {
      // @ts-ignore
      cradovaDispatchTrackBreak: true,
    });
  }

  /**
   * Cradova Ref
   * ---
   * runs on first state update
   *
   */
  effect(fn: () => Promise<unknown>) {
    if (!this.rendered) {
      this.effects.push(fn.bind(this));
    }
  }

  private async effector() {
    if (!this.rendered) {
      for (let i = 0; i < this.effects.length; i++) {
        await this.effects[i].apply(this);
      }
    }
    // first update
    if (!this.hasFirstStateUpdateRun && this.effectuate) {
      await this.effectuate();
    }
    this.hasFirstStateUpdateRun = true;
  }

  /**
   * Cradova Ref
   * ---
   * update ref component with new data and update the dom.
   * @param data
   * @returns void
   *
   *
   * .
   */

  updateState(data: D, stash?: boolean) {
    if (!this) {
      console.error(
        " ✘  Cradova err:  Ref.updateState has is passed out of scope"
      );
      return;
    }
    if (!this.rendered) {
      async function updateState(this: any, data: any) {
        await this.Activate(data);
      }
      this.effectuate = updateState.bind(this, data);
    } else {
      if (this.published) {
        (async () => {
          await this.Activate(data);
        })();
      }
    }
    if (stash) {
      this.stash = data;
    }
  }

  // @ts-ignore
  private async Activate(data: any) {
    if (!data) {
      return;
    }
    this.published = false;
    const guy: HTMLElement = dispatch(this.stateID, {
      // @ts-ignore
      cradovaDispatchTrackBreak: true,
    });
    if (!guy) {
      return;
    }
    const chtml = this.component(data);
    let element;
    if (chtml instanceof HTMLElement) {
      chtml.setAttribute("data-cra-id", this.stateID);
      element = chtml;
    } else {
      element = chtml({ stateID: this.stateID } as any);
    }
    try {
      guy.insertAdjacentElement("beforebegin", element);
      if (guy.parentElement) {
        guy.parentElement.removeChild(guy);
      } else {
        guy.remove();
      }
    } catch (e0) {
      console.error(e0);
    }
    this.published = true;
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

export const frag = function (children: any) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    let a = children[i];
    if (typeof a === "function") {
      a = a() as any;
    }
    if (typeof a === "function") {
      a = a() as any;
    }
    if (isNode(a)) {
      // @ts-ignore
      par.appendChild(a);
      continue;
    }
    if (a instanceof String) {
      par.appendChild(document.createTextNode(a as string));
      continue;
    }
    {
      console.error(" ✘  Cradova err:   wrong element type" + a);
      throw new TypeError(" ✘  Cradova err:   invalid element");
    }
  }
  return par;
};

export const svgNS = (
  type: string,
  props: Record<string, any>,
  ...children: any
) => {
  const sc = document.createElementNS(
    props.xmlns || "http://www.w3.org/2000/svg",
    type
  );
  delete props.xmlns;
  for (const p in props) {
    sc.setAttributeNS(null, p, props[p]);
  }
  for (let ch of children) {
    if (typeof ch === "function") {
      ch = ch();
    }
    if (typeof ch === "function") {
      ch = ch();
    }
    sc.appendChild(ch);
  }
  return sc;
};

export class lazy {
  public content: any = undefined;
  private _cb: () => Promise<any>;
  constructor(cb: () => Promise<any>) {
    this._cb = cb;
  }
  async load() {
    this.content = await this._cb();
    if (typeof this.content === "function") {
      this.content = await this.content;
    } else {
      this.content = await this.content;
    }
    this.content = this.content.default;
  }
}
