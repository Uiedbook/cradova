import { Ref } from "./fns";

/**
 *  Cradova Signal
 * ----
 *  Create stateful data store.
 *  Features:
 * - create a store
 * - create actions and fire them
 * - bind a Ref and elements
 * - listen to updates
 * - set object keys instead of all values
 * - persist changes to localStorage
 * - update a cradova Ref automatically
 * @constructor initial: unknown, props: {useHistory, persist}
 */

export class createSignal<Type extends Record<string, unknown>> {
  private callback: undefined | ((newValue: Type) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, (data?: unknown) => void> = {};
  private ref: {
    ref: Ref<unknown>;
    _event?: string;
    _signalProperty?: string;
    _element_property?: string;
  }[] = [];

  value: Type;
  constructor(initial: Type, props?: { persistName?: string | undefined }) {
    this.value = initial;
    if (props && props.persistName) {
      this.persistName = props.persistName;
      const key = localStorage.getItem(props.persistName);
      if (key && key !== "undefined") {
        this.value = JSON.parse(key);
      }
      if (typeof initial === "object") {
        for (const key in initial) {
          if (!Object.prototype.hasOwnProperty.call(this.value, key)) {
            this.value[key] = initial[key];
          }
        }
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
      //! value could be a promise
      this.value = value(this.value);
    } else {
      this.value = value;
    }
    if (this.persistName) {
      localStorage.setItem(this.persistName, JSON.stringify(this.value));
    }
    if (this.ref.length && shouldRefRender !== false) {
      this._updateState();
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

  setKey<k extends keyof Type>(
    key: k,
    value: unknown,
    shouldRefRender?: boolean
  ) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[key] = value as any;
      if (this.persistName) {
        localStorage.setItem(this.persistName, JSON.stringify(this.value));
      }
      if (this.ref.length && shouldRefRender !== false) {
        this._updateState();
      }
      if (this.callback) {
        this.callback(this.value);
      }
    } else {
      throw new Error(
        `✘  Cradova err : can't set key ${String(
          key
        )} . store.value is not a javascript object`
      );
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  set a key to signal an action
   * @param name - name of the action
   * @param action function to execute
   */
  createAction(name: string, action: (data?: unknown) => void) {
    if (typeof name === "string" && typeof action === "function") {
      this.actions[name] = action;
    } else {
      throw new Error(
        `✘  Cradova err : can't create action, ${name} is not a function`
      );
    }
  }
  /**
   *  Cradova Signal
   * ----
   *  creates man y actions at a time
   * @param name - name of the action
   * @param action function to execute
   */
  createActions(Actions: Record<string, (data?: unknown) => void>) {
    for (const [name, action] of Object.entries(Actions)) {
      if (typeof name === "string" && typeof action === "function") {
        this.actions[name] = action;
      } else {
        throw new Error(
          `✘  Cradova err : can't create action, ${name} is not a function`
        );
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
  fireAction(key: string, data?: unknown) {
    this._updateState(key, data as Type);
    if (typeof this.actions[key] === "function") {
      this.actions[key].call(this, data);
    } else {
      throw Error("✘  Cradova err : action " + key + "  does not exist!");
    }
  }

  /**
   * Cradova
   * ---
   * is used to bind signal data to elements and Refs
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

  private _updateState(name?: string, data?: Type) {
    if (name && data) {
      this.ref.map((ent) => {
        if (ent._event === name) {
          //
          if (ent._element_property && ent._signalProperty) {
            ent.ref?.updateState({
              [ent._element_property]: data[ent._signalProperty],
            });
            return;
          }
          if (ent._element_property) {
            ent.ref.updateState({
              [ent._element_property]: data,
            });
            return;
          }
          if (ent._signalProperty) {
            ent.ref.updateState(data[ent._signalProperty]);
            return;
          }
        }
      });
    } else {
      for (let i = 0; i < this.ref.length; i++) {
        const ent = this.ref[i];
        if (ent._element_property && ent._signalProperty) {
          ent.ref.updateState({
            [ent._element_property]: this.value[ent._signalProperty],
          });
          continue;
        }
        if (ent._element_property) {
          ent.ref.updateState({
            [ent._element_property]: this.value,
          });
          continue;
        }
        if (ent._signalProperty) {
          ent.ref.updateState(this.value[ent._signalProperty]);
          continue;
        }
        if (!ent._element_property && !ent._signalProperty) {
          ent.ref.updateState(this.value);
          continue;
        }
      }
    }
  }

  /**
   *  Cradova Signal
   * ----
   *  set a auto - rendering component for this store
   *
   * @param Ref component to bind to.
   * @param path a property in the object to send to attached ref
   */
  bindRef(
    ref: Partial<Ref<unknown>>, //! there's more to this friday (even elements act as ref here because of the updateState)
    binding: {
      event?: string;
      signalProperty: string;
      _element_property: string;
    } = { signalProperty: "", _element_property: "" }
  ) {
    //
    if (ref.render) {
      ref.render = ref.render.bind(ref, this.value);
    }
    if (ref._setExtra) {
      ref._setExtra(this);
    }
    if (ref && ref.updateState) {
      // it's an element binding, not ref, not event(fire action events)
      this.ref.push({
        ref: ref as Ref<unknown>,
        _signalProperty: binding.signalProperty,
        _element_property: binding._element_property,
        _event: binding.event,
      });
      return;
    }

    throw new Error(
      "✘  Cradova err :  Invalid parameters for binding ref to Signal"
    );
  }

  /**
   *  Cradova Signal
   * ----
   *  set a update listener on value changes
   * @param callback
   */
  listen(callback: (a: Type) => void) {
    this.callback = callback;
  }
  /**
   *  Cradova Signal
   * ----
   * clear the history on local storage
   *
   */
  clearPersist() {
    if (this.persistName) {
      localStorage.removeItem(this.persistName);
    }
  }
}
