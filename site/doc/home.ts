// @ts-ignore
import _, { Screen, dispatch } from "../../dist";
import sm from "../index";
// import about from "./about";
// import home from "./info";
// Screen
function header() {
  let d = 0;
  return _(
    "div",
    _("img", { src: "assets/cradova.png" }),
    _("h1.cradova|Cradova"),
    _("h1.cradova", {
      text: "Current data is =>   " + d,
      stateID: "c",
      onclick() {
        d += 1;
        dispatch("c", { text: "Current data is =>   " + d });
      },
    }),
    _("h2", { text: "Build apps that feels native" }),
    _("button|home", {
      // backgroundColor: "black",
      onclick() {
        sm.push("info");
      },
    })
  );
}

export default new Screen({
  name: "Cradova",
  template: header,
});
