from flask import Blueprint, jsonify
from db import get_db_connection

recipes_bp = Blueprint("recipes", __name__)

@recipes_bp.route("/api/get_inventory", methods=["GET"])
def get_inventory():
    """Fetch all available ingredients from the inventory database."""
    connection = get_db_connection()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT name FROM inventory")  # Fetching only ingredient names
        inventory_items = cursor.fetchall()
    connection.close()
    return jsonify(inventory_items)