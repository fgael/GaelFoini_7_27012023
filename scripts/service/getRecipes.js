// Fonction de récupération des données de recettes depuis le fichier JSON
export async function getRecipes() {
  try {
    // Récupération du fichier JSON avec fetch
    const res = await fetch("data/recipes.json");
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