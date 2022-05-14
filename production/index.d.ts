declare module "scripts/css" {
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
    export default function css(indentifier: string, properties: Record<string, string>): void;
}
declare module "scripts/widget" {
    const w: (...childrens: any[]) => () => DocumentFragment;
    export default w;
}
declare module "scripts/init" {
    const Init: (config: any) => HTMLDivElement;
    export default Init;
}
declare module "scripts/swipe" {
    export default function swipe(item: any): void;
}
declare module "scripts/media" {
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
}
declare module "scripts/store" {
    class store {
        #private;
        constructor(initial: unknown);
        get(): unknown;
        set(value: unknown): void;
        forward(): void;
        backward(): void;
    }
    const Store: (initial: any) => store;
    export default Store;
}
declare module "scripts/Router" {
    /**
     * Facilitates navigation within the application and initializes
     * page views based on the matched routes.
     */
    const Router: Record<string, any>;
    export default Router;
}
declare module "scripts/Screen" {
    class Screen {
        html: HTMLElement | Function;
        name: string;
        template: HTMLDivElement;
        callBacks: Function[];
        treeCreated: boolean;
        constructor(name: string, template: Function | HTMLElement);
        package(): Promise<void>;
        onActivate(cb: any): void;
        addChild(...addOns: any[]): void;
        detach(): void;
        Activate(): Promise<void>;
    }
    export default Screen;
}
declare module "scripts/JsonDB" {
    /**
     *     JSON DB DataBase MIT Licence © 2022
     *     ************************************
     *     Created by Friday Candour @uiedbooker
     *     email > fridaymaxtour@gmail.com
     *     github > www.github.com/FridayCandour
     *      telegram > @uiedbooker
     *   JSONDB  @version 1.0.0
     *  */
    export const JSONDBversion = "1.0.0";
    class JSONDBTableWrapper {
        constructor(self: any, keys: any);
        /**
       * Save with relations
       * ---------------------
       * @type     .saveWithRelations(target table, schema, schema | schema[]) => Promise(object)
       * @example
        * // single relation
      await PollTable.saveWithRelations(MessageTable, Poll, message);
      // arrays of relations
      await PollTable.saveWithRelations(MessageTable, Poll, allMessages);
      */
        saveWithRelations(table: any, incoming: any, relations: any): Promise<any>;
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .save(schema)=> Promise(object)
       * @example
       await PollTable.save(poll)
      */
        save(incoming: any): Promise<any>;
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .remove(schema)=> Promise(object)
       * @example
       await PollTable.remove(poll)
      */
        remove(entity: any): Promise<boolean>;
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .count(schema)=> Promise(number)
       * @example
       await PollTable.count(poll)
      */
        count(): Promise<any>;
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .getAll()=> Promise(object[])
       * @example
       await PollTable.getAll()
      */
        getAll(): Promise<any>;
        /**
       * get entities with any of the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getWhereAny({prop: value}, number | undefind)=> Promise(object)
       * @example
       await PollTable.getWhereAny({name: "friday", age: 121, class: "senior"}) // gets all
       await PollTable.getWhereAny({email: "fridaymaxtour@gmail.com"}, 2) // gets 2 if they are up to two
      */
        getWhereAny(props: any, number: any): Promise<any[]>;
        /**
       * get entities with the given prop of type "string" where the values specifiled is included
       * -----------------------------
       * @type .getWhereAnyPropsIncludes({prop: value}, number | undefind)=> Promise(object)
       *
       * @example prop must be type string!
       *
       await PollTable.getWhereAnyPropsIncludes({name: "fri"}) // gets all
       await PollTable.getWhereAnyPropsIncludes({name: "fri"}, 2) // gets 2 if they are up to two
      */
        getWhereAnyPropsIncludes(props: any, number: any): Promise<any[]>;
        /**
       * get an entity with the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getOne({prop: value})=> Promise(object)
       * @example
        
        await PollTable.getOne({email: "fridaymaxtour@gamail.com"}) // gets one
      
        */
        getOne(props: any): Promise<any>;
    }
    /**
     * Create a new JSONDB object
     *------------------------
     *  @class
    
     * const database = new JSONDB()
     *
     * Creates a new JSONDB object
     *
     * .
     * */
    class JSONDB {
        constructor();
        getDB(name: any): Promise<unknown>;
        /**
       * Schema constructor for Jsondb
       * -----------------------------
       *
       * name @type string
       *
       * columns @type object  {
       *
       * type >  @type any of  number > string > boolean > blob and must be specified
       *
       * nullable @type bolean true > false default false
       *
       * unique  @type bolean   true > false default false
       *
       * }
       *
       * relations @type object {
       *
       * target: entity schema @type object,
       *
       *  attachment_name: @type string,
       *
       * type : @type string should be "many" or "one"
       *
       *  }
       *
       *
       *
       * @example
       *
       * const MessageSchema = database.schema({
        name: "Message",
        columns: {
          vote: {
            type: "number",
          },
          time: {
            type: "string",
            nullable: true,
          },
          value: {
            type: "string",
          },
        },
      });
       *
       * const PollSchema = new JSONDB.schema({
        name: "Poll",
        columns: {
          value: {
            type: "varchar",
          },
        },
        relations: {
          Message: {
            target: Message,
            type: "many-to-one",
          },
        },
      });
       */
        schema(schema_configuration_object: any): {};
        /**
         * Create a new JSONDB instance
         *------------------------
         *  @example
         * // creates a JSONDB object
         * const Database = new JSONDB()
         * // database configuration object
         * const config = {
         DB_NAME: "my db",
        password: "password",
        username: "jsondb_username",
       encrypted: false,
          }
       // Creates a new JSONDB instance
         * Database.init(config)
         * */
        init(config: any): void;
        /**
       * Create secure connection a Jsondb instance
       * -----------------------------
       * @example
       *
       * const details = {
        password: "password",
        username: "jsondb_username",
      };
      const connection = await database.createJSONDBConnection(details);
      */
        createJSONDBConnection(details: any): Promise<{
            /**
             * Get a table from JSONDB
             *------------------------
             * @example
             *
             *
          const details = {
            password: "password",
            username: "jsondb_username",
          };
          // getting connection instance into JSONDB
          const connection = await database.createJSONDBConnection(details);
          // getting a table
          const MessageTable = connection.getTable("Message");
             * */
            getTable(table_name: any): JSONDBTableWrapper | undefined;
        }>;
        validateRelations(relations: any): void;
        validateColumns(columns: any): void;
        /**
       * Assemble Entities into Jsondb
       * -----------------------------
       * @example
       *
       * const MessageSchema = database.schema({
        name: "Message",
        columns: {
          vote: {
            type: "number",
          },
          time: {
            type: "string",
            nullable: true,
          },
          value: {
            type: "string",
          },
        },
      });
      
      database.assemble([MessageSchema]);
      *
      */
        assemble(allEntities: any): void;
    }
    /**
     * @exports
     */
    export default JSONDB;
}
declare module "scripts/speaker" {
    const Speaker: Record<string, Function>;
    export default Speaker;
}
declare module "scripts/animate" {
    /**
    Write animation value in javascript
    
    @example
    
    _.animate("popanimation",
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
    export default function animate(indentifier: string, ...properties: any[]): void;
}
declare module "scripts/file-system" {
    const fs: {};
    export default fs;
}
declare module "scripts/localStorage" {
    const ls: Record<string, Function>;
    export default ls;
}
declare module "scripts/fullscreen" {
    export default function fullScreen(e: Element): {
        set(): void;
        exist(): void;
    };
}
declare module "scripts/dispatcher" {
    export default function dispatch(stateID: string | Record<string, Function | Record<string, string>>, state: Record<string, any>): void;
}
declare module "scripts/Metrics" {
    const metrics: {
        base: string;
        font: string;
        radius: string;
        padding: string;
        large: string;
        big: string;
        small: string;
        s5: string;
        s8: string;
        s10: string;
        s16: string;
        s20: string;
        s30: string;
        s40: string;
        s50: string;
        s60: string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        body1: string;
        body2: string;
        body3: string;
        body4: string;
        body5: string;
        body6: string;
        borderWidth: string;
        horizontalLineHeight: string;
        screenWidth: string;
        screenHeight: string;
        drawerWidth: string;
        navBarHeight: string;
        buttonRadius: string;
        icons: {
            tiny: string;
            small: string;
            medium: string;
            large: string;
            xl: string;
        };
        images: {
            small: string;
            medium: string;
            large: string;
            logo: string;
        };
    };
    export default metrics;
}
declare module "scripts/promptbeforeleave" {
    export default function PromptBeforeLeave(): void;
}
declare module "types" {
    export type CradovaElemetType = HTMLElement & Record<string, any> & {
        style: Record<string, unknown>;
        stateID: string;
    };
}
declare module "scripts/uuid" {
    export default function uuid(len?: number): string;
}
declare module "scripts/createState" {
    import { CradovaElemetType } from "types";
    export default function createState(element: CradovaElemetType | ((element: any) => CradovaElemetType) | string): any[];
}
declare module "scripts/fetcher" {
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
}
declare module "scripts/littleAxios" {
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
}
declare module "index" {
    /**
     * Creates new HTML element
     *  @example
     * format for static  _`p| am a p tag`  // or _`p.class| am a p tag` or _`p#id| am a p tag` or _`p.class#id| am a p tag`
     * format for dynamic _(
     *  "p| am a p tag" // or "p.class| am a p tag" or "p#id| am a p tag" or "p.class#id| am a p tag"
     * , {
     * //props like
     * text: "am a p tag",
     * style: {
     * color: "blue"
     * }
     * },
     * // place other children here like span
     * _`span| am a span tag like so`, // this is a static child
     * _("span| am a span tag like so", {style: {color: "brown"}}) // this is a dynamic child
     * )
     * @param  {...any} element_initials
     * @returns function | HTMLElement
     *
     * // static elements cannot be given props nor children nor state but dynamic can
     *
     * // and static are useful too
     */
    const _: any | Record<string, any>;
    export default _;
}
declare var CACHE_VERSION: number;
declare var CURRENT_CACHES: {
    prefetch: string;
};
declare const store = "sample_store";
declare const assets: string[];
declare module "scripts/reuse" {
    export default function reuse(element: {
        [x: string]: any;
        style: {
            [x: string]: unknown;
        };
        innerText: any;
        classList: {
            add: (arg0: string) => void;
        };
        append: (arg0: any) => void;
        stateID: any;
    }): (...incoming: string[] | any[]) => {
        [x: string]: any;
        style: {
            [x: string]: unknown;
        };
        innerText: any;
        classList: {
            add: (arg0: string) => void;
        };
        append: (arg0: any) => void;
        stateID: any;
    };
}
