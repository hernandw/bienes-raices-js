import pg from "pg";
const { Pool } = pg;
process.loadEnvFile()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

const config = {
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    allowExitOnIdle: true
}

const pool = new Pool(config);



export default pool
