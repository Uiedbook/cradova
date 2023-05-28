import _, { div } from "../dist/index.js";
function benchSuit(code, runs = 10_000, lab) {
  const startTime = performance.now();
  for (let i = 0; i < runs; i++) {
    code();
  }
  let totalTime = performance.now() - startTime;
  console.log(
    `Code took ${totalTime} ms on ${runs} runs with an average of ${
      totalTime / runs
    } ms per operation`
  );
  if (lab) {
    console.log(lab);
  }
  return totalTime;
}
let a = 0;
benchSuit(
  () => {
    document.body.appendChild(div(a));
    a += 1;
  },
  1000,
  "cradova"
);
