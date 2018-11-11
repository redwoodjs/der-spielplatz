require('dotenv').load({ path: './.env' });

const {
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE,
} = process.env;

const connection = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

console.log('Using connection info:');
console.log({
  ...connection,
  password: '*****',
});

module.exports = {
  client: 'pg',
  connection,
};
