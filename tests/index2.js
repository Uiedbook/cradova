// Simple todo list

import {
  button,
  createSignal,
  useState,
  div,
  input,
  main,
  p,
  Comp,
  h1,
  useRef,
  Page,
  Router,
  a,
  $if,
  $ifelse,
} from "../dist/index.js";

Router.BrowserRoutes({
  "/*": new Page({
    template: () =>
      div(
        new Comp(function () {
          this.test = "boohoo";
          const [state1, setState1] = useState("yes", this);
          const [state2, setState2] = useState(state1, this);
          const [state3, setState3] = useState(state2, this);
          console.log(state1, state2, state3);
          setTimeout(() => {
            setState3(state3 === "yes" ? "no" : "yes");
          }, 1000);
          return div(
            {
              style: {
                display: "flex",
                flexDirection: "column",
              },
            },
            button("turn off the lights?  : " + state1),
            button("setState 2 is?  : " + state2),
            button("setState 3 is?  : " + state3),
            {
              style: {
                marginTop: "3rem",
              },
              onclick() {
                setState1(state1 === "yes" ? "no" : "yes");
                setState2(state1 === "yes" ? "no" : "yes");
                setState3(state1 === "yes" ? "no" : "yes");
                if (state1 !== "yes") {
                  document.body.style.backgroundColor = "#000";
                } else {
                  document.body.style.backgroundColor = "#fff";
                }
              },
            }
          );
        })
      ),
  }),
});
