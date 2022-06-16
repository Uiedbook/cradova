/**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/

export default function css(indentifier, selector, properties) {
  /*This is for creating
 css styles using javascipt*/
  if (typeof selector === "object") {
    properties = selector;
    selector = "";
  }
  const styS = "" + indentifier + selector + "" + "{";
  const styE = "}";
  let style = "",
    totalStyle = "";
  for (const [k, v] of Object.entries(properties)) {
    style += "" + k + ": " + v + ";";
  }
  let styleTag = document.querySelector("style");
  if (styleTag !== null) {
    totalStyle += styleTag.innerHTML;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    return;
  }
  styleTag = document.createElement("style");
  totalStyle += styleTag.innerHTML;
  totalStyle += styS + style + styE;
  styleTag.innerHTML = totalStyle;
  document.head.append(styleTag);
}
