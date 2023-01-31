export function IsElementInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || window.document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth || window.document.documentElement.clientWidth)
  );
}

export function PromptBeforeLeave(callback?: (e: any) => void) {
  window.history.pushState(
    "forward",
    "",
    window.location.pathname + "#forward"
  );
  window.addEventListener("popstate", (e) => {
    if (callback) {
      callback(e);
    } else {
      alert("Are you sure, you want to go back?");
    }
  });
}
