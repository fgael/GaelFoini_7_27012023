import { displayRecipes } from "../displayRecipes.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { searchSelectTag } from "./searchSelectTag.js";

export function searchRecipes(recipes) {

  // Récupération de l'élément input de recherche
  const searchInput = document.getElementById("floatingInput");
  const query = searchInput.value;

  // Filtrage des recettes qui correspondent à la requête de recherche
  let results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const titleMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    let ingredientsMatch = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
        ingredientsMatch.push(ingredient);
      }
    }
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    if (titleMatch || ingredientsMatch.length > 0 || descriptionMatch) {
      results.push(recipe);
    }
  }

  // Affichage des recettes filtrées
  displayRecipes(results);
  // Affichage du contenu des boutons select correspondant aux recettes
  displaySelectTag(results);
  // Filtrage tag bouton select
  searchSelectTag(results);
}