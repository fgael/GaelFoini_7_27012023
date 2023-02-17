function recipeCardFactory(data) {
  // Récupération des données de la recette
  const recipe = data;
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipe;

  // Fonction pour créer un élément de recette dans le DOM
  function createRecipeCard() {
    // Création de la carte de recette
    const clockImgPath ="assets/icons/horloge.svg"
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12");

    // Mise en place du contenu HTML de la carte
    recipeCard.innerHTML = `
      <div class="card" >
        <div class="card-background"></div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0 col-lg-7 col-md-8">${name}</h5>
            <div class="card-title mb-0 d-flex align-items-center">
              <img src=${clockImgPath} alt="clock">
              <p class="mb-0 ms-1">${time} min</p>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
          <div class="text-start ingredients">
            ${ingredients.map((ingredient) => {
              // !Ne pas indenter le return! cela crée des espaces.
              return `<p class="mb-0">
                        <span>${ingredient.ingredient}</span>${ingredient.quantity ? ": " + ingredient.quantity : ""}
                        ${ingredient.unit ? ingredient.unit : ""}
                      </p>`;
            }).join("")}
          </div>
            <p class="mb-0 w-50 text-start description">
              ${description}
            </p>
          </div>
        </div>
      </div>
    </div>`;

    return recipeCard;
  }

  return { createRecipeCard };
}
