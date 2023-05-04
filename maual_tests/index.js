// Simple todo list

import _, {
  button,
  createSignal,
  css,
  div,
  input,
  main,
  p,
  Ref,
  reference,
  h1,
} from "../dist/index.js";

function TodoList() {
  // can be used to hold multiple references
  const referenceSet = new reference();

  // creating a store
  const todoStore = new createSignal([
    "take bath",
    "code code code",
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

  // bind Ref to Signal
  todoStore.bindRef(todoList);

  // markup
  return main(
    _`|Todo List`,
    div(
      input({
        placeholder: "type in todo",
        reference: referenceSet.bindAs("todoInput"),
      }),
      button("Add todo", {
        onclick() {
          todoStore.fireAction("add-todo", referenceSet.todoInput.value);
          referenceSet.todoInput.value = "";
        },
      })
    ),
    todoList.render
  );
}

const todoList = new Ref(function () {
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

css`
  body {
    box-sizing: border-box;
    display: flex;
  }
  main {
    margin: auto;
  }
  main > p {
    font-size: 2rem;
  }
`;

function Hello(name) {
  return h1("Hello " + name, {
    className: "title",
    style: {
      color: "grey",
    },
  });
}

const html = div(Hello("peter"), Hello("joe"));

// document.body.append(html);

function counter() {
  let num = 0;
  return _("h1| 0", {
    shouldUpdate: true,
    onclick() {
      num++;
      this.updateState({ text: num });
    },
  });
}

// Another example with data- attribute

function dataCounter() {
  return _("h1| 0", {
    shouldUpdate: true,
    "data-num": "0",
    onclick() {
      const num = this.getAttribute("data-num") * 1 + 1;
      console.log(num);
      this.updateState({ text: num, "data-num": num });
    },
  });
}

// hello message

function HelloMessage(name = "no name") {
  return _("div.foo#bar", {
    shouldUpdate: true,
    text: "hello  " + name,
    onclick() {
      const name = prompt("what are your names");
      this.updateState({ text: "hello " + name });
    },
  });
}

// using cradova Ref

const nameRef = new Ref(function (name) {
  const self = this;
  return _("div.foo#bar", {
    text: "hello" + (name || "  no name"),
    onclick() {
      const name = prompt();
      self.updateState(name);
    },
  });
});

function App() {
  return _(
    "div.foo#bar",
    counter,
    dataCounter,
    HelloMessage,
    nameRef.render("no name")
  );
}

// add your app to the DOM

document.body.append(App());
