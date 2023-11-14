/*
Cradova 
License: Apache V2
Copyright 2022 Friday Candour.  
*/

import { CradovaScreenType } from "./types.js";
import { CradovaEvent, isNode, memo_SNRU, reference } from "./parts.js";

export const localTree = new reference();

/**
 *  Cradova Screen
 * ---
 * create instances of manageable pages
 * @param name
 * @param template
 */

export class Screen {
  /**
   * used internally
   */
  private _name: string;
  /**
   * this should be a cradova screen component
   */
  public _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  private _packed = false;
  private _template = document.createElement("div");
  private _callBack:
    | ((cradovaScreenSet: HTMLElement) => Promise<void> | void)
    | undefined;
  private _deCallBack:
    | ((cradovaScreenSet: HTMLElement) => Promise<void> | void)
    | undefined;
  private _persist = true;
  private _delegatedRoutesCount = -1;
  private _dropped = false;
  /**
   * error handler for the screen
   */
  public _errorHandler: ((err: unknown) => void) | null = null;
  constructor(cradova_screen_initials: CradovaScreenType) {
    const { template, name, persist, renderInParallel } =
      cradova_screen_initials;
    this._html = template;
    this._name = name || "Document";
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
    this._deCallBack && (await this._deCallBack(localTree.globalTree.doc));
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
      memo_SNRU();
      await this._package();
      this._packed = true;
    } else {
      // ? tell all active Refs to re-render
      CradovaEvent.dispatchActiveEvent("active-Refs");
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
    this._callBack && (await this._callBack(localTree.globalTree.doc));
  }
}
