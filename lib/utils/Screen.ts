import { CradovaScreenType } from "../types.js";
import { CradovaEvent, frag, isNode } from "./fns.js";

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
    // @ts-ignore
    this._html = template;
    this._name = name;
    this._transition = transition || "";
    this._template.setAttribute("id", "cradova-screen-set");
    if (renderInParallel === true) {
      this._delegatedRoutesCount = 1;
    } else {
      if (typeof persist === "boolean") {
        this._persist = persist;
      }
    }
  }

  get _delegatedRoutes(): boolean {
    if (this._delegatedRoutesCount > 1000) {
      return -1 as unknown as boolean;
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
    // @ts-ignore
    if (this._html.render) {
      this._template.innerHTML = "";
      // @ts-ignore
      this._template.appendChild(this._html.render(this._data));
    }

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
      console.error(" ✘  Cradova err: expected a screen but got ", this._html);
      throw new Error(
        " ✘  Cradova err: only functions that returns a cradova element is valid as screen"
      );
    }
    if (this._secondaryChildren.length) {
      let i = 0;
      while (this._secondaryChildren.length - i !== 0) {
        // @ts-ignore
        this.template.appendChild(this._secondaryChildren[i]);
        i++;
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
    CradovaEvent.dispatchEvent("cradovaAftermountEvent");
    if (window) {
      window.scrollTo(0, 0);
    }
  }
}
