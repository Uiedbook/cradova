import _ from "../../../../index.js";
import { header, Input } from "../../Components/index.js";

const profile = () => {
  const { image, name, password, pass, email } = {};

  const credentials = _.Store({
    name: name || "",
    password: password || "",
    email: email || "",
    token: pass || "",
    passTime: null,
    session: "",
    file: image || "",
  });

  return _(
    "div.container",
    {
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      },
    },
    header({ Text: "Settings screen" }),
    _`br`,
    _(
      "div",
      { style: { padding: "20px" } },
      _("h4.Text|  Login Details", {
        style: { fontSize: "28px", fontWeight: "900", marginBottom: "12px" },
      }),
      _("p.Text| please wait here untill your creditials appears", {
        stateID: "proccesed",
      }),
      Input({ placeholder: "name", credentials, field: "name", type: "text" }),
      Input({
        placeholder: "password",
        credentials,
        field: "password",
        type: "password",
      }),
      Input({
        placeholder: "email",
        credentials,
        field: "email",
        type: "email",
      }),
      Input({
        placeholder: "access token",
        credentials,
        field: "token",
        type: "token",
      }),
      Input({
        placeholder: "token usage time",
        credentials,
        field: "passTime",
        type: "text",
      }),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      Input({
        placeholder: "access ref",
        credentials,
        field: "",
        type: "text",
      }),

      _("button.btn| Save Current Logins", {
        onclick: async () => {
          await _.littleAxios(
            location.origin + "//register",
            credentials.get(),
            (res) => {
              const Course = JSON.parse(res.response);
              if (!Course.data) {
                _.dispatch("proccesed", {
                  text: "update failed please retry!",
                  style: { color: "red" },
                });
              } else {
                _.LS.store("x-000-ttf-kktw-iii-cude", Course.data);
                _.dispatch("proccesed", {
                  text: "successfully updated your access data!",
                  style: { color: "green" },
                });
              }
              if (Course.data.image) {
                window.location.reload();
              }
            }
          );
        },
      }),
      _("button.btn| Log out", {
        onclick: async () => {
          localStorage.clear();
          window.location.reload();
        },
      })
    )
  );
};

_.css(".btn", {
  background: "#c5cae9",
  "font-weight": "600",
  color: "white",
  padding: "6px 12px",
  border: "none",
  "border-radius": "12px",
  "out-line": "hidden",
});

_.css(".container", {
  background: "#efeeea",
  "font-weight": "600",
  color: "white",
  width: "100%",
  "padding-bottom": "150px",
});

_.css(".Title", {
  "font-weight": "600",
  color: "white",
  "font-size": "24px",
  margin: "10px",
});

_.css(".Text", {
  "font-weight": "600",
  color: "#A0A3BD",
  "font-size": "16px",
  "margin-left": "20px",
});

const Profile = new _.Screen("Profile", profile);

export default Profile;
