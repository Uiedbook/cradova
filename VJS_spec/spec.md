Draft / February 18, 2023 by friday candour

Updated / August 25, 2023 by friday candour

# Introduction

## VJS

Vanilla JavaScript spec (VJS) is particularly normal JavaScript and nothing more, but a stack of function calls defining a Document Object Model (DOM) structure.

It is naturally ECMAScript compliant and doesn't require any preprocessor (transpilers), which means it works on all engines and browsers.

In VJS the first parameter is the template for the HTML element which can consists of a Class Name, ID and Inner Text in a single string, other properties are the HTML element attribute in an object syntax and it's children.

Another type of VJS syntax is the tag name as a function in lowercase, while it's parameters will then consists the HTML element attribute in an object syntax and it's children.

VJS should be completely typed to support HTML attributes for each element type where possible.

It is required that second parameter to be the Attributes object of the element type if needed, but it can appear at any position of the parameter list.

If the first parameter is not a template or string it is considered as a document fragment if it's not a tag function. in the type VJS() not div().

Every other thing on the parameter list which is not the first string parameter or a normal JavaScript object is considered as a child of the element if valid.

Valid VJS children are string, valid HTML, VJS functions, functions that return valid HTML or string and undefined.

# Rationale

The VJS specification is to define a concise and familiar syntax for defining tree structures with attributes using vanilla JavaScript, and not generic which means not requiring a build step for transpilation.

### VJS Elements tree structure

Syntax

```
VJS( => template, => props, => ...children)

// VJS tags

TAG( => props, => ...children)

```

### The VJS template

Syntax

```js
// template may include tag, classes, a tag and interText

VJS(template);
// VJS tags
div();
// examples

// classes
VJS("div.button-red.m10");

div({ className: "button-red m10" });

// classes and ID
VJS("main#container.flex-container.white-bg");

// classes and ID and innerText
VJS("p.blue#para| blue text paragraph");

// without tags defaults to a div
VJS(".blue-bg#div| blue background div with innerText");

// avoiding the pipe format
VJS("p", "hello world");

// using javascript template literals
VJS`p| hello world `;
// this javascript template literal example cannot have more parameters
```

### VJS attributes

Syntax

```js
// attributes should be verified available on the element

VJS("div", { foo: "bar" }); //should throws error
VJS("div", (style: { foo: "bar" })); // should throw error

// VJS tags

div( { style: { foo: "bar" }} ) // should throw and error

VJS("div", { id: "bar" }); // valid
div( { { id: "bar" }} ) // valid
VJS("div", { style: { backgroundColor: "aqua" } }); // valid
VJS("label", { for: "bar" });
VJS("div", (style: { $age: "bar" })); // data-age
```

### VJS Children

Syntax

```js
// A child can be the VJS function call, HTML element or a document fragment.

VJS(
  "div",
  VJS("p", "history is a ..."),
  VJS("p", "chemistry is the study ...")
);

div(p("history is a ..."), p("chemistry is the study ..."));

// looping

const names = ["john", "paul"];

VJS(
  "div",
  names.map((name) => VJS("p", "hello " + name))
);

div(names.map((name) => p("hello " + name)));

// conditional rendering

let age = 12;

VJS(age > 16 ? p("let me get bear") : p("let me get you yoghurt"));

.
```

### VJS Components

Syntax

```js
function Hello(name) {
  return VJS("h1", "Hello " + name);
}

function Hello(name) {
  return H1("Hello " + name);
}
```

### VJS Fragment

Syntax

```js
// VJS() return a document fragment

function paragraphs(name) {
  return VJS(
    VJS("p", "history is a ..."),
    VJS("p", "chemistry is the study ...")
  );
}
```

## Why not JSX or JXON?

## JSX

[JSX](https://facebook.github.io/jsx/#sec-prior-art) is a standard in abundant use, and Another alternative would be to use object initializers like the JXON spec.

In JSX adding attributes and values to elements using netted curly braces lacks ability to send a single value to the resulting component or HTML markup function.

this is an opinionated syntax that tied to transpilation benefits which jsx is heavily based on.

JSX relies heavily on preprocessor (transpilers) like Babel which has a time cost in development cycle and system resources.

It is not made impossible to assign JSX directly to variables without retaining them from a function which in static cases is not needed.

in the case of

JSX

```js
const name = <p>john</p>;
```

VJS

```js
const name = p("john");
```

This is significant regarding VJS can be more useful in many light cases whereas JSX requires full blown transpiler and bundler setup, which in those is very unneeded and bloat.

## JXON

In the [JXON](https://htmlpreview.github.io/?https://github.com/mdn/archived-content/blob/main/files/en-us/archive/jxon/raw.HTML) spec, the balanced braces do not give great syntactic hints for where an element starts and ends in large trees and also the Balanced named tags is a critical syntactic feature of the XML-style notation.

## VJS

- Firstly VJS has less abstraction layers and expose control flow.

- VJS is well formatted with default Javascript linters than others.

- VJS has no compilation step making it faster in development cycle and lighter on system resources during development.

- It is possible to assign variables to VJS in static cases easily as seen above.

- Adding attributes to elements is possible with a - regular JavaScript object or available template string scheme.

VJS can be a standard for more concise web development uses cases where interoperability with vanilla JavaScript is important, to achieve better developer experience and creativity and faster web apps due to its design.

VJS is currently implemented in the [cradova](https://github.com/fridaycandour/cradova) web development framework.

It's fairly easy to see how VJS is similar to the flutter mobile development syntax.
it's only quite more intuitive.

<hr>

### This work is licensed under the MIT license.
