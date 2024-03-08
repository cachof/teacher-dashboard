const Pool = require("pg").Pool
// Here ^, the code is importing the Pool class from the "pg" library. 
// The Pool class is part of the "pg" library, which is a PostgreSQL client for Node.js.

const pool = new Pool({
    user: "postgres",
    password: "practice123",
    host: "localhost",
    port: 5432, 
    database: "teacher_dashboard"
    // query: ...
})

module.exports = pool;