const PgRepository = require('../shared/PgRepository');

class TodoRepo extends PgRepository {
  static tableName = 'todo';
}

module.exports = TodoRepo;
