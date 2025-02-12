// Function to navigate to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Log a message when page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Kitchen Management Dashboard Loaded!");
});

// Fetch inventory items from backend
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/api/inventory")
        .then(response => response.json())
        .then(data => {
            let output = "<h2>Inventory Items</h2><ul>";
            data.forEach(item => {
                output += `<li>${item.name} - ${item.quantity} (Expires: ${item.expiry || "N/A"})</li>`;
            });
            output += "</ul>";
            document.body.innerHTML += output;
        })
        .catch(error => console.error("Error fetching inventory:", error));
});

// Function to navigate pages
function navigateTo(page) {
    window.location.href = page;
}
