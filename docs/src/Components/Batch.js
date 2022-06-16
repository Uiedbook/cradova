import _ from "../../../../index.js";
export default function Batch(Text) {
  return _("h3.batch", { text: Text });
}
_.css(".batch", {
  "background-color": "#eeeeee", //#bbc7cc;
  "justify-content": "center",
  "align-items": "center",
  padding: "9px",
  "font-weight": "800",
  color: "grey",
  "text-align": "center",
  "border-radius": "10px",
});
