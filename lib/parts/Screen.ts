import { CradovaScreenType, VJSType } from "../types.js";
import { CradovaEvent, Ref, frag, isNode } from "./fns.js";

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
  public _html: Function | HTMLElement;
  /**
   * this is a set of added html to the screen
   */
  public _secondaryChildren: VJSType<HTMLElement>[] = [];
  /**
   * error handler for the screen
   */
  public _errorHandler: ((err: unknown) => void) | null = null;
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
  public _params: Record<string, unknown> | null = null;
  private _delegatedRoutesCount = -1;
  private _transition;
  private _doc: HTMLDivElement | null = null;
  //
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel, transition } =
      cradova_screen_initials;
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

  setErrorHandler(errorHandler: (err: unknown) => void) {
    this._errorHandler = errorHandler;
  }
  async _package() {
    if (this._html instanceof Ref) {
      this._template.innerHTML = "";
      this._template.appendChild(this._html.render(this._data));
    }
    if (typeof this._html === "function") {
      let fuc = await this._html.apply(this, this._data);
      if (typeof fuc === "function") {
        fuc = fuc();
        if (isNode(fuc)) {
          this._template.innerHTML = "";
          this._template.appendChild(fuc);
        }
      } else {
        if (isNode(fuc)) {
          this._template.innerHTML = "";
          this._template.appendChild(fuc);
        }
      }
    }
    if (this._secondaryChildren.length) {
      this._template.appendChild(frag(this._secondaryChildren));
    }
  }
  onActivate(cb: () => Promise<void> | void) {
    this._callBack = cb;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this._deCallBack = cb;
  }
  addChildren(...addOns: VJSType<HTMLElement>[]) {
    this._secondaryChildren.push(...addOns);
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
    // rare case
    if (!this._persist && force === false) {
      if (!this._packed) {
        this._packed = true;
        await this._package();
      }
    } else {
      // regular case
      if (!this._persist || force) {
        await this._package();
      } else {
        if (!this._packed) {
          this._packed = true;
          await this._package();
        }
      }
    }

    //
    if (!this._doc) {
      this._doc = document.querySelector("[data-wrapper=app]");
    }
    if (!this._doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root <div data-wrapper='app'> ... </div>"
      );
    }
    if (this._transition) {
      this._template.classList.add(this._transition);
    }
    this._doc.innerHTML = "";
    this._doc.appendChild(this._template as Node);
    document.title = this._name;
    if (this._callBack) {
      await this._callBack();
    }
    CradovaEvent.dispatchEvent("onmountEvent");
  }
}
