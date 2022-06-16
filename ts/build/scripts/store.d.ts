declare class store {
    #private;
    constructor(initial: unknown);
    get(): unknown;
    set(value: unknown): void;
    forward(): void;
    backward(): void;
}
declare const Store: (initial: any) => store;
export default Store;
