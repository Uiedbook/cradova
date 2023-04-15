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
  public _html: Function;
  /**
   * this is a set of added html to the screen
   */
  public _secondaryChildren: Array<Node> = [];
  /**
   * error handler for the screen
   */
  public errorHandler: (() => void) | null = null;
  /**
   * used internally
   */
  public _name: string;
  private _packed = false;
  private _template = document.createElement("div");
  private _callBack: (() => Promise<void> | void) | undefined;
  private _deCallBack: (() => Promise<void> | void) | undefined;
  private _persist = true;
  private _data: unknown;
  public _params: Record<string, any> | null = null;
  private _delegatedRoutesCount = -1;
  private _transition;
  //
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel, transition } =
      cradova_screen_initials;
    if (typeof template !== "function") {
      console.error(" ✘  Cradova err: expected a screen but got ", template);
      throw new Error(
        " ✘  Cradova err: only functions that returns a cradova element is valid as screen"
      );
    }
    this._html = template;
    this._name = name;
    this._transition = transition || "";
    this._template.setAttribute("id", "cradova-screen-set");
    if (renderInParallel === true) {
      this._delegatedRoutesCount = 0;
    } else {
      if (typeof persist === "boolean") {
        this._persist = persist;
      }
    }
  }

  get _delegatedRoutes(): boolean {
    if (this._delegatedRoutesCount > 1000) {
      return 0 as unknown as boolean;
    }
    return this._delegatedRoutesCount as unknown as boolean;
  }

  set _delegatedRoutes(count: boolean) {
    if (count) {
      this._delegatedRoutesCount += 1;
    }
  }

  get _paramData(): typeof this._params {
    return this._params;
  }

  set _paramData(params: typeof this._params) {
    if (params) {
      this._params = params;
    }
  }

  setErrorHandler(errorHandler: () => void) {
    this.errorHandler = errorHandler;
  }
  async _package() {
    if (typeof this._html === "function") {
      let fuc = (await this._html.apply(this, this._data)) as any;
      if (typeof fuc === "function") {
        fuc = fuc();
        if (!isNode(fuc)) {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          if (fuc) {
            this._template.innerHTML = "";
            this._template.appendChild(fuc);
          }
        }
      } else {
        if (!isNode(fuc) && typeof fuc !== "string") {
          throw new Error(
            " ✘  Cradova err: only parent with descendants is valid"
          );
        } else {
          this._template.innerHTML = "";
          this._template.appendChild(fuc);
        }
      }
    }
    if (!this._template.firstChild) {
      throw new Error(
        " ✘  Cradova err:  no screen is rendered, may have been past wrongly."
      );
    }
    if (this._secondaryChildren.length) {
      for (const child of this._secondaryChildren) {
        // @ts-ignore
        this.template.appendChild(child);
      }
    }
  }
  onActivate(cb: () => Promise<void> | void) {
    this._callBack = cb as any;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this._deCallBack = cb;
  }
  addChild(...addOns: any[]) {
    this._secondaryChildren.push(frag(addOns));
  }
  async _deActivate() {
    if (this._deCallBack) {
      await this._deCallBack();
    }
    if (this._transition) {
      this._template.classList.remove(this._transition);
    }
    // other stuff that may come later
  }
  async _Activate(force?: boolean) {
    //
    if (!this._persist || force) {
      await this._package();
    } else {
      if (!this._packed) {
        this._packed = true;
        await this._package();
      }
    }

    const doc = document.querySelector("[data-cra-id=cradova-app-wrapper]");
    if (!doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root <div data-cra-id='cradova-app-wrapper'> ... </div>"
      );
    }
    if (this._transition) {
      this._template.classList.add(this._transition);
    }
    doc.innerHTML = "";
    doc.appendChild(this._template as any);
    document.title = this._name;
    if (this._callBack) {
      await this._callBack();
    }
    window.dispatchEvent(cradovaAftermountEvent);
    window.scrollTo(0, 0);
  }
}
