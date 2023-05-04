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
  br,
  Screen,
  Router,
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

function typingExample() {
  const re = new reference();
  return _(
    "div",
    input({
      oninput() {
        re.text.innerText = this.value;
      },
      placeholder: "typing simulation",
    }),
    p(" no thing typed yet!", { reference: re.bindAs("text") })
  );
}

document.body.appendChild(typingExample());

const html = div(Hello("peter"), Hello("joe"));

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
      this.updateState({ text: num, "data-num": num });
    },
  });
}

// hello message

function HelloMessage() {
  return _("div.foo#bar", {
    shouldUpdate: true,
    text: "Click to get a greeting",
    onclick() {
      const name = prompt("what are your names");
      this.updateState({
        text: name ? "hello " + name : "Click to get a greeting",
      });
    },
  });
}

// using cradova Ref

const nameRef = new Ref(function (name) {
  const self = this;
  return _("div.foo#bar", {
    text: name
      ? "hello " + (name || " user 2")
      : "Click to get a second greeting",
    onclick() {
      const name = prompt();
      self.updateState(name);
    },
  });
});

function App() {
  return _(
    "div.foo#bar",
    html,
    counter,
    dataCounter,
    HelloMessage,
    br,
    nameRef,
    typingExample,
    _("a|home page", { href: "/home" })
  );
}

// add your app to the DOM

document.body.append(App());

// Ref can be used as screens

const template = new Ref(function (name) {
  // an effect run once after screen renders
  const self = this;
  self.effect(() => {
    const name = new Promise((res) => {
      res("john doe");
    });
    setTimeout(async () => {
      self.updateState(await name);
    }, 1000);
  });
  // effects can be used to make api calls needed for the page
  return _("div", name ? ">>>>>>>>  Hello  " + name : "  loading...");
});

const home = new Screen({
  name: "home page", // page title
  template,
});

// in your routes.ts file
Router.BrowserRoutes({ "/home": home });

Router.packageScreen("/home");
// get the page ready in the background

Router.navigate("/home", {});
// navigates to that page

// Router.getParams();
// get route params for this current page

Router.onPageEvent((lastRoute, newRoute) => {
  console.log(lastRoute, newRoute);
});
// listen for navigation changes
