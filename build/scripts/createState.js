var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../index.js", "./dispatcher.js", "./uuid.js"], function (require, exports, index_js_1, dispatcher_js_1, uuid_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_js_1 = __importDefault(index_js_1);
    dispatcher_js_1 = __importDefault(dispatcher_js_1);
    uuid_js_1 = __importDefault(uuid_js_1);
    function createState(element) {
        let CradovaElement;
        const id = (0, uuid_js_1.default)();
        if (typeof element === "string") {
            CradovaElement = (0, index_js_1.default)(element, { stateID: id });
        }
        else if (typeof element === "function") {
            CradovaElement = element({ stateID: id });
        }
        else if (element instanceof HTMLElement) {
            element.stateID = id;
            CradovaElement = element;
        }
        else {
            throw new Error("cradova err invalid element type  " +
                element +
                "  should be  string, or cradova element type");
        }
        return [CradovaElement, dispatcher_js_1.default.bind(CradovaElement, id)];
    }
    exports.default = createState;
});
//# sourceMappingURL=createState.js.map