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
var _index, _history, _value, _useHistory, _callabck;
class store {
    constructor(initial, useHistory) {
        _index.set(this, 0);
        _history.set(this, []);
        _value.set(this, null);
        _useHistory.set(this, false);
        _callabck.set(this, void 0);
        __classPrivateFieldSet(this, _value, initial);
        if (useHistory) {
            __classPrivateFieldSet(this, _useHistory, useHistory);
            __classPrivateFieldGet(this, _history).push(initial);
        }
    }
    get() {
        return __classPrivateFieldGet(this, _value);
    }
    set(value) {
        __classPrivateFieldSet(this, _value, value);
        if (!__classPrivateFieldGet(this, _useHistory))
            return;
        __classPrivateFieldSet(this, _index, __classPrivateFieldGet(this, _index) + 1);
        __classPrivateFieldGet(this, _history).push(value);
        if (__classPrivateFieldGet(this, _callabck)) {
            __classPrivateFieldGet(this, _callabck).call(this, __classPrivateFieldGet(this, _value));
        }
    }
    setKey(name, value) {
        if (typeof __classPrivateFieldGet(this, _value) === "object") {
            __classPrivateFieldGet(this, _value)[name] = value;
            if (!__classPrivateFieldGet(this, _useHistory))
                return;
            __classPrivateFieldGet(this, _history).push(__classPrivateFieldGet(this, _value));
            __classPrivateFieldSet(this, _index, __classPrivateFieldGet(this, _index) + 1);
        }
        if (__classPrivateFieldGet(this, _callabck)) {
            __classPrivateFieldGet(this, _callabck).call(this, __classPrivateFieldGet(this, _value));
        }
    }
    forward() {
        if (__classPrivateFieldGet(this, _history).length > __classPrivateFieldGet(this, _index) + 1) {
            if (!__classPrivateFieldGet(this, _useHistory))
                return;
            __classPrivateFieldSet(this, _value, __classPrivateFieldGet(this, _history)[__classPrivateFieldGet(this, _index) + 1]);
        }
    }
    backward() {
        if (__classPrivateFieldGet(this, _history).length > 0 && __classPrivateFieldGet(this, _index) > 0) {
            if (!__classPrivateFieldGet(this, _useHistory))
                return;
            __classPrivateFieldSet(this, _value, __classPrivateFieldGet(this, _history)[__classPrivateFieldGet(this, _index) - 1]);
            __classPrivateFieldSet(this, _index, __classPrivateFieldGet(this, _index) - 1);
        }
    }
    listen(callabck) {
        __classPrivateFieldSet(this, _callabck, callabck);
    }
}
_index = new WeakMap(), _history = new WeakMap(), _value = new WeakMap(), _useHistory = new WeakMap(), _callabck = new WeakMap();
export const Store = function (initial, useHistory = false) {
    return new store(initial, useHistory);
};
