import knex from 'knex';
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: { run: (arg0: string, arg1: any) => void; }, cb: any) => {
      conn.run('PRAGMA foreign_keys = ON', cb)
    }
  }
});

export default db;