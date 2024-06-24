/* import pg from 'pg';
process.loadEnvFile()
const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
}




export const pool = new Pool(config) */
import pg from 'pg';
import { querys } from '../config/querys.js'
process.loadEnvFile()


const { Pool } = pg;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export const pool = new Pool({
  allowExitOnIdle: true,
  connectionString,
});

try {
  await pool.query('SELECT NOW()');
  console.log('Database connected');
  


} catch (error) {
  console.log(error);
}
