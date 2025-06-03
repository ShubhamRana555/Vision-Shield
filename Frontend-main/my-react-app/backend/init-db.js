const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'licensePlatesDatabase.db');
const schemaPath = path.join(__dirname, 'schema.sql');

// Read the schema file
const schema = fs.readFileSync(schemaPath, 'utf8');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to SQLite database');
});

// Execute the schema
db.exec(schema, (err) => {
  if (err) {
    console.error('Error executing schema:', err);
  } else {
    console.log('Database initialized successfully');
  }
  db.close();
}); 