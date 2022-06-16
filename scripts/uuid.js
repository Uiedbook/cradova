/**
 *
 * @param {length} length
 * @returns uuid
 */

export default function uuid(num = 10) {
  function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0");
  }
  function generateId(len) {
    len = Math.round(len);
    return Array.from(
      crypto.getRandomValues(new Uint8Array(len || 10)),
      dec2hex
    ).join("");
  }
  return generateId(num);
}
