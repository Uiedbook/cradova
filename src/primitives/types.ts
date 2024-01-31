import * as CSS from "csstype";
import { Ref, Screen, reference } from "./classes";

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
  reference?: reference;
  autocomplete?: string;
  style?: CSS.Properties;
  updateState?: (P: any) => void;
  onmount?: (this: HTMLElement & Attributes) => void;
};

export type VJS_params_TYPE =
  // children type
  (
    | Ref
    | Ref[]
    | string
    | undefined
    | HTMLElement
    | HTMLElement[]
    | DocumentFragment
    // property type
    | Attributes
    | (() => HTMLElement)
    | Partial<Attributes>
    | Partial<HTMLDivElement>
    | Partial<DataAttributes>
    | Partial<AriaAttributes>
    | CSS.Properties<string | number>
  )[];

export interface RouterRouteObject {
  _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
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
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
    _deCallBack:
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
  };
  _apply_derivation(data: {
    _name: string;
    _callBack:
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
    _deCallBack:
      | ((cradovaScreenSet: HTMLElement) => void | Promise<void>)
      | undefined;
  }): unknown;
}

export type CradovaScreenType = {
  /**
   * Cradova screen
   * ---
   * title of the page
   * .
   */
  name?: string;
  /**
   * Cradova screen
   * ---
   * The component for the screen
   * @param data
   * @returns void
   * .
   */
  template: (this: Screen) => Element | Ref;
  /**
   * Cradova screen
   * ---
   * Allows this screen render in parallel for unique routes
   *
   * limit is 1000
   *
   * .
   */
  renderInParallel?: boolean;
  /**
   * Cradova screen
   * ---
   * Should this screen be cached after first render?
   * you can use Route.navigate(url, null, true) to force later
   *
   * .
   */
  persist?: boolean;
  /**
   * Cradova screen
   * ---
   * Should the loading screen be show as this screen is loading?
   * .
   */
};
