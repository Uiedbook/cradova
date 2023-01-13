export function timer() {
  let start = Date.now();
  console.log("stuff took " + (Date.now() - start) + "  ms");
}
timer();
