/**
 * @param {number} num
 * @returns uuid
 */
export declare function uuid(num?: number): string;
export declare function PromptBeforeLeave(): void;
/**
Write CSS media in javascript

@example

media("min-width: 790px",
["#container",
{
    width: "100%",
    height: "100%",
    "background-color": "#0000"
}],

["#header",
{
    width: "100%",
    height: "20%",
    "background-color": "#fff"
}]
)
*/
export declare function media(value: string, ...properties: any[]): void;
/**
Write CSS styles in Javascript
@example

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

css(".btn:hover",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})

*/
export declare function css(indentifier: string, properties: Record<string, string>): void;
/**
Write animation value in javascript

@example

animate("popanimation",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    "background-color": "#0000"
}],

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    "background-color": "#ff9800"
}]
)

*/
export declare function animate(indentifier: string, ...properties: any[]): void;
/**
 *
 * @param {expession} condition
 * @param {function} callback
 */
export declare function assert(condition: any, callback: (arg: boolean) => any): any;
export declare const ls: Record<string, Function>;
export declare class list {
    #private;
    constructor(component: (data: Record<string, any>) => any);
    build(datas: any[]): any;
    update(datas: any[]): void;
}
