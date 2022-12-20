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
export function Ajax(url, opts = {}) {
    // getting params
    let { method, data, header, callbacks } = opts;
    if (typeof url !== "string") {
        throw new Error("Cradova err : little Axios invalid url " + url);
    }
    // setting method
    if (!method) {
        method = data && typeof data === "object" ? "POST" : "GET";
    }
    // promisified xhr function
    return new Promise(function (resolve) {
        const ajax = new XMLHttpRequest();
        let formData = new FormData();
        // setting methods
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
                let value = v;
                if (typeof value === "object" && value && !value.name) {
                    value = JSON.stringify(value);
                }
                formData.set(k, value);
            }
        }
        ajax.addEventListener("error", (e) => {
            console.log("Ajax error   +", e);
            if (!navigator.onLine) {
                resolve(JSON.stringify({
                    message: `you are offline!`,
                }));
            }
            else {
                resolve(JSON.stringify({
                    message: `something went wrong please try again!`,
                }));
            }
        });
        ajax.open(method, url, true);
        // setting header
        if (header && typeof header === "object") {
            Object.keys(header).forEach(function (key) {
                ajax.setRequestHeader(key, header[key]);
            });
        }
        ajax.send(formData);
    });
}
