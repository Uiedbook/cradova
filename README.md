<a><img src="cradova.png" alt="logo" width="80" height="80" align="right"></a>

# Cradova.js
[![npm Version](https://img.shields.io/npm/v/cradova.svg)](https://www.npmjs.com/package/cradova)
[![License](https://img.shields.io/npm/l/cradova.svg)](https://github.com/cradova/cradova.js/blob/next/LICENSE)
[![npm Downloads](https://img.shields.io/npm/dm/cradova.svg)](https://www.npmjs.com/package/cradova)
[![Build Status](https://img.shields.io/travis/cradova/cradova.js/next.svg?colorB=brightgreen)](https://www.npmjs.com/package/cradova)
[![Donate at OpenCollective](https://img.shields.io/opencollective/all/cradova.svg?colorB=brightgreen)](https://opencollective.com/cradova)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cradova/cradova.js/blob/next/contributing.md)

  
## Contents

- [What is Cradova](#what-is-cradovajs)
- [Why did we build Cradova?](#whats-the-benefit)
- [Installation](#installation)
- [Examples](#examples)
- [Documentation](#documentation)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## What is cradova.js?

Cradova is a JavaScript framework for building Single Page Applications and PWAs.

It's small, fast and provides state management, routing and XHR utilities out of the box.

## What's the benefit?
We aim to be fast and simple with and no hidden abstractions whatsoever.
We don't use visual DOM or any diff algorithms to manage the DOM.

Cradova has been used in production and we will update this README to reflect our lessons as we go.

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
import _, { frag } from "cradova";

function Hello(name) {
  return _("h1", "Hello " + name);
}

// calling Hello returns the HTML
const html = Hello("peter")(); // or
// using frag
const html = frag(Hello("peter"), Hello("joe"));
document.body.append(html);
```

## Using Screen
```js
import _, { Screen, Router } from "cradova";

function HelloMessage(name) {
  // an effect run once after screen renders
  this.effect(() => {
    return new Promise((res) => {
      res("friday");
    });
  });
  // effects can be used to make api calls needed for the page
  return _("div", "Hello  " + name);
}

const home = new Screen({
  name: "hello page", // page title
  template: HelloMessage,
  ...
});

Router.route("/", home);

// navigates to that page
// Router.navigate("/home");
// get the page ready in the background
// Router.packageScreen("/home");

```

## State management

```js
// we have

// dispatch - global (element) requires state ID

// element can have this.updateState when shouldUpdate is true

// Ref components (global and local)

// state can be managed from a store when using createSignal or simpleStores

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

function HelloMessage(name) {
  return _("div.foo#bar", {
    shouldUpdate: true,
    text: "hello  " + (name || "no name"),
    onclick() {
      const name = prompt("what are your names");
      this.updateState({ text: "hello " + name });
    },
  });
}

const nameRef = new Ref(function ({ name }) {
  const self = this;
  return _("div.foo#bar", {
    text: "hello" + (name || "no name"),
    onclick() {
      const name = prompt();
      self.updateState({ name });
    },
  });
});

function Home() {
  return _("div.foo#bar",
   counter,
   HelloMessage,
   nameRef.render({ name: "no name" })
  );
}

const home = new Screen({
  name: "home page", // page title
  template: Home,
  ...
});

Router.route("/", home);
```

## Documentation
We are currently building cradova's documentation and we have only a few hands, if you're interested in helping you can join the community, learn first hand, and support cradova's progress.

## Getting Help
To get further insights and help on Cradova, visit our new [Telegram Community Chat](https://t.me/cradovaframework).

## Contributing
We are currently working to set up:

- Cradova Documentation Website
- UI component libraries for cradova
- Sample projects
- maintenance and promotion
- building cradova CLI


## Sponsor
Your support is appriciated and needed to advance Cradova further into the future.\
Sponsorships can be done via [Patreon](https://www.patreon.com/FridayCandour).\
Both monthly-recurring sponsorships and one-time donations are accepted. Recurring sponsorships will be entitled to logo placements in Tiers.
