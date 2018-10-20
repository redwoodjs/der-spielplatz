import Knex from 'knex';
import { Model } from 'objection';
// import dotenv from 'dotenv';

const Database = {
  init: () => {
    // dotenv.config();

    // const {
    //   DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DIALECT,
    // } = process.env;

    const knex = Knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: 'test.sqlite',
      },
    });

    Model.knex(knex);
  },
};

export default Database;
