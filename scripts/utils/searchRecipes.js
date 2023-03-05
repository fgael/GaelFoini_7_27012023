import { displayRecipes } from "../displayRecipes.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { searchSelectTag } from "./searchSelectTag.js";

export function searchRecipes(recipes) {
  console.log("search recipes");
  
  // Récupération de l'élément input de recherche
  const searchInput = document.getElementById("floatingInput");
  const query = searchInput.value;
  // Récupération des champs de recherche avancée
  const ingredientsInput = document.getElementById("input-ingredients");
  const appliancesInput = document.getElementById("input-appareils");
  const ustensilsInput = document.getElementById("input-ustensile");
  const selectInputGroup = [ingredientsInput, appliancesInput, ustensilsInput];

  selectInputGroup.forEach(function (element) {
    element.addEventListener("keyup", () => {
      const selectQuery = element.value.toLowerCase();
      if (selectQuery && query.length < 3) {
        searchRecipes(recipes);
      }
    });
  });

  // Initialisation des ensembles pour les ingrédients, appareils et ustensiles correspondant à la recherche
  const matchingIngredientsSet = new Set();
  const matchingAppliancesSet = new Set();
  const matchingUstensilsSet = new Set();

  // Filtrage des recettes qui correspondent à la requête de recherche
  //---------------------------------//
  const results = recipes.filter((recipe) => {
    const titleMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    const ingredientsMatch = recipe.ingredients.filter((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    if (titleMatch || ingredientsMatch.length > 0 || descriptionMatch) {
      // Ajout des noms d'ingrédients correspondant à la recherche dans l'ensemble Set
      recipe.ingredients.forEach((ingredient) =>
        matchingIngredientsSet.add(ingredient.ingredient.toLowerCase())
      );
      matchingAppliancesSet.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil) =>
        matchingUstensilsSet.add(ustensil.toLowerCase())
      );
      return true;
    }
    return false;
  });
  //--------------------------------//

  // Affichage des recettes filtrées
  displayRecipes(results);
  // Affichage du contenu des boutons select correspondant aux recettes
  searchSelectTag(results);
  // Filtrage du resultat boutons select
  displaySelectTag(results);
}