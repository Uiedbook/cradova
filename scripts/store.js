var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _store_index, _store_history, _store_value;
class store {
    constructor(initial) {
        _store_index.set(this, 0);
        _store_history.set(this, []);
        _store_value.set(this, null);
        __classPrivateFieldSet(this, _store_value, initial, "f");
        __classPrivateFieldGet(this, _store_history, "f").push(initial);
    }
    status() {
        return __classPrivateFieldGet(this, _store_value, "f");
    }
    set(value) {
        __classPrivateFieldSet(this, _store_value, value, "f");
        __classPrivateFieldGet(this, _store_history, "f").push(value);
        __classPrivateFieldSet(this, _store_index, __classPrivateFieldGet(this, _store_index, "f") + 1, "f");
    }
    forward() {
        if (__classPrivateFieldGet(this, _store_history, "f").length > __classPrivateFieldGet(this, _store_index, "f") + 1) {
            __classPrivateFieldSet(this, _store_value, __classPrivateFieldGet(this, _store_history, "f")[__classPrivateFieldGet(this, _store_index, "f") + 1], "f");
        }
    }
    backward() {
        if (__classPrivateFieldGet(this, _store_history, "f").length > 0 && __classPrivateFieldGet(this, _store_index, "f") > 0) {
            __classPrivateFieldSet(this, _store_value, __classPrivateFieldGet(this, _store_history, "f")[__classPrivateFieldGet(this, _store_index, "f") - 1], "f");
            __classPrivateFieldSet(this, _store_index, __classPrivateFieldGet(this, _store_index, "f") - 1, "f");
        }
    }
}
_store_index = new WeakMap(), _store_history = new WeakMap(), _store_value = new WeakMap();
const Store = function (initial) {
    return new store(initial);
};
// const value = Store("hello world people");
// console.log(value.status());
//
// value.set("hi yall people");
// console.log(value.status());
//
// value.backward();
// console.log(value.status());
//
// value.forward();
// console.log(value.status());
export default Store;
