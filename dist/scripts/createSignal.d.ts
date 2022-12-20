/**
 *  Cradova Signal
 * ----
 *  create stateful data store.
 * ability to:
 * - create a store
 * - create actions and fire them
 * - bind a Ref or RefList
 * - listen to changes
 * -  persist changes to localStorage
 * - go back and forward in value history
 * - set keys instead of all values
 * - update a cradova Ref/RefList automatically
 * @constructor initial: any, props: {useHistory, persist}
 */
export declare class Signal {
    private callback;
    private persistName;
    private actions;
    private useHistory;
    private history;
    private ref;
    private index;
    private path;
    value: any;
    constructor(initial: unknown, props?: {
        useHistory?: boolean;
        persistName?: string | undefined;
    });
    /**
     *  Cradova Signal
     * ----
     *  set signal value
     * @param value - signal value
     * @returns void
     */
    set(value: unknown, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key value if it's an object
     * @param name - name of the key
     * @param value - value of the key
     * @returns void
     */
    setKey(name: string, value: any, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a prop value inside an object prop of the store
     * @param key - a prop of the store - object value
     * @param name - prop of the key object
     * @param value - value of the name
     * @returns void
     */
    setPath(key: string, name: string, value: any, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a prop value inside an array prop of the store
     * @param key - a prop of the store - object value
     * @param index - index of the key object
     * @param value - value of the index
     * @returns void
     */
    setIndex(key: string, index: number, value: any, shouldRefRender?: boolean): void;
    /**
     *  Cradova Signal
     * ----
     *  set a key to signal an action
     * @param name - name of the action
     * @param action function to execute
     */
    createAction(name: string | Record<string, (self?: any, data?: any) => void>, action?: (self?: any, data?: any) => void): void;
    /**
     *  Cradova Signal
     * ----
     *  fires an action if available
     * @param name - string name of the action
     * @param data - data for the action
     */
    fireAction(name: string, data?: any): void;
    /**
     *  Cradova Signal
     * ----
     *  set a auto - rendering component for this store
     *
     * @param Ref component to bind to.
     * @param path a property in the object to send to attached ref
     */
    bindRef(Ref: any, path?: string): void;
    /**
     *  Cradova Signal
     * ----
     *  set signal value to a future one
     * @returns void
     */
    forward(): void;
    /**
     *  Cradova Signal
     * ----
     *  set signal value to a old past one
     * @returns void
     */
    backward(): void;
    /**
     *  Cradova Signal
     * ----
     *  set a update listener on value changes
     * @param callback
     */
    listen(callback: (a: any) => void): void;
    /**
     * Cradova Signal
     * ----
     * get value */
    get(): any;
    /**
     *  Cradova Signal
     * ----
     * clear the history on local storage
     */
    clearPersist(): void;
}
