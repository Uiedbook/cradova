/**
 *
 * @param {expession} condition
 * @param {function} callback
 */

export  function assert(condition: any, callback: (arg0: any) => any) {
  if (condition) {
    return callback(condition);
  }
  return " ";
}
