/* eslint-disable no-undef */
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
