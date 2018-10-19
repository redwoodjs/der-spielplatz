import dotenv from 'dotenv';

dotenv.config();

const {
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

export default {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};
