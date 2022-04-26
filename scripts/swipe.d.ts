declare type calls = {
    up: () => void;
    down: () => void;
    right: () => void;
    left: () => void;
    touch: () => void;
};
export default function swipe(item: calls): void;
export {};
