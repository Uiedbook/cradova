/**
 *  Cradova simpleStore
 * ----
 *  create stateful data store.
 * ability to:
 * - create a store
 * - set keys instead of all values
 * - able to update state on any element as a property value
 * @constructor initial: any, Ref/RefList/RefElement: any
 */

export class simpleStore {
  private ref: { prop: string; ref: HTMLElement; key: string }[] = [];
  value: any = null;
  constructor(initial: unknown) {
    this.value = initial;
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
    if (this.ref.length && shouldRefRender !== false) {
      this.updateState();
    }
  }

  /**
   * Cradova
   * ---
   * is used to bind store data to any element
   *
   * @param prop
   * @returns something
   */

  bind(prop: string) {
    if (
      typeof this.value === "object" &&
      typeof this.value[prop] !== "undefined"
    ) {
      return [this, prop];
    } else {
      throw new Error(
        "✘  Cradova err : can't bind an unavailable property!  " + prop
      );
    }
  }

  private updateState(name?: string) {
    if (name) {
      const entry = this.ref.find((ent) => ent.prop === name) as any;
      if (entry) {
        entry.ref.updateState({ [entry.key]: this.value[entry.prop] });
      }
    } else {
      for (let i = 0; i < this.ref.length; i++) {
        const entry = this.ref[i] as any;
        entry.ref.updateState({ [entry.key]: this.value[entry.prop] });
      }
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
      if (this.ref.length && shouldRefRender !== false) {
        this.updateState(name);
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
  bindRef(ref: any, key: string, prop: string) {
    if (ref && ref.updateState && prop) {
      this.ref.push({ prop, ref, key });
      if (ref.reader) {
        ref.render = ref.render.bind(ref, this.value);
      }
    } else {
      throw new Error(
        "✘  Cradova err :  Invalid parameters for binding ref to simple store"
      );
    }
  }
}
