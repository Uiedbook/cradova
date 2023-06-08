import { CradovaScreenType, VJSType } from "../types.js";
import { CradovaEvent, frag, isNode, reference } from "./fns.js";

/**
 *  Cradova Screen
 * ---
 * create instances of manageable pages and scaffolds
 * @param name
 * @param template
 * @param transitions
 */
const localTree = new reference();

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
  // public _suspend = false;
  //
  private _packed = false;
  private _template = document.createElement("div");
  private _callBack: (() => Promise<void> | void) | undefined;
  private _deCallBack: (() => Promise<void> | void) | undefined;
  private _persist = true;
  private _data: unknown;
  private _delegatedRoutesCount = -1;
  private _transition;
  //
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel, transition } =
      cradova_screen_initials;
    this._html = template;
    this._name = name;
    // this._suspend = suspend!;
    this._transition = transition;
    this._template.setAttribute("id", "cradova-screen-set");
    if (renderInParallel === true) {
      this._delegatedRoutesCount = 0;
    } else {
      if (typeof persist === "boolean") {
        this._persist = persist!;
      }
    }
  }

  get _delegatedRoutes(): boolean {
    if (this._delegatedRoutesCount > 100) {
      return -1 as unknown as boolean;
    }
    return this._delegatedRoutesCount as unknown as boolean;
  }

  set _delegatedRoutes(count: boolean) {
    if (count) {
      this._delegatedRoutesCount += 1;
    }
  }

  setErrorHandler(errorHandler: (err: unknown) => void) {
    this._errorHandler = errorHandler;
  }
  async _package() {
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
  async _Activate(force: boolean = false) {
    // packaging the screen dom
    if (!this._persist || force || !this._packed) {
      await this._package();
      this._packed = true;
    }

    if (!localTree._doc) {
      localTree._appendDomForce(
        "_doc",
        document.querySelector("[data-wrapper=app]")!
      );
    }
    if (!localTree._doc) {
      throw new Error(
        " ✘  Cradova err: Unable to render, cannot find cradova root <div data-wrapper='app'> ... </div>"
      );
    }
    if (this._transition) {
      this._template.classList.add(this._transition);
    }
    localTree._doc.innerHTML = "";
    localTree._doc.appendChild(this._template as Node);
    document.title = this._name;
    CradovaEvent.dispatchEvent("onmountEvent");
    // window.scroll(0, 0);
    if (this._callBack) {
      await this._callBack();
    }
  }
}
