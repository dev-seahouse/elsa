const db = require('./PgDbService');

const {
  prepareInsertStmt,
  prepareSelectStmt,
  prepareUpdateStmt,
  prepareDeleteStmt,
} = require('./Queries');

class PgRepository {
  static async execute(statement, values) {
    return await db.execute(statement, values);
  }

  static async selectAll(fieldsToSelect = '*', tableName) {
    return this.select(fieldsToSelect, undefined, tableName);
  }

  static async select(fieldsToSelect, whereParams, tableName) {
    let values;
    const statement = prepareSelectStmt(tableName, fieldsToSelect, whereParams);
    if (whereParams) {
      values = Object.values(whereParams);
    }
    const data = await db.execute(statement, values);
    return data.rows;
  }

  static async insert(tableName, data) {
    // assume that pk is 'id' for simplicity
    const columns = Object.keys(data);
    const values = Object.values(data);
    let statement = prepareInsertStmt(tableName, columns, values);
    return db.execute(statement, values);
  }
}

module.exports = PgRepository;
