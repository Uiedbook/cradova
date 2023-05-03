//? ----> test passed

// const Purifier = (txx) => {
//   let tag;
//   if (!txx.includes("#")) {
//     txx = txx.split(".");
//     tag = txx.shift();
//     if (!tag) {
//       tag = "DIV";
//     }
//     return [txx, [], tag];
//   } else {
//     if (!txx.includes(".")) {
//       txx = txx.split("#");
//       tag = txx.shift();
//       if (!tag) {
//         tag = "DIV";
//       }
//       if (txx[0].includes(" ")) {
//         txx = [txx[0].split(" ")[1]];
//       }
//       return [[], txx, tag];
//     }
//   }
//   txx = txx.split(".");
//   const classes = [];
//   const IDs = [];
//   tag = !txx[0].includes("#") && txx.shift();
//   if (!tag) {
//     tag = "DIV";
//   }
//   for (let i = 0; i < txx.length; i++) {
//     if (txx[i].includes("#")) {
//       const item = txx[i].split("#");
//       IDs.push(item[1]);
//       if (i === 0) {
//         tag = item[0];
//         continue;
//       }
//       classes.push(item[0]);
//       continue;
//     }
//     classes.push(txx[i]);
//   }
//   return [classes.join(" "), IDs[0], tag];
// };

// const make = function (txx) {
//   if (!txx.length) {
//     return {
//       tag: "DIV",
//     };
//   }
//   if (Array.isArray(txx)) {
//     txx = txx[0];
//   }
//   let innerValue = "";
//   if (txx.includes("|")) {
//     [txx, innerValue] = txx.split("|");
//     if (!txx) {
//       return { tag: "P", innerValue };
//     }
//   }
//   const [className, ID, tag] = Purifier(txx);
//   return { tag, className, ID, innerValue };
// };

const make = function (txx) {
  if (!txx.length) {
    return ["DIV"];
  }
  if (Array.isArray(txx)) {
    txx = txx[0];
  }
  let innerValue = "";
  if (txx.includes("|")) {
    [txx, innerValue] = txx.split("|");
    if (!txx) {
      return ["P", undefined, undefined, innerValue];
    }
  }

  //

  let tag;
  if (!txx.includes("#")) {
    txx = txx.split(".");
    tag = txx.shift();
    if (!tag) {
      tag = "DIV";
    }
    return [tag, undefined, txx.join(" "), innerValue];
  } else {
    if (!txx.includes(".")) {
      txx = txx.split("#");
      tag = txx.shift();
      if (!tag) {
        tag = "DIV";
      }
      if (txx[0].includes(" ")) {
        txx = [txx[0].split(" ")[1]];
      }
      return [tag, txx[0], undefined, innerValue];
    }
  }
  txx = txx.split(".");
  const classes = [];
  const IDs = [];
  tag = !txx[0].includes("#") && txx.shift();
  if (!tag) {
    tag = "DIV";
  }
  for (let i = 0; i < txx.length; i++) {
    if (txx[i].includes("#")) {
      const item = txx[i].split("#");
      IDs.push(item[1]);
      if (i === 0) {
        tag = item[0];
        continue;
      }
      classes.push(item[0]);
      continue;
    }
    classes.push(txx[i]);
  }
  //
  return [tag || "DIV", 1, IDs[0], 2, classes.join(" "), 3, innerValue];
};

const a = [
  make`|god is good`,
  make("#pino.bar.jojo#kilo.lol#jolo| god is love "),
  make(".foo.gooo.lol.poh#pap|hello people"),
  make("h2.text-gradient.dah|Cashless and Effortless"),
  make("h2#lol|Cashless and Effortless"),
];

console.log("\n", a[0], "\n");
console.log(a[1], "\n");
console.log(a[2], "\n");
console.log(a[3], "\n");
console.log(a[4], "\n");
