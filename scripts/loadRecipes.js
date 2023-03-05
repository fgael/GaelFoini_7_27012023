import { recipeCardFactory } from "./factory/recipeCardFactory.js";

// Fonction d'affichage des données de recettes dans la grille
export function displayRecipes(recipes) {
  console.log("display recipes");
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

// Fonction de récupération des données de recettes depuis le fichier JSON
export async function getRecipes() {
  try {
    // Récupération du fichier JSON avec fetch
    const res = await fetch("data/recipes.json");
    if (res.ok) {
      console.log("fetch")
      // Transformation de la réponse en objet JSON
      const data = await res.json();
      // Récupération de la liste des recettes depuis l'objet JSON
      return data.recipes;
    }
  } catch (error) {
    console.log(error);
  }
}