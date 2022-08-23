/**
 * Save values to memory
 * get them when needed
 */
export declare class memory {
    #private;
    constructor(lastMemory: Record<string, unknown> | null);
    get(key: string): unknown;
    set(key: any, value: unknown): void;
    load(): boolean;
    save(): void;
}
