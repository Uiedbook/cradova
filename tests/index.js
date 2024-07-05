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
} from "../dist/index.js";

function TodoList() {
  // can be used to hold multiple references
  const referenceSet = useRef();

  // creating a store
  const todoStore = new createSignal([
    "take bath",
    "code coded",
    "take a break",
  ]);

  // create actions
  todoStore.createAction("add-todo", function (todo) {
    this.set([...this.value, todo]);
  });

  todoStore.createAction("remove-todo", function (todo) {
    const ind = this.value.indexOf(todo);
    this.value.splice(ind, 1);
    this.set(this.value);
  });

  // bind Comp to Signal
  todoStore.bindRef(todoList);

  // markup
  return main(
    h1(`Todo List`),
    div(
      input({
        placeholder: "type in todo",
        reference: referenceSet.bindAs("todoInput"),
      }),
      button("Add todo", {
        onclick() {
          todoStore.fireAction(
            "add-todo",
            referenceSet.current("todoInput").value
          );
          referenceSet.current("todoInput").value = "";
        },
      })
    ),
    todoList.render
  );
}

const todoList = new Comp(function () {
  const self = this;
  return div(
    self.Signal.value.map((item) =>
      p(item, {
        title: "click to remove",
        onclick() {
          self.Signal.fireAction("remove-todo", item);
        },
      })
    )
  );
});
document.body.appendChild(TodoList());

const count = new Comp(function () {
  const [count, setCounter] = useState(0, this);
  setInterval(() => {
    setCounter(count + 1);
  }, 1000);
  return h1(" count: " + count);
});

function HelloMessage() {
  return div("Click to get a greeting", {
    onclick() {
      const name = prompt("what are your names");
      this.innerText = name ? "hello " + name : "Click to get a greeting";
    },
  });
}

// using CradovaRef

const nameRef = new Comp(function () {
  const [name, setName] = useState(undefined, this);
  return div(name ? "hello " + name : "Click to get a second greeting", {
    onclick() {
      const name = prompt();
      if (name) {
        setName(name);
      } else {
        alert("Please provide a valid name");
      }
    },
  });
});

// reference (not state)

function typingExample() {
  const ref = useRef();
  return div(
    input({
      oninput() {
        ref.current("text").innerText = this.value;
      },
      placeholder: "typing simulation",
    }),
    p(" no thing typed yet!", { reference: ref.bindAs("text") }),
    a({ href: "/p" }, "log lol in the console")
  );
}

function App() {
  return div(count, HelloMessage, nameRef, typingExample);
}

document.body.append(App());

Router.BrowserRoutes({
  "/p": new Page({
    template() {
      return div(
        a("let's test link naviagate", { href: "/a?name=friday" }),
        {}
      );
    },
  }),
  "/a": new Page({
    template() {
      console.log(Router.Params);
      return div(a("go to comp as page", { href: "/comppage-1" }));
    },
  }),
  "/comppage-1": new Page({
    template: () =>
      div(
        new Comp(function () {
          this.test = "boohoo";
          const [state1, setState1] = useState("yes", this);
          const [state2, setState2] = useState("yes", this);
          console.log(state1, state2);
          return div(
            {
              onmount() {
                if (state1 === "yes") {
                  document.body.style.backgroundColor = "#000";
                }
              },
              style: {
                display: "flex",
                flexDirection: "column",
              },
            },
            $if(state2 === true, () =>
              a("link to code", { href: "/p", color: "red", display: "block" })
            ),
            button("turn off the lights?  : " + state1),
            {
              style: {
                marginTop: "3rem",
              },
              onclick() {
                setState1(state1 === "yes" ? "no" : "yes");
                setState2(state1 === "yes");
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

// const a = new Comp(function () {
//   const [state1, setState1] = useState("yes", this);
//   const [state2, setState2] = useState("yes", this);
//   return div(
//     $if(state2 === true, () => a("link to code")),
//     button("can we code today?: " + state1),
//     {
//       onclick() {
//         setState1(state1 === "yes" ? "no" : "yes");
//         setState2(state1 === "yes");
//       },
//     }
//   );
// });
