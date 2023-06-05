const { createElement } = React;
const { render } = ReactDOM;
function benchSuit(code, runs = 1_0009, lab) {
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
benchSuit(
  () => {
    const element = createElement("div", null, a);
    render(element, document.getElementById("root1"));
    a += 1;
  },
  1_0,
  "react"
);
