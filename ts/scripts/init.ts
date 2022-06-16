import css from "./css.js";
const Init = function (config: any) {
  const Wrapper = document.createElement("div");
  Wrapper.className = "Cradova-app-wrappper";
  Wrapper.id = "app-wrapper";
  css(".Cradova-app-wrappper", {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-direction": "column",
    width: "100%",
  });
  Wrapper.stateID = "Cradova-app-wrappper-id";
  document.body.append(Wrapper);
  return Wrapper;
};
export default Init;
