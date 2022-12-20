/**
 * swipe
 * ---
 * Now you can detect swipes the best way possible
 *
 * @param callabck
 * @param touching?
 */
export declare function swipe(callabck: (swipe_data: Record<string, number>) => void, touching?: boolean): {
    start(): void;
    stop(): void;
};
