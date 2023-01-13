/**
 *
 * Cradova Ajax
 * ------------------
 * your new axios alternative
 * supports files upload
 * @param url string
 * @param {{method: string;data;header;callbacks;}} opts
 * @returns any
 */

export function Ajax(
  url: string | URL,
  opts:
    | {
        method?: string;
        data?: Record<string, any>;
        header?: Record<string, any>;
        callbacks?: Record<string, (arg: any) => void>;
      }
    | any = {}
) {
  // getting params
  const { method, data, header, callbacks } = opts;
  if (typeof url !== "string") {
    throw new Error("✘  Cradova err : little Axios invalid url " + url);
  }
  // promisified xhr function
  return new Promise(function (resolve) {
    const ajax: any = new XMLHttpRequest();
    const formData = new FormData();
    // setting callbacks
    if (callbacks && typeof callbacks === "object") {
      for (const [k, v] of Object.entries(callbacks)) {
        if (typeof v === "function" && ajax[k]) {
          ajax[k] = v;
        }
      }
    }

    ajax.addEventListener("load", function () {
      resolve(ajax.response);
    });

    if (data && typeof data === "object") {
      for (const [k, v] of Object.entries(data)) {
        let value = v as any;
        if (typeof value === "object" && value && !value.name) {
          value = JSON.stringify(value);
        }
        formData.set(k, value);
      }
    }

    ajax.addEventListener("error", (e: any) => {
      console.error("✘  Cradova Ajax err : ", e);
      if (!navigator.onLine) {
        resolve(
          JSON.stringify({
            message: `the device is offline!`,
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
