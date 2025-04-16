const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'licensePlatesDatabase.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to SQLite database');
});

// Get table information
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('Error getting tables:', err);
    return;
  }

  console.log('Tables in database:');
  tables.forEach(table => {
    console.log(`\nTable: ${table.name}`);
    db.all(`PRAGMA table_info(${table.name})`, (err, columns) => {
      if (err) {
        console.error(`Error getting columns for ${table.name}:`, err);
        return;
      }
      console.log('Columns:');
      columns.forEach(col => {
        console.log(`- ${col.name} (${col.type})`);
      });

      // Show sample data from the table
      db.all(`SELECT * FROM ${table.name} LIMIT 5`, (err, rows) => {
        if (err) {
          console.error(`Error getting sample data from ${table.name}:`, err);
          return;
        }
        console.log('\nSample data:');
        console.log(JSON.stringify(rows, null, 2));
      });
    });
  });
});

// Close the database connection
db.close(); 