/* Interface
    connect()
 */
const { Pool } = require('pg');

class PgConnection {
  constructor(config) {
    this.config = config;
    this.pool = new Pool({
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  // @returns client
  connect() {
    return this.pool.connect();
  }
}

module.exports = new PgConnection();
