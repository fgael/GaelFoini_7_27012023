import selectButtonFactory from "./factory/selectButtonFactory.js"
import recipeCardFactory from "./factory/recipeCardFactory.js";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter.js"

// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");
// Récupération des champs de recherche avancée
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appareils");
const ustensilsInput = document.getElementById("input-ustensile");
const selectInputGroup = [ingredientsInput, appliancesInput, ustensilsInput];

// Ajout d'un écouteur d'événement sur l'input de recherche principal
searchInput.addEventListener("keyup", () => {
  // Récupération de la valeur de l'input
  const query = searchInput.value;
  // Vérification si la valeur de l'input contient au moins 3 caractères
  if (query.length >= 3) {
    // Appel de la fonction de recherche avec la valeur de l'input comme argument
    searchRecipes(query);
  } else {
    // Appel de la fonction d'initialisation si la valeur de l'input est inférieure à 3 caractères
    init();
  }
});

async function searchRecipes(query) {
  try {
    // Récupération de toutes les recettes
    const recipes = await getRecipes();

    // Initialisation des ensembles pour les ingrédients, appareils et ustensiles correspondant à la recherche
    const matchingIngredientsSet = new Set();
    const matchingAppliancesSet = new Set();
    const matchingUstensilsSet = new Set();

    // Filtrage des recettes qui correspondent à la requête de recherche
    const results = recipes
      .map((recipe) => {
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

          return recipe;
        }
      })
      .filter(Boolean);

    // Convertir l'ensemble Set en un tableau pour avoir la liste finale d'ingrédients correspondant à la recherche
    const matchingIngredients = Array.from(matchingIngredientsSet).map(
      (ingredientName) => ({ ingredient: ingredientName })
    );
    const matchingAppliances = Array.from(matchingAppliancesSet);
    const matchingUstensils = Array.from(matchingUstensilsSet);

    // Affichage des recettes filtrées
    displayRecipes(results);
    displayFilteredRecipesSelect(results);
    searchFilteredSelect();

    function searchFilteredSelect() {
    
      selectInputGroup.forEach(function (element) {
        element.addEventListener("keyup", () => {
        const query = element.value.toLowerCase();

        if (element.id == "input-ingredients"){
          const matchingIngredientsNames = matchingIngredients.map(
            (ingredient) => ingredient.ingredient
          );
          const filteredIngredients = matchingIngredientsNames.filter((ingredient) => {
            return ingredient.toLowerCase().includes(query);
          })
          const uniqIngredients = [...new Set(filteredIngredients)]

          selectButtonFactory(
            capitalizeFirstLetter(uniqIngredients),
            matchingAppliances,
            capitalizeFirstLetter(matchingUstensils)
          );
        }

        if (element.id == "input-appareils"){
          const matchingIngredientsNames = matchingIngredients.map(
            (ingredient) => ingredient.ingredient
          );
          const filteredAppliances = matchingAppliances.filter((appliance) => {
            return appliance.toLowerCase().includes(query);
          });
          const uniqAppliances = [...new Set(filteredAppliances)];
  
          selectButtonFactory(
            capitalizeFirstLetter(matchingIngredientsNames),
            uniqAppliances,
            capitalizeFirstLetter(matchingUstensils)
          );
        }

        if (element.id == "input-ustensile"){
          const matchingIngredientsNames = matchingIngredients.map(
            (ingredient) => ingredient.ingredient
          );
          const filteredUstensils = matchingUstensils.filter((ustensil) => {
            return ustensil.toLowerCase().includes(query);
          });
          const uniqUstensils = [...new Set(filteredUstensils)];

          selectButtonFactory(
            capitalizeFirstLetter(matchingIngredientsNames),
            matchingAppliances,
            capitalizeFirstLetter(uniqUstensils)
          );
        }

      });
    })}
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

async function displayFilteredRecipesSelect(data) {
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
    recipesGrid.appendChild(recipeCardDOM)}

}

// Fonction d'initialisation
async function init() {
  // Récupération de toutes les recettes
  const recipes = await getRecipes();
  // Affichage de toutes les recettes dans la grille
  displayRecipes(recipes);
  // Affichage du contenu des boutons select
  displaySelectContent(recipes);
}

// Appel de la fonction d'initialisation au chargement de la page
init();