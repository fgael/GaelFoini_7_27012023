import { selectButtonFactory } from "./factory/selectButtonFactory.js";
import { recipeCardFactory } from "./factory/recipeCardFactory.js";
import { capitalizeFirstLetter } from "./utils/capitalizeFirstLetter.js";

// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");
// Récupération des champs de recherche avancée
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appareils");
const ustensilsInput = document.getElementById("input-ustensile");
const selectInputGroup = [ingredientsInput, appliancesInput, ustensilsInput];

export async function searchRecipeTag() {
  const isTag = document.querySelector(".badge") !== null;
  if (isTag) {
    const tagList = document.querySelectorAll(".tag");
    const recipes = await getRecipes();
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
    displayFilteredSelectContent(results);
    searchSelect(results);
    const query = searchInput.value.toLowerCase();
    if (query.length >= 3) {
      searchRecipes(results);
    }
  }
}

async function searchRecipes(recipes) {
  console.log(recipes)
  // Récupération de la valeur de l'input
  const query = searchInput.value;
  if (query.length >= 3) {
    // Initialisation des ensembles pour les ingrédients, appareils et ustensiles correspondant à la recherche
    const matchingIngredientsSet = new Set();
    const matchingAppliancesSet = new Set();
    const matchingUstensilsSet = new Set();

    // Filtrage des recettes qui correspondent à la requête de recherche
    const results = recipes.filter((recipe) => {
      const titleMatch = recipe.name
        .toLowerCase()
        .includes(query.toLowerCase());
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

    // Affichage des recettes filtrées
    displayRecipes(results);
    // Affichage du contenu des boutons select correspondant aux recettes
    searchSelect(results);
    // Filtrage du resultat boutons select
    displayFilteredSelectContent(results);
  }
}

function searchSelect(data) {
  selectInputGroup.forEach(function (element) {
    element.addEventListener("keyup", () => {
      const query = element.value.toLowerCase();

      // Filtrage resultat tag ingredients
      if (element.id == "input-ingredients") {
        const { ingredients, appliances, ustensils } = getFilteredItems(
          data,
          query
        );
        console.log(ingredients);
        // if (ingredients.length > 0 && appliances.length > 0 && ustensils.length > 0) {}
        selectButtonFactory(
          capitalizeFirstLetter(ingredients),
          capitalizeFirstLetter(appliances),
          capitalizeFirstLetter(ustensils)
        );
      }

      // Filtrage resultat tag appareils
      if (element.id == "input-appareils") {
        const { ingredients, appliances, ustensils } = getFilteredItems(
          data,
          query
        );
        selectButtonFactory(
          capitalizeFirstLetter(ingredients),
          capitalizeFirstLetter(appliances),
          capitalizeFirstLetter(ustensils)
        );
      }

      // Filtrage resultat tag ustensiles
      if (element.id == "input-ustensile") {
        const { ingredients, appliances, ustensils } = getFilteredItems(
          data,
          query
        );
        selectButtonFactory(
          capitalizeFirstLetter(ingredients),
          capitalizeFirstLetter(appliances),
          capitalizeFirstLetter(ustensils)
        );
      }
    });
  });
}

function getFilteredItems(data, query) {
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

async function displayFilteredSelectContent(data) {
  const ingredientsList = capitalizeFirstLetter(
    data.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
  );
  const appliancesList = capitalizeFirstLetter(
    data.map((recipe) => recipe.appliance)
  );
  const ustensilsList = capitalizeFirstLetter(
    data.flatMap((recipe) => recipe.ustensils)
  );

  const uniqIngredientsList = [...new Set(ingredientsList)];
  const uniqappliancesList = [...new Set(appliancesList)];
  const uniqustensilsList = [...new Set(ustensilsList)];

  // Création de l'élément contenant la liste des ingrédients
  selectButtonFactory(
    uniqIngredientsList,
    uniqappliancesList,
    uniqustensilsList
  );
}

// Fonction de récupération des données de recettes depuis le fichier JSON
async function getRecipes() {
  try {
    // Récupération du fichier JSON avec fetch
    const res = await fetch("./data/recipes.json");
    if (res.ok) {
      // Transformation de la réponse en objet JSON
      const data = await res.json();
      // Récupération de la liste des recettes depuis l'objet JSON
      return data.recipes;
    }
  } catch (error) {
    console.log(error);
  }
}

async function displaySelectContent(data) {
  // Exécuter le code avec les ingrédients
  const ingredientsList = capitalizeFirstLetter(
    data.reduce((ingredients, recipe) => {
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
    data.reduce((appliances, recipe) => {
      const applianceName = recipe.appliance.toLowerCase();
      if (!appliances.includes(applianceName)) {
        appliances.push(applianceName);
      }
      return appliances;
    }, [])
  );

  const ustensilsList = capitalizeFirstLetter(
    data.reduce((ustensils, recipe) => {
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
  selectButtonFactory(
    uniqIngredientsList,
    uniqappliancesList,
    uniqustensilsList
  );
}

// Fonction d'affichage des données de recettes dans la grille
function displayRecipes(recipes) {
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

// Fonction d'initialisation
export async function init() {
  // Récupération de toutes les recettes
  const recipes = await getRecipes();
  // Affichage de toutes les recettes dans la grille
  displayRecipes(recipes);
  // Affichage du contenu des boutons select
  displaySelectContent(recipes);
  searchRecipeTag();
  searchSelect(recipes);
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value;
    if (query.length >= 3) {
      searchRecipes(recipes);
    }
  });
}

// Appel de la fonction d'initialisation au chargement de la page
init();
