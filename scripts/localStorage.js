let ls = {
    store: () => console.log(),
    retrieve: () => console.log(),
    remove: () => console.log(),
    getKey: () => console.log(),
    clear: () => console.log(),
};
ls.store = (name, value) => {
    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }
    localStorage.setItem(name, value);
};
ls.retrieve = (name) => {
    localStorage.getItem(name);
};
ls.remove = (name) => {
    localStorage.removeItem(name);
};
ls.getKey = (index) => {
    window.localStorage.key(index);
};
ls.clear = () => {
    localStorage.clear();
};
export default ls;
