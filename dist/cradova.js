(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cradova = factory());
})(this, (function () { 'use strict';

    /**
     * Document fragment
     * @param childrens
     * @returns
     */
    const frag = function (...childrens) {
        const par = document.createDocumentFragment();
        // building it's children tree.
        for (let i = 0; i < childrens.length; i++) {
            let ch = childrens[i];
            if (typeof ch === "function") {
                if (typeof ch === "function") {
                    ch = ch();
                }
                if (ch instanceof HTMLElement) {
                    par.append(ch);
                }
            }
            else {
                if (ch instanceof HTMLElement) {
                    par.append(ch);
                }
            }
        }
        return par;
    };

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
        const escapeTSError = document.body;
        escapeTSError.addEventListener("touchstart", handleTouchStart);
        escapeTSError.addEventListener("touchend", handleTouchEnd);
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

    var __classPrivateFieldSet$2 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };
    var __classPrivateFieldGet$2 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };
    var _index, _history, _value, _useHistory, _callabck;
    class store {
        constructor(initial, useHistory) {
            _index.set(this, 0);
            _history.set(this, []);
            _value.set(this, null);
            _useHistory.set(this, false);
            _callabck.set(this, void 0);
            __classPrivateFieldSet$2(this, _value, initial);
            if (useHistory) {
                __classPrivateFieldSet$2(this, _useHistory, useHistory);
                __classPrivateFieldGet$2(this, _history).push(initial);
            }
        }
        get() {
            return __classPrivateFieldGet$2(this, _value);
        }
        set(value) {
            __classPrivateFieldSet$2(this, _value, value);
            if (!__classPrivateFieldGet$2(this, _useHistory))
                return;
            __classPrivateFieldSet$2(this, _index, __classPrivateFieldGet$2(this, _index) + 1);
            __classPrivateFieldGet$2(this, _history).push(value);
            if (__classPrivateFieldGet$2(this, _callabck)) {
                __classPrivateFieldGet$2(this, _callabck).call(this, __classPrivateFieldGet$2(this, _value));
            }
        }
        setKey(name, value) {
            if (typeof __classPrivateFieldGet$2(this, _value) === "object") {
                __classPrivateFieldGet$2(this, _value)[name] = value;
                if (!__classPrivateFieldGet$2(this, _useHistory))
                    return;
                __classPrivateFieldGet$2(this, _history).push(__classPrivateFieldGet$2(this, _value));
                __classPrivateFieldSet$2(this, _index, __classPrivateFieldGet$2(this, _index) + 1);
            }
            if (__classPrivateFieldGet$2(this, _callabck)) {
                __classPrivateFieldGet$2(this, _callabck).call(this, __classPrivateFieldGet$2(this, _value));
            }
        }
        forward() {
            if (__classPrivateFieldGet$2(this, _history).length > __classPrivateFieldGet$2(this, _index) + 1) {
                if (!__classPrivateFieldGet$2(this, _useHistory))
                    return;
                __classPrivateFieldSet$2(this, _value, __classPrivateFieldGet$2(this, _history)[__classPrivateFieldGet$2(this, _index) + 1]);
            }
        }
        backward() {
            if (__classPrivateFieldGet$2(this, _history).length > 0 && __classPrivateFieldGet$2(this, _index) > 0) {
                if (!__classPrivateFieldGet$2(this, _useHistory))
                    return;
                __classPrivateFieldSet$2(this, _value, __classPrivateFieldGet$2(this, _history)[__classPrivateFieldGet$2(this, _index) - 1]);
                __classPrivateFieldSet$2(this, _index, __classPrivateFieldGet$2(this, _index) - 1);
            }
        }
        listen(callabck) {
            __classPrivateFieldSet$2(this, _callabck, callabck);
        }
    }
    _index = new WeakMap(), _history = new WeakMap(), _value = new WeakMap(), _useHistory = new WeakMap(), _callabck = new WeakMap();
    const Store = function (initial, useHistory = false) {
        return new store(initial, useHistory);
    };

    /**
     * Facilitates navigation within the application and initializes
     * page views based on the matched routes.
     */
    const Router = {};
    Router["routes"] = {};
    Router["params"] = {};
    /**
     *
     * @param url
     * @returns
     */
    const checker = (url) => {
        // first strict check
        if (Router.routes[url]) {
            return [Router.routes[url], null];
        }
        // place holder check
        for (const path in Router.routes) {
            if (!path.includes("$")) {
                continue;
            }
            //
            const urlFixtures = url.split("/");
            const pathFixtures = path.split("/");
            // length check
            if (pathFixtures.length === urlFixtures.length) {
                urlFixtures.shift();
                pathFixtures.shift();
                let isIt = true;
                let routesParams = {};
                for (let i = 0; i < pathFixtures.length; i++) {
                    // loosely item checking by N indexes & includes
                    // FIXME: may be problematic but works faster than any other solutions
                    // NO regex :)
                    // this is faster and better
                    if (!pathFixtures[i].includes("$") && path.includes(urlFixtures[i] + "/") && (pathFixtures.indexOf(urlFixtures[i]) === pathFixtures.lastIndexOf(urlFixtures[i]))) {
                        if (!isIt)
                            isIt = true;
                    }
                    else {
                        if (pathFixtures[i].includes("$")) {
                            continue;
                        }
                        isIt = false;
                    }
                    if (!(pathFixtures.indexOf(urlFixtures[i]) === pathFixtures.lastIndexOf(urlFixtures[i]))) {
                        throw new Error("cradova router doesn't allow paths with multiple names");
                    }
                }
                if (isIt) {
                    for (let i = 0; i < pathFixtures.length; i++) {
                        if (pathFixtures[i].includes("$")) {
                            routesParams[pathFixtures[i].split("$")[1]] = urlFixtures[i];
                        }
                    }
                    return [Router.routes[path], routesParams];
                }
            }
        }
        return [];
    };
    /**
     * Registers a route.
     *
     * @param {string}   path     Route path.
     * @param {Function} controller the cradova document tree for the route.
     */
    Router.route = function (path = "/", controller) {
        Router.routes[path] = {
            controller: controller,
        };
    };
    Router.navigate = function (href, data = {}) {
        if (typeof href !== "string") {
            throw new TypeError("cradova err href must be a defined path but got " + href + " instaed");
        }
        let route = null, params, link = null;
        if (href.includes(".")) {
            try {
                if (new URL(href).pathname === window.location.pathname) {
                    return;
                }
                route = Router.routes[new URL(href).pathname];
                link = new URL(href).pathname;
            }
            catch (error) {
                throw new Error("cradova: invlaid route  " + href);
            }
        }
        else {
            if (href === window.location.pathname) {
                return;
            }
            [route, params] = checker(href);
            if (route) {
                Router.params.params = params || null;
                Router.params.data = data || null;
                link = href;
                window.history.pushState({}, "", link);
                document.body.click();
            }
        }
        return;
    };
    Router.goTo = (path) => {
        window.location.pathname = path;
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
            const [route, params] = checker(new URL(Alink.href).pathname);
            if (route) {
                Router.params.event = e;
                Router.params.params = params || null;
                Router.params.data = Router.params.data || null;
                route.controller(Router.params);
            }
            else {
                throw new Error("cradova err route doesn't exist  " + Alink.href);
            }
            window.history.pushState({}, "", new URL(Alink.href).pathname);
            return;
        }
        const url = window.location.pathname;
        const [route, params] = checker(url);
        if (route) {
            Router.params.event = e;
            Router.params.params = params || null;
            Router.params.data = Router.params.data || null;
            route.controller(Router.params);
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

    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
       * @param name
       * @param template
       * @param transitions
       */
    class Screen {
        constructor(cradova_screen_initials) {
            this.secondaryChildren = [];
            /**
             * this tells cradova to persist state on the screen or not
             * persiting is better
             */
            this.persist = true;
            const { template, name, callBack, transition, persist } = cradova_screen_initials;
            if (typeof template !== "function") {
                throw new Error("Cradova err: only functions that returns a cradova element is valid as screen");
            }
            this.html = template;
            this.name = name;
            this.template = document.createElement("div");
            this.template.style.width = "100%";
            this.template.style.display = "flex";
            this.template.style.flexDirection = "column";
            this.template.id = "cradova-screen-set";
            this.callBack = callBack;
            this.transition = transition;
            if (!persist) {
                this.persist = false;
            }
        }
        package(data) {
            return __awaiter$2(this, void 0, void 0, function* () {
                this.template.innerHTML = '';
                if (typeof this.html === "function") {
                    let fuc = yield this.html(data);
                    if (typeof fuc === "function") {
                        fuc = fuc();
                        if (!(fuc instanceof HTMLElement)) {
                            throw new Error("Cradova err only parent with descendants is valid");
                        }
                        else {
                            this.template.append(fuc);
                        }
                    }
                }
                this.template.append(...this.secondaryChildren);
            });
        }
        onActivate(cb) {
            this.callBack = cb;
        }
        addChild(...addOns) {
            for (let i = 0; i < addOns.length; i++) {
                if (addOns[i] && addOns[i] instanceof HTMLElement) {
                    this.secondaryChildren.push(addOns[i]);
                }
                if (addOns[i] && typeof addOns[i] === "function") {
                    this.secondaryChildren.push(addOns[i]());
                }
            }
        }
        detach() {
            var _a;
            // crearing the dom 
            const screens = document.querySelectorAll("#cradova-screen-set");
            for (let i = 0; i < screens.length; i++) {
                const screen = screens[i];
                if (this.transition) {
                    screen.classList.remove("CRADOVA-UI-" + this.transition);
                }
                (_a = screen.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(screen);
            }
        }
        Activate(data) {
            var _a;
            return __awaiter$2(this, void 0, void 0, function* () {
                let packed = false;
                if (document.title === this.name) {
                    return;
                }
                if (!this.template.firstChild) {
                    packed = true;
                    yield this.package(data);
                }
                if (!this.persist && !packed) {
                    yield this.package(data);
                }
                document.title = this.name;
                this.detach();
                document.querySelector("#app-wrapper").append(this.template);
                if (this.transition) {
                    (_a = this.template) === null || _a === void 0 ? void 0 : _a.classList.add("CRADOVA-UI-" + this.transition);
                    // console.log(this.template.className);
                }
                if (this.callBack) {
                    this.callBack(this.template.firstChild, data);
                }
                window.scrollTo(0, 0);
            });
        }
    }
    // SCREEN ANIMATION CLASSES
    Screen.SCALE_IN = "SCALE-IN";
    Screen.SCALE_OUT = "SCALE-OUT";
    Screen.CIRCLE_IN = "CIRCLE-IN";
    Screen.CIRCLE_OUT = "CIRCLE-OUT";
    Screen.FADE_OUT = "FADE-OUT";
    Screen.FADE_IN = "FADE-IN";
    Screen.SLIDE_UP = "SLIDE-UP";
    Screen.SLIDE_DOWN = "SLIDE-DOWN";
    Screen.SLIDE_LEFT = "SLIDE-LEFT";
    Screen.SLIDE_RIGHT = "SLIDE-RIGHT";

    /**
     *     JSON DB DataBase MIT Licence © 2022
     *     ************************************
     *     Created by Friday Candour @uiedbooker
     *     email > fridaymaxtour@gmail.com
     *     github > www.github.com/FridayCandour
     *      telegram > @uiedbooker
     *   JSONDB  @version 1.0.0
     *  */
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const JSONDBversion = "1.0.0";
    let fs, isNode = false, _dirname;
    (function () {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!globalThis.localStorage) {
                isNode = true;
            }
        });
    })();
    const schema = class {
        constructor(schema_configuration_object, validators) {
            // validations
            if (!schema_configuration_object.columns) {
                throw new Error("JSONDB: can't create an empty table should have some columns");
            }
            validators.validateColumns(schema_configuration_object.columns);
            const isEmptyObject = function (obj) {
                // for checking for empty objects
                for (const _name in obj) {
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
            this.put = (name, value) => __awaiter$1(this, void 0, void 0, function* () {
                if (isNode) {
                    yield fs.writeFile(name + ".json", JSON.stringify(value), "utf-8");
                }
                else {
                    localStorage.setItem(name, JSON.stringify(value));
                }
            });
            this.get = (name) => __awaiter$1(this, void 0, void 0, function* () {
                if (!isNode) {
                    return JSON.parse(localStorage.getItem(name));
                }
                const data = yield fs.readFile(_dirname + "/" + name + ".json", {
                    encoding: "utf-8",
                });
                if (data) {
                    return JSON.parse(data);
                }
                else {
                    throw new Error("JSONDB: error failed to retrieve entities from database ");
                }
            });
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
        saveWithRelations(table, incoming, relations) {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (!relations || !table) {
                    throw new TypeError("JsonDB: error saving with relations  table name or relation cannot be null   " +
                        JSON.stringify(relations) +
                        "   " +
                        JSON.stringify(table));
                }
                if (!table.self || !table.self.name) {
                    throw new TypeError("JsonDB: error saving with relations  table is invalid   " +
                        JSON.stringify(table));
                }
                const db = yield this.get(this.self.base_name);
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
                yield this.put(this.self.base_name, db);
                return db.tables[this.self.name][incoming.index];
            });
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .save(schema)=> Promise(object)
       * @example
       await PollTable.save(poll)
      */
        save(incoming) {
            return __awaiter$1(this, void 0, void 0, function* () {
                // db.tables[this.self.name] = db.tables[this.self.name].sort(
                //   (a, b) => a.index - b.index
                // );
                const db = yield this.get(this.self.base_name);
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
                yield this.put(this.self.base_name, db);
                return incoming;
            });
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .remove(schema)=> Promise(object)
       * @example
       await PollTable.remove(poll)
      */
        remove(entity) {
            return __awaiter$1(this, void 0, void 0, function* () {
                const db = yield this.get(this.self.base_name);
                db.last_access_time = Date();
                // db.tables[this.self.name].splice(entity.index, 1);
                db.tables[this.self.name][entity.index] = null;
                yield this.put(this.self.base_name, db);
                return true;
            });
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .count(schema)=> Promise(number)
       * @example
       await PollTable.count(poll)
      */
        count() {
            return __awaiter$1(this, void 0, void 0, function* () {
                const db = yield this.get(this.self.base_name);
                db.last_access_time = Date();
                return db.tables[this.self.name].length;
            });
        }
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .getAll()=> Promise(object[])
       * @example
       await PollTable.getAll()
      */
        getAll() {
            return __awaiter$1(this, void 0, void 0, function* () {
                const db = yield this.get(this.self.base_name);
                db.last_access_time = Date();
                return db.tables[this.self.name];
            });
        }
        /**
       * get entities with any of the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getWhereAny({prop: value}, number | undefind)=> Promise(object)
       * @example
       await PollTable.getWhereAny({name: "friday", age: 121, class: "senior"}) // gets all
       await PollTable.getWhereAny({email: "fridaymaxtour@gmail.com"}, 2) // gets 2 if they are up to two
      */
        getWhereAny(props, number) {
            return __awaiter$1(this, void 0, void 0, function* () {
                const results = [];
                let all;
                const db = yield this.get(this.self.base_name);
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
            });
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
        getWhereAnyPropsIncludes(props, number) {
            return __awaiter$1(this, void 0, void 0, function* () {
                const results = [];
                const db = yield this.get(this.self.base_name);
                db.last_access_time = Date();
                const all = db.tables[this.self.name];
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
            });
        }
        /**
       * get an entity with the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getOne({prop: value})=> Promise(object)
       * @example
        
        await PollTable.getOne({email: "fridaymaxtour@gamail.com"}) // gets one
      
        */
        getOne(props) {
            return __awaiter$1(this, void 0, void 0, function* () {
                let results = null;
                const db = yield this.get(this.self.base_name);
                db.last_access_time = Date();
                const all = db.tables[this.self.name];
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
            });
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
            return undefined;
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
            this.version = JSONDBversion;
            this.last_access_time = "";
            this.visuality = "";
            this.Entities = {};
            this.tables = {};
        }
        getDB(name) {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (!isNode) {
                    return JSON.parse(localStorage.getItem(name));
                }
                const data = yield fs.readFile(_dirname + "/" + name + ".json", {
                    encoding: "utf-8",
                });
                if (data) {
                    return JSON.parse(data);
                }
                else {
                    throw new Error("JSONDB: error failed to retrieve entities from database ");
                }
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
            return __awaiter$1(this, void 0, void 0, function* () {
                console.log(`\x1B[32m JSONDB version ${JSONDBversion} \x1B[39m`);
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
                        wasThere = this.getDB(config.name);
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
                if (isNode) {
                    yield fs.writeFile(config.name + ".json", JSON.stringify(this), "utf-8");
                }
                else {
                    let db = JSON.stringify(this);
                    localStorage.setItem(config.name, db);
                }
            });
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
        createJSONDBConnection(details) {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (!this.initialised) {
                    throw new Error("JSONDB: you haven't create a JSONDB instance yet");
                }
                if (details.username !== this.username ||
                    details.password !== this.password) {
                    throw new Error("JSONDB: Access Denied");
                }
                const connection = yield this.getDB(this.DB_NAME);
                connection.last_access_time = Date();
                return new JSONDBConnection(connection.Entities);
            });
        }
        validateRelations(relations) {
            const types = ["many", "one"];
            for (const relation in relations) {
                const value = relations[relation];
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
            for (const column in columns) {
                const value = columns[column];
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
            return __awaiter$1(this, void 0, void 0, function* () {
                if (!this.initialised) {
                    throw new Error("JSONDB: you haven't create a JSONDB instance yet");
                }
                try {
                    const wasThere = yield this.getDB(this.DB_NAME);
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
                if (isNode) {
                    yield fs.writeFile(this.DB_NAME + ".json", JSON.stringify(this), "utf-8");
                }
                else {
                    localStorage.setItem(this.DB_NAME, JSON.stringify(this));
                }
            });
        }
    }
    /**
     * @exports
     */

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
    function littleAxios(url, callback, data, header) {
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
    function fetcher(url, method = "GET", headers, data) {
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

    function loadCradovaUICss(seconds = 0.3) {
        const css = `:root {
--animation-timing: ${seconds + ""}s;
}

.CRADOVA-UI-CIRCLE-OUT {
  animation: circle-out var(--animation-timing) ease forwards; 
}

.CRADOVA-UI-CIRCLE-IN {
  animation: circle-in var(--animation-timing) ease forwards; 
}

.CRADOVA-UI-SCALE-IN {
  animation: scale-in var(--animation-timing) ease forwards;
}

.CRADOVA-UI-SCALE-OUT {
  animation: scale-out var(--animation-timing) ease forwards;
}

.CRADOVA-UI-SLIDE-RIGHT {
  animation: slide-right var(--animation-timing) ease forwards;
}

.CRADOVA-UI-SLIDE-LEFT {
  animation: slide-left var(--animation-timing) ease forwards;
}

.CRADOVA-UI-SLIDE-UP {
  animation: slide-up var(--animation-timing) ease forwards;
}

.CRADOVA-UI-SLIDE-DOWN {
  animation: slide-down var(--animation-timing) ease forwards;
}

/* not done yet */ 

.CRADOVA-UI-FADE-IN {
  animation: fade-in var(--animation-timing) ease forwards;
}

.CRADOVA-UI-FADE-OUT {
  animation: fade-out var(--animation-timing) ease forwards;
}

/* ultility classes */

.CIRCLE-OUT {
  animation: fadeoff var(--animation-timing) ease forwards;
}

.CIRCLE-IN {
  animation: fadein var(--animation-timing) ease forwards;
}

/* animations  */

@keyframes circle-out {
  from {
    border-radius: 49%;
    /* width: 100%; */
    /* height: 100%; */
    margin: auto;
    margin-top: 40%;
  }
  
  to  {
    border-radius: 100%;
    /* width: 0%; */
    /* height: 0%; */
    margin: auto;
    margin-top: 50%;
  }
}

@keyframes circle-in {
  from {
    border-radius: 100%;
    /* width: 0%; */
    /* height: 0%; */
    margin: auto;
    margin-top: 40%;
  }
  to  {
    border-radius: 0%;
    /* width: 100vw; */
    /* height: 100vh; */
    margin: auto;
    margin-top: 0%;
  }
}

@keyframes scale-in {
  from {
   transform: scale(1);
  } 
  to {
   transform: scale(0);
  }
}


@keyframes scale-out {
  from {
    transform: scale(0);
    } 
  to {
    transform: scale(1);
   }
}

@keyframes slide-right {
  from {
  margin-left: -140%;
  }
  to  {
  margin-left: 0%;
  }
}

@keyframes slide-left {
  from {
  margin-left: 140%;
  }
  to  {
  margin-left: 0%;
  }
}

@keyframes slide-up {
  from {
  margin-top: 140%;
  }
  to  {
  margin-top: 0%;
  }
}

@keyframes slide-down {
  from {
  margin-top: -140%;
  }
  to  {
  margin-top: 0%;
  }
}

@keyframes fade-in {
  from {
  opacity: 0;
  }
  to  {
  opacity: 1;
  }
}

@keyframes fade-out {
  from {
  opacity: 1;
  }
  to  {
  opacity: 0;
  }
}

/* ultility animations */


@keyframes fadeoff {
  50%{
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
} 

@keyframes fadein {
  0% { 
    opacity: 0;
}
  70%{
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
} `;
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    // the global dispatcher
    function cradovaDispatchtrack(nodes /*NodeListOf<Element>*/, stateID, state) {
        var _a;
        const updated = [];
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            // abort re-rendering if the state is not for this element
            if (!element.stateID || element.stateID !== stateID) {
                continue;
            }
            updated.push(element);
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
                    if (element.style[key] && key !== "src") {
                        element.style[key] = state[key];
                        continue;
                    }
                    if (element.style[key] === "" && key !== "src") {
                        element.style[key] = state[key];
                        continue;
                    }
                    if (typeof element[key] === "function") {
                        element[key]();
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
                            fullScreen(element).set();
                        }
                        else {
                            fullScreen(element).exist();
                        }
                        continue;
                    }
                    // adding class name to element
                    if (key === "class" && typeof state[key] === "string") {
                        const classes = state[key].split(" ");
                        for (let i = 0; i < classes.length; i++) {
                            if (classes[i]) {
                                element.classList.add(classes[i]);
                            }
                        }
                        // console.log(element.className, "cl");
                        continue;
                    }
                    // toggling element class
                    if (key === "toggleclass") {
                        element.classList.toggle(state[key]);
                        //          console.log(element.className, "tc");
                        continue;
                    }
                    //removing element class
                    if (key === "removeclass") {
                        element.classList.remove(state[key]);
                        //  console.log(element.className, "rm");
                        continue;
                    }
                    //removing element class
                    if (key === "remove") {
                        (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove(element);
                        continue;
                    }
                    // changing the element children tree
                    if (key === "tree") {
                        if (typeof state[key] === "function") {
                            state[key] = state[key]();
                        }
                        if (typeof state[key] === "function") {
                            state[key] = state[key]();
                        }
                        if (Array.isArray(state[key])) {
                            throw new TypeError("cradova err invalid element, should be a single element or parent element from cradova");
                        }
                        if (!(state[key] instanceof HTMLElement)) {
                            console.error("cradova err wrong element type: can't create element state on " +
                                state[key]);
                            throw new TypeError("cradova err invalid element, should be a html element from cradova");
                        }
                        // destroy the component tree
                        element.innerHTML = "";
                        // rebuild the component tree
                        // console.log(state[key]);
                        element.append(state[key]);
                        continue;
                    }
                    element[key] = state[key];
                }
            }
        }
        return updated;
    }
    /**
     * Send a new state to specified element with stateID
     *
     * @param stateID
     * @param state
     * @returns element(s)
     */
    function dispatch(stateID, state) {
        // TODO: this will be updated to use data-stateid soon
        // speed test still going on
        const nodes = document.querySelectorAll(".cra_child_doc");
        let updated = [];
        if (typeof state === "undefined" && typeof stateID === "object") {
            for (const [id, eachState] of Object.entries(stateID)) {
                const node = cradovaDispatchtrack(nodes, id, eachState);
                updated.push(...node);
            }
        }
        else {
            if (typeof stateID === "string") {
                const node = cradovaDispatchtrack(nodes, stateID, state);
                updated.push(...node);
            }
        }
        return updated;
    }
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
    /*
     *** HOW TO USE ***

    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    */

    var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };
    var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };
    var _component, _stateID, _parentElement;
    /**
     * @param {number} num
     * @returns uuid
     */
    function uuid(num = 10) {
        function dec2hex(dec) {
            return dec.toString(16).padStart(2, "0");
        }
        function generateId(len) {
            len = Math.round(len);
            return Array.from(crypto.getRandomValues(new Uint8Array(len || 10)), dec2hex).join("");
        }
        return generateId(num);
    }
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
    function media(value, ...properties) {
        /* This is for creating css
       @media styles using javascipt*/
        const styS = "@media only screen and (" +
            value +
            ") " +
            "{" +
            `
`, styE = "}" +
            `
`;
        let style = "  ", aniSty = " ";
        const proplen = properties.length;
        let totalAnimation, Animation = "  ";
        const animationStep = (num) => {
            style = "  ";
            for (const [k, v] of Object.entries(properties[num][1])) {
                style +=
                    "" +
                        k +
                        ": " +
                        v +
                        ";" +
                        `
`;
            }
            aniSty +=
                "" +
                    properties[num][0] +
                    "{" +
                    `
` +
                    style +
                    "}" +
                    `
`;
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
        totalAnimation =
            aniStyleTag.innerHTML +
                `

`;
        totalAnimation += styS + Animation + styE;
        aniStyleTag.innerHTML = totalAnimation;
        document.head.append(aniStyleTag);
    }
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
    function css(indentifier, properties) {
        /*This is for creating
       css styles using javascipt*/
        const styS = "" +
            indentifier +
            "" +
            "{" +
            `
`;
        const styE = "}" +
            `
`;
        let style = "", totalStyle = "";
        for (const [k, v] of Object.entries(properties)) {
            style +=
                "" +
                    k +
                    ": " +
                    v +
                    ";" +
                    `
`;
        }
        let styleTag = document.querySelector("style");
        if (styleTag !== null) {
            totalStyle += styleTag.innerHTML;
            totalStyle += styS + style + styE;
            styleTag.innerHTML = totalStyle;
            return;
        }
        styleTag = document.createElement("style");
        totalStyle +=
            styleTag.innerHTML +
                `

`;
        totalStyle += styS + style + styE;
        styleTag.innerHTML = totalStyle;
        document.head.append(styleTag);
    }
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
    function animate(indentifier, ...properties) {
        /*This is for creating css
       animations  using javascipt*/
        const styS = "@keyframes " +
            indentifier +
            " " +
            "{" +
            `
`, styE = "}" +
            `
`, proplen = properties.length;
        let style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
        const animationStep = (num) => {
            style = "  ";
            for (const [k, v] of Object.entries(properties[num][1])) {
                style +=
                    "" +
                        k +
                        ": " +
                        v +
                        ";" +
                        `
`;
            }
            aniSty +=
                "" +
                    properties[num][0] +
                    "{" +
                    `
` +
                    style +
                    "}" +
                    `
`;
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
        totalAnimation =
            aniStyleTag.innerHTML +
                `

`;
        totalAnimation += styS + Animation + styE;
        aniStyleTag.innerHTML = totalAnimation;
        document.head.append(aniStyleTag);
    }
    /**
     *
     * @param {expession} condition
     * @param {function} callback
     */
    function assert(condition, callback) {
        if (condition) {
            return callback(condition);
        }
        // That didn't went well
        return " ";
    }
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
    class list {
        constructor(component) {
            _component.set(this, void 0);
            _stateID.set(this, uuid());
            _parentElement.set(this, null);
            __classPrivateFieldSet$1(this, _component, component);
        }
        build(datas) {
            if (!datas[0]) {
                return;
            }
            const elements = [];
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                const chtml = __classPrivateFieldGet$1(this, _component).call(this, data);
                const element = chtml({ stateID: __classPrivateFieldGet$1(this, _stateID) });
                elements.push(element);
            }
            return elements;
        }
        update(datas) {
            var _a;
            if (!datas[0]) {
                return;
            }
            if (!__classPrivateFieldGet$1(this, _parentElement)) {
                // only for the first call
                __classPrivateFieldSet$1(this, _parentElement, dispatch(__classPrivateFieldGet$1(this, _stateID), {
                    display: "none",
                })[0].parentElement);
            }
            dispatch(__classPrivateFieldGet$1(this, _stateID), { remove: true });
            if (!__classPrivateFieldGet$1(this, _parentElement)) {
                throw new Error("cannot update list");
            }
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                const chtml = __classPrivateFieldGet$1(this, _component).call(this, data);
                const element = chtml({ stateID: __classPrivateFieldGet$1(this, _stateID) });
                (_a = __classPrivateFieldGet$1(this, _parentElement)) === null || _a === void 0 ? void 0 : _a.append(element);
            }
        }
    }
    _component = new WeakMap(), _stateID = new WeakMap(), _parentElement = new WeakMap();

    /**
     * Save values to memory
     * get them when needed
     */
    var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };
    var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };
    var _mem, _string;
    class memory {
        constructor(lastMemory) {
            _mem.set(this, {});
            _string.set(this, "cradova-memory-cache-key");
            if (lastMemory) {
                __classPrivateFieldSet(this, _mem, lastMemory);
            }
        }
        get(key) {
            if (__classPrivateFieldGet(this, _mem)[key]) {
                return __classPrivateFieldGet(this, _mem)[key];
            }
            return null;
        }
        set(key, value) {
            __classPrivateFieldGet(this, _mem)[key] = value;
        }
        load() {
            let memory = localStorage.getItem(__classPrivateFieldGet(this, _string));
            if (!memory)
                return false;
            memory = JSON.parse(memory);
            for (const mem in memory) {
                this.set(mem, memory[mem]);
            }
            return true;
        }
        save() {
            const memory = {};
            for (const mem in __classPrivateFieldGet(this, _mem)) {
                memory[mem] = __classPrivateFieldGet(this, _mem)[mem];
            }
            for (const val in memory) {
                if (val) {
                    localStorage.setItem(__classPrivateFieldGet(this, _string), JSON.stringify(memory));
                    break;
                }
            }
        }
    }
    _mem = new WeakMap(), _string = new WeakMap();

    const Init = function (self) {
        const Wrapper = document.createElement("div");
        Wrapper.className = "Cradova-app-wrappper";
        Wrapper.id = "app-wrapper";
        // style can be over written by another css file
        css(".Cradova-app-wrappper", {
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "flex-direction": "column",
            width: "100%",
        });
        Wrapper.stateID = "Cradova-app-wrappper-id";
        document.body.append(Wrapper);
        const lastMemory = window.localStorage.getItem("cradova-local-memory");
        if (lastMemory) {
            self.memory = new memory(JSON.parse(lastMemory));
        }
        else {
            self.memory = new memory(null);
        }
        return Wrapper;
    };

    /*

    """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    "
    "   ██████╗  ██████╗    █████      ██████╗    ███████╗  ██╗   ██╗   █████
    "  ██╔════╝  ██╔══██╗  ██╔═╗██    █      ██  ██╔═════╝  ██║   ██║  ██╔═╗██
    "  ██║        ██████╔╝  ██████╗    █      ██  ██║     ██  ██║   ██║  ██████╗
    "  ██║        ██╔══██   ██║  ██║   █      ██  ██║     ██  ╚██╗ ██╔╝  ██║  ██
    "  ╚██████╗  ██║  ██║  ██║  ██║   ███████╔╝   ███████     ╚████╔╝   ██║  ██║
    "   ╚═════╝  ╚═╝  ╚═╝  ╚═╝  ╚═╝   ╚══════╝     ╚════╝     ╚═══╝     ╚═╝  ╚═╝
    "  JSONDB inside
    """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

    " =============================================================================
    " By Friday Candour
    " -----------------------------------------------------------------------------
    " =============================================================================
    "   Cradova FrameWork
    "   @version 1.*.*
    " -----------------------------------------------------------------------------
    " License: Apache V2
    " -----------------------------------------------------------------------------
    " fridaymaxtour@gmail.com ...
    " =============================================================================

                                      Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/
     
            Copyright 2022 Friday Candour. All Rights Reserved.
            Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
                http://www.apache.org/licenses/LICENSE-2.0
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License.
    */
    const make = function (txx) {
        if (Array.isArray(txx)) {
            txx = txx[0].trim();
        }
        if (!txx) {
            return {
                tag: "div",
                Classes: undefined,
                ID: undefined,
                innerValue: undefined,
            };
        }
        let tag;
        const itemsPurifier = (impure, items) => {
            const pureItems = [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].includes(impure)) {
                    items[i] = items[i].split(impure)[0];
                }
                pureItems.push(items[i]);
            }
            return pureItems;
        };
        let textContent;
        tag = txx.trim()[0] === "|" && "p";
        if (txx.includes("|")) {
            textContent = txx.split("|")[1];
            txx = txx.split("|")[0] && txx.split("|")[0];
        }
        const classes = itemsPurifier("#", txx.split("."));
        const ids = itemsPurifier(".", txx.split("#"));
        if (!tag) {
            tag = classes.shift();
        }
        if (!tag) {
            tag = ids.shift();
        }
        if (!tag) {
            tag = "div";
        }
        if (!txx.includes(".") && !txx.includes("#")) {
            tag = txx;
            ids.length = 0;
            classes.length = 0;
        }
        let ID = ids[1] ? ids[1].trim() : null;
        const className = classes.join(" ");
        let innerValue;
        if (textContent) {
            innerValue = textContent;
        }
        return { tag, className, ID, innerValue };
    };
    /**
     * Creates new cradova HTML element
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
     *  static elements cannot be given props nor children nor state but dynamic can
     *
     *  and static are useful too
     */
    const _ = (...element_initials) => {
        let properties, childrens = [], beforeMount;
        if (typeof element_initials[1] == "object" &&
            !(element_initials[1] instanceof HTMLElement && !element_initials[1].tagName)) {
            properties = element_initials[1];
            if (properties === null || properties === void 0 ? void 0 : properties.beforeMount) {
                beforeMount = properties["beforeMount"];
            }
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
        if (element_initials[0].raw) {
            // getting the value of static cradova calls
            element_initials[0] = element_initials[0]["raw"][0];
        }
        // verifing the children array
        function identify(element_initials) {
            if (typeof element_initials !== "object") {
                element_initials = [element_initials];
            }
            const initials = make(element_initials[0]);
            // TODO: tag debugger
            // const { tag, className, ID, innerValue } = initials;
            // if (tag === "div" && properties?.style?.pp === "o") {
            //   // console.log(properties.beforeMount);
            //   properties.beforeMount();
            // }
            /**
             *
             * --- Cradova Element Initials  ---
             * --------------------------------
             *
             * Note: this element has not been initialised!
             *
             * add to a parent element or call this return fuction
             *
             * .
             */
            return (...incoming) => {
                /*
                 *
                 * --- Cradova Element Initials  ---
                 * --------------------------------
                 *
                 * Note: this element has not been initialised!
                 *
                 * add to a parent element or call this return fuction
                 *
                 * .
                 */
                let childrens2rd = [], props = {}, text;
                for (let i = 0; i < incoming.length; i++) {
                    if (typeof incoming[i] === "function" ||
                        incoming[i] instanceof HTMLElement
                    // ||
                    // incoming[i].tagName
                    ) {
                        childrens2rd.push(incoming[i]);
                        continue;
                    }
                    //         if (
                    //           !incoming[i]
                    //         ) {
                    // console.log(incoming[i]);
                    //           continue;
                    //         }
                    //
                    if (
                    // !incoming[i].tagName &&
                    !(incoming[i] instanceof HTMLElement) &&
                        !Array.isArray(incoming[i]) &&
                        typeof incoming[i] === "object" &&
                        !incoming[i].tagName) {
                        if (incoming[i].beforeMount) {
                            beforeMount = incoming[i]["beforeMount"];
                            continue;
                        }
                        if (incoming[i].composedPath) {
                            continue;
                        }
                        props = incoming[i];
                        continue;
                    }
                    //
                    if (typeof incoming[i] === "string") {
                        text = incoming[i];
                        continue;
                    }
                }
                if (childrens.length) {
                    childrens2rd.push(...childrens);
                }
                let element;
                try {
                    element = document.createElement(initials.tag.trim());
                }
                catch (error) {
                    throw new TypeError("cradova err invalid tag given  " + initials.tag);
                }
                if (!element) {
                    return;
                }
                if (initials.className) {
                    element.className = initials.className.trim();
                }
                if (initials.ID) {
                    element.id = initials.ID.trim();
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
                    if (element.style[prop] === "" && prop !== "src") {
                        element.style[prop] = properties[prop];
                        continue;
                    }
                    if (prop === "class" && typeof properties[prop] === "string") {
                        const classes = properties[prop].split(" ");
                        for (let i = 0; i < classes.length; i++) {
                            if (classes[i]) {
                                element.classList.add(classes[i]);
                            }
                        }
                        continue;
                    }
                    if (prop === "text") {
                        element.innerText = properties[prop];
                        continue;
                    }
                    try {
                        element[prop] = properties[prop];
                    }
                    catch (error) {
                        throw new Error("cradova err invalid props  " +
                            prop +
                            " for this element type with value " +
                            properties[prop]);
                    }
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
                        if (prop === "beforeMount") {
                            beforeMount = props["beforeMount"];
                            continue;
                        }
                        if (prop === "fullscreen") {
                            if (properties[prop]) {
                                fullScreen(element).set();
                            }
                            else {
                                fullScreen(element).exist();
                            }
                            continue;
                        }
                        try {
                            element[prop] = props[prop];
                        }
                        catch (error) {
                            // console.log(element);
                            // console.log(props);
                            console.error(error);
                        }
                    }
                }
                if (childrens2rd && childrens2rd[0]) {
                    //
                    for (let i = 0; i < childrens2rd.length; i++) {
                        if (typeof childrens2rd[i] === "function") {
                            const child = childrens2rd[i]();
                            element.append(child);
                            if (child.afterMount) {
                                child.afterMount(child);
                                child.afterMount = undefined;
                            }
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
                        const child = childrens2rd[i];
                        element.append(child);
                        if (child.afterMount) {
                            child.afterMount(child);
                            child.afterMount = undefined;
                        }
                    }
                }
                if (text) {
                    element.append(text);
                }
                // TODO: this will be updated to use data-stateid soon
                // spped test still going on
                if (element.stateID) {
                    // adding cradova dynamic signature
                    element.classList.add("cra_child_doc");
                }
                if (beforeMount) {
                    beforeMount(element);
                }
                return element;
            };
        }
        if (typeof element_initials[0] !== "string") {
            return () => "empty cradova call";
        }
        const CradovaElemet = identify(element_initials);
        if (!CradovaElemet) {
            throw new Error("Cradova err invalid element initials  " + element_initials);
        }
        return CradovaElemet;
    };
    Init(_);
    /**
     * Create element and get a callback to update their state
     * no need to manage stateIDs
     * ----------------------------------------------------------------
     *
     * @param element_initials
     * @param props
     * @returns
     */
    function $(element_initials = "div", props = {}) {
        props.stateID = uuid();
        const element = _(element_initials, props);
        return [element, dispatch.bind(null, props.stateID)];
    }
    const controls = function () {
        const svg = `<svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M4.49975 5.625C4.3402 5.6242 4.18282 5.58788 4.03904 5.5187C3.89526 5.44951 3.76869 5.34919 3.6685 5.225L1.03725 2.0375C0.8835 1.84561 0.786745 1.61438 0.758014 1.37017C0.729283 1.12596 0.769733 0.878589 0.874753 0.65625C0.959928 0.463017 1.09892 0.298383 1.27514 0.182014C1.45136 0.0656449 1.65734 0.00245816 1.8685 0H7.131C7.34216 0.00245816 7.54815 0.0656449 7.72437 0.182014C7.90058 0.298383 8.03958 0.463017 8.12475 0.65625C8.22977 0.878589 8.27023 1.12596 8.24149 1.37017C8.21276 1.61438 8.11601 1.84561 7.96226 2.0375L5.331 5.225C5.23082 5.34919 5.10424 5.44951 4.96047 5.5187C4.81669 5.58788 4.65931 5.6242 4.49975 5.625Z" fill="#2c3e50"/>
</svg>
`;
        const icon = (styles) => _("div", Object.assign(Object.assign({}, styles), { innerHTML: svg }));
        const constr = _("div", {
            display: "flex",
            position: "fixed",
            alignContent: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            width: "80px",
            top: "4px",
            right: "4px",
            backgroundColor: "#fff",
            transform: "rotate(0deg)",
            border: "aqua 2px solid",
            borderRadius: "6px",
        }, icon({
            transform: "rotate(90deg)",
            /* border: "red 2px solid", */ onclick() {
                window.history.back();
            },
        }), icon({
            transform: "rotate(270deg)",
            /* border: "red 2px solid", */ onclick() {
                window.history.forward();
            },
        }));
        const cont = constr();
        if (cont) {
            document.body.append(cont);
        }
    };
    function register(modules) {
        for (let i = 0; i < modules.length; i++) {
            _[modules[i]] = modules[i];
        }
    }
    register([
        frag,
        swipe,
        Store,
        Router,
        Screen,
        JSONDB,
        fetcher,
        littleAxios,
        loadCradovaUICss,
        assert,
        animate,
        PromptBeforeLeave,
        css,
        media,
        ls,
        list,
        $,
        controls,
    ]);
    for (const key in _) {
        console.log(key);
    }

    return _;

}));
