// Simple todo list

import {
  div,
  main,
  p,
  button,
  input,
  createSignal,
  reference,
  Ref,
} from "../dist/index.js";

function TodoList() {
  // can be used to hold multiple references
  const referenceSet = new reference();

  const todoStore = new createSignal([
    "take bath",
    "code code code",
    "take a break",
  ]);

  // create actions
  todoStore.createAction("add-todo", function (todo) {
    this.set([...this.value, todo]);
  });

  todoStore.createAction("remove-todo", function (todo) {
    const ind = this.value.indexOf(todo);
    this.value.splice(ind, 1);
    this.set(this.value);
  });

  // bind Ref to Signal
  todoStore.bindRef(todoList);

  // markup
  return main(
    todoList.render,
    div(
      input({
        placeholder: "type in todo",
        reference: referenceSet.bindAs("todoInput"),
      }),
      button("Add todo", {
        onclick() {
          todoStore.fireAction("add-todo", referenceSet.todoInput.value);
          r.todoInput.value = "";
        },
      })
    )
  );
}

const todoList = new Ref(function () {
  const self = this;
  return div(
    self.Signal.value.map((item) =>
      p(item, {
        title: "click to remove",
        onclick() {
          self.Signal.fireAction("remove-todo", item);
        },
      })
    )
  );
});
document.body.appendChild(TodoList());
