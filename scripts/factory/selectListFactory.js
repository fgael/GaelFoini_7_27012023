import { tagBadgeFactory } from "./tagBadgeFactory.js";

// récupération des éléments conteneurs
const ingredientsContainer = document.getElementById("result-menu-ingredients");
const appliancesContainer = document.getElementById("result-menu-appareils");
const ustensilsContainer = document.getElementById("result-menu-ustensile");

export function selectListFactory(
  recipes,
  ingredientsList,
  appliancesList,
  ustensilsList
) {
  if (
    ingredientsList.length > 0 ||
    appliancesList.length > 0 ||
    ustensilsList.length > 0
  ) {
    // création des éléments de liste pour chaque catégorie
    const createSelectList = (list, container, color) => {
      console.log("createSelectList")
      container.innerHTML = "";
      const listContainer = document.createElement("div");
      listContainer.classList.add("row");
      list.forEach((item) => {
        const itemCol = document.createElement("div");
        itemCol.classList.add("col-6", "col-md-4");
        itemCol.textContent = item;
        itemCol.addEventListener("click", () => {
          tagBadgeFactory(recipes, item, `text-bg-${color}`, color);
        });
        listContainer.appendChild(itemCol);
      });
      container.appendChild(listContainer);
    };
    
    // appel à la fonction createListItems pour chaque catégorie
    createSelectList(ingredientsList, ingredientsContainer, "primary");
    createSelectList(appliancesList, appliancesContainer, "success");
    createSelectList(ustensilsList, ustensilsContainer, "danger");
  } else {
    const createNoResultList = () => {
      ingredientsContainer.innerHTML =
        "<p>Aucun ingrédient ne correspond à votre critère…</p>";
      appliancesContainer.innerHTML =
        "<p>Aucun appareil ne correspond à votre critère…</p>";
      ustensilsContainer.innerHTML =
        "<p>Aucun ustensile ne correspond à votre critère…</p>";
    };
    createNoResultList();
  }
}
