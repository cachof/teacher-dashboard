/*
Configures and exports a PostgreSQL database connection pool.
*/

const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "practice123",
    host: "localhost",
    port: 5432, 
    database: "teacher_dashboard"
    // query: ...
})

module.exports = pool;