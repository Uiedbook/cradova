var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _index, _history, _value;
    exports.__esModule = true;
    var store = /** @class */ (function () {
        function store(initial) {
            _index.set(this, 0);
            _history.set(this, []);
            _value.set(this, null);
            __classPrivateFieldSet(this, _value, initial);
            __classPrivateFieldGet(this, _history).push(initial);
        }
        store.prototype.get = function () {
            return __classPrivateFieldGet(this, _value);
        };
        store.prototype.set = function (value) {
            __classPrivateFieldSet(this, _value, value);
            __classPrivateFieldGet(this, _history).push(value);
            __classPrivateFieldSet(this, _index, __classPrivateFieldGet(this, _index) + 1);
        };
        store.prototype.forward = function () {
            if (__classPrivateFieldGet(this, _history).length > __classPrivateFieldGet(this, _index) + 1) {
                __classPrivateFieldSet(this, _value, __classPrivateFieldGet(this, _history)[__classPrivateFieldGet(this, _index) + 1]);
            }
        };
        store.prototype.backward = function () {
            if (__classPrivateFieldGet(this, _history).length > 0 && __classPrivateFieldGet(this, _index) > 0) {
                __classPrivateFieldSet(this, _value, __classPrivateFieldGet(this, _history)[__classPrivateFieldGet(this, _index) - 1]);
                __classPrivateFieldSet(this, _index, __classPrivateFieldGet(this, _index) - 1);
            }
        };
        return store;
    }());
    _index = new WeakMap(), _history = new WeakMap(), _value = new WeakMap();
    var Store = function (initial) {
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
    exports["default"] = Store;
});
//# sourceMappingURL=store.js.map