from db import get_db_connection

def get_recipes():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM recipes")
        recipes = cursor.fetchall()
    connection.close()
    return recipes

def add_recipe(name, ingredients):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = "INSERT INTO recipes (name, ingredients) VALUES (%s, %s)"
        cursor.execute(sql, (name, ingredients))
    connection.commit()
    connection.close()
