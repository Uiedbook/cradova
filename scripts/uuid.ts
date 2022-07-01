
/**
 * @param {length} num
 * @returns uuid
 */
export  function uuid(num = 10) {
  function dec2hex(dec: { toString: (arg0: number) => string; }) {
    return dec.toString(16).padStart(2, "0");
  }
  function generateId(len: number) {
    len = Math.round(len);
    return Array.from(
      crypto.getRandomValues(new Uint8Array(len || 10)),
      dec2hex
    ).join("");
  }
  return generateId(num);
}
