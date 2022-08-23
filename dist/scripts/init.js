import { css } from "./fns.js";
import { memory } from "./memory.js";
export const Init = function (self) {
    const Wrapper = document.createElement("div");
    Wrapper.className = "Cradova-app-wrappper";
    Wrapper.id = "app-wrapper";
    // style can be over written by another css file
    css(".Cradova-app-wrappper", {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "flex-direction": "column",
        width: "100%",
    });
    Wrapper.stateID = "Cradova-app-wrappper-id";
    document.body.append(Wrapper);
    const lastMemory = window.localStorage.getItem("cradova-local-memory");
    if (lastMemory) {
        self.memory = new memory(JSON.parse(lastMemory));
    }
    else {
        self.memory = new memory(null);
    }
    return Wrapper;
};
