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
  private template: DocumentFragment;
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
        " ✘  Cradova err: only functions that returns a cradova element is valid as screen"
      );
    }
    this.html = template.bind(this);
    this.name = name;
    this.template = document.createDocumentFragment();
    // this.template.id = "cradova-screen-set";
    this.callBack = callBack;
    this.transition = transition;
    if (typeof persist === "boolean") {
      this.persist = persist;
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
        if (data) {
          await this.Activate(data, true);
        }
      }
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
      this.template.append(...this.secondaryChildren);
    }
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
  //     if (this.transition) {
  //       screens[i].classList.remove("CRADOVA-UI-" + this.transition);
  //     }
  //     screens[i].parentElement?.removeChild(screens[i]);
  //   }
  // }

  deActivate() {
    // clearing the dom
    this.template.parentElement?.removeChild(this.template);
    if (!this.persist) {
      this.rendered = false;
    }
    // fail safe
    // this.detach();
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
      this.rendered = false;
    }

    document.title = this.name;
    const doc = document.querySelector("[data-cra-id=cradova-app-wrapper]");
    doc?.replaceChildren(this.template);
    if (!this.persist) {
      this.packed = false;
    }
    // running effects if any available
    await this.effector();
    //  @ts-ignore
    if (doc?.firstChild?.afterMount) {
      //  @ts-ignore
      doc?.firstChild.afterMount();
      //  @ts-ignore
      doc.firstChild.afterMount = undefined;
    }
    if (this.callBack) {
      await this.callBack(data);
    }
    window.scrollTo(0, 0);
  }
}