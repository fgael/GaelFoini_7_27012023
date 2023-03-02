const results = recipes.filter((recipe) => {
  let matchFound = false;
  const lowerCaseQuery = query.toLowerCase();

  // Vérifie si le nom de la recette correspond à la recherche
  if (recipe.name.toLowerCase().includes(lowerCaseQuery)) {
    matchFound = true;
  }

  // Vérifie si au moins un ingrédient correspond à la recherche
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (
      recipe.ingredients[i].ingredient.toLowerCase().includes(lowerCaseQuery)
    ) {
      matchFound = true;
      matchingIngredientsSet.add(
        recipe.ingredients[i].ingredient.toLowerCase()
      );
    }
  }

  // Vérifie si la description correspond à la recherche
  if (recipe.description.toLowerCase().includes(lowerCaseQuery)) {
    matchFound = true;
  }

  // Ajoute l'appareil et les ustensiles correspondant à la recette
  if (matchFound) {
    matchingAppliancesSet.add(recipe.appliance);

    for (let i = 0; i < recipe.ustensils.length; i++) {
      matchingUstensilsSet.add(recipe.ustensils[i].toLowerCase());
    }

    return true;
  }

  return false;
});
