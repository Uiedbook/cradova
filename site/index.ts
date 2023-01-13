// @ts-ignore
import { Scaffold } from "../dist";
/**
 * import screens
 */
import home from "./doc/home";
import info from "./doc/info";
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
