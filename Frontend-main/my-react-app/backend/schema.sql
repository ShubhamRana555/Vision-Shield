CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate_number TEXT UNIQUE NOT NULL,
    owner_name TEXT NOT NULL,
    vehicle_model TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    fuel_type TEXT NOT NULL,
    status TEXT NOT NULL
);

-- Insert some sample data
INSERT OR IGNORE INTO vehicles (plate_number, owner_name, vehicle_model, registration_date, fuel_type, status)
VALUES 
    ('DL3CAB1234', 'Uma Bisht', 'Hyundai Verna', '2021-08-20', 'Petrol', 'Missing'),
    ('MH01AB1234', 'John Doe', 'Maruti Swift', '2022-01-15', 'Petrol', 'Active'),
    ('KA02CD5678', 'Jane Smith', 'Honda City', '2020-11-30', 'Diesel', 'Active'); 