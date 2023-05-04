<br/>
<p align="center">
  <a href="https://github.com/fridaycandour/cradova">
    <img src="cradova.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Cradova</h1>

  <p align="center">
    Cradova is a JavaScript framework for building Single Page Applications and PWAs.
    <br/>
    <br/>
    <a href="https://github.com/fridaycandour/cradova#examples"><strong>Explore the 🎙️ docs »</strong></a>
    <br/>
    <br/>
    <a href="https://t.me/cradovaframework">Join Community</a>
    .
    <a href="https://github.com/fridaycandour/cradova/issues">Report Bug</a>
    .
    <a href="https://github.com/fridaycandour/cradova/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/fridaycandour/cradova?color=dark-green) ![Issues](https://img.shields.io/github/issues/fridaycandour/cradova) ![License](https://img.shields.io/github/license/fridaycandour/cradova)
[![npm Version](https://img.shields.io/npm/v/cradova.svg)](https://www.npmjs.com/package/cradova)
[![License](https://img.shields.io/npm/l/cradova.svg)](https://github.com/cradova/cradova.js/blob/next/LICENSE)
[![npm Downloads](https://img.shields.io/npm/dm/cradova.svg)](https://www.npmjs.com/package/cradova)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cradova/cradova.js/blob/next/contributing.md)![Forks](https://img.shields.io/github/forks/fridaycandour/cradova?style=social) ![Stargazers](https://img.shields.io/github/stars/fridaycandour/cradova?style=social)

# Contents

- [What is Cradova](#what-is-cradova)
- [Why Cradova?](#whats-the-benefit)
- [Installation](#installation)
- [Examples](#examples)
- [Documentation](#documentation)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## What is Cradova?

Cradova is a web development framework for building Single Page Applications and PWAs.

It's a fast, simple and modern, it provides state management, routing system and a rest API utility out of the box.

Cradova follows the [VJS specification](https://github.com/fridaycandour/cradova/blob/main/spec.md)

## What's the benefit?

Cradova is aimed to be fast and simple with and fewer abstractions and yet easily composable.

Cradova is not built on visual DOM or diff algorithms.
Instead, State management is done more elegantly with a simple predictive model, simple and easy with all the speed.

## Is this a big benefit?

Undoubtedly, this provides a significant advantage. You can experience it firsthand and decide.

Cradova has already been utilized in multiple production projects, and we will continuously update this page to showcase our advancements as we keep improving.

[current version changes](https://github.com/fridaycandour/cradova/blob/main/CHANGELOG.md#v220)

## Installation

### CDN sources

```html
<!-- unpkg -->

<script src="https://unpkg.com/cradova/dist/index.js"></script>

<!--    js deliver -->

<script src="https://cdn.jsdelivr.net/npm/cradova/dist/index.js"></script>
```

### npm

```bash
npm i cradova
```

## Examples

Many aspects of Cradova are not reflected in the following example. More functionality will be entailed in future docs.

## A basic component in Cradova:

```js
import { div, h1 } from "cradova";

function Hello(name) {
  return h1("Hello " + name, {
    className: "title",
    style: {
      color: "grey",
    },
  });
}

const html = div(Hello("peter"), Hello("joe"));

document.body.append(html);
```

## working with state:

this a collection of basic examples
you can choose any that best suite what problem you want to solve

```js
import _, {
  button,
  createSignal,
  Ref,
  reference,
  h1,
  br,
  div,
} from "../dist/index.js";

function Hello(name) {
  return h1("Hello " + name, {
    className: "title",
    style: {
      color: "grey",
    },
  });
}

const html = div(Hello("peter"), Hello("joe"));

// reference (not state)

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

// setting shouldUpdate to true
// gives you this.updateState binding

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
  return div({
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
  return div(counter, dataCounter, HelloMessage, br, nameRef);
}

// add your app to the DOM

document.body.append(App());
```

## Simple Todo list

Let's see a simple TodoList example

```js
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
```

## working with screen and Router:

unlike just appending stuff to the DOM,
a better to build apps is to use a routing system.

Cradova Router is a module that allows you do the following:

Create specified routes in you application
help you orchestrate navigation
render a screen on a route
pre-render a screen in the background if you want to.
listen to Navigation changes
create error boundary at screen level.
persist rendered screens by default
allow parallel screen rendering for every unique route scheme

let's try an example.

```js
import _, { Screen, Router } from "cradova";

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
Router.BrowserRoutes({
  "/home": home,
  "/lazy-loaded-home": async () => await import("./home"),
});
// creates these routes

Router.packageScreen("/home");
// get the page ready in the background

Router.navigate("/home", data);
// navigates to that page

Router.getParams();
// get route params for this current page

Router.onPageEvent((lastRoute, newRoute) => {
  console.log(lastRoute, newRoute);
});
// listen for navigation changes
```

### More info

---

More info on cradova Router

---

Every cradova app mounts on a div with attribute data-wrapper="app"

if it already exist cradova will use it instead.

cradova will create a div with data-wrapper="app" if it doesn't exists already.

so if you want to use your own mount point then create a div with data-wrapper="app".

---

More info on cradova screens

---

screens are rendered once by default to hack
responsiveness making your app work fast as user navigates.

this behavior can be override
by passing
persist: false
in the constructor

Cradova screens has
onActivate() and
onDeactivate() methods which is also available in the
component function on the this variable bound to it.

this allow you manage rendering
circle for each screen in your app

## Documentation

At the moment, we're in the process of creating documentation for Cradova, and we have limited resources. If you're interested in lending a hand, we invite you to join our community, gain firsthand experience, and contribute to the advancement of Cradova.

## Getting Help

To get further insights and help on Cradova, visit our new [Telegram Community Chat](https://t.me/cradovaframework).

## Contributing

We are currently working to [set](https://github.com/fridaycandour/cradova/blob/main/contributing.md) up the following:

- building cradova CLI (in progress)
- Cradova Documentation Website
- UI component libraries for cradova
- Sample projects
- maintenance and promotion

## Sponsor

Your support is appreciated and needed to advance Cradova for more performance and improvements.

Sponsorships can be done via [Patreon](https://www.patreon.com/FridayCandour) and [KO-FI](https://www.ko-fi.com/fridaycandour).

Both monthly-recurring sponsorships and one-time donations are accepted.
