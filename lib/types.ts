import { reference } from "./parts/fns";

export type VJSType<T> = (
  ...VJS: (
    | undefined
    | string
    | Partial<T>
    | HTMLElement
    | (() => HTMLElement)
    | {
        style?: Partial<CSSStyleDeclaration>;
        onmount?: () => void;
        text?: string;
        reference?: reference;
      }
  )[]
) => T;

export type VJS_params_TYPE<T> = (
  | undefined
  | string
  | Partial<T>
  | HTMLElement
  | (() => HTMLElement)
  | {
      style?: Partial<CSSStyleDeclaration>;
      onmount?: () => void;
      text?: string;
      reference?: reference;
    }
)[];

export type VJS_props_TYPE = {
  style?: Partial<CSSStyleDeclaration>;
  onmount?: () => void;
  text?: string;
  reference?: reference;
} & { [x: string]: unknown };

export type stateType =
  | string
  | HTMLElement
  | (() => HTMLElement)
  | {
      style?: Partial<CSSStyleDeclaration>;
      text?: string;
      reference?: reference;
      tree?: HTMLElement | (() => HTMLElement);
    };

export type RouterRouteObject = {
  _name: string;
  _html: Function | HTMLElement;
  _paramData: Record<string, unknown> | null | undefined;
  _delegatedRoutes: number | boolean;
  _Activate: (force: boolean) => Promise<void>;
  _deActivate: (params: object) => void;
  _package: (params: unknown) => void;
};

/**
 *
 */

export type CradovaScreenType = {
  /**
   * Cradova screen
   * ---
   * title of the page
   * .
   */
  name: string;
  /**
   * Cradova screen
   * ---
   * a css className to add to screen when rendering it
   * Usually for adding css transitions
   * .
   */
  transition?: string;
  /**
   * Cradova screen
   * ---
   * The component for the screen
   * @param data
   * @returns void
   * .
   */
  template: Function | HTMLElement;
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
   * gets called when the the screen is displayed
   * .
   */
  // onActivate: (fn: (data: unknown) => void) => Promise<void>;
  /**
   * Cradova screen
   * ---
   * Should this screen be cached after first render?
   * you can use Route.navigate(url, null, true) to force later
   *
   * .
   */
  persist?: boolean;
};
