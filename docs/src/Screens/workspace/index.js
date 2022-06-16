import _ from "../../../../index.js";
import FormContainer from "../../Components/workspaceComps.js";
const bars = [
  "Domains",
  "Courses",
  "Resources",
  "Notifications",
  "Payments",
  "Advertisers",
  "Users",
];

const barColors = {
  Domains: { style: { backgroundColor: "#747896" } },
  Courses: { style: { backgroundColor: "#747896" } },
  Resources: { style: { backgroundColor: "#747896" } },
  Notifications: { style: { backgroundColor: "#747896" } },
  Payments: { style: { backgroundColor: "#747896" } },
  Advertisers: { style: { backgroundColor: "#747896" } },
  Users: { style: { backgroundColor: "#747896" } },
};

const TopNavigationBar = () => {
  return _(
    "div",
    {
      style: {
        backgroundColor: "#a0a3bd", // "#3490f3" : ,
        width: "100%",
        display: "flex",
        alignContent: "center",
      },
    },
    _(
      "div",
      {
        style: {
          display: "flex",
          alignContent: "center",
          padding: "0px 0px 0px 290px",
          justifyContent: "center",
          marginBottom: "8px",
          overflow: "auto",
          paddingBottom: "8px",
        },
      },
      bars.map((bar, i) =>
        _(
          "div.gam",
          {
            stateID: bar,
            style: {
              backgroundColor: i === 0 ? "#3490f3" : "#747896",
            },
          },
          _("h3| " + bar, {
            onclick() {
              _.dispatch("workspace", { tree: FormContainer(bar) });
              _.dispatch(barColors);
              _.dispatch(this.parentElement.stateID, {
                style: {
                  backgroundColor: "#3490f3",
                },
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
};

function workspace() {
  return _(
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
    _("h3| cradova Work Space", {
      style: {
        color: "whitesmoke",
        fontWeight: "900",
        fontSize: "22px",
        margin: "4px auto",
        backgroundColor: "#A0A3BD",
      },
    }),
    TopNavigationBar(),
    _(
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
      _("div", {
        style: {
          background: "url(/assets/banner.svg)",
          backgroundSize: "100% auto",
          paddingTop: "calc(140 / 700 * 100%)",
        },
      }),
      FormContainer("Domains")
      // work space tree holders
    )
  );
}

const doc = new _.Screen("work space", workspace);
export default doc;
