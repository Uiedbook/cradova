import { CradovaScreenType } from "../types.js";
import { cradovaAftermountEvent, frag } from "./fns.js";

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
  private hasFirstStateUpdateRun = false;
  private effects: Promise<unknown>[] = [];
  private data: unknown;
  private effectuate: (() => unknown) | null = null;

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
    if (!this.rendered) {
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
    this.rendered = true;
    await Promise.allSettled(this.effects);
    if (!this.hasFirstStateUpdateRun && this.effectuate) {
      this.hasFirstStateUpdateRun = true;
      await this.effectuate();
    }
  }

  /**
   * Cradova Screen
   * ---
   * re-renders the screen -
   *
   * first level call will only be called once
   * lower level calls will be continuously called
   * @param data .
   *
   * *
   */

  updateState(data: unknown) {
    if (!this.rendered) {
      async function updateState(this: any, data: any) {
        this.data = data;
        await this.Activate(true);
      }
      this.effectuate = updateState.bind(this, data);
    } else {
      (async () => {
        this.data = data;
        await this.Activate(true);
      }).bind(this)();
    }
  }

  async package() {
    if (typeof this.html === "function") {
      let fuc = (await this.html(this.data)) as any;
      if (typeof fuc === "function") {
        fuc = fuc();
        if (!(fuc instanceof HTMLElement)) {
          throw new Error(
            " ✘  Cradova err:   only parent with descendants is valid"
          );
        } else {
          if (this.transition) {
            this.template.classList.add("CRADOVA-UI-" + this.transition);
          }
          this.template.innerHTML = "";
          this.template.appendChild(fuc);
          // this.template.replaceChildren(fuc);
        }
      }
    }
    if (!this.template.firstChild) {
      throw new Error(
        " ✘  Cradova err:  no screen is rendered, may have been past wrongly."
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
    this.secondaryChildren.push(frag(...addOns));
  }
  deActivate() {
    if (this.transition) {
      this.template.classList.remove("CRADOVA-UI-" + this.transition);
    }
    if (!this.persist) {
      this.rendered = false;
    }
  }
  async Activate(force?: boolean) {
    if (!this.persist) {
      await this.package();
      this.packed = true;
    } else {
      if (!this.packed) {
        await this.package();
        this.packed = true;
      }
    }
    if (this.persist && force) {
      await this.package();
      this.packed = true;
    }

    document.title = this.name;

    const doc = document.querySelector("[data-cra-id=cradova-app-wrapper]");
    if (!doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root [data-cra-id=cradova-app-wrapper]"
      );
    }
    doc.innerHTML = "";
    doc.appendChild(this.template);
    // doc?.replaceChildren(this.template);
    if (!this.persist) {
      this.packed = false;
    }

    //  @ts-ignore
    if (doc?.firstChild?.firstChild?.afterMount) {
      const c = doc?.firstChild;
      //  @ts-ignore
      await c?.firstChild.afterMount();
      //  @ts-ignore
      delete c?.firstChild.afterMount;
    }
    window.dispatchEvent(cradovaAftermountEvent);

    // needed by updateState and effector
    // this.rendered = true;
    await this.effector();

    if (this.callBack) {
      await this.callBack();
    }
    window.scrollTo(0, 0);
  }
}
