/* eslint-disable no-undef */
// @ts-ignore
import _, { Screen } from "../../dist/src";
import sm from "../index";
// import about from "./about";
// import home from "./info";
// Screen
function header(this: any, data: number) {
  data = data || 0;
  this.effect(() => {
    data = data ? data + 1 : 1;
    return data;
  });
  return _(
    "div",
    _("img#hello", { src: "assets/cradova.png" }),
    _("h1.cradova|Cradova"),
    _("h1.cradova|Current data is =>   " + data),
    _("h2", { text: "Build apps that feels native" }),
    _("a|go to info screen", {
      href: "/info",
    }),
    _("button|home", {
      // backgroundColor: "black",
      onclick() {
        sm.push("info");
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
