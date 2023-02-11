// Sélectionnez les éléments du DOM
const containerInputIngredients = document.getElementById("container-ingredients");
const resultMenuIngredients = document.getElementById("result-menu-ingredients");
const inputIngredient = document.getElementById("input-ingredients");
const imgArrow = document.querySelector("#container-ingredients img");

// Affichez la liste d'ingrédients
containerInputIngredients.addEventListener("click", () => {
resultMenuIngredients.classList.toggle("d-none");

// Si la liste d'ingrédients est masquée, ajustez la largeur du conteneur à 100%
// Sinon, ajustez la largeur à 650px
containerInputIngredients.style.width =
resultMenuIngredients.classList.contains("d-none") ? "100%" : "650px";

// Changez le placeholder du champ de saisie en fonction de l'état de la liste d'ingrédients
inputIngredient.placeholder =
resultMenuIngredients.classList.contains("d-none") ? "Ingrédients" : "Rechercher un ingrédient";

// Changez l'image de la flèche en fonction de l'état de la liste d'ingrédients
imgArrow.src =
resultMenuIngredients.classList.contains("d-none") ? "assets/icons/arrow-down.svg" : "assets/icons/arrow-up.svg";
});

// Masquez la liste d'ingrédients
document.addEventListener("click", (event) => {
// Si l'utilisateur clique en dehors du conteneur ou de la liste d'ingrédients, masquez la liste d'ingrédients
if (!containerInputIngredients.contains(event.target) && !resultMenuIngredients.contains(event.target)) {
resultMenuIngredients.classList.add("d-none");
containerInputIngredients.style.width = "100%";
inputIngredient.placeholder = "Ingrédients";
imgArrow.src = "assets/icons/arrow-down.svg";
}
});

// La fonction displayData est responsable d'afficher les cartes de recettes sur la page
async function displayData(recipes) {
const recipesGrid = document.getElementById("card-grid");

// Bouclez à travers la liste de recettes et générez une carte de recette pour chacune d'entre elles
recipes.forEach((recipe) => {
// Génération de la carte recette dans /factory/recipeCardFactory.js
const recipeCard = recipeCardFactory(recipe);
const recipeCardDOM = recipeCard.createRecipeCard();
recipesGrid.appendChild(recipeCardDOM);
});
}

function init() {
  displayData(recipes);
}

init();
