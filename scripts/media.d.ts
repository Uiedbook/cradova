/**
Write CSS media in javascript

@example

_.media("min-width: 790px",
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
export default function media(value: string, ...properties: any[]): void;
