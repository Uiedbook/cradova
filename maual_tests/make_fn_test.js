//? ----> test passed

const Purifier = (txx) => {
  let tag;
  if (!txx.includes("#")) {
    txx = txx.split(".");
    tag = txx.shift();
    if (!tag) {
      tag = "div";
    }
    return [txx, [], tag];
  } else {
    if (!txx.includes(".")) {
      txx = txx.split("#");
      tag = txx.shift();
      if (!tag) {
        tag = "div";
      }
      if (txx[0].includes(" ")) {
        txx = [txx[0].split(" ")[1]];
      }
      return [[], txx, tag];
    }
  }
  txx = txx.split(".");
  const classes = [];
  const IDs = [];
  tag = !txx[0].includes("#") && txx.shift();
  if (!tag) {
    tag = "div";
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
  return [classes.join(" "), IDs[0], tag];
};

const make = function (txx) {
  if (!txx.length) {
    return {
      tag: "div",
    };
  }
  if (Array.isArray(txx)) {
    txx = txx[0];
  }
  let innerValue = "";
  if (txx.includes("|")) {
    [txx, innerValue] = txx.split("|");
    if (!txx) {
      return { tag: "P", innerValue };
    }
  }
  const [className, ID, tag] = Purifier(txx);
  return { tag, className, ID, innerValue };
};

const a = [
  make`|god is good`,
  make("#pino.bar.jojo#kilo.lol#jolo| god is love "),
  make(".foo.gooo.lol.poh#pap|hello people"),
];

console.log(...a);
