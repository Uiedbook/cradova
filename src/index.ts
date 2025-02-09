/*
*****************************************************************************
Copyright 2022 Friday Candour. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*******************************************************************************
*/

export * from "./primitives/classes.js";
export * from "./primitives/functions.js";
export * from "./primitives/dom-objects.js";
export type { Func } from "./primitives/types.js";

declare global {
  interface Function {
    cloneFunc(): () => HTMLElement;
  }
}

Function.prototype.cloneFunc = function () {
  const pre = this;
  return function funcClone(this: any) {
    return pre.call(this);
  };
};
