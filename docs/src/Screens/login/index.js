import _ from "../../../../index.js";
import { Loader } from "../../Components/workspaceComps.js";
import { Input } from "../../Components/index.js";

const join = (credentials, err) => {
  if (!err) {
    err = "";
  }
  return _(
    "div.login",
    {
      stateID: "login",
      style: {
        padding: "4%",
        width: "100%",
        height: "100%",
        backgroundColor: "#efeeea",
        flexDirection: "column",
        display: "flex",
      },
    },
    _("img", {
      src: "/assets/xp-level.svg",
      style: {
        maxHeight: "200px",
      },
    }),
    _("h3|  The Journey to Greatness Starts here"),
    _("h4|  " + err, {
      stateID: "loginindicator",
      style: { color: "black", margin: "6px" },
    }),
    Input({
      placeholder: "your name",
      field: "name",
      credentials,
      type: "name",
    }),
    Input({
      placeholder: "your email",
      field: "email",
      credentials,
      type: "email",
    }),
    Input({
      placeholder: "your password",
      field: "password",
      credentials,
      type: "password",
    }),
    Input({
      field: "file",
      credentials,
      type: "file",
    }),
    _("button.btn", {
      text: "Access Server",
      onclick: async () => {
        _.dispatch("login", { tree: Loader() });
        await _.littleAxios(
          location.origin + "//register",
          credentials.get(),
          (res) => {
            let Course = res.response;
            if (typeof Course === "string") {
              Course = JSON.parse(Course);
            }
            if (Course.message !== "ok") {
              _.dispatch("loginindicator", { style: { color: "red" } });
              _.dispatch("login", {
                tree: join(credentials, Course.message ? Course.message : ""),
              });
            } else {
              _.LS.store("x-000-ttf-kktw-iii-cude", Course.data);
              _.dispatch("loginindicator", { style: { color: "green" } });
              _.Router.goTo("/");
            }
          }
        );
      },
    })
  );
};
function Login() {
  const check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (check) {
    _.Router.goTo("/");
    return "";
  }
  // FIXME: here i will get  credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    email: "",
    file: "",
    password: "",
  });

  return _(
    "div.container",
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
    _("h3| cradova istrators", {
      style: {
        color: "whitesmoke",
        fontWeight: "700",
        fontSize: "24px",
        margin: "4px auto",
        backgroundColor: "#A0A3BD",
      },
    }),
    _(
      "div.login",
      {
        stateID: "login",
        style: {
          paddingTop: "4%",
          width: "100%",
          height: "100%",
          backgroundColor: "#efeeea",
          flexDirection: "column",
          display: "flex",
        },
      },
      join(credentials)
    )
  );
}

const Access = new _.Screen("access cradova", Login);

export default Access;
