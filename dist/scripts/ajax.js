var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export function littleAxios(url, callback, data, header) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!callback && typeof header === "function") {
            callback = header;
        }
        if (typeof url !== "string") {
            throw new Error("Cradova err : little Axios invalid url " + url);
        }
        const ajax = new XMLHttpRequest();
        let formData = new FormData();
        const method = data && typeof data !== "object" ? "GET" : "POST";
        ajax.addEventListener("load", function (res) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(res.target);
                callback(res.target);
            });
        });
        if (data) {
            for (const key in data) {
                const value = data[key];
                formData.append(key, value);
            }
        }
        ajax.addEventListener("error", (e) => {
            return callback(e);
        });
        ajax.open(method, url, true);
        ajax.send(formData);
    });
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
export function fetcher(url, method = "GET", headers, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(url, {
            headers,
            method,
            body: JSON.stringify(data),
        }).catch((_err) => {
            return {
                text() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            message: JSON.stringify(`${method} ${url} net::ERR_FAILED`),
                        };
                    });
                },
            };
        });
    });
}
