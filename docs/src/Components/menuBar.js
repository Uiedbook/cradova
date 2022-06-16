import _ from "../../../../index.js";
const menu = _("img.menu", {
  alt: "menu",
  src: "/docs/assets/menu.svg",
  onclick: () => {
    _.dispatch("drawer", { toggleclass: "show-drawer" });
  },
});

_.css(".menu", {
  width: "24px",
  position: "absolute",
  left: "10px",
  top: "16px",
});

_.media("min-width: 790px", [
  ".menu",
  {
    position: "absolute",
    left: window.innerWidth - 40 + "px",
  },
]);

export default menu;
