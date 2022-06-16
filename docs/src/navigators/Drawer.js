import _ from "../../../../index.js";
import { p, a, div, icon } from "../Components/index.js";
export default function DrawerBar() {
  return div(
    {
      class: "drawer",
      stateID: "drawer",
      tabIndex: 0,
      onblur: () => {
        _.dispatch("drawer", { removeclass: "show-drawer" });
      },
      contentEditable: true,
    },
    a(
      { href: "/" },
      icon({ src: "/docs/assets/Standings.png" }),
      p({ text: "home" })
    ),
    a(
      { href: "/workspace" },
      icon({ src: "/docs/assets/Explore.png" }),
      p({ text: "learn" })
    ),
    a(
      { href: "/Profile" },
      icon({ src: "/docs/assets/support.svg" }),
      p({ text: "setting" })
    )
  );
}

_.css(".drawer", {
  transform: "scaleZ(0)",
  position: "absolute",
  top: 0,
  left: "-2000px",
  display: "flex",
  "align-items": "flex-start",
  "justify-content": "center",
  "flex-direction": "column",
  height: "100%",
  width: _.metrics.drawerWidth,
  padding: "0px",
  transition: "all 3s ease",
  border: "1px",
  "max-width": "300px",
  "background-color": "white",
  "out-line": "none",
  color: "white",
});

_.css(".drawer a", {
  display: "flex",
  width: "25%",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
});

_.css(".drawer a p", {
  "font-size": "13px",
  "font-weight": "600",
  color: "#a0a3bd",
});

_.media(
  "min-width: 790px",
  [
    ".drawer",
    {
      left: "0px",
      "background-color": "#c5cae9",
      color: "#c5cae9",
      padding: "0px 5px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [".drawer a p", { color: "#c5cae9" }]
);
