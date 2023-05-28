//? ----> test passed

// const a = new Promise((res) => {
//   setTimeout(() => {
//     res("pro");
//   }, 100);
// });
// const b = async () => {
//   setTimeout(() => {
//     return "bro";
//   }, 100);
// };
// const s = await a;
// const y = await b();
// console.log(s, y);
// console.log("2");

// const e = new Array(1000);
// e.fill({ name: "hello world" });

function benchSuit(code, runs = 1) {
  const st = Date.now();
  let i = 0;
  while (runs - i !== 0) {
    code();
    i++;
  }
  const time = Date.now() - st;
  console.log(
    "code took " +
      time +
      "  mini secs on " +
      runs +
      " runs and average of " +
      time / runs +
      " ms per operation"
  );
}

// benchSuit(() => {
//   let i = 0;
//   while (e.length - i !== 0) {
//     e[i] = null;
//     i++;
//   }
// }, 1000);

// benchSuit(() => {
//   for (let i = 0; i < e.length; i++) {
//     e[i] = null;
//   }
// }, 10);
// benchSuit(() => {
//   for (let i = 0; i < e.length; i++) {
//     e[i] = null;
//   }
// }, 1000);

// benchSuit(() => {
//   let txx = "l|l";
//   if (txx.includes("|")) {
//     txx = "";
//     //
//   }
// });
// benchSuit(() => {
//   let txx = "";
//   if (txx.indexOf("|") > -1) {
//     txx = "";
//     //
//   }
// });
