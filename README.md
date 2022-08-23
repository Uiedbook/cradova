# [Cradova](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fridaycandour/cradova/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/cradova.svg?style=flat)](https://www.npmjs.com/package/cradova) [![CircleCI Status](https://circleci.com/gh/fridaycandour/cradova.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/fridaycandour/cradova) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Cradova is A JavaScript Framework for building modern web applications.

## Cradova offers

- **Template engine based:** Cradova uses template and requires no compile step, therefore you gain quicker preview of your app during development, Cradova's inbuilt template engine is engineered to be as fast as possible with battle tested performance.

- **Declarative UIs:** Cradova provide a static and dynamic API for building interactive UIs easily. Cradova global and local state management design reduces need for peripheral libraries. Create simple views with a stateID in your Project, and Cradova will quickly update the html elements associated when your data changes. Declarative UIs provide you with a more predictable, simpler to understand, and easier to debug web application.

- **Every thing out of the box:** With Cradova framework you get most things out of the box, from inbuilt, xhr, router, state, and css functions. Cradova has no dependencies and just <!-- /size -->25kb<!-- /size --> when gzipped, you get the speed and spiciness you have been looking for in one box. 👍

# Support

Cradova is compiled to ES2015 which is supported by various versions of IE11, Firefox ESR, and Firefox, Edge, Safari, Chrome, Nodejs and Deno. 👌

- No polyfills required.
- No Compilers required
- No dependencies
- No Complex abstracts, just a simple web framework.

## Installation

- [Installation](#installation)
- [Documentation](#documentation)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## Installation

### CDN

```html
<!-- Development -->
<script src="https://unpkg.com/cradova/dist/cradova.js"></script>
<script src="https://cdn.jsdelivr.net/npm/cradova/dist/cradova.js"></script>

<!-- Production -->
<script src="https://unpkg.com/cradova/build/build.js"></script>
<script src="https://cdn.jsdelivr.net/npm/cradova/build/cradova.js"></script>
```

### npm

```bash

npm i cradova

```

### yarn

```bash

yarn add cradova

```

## Documentation

This quick documentation is divided into several sections:

- [Template engine](#Template%20engine)
- [State management](#State%20management)
- [Using screens](#Using%20screens)
- [Routing](#Routing)
- [Using css functions](#Using%20css%20functions)
- [Database](#Database)

## Template engine

```js
import _, { frag } from "cradova";

// simple static example

const HelloWorld = _`h1| hello world`;

// simple dynamic example

function Hello({ name }) {
  return _("h1| hello " + name);
}

// using props

function helloName({ name }) {
  return _("h1.bold#name|" + name, {
    color: "#ff9800", // cradova understands this is styling
    onclick() {
      console.log("hello " + name);
    },

    // children go here
    _("span", {
        text: "am a span"
    })
  });
}

document.body.append(frag(HelloWorld));
document.body.append(frag(Hello({ name: "john doe" })));
document.body.append(frag(helloName({ name: "john doe" })));

// frag compile cradova element to html elements
// and returns a document fragment


const p = _`p.ptag.red#tets.another-classname`

const ptag = p( "text inside p tag"
,_("span", {
    text: "span inside p tag"
}))

document.body.append(p);
// no need for frag if you call the cradova element the second time

```

## State management

```js
import _ from "cradova";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById("container"));
root.render(<HelloMessage name="Taylor" />);
```

## Using screens

```js
import _ from "cradova";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById("container"));
root.render(<HelloMessage name="Taylor" />);
```

## Routing

```js
import _ from "cradova";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById("container"));
root.render(<HelloMessage name="Taylor" />);
```

## Using css functions

```js
import _ from "cradova";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById("container"));
root.render(<HelloMessage name="Taylor" />);
```

## Database

```js
import _ from "cradova";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById("container"));
root.render(<HelloMessage name="Taylor" />);
```

## Getting Help

Cradova has a community on [telegram](https://t.me/cradova), and you can ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/cradova) using the `cradova` tag.

## Contributing

This project is growing 🎁 , and your contributions are valuable, have a look a [Contributing FAQ](https://github.com/fridaycandour/cradova/contributing.md) to contribute.

### License

React is [MIT licensed](./LICENSE).

---
