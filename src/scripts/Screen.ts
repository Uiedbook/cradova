/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { CradovaScreenType } from "../types.js";
/**
 * @param name
 * @param template
 * @param transitions
 */
export class Screen {
  /**
   * this should be a cradova screen component
   */
  private html: HTMLElement | Function;
  /**
   * this is the name of the screen that appears as the title
   */
  public name: string;
  private packed = false;
  secondaryChildren: Array<any> = [];
  /**
   * used internally
   */
  private template: HTMLElement;
  /**
   * this a set of two class names
   * one for the entry transition
   * and one for the exit transition
   */
  private transition: string | undefined;
  private callBack:
    | ((data?: Record<string, any>) => void | undefined)
    | undefined;
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
  persist = true;
  rendered = false;
  effects: (() => unknown | Promise<unknown>)[] = [];

  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, callBack, transition, persist } =
      cradova_screen_initials;
    if (typeof template !== "function") {
      throw new Error(
        " ✘  Cradova err:   only functions that returns a cradova element is valid as screen"
      );
    }
    this.html = template.bind(this);
    this.name = name;
    this.template = document.createElement("div");
    // this.template.style.width = "100%";
    // this.template.style.display = "flex";
    // this.template.style.flexDirection = "column";
    this.template.id = "cradova-screen-set";
    this.callBack = callBack;
    this.transition = transition;
    if (typeof persist !== "undefined") {
      this.persist = true;
    }
    if (persist === false) {
      this.persist = false;
    }
  }

  effect(fn: () => unknown | Promise<unknown>) {
    if (!this.rendered) {
      this.effects.push(fn);
    }
  }
  async effector() {
    if (!this.rendered) {
      this.rendered = true;
      for (let fnIdex = 0; fnIdex < this.effects.length; fnIdex++) {
        const fn = this.effects[fnIdex];
        const data = await fn();
        await this.Activate(data, true);
      }
    }
  }

  async package(data?: any) {
    // if (this.template.firstChild) {
    //   this.template.replaceChildren();
    // }
    if (typeof this.html === "function") {
      let fuc = await this.html(data);
      if (typeof fuc === "function") {
        fuc = fuc(data);
        if (!(fuc instanceof HTMLElement)) {
          throw new Error(
            " ✘  Cradova err:   only parent with descendants is valid"
          );
        } else {
          this.template.replaceChildren(fuc);
        }
      }
    }
    if (!this.template.firstChild) {
      throw new Error(
        " ✘  Cradova err:  no screen is rendered, may have been past wrongly, try ()=> screen; in cradova Router.route(name, screen)"
      );
    }
    this.template.append(...this.secondaryChildren);
  }

  onActivate(cb: (data: any) => void) {
    this.callBack = cb;
  }
  addChild(...addOns: any[]) {
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i] && addOns[i] instanceof HTMLElement) {
        this.secondaryChildren.push(addOns[i]);
      }
      if (addOns[i] && typeof addOns[i] === "function") {
        this.secondaryChildren.push(addOns[i]());
      }
    }
  }

  // detach() {
  //   // clearing the dom
  //   const screens = document.querySelectorAll("#cradova-screen-set");
  //   if (!screens.length) {
  //     return;
  //   }
  //   for (let i = 0; i < screens.length; i++) {
  //     const screen = screens[i];
  //     if (this.transition) {
  //       screen.classList.remove("CRADOVA-UI-" + this.transition);
  //     }
  //     screen.parentElement?.removeChild(screen);
  //   }
  // }
  deActivate() {
    // clearing the dom
    this.rendered = false;
    this.template.parentElement?.removeChild(this.template);
    // console.log("removed " + this.name);
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
    if (force) {
      await this.package(data);
      this.packed = true;
    }

    document.title = this.name;
    // this.detach();
    document.getElementById("Cradova-app-wrapper")!.append(this.template);
    if (!this.persist) {
      this.packed = false;
    }
    // running effects if any available
    await this.effector();
    //  @ts-ignore
    if (this.template.firstChild.afterMount) {
      //  @ts-ignore
      this.template.firstChild!.afterMount();
    }
    if (this.transition) {
      this.template?.classList.add("CRADOVA-UI-" + this.transition);
    }
    if (this.callBack) {
      await this.callBack(data);
    }
    window.scrollTo(0, 0);
  }
}
