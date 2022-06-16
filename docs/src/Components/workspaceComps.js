import _ from "../../../../index.js";
import { Input } from "./index.js";
// #e2c9b3
// #f3f8fc
// #A0A3BD
// #faad14
// #9d9d9d
// #14dde7 light blue
// #1032d9 dark blue
// #36e517 green mode
// #eff9fb light mode
// #333333 dark mode
// #141618 dark mode
// #06222d dark mode
// #cae0eb milk
export default function FormContainer(view) {
  switch (view) {
    case "Courses":
      return CourseModal();
    case "Resources":
      return ResourseModal();
    case "Domains":
      return DomainModal();
    case "Notifications":
      return NotificationModal();
    default:
      return "nothing here in  " + view + "  work space please don't refresh";
  }
}

export const Loader = () => {
  return _(
    "div",
    {
      style: {
        backgroundColor: "#efeeea",
      },
    },
    _(
      "div.lds-roller",
      _`div`,
      _`div`,
      _`div`,
      _`div`,
      _`div`,
      _`div`,
      _`div`,
      _`div`
    ),
    _`div.b`,
    _("p|  visiting server...", {
      style: {
        margin: "46% auto",
        width: "fit-content",
        height: "fit-content",
        boxShadow: "0px 0px 6px whitesmoke",
      },
    })
  );
};

export const ErrorBox = (text, screens) => {
  return _(
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
    _`p| Transaction Failed!`,

    _("p", {
      text: text,
      style: {
        padding: "15px",
        border: "2px yellow solid",
        borderRadius: "12px",
        width: "90%",
        height: "40%",
        margin: "0px auto",
      },
    }),
    _("button.btn", {
      text: "   Get Back   ",
      style: {
        padding: "8px 18px",
        border: "2px white solid",
        borderRadius: "12px",
        margin: "20px auto",
      },
      onclick() {
        if (typeof screens !== "string") {
          _.dispatch("home-statistics-components", { tree: screens });
          return;
        }
        _.dispatch("workspace", { tree: FormContainer(screens) });
      },
    })
  );
};

export const SuccessBox = (text, screens) => {
  return _(
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
    _`p| Transaction Successful!`,

    _("p", {
      text: text,
      style: {
        padding: "15px",
        border: "2px yellow solid",
        borderRadius: "12px",
        width: "90%",
        height: "40%",
        margin: "0px auto",
      },
    }),
    _("button.btn", {
      text: "   Get Back   ",
      style: {
        padding: "8px 18px",
        border: "2px white solid",
        borderRadius: "12px",
        margin: "20px auto",
      },
      onclick() {
        if (typeof screens !== "string") {
          _.dispatch("home-statistics-components", { tree: screens });
          return;
        }
        _.dispatch("workspace", { tree: FormContainer(screens) });
      },
    })
  );
};

export function DomainModal() {
  let check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }
  check = JSON.parse(check);
  delete check.id;
  //  ...(check)

  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    title: "",
    ...check,
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    _("h3| All Domains"),
    _(
      "div",
      _("h4.work-space-title| Create Domains"),
      Input({
        placeholder: "Domain title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const domain = await _.fetcher(
            location.origin + "//create/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await domain.text();
          if (!res.includes(":")) {
            res = {
              message: `you are offline`,
            };
          }
          if (typeof res === "string") {
            res = JSON.parse(res);
          }

          if (!domain.ok) {
            _.dispatch("workspace", { tree: ErrorBox(res.message, "Domains") });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Domains"),
            });
          }
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Domain"),
      Input({
        placeholder: "Domain title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const domain = await _.fetcher(
            location.origin + "//delete/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await domain.text();
          if (!res.includes(":")) {
            res = {
              message: `you are offline`,
            };
          }
          if (typeof res === "string") {
            res = JSON.parse(res);
          }

          if (!domain.ok) {
            _.dispatch("workspace", { tree: ErrorBox(res.message, "Domains") });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Domains"),
            });
          }
        },
      })
    )
  );
}

export function CourseModal() {
  let check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }
  check = JSON.parse(check);
  delete check.id;

  const credentials = _.Store({
    name: "",
    title: "",
    file: "",
    welcome: "",
    domain: "",
    ...check,
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 80px auto",
        flexDirection: "column",
      },
    },
    _("h3| Courses"),
    _(
      "div",
      _("h4.work-space-title| Create Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Domain title",
        field: "domain",
        credentials,
      }),
      Input({
        placeholder: "Welcome message",
        field: "welcome",
        credentials,
      }),
      _("p| upload Course thumbnail, ** images only"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            location.origin + "//create/Course",
            credentials.get(),
            (res) => {
              let Course = res.response;
              if (Course.includes(":")) {
                Course = JSON.parse(Course);
              }
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(
                    Course.message ? Course.message : Course,
                    "Courses"
                  ),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Courses"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Update Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Domain title",
        field: "domain",
        credentials,
      }),
      Input({
        placeholder: "Welcome message",
        field: "welcome",
        credentials,
      }),
      _("p| upload Course thumbnail"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            location.origin + "//update/Course",
            credentials.get(),
            (res) => {
              let Course = res.response;
              if (Course.includes(":")) {
                Course = JSON.parse(Course);
              }
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(
                    Course.message ? Course.message : Course,
                    "Courses"
                  ),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Courses"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const Course = await _.fetcher(
            location.origin + "//delete/Course",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await Course.text();
          if (!res.includes(":")) {
            res = {
              message: `you are offline`,
            };
          }
          if (typeof res === "string") {
            res = JSON.parse(res);
          }

          if (!Course.ok) {
            _.dispatch("workspace", {
              tree: ErrorBox(res.message, "Courses"),
            });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Courses"),
            });
          }
        },
      })
    )
  );
}

export function ResourseModal() {
  let check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }
  check = JSON.parse(check);

  delete check.id;

  const credentials = _.Store({
    name: "",
    password: "",
    courseTitle: "",
    resourceTitle: "",
    file: "",
    welcome: "",
    type: "",
    link: "",
    domain: "",
    ...check,
  });

  return _(
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
    _("h3| Resources"),
    _(
      "div",
      _("h4.work-space-title| Create Resource"),
      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      _("p| only pdf or json"), // course title
      Input({
        placeholder: "Resource type",
        field: "type",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      Input({
        placeholder: "Resource link",
        field: "link",
        credentials,
      }),
      _("p| upload Resource file"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            location.origin + "//create/resource",
            credentials.get(),
            (res) => {
              let Course = res.response;
              if (Course.includes(":")) {
                Course = JSON.parse(Course);
              }
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(
                    Course.message ? Course.message : Course,
                    "Resources"
                  ),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Resources"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Create Resource"),
      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      _("p| only pdf or json"), // course title
      Input({
        placeholder: "Resource type",
        field: "type",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      Input({
        placeholder: "Resource link",
        field: "link",
        credentials,
      }),
      _("p| upload Resource file"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            location.origin + "//up/resource",
            credentials.get(),
            (res) => {
              let Course = res.response;
              if (Course.includes(":")) {
                Course = JSON.parse(Course);
              }
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(
                    Course.message ? Course.message : Course,
                    "Resources"
                  ),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Resources"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Resource"),

      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const domain = await _.fetcher(
            location.origin + "//delete/Resource",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await domain.text();
          if (!res.includes(":")) {
            res = {
              message: `you are offline`,
            };
          }
          if (typeof res === "string") {
            res = JSON.parse(res);
          }
          if (res.message !== "ok") {
            _.dispatch("workspace", {
              tree: ErrorBox(res.message, "Resources"),
            });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Resources"),
            });
          }
        },
      })
    )
  );
}

export function NotificationModal() {
  let check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }
  check = JSON.parse(check);
  delete check.id;

  const credentials = _.Store({
    name: "",
    title: "",
    file: "",
    welcome: "",
    domain: "",
    content: "",
    link: "",
    inApp: false,
    file: "",
    ...check,
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    _("h3| Create Notification"),
    _(
      "div",
      Input({
        placeholder: "Notification title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Content",
        field: "content",
        credentials,
      }),
      Input({
        placeholder: "Link",
        field: "link",
        credentials,
      }),
      Input({
        placeholder: "in app?",
        field: "inApp",
        credentials,
      }),
      _("p| upload Notification thumbnail"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),

      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            location.origin + "//create/notification",
            credentials.get(),
            (res) => {
              let Course = res.response;
              if (Course.includes(":")) {
                Course = JSON.parse(Course);
              }
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(
                    Course.message ? Course.message : Course,
                    "Notifications"
                  ),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Notifications"),
                });
              }
            }
          );
        },
      })
    )
  );
}

/**
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */

// const PaymentModal = () => {
//   const goods = con(data);
//   return (
//     <TouchableWithoutFeedback>
//       <FlatList
//         keyExtractor={(i, index) => "_stats" + index}
//         showsVerticalScrollIndicator={false}
//         vertical
//         data={goods}
//         contentContainerStyle={{
//           // display: "none",
//           borderRadius: 20,
//           backgroundColor: "#4dccc6",
//           padding: 10,
//           width: "97.8%",
//         }}
//         renderItem={({ item, index }) => (
//           <View
//             style={{
//               marginBottom: 10,
//               width: "100%",
//               padding: 14,
//               borderRadius: 10,
//               backgroundColor: "whitesmoke",
//               alignItems: "flex-start",
//               justifyContent: "center",
//               shadowColor: "black",
//               shadowOffset: {
//                 width: 1,
//                 height: 1,
//               },
//               shadowRadius: 5,
//               shadowOpacity: 0.5,
//               elevation: 5,
//               borderRadius: 8,
//               paddingHorizontal: 8,
//             }}
//           >
//             <Texti size={14} color="grey">
//               {item[0]}
//             </Texti>
//             {item[1].map((cont, index) => (
//               <Batch key={uuidSuper(29) + index}>{cont}</Batch>
//             ))}

//             <View
//               style={{
//                 flexDirection: "row",
//                 margin: "auto",
//               }}
//             >
//               <TouchableOpacity
//                 style={[styles.btn, { marginHorizontal: 14 }]}
//                 onPress={async () => {
//                   setLoading(true);
//                   save.id = index;
//                   saver(save);
//                   const notification = await fetcher(
//                     location.origin + "//pay",
//                     "POST",
//                     {},
//                     save
//                   );
//                   if (notification.error) {
//                     setLoading(false);
//                     setError(true);
//                   } else {
//                     setLoading(false);
//                     setSuccess(true);
//                   }
//                   if (!notification.data) {
//                     setRes("you are offline");
//                   } else {
//                     setRes(notification.data.message);
//                   }
//                 }}
//               >
//                 <Texti color="lightgreen">Accept</Texti>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.btn, { marginHorizontal: 14 }]}
//                 onPress={async () => {
//                   setLoading(true);
//                   const notification = await fetcher(
//                     location.origin + "//decline",
//                     "POST",
//                     {},
//                     save
//                   );
//                   if (notification.error) {
//                     setLoading(false);
//                     setError(true);
//                   } else {
//                     setLoading(false);
//                     setSuccess(true);
//                   }
//                   if (!notification.data) {
//                     setRes("you are offline");
//                   } else {
//                     setRes(notification.data.message);
//                   }
//                 }}
//               >
//                 <Texti color="red">Decline</Texti>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </TouchableWithoutFeedback>
//   );
// };

_.css(".work-space-title", {
  color: "grey",
  margin: "9px",
});
