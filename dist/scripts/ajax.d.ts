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
export declare function littleAxios(url: string | URL, callback: (arg0: XMLHttpRequestEventTarget | null) => void, data?: any, header?: any): Promise<void>;
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
export declare function fetcher(url: RequestInfo, method: string | undefined, headers: any, data: any): Promise<Response | {
    text(): Promise<{
        message: string;
    }>;
}>;
