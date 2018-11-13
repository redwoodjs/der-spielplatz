/* eslint-disable global-require, no-console */

require('dotenv').load({ path: './.env' });

const { HAMMER_ENV } = process.env;
let connection;

if (HAMMER_ENV === 'production') {
  connection = require('./config/database.prod.js');
} else {
  connection = require('./config/database.dev.js');
}

console.log('Using connection info:');
console.log({
  ...connection,
  password: '*****',
});

module.exports = {
  client: 'pg',
  connection,
};
