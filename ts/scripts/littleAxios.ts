/**
 *
 *  little Axios request handler
 *  ----------------------
 *  supports files upload
 * ----------------------
 * @param {string} url
 * @param {object?} data?
 * @param {(object | function) ?} header or callback?
 * @param {function?} callback only?
 * @return void
 */
export default async function littleAxios(
  url: string | URL,
  data: { [s: string]: string | Blob },
  header: any,
  callback: (arg0: XMLHttpRequestEventTarget | null) => void
) {
  if (!callback && typeof header === "function") {
    callback = header;
  }
  if (typeof url !== "string") {
    throw new Error("Cradova err : little Axios invalid url " + url);
  }
  const ajax = new XMLHttpRequest();
  let formData = new FormData();
  const method = data && typeof data !== "object" ? "GET" : "POST";

  ajax.addEventListener("load", async function (res) {
    callback(res.target);
  });
  for (const [k, v] of Object.entries(data)) {
    formData.append(k, v);
  }
  ajax.addEventListener("error", (e: any) => {
    return callback(e);
  });
  ajax.open(method, url, true);
  ajax.send(formData);
}
