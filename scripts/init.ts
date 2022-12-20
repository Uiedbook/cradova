export const Init = function () {
  if (document.getElementById("Cradova-app-wrappper")) {
    return;
  }
  const Wrapper: any = document.createElement("div");
  Wrapper.id = "Cradova-app-wrappper";
  Wrapper.stateID = "Cradova-app-wrappper-id";
  document.body.append(Wrapper);
};
