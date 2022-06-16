import _ from "../index.js";
import dispatcher from "./dispatcher.js";
import uuid from "./uuid.js";
/**
 *
 * @param {cradova_element template string} element_initials
 * @param {html property object} props
 * @returns
 */
export default function $(element_initials = "div", props = {}) {
  props.stateID = uuid();
  const element = _(element_initials, props);
  return [element, dispatcher.bind(this, props.stateID)];
}
