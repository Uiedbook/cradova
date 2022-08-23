export declare type CradovaElemetType = HTMLElement & Record<string, any> & {
    style: Record<string, unknown>;
    stateID: string;
};
export declare type CradovaHTMLElemetType = (...element_initials: any[]) => ((...element_initials: any[]) => "empty cradova call") | ((...element_initials: any[]) => HTMLElement | undefined);
export declare type CradovaScreenType = {
    name: string;
    template: Function | HTMLElement;
    transition?: string;
    callBack?: (html?: any, data?: Record<string, any>) => void;
    persist?: boolean;
};
