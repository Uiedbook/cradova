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
 * - go back and forward in value history
 * - set keys instead of all values
 * - update a cradova Ref/RefList automatically
 * @constructor initial: any, props: {useHistory, persist}
 */

export class createSignal {
  private callback: undefined | ((newValue: any) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, any> = {};
  private useHistory = false;
  private history: unknown[] = [];
  private ref: any;
  private index = 0;
  private path: null | string = null;
  value: any = null;

  constructor(
    initial: unknown,
    props?: { useHistory?: boolean; persistName?: string | undefined }
  ) {
    this.value = initial;
    if (props && props.persistName) {
      this.persistName = props.persistName;
      const name = localStorage.getItem(props.persistName);
      if (name && name !== "undefined") {
        this.value = JSON.parse(name);
      }
    }
    if (props && props.useHistory) {
      this.useHistory = props.useHistory;
      this.history.push(initial);
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value
   * @param value - signal value
   * @returns void
   */
  set(value: unknown, shouldRefRender?: boolean) {
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
    if (!this.useHistory) return;
    this.index += 1;
    this.history.push(value);
  }

  /**
   *  Cradova Signal
   * ----
   *  set a key value if it's an object
   * @param name - name of the key
   * @param value - value of the key
   * @returns void
   */

  setKey(name: string, value: any, shouldRefRender?: boolean) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[name] = value;
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
      if (!this.useHistory) return;
      this.history.push(this.value);
      this.index += 1;
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an object prop of the store
   * @param key - a prop of the store - object value
   * @param name - prop of the key object
   * @param value - value of the name
   * @returns void
   */

  setPath(key: string, name: string, value: any, shouldRefRender?: boolean) {
    if (this.value[key]) {
      this.value[key][name] = value;
    } else {
      this.value[key] = { [name]: [value] };
    }
    if (this.ref && shouldRefRender !== false) {
      if (this.path) {
        this.ref.updateState(this.value[this.path]);
      } else {
        this.ref.updateState(this.value);
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a prop value inside an array prop of the store
   * @param key - a prop of the store - object value
   * @param index - index of the key object
   * @param value - value of the index
   * @returns void
   */
  setIndex(key: string, index: number, value: any, shouldRefRender?: boolean) {
    if (Array.isArray(this.value[key])) {
      this.value[key][index] = value;
    } else {
      throw new Error(
        "✘  Cradova err :  " + this.value[key] + "  is not an array "
      );
    }
    if (this.ref && shouldRefRender !== false) {
      if (this.path) {
        this.ref.updateState(this.value[this.path]);
      } else {
        this.ref.updateState(this.value);
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */
  createAction(
    name: string | Record<string, (self?: any, data?: any) => void>,
    action?: (self?: any, data?: any) => void
  ) {
    if (typeof name === "string" && typeof action === "function") {
      this.actions[name] = action;
    } else {
      if (typeof name === "object" && !action) {
        for (const [nam, action] of Object.entries(name)) {
          if (typeof nam === "string" && typeof action === "function") {
            this.actions[nam] = action;
          } else {
            throw new Error(`✘  Cradova err : can't create action ${nam}`);
          }
        }
      } else {
        throw new Error(`✘  Cradova err : can't create action ${name}`);
      }
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  fires an action if available
   * @param name - string name of the action
   * @param data - data for the action
   */
  fireAction(name: string, data?: any) {
    try {
      if (!(typeof name === "string" && this.actions[name])) {
        throw Error("");
      }
    } catch (_e) {
      throw Error("✘  Cradova err : action " + name + "  does not exist!");
    }
    this.actions[name](this, data);
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
   *  set signal value to a future one
   * @returns void
   */
  forward() {
    if (this.history.length > this.index + 1) {
      if (!this.useHistory) return;
      this.value = this.history[this.index + 1];
      this.index += 1;
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set signal value to a old past one
   * @returns void
   */
  backward() {
    if (this.history.length > 0 && this.index > 0) {
      if (!this.useHistory) return;
      this.set(this.history[this.index + 1]);
      this.index -= 1;
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
      localStorage.setItem(this.persistName, "");
    }
  }
}
