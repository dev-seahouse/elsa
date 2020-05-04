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

  static async update(fieldsToUpdate, whereParams, tableName) {
    let cleanedUpFields = {};
    Object.keys(fieldsToUpdate).forEach((prop) => {
      if (fieldsToUpdate[prop] !== undefined && fieldsToUpdate[prop] !== null) {
        cleanedUpFields[prop] = fieldsToUpdate[prop];
      }
    });

    let columns = Object.keys(cleanedUpFields);
    let values = Object.values(cleanedUpFields);

    const statement = prepareUpdateStmt(
      tableName,
      columns,
      values,
      whereParams
    );
    values.push(...Object.values(whereParams));
    console.log(statement);
    //return db.execute(statement, values);
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
