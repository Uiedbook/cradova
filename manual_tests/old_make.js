const make = function (txx ) {
  if (Array.isArray(txx)) {
    txx = txx[0];
  }
  if (typeof txx !== "string") {
    return [];
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
  let tag;
  let teak;
  if (!txx.includes("#")) {
    teak = txx.split(".");
    tag = teak.shift();
    if (!tag) {
      tag = "DIV";
    }
    return [tag, undefined, teak.join(" "), innerValue];
  } else {
    if (!txx.includes(".")) {
      teak = txx.split("#");
      tag = teak.shift();
      if (!tag) {
        tag = "DIV";
      }
      if (teak[0].includes(" ")) {
        teak = [teak[0].split(" ")[1]];
      }
      return [tag, teak[0], undefined, innerValue];
    }
  }
  teak = txx.split(".");
  const classes = [];
  const IDs = [];
  tag = !teak[0].includes("#") && teak.shift();
  if (!tag) {
    tag = "DIV";
  }
  for (let i = 0; i < teak.length; i++) {
    if (teak[i].includes("#")) {
      const item = teak[i].split("#");
      IDs.push(item[1]);
      if (i === 0) {
        tag = item[0];
        continue;
      }
      classes.push(item[0]);
      continue;
    }
    classes.push(teak[i]);
  }
  return [tag || "DIV", IDs[0], classes.join(" "), innerValue];
};