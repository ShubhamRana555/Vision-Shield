const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Database path
const dbPath = path.join(__dirname, 'licensePlatesDatabase.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('Test endpoint error:', err);
      return res.status(500).json({ error: 'Database error occurred' });
    }
    res.json({ 
      message: 'Backend is working',
      tables: tables.map(t => t.name)
    });
  });
});

// Search vehicle endpoint
app.get('/api/vehicles/search', (req, res) => {
  const { number } = req.query;
  console.log('Received search request for vehicle number:', number);
  
  if (!number) {
    console.log('No vehicle number provided');
    return res.status(400).json({ error: 'Vehicle number is required' });
  }

  // First, let's check what tables are available
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('Error getting tables:', err);
      return res.status(500).json({ error: 'Database error occurred' });
    }

    console.log('Available tables:', tables.map(t => t.name));

    // Find the table that contains vehicle information
    const vehicleTable = tables.find(table => 
      table.name.toLowerCase().includes('vehicle') || 
      table.name.toLowerCase().includes('plate')
    );

    if (!vehicleTable) {
      console.error('No vehicle table found');
      return res.status(500).json({ error: 'Vehicle table not found in database' });
    }

    console.log('Using table:', vehicleTable.name);

    // Get column information for the vehicle table
    db.all(`PRAGMA table_info(${vehicleTable.name})`, (err, columns) => {
      if (err) {
        console.error('Error getting columns:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }

      console.log('Table columns:', columns.map(c => c.name));

      // Find the column that contains plate numbers
      const plateColumn = columns.find(col => 
        col.name.toLowerCase().includes('license') || 
        col.name.toLowerCase().includes('plate')
      );

      if (!plateColumn) {
        console.error('No plate number column found');
        return res.status(500).json({ error: 'License Plate column not found in table' });
      }

      console.log('Using plate column:', plateColumn.name);

      // Construct the query based on the actual table and column names
      const query = `
        SELECT * FROM ${vehicleTable.name} 
        WHERE "${plateColumn.name}" = ?
      `;

      console.log('Executing query:', query, 'with value:', number);

      // Execute the search query
      db.get(query, [number], (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error occurred' });
        }

        if (!row) {
          console.log('No vehicle found with number:', number);
          return res.status(404).json({ error: 'Vehicle not found' });
        }

        console.log('Raw database row:', row);

        // Map the database columns to the expected response format
        // Using bracket notation to access properties with spaces
        const response = {
          location: row["Location"] || row["location"] || row["Location"] || 'Unknown',
          endTime: row["End Time"] || row["end_time"] || row["endTime"] || 'Unknown',
          licensePlate: row["License Plate"] || row["license_plate"] || row["licensePlate"] || 'Unknown',
        };

        console.log('Processed response:', response);
        res.json(response);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 