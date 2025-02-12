document.addEventListener("DOMContentLoaded", function () {
    console.log("Recipe Suggestions Page Loaded");
    getRecipeSuggestions(); // Automatically fetch recipes on page load
});

const recipesList = [
    { name: "Banana Shake", ingredients: ["Banana", "Milk", "Sugar"], instructions: "Blend all ingredients together until smooth." },
    { name: "Boiled Rice", ingredients: ["Rice", "Water", "Salt"], instructions: "Boil water, add rice and salt, cook for 15 minutes." },
    { name: "Grilled Cheese Sandwich", ingredients: ["Bread", "Cheese", "Butter"], instructions: "Butter bread, add cheese, grill until golden brown." },
    { name: "Omelette", ingredients: ["Eggs", "Salt", "Pepper", "Butter"], instructions: "Whisk eggs, add salt and pepper, cook in butter." },
    { name: "Salad", ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil"], instructions: "Chop vegetables, mix with olive oil." },
];

function getRecipeSuggestions() {
    fetch("http://127.0.0.1:5500/inventory/list") // Fetching inventory from the correct backend endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(inventory => {
            if (!Array.isArray(inventory)) {
                throw new Error("Invalid inventory data format");
            }

            const availableIngredients = inventory.map(item => item.name.toLowerCase().trim());
            
            const matchedRecipes = recipesList.map(recipe => {
                const missingIngredients = recipe.ingredients.filter(
                    ingredient => !availableIngredients.includes(ingredient.toLowerCase().trim())
                );

                return { 
                    ...recipe, 
                    missingIngredients, 
                    allAvailable: missingIngredients.length === 0  
                };
            });

            matchedRecipes.sort((a, b) => a.missingIngredients.length - b.missingIngredients.length);
            displayRecipes(matchedRecipes);
        })
        .catch(error => {
            console.error("Error fetching inventory:", error);
            document.getElementById("recipe-results").innerHTML = "<p class='error'>Error fetching recipes. Please try again.</p>";
        });
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById("recipe-results");
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        let missingText = recipe.allAvailable
            ? "<p class='available'><strong>All ingredients available!</strong></p>"
            : `<p class='missing'><strong>Missing:</strong> ${recipe.missingIngredients.join(", ")}</p>`;

        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            ${missingText}
        `;
        recipeContainer.appendChild(recipeCard);
    });
}