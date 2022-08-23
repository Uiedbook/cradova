class store {
    constructor(initial, useHistory) {
        this.#index = 0;
        this.#history = [];
        this.#value = null;
        this.#useHistory = false;
        this.#value = initial;
        if (useHistory) {
            this.#useHistory = useHistory;
            this.#history.push(initial);
        }
    }
    #index;
    #history;
    #value;
    #useHistory;
    #callabck;
    get() {
        return this.#value;
    }
    set(value) {
        this.#value = value;
        if (!this.#useHistory)
            return;
        this.#index += 1;
        this.#history.push(value);
        if (this.#callabck) {
            this.#callabck(this.#value);
        }
    }
    setKey(name, value) {
        if (typeof this.#value === "object") {
            this.#value[name] = value;
            if (!this.#useHistory)
                return;
            this.#history.push(this.#value);
            this.#index += 1;
        }
        if (this.#callabck) {
            this.#callabck(this.#value);
        }
    }
    forward() {
        if (this.#history.length > this.#index + 1) {
            if (!this.#useHistory)
                return;
            this.#value = this.#history[this.#index + 1];
        }
    }
    backward() {
        if (this.#history.length > 0 && this.#index > 0) {
            if (!this.#useHistory)
                return;
            this.#value = this.#history[this.#index - 1];
            this.#index -= 1;
        }
    }
    listen(callabck) {
        this.#callabck = callabck;
    }
}
export const Store = function (initial, useHistory = false) {
    return new store(initial, useHistory);
};
