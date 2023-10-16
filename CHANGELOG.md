# cradova changelog

## v1.0.0

- basic functionality no proper way to handle state

## v1.0.1

- improved performance

## v1.0.2

- improved api and dev experience

## v1.0.3

- an improved state management

## v1.0.4

this version never existed
"npm version patch" was mistakenly entered twice
and we went along with it.

## v1.0.5

- more performance
- improved state management
- battle testing and production readiness

## v1.0.6

- introducing scaffold - a simple way to render page components
  without url manipulation.
  this brings app experience
- bug fixes
- more performance
- battle testing green

## v1.0.7

- bug fixes
- more performance
- battle testing green

## v1.0.8

- bug fixes
- more performance
- battle testing green

## v1.0.1

- bug fixes
- battle testing green

## v1.1.0

- all bugs fixes
- great performance gain
- battle testing green
- dripping build system
- stable type system

## v1.2.0

- bugs fixes
- new performance gain unlocked
- battle testing green
- new apis for element level
- fixed all know abnormal behaviors

## v1.3.0

- new very feature to unlock more speed
- battle testing green
- new apis at element level

## v1.4.0

- unlocked more speed by reducing work done by router
- battle testing green
- added error boundary
- Ref working as wanted

## v1.4.1

- fix effect on cradova screens

## v1.5.0

- made cradova Ref to have Stash hold component state change
- stable Ref effect and updateState compliant to the spec

## v2.0.0

- export all html tags prebuilt and fully typed for more performance
- removed effect and updateState from cradova screen class
- remove unnecessary useHistory option from createSignal
- removed ability to add styles that appears as normal props
- removed event object from router params
- added pre-rendering capability to Ref components
- fixed effect bug on Ref
- added assert to cradova elements
- fixed error boundary bug
- setup hybrid server side rendering test using vite ssr

## v2.1.0

- added loop
- allow custom mount point
- fixed data-prop attributes
- fixed type for screens
- writing tests for more speed improvement index
- fixed createAction callback type

## v2.1.1

- increased child dept to ~

## v2.1.2

- fixed child array recursion of the Rhoda function
- fixed types
- fixed errors on child type not caught by typescript

## v2.2.0

- big performance boost using new methods of handling function calls so they get cached
- added lazy loading to cradova routes
- fixed Ref state flow with tests in ./manual_tests
- added the lazy class to load components when needed
- added parallel rendering to cradova screens
- redefining what global dispatcher can do.
- fix routing bug
- fix screen not persisting bug
- proof tests
- battle testing used and tested in production

# v2.2.1

- fix some little bugs

# v2.2.2

- make tag parser faster and fixed a tiny bug
- completed various tests

# v2.2.3

- make tag parser faster and fixed a tiny bug
- completed various tests

# v2.3.0

- created CradovaEvent switched from the CustomEvent class (for more speed and node compatibility journey)
- created references as a way to point to dom elements
- used reference internally to remove cradova-ids that appeared on the dom before.
- completed tests
- cradova now helps you with Ref.render() calls
- Ref can be used as screens directly

# v2.3.1

- fixes and more stability

# v3.0.0

- Redefined types
- removed afterMount and beforeMount events from cradova elements
- added the onmount event that get's called when the screen tree or ref get's updated
- disabled the global dispatcher because it's no longer a need for reactivity
- production tests
- the cradova \_ function now has types
- fixes and more speed gain for your apps when you update cradova.
- added a solution for setting a loading screen
- production tests for parallel rendering completed

# v3.1.1

- Added useState, useEffect and useRef hooks
- did some more optimisation
- other changes
