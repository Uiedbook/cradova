export const ls: Record<string, Function> = {};
ls.store = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};
ls.retrieve = (name: string) => {
  return localStorage.getItem(name);
};

ls.remove = (name: string) => {
  localStorage.removeItem(name);
};
ls.getKey = (index: number) => {
  return window.localStorage.key(index);
};
ls.clear = () => {
  localStorage.clear();
};