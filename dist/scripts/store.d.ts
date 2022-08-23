declare class store {
    #private;
    constructor(initial: unknown, useHistory: boolean);
    get(): any;
    set(value: unknown): void;
    setKey(name: string, value: any): void;
    forward(): void;
    backward(): void;
    listen(callabck: () => void): void;
}
export declare const Store: (initial: any, useHistory?: boolean) => store;
export {};
