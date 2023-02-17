import { dispatch } from "./track";
import _ from "../index";

/**
 * Cradova afterMount event
 */

export const cradovaAftermountEvent = new CustomEvent("cradova-aftermount");

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
  condition: any,
  ifTrue: () => any,
  ifFalse: () => any
) {
  if (condition) {
    return ifTrue;
  }
  return ifFalse;
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

// type RefProps<T> = Record<string, T> | T;
// RefProps<string | number | Record<string, unknown> | undefined | null>;
/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

export class Ref<D> {
  private component: (data?: D) => any;
  private stateID = uuid();
  private effects: (() => Promise<unknown>)[] = [];
  private effectuate: (() => unknown) | null = null;
  private rendered = false;
  private published = false;
  private hasFirstStateUpdateRun = false;
  public testName = null;
  public stash: D | undefined;

  constructor(component: (data?: D) => any) {
    this.component = component.bind(this);
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
    this.rendered = false;
    this.hasFirstStateUpdateRun = false;

    const chtml = this.component(data);
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
      beforeMount or afterMount property to the element
      `,
        ],
        `Cradova can't render component make sure it's a valid component`
      );
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
    return () => element;
  }
  instance() {
    return dispatch(this.stateID, {
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

  updateState(data: D, stash: boolean) {
    if (!this.rendered) {
      // @ts-ignore
      async function updateState(this: any, data: any) {
        if (this.rendered) {
          await this.Activate(data);
          this.rendered = true;
          this.hasFirstStateUpdateRun = true;
        } else {
          setTimeout(updateState.bind(this, data), 4);
        }
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

  private async Activate(data: any) {
    if (!data) {
      return;
    }
    if (!this) {
      console.error(
        " ✘  Cradova err:  Ref.updateState has is passed out of scope"
      );
      return;
    }
    const guy: HTMLElement = dispatch(this.stateID, {
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
      element = chtml({ stateID: this.stateID });
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

type fragmentTYPE = () => (() => HTMLElement) | HTMLElement;

export const frag = function (children: fragmentTYPE[]) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === "function") {
      const a = children[i]() as any;
      if (typeof a === "function") {
        const b = a() as any;
        if (b instanceof HTMLElement) {
          par.appendChild(b);
        } else {
          if (!(b instanceof HTMLElement)) {
            console.error(" ✘  Cradova err:   wrong element type" + b);
            throw new TypeError(" ✘  Cradova err:   invalid element");
          }
        }
      } else {
        if (a instanceof HTMLElement) {
          par.appendChild(a);
        } else {
          if (!(a instanceof HTMLElement)) {
            console.error(" ✘  Cradova err:   wrong element type" + a);
            throw new TypeError(" ✘  Cradova err:   invalid element");
          }
        }
      }
    } else {
      console.error(" ✘  Cradova err:   wrong element type" + children[i]);
      throw new TypeError(" ✘  Cradova err:   invalid element");
    }
  }
  return par;
};
