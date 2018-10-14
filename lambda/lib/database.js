import { createConnection as typeORMConnection } from 'typeorm';
import config from 'lambda/config/database';

console.log(config);

export const createConnection = async () => typeORMConnection(config);
