import _ from "../../../../index.js";
import { menu } from "./index.js";
const div = _("div.header-bar");
const img = _("img.logo", { alt: "logo" });
export default function header({ Text }) {
  return div(menu, img({ src: "../../../../cradova.png" }), _("h2| " + Text));
}
_.css(".header-bar", {
  width: "100%",
  height: "60px",
  "background-color": "#A0A3BD", //"#3490f3",
  color: "#4dccc6",
  display: "flex",
  "padding-left": "40px",
  "font-size": "16px",
  "align-items": "center",
  "justify-content": "flex-start",
});

_.css(".header-bar .logo", {
  width: "46px",
  height: "46px",
  "margin-right": "15px",
});
