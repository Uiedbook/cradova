import { Screen } from "./parts/Screen";
import { reference } from "./parts/fns";

type DataAttributes = { [key: `data-${string}`]: string };
type AriaAttributes = { [key: `aria-${string}`]: string };

export type VJSType<T> = (
  ...VJS: (
    | undefined
    | string
    | Partial<T>
    | HTMLElement
    | HTMLElement[]
    | DataAttributes
    | AriaAttributes
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
  | HTMLElement[]
  | DataAttributes
  | AriaAttributes
  | TemplateStringsArray
  | (() => HTMLElement)
  | {
      style?: Partial<CSSStyleDeclaration>;
      onmount?: () => void;
      text?: string;
      reference?: reference;
    }
)[];

export type VJS_Child_TYPE<T> = undefined | string | T | (() => T);

export type VJS_props_TYPE = {
  style?: Partial<CSSStyleDeclaration>;
  onmount?: () => void;
  text?: string;
  reference?: reference;
} & { [x: string]: unknown };

export type stateType =
  | string
  | HTMLElement
  | HTMLElement[]
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
  // _paramData: Record<string, unknown> | null | undefined;
  _delegatedRoutes: number | boolean;
  _Activate: (force: boolean) => Promise<void>;
  _deActivate: (params: object) => void;
  _package: (params: unknown) => void;
  _errorHandler: ((err: unknown) => void) | null;
  // _suspend: boolean;
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
  template: ((this: Screen, data?: unknown) => HTMLElement) | HTMLElement;
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
  // suspend?: boolean;
};
