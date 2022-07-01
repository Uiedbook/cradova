export  function PromptBeforeLeave() {
  window.addEventListener("beforeunload", (ev) => {
    const e = ev || window.event;
    if (e) {
      e.preventDefault();
      e.returnValue = "";
    }
    return "";
  });
}
