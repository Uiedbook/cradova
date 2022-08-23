class store {
  #index = 0;
  #history: unknown[] = [];
  #value: any = null;
  #useHistory: boolean = false;
  #callabck: undefined | ((newValue: any) => void)
  constructor(initial: unknown, useHistory: boolean) {
    this.#value = initial;
    if (useHistory) {
      this.#useHistory = useHistory
      this.#history.push(initial);
    }
  }
  get(): any {
    return this.#value;
  }

  set(value: unknown) {
    this.#value = value;
    if (!this.#useHistory) return;
    this.#index += 1;
    this.#history.push(value);
    if (this.#callabck) {
      this.#callabck(this.#value)
    }
  }
  setKey(name: string, value: any) {
    if (typeof this.#value === "object") {
      this.#value[name] = value;
      if (!this.#useHistory) return;
      this.#history.push(this.#value);
      this.#index += 1;
    }
    if (this.#callabck) {
      this.#callabck(this.#value)
    }
  }
  forward() {
    if (this.#history.length > this.#index + 1) {
          if (!this.#useHistory) return;
      this.#value = this.#history[this.#index + 1];
    }
  }
  backward() {
    if (this.#history.length > 0 && this.#index > 0) {
          if (!this.#useHistory) return;
      this.#value = this.#history[this.#index - 1];
      this.#index -= 1;
    }
  }
  listen(callabck: ()=> void) {
    this.#callabck = callabck
  }
}

export const Store = function (initial: any, useHistory: boolean = false) {
  return new store(initial, useHistory);
};
