from flask import Flask, send_from_directory
from routes.inventory_routes import inventory_bp
from routes.recipes_routes import recipes_bp
from routes.expiry_routes import expiry_bp
from flask_cors import CORS  # ✅ Add CORS to prevent blocking

app = Flask(__name__, static_folder="static")
CORS(app)  # ✅ Allow requests from frontend

# Serve Frontend Pages
@app.route("/inventory")
def serve_inventory_page():
    return send_from_directory(app.static_folder, "Kitchen Inventory/inventory.html")

@app.route("/recipes")
def serve_recipes_page():
    return send_from_directory(app.static_folder, "Kitchen Inventory/recipes.html")

@app.route("/expiry")
def serve_expiry_page():
    return send_from_directory(app.static_folder, "Kitchen Inventory/expiry.html")

# Register Blueprints
app.register_blueprint(inventory_bp, url_prefix="/inventory")
app.register_blueprint(recipes_bp, url_prefix="/recipes")
app.register_blueprint(expiry_bp, url_prefix="/expiry")

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5500)