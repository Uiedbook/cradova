/**
 *  Cradova Signal
 * ----
 *  create stateful data store.
 * ability to:
 * - create a store
 * - create actions and fire them
 * - bind a Ref or RefList
 * - listen to changes
 * - persist changes to localStorage
 * - set keys instead of all values
 * - update a cradova Ref/RefList automatically
 * @constructor initial: any, props: {useHistory, persist}
 */

export class createSignal<Type extends Record<string, unknown>> {
  private callback: undefined | ((newValue: Type) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, any> = {};
  private ref: any;
  private path: null | string = null;
  value: Type;

  constructor(initial: Type, props?: { persistName?: string | undefined }) {
    this.value = initial;
    if (props && props.persistName) {
      this.persistName = props.persistName;
      const key = localStorage.getItem(props.persistName);
      if (key && key !== "undefined") {
        this.value = JSON.parse(key);
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   */
  set(value: Type | ((value: Type) => Type), shouldRefRender?: boolean) {
    if (typeof value === "function") {
      this.value = value(this.value);
    } else {
      this.value = value;
    }
    if (this.persistName) {
      localStorage.setItem(this.persistName, JSON.stringify(this.value));
    }
    if (this.ref && shouldRefRender !== false) {
      if (this.path) {
        this.ref.updateState(this.value[this.path]);
      } else {
        this.ref.updateState(this.value);
      }
    }
    if (this.callback) {
      this.callback(this.value);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key value if it's an object
   * @param key - key of the key
   * @param value - value of the key
   * @returns void
   */

  setKey<k extends keyof Type>(key: k, value: any, shouldRefRender?: boolean) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[key] = value;
      if (this.persistName) {
        localStorage.setItem(this.persistName, JSON.stringify(this.value));
      }
      if (this.ref && shouldRefRender !== false) {
        if (this.path) {
          this.ref.updateState(this.value[this.path]);
        } else {
          this.ref.updateState(this.value);
        }
      }
      if (this.callback) {
        this.callback(this.value);
      }
    } else {
      throw new Error(
        `✘  Cradova err : can't set key ${String(
          key
        )} . store value is not a javascript object`
      );
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param key - key of the action
   * @param action function to execute
   */
  createAction(
    key: string | Record<string, (self?: this, data?: Type) => void>,
    action?: (self?: this, data?: Type) => void
  ) {
    if (typeof key === "string" && typeof action === "function") {
      this.actions[key] = action;
    } else {
      if (typeof key === "object" && !action) {
        for (const [nam, action] of Object.entries(key)) {
          if (typeof nam === "string" && typeof action === "function") {
            this.actions[nam] = action;
          } else {
            throw new Error(`✘  Cradova err : can't create action ${nam}`);
          }
        }
      } else {
        throw new Error(`✘  Cradova err : can't create action ${key}`);
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param key - string key of the action
   * @param data - data for the action
   */
  fireAction(key: string, data?: Type) {
    try {
      if (!(typeof key === "string" && this.actions[key])) {
        throw Error("");
      }
    } catch (_e) {
      throw Error("✘  Cradova err : action " + key + "  does not exist!");
    }
    this.actions[key](this, data);
  }

  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */
  bindRef(Ref: any, path?: string) {
    if (Ref && Ref.updateState) {
      this.ref = Ref;
      if (typeof path === "string") {
        this.path = path;
        Ref.render = Ref.render.bind(Ref, this.value[path]);
      } else {
        Ref.render = Ref.render.bind(Ref, this.value);
      }
    } else {
      throw new Error("✘  Cradova err :  Invalid ref component" + Ref);
    }
  }

  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */
  listen(callback: (a: any) => void) {
    this.callback = callback;
  }
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   *
   *
   * .
   */
  clearPersist() {
    if (this.persistName) {
      localStorage.removeItem(this.persistName);
    }
  }
}
