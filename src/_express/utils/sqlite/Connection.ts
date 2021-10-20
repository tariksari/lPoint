import Datastore from 'nedb-promises';
const DB_NAME = "word.db";

/**
 * Sqlite Connnection
 */
export class SqliteConnnection {
    public static getConnection(): Datastore {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return Datastore.create({ filename: require("os").homedir() + "/" + DB_NAME, autoload: true })
    }
}