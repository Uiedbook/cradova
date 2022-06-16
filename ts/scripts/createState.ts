import _ from "../index.js";
import { CradovaElemetType } from "../types.js";
import dispatcher from "./dispatcher.js";
import uuid from "./uuid.js";

export default function createState(
  element: CradovaElemetType | ((element: any) => CradovaElemetType) | string
) {
  let CradovaElement;
  const id = uuid();
  if (typeof element === "string") {
    CradovaElement = _(element, { stateID: id });
  } else if (typeof element === "function") {
    CradovaElement = element({ stateID: id });
  } else if (element instanceof HTMLElement) {
    element.stateID = id;
    CradovaElement = element;
  } else {
    throw new Error(
      "cradova err invalid element type  " +
        element +
        "  should be  string, or cradova element type"
    );
  }

  return [CradovaElement, dispatcher.bind(CradovaElement, id)];
}
