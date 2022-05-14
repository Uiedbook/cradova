// @ts-nocheck
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
define("scripts/css", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function css(indentifier, properties) {
        /*This is for creating
       css styles using javascipt*/
        const styS = "" + indentifier + "" + "{";
        const styE = "}";
        let style = "", totalStyle = "";
        for (const [k, v] of Object.entries(properties)) {
            style += "" + k + ": " + v + ";";
        }
        let styleTag = document.querySelector("style");
        if (styleTag !== null) {
            totalStyle += styleTag.innerHTML;
            totalStyle += styS + style + styE;
            styleTag.innerHTML = totalStyle;
            return;
        }
        styleTag = document.createElement("style");
        totalStyle += styleTag.innerHTML;
        totalStyle += styS + style + styE;
        styleTag.innerHTML = totalStyle;
        document.head.append(styleTag);
    }
    exports.default = css;
});
define("scripts/widget", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const w = function (...childrens) {
        let props;
        if (typeof childrens[0] === "object" &&
            !(childrens[0] instanceof HTMLElement)) {
            props = childrens[0];
            childrens = childrens.slice(1, childrens.length);
        }
        const par = document.createDocumentFragment();
        childrens.forEach((ch) => {
            if (typeof ch === "function") {
                par.append(ch(props));
            }
            else {
                par.append(ch);
            }
        });
        return () => par;
    };
    exports.default = w;
});
define("scripts/init", ["require", "exports", "scripts/css"], function (require, exports, css_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    css_js_1 = __importDefault(css_js_1);
    const Init = function (config) {
        const Wrapper = document.createElement("div");
        Wrapper.className = "Cradova-app-wrappper";
        Wrapper.id = "app-wrapper";
        (0, css_js_1.default)(".Cradova-app-wrappper", {
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "flex-direction": "column",
            width: "100%",
        });
        Wrapper.stateID = "Cradova-app-wrappper-id";
        document.body.append(Wrapper);
        return Wrapper;
    };
    exports.default = Init;
});
define("scripts/swipe", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function swipe(item) {
        let caller;
        let startX = 0, startY = 0;
        if (typeof item === "object") {
            caller = item;
        }
        else {
            throw new Error("no call given for the swipe handler");
        }
        function handleTouchStart(e) {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }
        function handleTouchEnd(e) {
            const diffX = e.changedTouches[0].screenX - startX;
            const diffY = e.changedTouches[0].screenY - startY;
            const ratioX = Math.abs(diffX / diffY);
            const ratioY = Math.abs(diffY / diffX);
            const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);
            if (absDiff < 10) {
                if (caller.touch) {
                    callback.touch(caller.touch);
                }
            }
            if (ratioX > ratioY) {
                // left and right
                if (diffX >= 0) {
                    if (caller.right) {
                        callback.right(caller.right);
                    }
                }
                else {
                    if (caller.left) {
                        callback.left(caller.left);
                    }
                }
                // up and down
            }
            else {
                if (diffY >= 0) {
                    if (caller.down) {
                        callback.down(caller.down);
                    }
                }
                else {
                    if (caller.up) {
                        callback.up(caller.up);
                    }
                }
            }
        }
        document.body.addEventListener("touchstart", handleTouchStart);
        document.body.addEventListener("touchend", handleTouchEnd);
        const callback = {
            touch(callback) {
                return callback();
            },
            right(callback) {
                return callback();
            },
            left(callback) {
                return callback();
            },
            down(callback) {
                return callback();
            },
            up(callback) {
                return callback();
            },
        };
    }
    exports.default = swipe;
});
/*
 *** HOW TO USE ***

    function touch(){
     console.log("touching")
    }
    
    

    function up(){
     console.log("swipe up")
    }
    

    function down(){
     console.log("swipe down")
    }
    

    function right(){
     console.log("swipe right")
    }


    function left(){
     console.log("swipe left")
    }



    let obj = {down: down,
               touch: touch,
               up: up,
               right: right,
               left: left
           }

    swipe(obj)



 */
define("scripts/media", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    function media(value, ...properties) {
        /* This is for creating css
       @media styles using javascipt*/
        const styS = "@media only screen and (" + value + ") " + "{", styE = "}";
        let style = "  ", aniSty = " ";
        const proplen = properties.length;
        let totalAnimation, Animation = "  ";
        const animationStep = (num) => {
            for (const [k, v] of Object.entries(properties[num][1])) {
                style += "" + k + ": " + v + ";";
            }
            aniSty += "" + properties[num][0] + "{" + style + "}";
            return aniSty;
        };
        for (let i = 0; i < proplen; i++) {
            Animation += animationStep(i);
        }
        let aniStyleTag = document.querySelector("style");
        if (aniStyleTag === null) {
            aniStyleTag = document.createElement("style");
        }
        aniStyleTag.media = "screen";
        totalAnimation = aniStyleTag.innerHTML;
        totalAnimation += styS + Animation + styE;
        aniStyleTag.innerHTML = totalAnimation;
        document.head.append(aniStyleTag);
    }
    exports.default = media;
});
define("scripts/store", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class store {
        #index = 0;
        #history = [];
        #value = null;
        constructor(initial) {
            this.#value = initial;
            this.#history.push(initial);
        }
        get() {
            return this.#value;
        }
        set(value) {
            this.#value = value;
            this.#history.push(value);
            this.#index += 1;
        }
        forward() {
            if (this.#history.length > this.#index + 1) {
                this.#value = this.#history[this.#index + 1];
            }
        }
        backward() {
            if (this.#history.length > 0 && this.#index > 0) {
                this.#value = this.#history[this.#index - 1];
                this.#index -= 1;
            }
        }
    }
    const Store = function (initial) {
        return new store(initial);
    };
    // const value = Store("hello world people");
    // console.log(value.get());
    //
    // value.set("hi yall people");
    // console.log(value.status());
    //
    // value.backward();
    // console.log(value.get());
    //
    // value.forward();
    // console.log(value.get());
    exports.default = Store;
});
/**
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */
define("scripts/Router", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Router = {};
    Router["routes"] = {};
    /**
     * Registers a route.
     *
     * @param {string}   path     Route path.
     * @param {Function} controller the cradova document tree for the route.
     */
    Router.route = function (path = "/", controller) {
        const link = document.createElement("a");
        link.href = window.location.href.replace(/#(.*)$/, "") + path.split("/")[1];
        Router.routes[path] = {
            controller: controller,
        };
        return link;
    };
    Router.navigate = async function (href) {
        let route = null, link = null;
        if (href.includes(".")) {
            //FIXME: add a try catch here some usage errors poped up
            if (new URL(href).pathname === window.location.pathname) {
                return;
            }
            route = Router.routes[new URL(href).pathname];
            link = new URL(href).pathname;
        }
        else {
            if (href === window.location.pathname) {
                return;
            }
            route = Router.routes[href];
            link = href;
        }
        window.history.pushState({}, "", link);
        return;
    };
    Router.router = function (e) {
        if (e.target.tagName === "INPUT") {
            return;
        }
        //
        let Alink;
        if (e.target.tagName === "A") {
            Alink = e.target;
            if (Alink && Alink.href.includes("#")) {
                return;
            }
        }
        if (e.target.parentElement && e.target.parentElement.tagName === "A") {
            Alink = e.target.parentElement;
        }
        if (Alink && Alink.href.includes("#")) {
            return;
        }
        if (Alink && Alink.href.includes("javascript")) {
            return;
        }
        e.preventDefault();
        if (Alink) {
            if (Alink.href === "" ||
                new URL(Alink.href).pathname === window.location.pathname) {
                return;
            }
            const route = Router.routes[new URL(Alink.href).pathname];
            if (route) {
                route.controller(e);
            }
            else {
                throw new Error("cradova err route doesn't exist  " + Alink.href);
            }
            window.history.pushState({}, "", new URL(Alink.href).pathname);
            window.scrollTo(0, 0);
            return;
        }
        const url = window.location.pathname;
        const route = Router.routes[url];
        if (route) {
            route.controller(e);
            window.scrollTo(0, 0);
        }
    };
    /**
     * Responds to click events anywhere in the document and when
     * the click happens on a link that is supposed to be handled
     * by the router, loads and displays the target page.
     *
     * @param {Event} e Click event.
     */
    document.addEventListener("click", Router.router);
    window.addEventListener("load", Router.router);
    window.addEventListener("popstate", (e) => {
        e.preventDefault();
        Router.router(e);
    });
    exports.default = Router;
});
define("scripts/Screen", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Screen {
        html;
        name;
        template;
        callBacks;
        treeCreated;
        constructor(name, template) {
            this.html = template;
            this.name = name;
            this.template = document.createElement("div");
            this.template.style.width = "100%";
            this.template.style.display = "flex";
            this.template.style.flexDirection = "column";
            this.template.id = "cradova-screen-set";
            this.callBacks = [];
            this.treeCreated = false;
        }
        async package() {
            if (typeof this.html === "function") {
                let fuc = await this.html();
                if (typeof fuc === "function") {
                    this.template.append(fuc());
                }
                else {
                    this.template.append(fuc);
                }
            }
            else {
                if (this.html instanceof HTMLElement) {
                    this.template.append(this.html);
                }
            }
            if (!(this.template.firstChild instanceof HTMLElement)) {
                throw new Error("Cradova err only parent with descendants is valid ");
            }
            this.treeCreated = true;
        }
        onActivate(cb) {
            this.callBacks.push(cb);
        }
        addChild(...addOns) {
            for (let i = 0; i < addOns.length; i++) {
                if (addOns[i] && addOns[i] instanceof HTMLElement) {
                    this.template.append(addOns[i]);
                }
                if (typeof addOns[i] === "function") {
                    this.template.append(addOns[i]());
                }
            }
        }
        detach() {
            const screen = document.querySelector("#cradova-screen-set");
            if (screen) {
                document.querySelector("#app-wrapper").removeChild(screen);
            }
        }
        async Activate() {
            if (document.title === this.name) {
                return;
            }
            if (!this.treeCreated) {
                await this.package();
            }
            document.title = this.name;
            this.detach();
            document.querySelector("#app-wrapper").append(this.template);
            if (document.querySelector("#app-wrapper").childElementCount > 1) {
                //   this.detach();
            }
            //    console.log(document.querySelector("#app-wrapper").childElementCount);
            this.callBacks.forEach((cb) => cb(this.template.firstChild));
        }
    }
    exports.default = Screen;
});
/**
 *     JSON DB DataBase MIT Licence © 2022
 *     ************************************
 *     Created by Friday Candour @uiedbooker
 *     email > fridaymaxtour@gmail.com
 *     github > www.github.com/FridayCandour
 *      telegram > @uiedbooker
 *   JSONDB  @version 1.0.0
 *  */
define("scripts/JsonDB", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONDBversion = void 0;
    exports.JSONDBversion = "1.0.0";
    let fs, fileURLToPath, isNode = false, _dirname;
    if (!globalThis.localStorage) {
        isNode = true;
        fs = await new Promise((resolve_1, reject_1) => { require(["fs"], resolve_1, reject_1); }).then(__importStar);
        const dr = await new Promise((resolve_2, reject_2) => { require(["path"], resolve_2, reject_2); }).then(__importStar);
        const fp = await new Promise((resolve_3, reject_3) => { require(["url"], resolve_3, reject_3); }).then(__importStar);
        fileURLToPath = fp.fileURLToPath;
        _dirname = dr
            .dirname(fileURLToPath(import.meta.url))
            .split("node_modules")[0];
    }
    const schema = class {
        constructor(schema_configuration_object, validators) {
            // validations
            if (!schema_configuration_object.columns) {
                throw new Error("JSONDB: can't create an empty table should have some columns");
            }
            validators.validateColumns(schema_configuration_object.columns);
            const isEmptyObject = function (obj) {
                // for checking for empty objects
                for (const name in obj) {
                    return false;
                }
                return true;
            };
            if (schema_configuration_object.relations &&
                !isEmptyObject(schema_configuration_object.relations)) {
                validators.validateRelations(schema_configuration_object.relations);
            }
            // assignment
            this.base_name = "";
            this.name = schema_configuration_object.name;
            this.last_index = -1;
            this.columns = schema_configuration_object.columns;
            this.relations = schema_configuration_object.relations || null;
        }
    };
    class JSONDBTableWrapper {
        constructor(self, keys) {
            this.put = async (name, value) => {
                function cb(err) {
                    if (err) {
                        throw new Error("JSONDB: error failed to update entities in database because " + err);
                    }
                }
                if (isNode) {
                    fs.writeFile(name + ".json", JSON.stringify(value), cb);
                }
                else {
                    localStorage.setItem(name, JSON.stringify(value));
                }
            };
            this.get = async (name) => {
                return new Promise(function (res, rej) {
                    try {
                        if (!isNode) {
                            res(JSON.parse(localStorage.getItem(name)));
                            return;
                        }
                        fs.readFile(_dirname + "/" + name + ".json", { encoding: "utf-8" }, function (err, data) {
                            if (err) {
                                return rej("JSONDB: error failed to retrieve entities from database because " +
                                    err);
                            }
                            try {
                                res(JSON.parse(data));
                            }
                            catch (error) {
                                try {
                                    res(JSON.parse(fs.readFileSync(name + ".json", "utf-8")));
                                }
                                catch (error) { }
                            }
                        });
                    }
                    catch (error) { }
                });
            };
            this.validator = (incoming, tables) => {
                // works for type, nulllable and unique validations.
                const outgoing = {};
                for (const prop in this.self.columns) {
                    if (this.self.columns[prop].nullable !== true &&
                        !Object.hasOwnProperty.call(incoming, prop)) {
                        throw new Error("JSONDB: error failed to validate incoming data because " +
                            prop +
                            " is required for " +
                            this.self.name +
                            " Schema");
                    }
                    if (!this.self.columns[prop].nullable &&
                        typeof incoming[prop] !== this.self.columns[prop].type) {
                        throw new Error("JSONDB: error failed to validate incoming data because " +
                            prop +
                            "'s value " +
                            incoming[prop] +
                            " has got a wrong data type of " +
                            typeof incoming[prop] +
                            " for " +
                            this.self.name +
                            " should be " +
                            this.self.columns[prop].type +
                            " type instead");
                    }
                    if (this.self.columns[prop].unique === true) {
                        for (let i = 0; i < tables.length; i++) {
                            const element = tables[i];
                            if (element[prop] === incoming[prop]) {
                                throw new Error("JSONDB: error failed to validate incoming data because " +
                                    prop +
                                    " is unique for " +
                                    this.self.name +
                                    " Schema can't have more than one instance");
                            }
                        }
                    }
                    // cleaning time
                    outgoing[prop] = incoming[prop];
                }
                return outgoing;
            };
            this.self = self;
            this.keys = keys;
        }
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
        async saveWithRelations(table, incoming, relations) {
            if (!relations) {
                return;
            }
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            if (incoming && typeof incoming.index !== "number") {
                throw new Error("JsonDB: save before saving with relations");
            }
            db.tables[this.self.name][incoming.index] = incoming;
            if (relations && Array.isArray(relations)) {
                for (let i = 0; i < relations.length; i++) {
                    if (db.Entities[this.self.name].relations[table.self.name]) {
                        if (db.Entities[this.self.name].relations[table.self.name].type ===
                            "many") {
                            db.tables[this.self.name][incoming.index].relations[table.self.name] = !db.tables[this.self.name][incoming.index].relations[table.self.name]
                                ? [relations[i]]
                                : [
                                    ...db.tables[this.self.name][incoming.index].relations[table.self.name],
                                    relations[i],
                                ];
                        }
                        else {
                            db.tables[this.self.name][incoming.index].relations[table.self.name] = relations[i];
                        }
                    }
                }
            }
            else {
                if (relations) {
                    if (db.Entities[this.self.name].relations[table.self.name]) {
                        if (db.Entities[this.self.name].relations[table.self.name].type ===
                            "many") {
                            db.tables[this.self.name][incoming.index].relations[table.self.name] = !db.tables[this.self.name][incoming.index].relations[table.self.name]
                                ? [relations]
                                : [
                                    ...db.tables[this.self.name][incoming.index].relations[table.self.name],
                                    relations,
                                ];
                        }
                        else {
                            db.tables[this.self.name][incoming.index].relations[table.self.name] = relations;
                        }
                    }
                }
            }
            await this.put(this.self.base_name, db);
            return db.tables[this.self.name][incoming.index];
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .save(schema)=> Promise(object)
       * @example
       await PollTable.save(poll)
      */
        async save(incoming) {
            // db.tables[this.self.name] = db.tables[this.self.name].sort(
            //   (a, b) => a.index - b.index
            // );
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            if (typeof incoming.index !== "number") {
                incoming = this.validator(incoming, db.tables[this.self.name]);
                if (this.self.relations && !incoming.relations) {
                    incoming.relations = {};
                }
                db.Entities[this.self.name].last_index += 1;
                incoming.index = db.Entities[this.self.name].last_index;
                db.tables[this.self.name].push(incoming);
            }
            else {
                db.tables[this.self.name][incoming.index] = incoming;
            }
            await this.put(this.self.base_name, db);
            return incoming;
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .remove(schema)=> Promise(object)
       * @example
       await PollTable.remove(poll)
      */
        async remove(entity) {
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            // db.tables[this.self.name].splice(entity.index, 1);
            db.tables[this.self.name][entity.index] = null;
            await this.put(this.self.base_name, db);
            return true;
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .count(schema)=> Promise(number)
       * @example
       await PollTable.count(poll)
      */
        async count() {
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            return db.tables[this.self.name].length;
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .getAll()=> Promise(object[])
       * @example
       await PollTable.getAll()
      */
        async getAll() {
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            return db.tables[this.self.name];
        }
        /**
       * get entities with any of the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getWhereAny({prop: value}, number | undefind)=> Promise(object)
       * @example
       await PollTable.getWhereAny({name: "friday", age: 121, class: "senior"}) // gets all
       await PollTable.getWhereAny({email: "fridaymaxtour@gmail.com"}, 2) // gets 2 if they are up to two
      */
        async getWhereAny(props, number) {
            const results = [];
            let all;
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            all = db.tables[this.self.name];
            for (let i = 0; i < all.length; i++) {
                const element = all[i];
                for (const [k, v] of Object.entries(props)) {
                    if (element[k] && element[k] === v) {
                        results.push(element);
                        if (typeof number === "number" && results.length === number) {
                            return results;
                        }
                    }
                }
            }
            return results;
        }
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
        async getWhereAnyPropsIncludes(props, number) {
            const results = [];
            let all;
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            all = db.tables[this.self.name];
            for (let i = 0; i < all.length; i++) {
                const element = all[i];
                for (const [k, v] of Object.entries(props)) {
                    if (element[k] && typeof v === "string" && element[k].includes(v)) {
                        results.push(element);
                        if (typeof number === "number" && results.length === number) {
                            return results;
                        }
                    }
                }
            }
            return results;
        }
        /**
       * get an entity with the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getOne({prop: value})=> Promise(object)
       * @example
        
        await PollTable.getOne({email: "fridaymaxtour@gamail.com"}) // gets one
      
        */
        async getOne(props) {
            let results = null;
            const db = await this.get(this.self.base_name);
            db.last_access_time = Date();
            all = db.tables[this.self.name];
            for (let i = 0; i < all.length; i++) {
                const element = all[i];
                for (const [k, v] of Object.entries(props)) {
                    if (element[k] && element[k] === v) {
                        results = element;
                        break;
                    }
                }
            }
            return results;
        }
    }
    const JSONDBConnection = class {
        constructor(Entities, keys) {
            this.Entities = Entities;
            this.keys = keys;
        }
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
        getTable(table_name) {
            for (const [tableName, table] of Object.entries(this.Entities)) {
                if (table_name === tableName) {
                    return new JSONDBTableWrapper(table, this.keys);
                }
            }
        }
    };
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
        constructor() {
            this.DB_NAME = "";
            this.username = "";
            this.encrypted = false;
            this.initialised = false;
            this.time_created = Date();
            this.version = exports.JSONDBversion;
            this.last_access_time = "";
            this.visuality = "";
            this.Entities = {};
            this.tables = {};
        }
        async getDB(name) {
            return new Promise(function (res, rej) {
                if (!isNode) {
                    res(JSON.parse(localStorage.getItem(name)));
                    return;
                }
                try {
                    fs.readFile(_dirname + "/" + name + ".json", { encoding: "utf-8" }, function (err, data) {
                        if (err) {
                            return rej(err);
                        }
                        try {
                            res(JSON.parse(data));
                        }
                        catch (error) {
                            try {
                                res(JSON.parse(fs.readFileSync(name + ".json", "utf-8")));
                            }
                            catch (error) { }
                        }
                    });
                }
                catch (error) { }
            });
        }
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
        schema(schema_configuration_object) {
            return new schema(schema_configuration_object, {
                validateColumns: this.validateColumns,
                validateRelations: this.validateRelations,
            });
        }
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
        init(config) {
            console.log(`\x1B[32m JSONDB version ${exports.JSONDBversion} \x1B[39m`);
            this.initialised = true;
            this.DB_NAME = config.name;
            this.password = config.password || "";
            this.username = config.username || "";
            this.encrypted = config.encrypted || false;
            this.time_created = Date();
            this.tables = {};
            try {
                let wasThere;
                if (isNode) {
                    wasThere = fs.readFileSync(config.name + ".json", "utf-8");
                }
                else {
                    wasThere = localStorage.getItem(config.name);
                }
                if (wasThere) {
                    return;
                }
            }
            catch (error) { }
            if (!config.password) {
                throw new Error("JSONDB: error password is empty ");
            }
            if (!config.username) {
                throw new Error("JSONDB: error username is empty ");
            }
            function cb(err) {
                if (err) {
                    throw new Error("JSONDB: error failed to create database because " + err);
                }
            }
            if (isNode) {
                fs.writeFile(config.name + ".json", JSON.stringify(this), cb);
            }
            else {
                let db = JSON.stringify(this);
                localStorage.setItem(config.name, db);
            }
        }
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
        async createJSONDBConnection(details) {
            if (!this.initialised) {
                throw new Error("JSONDB: you haven't create a JSONDB instance yet");
            }
            if (details.username !== this.username ||
                details.password !== this.password) {
                throw new Error("JSONDB: Access Denied");
            }
            const connection = await this.getDB(this.DB_NAME);
            connection.last_access_time = Date();
            return new JSONDBConnection(connection.Entities);
        }
        validateRelations(relations) {
            const types = ["many", "one"];
            for (const [relation, value] of Object.entries(relations)) {
                if (typeof value.target !== "object") {
                    throw new Error("JSONDB: wrong relationship target type given " +
                        value.target +
                        "  should be object only");
                }
                if (!types.includes(value.type)) {
                    throw new Error("JSONDB: wrong relationship type given " +
                        value.type +
                        "  should be many or one");
                }
                if (value.cascade && typeof value.cascade !== "boolean") {
                    throw new Error("JSONDB: wrong cascade value given " +
                        value.cascade +
                        " should be true or false");
                }
            }
        }
        validateColumns(columns) {
            const types = ["number", "string", "boolean", "blob"];
            for (const [column, value] of Object.entries(columns)) {
                if (column) {
                    if (!types.includes(value.type)) {
                        throw new Error("JSONDB: wrong data type given " +
                            value.type +
                            "  only number, string, boolean and blob are accepted");
                    }
                    if (value.unique && typeof value.unique !== "boolean") {
                        throw new Error("JSONDB: wrong unique value given " +
                            value.unique +
                            "  should be true or false");
                    }
                    if (value.nullable && typeof value.nullable !== "boolean") {
                        throw new Error("JSONDB: wrong nullable value given " +
                            value.nullable +
                            "  should be true or false");
                    }
                }
            }
        }
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
        assemble(allEntities) {
            if (!this.initialised) {
                throw new Error("JSONDB: you haven't create a JSONDB instance yet");
            }
            try {
                const wasThere = fs.readFileSync(this.DB_NAME + ".json", "utf-8");
                if (wasThere) {
                    return;
                }
            }
            catch (error) { }
            if (!Array.isArray(allEntities) || typeof allEntities[0] !== "object") {
                throw new Error("JSONDB: invalid entity array list, can't be assembled");
            }
            for (let i = 0; i < allEntities.length; i++) {
                this.Entities[allEntities[i].name] = allEntities[i];
                this.Entities[allEntities[i].name].base_name = this.DB_NAME;
                this.tables[allEntities[i].name] = [];
            }
            function cb(err) {
                if (err) {
                    throw new Error("JSONDB: error failed to assemble entities into database because " +
                        err);
                }
            }
            if (isNode) {
                fs.writeFile(this.DB_NAME + ".json", JSON.stringify(this), cb);
            }
            else {
                localStorage.setItem(this.DB_NAME, JSON.stringify(this));
            }
        }
    }
    /**
     * @exports
     */
    exports.default = JSONDB;
});
define("scripts/speaker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Speaker = {};
    Speaker.speak = function (text, language = "en", volume = 1, rate = 1, pitch = 1) {
        // common languages (not supported by all browsers)
        // en - english,  it - italian, fr - french,  de - german, es - spanish
        // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.volume = volume;
        utterance.rate = rate;
        utterance.pitch = pitch;
        speechSynthesis.speak(utterance);
    };
    Speaker.stop = () => {
        return speechSynthesis && speechSynthesis.cancel();
    };
    exports.default = Speaker;
});
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
define("scripts/animate", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function animate(indentifier, ...properties) {
        /*This is for creating css
       animations  using javascipt*/
        const styS = "@keyframes " + indentifier + " " + "{", styE = "}", proplen = properties.length;
        let style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
        const animationStep = (num) => {
            for (const [k, v] of Object.entries(properties[num][1])) {
                style += "" + k + ": " + v + ";";
            }
            aniSty += "" + properties[num][0] + "{" + style + "}";
            return aniSty;
        };
        for (let i = 0; i < proplen; i++) {
            Animation += animationStep(i);
        }
        let aniStyleTag = document.querySelector("style");
        if (aniStyleTag === null) {
            aniStyleTag = document.createElement("style");
        }
        aniStyleTag.media = "screen";
        totalAnimation = aniStyleTag.innerHTML;
        totalAnimation += styS + Animation + styE;
        aniStyleTag.innerHTML = totalAnimation;
        document.head.append(aniStyleTag);
    }
    exports.default = animate;
});
define("scripts/file-system", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fs = {};
    /**
     * Open a handle to an existing file on the local file system.
     *
     * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
     */
    fs.getFileHandle = async function (filePicker) {
        // For Chrome 86 and later...
        if ("showOpenFilePicker" in window) {
            return window.showOpenFilePicker().then((handles) => handles[0]);
        }
        // For Chrome 85 and earlier...
        if ("chooseFileSystemEntries" in window) {
            return window.chooseFileSystemEntries();
        }
        return this.getFileLegacy(filePicker);
    };
    /**
     * Create a handle to a new (text) file on the local file system.
     *
     * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
     */
    fs.getNewFileHandle = function () {
        // For Chrome 86 and later...
        if ("showSaveFilePicker" in window) {
            const opts = {
                types: [
                    {
                        description: "Text file",
                        accept: { "text/plain": [".txt"] },
                    },
                ],
            };
            return window.showSaveFilePicker(opts);
        }
        // For Chrome 85 and earlier...
        const opts = {
            type: "save-file",
            accepts: [
                {
                    description: "Text file",
                    extensions: ["txt"],
                    mimeTypes: ["text/plain"],
                },
            ],
        };
        return window.chooseFileSystemEntries(opts);
    };
    /**
     * Reads the raw text from a file.
     *
     * @param {File} file
     * @return {!Promise<string>} A promise that resolves to the parsed string.
     */
    fs.readFile = function (file) {
        // If the new .text() reader is available, use it.
        if (file.text) {
            return file.text();
        }
        // Otherwise use the traditional file reading technique.
        return fs.readFileLegacy(file);
    };
    /**
     * Reads the raw text from a file.
     *
     * @private
     * @param {File} file
     * @return {Promise<string>} A promise that resolves to the parsed string.
     */
    fs.readFileLegacy = function (file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("loadend", (e) => {
                const text = e.srcElement.result;
                resolve(text);
            });
            reader.readAsText(file);
        });
    };
    /**
     * Writes the contents to disk.
     *
     * @param {FileSystemFileHandle} fileHandle File handle to write to.
     * @param {string} contents Contents to write.
     */
    fs.writeFile = async function (fileHandle, contents) {
        // Support for Chrome 82 and earlier.
        if (fileHandle.createWriter) {
            // Create a writer (request permission if necessary).
            const writer = await fileHandle.createWriter();
            // Write the full length of the contents
            await writer.write(0, contents);
            // Close the file and write the contents to disk
            await writer.close();
            return;
        }
        // For Chrome 83 and later.
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    };
    /**
     * Verify the user has granted permission to read or write to the file, if
     * permission hasn't been granted, request permission.
     *
     * @param {FileSystemFileHandle} fileHandle File handle to check.
     * @param {boolean} withWrite True if write permission should be checked.
     * @return {boolean} True if the user has granted read/write permission.
     */
    fs.verifyPermission = async function (fileHandle, withWrite) {
        const opts = {};
        if (withWrite) {
            opts.writable = true;
            // For Chrome 86 and later...
            opts.mode = "readwrite";
        }
        // Check if we already have permission, if so, return true.
        if ((await fileHandle.queryPermission(opts)) === "granted") {
            return true;
        }
        // Request permission to the file, if the user grants permission, return true.
        if ((await fileHandle.requestPermission(opts)) === "granted") {
            return true;
        }
        // The user did nt grant permission, return false.
        return false;
    };
    /**
     * Uses the <input type="file"> to open a new file
     *
     * @return {!Promise<File>} File selected by the user.
     */
    fs.getFileLegacy = (filePicker) => {
        return new Promise((resolve, reject) => {
            filePicker.onchange = (e) => {
                const file = filePicker.files[0];
                if (file) {
                    resolve(file);
                    return;
                }
                reject(new Error("AbortError"));
            };
        });
    };
    /**
     * Saves a file by creating a downloadable instance, and clicking on the
     * download link.
     *
     * @param {string} filename Filename to save the file as.
     * @param {string} contents Contents of the file to save.
     */
    // function saveAsLegacy(filename, contents) {
    fs.saveAsLegacy = (filename, contents) => {
        filename = filename || "Untitled.txt";
        const opts = { type: "text/plain" };
        const file = new File([contents], "", opts);
        aDownloadFile.href = window.URL.createObjectURL(file);
        aDownloadFile.setAttribute("download", filename);
        aDownloadFile.click();
    };
    exports.default = fs;
});
define("scripts/localStorage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ls = {};
    ls.store = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };
    ls.retrieve = (name) => {
        return localStorage.getItem(name);
    };
    ls.remove = (name) => {
        localStorage.removeItem(name);
    };
    ls.getKey = (index) => {
        return window.localStorage.key(index);
    };
    ls.clear = () => {
        localStorage.clear();
    };
    exports.default = ls;
});
define("scripts/fullscreen", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // for making the dom elements fulscreen
    function fullScreen(e) {
        return {
            set() {
                e.requestFullscreen().catch((err) => {
                    throw err;
                });
            },
            exist() {
                document.exitFullscreen();
            },
        };
    }
    exports.default = fullScreen;
});
/*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()
*/
define("scripts/dispatcher", ["require", "exports", "scripts/fullscreen"], function (require, exports, fullscreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fullscreen_js_1 = __importDefault(fullscreen_js_1);
    function dispatch(stateID, state) {
        if (typeof stateID !== "string" ||
            typeof state !== "object" ||
            typeof state !== "string") {
            throw new TypeError("Invalid arguments type for state dispatcher  ");
        }
        const nodes = document.querySelectorAll(".cra_child_doc");
        if (typeof state === "undefined" && typeof stateID === "object") {
            for (const [id, eachState] of Object.entries(stateID)) {
                nodes.forEach((element) => {
                    // abort rendering if the state is not for this element
                    if (!element.stateID || element.stateID !== id) {
                        return;
                    }
                    if (typeof eachState === "object") {
                        // updating the element's eachState
                        for (const key in eachState) {
                            // updating element styling
                            if (key === "style") {
                                for (const [k, v] of Object.entries(eachState[key])) {
                                    element.style[k] = v;
                                }
                                continue;
                            }
                            // updating element's inner text
                            if (key === "text") {
                                element.innerText = eachState[key];
                                continue;
                            }
                            // setting element dimesion to full screen
                            if (key === "fullscreen") {
                                if (eachState[key]) {
                                    (0, fullscreen_js_1.default)(element).set();
                                }
                                else {
                                    (0, fullscreen_js_1.default)(element).exist();
                                }
                                continue;
                            }
                            // adding class name to element
                            if (key === "class") {
                                element.classList.add(eachState[key]);
                                continue;
                            }
                            // toggling element class
                            if (key === "toggleclass") {
                                element.classList.toggle(eachState[key]);
                                continue;
                            }
                            //removing element class
                            if (key === "removeclass") {
                                element.classList.remove(eachState[key]);
                                continue;
                            }
                            // changing the element children tree
                            if (key === "tree") {
                                if (typeof eachState[key] === "function") {
                                    eachState[key] = eachState[key]();
                                }
                                if (!eachState[key] instanceof HTMLElement) {
                                    console.error("wrong element type: can't create element eachState on " +
                                        eachState[key]);
                                    throw new TypeError("cradova err invalid element, should be a html element from cradova");
                                }
                                // destroy the component tree
                                element.innerHTML = "";
                                // rebuild the component tree
                                element.append(eachState[key]);
                                continue;
                            }
                            element[key] = eachState[key];
                        }
                    }
                });
            }
        }
        else {
            nodes.forEach((element) => {
                // abort rendering if the state is not for this element
                if (!element.stateID || element.stateID !== stateID) {
                    return;
                }
                if (typeof state === "object") {
                    // updating the element's state
                    for (const key in state) {
                        // updating element styling
                        if (key === "style") {
                            for (const [k, v] of Object.entries(state[key])) {
                                element.style[k] = v;
                            }
                            continue;
                        }
                        // updating element's inner text
                        if (key === "text") {
                            element.innerText = state[key];
                            continue;
                        }
                        // setting element dimesion to full screen
                        if (key === "fullscreen") {
                            if (state[key]) {
                                (0, fullscreen_js_1.default)(element).set();
                            }
                            else {
                                (0, fullscreen_js_1.default)(element).exist();
                            }
                            continue;
                        }
                        // adding class name to element
                        if (key === "class") {
                            element.classList.add(state[key]);
                            continue;
                        }
                        // toggling element class
                        if (key === "toggleclass") {
                            element.classList.toggle(state[key]);
                            continue;
                        }
                        //removing element class
                        if (key === "removeclass") {
                            element.classList.remove(state[key]);
                            continue;
                        }
                        // changing the element children tree
                        if (key === "tree") {
                            if (typeof state[key] === "function") {
                                state[key] = state[key]();
                            }
                            if (!state[key] instanceof HTMLElement) {
                                console.error("wrong element type: can't create element state on " +
                                    state[key]);
                                throw new TypeError("cradova err invalid element, should be a html element from cradova");
                            }
                            // destroy the component tree
                            element.innerHTML = "";
                            // rebuild the component tree
                            element.append(state[key]);
                            continue;
                        }
                        element[key] = state[key];
                    }
                }
            });
        }
    }
    exports.default = dispatch;
});
define("scripts/Metrics", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { innerWidth, innerHeight } = window;
    const height = innerHeight;
    const width = innerWidth;
    const metrics = {
        // global sizes
        base: "8px",
        font: "14px",
        radius: "20px",
        padding: "24px",
        large: "40px",
        big: "32px",
        small: "24px",
        s5: "5px",
        s8: "8px",
        s10: "10px",
        s16: "16px",
        s20: "20px",
        s30: "30px",
        s40: "40px",
        s50: "50px",
        s60: "60px",
        // font sizes
        h1: "30px",
        h2: "24px",
        h3: "20px",
        h4: "16px",
        h5: "14px",
        h6: "13px",
        body1: "30px",
        body2: "22px",
        body3: "16px",
        body4: "14px",
        body5: "13px",
        body6: "12px",
        borderWidth: "0.4px",
        horizontalLineHeight: "1px",
        screenWidth: width < height ? width + "px" : height + "px",
        screenHeight: width < height ? height + "px" : width + "px",
        drawerWidth: (3 / 4) * width + "px",
        navBarHeight: "60px",
        buttonRadius: "4px",
        icons: {
            tiny: "15px",
            small: "20px",
            medium: "30px",
            large: "45px",
            xl: "50px",
        },
        images: {
            small: "20px",
            medium: "40px",
            large: "60px",
            logo: "200px",
        },
    };
    exports.default = metrics;
});
define("scripts/promptbeforeleave", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function PromptBeforeLeave() {
        window.addEventListener("beforeunload", (ev) => {
            const e = ev || window.event;
            if (e) {
                e.preventDefault();
                e.returnValue = "";
            }
            return "";
        });
    }
    exports.default = PromptBeforeLeave;
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("scripts/uuid", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function uuid(len = 10) {
        function dec2hex(dec) {
            return dec.toString(16).padStart(2, "0");
        }
        len = Math.round(len / 2);
        return Array.from(crypto.getRandomValues(new Uint8Array(len || 10)), dec2hex).join("");
    }
    exports.default = uuid;
});
define("scripts/createState", ["require", "exports", "index", "scripts/dispatcher", "scripts/uuid"], function (require, exports, index_js_1, dispatcher_js_1, uuid_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_js_1 = __importDefault(index_js_1);
    dispatcher_js_1 = __importDefault(dispatcher_js_1);
    uuid_js_1 = __importDefault(uuid_js_1);
    function createState(element) {
        let CradovaElement;
        const id = (0, uuid_js_1.default)();
        if (typeof element === "string") {
            CradovaElement = (0, index_js_1.default)(element, { stateID: id });
        }
        else if (typeof element === "function") {
            CradovaElement = element({ stateID: id });
        }
        else if (element instanceof HTMLElement) {
            element.stateID = id;
            CradovaElement = element;
        }
        else {
            throw new Error("cradova err invalid element type  " +
                element +
                "  should be  string, or cradova element type");
        }
        return [CradovaElement, dispatcher_js_1.default.bind(CradovaElement, id)];
    }
    exports.default = createState;
});
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
define("scripts/fetcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    async function fetcher(url, method = "GET", headers, data) {
        return await fetch(url, {
            headers,
            method,
            body: JSON.stringify(data),
        }).catch((err) => {
            return {
                async text() {
                    return {
                        message: JSON.stringify(`${method} ${url} net::ERR_FAILED`),
                    };
                },
            };
        });
    }
    exports.default = fetcher;
});
define("scripts/littleAxios", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    async function littleAxios(url, data, header, callback) {
        if (!callback && typeof header === "function") {
            callback = header;
        }
        if (typeof url !== "string") {
            throw new Error("Cradova err : little Axios invalid url " + url);
        }
        const ajax = new XMLHttpRequest();
        let formData = new FormData();
        const method = data && typeof data !== "object" ? "GET" : "POST";
        ajax.addEventListener("load", async function (res) {
            callback(res.target);
        });
        for (const [k, v] of Object.entries(data)) {
            formData.append(k, v);
        }
        ajax.addEventListener("error", (e) => {
            return callback(e);
        });
        ajax.open(method, url, true);
        ajax.send(formData);
    }
    exports.default = littleAxios;
});
/*
 *   Cradova FrameWork
 *     @version 1.0.0
        @licence Apache v2

 @project : Cradova Framework;
 @copyright-lincense :  Apache v2;
 email > fridaymaxtour@gmail.com

                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 *       Copyright 2022 Friday Candour. All Rights Reserved.
 *       Licensed under the Apache License, Version 2.0 (the "License");
 *       you may not use this file except in compliance with the License.
 *       You may obtain a copy of the License at
 *           http://www.apache.org/licenses/LICENSE-2.0
 *       Unless required by applicable law or agreed to in writing, software
 *       distributed under the License is distributed on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *       See the License for the specific language governing permissions and
 *       limitations under the License.
*/
define("index", ["require", "exports", "scripts/css", "scripts/widget", "scripts/init", "scripts/swipe", "scripts/media", "scripts/store", "scripts/Router", "scripts/Screen", "scripts/JsonDB", "scripts/speaker", "scripts/animate", "scripts/file-system", "scripts/localStorage", "scripts/dispatcher", "scripts/fullscreen", "scripts/Metrics", "scripts/promptbeforeleave", "scripts/createState", "scripts/fetcher", "scripts/littleAxios"], function (require, exports, css_js_2, widget_js_1, init_js_1, swipe_js_1, media_js_1, store_js_1, Router_js_1, Screen_js_1, JsonDB_js_1, speaker_js_1, animate_js_1, file_system_js_1, localStorage_js_1, dispatcher_js_2, fullscreen_js_2, Metrics_js_1, promptbeforeleave_js_1, createState_js_1, fetcher_js_1, littleAxios_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    css_js_2 = __importDefault(css_js_2);
    widget_js_1 = __importDefault(widget_js_1);
    init_js_1 = __importDefault(init_js_1);
    swipe_js_1 = __importDefault(swipe_js_1);
    media_js_1 = __importDefault(media_js_1);
    store_js_1 = __importDefault(store_js_1);
    Router_js_1 = __importDefault(Router_js_1);
    Screen_js_1 = __importDefault(Screen_js_1);
    JsonDB_js_1 = __importDefault(JsonDB_js_1);
    speaker_js_1 = __importDefault(speaker_js_1);
    animate_js_1 = __importDefault(animate_js_1);
    file_system_js_1 = __importDefault(file_system_js_1);
    localStorage_js_1 = __importDefault(localStorage_js_1);
    dispatcher_js_2 = __importDefault(dispatcher_js_2);
    fullscreen_js_2 = __importDefault(fullscreen_js_2);
    Metrics_js_1 = __importDefault(Metrics_js_1);
    promptbeforeleave_js_1 = __importDefault(promptbeforeleave_js_1);
    createState_js_1 = __importDefault(createState_js_1);
    fetcher_js_1 = __importDefault(fetcher_js_1);
    littleAxios_js_1 = __importDefault(littleAxios_js_1);
    ("use strict");
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
    const _ = (...element_initials) => {
        let properties, childrens = [];
        if (typeof element_initials[1] == "object" &&
            !(element_initials[1] instanceof HTMLElement)) {
            properties = element_initials[1];
            if (element_initials.length > 2) {
                childrens = element_initials.slice(2, element_initials.length);
            }
        }
        else {
            if (element_initials[1] instanceof HTMLElement ||
                typeof element_initials[1] === "function") {
                childrens = element_initials.slice(1, element_initials.length);
            }
        }
        if (typeof element_initials[0] === "string") {
            element_initials = element_initials[0];
        }
        // verifing the children array
        function identify(element_initials) {
            if (typeof element_initials !== "object") {
                element_initials = [element_initials];
            }
            let tag, className, ID;
            const [el, innerValue] = element_initials[0].split("|");
            if (el.indexOf("#") > -1) {
                ID = el.split("#")[1];
                tag = el.split("#")[0];
                className = ID.split(".")[1];
                if (className) {
                    ID = ID.split(".")[0];
                }
            }
            if (el.indexOf(".") > -1) {
                if (!className) {
                    className = el.split(".")[1];
                    tag = el.split(".")[0];
                    let locID = className.split("#")[1];
                    if (locID) {
                        className = className.split("#")[0];
                    }
                }
            }
            if (tag === "") {
                tag = "div";
            }
            if (!tag && tag !== "") {
                tag = el;
            }
            const initials = { tag, className, ID, innerValue };
            /**
             * params [incoming]:any elements and props object
             * @returns HTML element
             */
            return (...incoming) => {
                let childrens2rd = [], props = {}, text;
                for (let i = 0; i < incoming.length; i++) {
                    if (typeof incoming[i] === "function" ||
                        incoming[i] instanceof HTMLElement ||
                        (Array.isArray(incoming[i]) &&
                            (incoming[i][0] instanceof HTMLElement ||
                                typeof incoming[i][0] === "function"))) {
                        childrens2rd.push(incoming[i]);
                        continue;
                    }
                    //
                    if (!(incoming[i] instanceof HTMLElement) &&
                        typeof incoming[i] === "object") {
                        props = incoming[i];
                        continue;
                    }
                    if (typeof incoming[i] === "string") {
                        text = incoming[i];
                        continue;
                    }
                }
                if (childrens.length) {
                    childrens2rd.push(...childrens);
                }
                const element = document.createElement(initials.tag);
                if (initials.className) {
                    element.className = initials.className;
                }
                if (initials.ID) {
                    element.id = initials.ID;
                }
                if (initials.innerValue) {
                    element.append(initials.innerValue);
                }
                for (const prop in properties) {
                    if (prop === "style") {
                        for (const [k, v] of Object.entries(properties[prop])) {
                            element.style[k] = v;
                        }
                        continue;
                    }
                    if (prop === "class" && typeof properties[prop] === "string") {
                        element.classList.add(properties[prop]);
                        continue;
                    }
                    if (prop === "text") {
                        element.innerText = properties[prop];
                        continue;
                    }
                    element[prop] = properties[prop];
                }
                //
                // dynamic props
                // over-rides props that appear in the first level
                if (props && typeof props === "object" && !Array.isArray(props)) {
                    for (const prop in props) {
                        if (prop === "style") {
                            for (const [k, v] of Object.entries(props[prop])) {
                                element.style[k] = v;
                            }
                            continue;
                        }
                        if (prop === "text" && typeof props[prop] === "string") {
                            element.innerText = props[prop];
                            continue;
                        }
                        if (prop === "class" && typeof props[prop] === "string") {
                            element.classList.add(props[prop]);
                            continue;
                        }
                        if (prop === "fullscreen") {
                            if (properties[prop]) {
                                (0, fullscreen_js_2.default)(element).set();
                            }
                            else {
                                (0, fullscreen_js_2.default)(element).exist();
                            }
                            continue;
                        }
                        element[prop] = props[prop];
                    }
                }
                if (childrens2rd && childrens2rd[0]) {
                    //
                    for (let i = 0; i < childrens2rd.length; i++) {
                        if (typeof childrens2rd[i] === "function") {
                            element.append(childrens2rd[i](props));
                            continue;
                        }
                        if (Array.isArray(childrens2rd[i])) {
                            const arrCX = childrens2rd[i];
                            const arrSET = [];
                            for (let p = 0; p < arrCX.length; p++) {
                                if (!(arrCX[p] instanceof HTMLElement) &&
                                    typeof arrCX[p] !== "function" &&
                                    !Array.isArray(arrCX[p])) {
                                    throw new TypeError("cradova err invalid children list, should be a html element from cradova  " +
                                        arrCX[p]);
                                }
                                arrSET.push(arrCX[p]);
                            }
                            //
                            childrens2rd = [
                                ...childrens2rd.slice(0, i + 1),
                                ...arrSET,
                                ...childrens2rd.slice(i + 1, childrens2rd.length),
                            ];
                            continue;
                        }
                        element.append(childrens2rd[i]);
                    }
                }
                if (text) {
                    element.append(text);
                }
                if (element.stateID) {
                    // adding cradova dynamic signature
                    element.classList.add("cra_child_doc");
                }
                return element;
            };
        }
        let CradovaElemet;
        if (element_initials[0].raw) {
            CradovaElemet = identify(element_initials[0].raw);
        }
        else {
            CradovaElemet = identify(element_initials);
        }
        return CradovaElemet;
    };
    _.register = (name) => {
        for (const key in name) {
            _[key] = name[key];
        }
    };
    /**
     * registering added methods to the cradova object _
     *
     * these can be safely destructured to use alone
     */
    _.register({
        w: widget_js_1.default,
        css: css_js_2.default,
        Init: init_js_1.default,
        media: media_js_1.default,
        swipe: swipe_js_1.default,
        Store: store_js_1.default,
        JSONDB: JsonDB_js_1.default,
        Screen: Screen_js_1.default,
        Router: Router_js_1.default,
        LS: localStorage_js_1.default,
        FS: file_system_js_1.default,
        Speaker: speaker_js_1.default,
        metrics: Metrics_js_1.default,
        fetcher: fetcher_js_1.default,
        animate: animate_js_1.default,
        dispatch: dispatcher_js_2.default,
        littleAxios: littleAxios_js_1.default,
        createState: createState_js_1.default,
        PromptBeforeLeave: promptbeforeleave_js_1.default,
    });
    _.Init();
    window["_"] = _;
    exports.default = _;
    /**
     *
     * Registering ServiceWorker
     *
     *  */
    window.addEventListener("load", async () => {
        if ("serviceWorker" in navigator) {
            await navigator.serviceWorker
                .register("service-worker.js")
                .then(function (registration) {
                // Registration was successful
                console.log(`Service Worker registration successful. Scope: ${registration.scope}`);
            })
                .catch((err) => console.log(err));
        }
    });
});
var CACHE_VERSION = 1;
var CURRENT_CACHES = {
    prefetch: "prefetch-cache-v" + CACHE_VERSION,
};
self.addEventListener("install", function (event) {
    var now = Date.now();
    var urlsToPrefetch = ["/"];
    // All of these logging statements should be visible via the "Inspect" interface
    // for the relevant SW accessed via chrome://serviceworker-internals
    console.log("Handling install event. Resources to prefetch:", urlsToPrefetch);
    event.waitUntil(caches
        .open(CURRENT_CACHES.prefetch)
        .then(async function (cache) {
        var cachePromises = urlsToPrefetch.map(async function (urlToPrefetch) {
            // This constructs a new URL object using the service worker's script location as the base
            // for relative URLs.
            var url = new URL(urlToPrefetch, location.href);
            // Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
            // This is particularly important when precaching resources that are later used in the
            // fetch handler as responses directly, without consulting the network (i.e. cache-first).
            // If we were to get back a response from the HTTP browser cache for this precaching request
            // then that stale response would be used indefinitely, or at least until the next time
            // the service worker script changes triggering the install flow.
            url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
            // It's very important to use {mode: 'no-cors'} if there is any chance that
            // the resources being fetched are served off of a server that doesn't support
            // CORS (http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
            // In this example, www.chromium.org doesn't support CORS, and the fetch()
            // would fail if the default mode of 'cors' was used for the fetch() request.
            // The drawback of hardcoding {mode: 'no-cors'} is that the response from all
            // cross-origin hosts will always be opaque
            // (https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#cross-origin-resources)
            // and it is not possible to determine whether an opaque response represents a success or failure
            // (https://github.com/whatwg/fetch/issues/14).
            var request = new Request(url, { mode: "no-cors" });
            try {
                const response = await fetch(request);
                if (response.status >= 400) {
                    throw new Error("request for " +
                        urlToPrefetch +
                        " failed with status " +
                        response.statusText);
                }
                return await cache.put(urlToPrefetch, response);
            }
            catch (error) {
                console.error("Not caching " + urlToPrefetch + " due to " + error);
            }
        });
        await Promise.all(cachePromises);
        console.log("Pre-fetching complete.");
    })
        .catch(function (error) {
        console.error("Pre-fetching failed:", error);
    }));
});
self.addEventListener("activate", function (event) {
    // Delete all caches that aren't named in CURRENT_CACHES.
    // While there is only one cache in this example, the same logic will handle the case where
    // there are multiple versioned caches.
    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
        return CURRENT_CACHES[key];
    });
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (expectedCacheNames.indexOf(cacheName) === -1) {
                // If this cache name isn't present in the array of "expected" cache names, then delete it.
                console.log("Deleting out of date cache:", cacheName);
                return caches.delete(cacheName);
            }
        }));
    }));
});
self.addEventListener("fetch", function (event) {
    console.log("Handling fetch event for", event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function (response) {
        if (response) {
            console.log("Found response in cache:", response);
            return response;
        }
        console.log("No response found in cache. About to fetch from network...");
        // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
        // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
        return fetch(event.request)
            .then(function (res) {
            console.log("Response from network is:", res);
            const response = res.clone();
            caches.open(CURRENT_CACHES.prefetch).then((cache) => {
                cache.put(event.request, response);
            });
            return response;
        })
            .catch(function (error) {
            // This catch() will handle exceptions thrown from the fetch() operation.
            // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
            // It will return a normal response object that has the appropriate error code set.
            console.error("Fetching failed:", error);
            throw error;
        });
    }));
});
const store = "sample_store";
const assets = [
    // put all the files you want cached here
    "/",
];
self.addEventListener("install", function (e) {
    e.waitUntil(assets.forEach((asset) => {
        fetch(asset)
            .then((res) => {
            const response = res.clone();
            caches.open(store).then((cache) => {
                cache.put(e.request, response);
            });
            return res;
        })
            .catch((err) => console.log(err));
    }));
    self["skipWaiting"]();
});
self.addEventListener("activate", function (e) {
    e.waitUntil(caches.keys().then((cach) => {
        if (cach !== store) {
            return caches.delete(cach);
        }
    }));
    return self.clients.claim();
});
self.addEventListener("fetch", function (e) {
    e.waitUntil(e.respondWith(fetch(e.request)
        .then((res) => {
        const response = res.clone();
        caches.open(store).then((cache) => {
            console.log(response, "    fetching");
            cache.put(e.request, response);
        });
        return res;
    })
        .catch(() => caches.match(e.request).then((res) => res))));
    self["skipWaiting"]();
});
define("scripts/reuse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function reuse(element) {
        return (...incoming) => {
            let childrens2rd, props, text;
            for (let i = 0; i < incoming.length; i++) {
                if (typeof incoming[i] === "function" ||
                    incoming[i] instanceof HTMLElement) {
                    if (Array.isArray(childrens2rd)) {
                        childrens2rd.push(incoming[i]);
                    }
                    else {
                        childrens2rd = [incoming[i]];
                    }
                    continue;
                }
                //
                if (!(incoming[i] instanceof HTMLElement) &&
                    typeof incoming[i] === "object") {
                    props = incoming[i];
                    continue;
                }
                if (typeof incoming[i] === "string") {
                    text = incoming[i];
                    continue;
                }
            }
            //
            // dynamic props
            //
            if (props && typeof props === "object" && !Array.isArray(props)) {
                for (const prop in props) {
                    if (prop === "style") {
                        for (const [k, v] of Object.entries(props[prop])) {
                            element.style[k] = v;
                        }
                        continue;
                    }
                    if (prop === "text") {
                        element.innerText = props[prop];
                        continue;
                    }
                    if (prop === "class") {
                        element.classList.add(props[prop]);
                        continue;
                    }
                    element[prop] = props[prop];
                }
            }
            if (childrens2rd && childrens2rd[0]) {
                for (let i = 0; i < childrens2rd.length; i++) {
                    if (typeof childrens2rd[i] === "function") {
                        element.append(childrens2rd[i](props));
                        continue;
                    }
                    element.append(childrens2rd[i]);
                }
            }
            if (text) {
                element.append(text);
            }
            if (element.stateID) {
                // adding cradova dynamic signature
                element.classList.add("cra_child_doc");
            }
            return element;
        };
    }
    exports.default = reuse;
});
//# sourceMappingURL=index.js.map