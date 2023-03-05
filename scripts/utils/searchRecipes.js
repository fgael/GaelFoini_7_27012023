import { displayRecipes } from "../displayRecipes.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { searchSelectTag } from "./searchSelectTag.js";

export function searchRecipes(recipes) {
  console.log("search recipes");
  console.time("searchRecipes");
  // Récupération de l'élément input de recherche
  const searchInput = document.getElementById("floatingInput");
  const query = searchInput.value;

  // Filtrage des recettes qui correspondent à la requête de recherche
  const results = recipes.filter((recipe) => {
    const titleMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    const ingredientsMatch = recipe.ingredients.filter((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    if (titleMatch || ingredientsMatch.length > 0 || descriptionMatch) {
      return true;
    }
    return false;
  });

  // Affichage des recettes filtrées
  displayRecipes(results);
  // Affichage du contenu des boutons select correspondant aux recettes
  displaySelectTag(results);
  // Filtrage tag bouton select
  searchSelectTag(results);
  console.timeEnd("searchRecipes");
}