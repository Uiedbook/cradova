/**
 *
 * @param {expession} condition
 * @param {function} callback
 */

export default function assert(condition, callback) {
  if (condition) {
    return callback(condition);
  }
  return " ";
}
