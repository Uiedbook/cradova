import { dispatch } from "./track";
export const isNode = (node: any) =>
  typeof node === "object" && typeof node.nodeType === "number";

/**
 * Cradova afterMount event
 */

export let cradovaAftermountEvent = new CustomEvent("cradova-aftermount");
export function uuid() {
  let t = Date.now ? +Date.now() : +new Date();
  return "cradova-id-xxxxxxxxxx".replace(/[x]/g, function (e) {
    const r = (t + 16 * Math.random()) % 16 | 0;
    return ("x" === e ? r : (7 & r) | 8).toString(16);
  });
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
 * @param {function} callback
 */

export function assert(condition: any, ...callback: (() => any)[]) {
  if (condition) {
    return callback;
  }
  return "";
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
    if (!this.published) {
      this.published = true;
      window.addEventListener("cradova-aftermount", av);
    } else {
      this.effector();
    }
    if (!element) {
      element = this.preRendered;
    }
    return element;
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
    // ? tested
    if (!this.rendered) {
      // effects
      for (const effect of this.effects) {
        await effect.apply(this);
      }
    }
    // first update
    if (!this.hasFirstStateUpdateRun && this.effectuate) {
      await this.effectuate();
    }
    this.rendered = true;
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
      (async () => {
        await this.Activate(data);
      })();
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
      if (typeof a === "function") {
        a = a() as any;
      }
      if (isNode(a) || a instanceof String) {
        // @ts-ignore
        par.appendChild(a);
      } else {
        console.error(" ✘  Cradova err:   wrong element type" + a);
        throw new TypeError(" ✘  Cradova err:   invalid element");
      }
    }
  }
  // if (document) {
  return par;
  // }
  // @ts-ignore
  // return par.html;
};
