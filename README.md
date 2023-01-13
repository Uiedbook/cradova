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

cradova.js supports various versions of IE11, Firefox ESR, and Firefox,
Edge, Safari, and Chrome. No polyfills required.

# why cradova?

Javascript is a powerful language.
our aim is not to limit what you can achieve but rather make your make them limitless.

we made Cradova to give you more power at no cost.
but extra speed, ease and security.

we don't use visual DOM or diff algorithms to manage the DOM, we rather do it the natural way.

which is fast and simple, with all the benefits and no abstracts whatsoever.

cradova has been used in production and we will update this README to reflect them as ASAP.

Happy coding.

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

Before you confirm these below, please know that they are many cool parts about cradova not described here but will be on a later time.

You can get deeper insights from the telegram community for the moment.

Here's an example of create a basic component in cradova:

```js
import _, { frag } from "cradova";

function HelloMessage({ name }) {
  return _("div", "Hello " + name);
}
// using frag
const html = frag(HelloMessage("friday"));
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
  // effects can be used to make api calls
  // which will rerender this screen when done
  // with the data returned
  return _("div", "Hello" + name);
}

const home = new Screen({
  name: "home page", // page title
  template: HelloMessage,
});

Router.route("/", home);
```

# State management

```js
import _, { dispatch, Ref } from "cradova";

function HelloMessage(name) {
  return _("div.foo#bar", {
    stateID: "bar",
    text: "hello ____" + (name || ""),
    onclick() {
      const name = prompt();
      dispatch("bar", { text: "hello " + name });
    },
  });
}

const nameRef = new Ref(function (name) {
  const self = this;
  return _("div.foo#bar", {
    text: "hello ____" + (name || ""),
    onclick() {
      const name = prompt();
      self.updateState({ text: "hello " + name });
    },
  });
});

function Home() {
  return _(
    "div",
    { id: "foo", class: "bar" },
    HelloMessage,
    nameRef.render(null)
  );
}

const home = new Screen({
  name: "home page", // page title
  template: Home,
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

community [telegram](https://t.me/cradovaframework)

# How to Sponsor

Sponsorships can be done via [OpenCollective](https://opencollective.com/cradova). Invoices can be obtained via GitHub's payment system. Both monthly-recurring sponsorships and one-time donations are accepted. Recurring sponsorships will be entitled to logo placements in Tiers.
