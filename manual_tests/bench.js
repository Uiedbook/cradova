export function benchSuit(code, runs = 1_000_000) {
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
  return totalTime;
}

// benchSuit(() => {
//   const url = "www.friday.com/pdniowf/feonpeegw/fpnwofw";
//   if (
//     url.includes("register") ||
//     url.includes("login") ||
//     url.includes("reset-password") ||
//     url.includes("webhook")
//   ) {
//     return true;
//   }
//   return false;
// });
// benchSuit(() => {
//   const ignoredUrlsRegex = /(register|reset-password|webhook|login)/i;
//   const url = "www.friday.com/pdniowf/feonpeegw/fpnwofw";
//   if (ignoredUrlsRegex.test(url)) {
//     return true;
//   }
//   return false;
// });

const props = true;
benchSuit(() => {
  const element_initials = [];
  props && element_initials.push(props);
});
benchSuit(() => {
  const element_initials = [];
  if (props) {
    element_initials.push(props);
  }
});
benchSuit(() => {
  const element_initials = [];
  switch (props) {
    case true:
      element_initials.push(props);
      break;
  }
});
