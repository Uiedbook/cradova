import { CradovaScreenType  } from "../types.js";
/**
   * 
   * @param name 
   * @param template 
   * @param transitions 
   */
export class Screen {
  /**
   * this should be a cradovva screen component
   */
  html: HTMLElement | Function;
  /**
   * this is the name of the screen that appears as the title
   */
  name: string;

  secondaryChildren: Array<any> = []
  /**
   * used internally 
   */
  template: HTMLDivElement;
  /**
   * 
   * this a set of two class names
   * one for the entry transition 
   * and one for the exit transition
   */
  transition: string | undefined;
  callBack: ((html?: any, data?: Record<string, any>) => void | undefined) | undefined;
  // SCREEN ANIMATION CLASSES
  static SCALE_IN = "SCALE-IN"
  static SCALE_OUT = "SCALE-OUT"
  static CIRCLE_IN = "CIRCLE-IN"
  static CIRCLE_OUT = "CIRCLE-OUT"
  static FADE_OUT = "FADE-OUT"
  static FADE_IN = "FADE-IN"
  static SLIDE_UP = "SLIDE-UP"
  static SLIDE_DOWN = "SLIDE-DOWN"
  static SLIDE_LEFT = "SLIDE-LEFT"
  static SLIDE_RIGHT = "SLIDE-RIGHT"
/**
 * this tells cradova to persist state on the screen or not
 * persiting is better
 */
  persist: boolean = true;
  
  constructor(
    cradova_screen_initials: CradovaScreenType) {
    const {template, name, callBack, transition, persist } = cradova_screen_initials;
    if (typeof template  !== "function") {
        throw new Error("Cradova err: only functions that returns a cradova element is valid as screen");
      }
    this.html = template;
    this.name = name;
    this.template = document.createElement("div");
    this.template.style.width = "100%";
    this.template.style.display = "flex";
    this.template.style.flexDirection = "column";
    this.template.id = "cradova-screen-set";
    this.callBack = callBack;
    this.transition = transition;
    if (!persist) {
      this.persist = false;
    }
}
  async package(data: any) {
    this.template.innerHTML = ''
    if (typeof this.html === "function") {
      let fuc = await this.html(data);
      if (typeof fuc === "function") {
        fuc = fuc();
        if (!(fuc instanceof HTMLElement)) {
          throw new Error("Cradova err only parent with descendants is valid");
        } else {
          this.template.append(fuc);
        }
      }
    }
    this.template.append(...this.secondaryChildren)
  }

  onActivate(cb: (html: any)=> void) {
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

  detach() {
    // crearing the dom 
  const screens = document.querySelectorAll("#cradova-screen-set");
  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
   if (this.transition) {
    screen.classList.remove("CRADOVA-UI-" + this.transition)
   }
   screen.parentElement?.removeChild(screen)
  }
  }
  async Activate(data: any) {
    let packed = false;
    if (document.title === this.name) {
      return;
    }
    if (!this.template.firstChild) {
      packed = true
      await this.package(data);
    }
    if (!this.persist && !packed) {
      await this.package(data);
    }
    document.title = this.name;
    this.detach();
    document.querySelector("#app-wrapper")!.append(this.template);
    if (this.transition) {
      this.template?.classList.add("CRADOVA-UI-" +this.transition)
      // console.log(this.template.className);
    }
    
    if (this.callBack) {
      this.callBack(this.template.firstChild, data);     
    }
    window.scrollTo(0, 0);
}
}