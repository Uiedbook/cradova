const ab = async () => {
  for (let i = 0; i < 1000000; i++) {
    let a = [];
    for (let i = 0; i < 10; i++) {
      a.push(i);
    }
    a.length = 0;
  }
};
const ac = () => {
  for (let i = 0; i < 1000000; i++) {
    let a = [];
    for (let i = 0; i < 10; i++) {
      a.push(i);
    }
    a.length = 0;
  }
};

console.time("ab");
ab();
console.timeEnd("ab");
console.time("ac");
ac();
console.timeEnd("ac");
