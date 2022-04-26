declare type l = {
    store: (name: string, value: unknown) => void;
    retrieve: (name: string) => void;
    remove: (name: string) => void;
    getKey: (index: number) => void;
    clear: () => void;
};
declare let ls: l;
export default ls;
