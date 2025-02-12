from flask import Blueprint, request, jsonify
from models.inventory_model import add_item, get_items, delete_item

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/add", methods=["POST"])
def add_inventory():
    data = request.json
    try:
        add_item(data["name"], data["category"], data["quantity"], data["unit"], data["expiry"])
        return jsonify({"message": "Item added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@inventory_bp.route("/list", methods=["GET"])
def list_inventory():
    try:
        items = get_items()
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@inventory_bp.route("/delete/<int:item_id>", methods=["DELETE"])
def delete_inventory(item_id):
    try:
        delete_item(item_id)
        return jsonify({"message": "Item deleted successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
