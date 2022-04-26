/**
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */
declare type r = {
    routes: Record<string, Record<string, string | (() => void)>>;
    route: (path: string, controller: () => void) => void;
    navigate: (href: string) => void;
    router: (e: unknown | undefined) => void;
};
declare let Router: r;
export default Router;
