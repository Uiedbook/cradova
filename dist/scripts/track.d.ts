/**
 * Send a new state to specified element with stateID
 *
 * @param stateID
 * @param state
 * @returns element(s)
 */
export declare function dispatch(stateID: string | Record<string, any>, state?: Record<string, any>): HTMLElement[];
export declare function fullScreen(e: Element): {
    set(): void;
    exist(): void;
};
