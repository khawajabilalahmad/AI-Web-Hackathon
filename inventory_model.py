from db import get_db_connection

def add_item(name, category, quantity, unit, expiry):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO inventory (name, category, quantity, unit, expiry) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (name, category, quantity, unit, expiry))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        connection.close()

def get_items():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM inventory")
            items = cursor.fetchall()
        return items
    finally:
        connection.close()

def delete_item(item_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM inventory WHERE id = %s", (item_id,))
        connection.commit()
    finally:
        connection.close()
