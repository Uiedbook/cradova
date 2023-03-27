import { CradovaScreenType } from "../types.js";
import { cradovaAftermountEvent, frag, isNode } from "./fns.js";

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
  private callBack: (() => Promise<void> | void) | undefined;
  private deCallBack: (() => Promise<void> | void) | undefined;

  public errorHandler: (() => void) | null = null;
  /**
   * this tells cradova to persist state on the screen or not
   * persisting is better
   */
  private persist = true;
  private data: unknown;

  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist } = cradova_screen_initials;
    if (typeof template !== "function") {
      throw new Error(
        " ✘  Cradova err: only functions that returns a cradova element is valid as screen"
      );
    }
    this.html = template.bind(this);
    this.name = name;
    this.template.setAttribute("id", "cradova-screen-set");
    if (typeof persist === "boolean") {
      this.persist = persist;
    }
  }
  setErrorHandler(errorHandler: () => void) {
    this.errorHandler = errorHandler;
  }
  async package() {
    if (typeof this.html === "function") {
      let fuc = (await this.html(this.data)) as any;
      if (typeof fuc === "function") {
        fuc = fuc();
        if (fuc && !isNode(fuc) && typeof fuc !== "string") {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          if (fuc) {
            this.template.innerHTML = "";
            this.template.appendChild(fuc);
          }
        }
      } else {
        if (!isNode(fuc) && typeof fuc !== "string") {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          this.template.innerHTML = "";
          this.template.appendChild(fuc);
        }
      }
    }
    if (!this.template.firstChild) {
      throw new Error(
        " ✘  Cradova err:  no screen is rendered, may have been past wrongly."
      );
    }
    if (this.secondaryChildren.length) {
      for (const child of this.secondaryChildren) {
        // @ts-ignore
        this.template.appendChild(child);
      }
    }
  }
  onActivate(cb: () => Promise<void> | void) {
    this.callBack = cb as any;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this.deCallBack = cb;
  }
  addChild(...addOns: any[]) {
    this.secondaryChildren.push(frag(addOns));
  }
  deActivate() {
    if (this.deCallBack) {
      this.deCallBack();
    }
    //
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

    const doc = document.querySelector("[data-cra-id=cradova-app-wrapper]");
    if (!doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root <div data-cra-id='cradova-app-wrapper'> ... </div>"
      );
    }
    doc.innerHTML = "";
    doc.appendChild(this.template as any);
    document.title = this.name;
    if (!this.persist) {
      this.packed = false;
    }
    if (this.callBack) {
      await this.callBack();
    }
    window.dispatchEvent(cradovaAftermountEvent);
    window.scrollTo(0, 0);
  }
}
