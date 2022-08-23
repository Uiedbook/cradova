/**
 * Document fragment
 * @param childrens
 * @returns
 */
declare type fragmentTYPE = (() => any) | HTMLElement;
export declare const fragment: (...childrens: fragmentTYPE[]) => () => DocumentFragment;
export {};
