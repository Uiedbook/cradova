export type CradovaElemetType = HTMLElement &
  Record<string, any> & {
    style: Record<string, unknown>;
    stateID: string;
} ;
  // FIXME: This is too rough for use a type for cradova element type
  // replaced with any for
export type CradovaHTMLElemetType = (...element_initials: any[]) =>
  ((...element_initials: any[]) => "empty cradova call")
  | ((...element_initials: any[]) =>
  HTMLElement | undefined)

export  type CradovaScreenType = {
  name: string;
  template: Function | HTMLElement;
  transition?: string;
  callBack?: (html?: any, data?: Record<string, any>) => void;
  persist?: boolean;
}
