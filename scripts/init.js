import css from "./css.js";
import memory from "./memory.js";
const Init = function (self) {
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
  //
  const lastMemory = window.localStorage.getItem("cradova-local-memory");
  if (lastMemory) {
    self.memory = new memory(JSON.parse(lastMemory));
  } else {
    self.memory = new memory();
  }
  //
  return Wrapper;
};
export default Init;
