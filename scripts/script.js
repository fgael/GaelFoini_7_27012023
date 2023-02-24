// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");

// Ajout d'un écouteur d'événement sur l'input à chaque frappe sur le clavier
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
        const titleMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
        const ingredientsMatch = recipe.ingredients.filter(
          (ingredient) => ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
        );
        const applianceMatch = recipe.appliance.toLowerCase().includes(query.toLowerCase());
        const ustensilsMatch = recipe.ustensils.filter((ustensil) =>
          ustensil.toLowerCase().includes(query.toLowerCase())
        );
        const descriptionMatch = recipe.description.toLowerCase().includes(query.toLowerCase());

        if (titleMatch || ingredientsMatch.length > 0 || applianceMatch || ustensilsMatch.length > 0 || descriptionMatch) {
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
    displayData(results);

    // Affichage des ingrédients, appareils et ustensiles correspondant à la recherche
    const matchingIngredientsCapitalized = capitalizeFirstLetter([...new Set(matchingIngredients)]);
    const matchingAppliancesCapitalized = capitalizeFirstLetter([...new Set(matchingAppliances)]);
    const matchingUstensilsCapitalized = capitalizeFirstLetter([...new Set(matchingUstensils)]);

    const matchingResults = {
      ingredients: matchingIngredientsCapitalized,
      appliances: matchingAppliancesCapitalized,
      ustensils: matchingUstensilsCapitalized,
    };

    displayFilteredSelectContent(matchingResults);
  } catch (error) {
    console.log(error);
  }
}


function capitalizeFirstLetter(list) {
  return list.map((item) => {
    if (typeof item === "string") {
      return item.charAt(0).toUpperCase() + item.slice(1);
    } else {
      return item;
    }
  });
}

async function displayFilteredSelectContent(data) {
  const uniqueIngredients = data.ingredients.filter((item, index) => {
    return (
      data.ingredients.findIndex((obj) => {
        return obj.ingredient.toLowerCase() === item.ingredient.toLowerCase();
      }) === index
    );
  });
  
  const ingredientsList = capitalizeFirstLetter(uniqueIngredients.map(item => item.ingredient));
  const appliancesList = capitalizeFirstLetter(data.appliances);
  const ustensilsList = capitalizeFirstLetter(data.ustensils);

  // Création de l'élément contenant la liste des ingrédients
  const ingredientsContainer = document.getElementById('result-menu-ingredients');
  ingredientsContainer.innerHTML = "";
  const ingredientsListContainer = document.createElement("div");
  ingredientsListContainer.classList.add("row");
  ingredientsList.forEach((ingredient) => {
    const ingredientCol = document.createElement("div");
    ingredientCol.classList.add("col-6", "col-md-4");
    ingredientCol.textContent = ingredient;
    ingredientsListContainer.appendChild(ingredientCol);
  });
  ingredientsContainer.appendChild(ingredientsListContainer);

  // Création de l'élément contenant la liste des appareils
  const appliancesContainer = document.getElementById('result-menu-appareils');
  appliancesContainer.innerHTML = "";
  const appliancesListContainer = document.createElement("div");
  appliancesListContainer.classList.add("row");
  appliancesList.forEach((appliance) => {
    const applianceCol = document.createElement("div");
    applianceCol.classList.add("col-6", "col-md-4");
    applianceCol.textContent = appliance;
    appliancesListContainer.appendChild(applianceCol);
  });
  appliancesContainer.appendChild(appliancesListContainer);

  // Création de l'élément contenant la liste des ustensiles
  const ustensilsContainer = document.getElementById('result-menu-ustensile');
  ustensilsContainer.innerHTML = "";
  const ustensilsListContainer = document.createElement("div");
  ustensilsListContainer.classList.add("row");
  ustensilsList.forEach((ustensil) => {
    const ustensilCol = document.createElement("div");
    ustensilCol.classList.add("col-6", "col-md-4");
    ustensilCol.textContent = ustensil;
    ustensilsListContainer.appendChild(ustensilCol);
  });
  ustensilsContainer.appendChild(ustensilsListContainer);
}

async function displaySelectContent(data) {

  // Exécuter le code avec les ingrédients
  const ingredientsList = capitalizeFirstLetter(data.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient;
      if (!ingredients.includes(ingredientName)) {
        ingredients.push(ingredientName);
      }
    });
    return ingredients;
  }, []));

const appliancesList = capitalizeFirstLetter(data.reduce((appliances, recipe) => {
  const applianceName = recipe.appliance;
  if (!appliances.includes(applianceName)) {
    appliances.push(applianceName);
  }
  return appliances;
}, []));

const ustensilsList = capitalizeFirstLetter(data.reduce((ustensils, recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    if (!ustensils.includes(ustensil)) {
      ustensils.push(ustensil);
    }
  });
  return ustensils;
}, []));
    
    // Création de l'élément contenant la liste des ingrédients
    const ingredientsContainer = document.getElementById('result-menu-ingredients');
    ingredientsContainer.innerHTML = ""
    const ingredientsListContainer = document.createElement("div");
    ingredientsListContainer.classList.add("row");
    ingredientsList.forEach((ingredient) => {
      const ingredientCol = document.createElement("div");
      ingredientCol.classList.add("col-6", "col-md-4");
      ingredientCol.textContent = ingredient;
      ingredientsListContainer.appendChild(ingredientCol);
    });
    ingredientsContainer.appendChild(ingredientsListContainer);

    // Création de l'élément contenant la liste des appareils
    const appliancesContainer = document.getElementById('result-menu-appareils');
    appliancesContainer.innerHTML = ""
    const appliancesListContainer = document.createElement("div");
    appliancesListContainer.classList.add("row");
    appliancesList.forEach((appliance) => {
      const applianceCol = document.createElement("div");
      applianceCol.classList.add("col-6", "col-md-4");
      applianceCol.textContent = appliance;
      appliancesListContainer.appendChild(applianceCol);
    });
    appliancesContainer.appendChild(appliancesListContainer);

    // Création de l'élément contenant la liste des ustensiles
    const ustensilsContainer = document.getElementById('result-menu-ustensile');
    ustensilsContainer.innerHTML = ""
    const ustensilsListContainer = document.createElement("div");
    ustensilsListContainer.classList.add("row");
    ustensilsList.forEach((ustensil) => {
      const ustensilCol = document.createElement("div");
      ustensilCol.classList.add("col-6", "col-md-4");
      ustensilCol.textContent = ustensil;
      ustensilsListContainer.appendChild(ustensilCol);
    });
    ustensilsContainer.appendChild(ustensilsListContainer);
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
function displayData(recipes) {

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
  displayData(recipes);
  // Affichage du contenu des boutons select
  displaySelectContent(recipes);
}

// Appel de la fonction d'initialisation au chargement de la page
init();
