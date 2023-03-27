export const Init = function () {
  if (!document.querySelector("[data-cra-id=cradova-app-wrapper]")) {
    const Wrapper: any = document.createElement("div");
    Wrapper.setAttribute("data-cra-id", "cradova-app-wrapper");
    document.body.appendChild(Wrapper);
  }
};
