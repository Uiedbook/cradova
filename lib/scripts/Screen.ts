import { CradovaScreenType } from "../types.js";
/**
 *  Cradova Screen
 * ---
 * create instances of manageable pages and scaffolds
 * @param name
 * @param template
 * @param transitions
 */
export class Screen {
  /**
   * this should be a cradova screen component
   */
  private html: Function;
  /**
   * this is the name of the screen that appears as the title
   */
  private name: string;
  private packed = false;
  private secondaryChildren: Array<Node | string> = [];
  /**
   * used internally
   */
  private template = document.createElement("div");
  /**
   * this a set of two class names
   * one for the entry transition
   * and one for the exit transition
   */
  private transition: string | undefined;
  private callBack: ((data?: Record<string, any>) => Promise<void>) | undefined;
  // SCREEN ANIMATION CLASSES
  static SCALE_IN = "SCALE-IN";
  static SCALE_OUT = "SCALE-OUT";
  static CIRCLE_IN = "CIRCLE-IN";
  static CIRCLE_OUT = "CIRCLE-OUT";
  static FADE_OUT = "FADE-OUT";
  static FADE_IN = "FADE-IN";
  static SLIDE_UP = "SLIDE-UP";
  static SLIDE_DOWN = "SLIDE-DOWN";
  static SLIDE_LEFT = "SLIDE-LEFT";
  static SLIDE_RIGHT = "SLIDE-RIGHT";
  /**
   * this tells cradova to persist state on the screen or not
   * persisting is better
   */
  private persist = true;
  private rendered = false;
  private pushed = false;
  private effects: Promise<unknown>[] = [];

  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, transition, persist } = cradova_screen_initials;
    if (typeof template !== "function") {
      throw new Error(
        " ✘  Cradova err: only functions that returns a cradova element is valid as screen"
      );
    }
    this.html = template.bind(this);
    this.name = name;
    this.template.id = "cradova-screen-set";
    this.transition = transition;
    if (typeof persist === "boolean") {
      this.persist = persist;
    }
  }

  effect(fn: () => unknown | Promise<unknown>) {
    if (!this.rendered && !this.pushed) {
      this.effects.push(
        new Promise(async (res, rej) => {
          try {
            res(await fn());
          } catch (error) {
            rej(error);
          }
        })
      );
    }
  }

  private async effector() {
    if (this.rendered) {
      await Promise.allSettled(this.effects);
    }
  }

  async updateState(data: any) {
    if (this.rendered) {
      await this.Activate(data, true);
    }
  }

  async package(data?: any) {
    if (typeof this.html === "function") {
      let fuc = (await this.html(data)) as any;
      if (typeof fuc === "function") {
        fuc = fuc();
        if (!(fuc instanceof HTMLElement)) {
          throw new Error(
            " ✘  Cradova err:   only parent with descendants is valid"
          );
        } else {
          if (this.transition) {
            fuc.classList.add("CRADOVA-UI-" + this.transition);
          }
          this.template.replaceChildren(fuc);
        }
      }
    }
    if (!this.template.firstChild) {
      throw new Error(
        " ✘  Cradova err:  no screen is rendered, may have been past wrongly, try ()=> screen; in cradova Router.route(name, screen)"
      );
    }
    if (this.secondaryChildren.length) {
      // @ts-ignore
      this.template.append(this.secondaryChildren);
    }
  }

  onActivate(cb: (data: any) => Promise<void>) {
    this.callBack = cb;
  }
  addChild(...addOns: any[]) {
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i] && addOns[i] instanceof HTMLElement) {
        this.secondaryChildren.push(addOns[i]);
      }
      if (addOns[i] && typeof addOns[i] === "function") {
        let a = addOns[i]();
        if (a && a instanceof HTMLElement) {
          this.secondaryChildren.push(a);
        }
        if (addOns[i] && typeof addOns[i] === "function") {
          a = a();
          if (a && a instanceof HTMLElement) {
            this.secondaryChildren.push(a);
          }
        }
      }
    }
  }

  deActivate() {
    if (!this.persist) {
      this.rendered = false;
    }
  }
  async Activate(data?: any, force?: boolean) {
    if (!this.persist) {
      await this.package(data);
      this.packed = true;
    } else {
      if (!this.packed) {
        await this.package(data);
        this.packed = true;
      }
    }
    if (this.persist && force) {
      await this.package(data);
      this.packed = true;
      this.rendered = false;
    }
    if (!this.pushed) {
      this.pushed = true;
    }

    document.title = this.name;

    const doc = document.querySelector("[data-cra-id=cradova-app-wrapper]");
    if (!doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root [data-cra-id=cradova-app-wrapper]"
      );
    }
    doc?.replaceChildren(this.template);
    if (!this.persist) {
      this.packed = false;
    }
    // running effects if any available
    if (this.effects.length) {
      await this.effector();
      // needed by updateState and effector
      this.rendered = true;
    }

    //  @ts-ignore
    if (doc?.firstChild?.firstChild?.afterMount) {
      const c = doc?.firstChild;
      //  @ts-ignore
      c?.firstChild.afterMount();
      //  @ts-ignore
      // c?.firstChild.afterMount = undefined;
    }
    if (this.callBack) {
      await this.callBack(data);
    }
    window.scrollTo(0, 0);
  }
}
