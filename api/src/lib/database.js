import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DIALECT,
} = process.env;

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'test.sqlite',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
