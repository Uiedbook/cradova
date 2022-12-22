import _, { Router } from "../src/index";

/**
 * import screens
 */

import home from "./doc/home.js";
import info from "./doc/info.js";

/**
 * Router setup.
 */

Router.route("/", home);
Router.route("/info", info);
