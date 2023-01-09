// @ts-ignore
import _, { Screen } from "../../dist/src/module.js";
import sm from "../index";
function header() {
  return _(
    "div",
    _("img", { src: "assets/cradova.png" }),
    _("h1.cradova|About Cradova"),
    _("h2", { text: "Build apps that feels native" }),
    _("a|go to info screen", {
      href: "/info",
    }),
    _("button|pop it", {
      onclick() {
        sm.pop();
      },
    })
  );
}

const home = new Screen({
  name: "Cradova",
  template: header,
});

export default home;
