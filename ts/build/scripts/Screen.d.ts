declare class Screen {
    html: HTMLElement | Function;
    name: string;
    template: HTMLDivElement;
    callBacks: Function[];
    treeCreated: boolean;
    constructor(name: string, template: Function | HTMLElement);
    package(): Promise<void>;
    onActivate(cb: any): void;
    addChild(...addOns: any[]): void;
    detach(): void;
    Activate(): Promise<void>;
}
export default Screen;
