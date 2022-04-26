declare class store {
    #private;
    constructor(initial: unknown);
    status(): unknown;
    set(value: unknown): void;
    forward(): void;
    backward(): void;
}
declare const Store: (initial: unknown) => store;
export default Store;
