// if (globalThis.document) {

// }

// Router.route(
//   "/",
//   new Screen({
//     name: "cradova",
//     template: () => {
//       return _(
//         ".div#bulaba",
//         {
//           shouldUpdate: true,
//           $num: "0", // data-num
//           onclick(e ) {
//             console.log("hello world");
//           },
//         },
//         [
//           _("h1| theres no problem in Nigeria 1"),
//           _("h1| theres no problem in Nigeria 2", { style: { color: "aqua" } }),
//         ],
//         _("h1| theres no problem in Nigeria 3"),
//         _("h1| theres no problem in Nigeria 4")
//       );
//     },
//   })
// );

// Router["serve"] = async function (option: {
//   port?: number;
//   path?: string;
//   debug?: boolean;
// }) {
//   let fileURLToPath, _dirname;
//   const { readFile } = await import("fs/promises");
//   const dr = await import("path");
//   const fp = await import("url");
//   fileURLToPath = fp.fileURLToPath;
//   _dirname = dr
//     .dirname(fileURLToPath(import.meta.url))
//     .split("node_modules")[0];
//   let html: string;
//   try {
//     html = await readFile(dr.join(_dirname, "index.html"), "utf-8");
//   } catch (error) {
//     console.log(error);
//     throw new Error("cradova err: index.html not found in serving dir");
//   }
//   if (option.port) {
//     const { createServer } = await import("http");
//     createServer(handler).listen(option.port, start_callback);
//     function start_callback() {
//       console.log(
//         "\x1B[32m Running Cradova on port " + option.port + " \x1B[39m"
//       );
//     }
//     async function handler(req, res) {
//       if (option.debug) {
//         const clientIP = req.connection.remoteAddress;
//         const connectUsing = req.connection.encrypted ? "SSL" : "HTTP";
//         console.log(
//           "Request received: " + connectUsing + " " + req.method + " " + req.url
//         );
//         console.log("Client IP: " + clientIP);
//       }
//       const [route, params] = checker(req.url);
//       console.log(route, params);
//       res.writeHead(200, "OK", { "Content-Type": "text/html" });
//       if (route) {
//
//         res.end(await route.html());
//       } else {
//         if (RouterBox.routes["/404"]) {
//           res.end(await RouterBox.routes["/404"].html());
//         } else {
//           console.error(
//             " ✘  Cradova err: route '" +
//               req.url +
//               "' does not exist and no '/404' route given!"
//           );
//         }
//       }
//       return;
//     }
//   } else {
//     if (option.path) {
//       // const [route, params] = checker(option.path);
//       // console.log(route, params);
//       return html;
//     } else {
//       console.log(
//         "\x1B[32m Cradova did not serve! - no port or path provided \x1B[39m"
//       );
//     }
//   }
// };
// Router.serve({ port: 3000 });

// ! building the server side middleware and basic sever
// with dir detection
