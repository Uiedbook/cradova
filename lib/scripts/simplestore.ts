/**
 *  Cradova simpleStore
 * ----
 *  create stateful data store.
 * ability to:
 * - create a store
 * - set keys instead of all values
 * - update a cradova Ref/RefList/RefElement automatically
 * @constructor initial: any, Ref/RefList/RefElement: any
 */

import { RefType } from "../types";

export class simpleStore {
  private ref: any;
  value: any = null;
  constructor(initial: unknown, ref: RefType) {
    this.value = initial;
    this.bindRef(ref);
  }
  /**
   *  Cradova simpleStore
   * ----
   *  set simpleStore value
   * @param value - simpleStore value
   * @returns void
   */
  set(value: unknown, shouldRefRender?: boolean) {
    if (typeof value === "function") {
      this.value = value(this.value);
    } else {
      this.value = value;
    }
    if (this.ref && shouldRefRender !== false) {
      this.ref.updateState(this.value);
    }
  }

  /**
   *  Cradova simpleStore
   * ----
   *  set a key value if it's an object
   * @param name - name of the key
   * @param value - value of the key
   * @returns void
   */

  setKey(name: string, value: any, shouldRefRender?: boolean) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      if (typeof value === "function") {
        this.value[name] = value(this.value);
      } else {
        this.value[name] = value;
      }
      if (this.ref && shouldRefRender !== false) {
        this.ref.updateState(this.value);
      }
    }
  }
  /**
   *  Cradova simpleStore
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */
  bindRef(Ref: any) {
    if (Ref && Ref.updateState) {
      this.ref = Ref;
      if (Ref.stale) {
        Ref.stale(this.value);
      }
    } else {
      throw new Error("✘  Cradova err :  Invalid ref component" + Ref);
    }
  }
}
