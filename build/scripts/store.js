define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class store {
        #index = 0;
        #history = [];
        #value = null;
        constructor(initial) {
            this.#value = initial;
            this.#history.push(initial);
        }
        get() {
            return this.#value;
        }
        set(value) {
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
    const Store = function (initial) {
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
    exports.default = Store;
});
//# sourceMappingURL=store.js.map