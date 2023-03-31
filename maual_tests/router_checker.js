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
    // remove empty string after split operation
    urlFixtures.shift();
    pathFixtures.shift();
    // length check of / (backslash)
    if (pathFixtures.length === urlFixtures.length) {
      let isIt = false;
      const routesParams = {};
      for (let i = 0; i < pathFixtures.length; i++) {
        console.log(
          urlFixtures[i],
          pathFixtures.indexOf(urlFixtures[i]),
          pathFixtures.lastIndexOf(urlFixtures[i]),
          //
          path.includes(urlFixtures[i] + "/") &&
            pathFixtures.indexOf(urlFixtures[i]) ===
              pathFixtures.lastIndexOf(urlFixtures[i]),
          path.includes(urlFixtures[i] + "/")
        );
        if (
          path.includes(urlFixtures[i] + "/") &&
          pathFixtures.indexOf(urlFixtures[i]) ===
            pathFixtures.lastIndexOf(urlFixtures[i])
        ) {
          //! not pure but effective
          //! fail safe XD
          if (!isIt) isIt = true;
        }
      }
      if (isIt) {
        for (let i = 0; i < pathFixtures.length; i++) {
          if (pathFixtures[i].includes(":")) {
            routesParams[pathFixtures[i].split(":")[1]] = urlFixtures[i];
          }
        }
        routesParams.path = path;
        return [RouterBox.routes[path], routesParams];
      }
    }
  }
  return [];
};

const url = "/:lol/wow";
RouterBox.routes[url] = {};
RouterBox.routes["/people/:poop/dah/:foo/ayh"] = {};
console.log(checker(url.split(":").join("")));
console.log(checker("/people/yoyp/dah/xxx/ayh"));
