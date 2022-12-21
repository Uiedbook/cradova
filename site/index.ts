import _, { Router } from "../index.js";

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
