/**
 *     JSON DB DataBase MIT Licence © 2022
 *     ************************************
 *     Created by Friday Candour @uiedbooker
 *     email > fridaymaxtour@gmail.com
 *     github > www.github.com/FridayCandour
 *      telegram > @uiedbooker
 *   JSONDB  @version 1.0.0
 *  */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const JSONDBversion = "1.0.0";
let fs, isNode = false, _dirname;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
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
export class JSONDBTableWrapper {
    constructor(self, keys) {
        this.put = (name, value) => __awaiter(this, void 0, void 0, function* () {
            if (isNode) {
                yield fs.writeFile(name + ".json", JSON.stringify(value), "utf-8");
            }
            else {
                localStorage.setItem(name, JSON.stringify(value));
            }
        });
        this.get = (name) => __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
export class JSONDB {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
