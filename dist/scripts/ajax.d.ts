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
export declare function Ajax(url: string | URL, opts?: {
    method?: string;
    data?: Record<string, any>;
    header?: Record<string, any>;
    callbacks?: Record<string, (arg: any) => void>;
} | any): Promise<unknown>;
