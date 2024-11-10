const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Aspc!8429',
    database: 'minions',
    port: 5432
});

module.exports = pool;