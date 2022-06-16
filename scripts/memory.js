/**
 *
 */

class memory {
  #mem = {};
  #string = "cradova-memory-cache-key";
  constructor(lastMemory) {
    if (lastMemory) {
      this.#mem = lastMemory;
    }
  }
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
    if (!memory) false;
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
export default memory;
