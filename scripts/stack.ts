export  function stack() {
  const history: any[] = [];
  return {
    push(template: {name: string}) {
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
