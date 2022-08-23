/**
 * Save values to memory
 * get them when needed
 */
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
var _mem, _string;
export class memory {
    constructor(lastMemory) {
        _mem.set(this, {});
        _string.set(this, "cradova-memory-cache-key");
        if (lastMemory) {
            __classPrivateFieldSet(this, _mem, lastMemory);
        }
    }
    get(key) {
        if (__classPrivateFieldGet(this, _mem)[key]) {
            return __classPrivateFieldGet(this, _mem)[key];
        }
        return null;
    }
    set(key, value) {
        __classPrivateFieldGet(this, _mem)[key] = value;
    }
    load() {
        let memory = localStorage.getItem(__classPrivateFieldGet(this, _string));
        if (!memory)
            return false;
        memory = JSON.parse(memory);
        for (const mem in memory) {
            this.set(mem, memory[mem]);
        }
        return true;
    }
    save() {
        const memory = {};
        for (const mem in __classPrivateFieldGet(this, _mem)) {
            memory[mem] = __classPrivateFieldGet(this, _mem)[mem];
        }
        for (const val in memory) {
            if (val) {
                localStorage.setItem(__classPrivateFieldGet(this, _string), JSON.stringify(memory));
                break;
            }
        }
    }
}
_mem = new WeakMap(), _string = new WeakMap();
