from flask import Blueprint, jsonify
from models.expiry_model import get_expiring_items

expiry_bp = Blueprint("expiry", __name__)

@expiry_bp.route("/alerts", methods=["GET"])
def expiry_alerts():
    return jsonify(get_expiring_items())
