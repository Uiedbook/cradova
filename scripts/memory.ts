/**
 *
 */

export class memory {
  #mem: Record<string, unknown> = {};
  #string = "cradova-memory-cache-key";
  constructor(lastMemory: Record<string, unknown> | null) {
    if (lastMemory) {
      this.#mem = lastMemory;
    }
  }
  get(key: string) {
    if (this.#mem[key]) {
      return this.#mem[key];
    }
    return null;
  }
  set(key: any, value: unknown) {
    this.#mem[key] = value;
  }
  load() {
    let memory: any = localStorage.getItem(this.#string);
    if (!memory) return false;
    memory = JSON.parse(memory);
    for (const mem in memory) {
      this.set(mem, memory[mem]);
    }
    return true;
  }
  save() {
    const memory: any = {};
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
