import { CradovaScreenType } from "../types.js";
import Element from "./document.js";
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
  private template = globalThis.document
    ? document.createElement("div")
    : new Element("div");
  private callBack: (() => Promise<void>) | undefined;
  private deCallBack:
    | ((data?: Record<string, any>) => Promise<void>)
    | undefined;
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

  async package() {
    if (typeof this.html === "function") {
      let fuc = (await this.html(this.data)) as any;
      if (typeof fuc === "function") {
        fuc = fuc();

        if (!isNode(fuc) && typeof fuc !== "string") {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          this.template.innerHTML = "";
          this.template.appendChild(fuc as any);
        }
      } else {
        if (!isNode(fuc) && typeof fuc !== "string") {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          this.template.innerHTML = "";
          this.template.appendChild(fuc as any);
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
  onActivate(cb: (data: any) => Promise<void>) {
    this.callBack = cb as any;
  }
  onDeactivate(cb: (data: any) => Promise<void>) {
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
  async getHtml() {
    await this.package();
    return (
      // @ts-ignore
      '<div data-cra-id="cradova-app-wrapper" >' + this.template.html + "</div>"
    );
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
        " ✘  Cradova err: Unable to render, cannot find cradova root <div data-cra-id='cradova-app-wrapper'> ... </div>"
      );
    }
    doc.innerHTML = "";
    doc.appendChild(this.template as any);
    if (!this.persist) {
      this.packed = false;
    }
    if (this.callBack) {
      await this.callBack();
    }
    window.dispatchEvent(cradovaAftermountEvent as any);
    window.scrollTo(0, 0);
  }
}
