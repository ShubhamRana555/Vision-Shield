import sqlite3

def check_unique_constraint():
    conn = sqlite3.connect('licensePlatesDatabase.db')
    cursor = conn.cursor()

    # Check table info
    cursor.execute("PRAGMA table_info(LicensePlates)")
    columns = cursor.fetchall()
    print("Table Columns:")
    for col in columns:
        print(col)

    # Check for unique indexes
    cursor.execute("PRAGMA index_list(LicensePlates)")
    indexes = cursor.fetchall()

    has_unique = False
    print("\nIndex List:")
    for index in indexes:
        print(index)
        if index[2]:  # index[2] is True if it's UNIQUE
            has_unique = True
            # Optionally check index details
            cursor.execute(f"PRAGMA index_info({index[1]})")
            print(" → Index Columns:", cursor.fetchall())

    if has_unique:
        print("\n✅ UNIQUE constraint is present on at least one column.")
    else:
        print("\n❌ No UNIQUE constraint found on license_plate.")

    conn.close()

check_unique_constraint()
