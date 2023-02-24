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

// Fonction de recherche de recettes
async function searchRecipes(query) {
  try {
    // Récupération de toutes les recettes
    const recipes = await getRecipes();
    // Filtrage des recettes qui correspondent à la requête de recherche
    const results = recipes
      .map((recipe) => {
        const titleMatch = recipe.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchingIngredients = recipe.ingredients.filter((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
        );
        const descriptionMatch = recipe.description
          .toLowerCase()
          .includes(query.toLowerCase());
        if (titleMatch || matchingIngredients.length > 0 || descriptionMatch) {
          return recipe;
        }
      })
      .filter(Boolean);
    // Affichage des recettes filtrées
    displayData(results);
  } catch (error) {
    console.log(error);
  }
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
async function displayData(recipes) {
  const recipesGrid = document.getElementById("card-grid");
  recipesGrid.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCard.createRecipeCard();
    recipesGrid.appendChild(recipeCardDOM);
  });
}

// Fonction d'initialisation de la grille de recettes
async function init() {
  // Récupération de toutes les recettes
  const recipes = await getRecipes();
  // Affichage de toutes les recettes dans la grille
  displayData(recipes);
}

// Appel de la fonction d'initialisation au chargement de la page
init();
