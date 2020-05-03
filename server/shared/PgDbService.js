const conn = require('./PgConnection');

class Database {
  constructor(connection) {
    if (!Database.instance) {
      this._connection = connection;
      Database.instance = this;
    }
    return Database.instance;
  }

  get connection() {
    return this._connection;
  }

  getInstance() {
    if (!Database.instance) {
      throw Error('No instance have been initiated');
    }
    return Database.instance;
  }

  // @returns query result promise
  async execute(statement, values) {
    const client = await this.connection.connect();

    let res;

    try {
      res = values
        ? await client.query(statement, values)
        : await client.query(statement);
      return res;
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }
  }
}

const dbInstance = new Database(conn);
Object.freeze(dbInstance);

module.exports = dbInstance;
