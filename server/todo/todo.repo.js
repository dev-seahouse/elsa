const PgRepository = require('../shared/PgRepository');

class TodoRepo extends PgRepository {
  static tableName = 'todo';

  static async insert(data) {
    return super.insert(this.tableName, data);
  }
}

module.exports = TodoRepo;
