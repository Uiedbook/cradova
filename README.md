<br/>
<p align="center">
  <a href="https://github.com/uiedbook/cradova">
    <img src="icon.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Cradova</h1>

<p align="center">
Build Powerful ⚡ Web Apps with Ease
    <br/>
    <br/>
    <a href="https://github.com/uiedbook/cradova#examples"><strong>Explore the 🎙️ docs »</strong></a>
    <br/>
    <br/>
    <a href="https://t.me/uiedbookHQ">Join Community</a>
    .
    <a href="https://github.com/uiedbook/cradova/issues">Report Bug</a>
    .
    <a href="https://github.com/uiedbook/cradova/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/uiedbook/cradova?color=dark-green)
![Issues](https://img.shields.io/github/issues/uiedbook/cradova)
![License](https://img.shields.io/github/license/uiedbook/cradova)
[![npm Version](https://img.shields.io/npm/v/cradova.svg)](https://www.npmjs.com/package/cradova)
[![License](https://img.shields.io/npm/l/cradova.svg)](https://github.com/cradova/cradova.js/blob/next/LICENSE)
[![npm Downloads](https://img.shields.io/npm/dm/cradova.svg)](https://www.npmjs.com/package/cradova)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cradova/cradova.js/blob/next/contributing.md)
![Forks](https://img.shields.io/github/forks/uiedbook/cradova?style=social)
![Stargazers](https://img.shields.io/github/stars/uiedbook/cradova?style=social)

# Cradova is 3

```js
const Cradova = new Comp(function () {
  const [year, setYear] = useState(3, this);

  return h1("Cradova is " + year + " yrs old in ", {
    onclick() {
      setYear((lastYear) => {
        return lastYear + 1;
      });
    },
  });
});

document.body.appendChild(Cradova.render());
```

## 2023 - What's New? Conditionals!

```js
import { $case, $if, $ifelse, $switch, div, h1 } from "cradova";

function Hello({ name }) {
  return div(
    $if(name === "john", h1("Hello john")),
    $if(name === "paul", h1("Goodbye paul")),
    $ifelse(name === "john", h1("Hello john"), h1("Hello Paul")),
  );
}

const html = div(Hello("john"), Hello("paul"));

function whatsAllowed({ age }) {
  return div(
    $switch(
      age,
      $case(12, h1("too young")),
      $case(26, h1("you are welcome")),
      $case(52, h1("too old")),
    ),
  );
}

document.body.append(html, whatsAllowed({ age: 26 }));
```

# Contents

- [What is Cradova](#what-is-cradova)
- [Why Cradova?](#whats-the-benefit)
- [Installation](#installation)
- [Examples](#examples)
- [Documentation](#documentation)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## What is Cradova?

Cradova is a web development framework for building Single Page Applications and
PWAs.

Cradova follows the
[VJS specification](https://github.com/uiedbook/cradova/blob/main/VJS_spec/specification.md)

## What's the benefit?

Fast and simple with and fewer abstractions and yet easily composable.

Cradova is not built on virtual DOM or diff algorithms. Instead, State
management is done in a way that is simple, easy and fast.

## Is this a big benefit?

Undoubtedly, this provides a significant advantage.

[current version changes](https://github.com/uiedbook/cradova/blob/main/CHANGELOG.md#v400)

## Installation

### From npm

```bash
npm i cradova
```

### CDN sources

```html
<!-- unpkg -->
<script src="https://unpkg.com/cradova/dist/index.js"></script>
<!--    js deliver -->
<script src="https://cdn.jsdelivr.net/npm/cradova/dist/index.js"></script>
```

## Examples

Some aspects of Cradova are not reflected in the following example. More
functionality will be entailed in future docs.

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

## Basic Samples:

This a collection of basic examples that can give you some ideas

```js
import {
  br,
  button,
  Comp,
  createSignal,
  div,
  h1,
  reference,
  useRef,
} from "cradova";

const count = new Comp(function () {
  const [count, setCounter] = useState(0, this);
  setTimeout(() => {
    setCounter(count + 1);
  }, 1000);
  return h1(" count: " + count);
});

// hello message

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
  const [name, setName] = (useState < string) | (undefined > (undefined, this));
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
  );
}

function App() {
  return div(count, typingExample, HelloMessage, nameRef);
}

document.body.append(App());
```

## Simple Todo list

Let's see a simple TodoList example

```js
import {
  button,
  Comp,
  createSignal,
  div,
  h1,
  input,
  main,
  p,
  useRef,
  useState,
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
    p(`|Todo List`),
    div(
      input({
        placeholder: "type in todo",
        reference: referenceSet.bindAs("todoInput"),
      }),
      button("Add todo", {
        onclick() {
          todoStore.fireAction(
            "add-todo",
            referenceSet.current("todoInput").value,
          );
          referenceSet.current("todoInput").value = "";
        },
      }),
    ),
    todoList.render,
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
    ),
  );
});
document.body.appendChild(TodoList());
```

## working with page and Router:

Unlike just appending stuff to the DOM, a better to build apps is to use a
routing system.

Cradova Router is a module that allows you do the following:

Create specified routes in you application help you handle navigation render a
page on a route listen to Navigation changes create error boundary at page level
apart from Comp level.

let's try an example.

```js
import { Page, Router } from "cradova";

// Comp can be used as page template this way

const template = new Comp(function (name) {
  // an effect run once after page renders
  const self = this;
  self.effect(() => {
    const name = new Promise((res) => {
      res("john doe");
    });
    setTimeout(async () => {
      self.recall(await name);
    }, 1000);
  });
  // effects can be used to make api calls needed for the page
  return div(name ? ">>>>>>>>  Hello  " + name : "  loading...");
});

const home = new Page({
  name: "home page", // page title
  template: () => div(template),
});

// in your routes.ts file
Router.BrowserRoutes({
  // Ways to use paths and Pages
  "*": home,
  "/home": home,
  "/home?": home,
  "/home/:name": home,
  // will be lazy loaded
  "/lazy-loaded-home": async () => await import("./home"),
});
// creates these routes

Router.navigate("/home", data);
// navigates to that page

Router.onPageEvent((lastRoute, newRoute) => {
  console.log(lastRoute, newRoute);
});
// listen for navigation changes
```

### More info

---

More info on Cradova Router

---

Every Cradova app mounts on a div with attribute data-wrapper="app"

if it already exist Cradova will use it instead.

Cradova will create a div with data-wrapper="app" if it doesn't exists already.

so if you want to use your own mount point then create a div with
data-wrapper="app".

---

More info on Cradova pages

---

Cradova pages has onActivate() and onDeactivate() methods which is also
available in the component function on the this variable bound to it.

this allow you manage rendering circle for each page in your app

---

More info on Cradova Comp

---

Cradova Comp is a dynamic component class, which ships simple abstractions like:

- recall
- useEffect
- useState
- useRef
- preRender

these behaviors allow you manage rendering circle for Comps in your app

---

More info on Cradova createSignal

---

Cradova Signals allows you to create powerful data stores.

with ability to:

- create store
- create actions and fire them
- bind a Comp
- listen to changes
- persist changes to localStorage
- update a Comp and bindings automatically

With these simple and easy abstractions, you can write datastores with so much
convenience.

## Documentation

At the moment, we're in the process of creating a documentation website for
Cradova, and we have limited resources. If you're interested in lending a hand,
we invite you to join our community, gain firsthand experience, and contribute
to the advancement of Cradova.

## Getting Help

To get further insights and help on Cradova, visit the
[Discord](https://discord.gg/b7fvMg38) and [Telegram](https://t.me/uiedbookHQ)
Community Chats.

## Contributing

We are currently working to
[set](https://github.com/uiedbook/cradova/blob/main/contributing.md) up the
following:

- building Cradova CLI (in progress)
- Cradova Documentation Website
- UI component libraries for cradova (The Sacho Project)
- Sample projects
- maintenance and promotion

```
 ██████╗   ██████╗    █████═╗   ███████╗    ███████╗    ██╗   ██╗  █████╗
██╔════╝   ██╔══██╗  ██╔═╗██║   █      ██  ██╔═════╝█   ██║   ██║  ██╔═╗██
██║        ██████╔╝  ███████║   █      ██  ██║     ██   ██║   ██║  ██████╗
██║        ██╔══██╗  ██║  ██║   █      ██  ██║     ██   ╚██╗ ██╔╝  ██║  ██╗
╚██████╗   ██║  ██║  ██║  ██║   ███████╔╝   ████████      ╚███╔╝   ██║  ██║
 ╚═════╝   ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝        ╚══╝    ╚═╝  ╚═╝
```

## Apache Lincenced

Opensourced And Free.

Join Us on [telegram](https://t.me/UiedbookHQ).

### Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code to
be distributed under same license. You are also implicitly verifying that all
code is your original work.

## Supporting Cradova development

Your Support is a good force for change anytime you do it, you can ensure Our
projects, growth, Cradova, Cradova, JetPath etc, growth and improvement by
making a re-occuring or fixed sponsorship to
[github sponsors](https://github.com/sponsors/FridayCandour):

Support via cryptos -

- BTC: `bc1q228fnx44ha9y5lvtku70pjgaeh2jj3f867nwye`
- ETH: `0xd067560fDed3B1f3244d460d5E3011BC42C4E5d7`
- LTC: `ltc1quvc04rpmsurvss6ll54fvdgyh95p5kf74wppa6`
- TRX: `THag6WuG4EoiB911ce9ELgN3p7DibtS6vP`

Build Powerful ⚡ Web Apps with Ease.
