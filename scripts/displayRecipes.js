import { recipeCardFactory } from "./factory/recipeCardFactory.js";

// Fonction d'affichage des données de recettes dans la grille
export function displayRecipes(recipes) {
  // Affichage des recettes
  const recipesGrid = document.getElementById("card-grid");
  recipesGrid.innerHTML = "";
  if (recipes && recipes.length > 0) {
    recipes.forEach((recipe) => {
      const recipeCard = recipeCardFactory(recipe);
      const recipeCardDOM = recipeCard.createRecipeCard();
      recipesGrid.appendChild(recipeCardDOM);
    });
  } else {
    // Si aucun resultat
    const recipeCard = recipeCardFactory();
    const recipeCardDOM = recipeCard.createNoResultsRecipeCard();
    recipesGrid.appendChild(recipeCardDOM);
  }
}