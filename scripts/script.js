async function getRecipes() {
  try {
    const res = await fetch("./data/recipes.json");
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
}

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

async function init() {
  const { recipes } = await getRecipes()
  displayData(recipes);
}

init();
