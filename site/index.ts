// @ts-ignore
import { Scaffold } from "../dist/src/module.js";
/**
 * import screens
 */
// @ts-ignore
import home from "./doc/home.js";
// @ts-ignore
import info from "./doc/info.js";
// @ts-ignore
const sm = new Scaffold();
sm.addScaffolds({
  home,
  info,
});
export default sm;

/**
 * Router setup.
 */

// Router.route("/dist/site/index.html", home);
// Router.route("/", home);
// Router.route("/info", info);
