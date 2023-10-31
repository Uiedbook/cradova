import { CradovaScreenType /*VJSType */ } from "../types.js";
import { CradovaEvent, /*frag,*/ isNode, reference } from "./fns.js";

export const localTree = new reference();

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
  public _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  /**
   * error handler for the screen
   */
  public _errorHandler: ((err: unknown) => void) | null = null;
  /**
   * used internally
   */
  private _name: string;
  private _transition;
  private _packed = false;
  private _template = document.createElement("div");
  private _callBack: (() => Promise<void> | void) | undefined;
  private _deCallBack: (() => Promise<void> | void) | undefined;
  private _persist = true;
  private _delegatedRoutesCount = -1;
  private _dropped = false;
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel, transition } =
      cradova_screen_initials;
    this._html = template;
    this._name = name || "Document";
    this._transition = transition;
    this._template.setAttribute("id", "cradova-screen-set");
    if (renderInParallel === true) {
      this._delegatedRoutesCount = 0;
      this._persist = false!;
    } else {
      if (typeof persist === "boolean") {
        this._persist = persist!;
      }
    }
  }

  _derive() {
    return {
      _name: this._name,
      _transition: this._transition,
      _callBack: this._callBack,
      _deCallBack: this._deCallBack,
    };
  }
  _apply_derivation(derivation: {
    _name: string;
    _transition: string | undefined;
    _callBack: (() => void | Promise<void>) | undefined;
    _deCallBack: (() => void | Promise<void>) | undefined;
  }) {
    this._name = derivation._name;
    this._transition = derivation._transition;
    this._callBack = derivation._callBack;
    this._deCallBack = derivation._deCallBack;
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
      let fuc = await this._html.apply(this);
      if (typeof fuc === "function") {
        fuc = (fuc as () => any)();
        if (isNode(fuc)) {
          this._template.innerHTML = "";
          this._template.appendChild(fuc);
        }
      } else {
        if (isNode(fuc)) {
          this._template.innerHTML = "";
          this._template.appendChild(fuc);
        } else {
          throw new Error(
            ` ✘  Cradova err:  template function for the screen with name '${this._name}' returned ${fuc} instead of html`
          );
        }
      }
    }
  }
  onActivate(cb: () => Promise<void> | void) {
    this._callBack = cb;
  }
  onDeactivate(cb: () => Promise<void> | void) {
    this._deCallBack = cb;
  }
  async _deActivate() {
    if (this._deCallBack) {
      await this._deCallBack();
    }
    if (this._transition) {
      this._template.classList.remove(this._transition);
    }
  }
  drop(state?: boolean) {
    if (typeof state === "boolean") {
      this._dropped = state;
      return undefined;
    } else return this._dropped;
  }
  async _Activate(force: boolean = false) {
    // check if the screen is dropped
    if (this._dropped) {
      history.go(-1);
      return;
    }
    // packaging the screen dom
    if (!this._persist || force || !this._packed) {
      await this._package();
      this._packed = true;
    }
    if (this._transition) {
      this._template.classList.add(this._transition);
    }
    document.title = this._name;
    localTree.globalTree.doc.innerHTML = "";
    localTree.globalTree.doc.appendChild(this._template as Node);
    CradovaEvent.dispatchEvent("onmountEvent");
    window.scrollTo({
      top: 0,
      left: 0,
      // @ts-ignore
      behavior: "instant",
    });
    if (this._callBack) {
      this._callBack();
    }
  }
}
