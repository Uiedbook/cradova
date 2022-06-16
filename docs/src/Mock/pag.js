const convertToUsefulContent = function (obj) {
  let i = 0;
  let out = [];
  for (const key in obj) {
    i++;
    if (i > 1) {
      if (!out[1]) {
        out[1] = [];
        out[1].push(obj[key]);
        continue;
      } else {
        out[1].push(obj[key]);
        continue;
      }
    }
    out.push(obj[key]);
  }
  return out;
};

export const con = (arr) => {
  const sorted = [];
  for (let i = 0; i < arr.length; i++) {
    sorted.push(convertToUsefulContent(arr[i]));
  }
  return sorted;
};

export const domains = [
  { title: "maths", course: 10, users: 100 },
  { title: "english", course: 20, users: 100 },
  { title: "history", course: 20, users: 100 },
  { title: "music", course: 20, users: 100 },
  { title: "economics", course: 20, users: 100 },
  { title: "physics", course: 20, users: 100 },
  { title: "magic", course: 20, users: 100 },
  { title: "maths", course: 10, users: 100 },
  { title: "english", course: 20, users: 100 },
];
export const courses = [
  { title: "maths", domain: "maths", reources: 100 },
  { title: "english", domain: "english", reources: 100 },
  { title: "history", domain: "history", reources: 100 },
  { title: "music", domain: "music", reources: 100 },
  { title: "economics", domain: "economics", reources: 100 },
  { title: "physics", domain: "physics", reources: 100 },
  { title: "magic", domain: "magic", reources: 100 },
  { title: "maths", domain: "maths", reources: 100 },
  { title: "english", domain: "english", reources: 100 },
];

export const resources = [
  { course: "maths", title: "maths", type: "pdf" },
  { course: "english", title: "english", type: "pdf" },
  { course: "history", title: "history", type: "pdf" },
  { course: "music", title: "music", type: "pdf" },
  { course: "economics", title: "economics", type: "pdf" },
  { course: "physics", title: "physics", type: "pdf" },
  { course: "magic", title: "magic", type: "pdf" },
  { course: "maths", title: "maths", type: "pdf" },
  { course: "english", title: "english", type: "pdf" },
];

export const paymentRequests = Array(36).fill({
  name: "fridaysh",
  email: "fridaymaxtour@gmail.com",
  time: "2 days ago",
  bank: "english",
  amount: 100,
  account_number: 100,
});

export const notifications = Array(36).fill({
  title: "cradova has a new versoin, try updately right away",
  time: "2 days ago",
  in_app: false,
});
