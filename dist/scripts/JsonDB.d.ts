/**
 *     JSON DB DataBase MIT Licence © 2022
 *     ************************************
 *     Created by Friday Candour @uiedbooker
 *     email > fridaymaxtour@gmail.com
 *     github > www.github.com/FridayCandour
 *      telegram > @uiedbooker
 *   JSONDB  @version 1.0.0
 *  */
export declare const JSONDBversion = "1.0.0";
export declare class JSONDBTableWrapper {
    put: (name: any, value: any) => Promise<void>;
    get: (name: any) => Promise<unknown>;
    validator: (incoming: any, tables: any) => {};
    self: any;
    keys: any;
    constructor(self: unknown, keys?: any);
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
    saveWithRelations(table: any, incoming: any, relations: any[]): Promise<any>;
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
    remove(entity: {
        index: string | number;
    }): Promise<boolean>;
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
    getWhereAny(props: {
        [s: string]: unknown;
    } | ArrayLike<unknown>, number: number): Promise<any[]>;
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
    getWhereAnyPropsIncludes(props: {
        [s: string]: unknown;
    } | ArrayLike<unknown>, number: number): Promise<any[]>;
    /**
   * get an entity with the values specifiled from a Jsondb instance
   * -----------------------------
   * @type .getOne({prop: value})=> Promise(object)
   * @example
    
    await PollTable.getOne({email: "fridaymaxtour@gamail.com"}) // gets one
  
    */
    getOne(props: ArrayLike<unknown> | {
        [s: string]: unknown;
    }): Promise<any>;
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
export declare class JSONDB {
    DB_NAME: string;
    username: string;
    encrypted: boolean;
    initialised: boolean;
    time_created: string;
    version: string;
    last_access_time: string;
    visuality: string;
    Entities: Record<string, any>;
    tables: Record<string, any[]>;
    password: any;
    constructor();
    getDB(name: string): Promise<any>;
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
    schema(schema_configuration_object: {
        columns: any;
        relations?: any;
        name: any;
    }): {
        name: any;
        columns: Record<string, any>;
        base_name?: string | undefined;
        last_index?: number | undefined;
        relations?: Record<string, any> | undefined;
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
    init(config: {
        name: string;
        password: string;
        username: string;
        encrypted: boolean;
    }): Promise<void>;
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
    createJSONDBConnection(details: {
        username: string;
        password: any;
    }): Promise<{
        Entities: any;
        keys: any;
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
        getTable(table_name: string): JSONDBTableWrapper | undefined;
    }>;
    validateRelations(relations: {
        [x: string]: any;
    }): void;
    validateColumns(columns: {
        [x: string]: any;
    }): void;
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
    assemble(allEntities: any[]): Promise<void>;
}
/**
 * @exports
 */
