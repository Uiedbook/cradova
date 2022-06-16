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
export default function littleAxios(url: string | URL, data: {
    [s: string]: string | Blob;
}, header: any, callback: (arg0: XMLHttpRequestEventTarget | null) => void): Promise<void>;
