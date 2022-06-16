export default function stack() {
  const history = [];
  return {
    push(template) {
      if (template && template.name) {
        history.push(template);
        history[history.length - 1].Activate();
      } else {
        throw new TypeError(
          "Invalid tree given expected cradova template but got   " + template
        );
      }
    },
    pop() {
      history[history.length - 1].detach();
      history.pop();
      history[history.length - 1].Activate();
    },
  };
}
