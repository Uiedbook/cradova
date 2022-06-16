export default function uuid(len = 10) {
  function dec2hex(dec: { toString: (arg0: number) => string }) {
    return dec.toString(16).padStart(2, "0");
  }
  len = Math.round(len / 2);
  return Array.from(
    crypto.getRandomValues(new Uint8Array(len || 10)),
    dec2hex
  ).join("");
}
