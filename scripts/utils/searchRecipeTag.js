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
    for (let i = 0; i < tagList.length; i++) {
      const tag = tagList[i];
      if (tag.id === "primary") {
        tags.ingredients.push(tag.textContent.toLowerCase().trim());
      } else if (tag.id === "success") {
        tags.appliances.push(tag.textContent.toLowerCase().trim());
      } else if (tag.id === "danger") {
        tags.ustensils.push(tag.textContent.toLowerCase().trim());
      }
    }

    const results = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      const ingredientsMatch = tags.ingredients.every((tag) => {
        return recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient.toLowerCase().includes(tag);
        });
      });
      
      const appliancesMatch = tags.appliances.every((tag) => {
        return recipe.appliance.toLowerCase().includes(tag);
      });
      
      const ustensilsMatch = tags.ustensils.every((tag) => {
        return recipe.ustensils.some((ustensil) => {
          return ustensil.toLowerCase().includes(tag);
        });
      });
      
      if (ingredientsMatch && appliancesMatch && ustensilsMatch) {
        results.push(recipe);
      }
    }
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