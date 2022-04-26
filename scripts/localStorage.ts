type l = {
  store: (name: string, value: unknown) => void;
  retrieve: (name: string) => void;
  remove: (name: string) => void;
  getKey: (index: number) => void;
  clear: () => void;
};

let ls: l = {
  store: () => console.log(),
  retrieve: () => console.log(),
  remove: () => console.log(),
  getKey: () => console.log(),
  clear: () => console.log(),
};

ls.store = (name: string, value: any) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(name, value);
};
ls.retrieve = (name: string) => {
  localStorage.getItem(name);
};

ls.remove = (name: string) => {
  localStorage.removeItem(name);
};
ls.getKey = (index: number) => {
  window.localStorage.key(index);
};
ls.clear = () => {
  localStorage.clear();
};

export default ls;
