export declare const err: (errors: string[], err: string, type?: string | undefined) => never;
export declare const controls: () => void;
export declare function uuid(num?: number): string;
export declare function PromptBeforeLeave(callback?: (e: any) => void): void;
/**
Write CSS media in javascript

@example

_.media("min-width: 790px",
["#container",
{
    width: "100%",
    height: "100%",
    "background-color": "#0000"
}],

["#header",
{
    width: "100%",
    height: "20%",
    "background-color": "#fff"
}]
)
*/
export declare function media(value: string, ...properties: any[]): void;
/**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/
export declare function css(identifier: string, properties: Record<string, string>): void;
/**
Write animation value in javascript

@example

_.animate("polarization",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/
export declare function animate(identifier: string, ...properties: any[]): void;
/**
 *
 * @param {expression} condition
 * @param {function} callback
 */
export declare function assert(condition: any, ...callback: (() => any)[]): "" | (() => any)[];
export declare function assertOr(condition: any, ifTrue: () => any, ifFalse: () => any): () => any;
/**
 * Create element and get a callback to update their state
 * no need to manage stateIDs
 * ----------------------------------------------------------------
 *
 * @param element_initials
 * @param props
 * @returns
 */
export declare function RefElement(element_initials?: string, props?: Record<string, string>): {
    render(data: any): any;
    updateState(state: Record<string, any>): void;
};
export declare const ls: Record<string, Function>;
export declare function fullScreen(e: Element): {
    set(): void;
    exist(): void;
};
export declare class RefList {
    private component;
    private stateID;
    private parentElement;
    private datas;
    constructor(component: (...data: any) => any);
    stale(datas: any): void;
    render(datas?: any): any;
    updateState(datas: any[]): void;
}
/**
 * Cradova Ref
 * -------
 * create dynamic components
 *
 */
export declare class Ref {
    private component;
    private stateID;
    private upcb;
    private data;
    constructor(component: (...data: any) => any);
    stale(...data: any): void;
    /**
     * Cradova Ref
     * ---
     * returns html with cradova reference
     * @param data
     * @returns html
     */
    render(...data: any): () => any;
    onStateUpdate(cb: any): void;
    /**
     * Cradova Ref
     * ---
     * update ref component with new data and update the dom.
     * @param data
     * @returns void
     */
    updateState(...data: any): void;
    remove(): void;
}
/**
 * Document fragment
 * @param children
 * @returns
 */
declare type fragmentTYPE = () => (() => HTMLElement) | HTMLElement;
export declare const frag: (...children: fragmentTYPE[]) => DocumentFragment;
export {};
