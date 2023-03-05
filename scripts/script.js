import { getRecipes } from "./service/getRecipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { displaySelectTag } from "./displaySelectTag.js";
import { searchRecipes } from "./utils/searchRecipes.js";
import { searchRecipesTag } from "./utils/searchRecipeTag.js";
import { searchSelectTag } from "./utils/searchSelectTag.js";

// Récupération de l'élément input de recherche
const searchInput = document.getElementById("floatingInput");

// Fonction d'initialisation
export async function init() {
  // Récupération de toutes les recettes
  const recipes = await getRecipes();
  // Affichage de toutes les recettes dans la grille
  displayRecipes(recipes);
  // Affichage du contenu des boutons select
  displaySelectTag(recipes);
  searchSelectTag(recipes);
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value;
    const isTag = document.querySelector(".badge") !== null;
    if (query.length >= 3) {
      searchRecipes(recipes);
      if (isTag) {
        searchRecipesTag(recipes);
      }
    } else if (query.length < 3 && !isTag) {
      displayRecipes(recipes);
      displaySelectTag(recipes);
    } else if (query.length < 3 && isTag) {
      searchRecipesTag(recipes);
    }
  });
}

// Appel de la fonction d'initialisation au chargement de la page
init();