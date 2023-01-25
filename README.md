# Cradova

<center>
<img src="cradova.png" width="100px">

Cradova is a JavaScript framework for building Single Page Applications and PWAs.

</center>
<br>
<p>
	<a href="https://www.npmjs.com/package/cradova">
		<img src="https://img.shields.io/npm/v/cradova.svg" alt="npm Version" />
	</a>&nbsp;
	<a href="https://github.com/cradova/cradova.js/blob/next/LICENSE">
		<img src="https://img.shields.io/npm/l/cradova.svg" alt="License" />
	</a>&nbsp;
	<a href="https://www.npmjs.com/package/cradova">
		<img src="https://img.shields.io/npm/dm/cradova.svg" alt="npm Downloads">
	</a>&nbsp;
	<a href="https://www.npmjs.com/package/cradova">
		<img src="https://img.shields.io/travis/cradova/cradova.js/next.svg?colorB=brightgreen" alt="Build Status">
	</a>
    &nbsp;
	<a href="https://opencollective.com/cradova">
		<img src="https://img.shields.io/opencollective/all/cradova.svg?colorB=brightgreen" alt="Donate at OpenCollective">
	</a>&nbsp;
	
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cradova/cradova.js/blob/next/contributing.md)

  <br>
  <br>
  
## Contents

- [What is cradova.js?](#what-is-cradova?)
- [Why we built cradova?](#the-?)
- [Installation](#installation)
- [Examples](#examples)
- [Documentation](#documentation)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## What is cradova.js?

cradova is a JavaScript framework for building Single Page Applications and PWAs.

It's small, fast and provides state management, routing and XHR utilities out of the box.

# Whats the benefit?

Javascript is a powerful language.
our aim is not to limit what you can achieve but rather make your make them limitless.

we made Cradova to give you more power at no cost.
extra speed, ease and security.

we don't use visual DOM or diff algorithms to manage the DOM, we rather do it the natural way.

which is fast and simple, with all the benefits and no abstracts whatsoever.

cradova has been used in production and we will update this README to reflect them as ASAP.

It's time to change gears.

# Installation

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

# Examples

Before you confirm these below, please know that they are many cool parts about cradova not described here but will be on a later time. and eventually when we get a frontend hosting.

You can get deeper insights from the [telegram community](https://t.me/cradovaframework) for the moment.

Here's an example of create a basic component in cradova:

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

## using screen

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

# State management

```js
// we have

// dispatch - global (element) requires state ID

// element can have this.updateState when shouldUpdate is true

// Ref components (global and local)

// RefList components (global and local)

// state can be bind to a store when using createSignal or simpleStores

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

# Documentation

We are currently working building cradova's documentation and we have only a few hands, if you are interested you can join the community and learn first hand and also support cradova's progress.

# getting help

To get help visit our new [telegram community](https://t.me/cradovaframework)

# contributing

we are currently working to set up.

- Cradova Documentation Website
- UI component libraries for cradova
- Sample projects
- maintenance and promotion
- building cradova CLI

community [telegram](https://t.me/cradovaframework)

# Sponsor

It's a general aim to have a development tool
with great developer experience and speed and that what
cradova gives, "low abstraction with great speed".

it's measurable, to take cradova further your support is needed.

Sponsorships can be done via [Patreon](https://www.patreon.com/FridayCandour). Both monthly-recurring sponsorships and one-time donations are accepted. Recurring sponsorships will be entitled to logo placements in Tiers.
