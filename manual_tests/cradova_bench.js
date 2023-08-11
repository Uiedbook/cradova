import _, { div } from "../dist/index.js";

async function benchSuit(code, runs = 1_000, lab) {
  const startTime = performance.now();
  for (let i = 0; i < runs; i++) {
    code();
  }
  const endTime = performance.now();
  let totalTime = endTime - startTime;
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
function render(c, p) {
  p.innerHTML = "";
  p.appendChild(c);
}
benchSuit(
  () => {
    const element = div(a);
    render(element, document.getElementById("root2"));
    a += 1;
  },
  1_0,
  "cradova"
);
