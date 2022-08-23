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
export  async function littleAxios(
  url: string | URL,
  callback: (arg0: XMLHttpRequestEventTarget | null) => void,
  data?: any,
  header?: any,
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
    console.log(res.target);
    
    callback(res.target);
  });
  if (data) {
    for (const key  in data) {
      const value = data[key]
      formData.append(key, value);
    }
  }
  ajax.addEventListener("error", (e: any) => {
    return callback(e);
  });
  ajax.open(method, url, true);
  ajax.send(formData);
}


/**
 * An fetch based fetcher
 * ----------------------
 *
 * @param url string
 * @param method string
 * @param headers object
 * @param data object
 * @returns any
 */

export  async function fetcher(
  url: RequestInfo,
  method = "GET",
  headers: any,
  data: any
) {
  return await fetch(url, {
    headers,
    method,
    body: JSON.stringify(data),
  }).catch((_err) => {
    return {
      async text() {
        return {
          message: JSON.stringify(`${method} ${url} net::ERR_FAILED`),
        };
      },
    };
  });
}
