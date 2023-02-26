import tagBadgeFactory from "../factory/tagBadgeFactory.js";

export default function selectButtonFactory(ingredientsList, appliancesList, ustensilsList) {

  // Création de l'élément contenant la liste des ingrédients
  const ingredientsContainer = document.getElementById("result-menu-ingredients");
  ingredientsContainer.innerHTML = "";
  const ingredientsListContainer = document.createElement("div");
  ingredientsListContainer.classList.add("row");
  ingredientsList.forEach((ingredient) => {
    const ingredientCol = document.createElement("div");
    ingredientCol.classList.add("col-6", "col-md-4");
    ingredientCol.textContent = ingredient;
    ingredientCol.addEventListener("click", () => {
      tagBadgeFactory(ingredient, "text-bg-primary")
    })
    ingredientsListContainer.appendChild(ingredientCol);
  });
  ingredientsContainer.appendChild(ingredientsListContainer);

  // Création de l'élément contenant la liste des appareils
  const appliancesContainer = document.getElementById("result-menu-appareils");
  appliancesContainer.innerHTML = "";
  const appliancesListContainer = document.createElement("div");
  appliancesListContainer.classList.add("row");
  appliancesList.forEach((appliance) => {
    const applianceCol = document.createElement("div");
    applianceCol.classList.add("col-6", "col-md-4");
    applianceCol.textContent = appliance;
    applianceCol.addEventListener("click", () => {
      tagBadgeFactory(appliance, "text-bg-success")
    })
    appliancesListContainer.appendChild(applianceCol);
  });
  appliancesContainer.appendChild(appliancesListContainer);

  // Création de l'élément contenant la liste des ustensiles
  const ustensilsContainer = document.getElementById("result-menu-ustensile");
  ustensilsContainer.innerHTML = "";
  const ustensilsListContainer = document.createElement("div");
  ustensilsListContainer.classList.add("row");
  ustensilsList.forEach((ustensil) => {
    const ustensilCol = document.createElement("div");
    ustensilCol.classList.add("col-6", "col-md-4");
    ustensilCol.textContent = ustensil;
    ustensilCol.addEventListener("click", () => {
      tagBadgeFactory(ustensil, "text-bg-danger")
    })
    ustensilsListContainer.appendChild(ustensilCol);
  });
  ustensilsContainer.appendChild(ustensilsListContainer);
}