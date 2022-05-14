export default function reuse(element: {
    [x: string]: any;
    style: {
        [x: string]: unknown;
    };
    innerText: any;
    classList: {
        add: (arg0: string) => void;
    };
    append: (arg0: any) => void;
    stateID: any;
}): (...incoming: string[] | any[]) => {
    [x: string]: any;
    style: {
        [x: string]: unknown;
    };
    innerText: any;
    classList: {
        add: (arg0: string) => void;
    };
    append: (arg0: any) => void;
    stateID: any;
};
