const RouterBox = {};

RouterBox["routes"] = {};

const checker = (url) => {
  // first strict check
  if (RouterBox.routes[url]) {
    return [RouterBox.routes[url], { path: url }];
  }
  // check for extra / in the route
  if (RouterBox.routes[url + "/"]) {
    return [RouterBox.routes[url], { path: url }];
  }
  // place holder route check
  for (const path in RouterBox.routes) {
    if (!path.includes(":")) {
      continue;
    }
    // check for extra / in the route by normalize before checking
    if (url.endsWith("/")) {
      url = url.slice(0, path.length - 2);
    }
    const urlFixtures = url.split("/");
    const pathFixtures = path.split("/");
    let fixturesX = 0;
    let fixturesY = 0;
    // remove empty string after split operation
    urlFixtures.shift();
    pathFixtures.shift();
    // length check of / (backslash)
    if (pathFixtures.length === urlFixtures.length) {
      const routesParams = {};
      for (let i = 0; i < pathFixtures.length; i++) {
        // let's jump place holders in the path since we can't determine from them
        // we increment that we skipped a position because we need later
        if (pathFixtures[i].includes(":")) {
          fixturesY += 1;
          continue;
        }
        console.log(
          urlFixtures[i],
          pathFixtures[i],
          urlFixtures[i] === pathFixtures[i]
        );
        // if this is part of the path then let increment a value for it
        // we will need it later
        if (
          urlFixtures[i] === pathFixtures[i] &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          fixturesX += 1;
        }
      }
      // if after the checks it all our count are equal then we got it correctly
      if (fixturesX + fixturesY === pathFixtures.length) {
        for (let i = 0; i < pathFixtures.length; i++) {
          if (pathFixtures[i].includes(":")) {
            routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
          }
        }
        routesParams._path = path;
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};

// const url = "/:lol/wow";
// RouterBox.routes[url] = {};
RouterBox.routes["/people/:poop/yoy/:foo/ayh"] = {};
RouterBox.routes["/people/:poop/dah/:foo/ayh"] = {};
// console.log(checker(url.split(":").join("")));
console.log(checker("/people/yoyp/yoy/xxx/ayh"));
