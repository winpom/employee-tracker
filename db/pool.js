const { Pool } = require('pg');
require('dotenv').config()

// Connect to database
const pool = new Pool(
  {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    database: process.env.DB,
    port: process.env.PORT,
  },
  console.log(`Connected to the employees_db database.`)
)

module.exports = pool;