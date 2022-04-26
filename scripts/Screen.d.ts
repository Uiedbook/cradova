declare class Screen {
    name: string;
    template: HTMLElement;
    callBacks: ((html: ChildNode | null) => void)[];
    constructor(name: string, template: HTMLElement | (() => HTMLElement));
    onActivate(cb: (html: ChildNode | null) => void): void;
    addChild(...addOns: HTMLElement[] | (() => HTMLElement)[] | string[]): void;
    detach(): void;
    Activate(): void;
}
export default Screen;
