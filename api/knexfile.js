/* eslint-disable global-require, no-console */

require('dotenv').load({ path: './.env' });

const { HAMMER_ENV } = process.env;
let details;

if (HAMMER_ENV === 'production') {
  details = require('./config/database.prod.js');
} else {
  details = require('./config/database.dev.js');
}

const { connection } = details;

console.log('Using connection info:');
console.log({
  ...connection,
  password: '*****',
});

module.exports = details;
