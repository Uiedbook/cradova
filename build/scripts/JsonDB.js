/**
 *     JSON DB DataBase MIT Licence © 2022
 *     ************************************
 *     Created by Friday Candour @uiedbooker
 *     email > fridaymaxtour@gmail.com
 *     github > www.github.com/FridayCandour
 *      telegram > @uiedbooker
 *   JSONDB  @version 1.0.0
 *  */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.JSONDBversion = void 0;
    exports.JSONDBversion = "1.0.0";
    var fs, fileURLToPath, isNode = false, _dirname;
    if (!globalThis.localStorage) {
        isNode = true;
        fs = await new Promise(function (resolve_1, reject_1) { require(["fs"], resolve_1, reject_1); }).then(__importStar);
        var dr = await new Promise(function (resolve_2, reject_2) { require(["path"], resolve_2, reject_2); }).then(__importStar);
        var fp = await new Promise(function (resolve_3, reject_3) { require(["url"], resolve_3, reject_3); }).then(__importStar);
        fileURLToPath = fp.fileURLToPath;
        _dirname = dr
            .dirname(fileURLToPath(import.meta.url))
            .split("node_modules")[0];
    }
    var schema = /** @class */ (function () {
        function schema(schema_configuration_object, validators) {
            // validations
            if (!schema_configuration_object.columns) {
                throw new Error("JSONDB: can't create an empty table should have some columns");
            }
            validators.validateColumns(schema_configuration_object.columns);
            var isEmptyObject = function (obj) {
                // for checking for empty objects
                for (var name_1 in obj) {
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
        return schema;
    }());
    var JSONDBTableWrapper = /** @class */ (function () {
        function JSONDBTableWrapper(self, keys) {
            var _this = this;
            this.put = function (name, value) { return __awaiter(_this, void 0, void 0, function () {
                function cb(err) {
                    if (err) {
                        throw new Error("JSONDB: error failed to update entities in database because " + err);
                    }
                }
                return __generator(this, function (_a) {
                    if (isNode) {
                        fs.writeFile(name + ".json", JSON.stringify(value), cb);
                    }
                    else {
                        localStorage.setItem(name, JSON.stringify(value));
                    }
                    return [2 /*return*/];
                });
            }); };
            this.get = function (name) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (res, rej) {
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
                        })];
                });
            }); };
            this.validator = function (incoming, tables) {
                // works for type, nulllable and unique validations.
                var outgoing = {};
                for (var prop in _this.self.columns) {
                    if (_this.self.columns[prop].nullable !== true &&
                        !Object.hasOwnProperty.call(incoming, prop)) {
                        throw new Error("JSONDB: error failed to validate incoming data because " +
                            prop +
                            " is required for " +
                            _this.self.name +
                            " Schema");
                    }
                    if (!_this.self.columns[prop].nullable &&
                        typeof incoming[prop] !== _this.self.columns[prop].type) {
                        throw new Error("JSONDB: error failed to validate incoming data because " +
                            prop +
                            "'s value " +
                            incoming[prop] +
                            " has got a wrong data type of " +
                            typeof incoming[prop] +
                            " for " +
                            _this.self.name +
                            " should be " +
                            _this.self.columns[prop].type +
                            " type instead");
                    }
                    if (_this.self.columns[prop].unique === true) {
                        for (var i = 0; i < tables.length; i++) {
                            var element = tables[i];
                            if (element[prop] === incoming[prop]) {
                                throw new Error("JSONDB: error failed to validate incoming data because " +
                                    prop +
                                    " is unique for " +
                                    _this.self.name +
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
        JSONDBTableWrapper.prototype.saveWithRelations = function (table, incoming, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var db, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!relations) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _a.sent();
                            db.last_access_time = Date();
                            if (incoming && typeof incoming.index !== "number") {
                                throw new Error("JsonDB: save before saving with relations");
                            }
                            db.tables[this.self.name][incoming.index] = incoming;
                            if (relations && Array.isArray(relations)) {
                                for (i = 0; i < relations.length; i++) {
                                    if (db.Entities[this.self.name].relations[table.self.name]) {
                                        if (db.Entities[this.self.name].relations[table.self.name].type ===
                                            "many") {
                                            db.tables[this.self.name][incoming.index].relations[table.self.name] = !db.tables[this.self.name][incoming.index].relations[table.self.name]
                                                ? [relations[i]]
                                                : __spreadArrays(db.tables[this.self.name][incoming.index].relations[table.self.name], [
                                                    relations[i],
                                                ]);
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
                                                : __spreadArrays(db.tables[this.self.name][incoming.index].relations[table.self.name], [
                                                    relations,
                                                ]);
                                        }
                                        else {
                                            db.tables[this.self.name][incoming.index].relations[table.self.name] = relations;
                                        }
                                    }
                                }
                            }
                            return [4 /*yield*/, this.put(this.self.base_name, db)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, db.tables[this.self.name][incoming.index]];
                    }
                });
            });
        };
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .save(schema)=> Promise(object)
       * @example
       await PollTable.save(poll)
      */
        JSONDBTableWrapper.prototype.save = function (incoming) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _a.sent();
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
                            return [4 /*yield*/, this.put(this.self.base_name, db)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, incoming];
                    }
                });
            });
        };
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .remove(schema)=> Promise(object)
       * @example
       await PollTable.remove(poll)
      */
        JSONDBTableWrapper.prototype.remove = function (entity) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _a.sent();
                            db.last_access_time = Date();
                            // db.tables[this.self.name].splice(entity.index, 1);
                            db.tables[this.self.name][entity.index] = null;
                            return [4 /*yield*/, this.put(this.self.base_name, db)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .count(schema)=> Promise(number)
       * @example
       await PollTable.count(poll)
      */
        JSONDBTableWrapper.prototype.count = function () {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _a.sent();
                            db.last_access_time = Date();
                            return [2 /*return*/, db.tables[this.self.name].length];
                    }
                });
            });
        };
        /**
       * Save table into a Jsondb instance
       * -----------------------------
       * @type .getAll()=> Promise(object[])
       * @example
       await PollTable.getAll()
      */
        JSONDBTableWrapper.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _a.sent();
                            db.last_access_time = Date();
                            return [2 /*return*/, db.tables[this.self.name]];
                    }
                });
            });
        };
        /**
       * get entities with any of the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getWhereAny({prop: value}, number | undefind)=> Promise(object)
       * @example
       await PollTable.getWhereAny({name: "friday", age: 121, class: "senior"}) // gets all
       await PollTable.getWhereAny({email: "fridaymaxtour@gmail.com"}, 2) // gets 2 if they are up to two
      */
        JSONDBTableWrapper.prototype.getWhereAny = function (props, number) {
            return __awaiter(this, void 0, void 0, function () {
                var results, all, db, i, element, _i, _a, _b, k, v;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            results = [];
                            return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _c.sent();
                            db.last_access_time = Date();
                            all = db.tables[this.self.name];
                            for (i = 0; i < all.length; i++) {
                                element = all[i];
                                for (_i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
                                    _b = _a[_i], k = _b[0], v = _b[1];
                                    if (element[k] && element[k] === v) {
                                        results.push(element);
                                        if (typeof number === "number" && results.length === number) {
                                            return [2 /*return*/, results];
                                        }
                                    }
                                }
                            }
                            return [2 /*return*/, results];
                    }
                });
            });
        };
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
        JSONDBTableWrapper.prototype.getWhereAnyPropsIncludes = function (props, number) {
            return __awaiter(this, void 0, void 0, function () {
                var results, all, db, i, element, _i, _a, _b, k, v;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            results = [];
                            return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _c.sent();
                            db.last_access_time = Date();
                            all = db.tables[this.self.name];
                            for (i = 0; i < all.length; i++) {
                                element = all[i];
                                for (_i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
                                    _b = _a[_i], k = _b[0], v = _b[1];
                                    if (element[k] && typeof v === "string" && element[k].includes(v)) {
                                        results.push(element);
                                        if (typeof number === "number" && results.length === number) {
                                            return [2 /*return*/, results];
                                        }
                                    }
                                }
                            }
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        /**
       * get an entity with the values specifiled from a Jsondb instance
       * -----------------------------
       * @type .getOne({prop: value})=> Promise(object)
       * @example
        
        await PollTable.getOne({email: "fridaymaxtour@gamail.com"}) // gets one
      
        */
        JSONDBTableWrapper.prototype.getOne = function (props) {
            return __awaiter(this, void 0, void 0, function () {
                var results, db, i, element, _i, _a, _b, k, v;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            results = null;
                            return [4 /*yield*/, this.get(this.self.base_name)];
                        case 1:
                            db = _c.sent();
                            db.last_access_time = Date();
                            all = db.tables[this.self.name];
                            for (i = 0; i < all.length; i++) {
                                element = all[i];
                                for (_i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
                                    _b = _a[_i], k = _b[0], v = _b[1];
                                    if (element[k] && element[k] === v) {
                                        results = element;
                                        break;
                                    }
                                }
                            }
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        return JSONDBTableWrapper;
    }());
    var JSONDBConnection = /** @class */ (function () {
        function JSONDBConnection(Entities, keys) {
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
        JSONDBConnection.prototype.getTable = function (table_name) {
            for (var _i = 0, _a = Object.entries(this.Entities); _i < _a.length; _i++) {
                var _b = _a[_i], tableName = _b[0], table = _b[1];
                if (table_name === tableName) {
                    return new JSONDBTableWrapper(table, this.keys);
                }
            }
        };
        return JSONDBConnection;
    }());
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
    var JSONDB = /** @class */ (function () {
        function JSONDB() {
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
        JSONDB.prototype.getDB = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (res, rej) {
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
                        })];
                });
            });
        };
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
        JSONDB.prototype.schema = function (schema_configuration_object) {
            return new schema(schema_configuration_object, {
                validateColumns: this.validateColumns,
                validateRelations: this.validateRelations
            });
        };
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
        JSONDB.prototype.init = function (config) {
            console.log("\u001B[32m JSONDB version " + exports.JSONDBversion + " \u001B[39m");
            this.initialised = true;
            this.DB_NAME = config.name;
            this.password = config.password || "";
            this.username = config.username || "";
            this.encrypted = config.encrypted || false;
            this.time_created = Date();
            this.tables = {};
            try {
                var wasThere = void 0;
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
                var db = JSON.stringify(this);
                localStorage.setItem(config.name, db);
            }
        };
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
        JSONDB.prototype.createJSONDBConnection = function (details) {
            return __awaiter(this, void 0, void 0, function () {
                var connection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.initialised) {
                                throw new Error("JSONDB: you haven't create a JSONDB instance yet");
                            }
                            if (details.username !== this.username ||
                                details.password !== this.password) {
                                throw new Error("JSONDB: Access Denied");
                            }
                            return [4 /*yield*/, this.getDB(this.DB_NAME)];
                        case 1:
                            connection = _a.sent();
                            connection.last_access_time = Date();
                            return [2 /*return*/, new JSONDBConnection(connection.Entities)];
                    }
                });
            });
        };
        JSONDB.prototype.validateRelations = function (relations) {
            var types = ["many", "one"];
            for (var _i = 0, _a = Object.entries(relations); _i < _a.length; _i++) {
                var _b = _a[_i], relation = _b[0], value = _b[1];
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
        };
        JSONDB.prototype.validateColumns = function (columns) {
            var types = ["number", "string", "boolean", "blob"];
            for (var _i = 0, _a = Object.entries(columns); _i < _a.length; _i++) {
                var _b = _a[_i], column = _b[0], value = _b[1];
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
        };
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
        JSONDB.prototype.assemble = function (allEntities) {
            if (!this.initialised) {
                throw new Error("JSONDB: you haven't create a JSONDB instance yet");
            }
            try {
                var wasThere = fs.readFileSync(this.DB_NAME + ".json", "utf-8");
                if (wasThere) {
                    return;
                }
            }
            catch (error) { }
            if (!Array.isArray(allEntities) || typeof allEntities[0] !== "object") {
                throw new Error("JSONDB: invalid entity array list, can't be assembled");
            }
            for (var i = 0; i < allEntities.length; i++) {
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
        };
        return JSONDB;
    }());
    /**
     * @exports
     */
    exports["default"] = JSONDB;
});
//# sourceMappingURL=JsonDB.js.map