/**
 *
 * Cradova Ajax
 * ------------------
 * your new axios alternative
 * supports files upload
 * @param url string
 * @param {{method: string;data;header;callbacks;}} opts
 * @returns unknown
 */

export function Ajax(
  url: string | URL,
  opts: {
    method?: "GET" | "POST";
    data?: Record<string, unknown>;
    header?: { "content-type"?: string } & Record<string, string>;
    callbacks?: Record<string, (arg: Function) => void>;
  } = {}
): Promise<string> {
  // getting params
  const { method, data, header, callbacks } = opts;
  if (typeof url !== "string") {
    throw new Error("✘  Cradova err : Ajax invalid url " + url);
  }
  // promisified xhr function
  return new Promise<string>(function (resolve) {
    const ajax: XMLHttpRequest = new XMLHttpRequest();
    const formData = new FormData();
    // setting callbacks
    if (callbacks && typeof callbacks === "object") {
      for (const [k, v] of Object.entries(callbacks)) {
        ajax.addEventListener(k, v as unknown as EventListener);
      }
    }

    ajax.addEventListener("load", function () {
      resolve(ajax.response);
    });

    if (data && typeof data === "object") {
      for (const [k, v] of Object.entries(data)) {
        let value = v as Record<string, unknown> | string;
        if (typeof value === "object" && value && !value.name) {
          value = JSON.stringify(value);
          formData.set(k, value);
        }
        if (typeof value === "string") {
          formData.set(k, value);
        }
      }
    }

    ajax.addEventListener("error", () => {
      console.error(
        "✘  Cradova Ajax err : ",
        ajax.response || "ERR_INTERNET_DISCONNECTED"
      );
      if (!navigator.onLine) {
        resolve(
          JSON.stringify({
            message: `this device is offline!`,
          })
        );
      } else {
        resolve(
          JSON.stringify({
            message: `problem with the action, please try again!`,
          })
        );
      }
    });
    if (!method) {
      ajax.open(data && typeof data === "object" ? "POST" : "GET", url, true);
    } else {
      ajax.open(method, url, true);
    }
    // setting header
    if (header && typeof header === "object") {
      Object.keys(header).forEach(function (key) {
        ajax.setRequestHeader(key, header[key]);
      });
    }
    ajax.send(formData);
  });
}
