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
    <a href="https://github.com/fridaycandour/cradova#examples"><strong>Explore the docs »</strong></a>
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

Cradova is a JavaScript framework for building Single Page Applications and PWAs.

It's a fast and simple framework, it provides state management, routing system and a rest API utility out of the box.

Cradova follows the [VJS specification](https://github.com/fridaycandour/cradova/blob/main/spec.md)

## What's the benefit?

Cradova is aimed to be fast and simple with and fewer abstractions and yet easily composable.

Cradova does't rely on visual DOM or diff algorithms to manage the DOM, instead, State management is done more elegantly with a simple predictive model, manually and easily with all the speed.

### is this a big benefit?

Yes.
see for yourself.

Cradova has been used on a couple of projects in production and we will update this page to reflect our progress as we keep improving.

[current version changes](https://github.com/fridaycandour/cradova/blob/main/CHANGELOG.md#2.2.0)

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

Here's an example of create a basic component in Cradova:

```js
// cradova v2.0.0 comes with all html tags prebuilt and fully typed
// this gives your app more performance gain.
import _, { h1 } from "cradova";

function Hello(name) {
  return h1("Hello " + name, {
    className: "title",
    style: {
      color: "grey",
    },
  });
}

// document fragment empty cradova call _()

const html = _(Hello("peter"), Hello("joe"));

document.body.append(html);
```

```js
// regular example
import _ from "cradova";

function Hello(name) {
  return _("h1", "Hello " + name);
}

const html = _(Hello("peter"), Hello("joe"));

document.body.append(html);
```

## Using Screen

```js
import _, { Screen, Router } from "cradova";

function HelloMessage(name) {
  // an effect run once after screen renders
  this.effect(() => {
   const name = new Promise((res) => {
      res("friday");
    });
    this.updateState(await name)
  });
  // effects can be used to make api calls needed for the page
  return _("div", "Hello  " + name);
}


/*

when using router and screens

cradova will create a div with data-cra-id=cradova-app-wrapper

if it already exist cradova will use it instead

so if you want to use your own mount point then create a div with data-cra-id="cradova-app-wrapper"

*/

const home = new Screen({
  name: "hello page", // page title
  template: HelloMessage,
  ...
});

Router.route("/", home);

// navigates to that page
// Router.navigate("/home", data, force);
// get the page ready in the background
// Router.packageScreen("/home");
// get route params for this page
// Router.getParams();

```

## State management

```js


 // element can have this.updateState when the shouldUpdate props is true

// Ref components

// state can be managed from a store when using createSignal or simpleStores
// this method is not yet documented

import _, { Ref } from "cradova";

// simple count

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

function dataCounter() {
  return _("h1| 0", {
    shouldUpdate: true,
    "data-num": "0",
    onclick() {
     const num = Number(this.getAttribute("data-num")) + 1;
      this.updateState({ text: num, $num: num });
    },
  });
}

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

const nameRef = new Ref(function ( name ) {
  const self = this;
  return _("div.foo#bar", {
    text: "hello" + (name || "no name"),
    onclick() {
      const name = prompt();
      self.updateState(name);
    },
  });
});

/*
cradova Ref are component objects
with methods for rendering, pre-rendering, and updating a it dom elements.

Ref also has the feature to stash input values need by the components

*/


function Home() {
  return _("div.foo#bar",
   counter,
   dataCounter,
   HelloMessage,
   nameRef.render( "no name" )
  );
}

const home = new Screen({
  name: "home page", // page title
  template: Home,
  ...
});

/*

Nice things about cradova screens

screens are rendered once by default to hack
responsiveness making your app work fast as user navigates.

this behavior can be override
by passing
prerender: false
in the constructor


Cradova screens has
onActivate() and
onDeactivate() methods

these allow you manage rendering
circle for each in your app

*/

Router.route("/", home);
```

## Documentation

We are currently building cradova's documentation and we have only a few hands, if you're interested in helping you can join the community, learn first hand, and support cradova's progress.

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
