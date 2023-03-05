import { selectListFactory } from "./factory/selectListFactory.js";
import { capitalizeFirstLetter } from "./utils/capitalizeFirstLetter.js";
import { displayRecipes, getRecipes } from "./loadRecipes.js";
import { searchRecipeTag } from "./utils/searchRecipeTag.js";

// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");
// Récupération des champs de recherche avancée
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appareils");
const ustensilsInput = document.getElementById("input-ustensile");
const selectInputGroup = [ingredientsInput, appliancesInput, ustensilsInput];

export function searchRecipes(recipes) {
  console.log("search recipes");
  // Récupération de la valeur de l'input
  const query = searchInput.value;
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
  searchSelect(results);
  // Filtrage du resultat boutons select
  displaySelectContent(results);
}

export function searchSelect(recipes) {
  console.log("searchSelect");
  selectInputGroup.forEach(function (element) {
    element.addEventListener("keyup", () => {
      const query = searchInput.value;
      const selectQuery = element.value.toLowerCase();
      const isTag = document.querySelector(".badge") !== null;
      if (selectQuery) {
        const result = getFilteredItems(recipes, selectQuery);
        selectListFactory(
          recipes,
          capitalizeFirstLetter(result.ingredients),
          capitalizeFirstLetter(result.appliances),
          capitalizeFirstLetter(result.ustensils)
        );
      } else if (!selectQuery && query.length < 3 && !isTag) {
        init();
      } else {
        displaySelectContent(recipes);
      }
    });
  });
}

function getFilteredItems(data, query) {
  console.log("getFilteredItems");
  const lowercaseQuery = query.toLowerCase();
  const ingredients = [];
  const appliances = [];
  const ustensils = [];

  data.forEach((recipe) => {
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

  return { ingredients, appliances, ustensils };
}

export async function displaySelectContent(recipes) {
  console.log("displaySelectContent");
  // Exécuter le code avec les ingrédients
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

// Fonction d'initialisation
export async function init() {
  console.log("init");
  // Récupération de toutes les recettes
  const recipes = await getRecipes();
  // Affichage de toutes les recettes dans la grille
  displayRecipes(recipes);
  // Affichage du contenu des boutons select
  displaySelectContent(recipes);
  searchSelect(recipes);
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value;
    const isTag = document.querySelector(".badge") !== null;
    console.log(isTag)
    if (query.length >= 3) {
      searchRecipes(recipes);
    } else if (query.length < 3 && !isTag) {
      displayRecipes(recipes);
      displaySelectContent(recipes);
    } else if (query.length < 3 && isTag) {
      searchRecipeTag(recipes)
    }
  });
}

// Appel de la fonction d'initialisation au chargement de la page
init();