export default function reuse(element) {
    
    return (...incoming) => {
        let childrens2rd, props, text;

        for (let i = 0; i < incoming.length; i++) {
            if (
                typeof incoming[i] === "function" ||
                incoming[i] instanceof HTMLElement
            ) {
                if (Array.isArray(childrens2rd)) {
                    childrens2rd.push(incoming[i]);
                } else {
                    childrens2rd = [incoming[i]];
                }
                continue;
            }
            //
            if (
                !(incoming[i] instanceof HTMLElement) &&
                typeof incoming[i] === "object"
            ) {
                props = incoming[i];
                continue;
            }
            if (typeof incoming[i] === "string") {
                text = incoming[i];
                continue;
            }
        }

        //
        // dynamic props
        //

        if (props && typeof props === "object" && !Array.isArray(props)) {
            for (const prop in props) {
                if (prop === "style") {
                    for (const [k, v] of Object.entries(props[prop])) {
                        element.style[k] = v;
                    }
                    continue;
                }
                if (prop === "text") {
                    element.innerText = props[prop];
                    continue;
                }
                if (prop === "class") {
                    element.classList.add(props[prop]);
                    continue;
                }
                element[prop] = props[prop];
            }
        }
        if (childrens2rd && childrens2rd[0]) {
            for (let i = 0; i < childrens2rd.length; i++) {
                if (typeof childrens2rd[i] === "function") {
                    element.append(childrens2rd[i](props));
                    continue;
                }
                element.append(childrens2rd[i]);
            }
        }
        if (text) {
            element.append(text);
        }
        if (element.stateID) {
            // adding cradova dynamic signature
            element.classList.add("cra_child_doc");
        }
        return element;
    
}
}