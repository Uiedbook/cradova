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
    document.head.append(styTag);
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
  document.head.append(styleTag);
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
 *
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
  if (typeof props === "object" && !Array.isArray(element_initials[1])) {
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

type RefProps<T> = Record<string, T> | T;

/**
 * Cradova Ref
 * -------
 * create dynamic components
 */

export class Ref {
  private component: (
    data?: RefProps<
      string | number | Record<string, unknown> | undefined | null
    >
  ) => any;
  private stateID = uuid();
  private rendered = false;
  private effects: Promise<unknown>[] = [];
  private effectuate: (() => unknown) | null = null;
  private hasFirstStateUpdateRun = false;

  constructor(component: (...data: any) => any) {
    this.component = component.bind(this);
  }
  /**
   * Cradova Ref
   * ---
   * returns html with cradova reference
   * @param data
   * @returns () => HTMLElement
   */
  render(
    data?: RefProps<
      string | number | Record<string, unknown> | undefined | null
    >
  ) {
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
      beforeMount or afterMount prop to the element
      `,
        ],
        `Cradova can't render component make sure it's a valid component`
      );
    }

    if (typeof element.afterMount === "function") {
      this.effector = this.effector.bind(this);
      const afterMount = element.afterMount as Function;
      element.afterMount = async () => {
        await this.effector();
        await afterMount();
      };
      element.afterMount = element.afterMount.bind(this);
    } else {
      if (typeof element.afterMount !== "function") {
        element.afterMount = this.effector.bind(this);
      }
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
   * runs on every state update
   *
   */
  effect(fn: () => unknown | Promise<unknown>) {
    if (this.rendered) {
      return;
    }
    fn = fn.bind(this);
    this.effects.push(
      new Promise(async (res, rej) => {
        try {
          await fn();
          if (!this.hasFirstStateUpdateRun && this.effectuate) {
            this.hasFirstStateUpdateRun = true;
            await this.effectuate();
          }
          res(undefined);
        } catch (error) {
          rej(error);
        }
      })
    );
  }
  private async effector() {
    await Promise.allSettled(this.effects);
    this.rendered = true;
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

  updateState(data: unknown) {
    if (!this.rendered) {
      this.rendered = true;
      async function updateState(this: any, data: any) {
        if (this.instance()) {
          await this.Activate(data);
        } else {
          setTimeout(updateState.bind(this, data), 4);
        }
      }
      this.effectuate = updateState.bind(this, data);
    } else {
      (async () => {
        await this.Activate(data);
      }).bind(this)();
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
      guy.parentNode!.replaceChild(element, guy);
      if (this.effects.length) {
        delete element.afterMount;
        await this.effector();
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

export const frag = function (...children: fragmentTYPE[]) {
  const par = document.createDocumentFragment();
  // building it's children tree.
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === "function") {
      const a = children[i]() as any;
      if (typeof a === "function") {
        const b = a() as any;
        if (b instanceof HTMLElement) {
          par.append(b);
        } else {
          if (!(b instanceof HTMLElement)) {
            console.error(" ✘  Cradova err:   wrong element type" + b);
            throw new TypeError(
              " ✘  Cradova err:   invalid element, should be a html element from cradova"
            );
          }
        }
      } else {
        if (a instanceof HTMLElement) {
          par.append(a);
        } else {
          if (!(a instanceof HTMLElement)) {
            console.error(" ✘  Cradova err:   wrong element type" + a);
            throw new TypeError(
              " ✘  Cradova err:   invalid element, should be a html element from cradova"
            );
          }
        }
      }
    }
  }
  return par;
};
