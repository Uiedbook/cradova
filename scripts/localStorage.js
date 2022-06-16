const ls = {};
ls.store = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
ls.retrieve = (name) => {
  return localStorage.getItem(name);
};

ls.remove = (name) => {
  localStorage.removeItem(name);
};
ls.getKey = (index) => {
  return window.localStorage.key(index);
};
ls.clear = () => {
  localStorage.clear();
};

export default ls;
