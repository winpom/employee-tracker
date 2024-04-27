require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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