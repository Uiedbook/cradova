import _ from "../index.js";

/**
 * import screens
 */

import home from "./src/Screens/statistics/index.js";
import doc from "./src/Screens/workspace/index.js";
import Profile from "./src/Screens/Profile/index.js";
import DrawerBar from "./src/navigators/Drawer.js";

/**
 * adding navigators
 */

home.addChild(DrawerBar);
Profile.addChild(DrawerBar);
doc.addChild(DrawerBar);

// hidding the drawer if it was open
// appling style behaviour to tha bottom tabs

home.onActivate((_html) => {
  _.dispatch("drawer", { removeclass: "show-drawer" });
  _.dispatch("tab1", {
    style: {
      color: "white",
      paddingTop: "2px",
    },
  });
});

doc.onActivate((_html) => {
  _.dispatch("drawer", { removeclass: "show-drawer" });
  _.dispatch("tab2", {
    style: {
      color: "white",
      paddingTop: "2px",
    },
  });
});

Profile.onActivate((_html) => {
  _.dispatch("drawer", { removeclass: "show-drawer" });
  _.dispatch("tab3", {
    style: {
      color: "white",
      paddingTop: "2px",
    },
  });
});
// show and hide bottom tab here
_.swipe({
  up: () => {
    _.dispatch("downTab", { style: { display: "none" } });
  },
  down: () => {
    _.dispatch("downTab", { style: { display: "flex" } });
  },
});

/**
 * Router setup.
 */

_.Router.route("/", () => home.Activate());
_.Router.route("/Profile", () => Profile.Activate());
_.Router.route("/workspace", () => doc.Activate());

const Installer = _("button#butInstall.download-app| Install", {
  "aria-label": "Install",
  class: "hide",
});
document.body.appendChild(Installer());

_.memory.set("cprimary", "#ffffff");
_.memory.set("csecondary", "#20232a");
_.memory.set("cprimary-dull", "#f7f7f7");
_.memory.set("cprimary-light", "#57d1fb");

const code = _("div.microlight");
