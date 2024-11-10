const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'HelloThere',
    database: 'schema.sql',
    port: 5432
});

module.exports = pool;