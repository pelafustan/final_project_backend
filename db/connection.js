require('dotenv').config()
const { Pool } = require('pg');

const HOST = process.env.DB_HOST
const PORT = process.env.DB_PORT
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const NAME = process.env.DB_NAME

const pool = new Pool({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: NAME,
    allowExitOnIdle: true,
});

module.exports = { pool }
