export default function HotReload() {
  window.addEventListener("focus", () => {
    window.location.reload();
  });
}
