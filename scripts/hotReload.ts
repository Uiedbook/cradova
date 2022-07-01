export  function HotReload() {
  window.addEventListener("focus", () => {
    window.location.reload();
  });
}
