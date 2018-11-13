/* eslint-disable global-require */

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

  const { HAMMER_ENV } = process.env;
  let connectionDetails;

  if (HAMMER_ENV === 'production') {
    connectionDetails = require('../../config/database.prod.js');
  } else {
    connectionDetails = require('../../config/database.dev.js');
  }

  Model.knex(Knex(connectionDetails));

  addAllModelsForRelations(require.context('../models', false, /\.js$/));
};

export default {
  init,
};
