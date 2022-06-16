import _ from "../../../../index.js";
import { header } from "../../Components/index.js";

const stats = {
  allUsers: "10000000000",
  // allUsers: undefined,
  allAdvertisers: "10000000000",
  // allAdvertisers: undefined,
  paidUsers: "10000000000",
  // paidUsers: undefined,
  unPaidUsers: "10000000000",
  // unPaidUsers: undefined,
  allDomain: "10000000000",
  // allDomain: undefined,
  allCourses: "10000000000",
  // allCourses: undefined,
  allResources: "10000000000",
  // allResources: undefined,
  allAdverts: "10000000000",
  // allAdverts: undefined,
  paidAdvert: "10000000000",
  lastToken: "10000000000",
  isTokenActive: false,
  // isTokenActive: undefined,
  allDiscovery: "10000000000",
  // lastToken: undefined,
  inActiveAdverts: "10000000000",
  // inActiveAdverts: undefined,
  liveClass: "10000000000",
  // liveClass: undefined,
  allPost: "10000000000",
  // allPost: undefined,
  notification: "10000000000",
  // notification: undefined,
  activeDiscovery: "10000000000",
  // activeAdverts: undefined,
  allVideoStream: "100000000000",
  // allVideoStream: undefined,
  allGroups: "100000000000",
  // allGroups: undefined,
};

const [el, stH] = _.$("h5|     click to get a quote!!");

function make(stats) {
  let useful = [],
    val;
  for (const [k, v] of Object.entries(stats)) {
    stats[k] = k.toLowerCase();
    val = v;
    if (v === true) {
      val = "yeah!";
    } else if (v === false) {
      val = "nop!";
    }
    useful.push({ name: stats[k], value: val });
  }
  return useful;
}

let useful;

const statsWidget = _("div.statistics-wrapper", { stateID: "widget" });

const homeStatis = function (statisticsData) {
  useful = make(statisticsData);
  return _(
    "div",
    {
      stateID: "home-statistics-components",
      style: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    _(
      "div.upper",
      _("h3| Dash Board"),
      _("img", {
        src: "/assets/des.svg",
        alt: "world cup",
      }),
      el({
        onclick: () => stH({ text: "   no quote today " }),
      })
    ),
    statsWidget(
      useful.map((data) =>
        _(
          "div.data",
          {
            style: {
              display: "flex",
              marginBottom: 10,
              margin: "auto",
              width: "90%",
              padding: "4px",
              borderRadius: "10px",
              backgroundColor: "whitesmoke",
              alignItems: !Array.isArray(data.value)
                ? "space-between"
                : "flex-start",
              justifyContent: !Array.isArray(data.value)
                ? "space-between"
                : "flex-start",
              borderRadius: "8px",
              flexDirection: !Array.isArray(data.value) ? "row" : "column",
              color: "#111110",
              //  border: "2px red solid",
            },
          },
          _("h2", {
            text: data.name.includes("_")
              ? data.name.split("_").join("  ")
              : data.name,
            style: {
              borderBottom: "2px #4dccc6 solid",
              margin: !Array.isArray(data.value) ? "5px" : "auto",
              color: "#06222d",
              fontWeight: "200",
            },
          }),
          !Array.isArray(data.value)
            ? _("span", { text: data.value })
            : data.value.map((v) => {
                return _(
                  "div",
                  {
                    text: v.title || v.title || v.resourceTitle,
                    onclick: () => {
                      const link = v.link ? v.link : v.image;
                      if (link) {
                        _.Router.goTo(
                          window.location.pathname +
                            "/view" +
                            link.split("/file")[1]
                        );
                        // window.open(
                        //   window.location.pathname +
                        //     "/view" +
                        //     link.split("/file")[1]
                        // );
                      }
                    },
                    style: {
                      fontWeight: "200",
                      display: "inline",
                      fontSize: "14px",
                      // border: "2px red solid",
                      //                      display: "flex",
                      padding: "6px",
                      width: "100%",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    },
                  },
                  _("span", {
                    text: v.Course
                      ? " ___  has ___  " + v.Course.length + "   courses"
                      : "",
                  }),
                  _.assert(Array.isArray(v.Course), () =>
                    _(
                      "div",
                      {
                        style: {
                          display: "flex",
                          with: "100%",
                          flexDirection: "column",
                          margin: "30px 0px",
                          //                          border: "2px red solid",
                        },
                      },
                      _("h3| courses  for " + v.title),
                      v.Course.map((v) =>
                        _("h3", {
                          text: v.title || v.title || v.resourceTitle,
                          onclick: () => {
                            const link = v.link ? v.link : v.image;
                            if (link) {
                              _.Router.goTo(
                                window.location.pathname +
                                  "/view" +
                                  link.split("/file")[1]
                              );
                              // window.open(
                              //   window.location.pathname +
                              //     "/view" +
                              //     link.split("/file")[1]
                              // );
                            }
                          },
                          style: {
                            fontWeight: "100",
                            fontSize: "14px",
                            // border: "2px red solid",
                            display: "flex",
                            padding: "6px",
                          },
                        })
                      )
                    )
                  ),
                  _("span", {
                    text: v.Domain ? " __   domain    " + v.Domain.title : "",
                  }),
                  _("span", {
                    text: v.Resources
                      ? "  ___  has " + v.Resources.length + "   Resources"
                      : "",
                  }),
                  _.assert(Array.isArray(v.Resources), () =>
                    _(
                      "div",
                      {
                        style: {
                          display: "flex",
                          with: "100%",
                          flexDirection: "column",
                        },
                      },
                      _("h3| resources  for " + v.title),
                      v.Resources.map((v) =>
                        _("h3", {
                          text: v.title || v.title || v.resourceTitle,
                          onclick: () => {
                            const link = v.link ? v.link : v.image;
                            if (link) {
                              _.Router.goTo(
                                window.location.pathname +
                                  "/view" +
                                  link.split("/file")[1]
                              );
                              // window.open(
                              //   window.location.pathname +
                              //     "/view" +
                              //     link.split("/file")[1]
                              // );
                            }
                          },
                          style: {
                            fontWeight: "100",
                            fontSize: "14px",
                            // border: "2px red solid",
                            display: "flex",
                            padding: "6px",
                          },
                        })
                      )
                    )
                  ),

                  _("span", {
                    text: v.courseTitle
                      ? "  ___   course   ___  " + v.courseTitle
                      : "",
                  })
                );
              })
        )
      ),

      _("button.btn| Refresh Statistics", {
        onclick: async () => {
          window.location.reload();
        },
      })
    )
  );
};

const Home = async () => {
  let check = _.LS.retrieve("x-000-ttf-kktw-iii-cude") || {};
  const statisticsData = _.Store({
    name: check.name,
    email: check.email,
    password: check.password,
    pass: check.pass,
    id: check.id,
  });

  const domain = await _.fetcher(
    location.origin + "//stat",
    "POST",
    {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    statisticsData.get()
  );

  if (!domain || !domain.ok) {
    statisticsData.set(stats);
  } else {
    const res = JSON.parse(await domain.text());
    statisticsData.set(res.data);
  }

  return _(
    "div.container",
    {
      style: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    header({ Text: "cradova " }),
    homeStatis(statisticsData.get())
  );
};

const home = new _.Screen("cradova-docs", Home);

_.css(".upper", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "15px",
  "background-color": "#efeeea",
});

_.css(".upper img", {
  width: "34px",
  height: "34px",
  "margin-left": "20px",
});
_.css(".statistics-wrapper", {
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
  // border: "4px red solid",
});
_.css(".statistics-wrapper .data", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "8px !important",
  "margin-bottom": "10px !important",
  "background-color": "#fff",
});
export default home;
