export const Init = function () {
  if (!document.querySelector("[data-wrapper=app]")) {
    const Wrapper: any = document.createElement("div");
    Wrapper.setAttribute("data-wrapper", "app");
    document.body.appendChild(Wrapper);
  }
};
