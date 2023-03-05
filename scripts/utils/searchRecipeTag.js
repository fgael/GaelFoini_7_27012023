import { searchRecipes, searchSelect, displaySelectContent } from "../script.js"
import { displayRecipes } from "../loadRecipes.js";

export async function searchRecipeTag(recipes) {
    console.log("searchRecipeTag")
    const isTag = document.querySelector(".badge") !== null;
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
      displaySelectContent(results);
      searchSelect(results);
    }
  }