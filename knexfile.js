// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 require('dotenv').config();


 const DATABASE_URL = process.env.DATABASE_URL;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const DB_USER = process.env.DB_USER;
 const DB_NAME = process.env.DB_NAME;
 const DB_PORT = process.env.DB_PORT;

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DATABASE_URL
      },
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
