export function benchSuit(code, runs = 1_000_000) {
  const startTime = performance.now();
  for (let i = 0; i < runs; i++) {
    code();
  }
  let totalTime = performance.now() - startTime;
  console.log(
    `Code took ${totalTime} ms on ${runs} runs with an average of ${
      totalTime / runs
    } ms per operation`,
  );
  return totalTime;
}
