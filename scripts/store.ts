class store {
  #index = 0;
  #history: unknown[] = [];
  #value: unknown = null;
  constructor(initial: unknown) {
    this.#value = initial;
    this.#history.push(initial);
  }
  get(): unknown {
    return this.#value;
  }

  set(value: unknown) {
    this.#value = value;
    this.#history.push(value);
    this.#index += 1;
  }
  forward() {
    if (this.#history.length > this.#index + 1) {
      this.#value = this.#history[this.#index + 1];
    }
  }
  backward() {
    if (this.#history.length > 0 && this.#index > 0) {
      this.#value = this.#history[this.#index - 1];
      this.#index -= 1;
    }
  }
}

const Store = function (initial: any) {
  return new store(initial);
};

// const value = Store("hello world people");
// console.log(value.get());
//
// value.set("hi yall people");
// console.log(value.status());
//
// value.backward();
// console.log(value.get());
//
// value.forward();
// console.log(value.get());

export default Store;
