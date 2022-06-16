/**
Write animation value in javascript 

@example

_.animate("popanimation",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/

export default function animate(indentifier, ...properties) {
  /*This is for creating css  
 animations  using javascipt*/
  const styS = "@keyframes " + indentifier + " " + "{",
    styE = "}",
    proplen = properties.length;

  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;

  const animationStep = (num) => {
    for (const [k, v] of Object.entries(properties[num][1])) {
      style += "" + k + ": " + v + ";";
    }
    aniSty += "" + properties[num][0] + "{" + style + "}";
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) {
    Animation += animationStep(i);
  }
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) {
    aniStyleTag = document.createElement("style");
  }
  aniStyleTag.media = "screen";
  totalAnimation = aniStyleTag.innerHTML;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
}
