import _, { fullScreen, uuid } from "../index.js";

export type CradovaElemetType = Element & Record<string, unknown> & {
    style: Record<string, unknown>;
    stateID: string;
  };

export const listBuilder = function (count = 1, listTree: { (): any; (): any; stateID: any; classList: any; }) {
  if (!count) {
    throw new Error("cradova: listBuilder count expected")
  }

  if (typeof listTree === "function") {
    listTree = listTree()
  }

  if (typeof listTree === "function") {
    listTree = listTree()
  }
    if (!(listTree instanceof HTMLElement)) {
            throw new TypeError(
                "cradova err invalid element, should be a html element from cradova"
              );
            }
  const stateID = "cra_list_child" + uuid();
  listTree.stateID = stateID  
  listTree.classList.add("cra_list_builder_child")
  let list = Array(count).fill(listTree);

  const filter = () => {
    const   filts = []
      const nodes: CradovaElemetType[] = Array.from(document.querySelectorAll(".cra_list_builder_child"));
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].stateID !== stateID) return;
        filts.push(nodes[i])
      }
      return filts
    }
  return {
    updateAt(position: number, state: { [x: string]: any; }) {
      const element: any = filter()![position];
      if (!element) return;
             if (typeof state === "object") {
        // updating the element's state
        for (const key in state) {
          // updating element styling
          if (key === "style") {
            for (const [k, v] of Object.entries(state[key])) {
              element.style[k] = v;
            }
            continue;
          }
          if (typeof element[key] === "function") {
            element[key]();
            continue;
          }
          // updating element's inner text
          if (key === "text") {
            element.innerText = state[key];
            continue;
          }
          // setting element dimesion to full screen
          if (key === "fullscreen") {
            if (state[key]) {
              fullScreen(element).set();
            } else {
              fullScreen(element).exist();
            }
            continue;
          }
          // adding class name to element
          if (key === "class") {
            element.classList.add(state[key]);
            continue;
          }
          // toggling element class
          if (key === "toggleclass") {
            element.classList.toggle(state[key]);
            continue;
          }
          //removing element class
          if (key === "removeclass") {
            element.classList.remove(state[key]);
            continue;
          }
          // changing the element children tree
          if (key === "tree") {
            if (typeof state[key] === "function") {
              state[key] = state[key]();
            }
            if (!(state[key] instanceof HTMLElement)) {
              console.error(
                "wrong element type: can't create element state on " +
                  state[key]
              );
              throw new TypeError(
                "cradova err invalid element, should be a html element from cradova"
              );
            }
            // destroy the component tree
            element.innerHTML = "";
            // rebuild the component tree
            element.append(state[key]);
            continue;
          }
          element[key] = state[key];
        }
      }
    // });
    },
    updateAll(state: { [x: string]: any; }) {
      const nodes = filter();
      if (!nodes?.length) {
        return
      }
      for (let i = 0; i < nodes.length; i++) {
        const element: any = nodes[i];
              if (!element) return;


        if (typeof state === "object") {
        // updating the element's state
        for (const key in state) {
          // updating element styling
          if (key === "style") {
            for (const [k, v] of Object.entries(state[key])) {
              element.style[k] = v;
            }
            continue;
          }
          if (typeof element[key] === "function") {
            element[key]();
            continue;
          }
          // updating element's inner text
          if (key === "text") {
            element.innerText = state[key];
            continue;
          }
          // setting element dimesion to full screen
          if (key === "fullscreen") {
            if (state[key]) {
              fullScreen(element).set();
            } else {
              fullScreen(element).exist();
            }
            continue;
          }
          // adding class name to element
          if (key === "class") {
            element.classList.add(state[key]);
            continue;
          }
          // toggling element class
          if (key === "toggleclass") {
            element.classList.toggle(state[key]);
            continue;
          }
          //removing element class
          if (key === "removeclass") {
            element.classList.remove(state[key]);
            continue;
          }
          // changing the element children tree
          if (key === "tree") {
            if (typeof state[key] === "function") {
              state[key] = state[key]();
            }
            if (!(state[key] instanceof HTMLElement)) {
              console.error(
                "wrong element type: can't create element state on " +
                  state[key]
              );
              throw new TypeError(
                "cradova err invalid element, should be a html element from cradova"
              );
            }
            // destroy the component tree
            element.innerHTML = "";
            // rebuild the component tree
            element.append(state[key]);
            continue;
          }
          element[key] = state[key];
        }
      }
     }
    },
    destroy() {
      const nodes = filter();
      if (!nodes?.length) {
        return
      }
      for (let i = 0; i < nodes.length; i++) {
        const element: any = nodes[i];
              if (!element) return;
        element.parentElement.remove(element);
      }
      list = [];
    },
    remove(position: number) {
      const nodes = filter();
      const element:any = nodes![position];
            if (!element) return;
    list.splice(position, 1)
      element.parentElement.remove(element);
    },
    pop() {
      const nodes = filter()
      const element: any = nodes![nodes!.length -1];
            if (!element) return;
      list.pop()
      element.parentElement.remove(element);
    },
    build() {
      return list
    }
}  
};