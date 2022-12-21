import _, { frag, Screen, PromptBeforeLeave } from "../../../cradova/index.js";
// reusable  elements
const logo = _("img.domimg", {
  src: "site/assets/cradova.png",
});

const h3 = _("h3|Build apps that feels native", {
  style: { margin: "auto" },
});

const h2 = _("h2| Cradova Documentation page", {
  style: { margin: "10px auto" },
});

const p = _("p.paragraph");

const code = (code: string, type: string = "js") =>
  _(
    "pre",
    { class: "language-" + type, tabindex: 0 },
    _("code", { class: "language-" + type }, code)
  );

const a = _("a");

const div = _("div", {
  style: {
    margin: "8px",
  },
});

/**
 * header
 */

const head = frag(h2, _`br`, logo, _`br`, _`br`, h3, _`hr`);
/**
 *
 * document body
 *
 */
const body = _(
  "div.section",
  {
    margin: "8px",
  },
  head,
  h2({
    text: "version 1.0.3 docs",
    style: { margin: "auto" },
  }),
  p("Some features in this version", {
    style: {
      borderBottom: "2px black solid",
      width: "fit-content",
    },
  }),
  _(
    "ul",
    { style: { margin: "20px" } },
    _`li| Easy to use template engine syntax`,
    _`li| State management`,
    _`li| Screens, Routes, CreateSignal, ajax, Ref and more .`
  ),

  //

  p("Content Index", {
    style: {
      borderBottom: "2px black solid",
      width: "fit-content",
    },
  }),

  _(
    "ul",
    { style: { margin: "20px" } },
    a(_`li| creating a Cradova project`, { href: "#create" }),
    a(_`li| creating elelments Cradova`, { href: "#elements" })
  ),

  // creating a cradova project

  div(
    {
      id: "create",
    },
    h2({ text: "Creating a Cradova project" }),
    p(
      `To create a Cradova project you have 2 options at your finger tips, 
      \n
      and you can do this by either installing Cradova from npm or using the CLI tool.`
    ),

    code(`    $ npm install cradova --save    `),
    code(`    $ npx create-cradova-app myappname    `),
    p(`With that you have a clean Cradova app project to start building.`),
    p(`use npx if you a beginner or don't want to set things up yourself.`)
  ),

  // elements

  div(
    {
      id: "elements",
    },
    h2({ text: "Creating elements in Cradova" }),
    p(`There two types of  elements in Cradova, which are dynamic and static `),
    p(
      `Static elements don't require any state update in the way they are constructed, they have an unchanged life cycle in the app, examples are .`
    ),
    code(`_("p")   // creates a p tag only`),
    code(`_("p.paragraph") // with class`),
    code(`_("p#paragraph") // with id`),
    code(`_("p.paragraph#paragraph") // with both`),
    code(`_("p.paragraph| hello world") // with text`),
    p("where every given above optional"),
    p(
      `Dynamic elements can be given props at call time and also undergo state update, examples are.`
    ),
    code(`_("p")   // creates a p tag only`),
    code(`_("p.paragraph") // with class `),
    code(`_("p#paragraph") // with id `),
    code(`_("p.paragraph#paragraph") // both`),
    code(`_("p| hello world") // adding text`),
    code(`_("p.para", {class:"pa", id: "pa}) //props`),
    code(`_("p.pa",{style: {color: "aqua"}}) //styles`),
    p(
      `Dynamic element declaration like these return funtions not html, and by so you can add and overwrite props and add more children later on`
    ),
    p(`When creating elements with _ both dynamic or static be sure to follow the follow the order selector, properties, children, 
      it's not important when calling dynamic components`)
  )
);

function page() {
  PromptBeforeLeave(() => {
    console.log(7);
  });
  return body;
}

const info = new Screen({ name: "set up cradova", template: page });
export default info;
