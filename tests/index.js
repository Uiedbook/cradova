// Simple todo list
import {
  a,
  button,
  div,
  h1,
  input,
  main,
  p,
  Page,
  Router,
  Signal,
  span,
  useEffect,
  useRef,
  useState,
} from "./dist/index.js";
// creating a store
const todoStore = new Signal({
  todo: ["take bath", "code coded", "take a break"],
});
// create actions
const addTodo = function (todo) {
  todoStore.publish("todo", [...todoStore.pipe.todo, todo]);
};
const removeTodo = function (todo) {
  const ind = todoStore.pipe.todo.indexOf(todo);
  todoStore.pipe.todo.splice(ind, 1);
  todoStore.publish("todo", todoStore.pipe.todo);
};

function TodoList() {
  // can be used to hold multiple references
  const referenceSet = useRef();
  // bind Function to Signal
  // markup
  return main(
    h1(`Todo List`),
    div(
      input({
        placeholder: "type in todo",
        ref: referenceSet.bindAs("todoInput"),
      }),
      button("Add todo", {
        onclick() {
          addTodo(referenceSet.elem("todoInput")?.value || "");
          referenceSet.elem("todoInput").value = "";
        },
      })
    ),
    todoList
  );
}

function todoList() {
  useEffect(() => {
    todoStore.subscribe("todo", todoList);
  }, this);
  const data = todoStore.pipe.todo;
  return div(
    data.map((item) =>
      p(item, {
        title: "click to remove",
        onclick() {
          removeTodo(item);
        },
      })
    )
  );
}
function count() {
  const [count, setCounter] = useState(0, this);
  useEffect(() => {
    const i = setInterval(() => {
      setCounter((p) => p + 1);
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, this);
  return h1(" count: " + count);
}

const counterSignal = new Signal({ count: 0 });
function count2() {
  useEffect(() => {
    let count = 0;
    setInterval(() => {
      count++;
      counterSignal.publish("count", count);
    }, 1000);
  }, this);
  return h1(" count: 0", {
    subscription: counterSignal.subscriber("count", function ({ count }) {
      this.innerText = " count: " + count;
    }),
  });
}

function HelloMessage() {
  return div("Click to get a greeting", {
    onclick() {
      const name = prompt("what are your names");
      this.innerText = name ? "hello " + name : "Click to get a greeting";
    },
  });
}
// using CradovaRef
const nameRef = function () {
  const [name, setName] = useState(null, this);
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
};
// reference (not state)
function typingExample() {
  const ref = useRef();
  return div(
    input({
      oninput() {
        ref.elem("text").innerText = this.value;
      },
      placeholder: "typing simulation",
    }),
    div(
      p(" no thing typed yet!", { ref: ref.bindAs("text") }),
      a({ href: "/p" }, "log lol in the console")
    )
  );
}
function App() {
  return div(count, count2, HelloMessage, nameRef, typingExample);
}
Router.BrowserRoutes({
  "/p": new Page({
    template() {
      return div(a("let's test link navigate", { href: "/a?name=friday" }), {});
    },
  }),
  "/": new Page({
    name: "boohoo 1",
    snapshotIsolation: true,
    template() {
      return div(
        button("go to Function as page", {
          onclick() {
            Router.navigate("/p");
          },
        }),
        TodoList,
        App
      );
    },
  }),
  "/test": new Page({
    snapshotIsolation: true,
    name: "boohoo 2",
    template() {
      return div(
        button("go to Function as page", {
          onclick() {
            Router.navigate("/p");
          },
        }),
        TodoList,
        App
      );
    },
  }),
});
