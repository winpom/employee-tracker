const express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
const db = require('db');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  db.connect({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    database: process.env.DB,
  }),
  console.log(`Connected to the employees_db database.`)
)

module.exports = pool