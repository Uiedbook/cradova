/* eslint-disable no-undef */
export const Init = function () {
  if (document.getElementById("Cradova-app-wrapper")) {
    return;
  }
  const Wrapper: any = document.createElement("div");
  Wrapper.id = "Cradova-app-wrapper";
  Wrapper.stateID = "Cradova-app-wrapper";
  document.body.append(Wrapper);
};
