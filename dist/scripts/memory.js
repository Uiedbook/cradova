/**
 * Save values to memory
 * get them when needed
 */
export class memory {
    constructor(lastMemory) {
        this.#mem = {};
        this.#string = "cradova-memory-cache-key";
        if (lastMemory) {
            this.#mem = lastMemory;
        }
    }
    #mem;
    #string;
    get(key) {
        if (this.#mem[key]) {
            return this.#mem[key];
        }
        return null;
    }
    set(key, value) {
        this.#mem[key] = value;
    }
    load() {
        let memory = localStorage.getItem(this.#string);
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
        for (const mem in this.#mem) {
            memory[mem] = this.#mem[mem];
        }
        for (const val in memory) {
            if (val) {
                localStorage.setItem(this.#string, JSON.stringify(memory));
                break;
            }
        }
    }
}
