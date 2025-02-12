from db import get_db_connection

def get_expiring_items():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM inventory WHERE expiry <= CURDATE() + INTERVAL 3 DAY")
        expiring_items = cursor.fetchall()
    connection.close()
    return expiring_items
