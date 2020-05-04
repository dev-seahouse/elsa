const PgRepository = require('../shared/PgRepository');

class TodoRepo extends PgRepository {
  static tableName = 'todo';

  static async insert(data) {
    return super.insert(this.tableName, data);
  }

  static async update(data, id) {
    return super.update(data, { id: id }, this.tableName);
  }
}

module.exports = TodoRepo;
