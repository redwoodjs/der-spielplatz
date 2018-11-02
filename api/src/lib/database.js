import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

const init = () => {
  dotenv.config();
  const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE,
  } = process.env;

  const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    },
  });

  Model.knex(knex);
};

export default {
  init,
};
