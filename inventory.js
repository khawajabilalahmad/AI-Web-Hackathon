let inventoryData = []; // Global array to store inventory data

document.addEventListener("DOMContentLoaded", function () {
    displayInventory();
});

// Fetch and Display Inventory
function displayInventory() {
    fetch("http://127.0.0.1:5500/inventory/list")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Inventory Data:", data); // Debugging
            inventoryData = data; 
            renderInventoryTable(inventoryData);
        })
        .catch(error => console.error("Error fetching inventory:", error));
}

// Render Inventory Table
function renderInventoryTable(filteredData) {
    let tableBody = document.getElementById("inventory-list");
    if (!tableBody) {
        console.error("Error: Inventory table body not found!");
        return;
    }
    tableBody.innerHTML = ""; 

    filteredData.forEach(item => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.expiry}</td>
            <td><button onclick="deleteItem(${item.id})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Search Function
function searchItems() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let filteredResults = inventoryData.filter(item => 
        item.name.toLowerCase().includes(query)
    );
    renderInventoryTable(filteredResults);
}

// Filter Function
function filterItems() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    let filteredResults = inventoryData.filter(item => 
        selectedCategory === "All" || item.category === selectedCategory
    );
    renderInventoryTable(filteredResults);
}

// Add Item to Inventory
document.getElementById("inventory-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    let item = {
        name: document.getElementById("itemName").value,
        category: document.getElementById("itemCategory").value,
        quantity: document.getElementById("itemQuantity").value,
        unit: document.getElementById("itemUnit").value,
        expiry: document.getElementById("itemExpiry").value
    };

    console.log("Adding Item:", item); // Debugging

    fetch("http://127.0.0.1:5500/inventory/add", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data); // Debugging
        alert(data.message || data.error);
        if (data.message) {
            document.getElementById("inventory-form").reset();
            closeModal();
            displayInventory();
        }
    })
    .catch(error => console.error("Error adding item:", error));
});

// Delete Function
function deleteItem(id) {
    fetch(`http://127.0.0.1:5500/inventory/delete/${id}`, {  
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Deleted Item Response:", data); // Debugging
        alert(data.message || data.error);
        displayInventory();
    })
    .catch(error => console.error("Error deleting item:", error));
}

// Expand/Collapse Inventory List
function toggleInventory() {
    let inventoryTable = document.getElementById("inventory-container");
    inventoryTable.style.display = inventoryTable.style.display === "none" ? "block" : "none";
}

function openModal() {
    let modal = document.getElementById("itemModal");
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error("Error: Modal not found!");
    }
}

function closeModal() {
    let modal = document.getElementById("itemModal");
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("Error: Modal not found!");
    }
}