declare const w: (...childrens: HTMLElement[] | ((el: Record<string, string>) => HTMLElement)[]) => () => DocumentFragment;
export default w;
