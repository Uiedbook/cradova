import _ from "../index.js";
import {dispatch} from "./dispatcher.js";
import {uuid} from "./uuid.js";
/**
 *
 * @param {cradova_element template string} element_initials
 * @param {html property object} props
 * @returns
 */
export  function $(element_initials = "div", props: Record<string, string> = {}) {
  props.stateID = uuid();
  const element = _(element_initials, props);
  return [element, dispatch.bind(null, props.stateID)];
}
