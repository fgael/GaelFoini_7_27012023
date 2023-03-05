import { selectListFactory } from "../factory/selectListFactory.js";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { init } from "../script.js";

// Récupération des champs de recherche avancée
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appareils");
const ustensilsInput = document.getElementById("input-ustensile");
const selectInputGroup = [ingredientsInput, appliancesInput, ustensilsInput];
const searchInput = document.getElementById("floatingInput");

export function searchSelectTag(recipes) {
  console.log("searchSelect");
  selectInputGroup.forEach(function (element) {
    element.addEventListener("keyup", () => {
      const query = searchInput.value;
      const selectQuery = element.value.toLowerCase();
      const isTag = document.querySelector(".badge") !== null;
      if (selectQuery) {
        const lowercaseQuery = selectQuery.toLowerCase();
        const ingredients = [];
        const appliances = [];
        const ustensils = [];

        recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient.toLowerCase();
            if (
              ingredientName.includes(lowercaseQuery) &&
              !ingredients.includes(ingredientName)
            ) {
              ingredients.push(ingredientName);
            }
          });

          const applianceName = recipe.appliance.toLowerCase();
          if (
            applianceName.includes(lowercaseQuery) &&
            !appliances.includes(applianceName)
          ) {
            appliances.push(applianceName);
          }

          recipe.ustensils.forEach((utensil) => {
            const utensilName = utensil.toLowerCase();
            if (
              utensilName.includes(lowercaseQuery) &&
              !ustensils.includes(utensilName)
            ) {
              ustensils.push(utensilName);
            }
          });
        });

        selectListFactory(
          recipes,
          capitalizeFirstLetter(ingredients),
          capitalizeFirstLetter(appliances),
          capitalizeFirstLetter(ustensils)
        );
      } else if (!selectQuery && query.length < 3 && !isTag) {
        init();
      } else {
        displaySelectTag(recipes);
      }
    });
  });
}