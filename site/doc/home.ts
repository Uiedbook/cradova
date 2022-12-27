// @ts-ignore
import _, { Screen, Scaffold } from "../../module.js";
import sm from "../index";
// import about from "./about";
// import home from "./info";
console.log(sm.history);

function header(this: any) {
  // console.log(this.effect);
  return _(
    "div",
    _("img", { src: "assets/cradova.png" }),
    _("h1.cradova|Cradova"),
    _("h2", { text: "Build apps that feels native" }),
    _("a|go to info screen", {
      href: "/info",
    }),
    _("button|home", {
      // backgroundColor: "black",
      onclick() {
        sm.push("home");
      },
    }),
    _("button|pop", {
      // backgroundColor: "black",
      onclick() {
        sm.pop();
      },
    })
  );
}

export default new Screen({
  name: "Cradova",
  template: header,
});
