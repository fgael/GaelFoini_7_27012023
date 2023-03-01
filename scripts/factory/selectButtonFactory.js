import { tagBadgeFactory } from "../factory/tagBadgeFactory.js";

// récupération des éléments conteneurs
const ingredientsContainer = document.getElementById("result-menu-ingredients");
const appliancesContainer = document.getElementById("result-menu-appareils");
const ustensilsContainer = document.getElementById("result-menu-ustensile");

export function selectButtonFactory(ingredientsList, appliancesList, ustensilsList) {

// création des éléments de liste pour chaque catégorie
const createListItems = (list, container, color) => {
container.innerHTML = "";
const listContainer = document.createElement("div");
listContainer.classList.add("row");
list.forEach((item) => {
const itemCol = document.createElement("div");
itemCol.classList.add("col-6", "col-md-4");
itemCol.textContent = item;
itemCol.addEventListener("click", () => {
tagBadgeFactory(item, `text-bg-${color}`, color);
});
listContainer.appendChild(itemCol);
});
container.appendChild(listContainer);
};

// appel à la fonction createListItems pour chaque catégorie
createListItems(ingredientsList, ingredientsContainer, "primary");
createListItems(appliancesList, appliancesContainer, "success");
createListItems(ustensilsList, ustensilsContainer, "danger");
}

// export function displayNoResult() {
//   ingredientsContainer.innerHTML = "<p>Aucun ingrédient ne correspond à votre critère…</p>";
//   appliancesContainer.innerHTML = "<p>Aucun appareil ne correspond à votre critère…</p>";
//   ustensilsContainer.innerHTML = "<p>Aucun ustensile ne correspond à votre critère…</p>";
//   console.log("toto")
// }
