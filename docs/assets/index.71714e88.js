var $ = (e, t, i) => {
  if (!t.has(e)) throw TypeError("Cannot " + i);
};
var w = (e, t, i) => (
    $(e, t, "read from private field"), i ? i.call(e) : t.get(e)
  ),
  M = (e, t, i) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i);
  },
  D = (e, t, i, s) => (
    $(e, t, "write to private field"), s ? s.call(e, i) : t.set(e, i), i
  );
const ne = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const a of n)
      if (a.type === "childList")
        for (const r of a.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(n) {
    const a = {};
    return (
      n.integrity && (a.integrity = n.integrity),
      n.referrerpolicy && (a.referrerPolicy = n.referrerpolicy),
      n.crossorigin === "use-credentials"
        ? (a.credentials = "include")
        : n.crossorigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const a = i(n);
    fetch(n.href, a);
  }
};
ne();
function te(e, t, i) {
  typeof t == "object" && ((i = t), (t = ""));
  const s = "" + e + t + "{",
    n = "}";
  let a = "",
    r = "";
  for (const [u, x] of Object.entries(i)) a += "" + u + ": " + x + ";";
  let c = document.querySelector("style");
  if (c !== null) {
    (r += c.innerHTML), (r += s + a + n), (c.innerHTML = r);
    return;
  }
  (c = document.createElement("style")),
    (r += c.innerHTML),
    (r += s + a + n),
    (c.innerHTML = r),
    document.head.append(c);
}
const re = function (...e) {
    let t;
    typeof e[0] == "object" &&
      !(e[0] instanceof HTMLElement) &&
      ((t = e[0]), (e = e.slice(1, e.length)));
    const i = document.createDocumentFragment();
    return (
      e.forEach((s) => {
        typeof s == "function" ? i.append(s(t)) : i.append(s);
      }),
      () => i
    );
  },
  se = function (e) {
    const t = document.createElement("div");
    return (
      (t.className = "Cradova-app-wrappper"),
      (t.id = "app-wrapper"),
      te(".Cradova-app-wrappper", {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "flex-direction": "column",
        width: "100%",
      }),
      (t.stateID = "Cradova-app-wrappper-id"),
      document.body.append(t),
      t
    );
  };
function ae(e) {
  let t,
    i = 0,
    s = 0;
  if (typeof e == "object") t = e;
  else throw new Error("no call given for the swipe handler");
  function n(c) {
    (i = c.changedTouches[0].screenX), (s = c.changedTouches[0].screenY);
  }
  function a(c) {
    const u = c.changedTouches[0].screenX - i,
      x = c.changedTouches[0].screenY - s,
      f = Math.abs(u / x),
      p = Math.abs(x / u);
    Math.abs(f > p ? u : x) < 10 && t.touch && r.touch(t.touch),
      f > p
        ? u >= 0
          ? t.right && r.right(t.right)
          : t.left && r.left(t.left)
        : x >= 0
        ? t.down && r.down(t.down)
        : t.up && r.up(t.up);
  }
  document.body.addEventListener("touchstart", n),
    document.body.addEventListener("touchend", a);
  const r = {
    touch(c) {
      return c();
    },
    right(c) {
      return c();
    },
    left(c) {
      return c();
    },
    down(c) {
      return c();
    },
    up(c) {
      return c();
    },
  };
}
function ce(e, ...t) {
  const i = "@media only screen and (" + e + ") {",
    s = "}";
  let n = "  ",
    a = " ";
  const r = t.length;
  let c,
    u = "  ";
  const x = (p) => {
    for (const [h, m] of Object.entries(t[p][1])) n += "" + h + ": " + m + ";";
    return (a += "" + t[p][0] + "{" + n + "}"), a;
  };
  for (let p = 0; p < r; p++) u += x(p);
  let f = document.querySelector("style");
  f === null && (f = document.createElement("style")),
    (f.media = "screen"),
    (c = f.innerHTML),
    (c += i + u + s),
    (f.innerHTML = c),
    document.head.append(f);
}
var v, k, L;
class le {
  constructor(t) {
    M(this, v, 0);
    M(this, k, []);
    M(this, L, null);
    D(this, L, t), w(this, k).push(t);
  }
  get() {
    return w(this, L);
  }
  set(t) {
    D(this, L, t), w(this, k).push(t), D(this, v, w(this, v) + 1);
  }
  forward() {
    w(this, k).length > w(this, v) + 1 &&
      D(this, L, w(this, k)[w(this, v) + 1]);
  }
  backward() {
    w(this, k).length > 0 &&
      w(this, v) > 0 &&
      (D(this, L, w(this, k)[w(this, v) - 1]), D(this, v, w(this, v) - 1));
  }
}
(v = new WeakMap()), (k = new WeakMap()), (L = new WeakMap());
const de = function (e) {
    return new le(e);
  },
  y = {};
y.routes = {};
y.route = function (e = "/", t) {
  const i = document.createElement("a");
  return (
    (i.href = window.location.href.replace(/#(.*)$/, "") + e.split("/")[1]),
    (y.routes[e] = {
      templateId:
        e.split("/")[1] !== "" ? e.split("/")[1] : window.location.origin,
      controller: t,
    }),
    i
  );
};
y.navigate = function (e) {
  let t = null,
    i = null;
  if (e.includes(".")) {
    if (new URL(e).pathname === window.location.pathname) return;
    (t = y.routes[new URL(e).pathname]), (i = new URL(e).pathname);
  } else {
    if (e === window.location.pathname) return;
    (t = y.routes[e]), (i = e);
  }
  if (t) t.controller();
  else throw new Error("cradova err route doesn't exist");
  window.history.pushState({}, "", i), window.scrollTo(0, 0);
};
y.router = function (e) {
  let t;
  if (
    (e.target.tagName === "A" && ((t = e.target), t && t.href.includes("#"))) ||
    (e.target.parentElement &&
      e.target.parentElement.tagName === "A" &&
      ((t = e.target.parentElement), t && t.href.includes("#")))
  )
    return;
  if ((e.preventDefault(), t)) {
    if (t.href === "" || new URL(t.href).pathname === window.location.pathname)
      return;
    const n = y.routes[new URL(t.href).pathname];
    if (n) n.controller(e);
    else throw new Error("cradova err route doesn't exist  " + t.href);
    window.history.pushState({}, "", new URL(t.href).pathname),
      window.scrollTo(0, 0);
    return;
  }
  const i = window.location.pathname,
    s = y.routes[i];
  s && s.controller(e), window.scrollTo(0, 0);
};
document.addEventListener("click", y.router);
window.addEventListener("load", y.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault(), y.router(e);
});
class pe {
  constructor(t, i) {
    (this.html = i),
      (this.name = t),
      (this.template = document.createElement("div")),
      (this.template.style.width = "100%"),
      (this.template.style.display = "flex"),
      (this.template.style.flexDirection = "column"),
      (this.template.id = "cradova-screen-set"),
      (this.callBacks = []),
      (this.treeCreated = !1);
  }
  async package() {
    if (typeof this.html == "function") {
      let t = await this.html();
      typeof t == "function"
        ? this.template.append(t())
        : this.template.append(t);
    } else if (this.html instanceof HTMLElement)
      this.template.append(this.html);
    else throw new Error("Cradova err only parent with descendants is valid");
    this.treeCreated = !0;
  }
  onActivate(t) {
    this.callBacks.push(t);
  }
  addChild(...t) {
    for (let i = 0; i < t.length; i++)
      t[i] && t[i] instanceof HTMLElement && this.template.append(t[i]),
        typeof t[i] == "function" && this.template.append(t[i]());
  }
  detach() {
    const t = document.querySelector("#cradova-screen-set");
    t && document.querySelector("#app-wrapper").removeChild(t);
  }
  async Activate() {
    if (document.title === this.name) return;
    document.querySelector("#cradova-screen-set") && this.detach(),
      this.treeCreated || (await this.package()),
      (document.title = this.name),
      document.querySelector("#app-wrapper").append(this.template),
      this.callBacks.forEach((i) => i(this.template.firstChild));
  }
}
const V = {};
V.speak = function (e, t = "en", i = 1, s = 1, n = 1) {
  const a = new SpeechSynthesisUtterance(e);
  (a.lang = t),
    (a.volume = i),
    (a.rate = s),
    (a.pitch = n),
    speechSynthesis.speak(a);
};
V.stop = () => speechSynthesis && speechSynthesis.cancel();
function ue(e, ...t) {
  const i = "@keyframes " + e + " {",
    s = "}",
    n = t.length;
  let a = " ",
    r = " ",
    c = "  ",
    u = null;
  const x = (p) => {
    for (const [h, m] of Object.entries(t[p][1])) a += "" + h + ": " + m + ";";
    return (r += "" + t[p][0] + "{" + a + "}"), r;
  };
  for (let p = 0; p < n; p++) c += x(p);
  let f = document.querySelector("style");
  f === null && (f = document.createElement("style")),
    (f.media = "screen"),
    (u = f.innerHTML),
    (u += i + c + s),
    (f.innerHTML = u),
    document.head.append(f);
}
const b = {};
b.getFileHandle = async function (e) {
  return "showOpenFilePicker" in window
    ? window.showOpenFilePicker().then((t) => t[0])
    : "chooseFileSystemEntries" in window
    ? window.chooseFileSystemEntries()
    : this.getFileLegacy(e);
};
b.getNewFileHandle = function () {
  if ("showSaveFilePicker" in window) {
    const t = {
      types: [{ description: "Text file", accept: { "text/plain": [".txt"] } }],
    };
    return window.showSaveFilePicker(t);
  }
  const e = {
    type: "save-file",
    accepts: [
      {
        description: "Text file",
        extensions: ["txt"],
        mimeTypes: ["text/plain"],
      },
    ],
  };
  return window.chooseFileSystemEntries(e);
};
b.readFile = function (e) {
  return e.text ? e.text() : b.readFileLegacy(e);
};
b.readFileLegacy = function (e) {
  return new Promise((t) => {
    const i = new FileReader();
    i.addEventListener("loadend", (s) => {
      const n = s.srcElement.result;
      t(n);
    }),
      i.readAsText(e);
  });
};
b.writeFile = async function (e, t) {
  if (e.createWriter) {
    const s = await e.createWriter();
    await s.write(0, t), await s.close();
    return;
  }
  const i = await e.createWritable();
  await i.write(t), await i.close();
};
b.verifyPermission = async function (e, t) {
  const i = {};
  return (
    t && ((i.writable = !0), (i.mode = "readwrite")),
    (await e.queryPermission(i)) === "granted" ||
      (await e.requestPermission(i)) === "granted"
  );
};
b.getFileLegacy = (e) =>
  new Promise((t, i) => {
    e.onchange = (s) => {
      const n = e.files[0];
      if (n) {
        t(n);
        return;
      }
      i(new Error("AbortError"));
    };
  });
b.saveAsLegacy = (e, t) => {
  e = e || "Untitled.txt";
  const i = { type: "text/plain" },
    s = new File([t], "", i);
  (aDownloadFile.href = window.URL.createObjectURL(s)),
    aDownloadFile.setAttribute("download", e),
    aDownloadFile.click();
};
const O = {};
O.store = (e, t) => {
  localStorage.setItem(e, JSON.stringify(t));
};
O.retrieve = (e) => localStorage.getItem(e);
O.remove = (e) => {
  localStorage.removeItem(e);
};
O.getKey = (e) => window.localStorage.key(e);
O.clear = () => {
  localStorage.clear();
};
function j(e) {
  return {
    set() {
      e.requestFullscreen().catch((t) => {
        throw t;
      });
    },
    exist() {
      document.exitFullscreen();
    },
  };
}
function fe(e, t) {
  const i = document.querySelectorAll(".cra_child_doc");
  if (typeof t == "undefined" && typeof e == "object")
    for (const [s, n] of Object.entries(e))
      i.forEach((a) => {
        if (!(!a.stateID || a.stateID !== s) && typeof n == "object")
          for (const r in n) {
            if (r === "style") {
              for (const [c, u] of Object.entries(n[r])) a.style[c] = u;
              continue;
            }
            if (r === "text") {
              a.innerText = n[r];
              continue;
            }
            if (r === "fullscreen") {
              n[r] ? j(a).set() : j(a).exist();
              continue;
            }
            if (r === "class") {
              a.classList.add(n[r]);
              continue;
            }
            if (r === "toggleclass") {
              a.classList.toggle(n[r]);
              continue;
            }
            if (r === "removeclass") {
              a.classList.remove(n[r]);
              continue;
            }
            if (r === "tree") {
              if (
                (typeof n[r] == "function" && (n[r] = n[r]()),
                !n[r] instanceof HTMLElement)
              )
                throw (
                  (console.error(
                    "wrong element type: can't create element eachState on " +
                      n[r]
                  ),
                  new TypeError(
                    "cradova err invalid element, should be a html element from cradova"
                  ))
                );
              (a.innerHTML = ""), a.append(n[r]);
              continue;
            }
            a[r] = n[r];
          }
      });
  else
    i.forEach((s) => {
      if (!(!s.stateID || s.stateID !== e) && typeof t == "object")
        for (const n in t) {
          if (n === "style") {
            for (const [a, r] of Object.entries(t[n])) s.style[a] = r;
            continue;
          }
          if (n === "text") {
            s.innerText = t[n];
            continue;
          }
          if (n === "fullscreen") {
            t[n] ? j(s).set() : j(s).exist();
            continue;
          }
          if (n === "class") {
            s.classList.add(t[n]);
            continue;
          }
          if (n === "toggleclass") {
            s.classList.toggle(t[n]);
            continue;
          }
          if (n === "removeclass") {
            s.classList.remove(t[n]);
            continue;
          }
          if (n === "tree") {
            if (
              (typeof t[n] == "function" && (t[n] = t[n]()),
              !t[n] instanceof HTMLElement)
            )
              throw (
                (console.error(
                  "wrong element type: can't create element state on " + t[n]
                ),
                new TypeError(
                  "cradova err invalid element, should be a html element from cradova"
                ))
              );
            (s.innerHTML = ""), s.append(t[n]);
            continue;
          }
          s[n] = t[n];
        }
    });
}
const { innerWidth: he, innerHeight: ge } = window,
  N = ge,
  I = he,
  me = {
    base: "8px",
    font: "14px",
    radius: "20px",
    padding: "24px",
    large: "40px",
    big: "32px",
    small: "24px",
    s5: "5px",
    s8: "8px",
    s10: "10px",
    s16: "16px",
    s20: "20px",
    s30: "30px",
    s40: "40px",
    s50: "50px",
    s60: "60px",
    h1: "30px",
    h2: "24px",
    h3: "20px",
    h4: "16px",
    h5: "14px",
    h6: "13px",
    body1: "30px",
    body2: "22px",
    body3: "16px",
    body4: "14px",
    body5: "13px",
    body6: "12px",
    borderWidth: "0.4px",
    horizontalLineHeight: "1px",
    screenWidth: I < N ? I + "px" : N + "px",
    screenHeight: I < N ? N + "px" : I + "px",
    drawerWidth: (3 / 4) * I + "px",
    navBarHeight: "60px",
    buttonRadius: "4px",
    icons: {
      tiny: "15px",
      small: "20px",
      medium: "30px",
      large: "45px",
      xl: "50px",
    },
    images: { small: "20px", medium: "40px", large: "60px", logo: "200px" },
  };
function we() {
  if (!JSON.parse(_.LS.retrieve("screen")))
    _.LS.store("screen", { screens: [] });
  else {
    const e = JSON.parse(_.LS.retrieve("screen"));
    _.LS.store("screen", { screens: e.screens.slice(0, e.screens.length - 1) });
  }
  window.addEventListener("blur", () => {
    const e = JSON.parse(_.LS.retrieve("screen"));
    if (e && Array.isArray(e.screens)) {
      const t = e.screens;
      t.push(window.location.pathname),
        _.LS.store("screen", { screens: t }),
        (window.location.pathname = "/");
    }
  }),
    window.addEventListener("beforeunload", () => {
      const e = JSON.parse(_.LS.retrieve("screen"));
      if (e && Array.isArray(e.screens)) {
        const t = e.screens;
        t.push(window.location.pathname), _.LS.store("screen", { screens: t });
      }
      window.location.pathname = "/";
    }),
    window.addEventListener("focus", () => {
      const e = JSON.parse(_.LS.retrieve("screen"));
      _.Router.navigate(e.screens[e.screens.length - 1]);
    });
}
function ye() {
  window.addEventListener("beforeunload", (e) => {
    const t = e || window.event;
    return t && (t.preventDefault(), (t.returnValue = "")), "";
  });
}
function xe(e, t) {
  if ((e && typeof e == "function" && (e = e()), !e instanceof HTMLElement))
    throw (
      (console.error("wrong element type: can't create element state on " + e),
      new TypeError(
        "cradova err invalid element, should be a html element from cradova"
      ))
    );
  (e.stateID = t), e.classList.add(".cra_child_doc_local");
  function i(s) {
    const n = document.querySelectorAll(".cra_child_doc_local");
 //   console.log(n),
      n.forEach((a) => {
        if ((console.log(a.stateID), !(!a.stateID || a.stateID !== t))) {
        //  console.log(a);
          for (const r in s) {
            if (r === "style") {
              for (const [c, u] of Object.entries(s[r])) a.style[c] = u;
              continue;
            }
            if (r === "text") {
              a.innerText = s[r];
              continue;
            }
            if (r === "fullscreen") {
              s[r] ? fullScreen(a).set() : fullScreen(a).exist();
              continue;
            }
            if (r === "class") {
              a.classList.add(s[r]);
              continue;
            }
            if (r === "toggleclass") {
              a.classList.toggle(s[r]);
              continue;
            }
            if (r === "removeclass") {
              a.classList.remove(s[r]);
              continue;
            }
            if (r === "tree" && Array.isArray(s[r])) {
              a.innerHTML = "";
              for (let c = 0; c < s[r].length; c++) {
                if (typeof s[r][c] == "function") {
                  a.append(s[r][c](s));
                  continue;
                }
                a.append(s[r][c]);
              }
              continue;
            }
            a[r] = s[r];
          }
        }
      });
  }
  return [e, i];
}
async function Ae(e, t = "GET", i, s) {
  try {
    return await fetch(e, { headers: i, method: t, body: JSON.stringify(s) });
  } catch {
    return {
      async text() {
        return { message: JSON.stringify(`${t} ${e} net::ERR_FAILED`) };
      },
    };
  }
}
async function be(e, t, i, s) {
  if ((!s && typeof i == "function" && (s = i), typeof e != "string"))
    throw new Error("Cradova err : little Axios invalid url " + e);
  const n = new XMLHttpRequest();
  let a = new FormData();
  const r = t && typeof t != "object" ? "GET" : "POST";
  n.addEventListener("load", async function (c) {
    await s(c.srcElement);
  });
  for (const [c, u] of Object.entries(t)) a.append(c, u);
  n.addEventListener("error", (c) => {
    s({ response: JSON.stringify({ message: `${r} ${e} net::ERR_FAILED` }) });
  }),
    await n.open(r, e, !0),
    n.send(a);
}
const o = (...e) => {
  let t,
    i = [];
  typeof e[1] == "object" && !(e[1] instanceof HTMLElement)
    ? ((t = e[1]), e.length > 2 && (i = e.slice(2, e.length)))
    : (e[1] instanceof HTMLElement || typeof e[1] == "function") &&
      (i = e.slice(1, e.length)),
    typeof e[0] == "string" && (e = e[0]);
  function s(n) {
    typeof n != "object" && (n = [n]);
    let a, r, c;
    const [u, x] = n[0].split("|");
    u.indexOf("#") > -1 &&
      ((c = u.split("#")[1]),
      (a = u.split("#")[0]),
      (r = c.split(".")[1]),
      r && (c = c.split(".")[0])),
      u.indexOf(".") > -1 &&
        (r ||
          ((r = u.split(".")[1]),
          (a = u.split(".")[0]),
          r.split("#")[1] && (r = r.split("#")[0]))),
      a === "" && (a = "div"),
      !a && a !== "" && (a = u);
    const f = { tag: a, className: r, ID: c, innerValue: x };
    return (...p) => {
      let h = [],
        m = {},
        J;
      for (let l = 0; l < p.length; l++) {
        if (
          typeof p[l] == "function" ||
          p[l] instanceof HTMLElement ||
          (Array.isArray(p[l]) &&
            (p[l][0] instanceof HTMLElement || typeof p[l][0] == "function"))
        ) {
          h.push(p[l]);
          continue;
        }
        if (!(p[l] instanceof HTMLElement) && typeof p[l] == "object") {
          m = p[l];
          continue;
        }
        if (typeof p[l] == "string") {
          J = p[l];
          continue;
        }
      }
      i.length && h.push(...i);
      const g = document.createElement(f.tag);
      f.className && (g.className = f.className),
        f.ID && (g.id = f.ID),
        f.innerValue && g.append(f.innerValue);
      for (const l in t) {
        if (l === "style") {
          for (const [A, R] of Object.entries(t[l])) g.style[A] = R;
          continue;
        }
        if (l === "class") {
          g.classList.add(t[l]);
          continue;
        }
        if (l === "text") {
          g.innerText = t[l];
          continue;
        }
        g[l] = t[l];
      }
      if (m && typeof m == "object" && !Array.isArray(m))
        for (const l in m) {
          if (l === "style") {
            for (const [A, R] of Object.entries(m[l])) g.style[A] = R;
            continue;
          }
          if (l === "text") {
            g.innerText = m[l];
            continue;
          }
          if (l === "class") {
            g.classList.add(m[l]);
            continue;
          }
          if (l === "fullscreen") {
            t[l] ? j(g).set() : j(g).exist();
            continue;
          }
          g[l] = m[l];
        }
      if (h && h[0])
        for (let l = 0; l < h.length; l++) {
          if (typeof h[l] == "function") {
            g.append(h[l](m));
            continue;
          }
          if (Array.isArray(h[l])) {
            const A = h[l],
              R = [];
            for (let T = 0; T < A.length; T++) {
              if (
                !(A[T] instanceof HTMLElement) &&
                typeof A[T] != "function" &&
                !Array.isArray(A[T])
              )
                throw new TypeError(
                  "cradova err invalid children list, should be a html element from cradova  " +
                    A[T]
                );
              R.push(A[T]);
            }
            h = [...h.slice(0, l + 1), ...R, ...h.slice(l + 1, h.length)];
            continue;
          }
          g.append(h[l]);
        }
      return J && g.append(J), g.stateID && g.classList.add("cra_child_doc"), g;
    };
  }
  return e[0].raw ? (e = s(e[0].raw)) : (e = s(e)), e;
};
o.register = (e) => {
  for (const t in e) o[t] = e[t];
};
o.register({
  w: re,
  css: te,
  Init: se,
  media: ce,
  swipe: ae,
  Store: de,
  Screen: pe,
  Router: y,
  LS: O,
  FS: b,
  Speaker: V,
  metrics: me,
  fetcher: Ae,
  animate: ue,
  dispatch: fe,
  HotReload: we,
  littleAxios: be,
  createState: xe,
  PromptBeforeLeave: ye,
});
o.Init();
window._ = o;
window.addEventListener("load", async () => {
  "serviceWorker" in navigator &&
    (await navigator.serviceWorker
      .register("service-worker.js")
      .then(function (e) {
        console.log(
          `Service Worker registration successful. Scope: ${e.scope}`
        );
      })
      .catch((e) => console.log(e)));
});
var ve = "/assets/menu.482bf599.svg";
const ke = o("img.menu", {
  alt: "menu",
  src: ve,
  onclick: () => {
    o.dispatch("drawer", { toggleclass: "show-drawer" });
  },
});
o.css(".menu", {
  width: "24px",
  position: "absolute",
  left: "10px",
  top: "16px",
});
o.media("min-width: 790px", [
  ".menu",
  { position: "absolute", left: window.innerWidth - 140 + "px" },
]);
var Se = "/assets/favicon.20caa747.ico";
const Ee = o("div.header-bar"),
  Ce = o("img.logo", { alt: "logo" });
function oe({ Text: e }) {
  return Ee(ke, Ce({ src: Se }), o("h2| " + e));
}
o.css(".header-bar", {
  width: "100%",
  height: "60px",
  "background-color": "#A0A3BD",
  color: "#4dccc6",
  display: "flex",
  "padding-left": "40px",
  "font-size": "16px",
  "align-items": "center",
  "justify-content": "flex-start",
});
o.css(".header-bar .logo", {
  width: "46px",
  height: "46px",
  "margin-right": "15px",
});
const H = o("img", { style: { width: "24px", height: "24px" } }),
  d = ({ placeholder: e, credentials: t, field: i, type: s }) =>
    o("input.input", {
      async onclick() {
        if (s !== "file") return;
        const a = await (await o.FS.getFileHandle(this)).getFile();
        if (a) {
          let r = t.get();
          (r[i] = a), t.set(r);
        }
      },
      oninput: (n) => {
        let a = t.get();
        (a[i] = n.target.value), t.set(a);
      },
      style: {
        minHeight: e ? "40px" : "auto",
        minWidth: e ? "26auto" : "100%",
        border: e ? "2px solid white" : "auto",
        width: e ? "80%" : "auto",
        marginLeft: e ? "10px" : "auto",
        backgroundColor: e ? "#dde1e7" : "transparent",
        borderColor: "whitesmoke",
        marginBottom: e ? "10px" : "auto",
        borderRadius: e ? "12px" : "0px",
        fontSize: e ? "16px" : "14px",
        textAlign: "left",
        padding: "10px",
        color: e ? "#656669" : "transparent",
      },
      placeholder: e || "",
      type: s || "text",
    });
o.css(".gam", {
  margin: "auto",
  padding: "6px",
  margin: "8px",
  "border-radius": "8px",
  "align-items": "center",
  "justify-content": "center",
  "background-color": "#747896",
});
o.css(".batch", {
  "background-color": "#eeeeee",
  "justify-content": "center",
  "align-items": "center",
  padding: "9px",
  "font-weight": "800",
  color: "grey",
  "text-align": "center",
  "border-radius": "10px",
});
Array(36).fill({
  name: "fridaysh",
  email: "fridaymaxtour@gmail.com",
  time: "2 days ago",
  bank: "english",
  amount: 100,
  account_number: 100,
});
Array(36).fill({
  title: "unihub has a new versoin, try updately right away",
  time: "2 days ago",
  in_app: !1,
});
function B(e) {
  switch (e) {
    case "Courses":
      return Te();
    case "Resources":
      return De();
    case "Domains":
      return Le();
    case "Notifications":
      return Re();
    default:
      return "nothing here in  " + e + "  work space please don't refresh";
  }
}
const S = () =>
    o(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#efeeea",
        },
      },
      o("img", {
        src: "../../../assets/loading.gif",
        style: { width: "22px" },
      }),
      o`p| Updating Backend...`
    ),
  E = (e, t) =>
    o(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#efeeea",
        },
      },
      o`p| Transaction Failed!`,
      o("p", {
        text: e,
        style: {
          padding: "15px",
          border: "2px yellow solid",
          borderRadius: "12px",
          width: "90%",
          height: "40%",
          margin: "0px auto",
        },
      }),
      o("button.btn", {
        text: "   Get Back   ",
        style: {
          padding: "8px 18px",
          border: "2px white solid",
          borderRadius: "12px",
          margin: "20px auto",
        },
        onclick() {
          if (typeof t != "string") {
            o.dispatch("home-statistics-components", { tree: t });
            return;
          }
          o.dispatch("workspace", { tree: B(t) });
        },
      })
    ),
  C = (e, t) =>
    o(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
      o`p| Transaction Successful!`,
      o("p", {
        text: e,
        style: {
          padding: "15px",
          border: "2px yellow solid",
          borderRadius: "12px",
          width: "90%",
          height: "40%",
          margin: "0px auto",
        },
      }),
      o("button.btn", {
        text: "   Get Back   ",
        style: {
          padding: "8px 18px",
          border: "2px white solid",
          borderRadius: "12px",
          margin: "20px auto",
        },
        onclick() {
          if (typeof t != "string") {
            o.dispatch("home-statistics-components", { tree: t });
            return;
          }
          o.dispatch("workspace", { tree: B(t) });
        },
      })
    );
function Le() {
  const e = o.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
  });
  return o(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    o("h3| All Domains"),
    o(
      "div",
      o("h4.work-space-title| Create Domains"),
      d({ placeholder: "Domain title", field: "title", credentials: e }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() });
          const t = await o.fetcher(
            "http://localhost:3002/admin/create/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let i = await t.text();
          typeof i != "object" && (i = JSON.parse(await t.text())),
            t.ok
              ? o.dispatch("workspace", { tree: C(i.message, "Domains") })
              : o.dispatch("workspace", { tree: E(i.message, "Domains") });
        },
      })
    ),
    o(
      "div",
      o("h4.work-space-title| Delete Domain"),
      d({ placeholder: "Domain title", field: "title", credentials: e }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() });
          const t = await o.fetcher(
            "http://localhost:3002/admin/delete/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let i = await t.text();
          typeof i != "object" && (i = JSON.parse(await t.text())),
            t.ok
              ? o.dispatch("workspace", { tree: C(i.message, "Domains") })
              : o.dispatch("workspace", { tree: E(i.message, "Domains") });
        },
      })
    )
  );
}
function Te() {
  const e = o.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
  });
  return o(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 80px auto",
        flexDirection: "column",
      },
    },
    o("h3| Courses"),
    o(
      "div",
      o("h4.work-space-title| Create Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      d({ placeholder: "Domain title", field: "domain", credentials: e }),
      d({ placeholder: "Welcome message", field: "welcome", credentials: e }),
      o("p| upload Course thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() }),
            await o.littleAxios(
              "http://localhost:3002/admin/create/Course",
              e.get(),
              (t) => {
                const i = JSON.parse(t.response);
                i.message !== "ok"
                  ? o.dispatch("workspace", { tree: E(i.message, "Courses") })
                  : o.dispatch("workspace", { tree: C(i.message, "Courses") });
              }
            );
        },
      })
    ),
    o(
      "div",
      o("h4.work-space-title| Update Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      d({ placeholder: "Domain title", field: "domain", credentials: e }),
      d({ placeholder: "Welcome message", field: "welcome", credentials: e }),
      o("p| upload Course thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() }),
            await o.littleAxios(
              "http://localhost:3002/admin/update/Course",
              e.get(),
              (t) => {
                const i = JSON.parse(t.response);
                i.message !== "ok"
                  ? o.dispatch("workspace", { tree: E(i.message, "Courses") })
                  : o.dispatch("workspace", { tree: C(i.message, "Courses") });
              }
            );
        },
      })
    ),
    o(
      "div",
      o("h4.work-space-title| Delete Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() });
          const t = await o.fetcher(
            "http://localhost:3002/admin/delete/Course",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let i = await t.text();
          typeof i != "object" && (i = JSON.parse(await t.text())),
            t.ok
              ? o.dispatch("workspace", { tree: C(i.message, "Courses") })
              : o.dispatch("workspace", { tree: E(i.message, "Courses") });
        },
      })
    )
  );
}
function De() {
  const e = o.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    courseTitle: "",
    resourceTitle: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
  });
  return o(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 60px auto",
        flexDirection: "column",
      },
    },
    o("h3| Resources"),
    o(
      "div",
      o("h4.work-space-title| Create Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      o("p| only pdf, json, video and audio"),
      d({ placeholder: "Resource type", field: "type", credentials: e }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      d({ placeholder: "Resource link", field: "link", credentials: e }),
      o("p| upload Resource file"),
      d({ field: "file", credentials: e, type: "file" }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() }),
            await o.littleAxios(
              "http://localhost:3002/admin/create/resource",
              e.get(),
              (t) => {
                const i = JSON.parse(t.response);
                i.message !== "ok"
                  ? o.dispatch("workspace", { tree: E(i.message, "Resources") })
                  : o.dispatch("workspace", {
                      tree: C(i.message, "Resources"),
                    });
              }
            );
        },
      })
    ),
    o(
      "div",
      o("h4.work-space-title| Create Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      o("p| only pdf, json, video and audio"),
      d({ placeholder: "Resource type", field: "type", credentials: e }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      d({ placeholder: "Resource link", field: "link", credentials: e }),
      o("p| upload Resource file"),
      d({ field: "file", credentials: e, type: "file" }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() }),
            await o.littleAxios(
              "http://localhost:3002/admin/up/resource",
              e.get(),
              (t) => {
                const i = JSON.parse(t.response);
                i.message !== "ok"
                  ? o.dispatch("workspace", { tree: E(i.message, "Resources") })
                  : o.dispatch("workspace", {
                      tree: C(i.message, "Resources"),
                    });
              }
            );
        },
      })
    ),
    o(
      "div",
      o("h4.work-space-title| Delete Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() });
          const t = await o.fetcher(
            "http://localhost:3002/admin/delete/Resource",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let i = await t.text();
          typeof i != "object" && (i = JSON.parse(await t.text())),
            typeof i != "object" && (i = JSON.parse(await t.text())),
            t.ok
              ? o.dispatch("workspace", { tree: C(i.message, "Resources") })
              : o.dispatch("workspace", { tree: E(i.message, "Resources") });
        },
      })
    )
  );
}
function Re() {
  const e = o.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
    content: "",
    link: "",
    inApp: !1,
    file: "",
  });
  return o(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    o("h3| Create Notification"),
    o(
      "div",
      d({ placeholder: "Notification title", field: "title", credentials: e }),
      d({ placeholder: "Content", field: "content", credentials: e }),
      d({ placeholder: "Link", field: "link", credentials: e }),
      d({ placeholder: "in app?", field: "inApp", credentials: e }),
      o("p| upload Notification thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      o("button.btn", {
        text: "Make Request",
        onclick: async () => {
          o.dispatch("workspace", { tree: S() }),
            await o.littleAxios(
              "http://localhost:3002/admin/create/notification",
              e.get(),
              (t) => {
                const i = JSON.parse(t.response);
                i.message !== "ok"
                  ? o.dispatch("workspace", {
                      tree: E(i.message, "Notifications"),
                    })
                  : o.dispatch("workspace", {
                      tree: C(i.message, "Notifications"),
                    });
              }
            );
        },
      })
    )
  );
}
o.css(".work-space-title", { color: "grey", margin: "9px" });
o("img");
o("h1");
o("h2");
o("h3");
o("h4");
const W = o("p");
o("div.microlight");
const P = o("a"),
  je = o("div");
var Oe = "/assets/des.24792972.svg";
const Ie = {
  allUsers: "1000000000000000000",
  allAdvertisers: "1000000000000000000",
  paidUsers: "1000000000000000000",
  unPaidUsers: "1000000000000000000",
  allDomain: "1000000000000000000",
  allCourses: "1000000000000000000",
  allResources: "1000000000000000000",
  allAdverts: "1000000000000000000",
  paidAdvert: "1000000000000000000",
  lastToken: "1000000000000000000",
  isTokenActive: !0,
  allDiscovery: "1000000000000000000",
  inActiveAdverts: "1000000000000000000",
  liveClass: "1000000000000000000",
  allPost: "1000000000000000000",
  notification: "1000000000000000000",
  activeDiscovery: "1000000000000000000",
  allVideoStream: "0000000000000000000",
  allGroups: "0000000000000000000",
};
function Me(e) {
  let t = [],
    i;
  for (const [s, n] of Object.entries(e))
    (e[s] = s.toLowerCase()),
      (i = n),
      n === !0 ? (i = "yeah!") : n === !1 && (i = "nop!"),
      t.push({ name: e[s], value: i });
  return t;
}
let ee;
const Ne = o("div.statistics-wrapper", { stateID: "widget" }),
  Fe = function (e) {
    return (
      (ee = Me(e)),
      o(
        "div",
        {
          stateID: "home-statistics-components",
          style: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        o(
          "div.upper",
          o("h3| Dash Board"),
          o("img", { src: Oe, alt: "world cup" })
        ),
        Ne(
          ee.map((t) =>
            o(
              "div.data",
              {
                style: {
                  marginBottom: 10,
                  margin: "auto",
                  width: "90%",
                  padding: "4px",
                  borderRadius: "10px",
                  backgroundColor: "whitesmoke",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "8px",
                  minHeight: "20%",
                  flexDirection: "row",
                  color: "#111110",
                },
              },
              o("span", { text: t.name }),
              o("span", { text: t.value })
            )
          ),
          o("button.btn| Refresh Statistics", {
            onclick: async () => {
              window.location.reload();
            },
          })
        )
      )
    );
  },
  Be = async () => {
    const e = o.Store({
        name: "friday",
        email: "fridaymichaels662@gmail.com",
        password: "uiedbooker662",
        yeah_that_freaking_thing: !0,
      }),
      t = await o.fetcher(
        "http://localhost:3002/admin/stat",
        "POST",
        {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        e.get()
      );
    if (!t || !t.ok) e.set(Ie);
    else {
      const i = JSON.parse(await t.text());
      e.set(i.data);
    }
    return o(
      "div",
      {
        style: {
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
      oe({ Text: "unihub admin" }),
      Fe(e.get())
    );
  },
  G = new o.Screen("Unihub Amin", Be);
o.css(".upper", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "15px",
  "background-color": "#efeeea",
});
o.css(".upper img", { width: "34px", height: "34px", "margin-left": "20px" });
o.css(".statistics-wrapper", {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  "background-color": "#4dcbc5",
  "background-color": "#4dccc6",
  "margin-top": 12 + "px",
  "border-radius": 20 + "px",
  "margin-bottom": 20 + "px",
  padding: "30px 15px 60px 15px",
  margin: "auto",
  width: "97.8%",
});
o.css(".statistics-wrapper .data", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "8px !important",
  "margin-bottom": "10px !important",
  "background-color": "#fff",
});
var Ue = "/assets/banner.8a125017.svg";
const Je = [
    "Domains",
    "Courses",
    "Resources",
    "Notifications",
    "Payments",
    "Advertisers",
    "Users",
  ],
  He = {
    Domains: { style: { backgroundColor: "#747896" } },
    Courses: { style: { backgroundColor: "#747896" } },
    Resources: { style: { backgroundColor: "#747896" } },
    Notifications: { style: { backgroundColor: "#747896" } },
    Payments: { style: { backgroundColor: "#747896" } },
    Advertisers: { style: { backgroundColor: "#747896" } },
    Users: { style: { backgroundColor: "#747896" } },
  },
  We = () =>
    o(
      "div",
      {
        style: {
          backgroundColor: "#a0a3bd",
          width: "100%",
          display: "flex",
          alignContent: "center",
        },
      },
      o(
        "div",
        {
          style: {
            display: "flex",
            alignContent: "center",
            padding: "0px 20px 0px 260px",
            justifyContent: "center",
            marginBottom: "8px",
            overflow: "auto",
            paddingBottom: "8px",
          },
        },
        Je.map((e, t) =>
          o(
            "div.gam",
            {
              stateID: e,
              style: { backgroundColor: t === 0 ? "#3490f3" : "#747896" },
            },
            o("h3| " + e, {
              onclick() {
                o.dispatch("workspace", { tree: B(e) }),
                  o.dispatch(He),
                  o.dispatch(this.parentElement.stateID, {
                    style: { backgroundColor: "#3490f3" },
                  });
              },
              style: {
                color: "whitesmoke",
                fontWeight: "800",
                fontSize: "13px",
                margin: "1px 2px",
              },
            })
          )
        )
      )
    );
function Pe() {
  return o(
    "div",
    {
      style: {
        paddingTop: 15,
        width: "100%",
        backgroundColor: "#A0A3BD",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    o("h3| Unihub Work Space", {
      style: {
        color: "whitesmoke",
        fontWeight: "900",
        fontSize: "22px",
        margin: "4px auto",
        backgroundColor: "#A0A3BD",
      },
    }),
    We(),
    o(
      "div.workspace",
      {
        stateID: "workspace",
        style: {
          paddingTop: "4%",
          width: "100%",
          height: "100%",
          backgroundColor: "#efeeea",
          flexDirection: "column",
          display: "flex",
        },
      },
      o("div", {
        style: {
          background: "url(" + Ue + ")",
          backgroundSize: "100% auto",
          paddingTop: "calc(140 / 700 * 100%)",
        },
      }),
      B("Domains")
    )
  );
}
const z = new o.Screen("work space", Pe),
  Ye = () => {
    const e = o.Store({
      name: "",
      password: "",
      email: "",
      token: "",
      session: "",
    });
    return o(
      "div.container",
      {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0px",
          flexDirection: "column",
        },
      },
      oe({ Text: "Settings screen" }),
      o`br`,
      o(
        "div",
        { style: { padding: "20px" } },
        o("h4.Text| Admin Login Details", {
          style: { fontSize: "28px", fontWeight: "900", marginBottom: "12px" },
        }),
        d({ placeholder: "name", credentials: e, field: "name", type: "text" }),
        d({
          placeholder: "password",
          credentials: e,
          field: "password",
          type: "password",
        }),
        d({
          placeholder: "email",
          credentials: e,
          field: "email",
          type: "email",
        }),
        d({
          placeholder: "access token",
          credentials: e,
          field: "token",
          type: "text",
        }),
        d({
          placeholder: "session token",
          credentials: e,
          field: "session",
          type: "text",
        }),
        o("button.btn| Save Current Logins", {
          onclick: () => {
            console.log(e.get());
          },
        })
      )
    );
  };
o.css(".btn", {
  background: "#c5cae9",
  "font-weight": "600",
  color: "white",
  padding: "6px 12px",
  border: "none",
  "border-radius": "12px",
  "out-line": "hidden",
});
o.css(".container", {
  background: "#efeeea",
  "font-weight": "600",
  color: "white",
  height: "100vh",
  width: "100%",
});
o.css(".Title", {
  "font-weight": "600",
  color: "white",
  "font-size": "24px",
  margin: "10px",
});
o.css(".Text", {
  "font-weight": "600",
  color: "#A0A3BD",
  "font-size": "16px",
  "margin-left": "20px",
});
const Q = new o.Screen("Profile", Ye);
var qe =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADbUlEQVRoge2aT5baRhCHv2p0AHICyyeYuUGYE3jmBIZ9YkZ7xxR53ot5L3vbJ8jkBMOcIOQEUW6grGO6skDwJAEDPUiAn+dbIVEtVXW3qv/8Gr5xZB8j1bRnxqUIl0jnFVjcgi85SI6Rm80fRZipJtNdhbYGoJp2gVvEDYFug46GkJn3dyLcqybZJoONAYxG6a04N+J0jtfJMD9WTT7X/1gLQDWdFLVeJweZIT7D2z9teImTV3hiRC7ZVHkiE/3wLqncKl9sdl6m2HwMzFSTvHGnt6CaXoMMEelV3ZHP+uHdYHVZKqCIG5VMc8wPVJP71r19Av017WNuBMTLe+Lc7eiXn++gCEA1jRH3d6lchvmrbR/OsSn8e6AUBOZfqyZZtLSplDB/cy7OA6gmmWo6KIJYIJ1PwJWs1X6tj50Ta9+o+R8ioFex8vPxcd0KQoFVAOboRzh5gy1vyfScuk4d1SRXnUyXmUno/Bgt8m5hYcxO596+2F9QpFazy6gYNBbXbv7kAKWa9mup9hlIhs0HB7R0uZK7Ufkf8Tw9UEk1Hz8Pi3GdEdBEoqgGsPvdliESH/pWMckOfcaSsACwAWb9Q15oRq7j4eSQZ5QJCqDot9rUy5sgsAXOj5cATs1LAKcmMAulXeC6JV+WBM3HAltAHspTj3aQKXC1r3VYAA2MwruxXoh1UADm/Vice0uL2y3m/V2IfVAA43EyARqbBjTB95WFzpGXAE7N9xeAahrvMMmPuYcaOpXYtnNdt7vaR5xogsCReLfzALjOW2Aa7k44gYt6f7dHEDl+/uX5LoUR1XYa4u2moJrcfvz4W/qUzdev//3b8jcQl35nEZCtbrrOxa7S79//1I46sy9OLkpboVkE9ljaquuppt1jZpFgrKTYGLOIxce23C7sSicaAme5Q62a9qnMhOd/FArN5KGkReWF+nFWrbBBpcl0NHxdZCEbr7oRdJHO7wSsio6CdD5VBHbxY6iIfJVWoFAnD9lFbgTVtKjQ0kqtpCKVxgG7AfmTVRNZD3EPqulGgbltqicFrLwCzMoqUl0nXlcDF+SYTJdnGFYPapYuEJsRL85kuDesL13X1NNNSn2MkxEm/YYdPBCZYvObenLZfthjg8B8GhYnBbZNDncet1FNe8A1yMWa7N8OOYuu8gjc75rV/g9b41C84TxDcwAAAABJRU5ErkJggg==",
  Xe =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAaCAYAAABGiCfwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALkSURBVHgBpVbtedMwEL6TzW8yQpig7QSYCSgTJJ2AegEsQ/8nKfxvu0EzQc0EmAliNsh/aolX0jlxEjtf3PPYlqXTvbpvMR1BWk8G+CRW0ZANDWS6co/WaUFHEh8ASYijjMgme9gqYi7I1DmAKzoVDCBDgDysQKyt8JpjVDY80HLAxO/J8iV+h0EaTwV0eRRYfvdjZOt6iuEAIAXE5odMhcONiVUmoBVZ86FLS+4AevQnNybN83RKR5L4VQP0cx8gt5hhOrXAcCmMJZ1BkKNFy1LkrEyq1rDqRTTKzwUKYCnA+BlD58vb9pqS04zJ2Zvt4ymm6yVT35CzEEwq5l2Didpgsvmx8lxaaH0/0flskWWT28211LliRuRzcrUWY1MIXUTevjyRE4I3+ggLjIMgG84a8UXHFmehDIqM3HavmbWUuIG1Po/6gELwOL+yDSeFyanJO7O7NwQGkh2KNKZUzCEh8d0XFInXxDkeEYbnnf5ye0O0Kl1F5y5b/5bR0L3iZkMcv1n0QnE08iYL1aEUbdvmX/bsbOYdb6noAAUT+LJVbaXEtX8r+0SHyYPGzeD19e8VPn86GINQa+YNOOriGMVx5OdNjwkDDTbAECAV/AVrSDHdIUSfM6Hitzq/f3FaspUlBInO9lR6ji4kYr1FYgAVfl45obSb0NxUfh77jaE4/8RMAaCiD8dHcDB/2fg0dn7AiZ2AxDG0c837y7cXWlpl52icz4d6VouScEizSos4TNRPUC0hFU3w92kN5k90RSeS5GUmv4/NvNTG1E2gStvr/G42ov+mKPQ2aza69zr0rfHF09Y0lRw6i/Jv3zMpZ5XvAC1agfkcsiYlXynUr+3ieoicf/XX+we0KE3SPLd5uGOTa/ETasqTqWf7rgVS965Pvha0BAylmQ5lCgJcQ/S1zgXNIFx4kEfwMzXJG9qKPvrCs6slI2A42cPmepcrWdOzrnIdoL6XQZvLrUtqecoV4h8slno8gF463QAAAABJRU5ErkJggg==",
  ie = "/assets/support.666a408c.svg";
const Ve = o("div.tab", { stateID: "downTab" }),
  Y = o("p"),
  q = o("a"),
  X = o("img", { style: { width: "24px", height: "24px" }, alt: "tab nav" });
function Z() {
  return Ve(
    q(
      { href: "/", stateID: "tab1" },
      X({ src: qe }),
      Y({ text: "statistics" })
    ),
    q(
      { href: "/workspace", stateID: "tab2" },
      X({ src: Xe }),
      Y({ text: "workspace" })
    ),
    q(
      { href: "/Profile", stateID: "tab3" },
      X({ src: ie }),
      Y({ text: "Profile" })
    )
  );
}
o.css(".tab", {
  display: "flex",
  width: "100%",
  "max-height": "54px",
  "align-items": "center",
  "justify-content": "space-evenly",
  position: "fixed",
  bottom: "0px",
  "background-color": "#a0a3bd",
  padding: "0px",
  "border-top-left-radius": "20px",
  "border-top-right-radius": "20px",
});
o.css(".tab a", {
  display: "flex",
  width: "25%",
  height: "100%",
  margin: "4px auto",
  color: "white",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
  color: "#a0a3bd",
  "padding-top": "20px 0px !important",
});
o.css(".tab a p", { "font-size": "13px", "font-weight": "600" });
o.media(
  "min-width: 790px",
  [
    ".tab",
    {
      "flex-direction": "column",
      width: "52px",
      height: "100vh",
      "max-height": "100%",
      top: "0px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [".tab a", { width: "52px", height: "100vh", "max-height": "100%" }],
  [".tab a p", { display: "none !important" }]
);
var Ge =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIVSURBVHgB7ZnBTcMwFIZ/G6s3UEcoGzQbwAb0xoW23JAKAiagTACVAHGjgIS4ARPAAsjdAEbouQQbO1Sc7MZpH0oQ/qSqkf2S+E/+92Q7QCTyv2Eg5mBD1tMV7JvDDfNrTptHSqtBbYk/ng6TMQghFbCzKRtLNTybizZc/Rp4/5xg/fI+eQcRHET02rIjapC+wVtsn43pbb0egAgSAbtteWQGNzSH9YDwOmP8xJ4DAhayUOb3ZTyYq6xhPkbpBK1FLDW3gDy/h7JoXsxloRC/hzLNi7d586KwgIJ+D8bmxd6WPEFBgi1E4PdQCuVFkAAqv4di80KnaF3cJaO82FwLUfo9FHsvLiBDSu1MAb/l9wL08/LCa6FeR14xjS6qwejsJklcHc43YFR3KzR4S3O3/dp3dTgFaJbNJisFA++42n050ETF0J4iQjYbLYsooGyigLKJAsomCiibKKBs/rwAAVrGZhr+6OvUdmHEsj1TMsgEZPs73OzvDGcvxne6siEUJIhWeXQWMrvPeYO3fMeoAYggE8A0z91B+EGpFxARq1DZuNfEJiFRPZwWdQpgUE+oGIwVEJByfmr+SL9lLcoHw7Gr3SnAljqt3SeUxLGvRHuT+Pw2sW8hSITNGSEQXEaFEKGxY/MgD82uXN8XMLMK2RNTjlUzwGt4ksgOnilsF/l8msUqtHzFYto+MPdOpg8yEol4+AJAFLXjcYT9ZwAAAABJRU5ErkJggg==",
  ze = "/assets/file-text.7c2d64cf.svg";
function K() {
  return je(
    {
      class: "drawer",
      stateID: "drawer",
      tabIndex: 0,
      onblur: () => {
        o.dispatch("drawer", { removeclass: "show-drawer" });
      },
      contentEditable: !0,
    },
    P({ href: "/" }, H({ src: Ge }), W({ text: "home" })),
    P({ href: "/workspace" }, H({ src: ze }), W({ text: "learn" })),
    P({ href: "/Profile" }, H({ src: ie }), W({ text: "setting" }))
  );
}
o.css(".drawer", {
  transform: "scaleZ(0)",
  position: "absolute",
  top: 0,
  left: "-2000px",
  display: "flex",
  "align-items": "flex-start",
  "justify-content": "center",
  "flex-direction": "column",
  height: "100%",
  width: o.metrics.drawerWidth,
  padding: "0px",
  transition: "all 3s ease",
  border: "1px",
  "max-width": "300px",
  "background-color": "white",
  "out-line": "none",
  color: "white",
});
o.css(".drawer a", {
  display: "flex",
  width: "25%",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
});
o.css(".drawer a p", {
  "font-size": "13px",
  "font-weight": "600",
  color: "#a0a3bd",
});
o.media(
  "min-width: 790px",
  [
    ".drawer",
    {
      left: "0px",
      "background-color": "#c5cae9",
      color: "#c5cae9",
      padding: "0px 5px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [".drawer a p", { color: "#c5cae9" }]
);
G.addChild(Z, K);
Q.addChild(Z, K);
z.addChild(Z, K);
G.onActivate((e) => {
  o.dispatch("drawer", { removeclass: "show-drawer" }),
    o.dispatch("tab1", { style: { color: "white", paddingTop: "2px" } });
});
z.onActivate((e) => {
  o.dispatch("drawer", { removeclass: "show-drawer" }),
    o.dispatch("tab2", { style: { color: "white", paddingTop: "2px" } });
});
Q.onActivate((e) => {
  o.dispatch("drawer", { removeclass: "show-drawer" }),
    o.dispatch("tab3", { style: { color: "white", paddingTop: "2px" } });
});
o.swipe({
  up: () => {
    o.dispatch("downTab", { style: { display: "none" } });
  },
  down: () => {
    o.dispatch("downTab", { style: { display: "flex" } });
  },
});
o.Router.route("/", () => G.Activate());
o.Router.route("/Profile", () => Q.Activate());
o.Router.route("/workspace", () => z.Activate());
const U = {
  appName: "Amin",
  hasFSAccess:
    "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  isMac: navigator.userAgent.includes("Mac OS X"),
  isAndroid: navigator.userAgent.includes("Android"),
  isWindows: navigator.userAgent.includes("Windows"),
};
window.addEventListener("appinstalled", (e) => {
  console.log("app installed!");
});
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(),
    (U.installPrompt = e),
    F.removeAttribute("disabled"),
    F.classList.remove("hide");
});
window.addEventListener("appinstalled", () => {
  (U.installPrompt = null), console.log("PWA was installed");
});
const F = document.getElementById("butInstall");
F.addEventListener("click", () => {
  F.setAttribute("disabled", !0), U.installPrompt.prompt();
});
U.getPWADisplayMode = function () {
  const e = window.matchMedia("(display-mode: standalone)").matches;
  return document.referrer.startsWith("android-app://")
    ? "twa"
    : navigator.standalone || e
    ? "standalone"
    : "browser";
};
