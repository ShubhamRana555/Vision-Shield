# import sqlite3
# #Connect to the SQLite database (or create it if it doesnot exist)
# conn = sqlite3.connect('licensePlatesDatabase.db')

# #Create a cusrsor object to interact with the datbase
# cursor = conn.cursor()


# #Create a table to store the License Plate Data

# cursor.execute(
#     '''
#     CREATE TABLE IF NOT EXISTS LicensePlates(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         start_time TEXT,
#         end_time TEXT,
#         license_plate TEXT
#     )
#     '''
# )


# import sqlite3

# # Connect to the SQLite database (or create it if it does not exist)
# conn = sqlite3.connect('licensePlatesDatabase.db')
# cursor = conn.cursor()

# # Create a table with location column
# cursor.execute(
#     '''
#     CREATE TABLE IF NOT EXISTS LicensePlates(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         start_time TEXT,
#         end_time TEXT,
#         license_plate TEXT UNIQUE,
#         location TEXT
#     )
#     '''
# )

# conn.commit()
# conn.close()

import sqlite3

def create_table():
    print("Creating DB and table")
    conn = sqlite3.connect('licensePlatesDatabase.db')
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS LicensePlates')
    cursor.execute('''
        CREATE TABLE LicensePlates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            start_time TEXT,
            end_time TEXT,
            license_plate TEXT,
            location TEXT,
            UNIQUE(license_plate, start_time, end_time)
        )
    ''')
    conn.commit()
    conn.close()
    print("Done!")

create_table()


def cleanup_duplicates():
    conn = sqlite3.connect('licensePlatesDatabase.db')
    cursor = conn.cursor()
    cursor.execute('''
        DELETE FROM LicensePlates
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM LicensePlates
            GROUP BY license_plate, start_time, end_time
        )
    ''')
    conn.commit()
    conn.close()
