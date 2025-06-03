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

  console.log('\nTables in database:');
  tables.forEach(table => {
    console.log(`\nTable: ${table.name}`);
    
    // Get column information
    db.all(`PRAGMA table_info(${table.name})`, (err, columns) => {
      if (err) {
        console.error(`Error getting columns for ${table.name}:`, err);
        return;
      }
      
      console.log('\nColumns:');
      columns.forEach(col => {
        console.log(`- ${col.name} (${col.type})`);
      });

      // Get sample data
      db.all(`SELECT * FROM ${table.name} LIMIT 5`, (err, rows) => {
        if (err) {
          console.error(`Error getting sample data from ${table.name}:`, err);
          return;
        }
        
        console.log('\nSample data:');
        if (rows.length > 0) {
          console.log('First row structure:');
          console.log(Object.keys(rows[0]));
          console.log('\nFirst row data:');
          console.log(rows[0]);
        } else {
          console.log('No data found in table');
        }
      });
    });
  });
});

// Close the database connection
db.close(); 