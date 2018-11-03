import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

const addAllModelsForRelations = requires => {
  const models = {};
  // import all the model modules and store them in the `models` object.
  requires.keys().forEach(filename => {
    const modelName = filename.replace('./', '').replace('.js', '');
    models[modelName] = requires(filename).default;
  });

  // add an `allModels` method to the Model class
  Object.keys(models).forEach(modelName => {
    models[modelName].allModels = () => models;
  });
};

export const init = () => {
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

  addAllModelsForRelations(require.context('../models', false, /\.js$/));
};

export default {
  init,
};
