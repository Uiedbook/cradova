/**
 *  Cradova Signal
 * ----
 *  create stateful data store.
 * ability to:
 * - create store
 * - create actions and fire them
 * - bind a Ref
 * - listen to changes
 * - persist changes to localStorage
 * - set keys instead of all values
 * - update a cradova Ref and bindings automatically
 * @constructor initial: any, props: {useHistory, persist}
 */

import { Ref } from "./fns";

export class createSignal<Type extends Record<string, any>> {
  private callback: undefined | ((newValue: Type) => void);
  private persistName: string | undefined = "";
  private actions: Record<string, any> = {};
  private ref: {
    ref: any;
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

  setKey<k extends keyof Type>(key: k, value: any, shouldRefRender?: boolean) {
    if (typeof this.value === "object" && !Array.isArray(this.value)) {
      this.value[key] = value;
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
   * @param key - key of the action
   * @param action function to execute
   */
  createAction(
    key: string | Record<string, (data?: Type) => void>,
    action?: ((data?: Type) => void) | Ref<unknown>
  ) {
    if (typeof key === "string") {
      this.actions[key] = action;
    } else {
      if (typeof key === "object" && !action) {
        for (const [nam, act] of Object.entries(key)) {
          if (typeof nam === "string" && typeof action === "function") {
            this.actions[nam] = act;
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
  fireAction(key: string, data?: unknown) {
    this._updateState(key, data as any);
    if (this.actions[key] && this.actions[key].updateState) {
      this.actions[key].updateState(data);
      return;
    } else {
      if (typeof this.actions[key] === "function") {
        this.actions[key].bind(this)(data);
        return;
      }
    }
    throw Error("✘  Cradova err : action " + key + "  does not exist!");
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

  private _updateState(name?: any, data?: Type) {
    if (name && data) {
      this.ref.map((ent) => {
        if (ent._event === name) {
          //
          if (ent._element_property && ent._signalProperty) {
            ent.ref.updateState({
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
    ref: any,
    binding: {
      event?: string;
      signalProperty: string;
      _element_property: string;
    } = { signalProperty: "", _element_property: "" }
  ) {
    if (ref.render) {
      ref.render = ref.render.bind(ref, this.value);
    }
    if (ref._setExtra) {
      ref._setExtra(this);
    }
    if (ref && ref.updateState) {
      // it's an element binding, not ref, not event(fire action events)
      this.ref.push({
        ref,
        _signalProperty: binding.signalProperty,
        _element_property: binding._element_property,
        _event: binding.event,
      });
      return;
    }

    throw new Error(
      "✘  Cradova err :  Invalid parameters for binding ref to simple store"
    );
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
