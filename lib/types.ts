import * as CSS from "csstype";
import { Screen } from "./parts/Screen";
import { Ref, reference } from "./parts/fns";
type DataAttributes = { [key: `data-${string}`]: string };
type AriaAttributes = { [key: `aria-${string}`]: string };

export type VJSType<T> = (
  ...VJS: // children type
  (
    | undefined
    | string
    | HTMLElement
    | HTMLElement[]
    | Ref<unknown>
    | Ref<unknown>[]
    | DocumentFragment
    | DocumentFragment[]
    | TemplateStringsArray
    // property type
    | Partial<T>
    | (() => HTMLElement)
    | Partial<DataAttributes>
    | Partial<AriaAttributes>
    | CSS.Properties
    | {
        style?: CSS.Properties;
        onmount?: (this: T) => void;
        reference?: reference;
      }
  )[]
) => T;

export type VJS_params_TYPE<T> =
  // children type
  (
    | undefined
    | string
    | HTMLElement
    | HTMLElement[]
    | Ref<unknown>
    | Ref<unknown>[]
    | DocumentFragment
    | DocumentFragment[]
    | TemplateStringsArray
    // property type
    | Partial<T>
    | (() => HTMLElement)
    | Partial<DataAttributes>
    | Partial<AriaAttributes>
    | CSS.Properties<string | number>
    | {
        src?: string;
        href?: string;
        placeholder?: string;
        type?: string;
        action?: string;
        name?: string;
        alt?: string;
        for?: string;
        method?: string;
        rows?: string;
        value?: string;
        target?: string;
        rel?: string;
        required?: string;
        frameBorder?: string;
        // style?: Partial<CSSStyleDeclaration>;
        style?: CSS.Properties;
        onmount?: (this: T) => void;
        reference?: reference;
      }
  )[];

export type VJS_Child_TYPE<T> = undefined | string | T | (() => T);

export type VJS_props_TYPE = {
  style?: CSS.Properties;
  onmount?: () => void;
  reference?: reference;
};
// } & { [x: string]: unknown };

export type stateType =
  | string
  | HTMLElement
  | HTMLElement[]
  | ((() => HTMLElement) & {
      style?: CSS.Properties;
      reference?: reference;
      tree?: HTMLElement | (() => HTMLElement);
    });

export type RouterRouteObject = {
  _name: string;
  _html:
    | ((this: Screen, data?: unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
  _delegatedRoutes: number | boolean;
  _Activate: (force: boolean) => Promise<void>;
  _deActivate: (params: object) => void;
  _package: (params: unknown) => void;
  _errorHandler: ((err: unknown) => void) | null;
};

export type CradovaScreenType<T = unknown> = {
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
  template:
    | ((this: Screen, data?: T | unknown) => HTMLElement | DocumentFragment)
    | HTMLElement
    | DocumentFragment;
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
