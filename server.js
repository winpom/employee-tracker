const express = require('express');
// Import and require Pool (node-postgres)
const pool = require('./db/pool.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
pool.connect();

// Hardcoded query: DELETE FROM course_names WHERE id = 3;
pool.query(`DELETE FROM employees_db WHERE id = $1`, [3], (err, {rows}) => {
  if (err) {
    console.log(err);
  }
  console.log(rows);
});

// Query database
pool.query('SELECT * FROM employees_db', function (err, {rows}) {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});