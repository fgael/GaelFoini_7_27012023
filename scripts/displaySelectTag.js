import { selectListFactory } from "./factory/selectListFactory.js";
import { capitalizeFirstLetter } from "./utils/capitalizeFirstLetter.js";

export async function displaySelectTag(recipes) {
  const ingredientsList = capitalizeFirstLetter(
    recipes.reduce((ingredients, recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!ingredients.includes(ingredientName)) {
          ingredients.push(ingredientName);
        }
      });
      return ingredients;
    }, [])
  );

  const appliancesList = capitalizeFirstLetter(
    recipes.reduce((appliances, recipe) => {
      const applianceName = recipe.appliance.toLowerCase();
      if (!appliances.includes(applianceName)) {
        appliances.push(applianceName);
      }
      return appliances;
    }, [])
  );

  const ustensilsList = capitalizeFirstLetter(
    recipes.reduce((ustensils, recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        const ustensilName = ustensil.toLowerCase();
        if (!ustensils.includes(ustensil)) {
          ustensils.push(ustensilName);
        }
      });
      return ustensils;
    }, [])
  );

  const uniqIngredientsList = [...new Set(ingredientsList)];
  const uniqappliancesList = [...new Set(appliancesList)];
  const uniqustensilsList = [...new Set(ustensilsList)];
  // Création de l'élément contenant la liste des ingrédients
  selectListFactory(
    recipes,
    uniqIngredientsList,
    uniqappliancesList,
    uniqustensilsList
  );
}