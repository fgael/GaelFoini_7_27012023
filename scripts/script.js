// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");
// Récupération des champs de recherche avancée
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appareils");
const ustensilsInput = document.getElementById("input-ustensile");
const inputElements = [ingredientsInput, appliancesInput, ustensilsInput];

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

    // Initialisation des tableaux pour les ingrédients, appareils et ustensiles correspondant à la recherche
    const matchingIngredients = [];
    const matchingAppliances = [];
    const matchingUstensils = [];

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
        const applianceMatch = recipe.appliance
          .toLowerCase()
          .includes(query.toLowerCase());
        const ustensilsMatch = recipe.ustensils.filter((ustensil) =>
            ustensil.toLowerCase().includes(query.toLowerCase())
          );
        if (
          titleMatch ||
          ingredientsMatch.length > 0 ||
          descriptionMatch ||
          applianceMatch ||
          ustensilsMatch.length > 0
        ) {
          // Ajout des ingrédients, appareils et ustensiles correspondant à la recherche
          matchingIngredients.push(...ingredientsMatch);
          if (applianceMatch) {
            matchingAppliances.push(recipe.appliance);
          }
          matchingUstensils.push(...ustensilsMatch);


          return recipe;
        }
      })
      .filter(Boolean);
    // Affichage des recettes filtrées
    displayRecipes(results);
    displayFilteredSelectContent(results);
    searchFilteredSelectContent(results)

    function searchFilteredSelectContent(data) {
      inputElements.forEach(function(element) {
        element.addEventListener("keyup", () => {
          const query = element.value.toLowerCase();
          
          const filteredResults = {
            ingredients: [],
            appliances: [],
            ustensils: [],
          };
          
          const ingredientsSet = new Set(); // ensemble pour stocker les ingrédients sans doublons
          const ustensilsSet = new Set(); // ensemble pour stocker les ustensiles sans doublons
          
          data.forEach(item => {
            // filtrer les ingrédients
            item.ingredients.forEach(ingredient => {
              if (ingredient.ingredient.toLowerCase().includes(query)) {
                ingredientsSet.add(ingredient.ingredient.toLowerCase());
              }
            });
            
            // filtrer les appareils
            if (item.appliance.toLowerCase().includes(query)) {
              filteredResults.appliances.push(item.appliance);
            }
            
            // filtrer les ustensiles
            item.ustensils.forEach(ustensil => {
              if (ustensil.toLowerCase().includes(query)) {
                ustensilsSet.add(ustensil.toLowerCase());
              }
            });
          });
          
          // convertir les ensembles en tableaux
          filteredResults.ingredients = capitalizeFirstLetter(Array.from(ingredientsSet));
          filteredResults.ustensils = capitalizeFirstLetter(Array.from(ustensilsSet));
          
          selectButtonFactory(filteredResults.ingredients, filteredResults.appliances, filteredResults.ustensils);
        })
      })
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
        const ingredientName = ingredient.ingredient;
        if (!ingredients.includes(ingredientName)) {
          ingredients.push(ingredientName);
        }
      });
      return ingredients;
    }, [])
  );

  const appliancesList = capitalizeFirstLetter(
    data.reduce((appliances, recipe) => {
      const applianceName = recipe.appliance;
      if (!appliances.includes(applianceName)) {
        appliances.push(applianceName);
      }
      return appliances;
    }, [])
  );

  const ustensilsList = capitalizeFirstLetter(
    data.reduce((ustensils, recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil)) {
          ustensils.push(ustensil);
        }
      });
      return ustensils;
    }, [])
  );

  // Création de l'élément contenant la liste des ingrédients
  selectButtonFactory(ingredientsList, appliancesList, ustensilsList);
}

async function displayFilteredSelectContent(data) {
  const ingredientsList = capitalizeFirstLetter(data.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)));
  const appliancesList = capitalizeFirstLetter(data.map(recipe => recipe.appliance));
  const ustensilsList = capitalizeFirstLetter(data.flatMap(recipe => recipe.ustensils));

  // Création de l'élément contenant la liste des ingrédients
  selectButtonFactory(ingredientsList, appliancesList, ustensilsList);
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

  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCard.createRecipeCard();
    recipesGrid.appendChild(recipeCardDOM);
  });
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
