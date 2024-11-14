import * as CSS from "csstype";
import { Comp, Page } from "./classes";

type DataAttributes = { [key: `data-${string}`]: string };
type AriaAttributes = { [key: `aria-${string}`]: string };

type Attributes = {
  src?: string;
  alt?: string;
  for?: string;
  rel?: string;
  href?: string;
  type?: string;
  name?: string;
  rows?: string;
  value?: string;
  accept: string;
  action?: string;
  target?: string;
  method?: string;
  checked?: boolean;
  required?: string;
  frameBorder?: string;
  placeholder?: string;
  reference?: [any, string];
  autocomplete?: string;
  style?: CSS.Properties;
  recall?: (P: any) => void;
  onmount?: (this: HTMLElement & Attributes) => void;
};

 


export type VJS_params_TYPE<E extends HTMLElement> =
  // children type
  (
    | Comp
    | Comp[]
    | string
    | undefined
    | HTMLElement
    | HTMLElement[]
    | DocumentFragment
    | DocumentFragment[]
    // property type
    | Attributes
    | (() => HTMLElement)
    | Partial<Attributes>
    | Partial<E>
    | Record<string, (this: E) => void>
    | Partial<DataAttributes>
    | Partial<AriaAttributes>
    | CSS.Properties<string | number> 
  )[];

export interface RouterRouteObject {
  _html:
    | ((this: Page, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  _delegatedRoutes: number | boolean;
  _Activate: (force: boolean) => Promise<void>;
  _deActivate: (params: object) => void;
  _package: (params: unknown) => void;
  _errorHandler: ((err: unknown) => void) | null;
  _derive(): {
    _name: string;
    _callBack:
      | ((cradovaPageSet: HTMLElement) => void | Promise<void>)
      | undefined;
    _deCallBack:
      | ((cradovaPageSet: HTMLElement) => void | Promise<void>)
      | undefined;
  };
  _apply_derivation(data: {
    _name: string;
    _callBack:
      | ((cradovaPageSet: HTMLElement) => void | Promise<void>)
      | undefined;
    _deCallBack:
      | ((cradovaPageSet: HTMLElement) => void | Promise<void>)
      | undefined;
  }): unknown;
}

export type CradovaPageType = {
  /**
   * Cradova page
   * ---
   * title of the page
   * .
   */
  name?: string;
  /**
   * Cradova page
   * ---
   * The component for the page
   * @param data
   * @returns void
   * .
   */
  template: (this: Page) => HTMLElement;
};

export type browserPageType<importType = Page> =
  | importType
  | Promise<importType>
  | (() => Promise<importType>);
