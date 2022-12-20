import _, { Screen } from "../../../cradova/index.js";
function header() {
  return _(
    "div",
    _("img", { src: "site/assets/cradova.png" }),
    _("h1.cradova|Cradova"),
    _("h2", { text: "Build apps that feels native" })
  );
}

const home = new Screen({
  name: "Cradova framework",
  template: header,
});

export default home;
