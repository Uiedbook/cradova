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
export default function fetcher(url: RequestInfo, method: string | undefined, headers: any, data: any): Promise<Response | {
    text(): Promise<{
        message: string;
    }>;
}>;
