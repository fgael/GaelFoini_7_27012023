function recipeCardFactory(data) {
  // Récupération des données de la recette
  const recipe = data;
  const {
    name,
    ingredients,
    time,
    description,
  } = recipe;

  // Fonction pour créer un élément de recette dans le DOM
  function createRecipeCard() {
    // Création de la carte de recette
    const clockImgPath = "assets/icons/horloge.svg";
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12");

    // Création des éléments de la carte
    const card = document.createElement("div");
    card.classList.add("card");

    const cardBackground = document.createElement("div");
    cardBackground.classList.add("card-background");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("d-flex", "justify-content-between", "align-items-center");

    const title = document.createElement("h5");
    title.classList.add("card-title", "mb-0", "col-lg-7", "col-md-8");
    title.textContent = name;

    const clockContainer = document.createElement("div");
    clockContainer.classList.add("card-title", "mb-0", "d-flex", "align-items-center");

    const clockImg = document.createElement("img");
    clockImg.src = clockImgPath;
    clockImg.alt = "clock";

    const timeText = document.createElement("p");
    timeText.classList.add("mb-0", "ms-1");
    timeText.textContent = `${time} min`;

    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("d-flex", "justify-content-between", "mt-3");

    const ingredientsList = document.createElement("div");
    ingredientsList.classList.add("text-start", "ingredients");

    ingredients.forEach((ingredient) => {
      const ingredientText = document.createElement("p");
      ingredientText.classList.add("mb-0");
      const ingredientName = document.createElement("span");
      ingredientName.textContent = ingredient.ingredient;
      ingredientText.appendChild(ingredientName);
      if (ingredient.quantity) {
        const ingredientQuantity = document.createElement("span");
        ingredientQuantity.textContent = `: ${ingredient.quantity}`;
        ingredientText.appendChild(ingredientQuantity);
      }
      if (ingredient.unit) {
        const ingredientUnit = document.createElement("span");
        ingredientUnit.textContent = ` ${ingredient.unit}`;
        ingredientText.appendChild(ingredientUnit);
      }
      ingredientsList.appendChild(ingredientText);
    });

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("mb-0", "w-50", "text-start", "description");
    descriptionText.textContent = description;

    // Ajout des éléments à la carte
    recipeCard.appendChild(card);
    card.appendChild(cardBackground);
    card.appendChild(cardBody);
    cardBody.appendChild(titleContainer);
    titleContainer.appendChild(title);
    titleContainer.appendChild(clockContainer);
    clockContainer.appendChild(clockImg);
    clockContainer.appendChild(timeText);
    cardBody.appendChild(ingredientsContainer);
    ingredientsContainer.appendChild(ingredientsList);
    ingredientsContainer.appendChild(descriptionText);

    return recipeCard;
  }

  return { createRecipeCard };
}

// function recipeCardFactory(data) {
//   // Récupération des données de la recette
//   const recipe = data;
//   const {
//     name,
//     ingredients,
//     time,
//     description,
//   } = recipe;

//   // Fonction pour créer un élément de recette dans le DOM
//   function createRecipeCard() {
//     // Création de la carte de recette
//     const clockImgPath ="assets/icons/horloge.svg"
//     const recipeCard = document.createElement("div");
//     recipeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12");

//     // Mise en place du contenu HTML de la carte
//     recipeCard.innerHTML = `
//       <div class="card" >
//         <div class="card-background"></div>
//         <div class="card-body">
//           <div class="d-flex justify-content-between align-items-center">
//             <h5 class="card-title mb-0 col-lg-7 col-md-8">${name}</h5>
//             <div class="card-title mb-0 d-flex align-items-center">
//               <img src=${clockImgPath} alt="clock">
//               <p class="mb-0 ms-1">${time} min</p>
//             </div>
//           </div>
//           <div class="d-flex justify-content-between mt-3">
//           <div class="text-start ingredients">
//             ${ingredients.map((ingredient) => {
//               // !Ne pas indenter le return! cela crée des espaces.
//               return `<p class="mb-0">
//                         <span>${ingredient.ingredient}</span>${ingredient.quantity ? ": " + ingredient.quantity : ""}
//                         ${ingredient.unit ? ingredient.unit : ""}
//                       </p>`;
//             }).join("")}
//           </div>
//             <p class="mb-0 w-50 text-start description">
//               ${description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>`;

//     return recipeCard;
//   }

//   return { createRecipeCard };
// }