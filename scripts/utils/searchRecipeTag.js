import { displayRecipes } from "../displayRecipes.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { searchRecipes } from "./searchRecipes.js";
import { searchSelectTag } from "./searchSelectTag.js";

export async function searchRecipesTag(recipes) {
  const isTag = document.querySelector(".badge") !== null;
  const searchInput = document.getElementById("floatingInput");
  const query = searchInput.value;
  if (isTag) {
    const tagList = document.querySelectorAll(".tag");
    const tags = {
      ingredients: [],
      appliances: [],
      ustensils: [],
    };

    // Parcourir les tags et les ranger dans les tableaux correspondants
    tagList.forEach((tag) => {
      switch (tag.id) {
        case "primary":
          tags.ingredients = [
            ...tags.ingredients,
            tag.textContent.toLowerCase().trim(),
          ];
          break;
        case "success":
          tags.appliances = [
            ...tags.appliances,
            tag.textContent.toLowerCase().trim(),
          ];
          break;
        case "danger":
          tags.ustensils = [
            ...tags.ustensils,
            tag.textContent.toLowerCase().trim(),
          ];
          break;
      }
    });

    // Filtrer les recettes qui correspondent à tous les tags
    const results = recipes.filter((recipe) => {
      const ingredientsMatch = tags.ingredients.every((tag) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(tag)
        )
      );
      const appliancesMatch = tags.appliances.every((tag) =>
        recipe.appliance.toLowerCase().includes(tag)
      );
      const ustensilsMatch = tags.ustensils.every((tag) =>
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(tag)
        )
      );

      return ingredientsMatch && appliancesMatch && ustensilsMatch;
    });
    // Afficher les résultats
    displayRecipes(results);
    displaySelectTag(results);
    searchSelectTag(results);
    if (query && query.length >= 3) {
      searchRecipes(results);
    }
  } else if (query && query.length >= 3) {
    searchRecipes(recipes);
  }
}