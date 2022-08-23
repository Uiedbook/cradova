import { CradovaScreenType } from "../types.js";
/**
   *
   * @param name
   * @param template
   * @param transitions
   */
export declare class Screen {
    /**
     * this should be a cradovva screen component
     */
    html: HTMLElement | Function;
    /**
     * this is the name of the screen that appears as the title
     */
    name: string;
    secondaryChildren: Array<any>;
    /**
     * used internally
     */
    template: HTMLDivElement;
    /**
     *
     * this a set of two class names
     * one for the entry transition
     * and one for the exit transition
     */
    transition: string | undefined;
    callBack: ((html?: any, data?: Record<string, any>) => void | undefined) | undefined;
    static SCALE_IN: string;
    static SCALE_OUT: string;
    static CIRCLE_IN: string;
    static CIRCLE_OUT: string;
    static FADE_OUT: string;
    static FADE_IN: string;
    static SLIDE_UP: string;
    static SLIDE_DOWN: string;
    static SLIDE_LEFT: string;
    static SLIDE_RIGHT: string;
    /**
     * this tells cradova to persist state on the screen or not
     * persiting is better
     */
    persist: boolean;
    constructor(cradova_screen_initials: CradovaScreenType);
    package(data: any): Promise<void>;
    onActivate(cb: (html: any) => void): void;
    addChild(...addOns: any[]): void;
    detach(): void;
    Activate(data: any): Promise<void>;
}
