const containerInputIngrédients = document.getElementById('container-ingredients');
const resultMenuIngredient = document.getElementById('result-menu-ingredients');
const inputIngredient = document.getElementById('input-ingredients');
const imgArrow = document.querySelector("#container-ingredients img");

// Display select
containerInputIngrédients.addEventListener('click', () => {
   resultMenuIngredient.classList.toggle("d-none");
   containerInputIngrédients.style.width = resultMenuIngredient.classList.contains('d-none') ? "100%" : "650px";
   inputIngredient.placeholder = resultMenuIngredient.classList.contains('d-none') ? "Ingrédients" : "Rechercher un ingrédient";
   imgArrow.src = resultMenuIngredient.classList.contains('d-none') ? "assets/icons/arrow-down.svg" : "assets/icons/arrow-up.svg";
});

// Hide select
document.addEventListener('click', (event) => {
   if (!containerInputIngrédients.contains(event.target) && !resultMenuIngredient.contains(event.target)) {
      resultMenuIngredient.classList.add("d-none");
      containerInputIngrédients.style.width = "100%";
      inputIngredient.placeholder = resultMenuIngredient.classList.contains('d-none') ? "Ingrédients" : "Rechercher un ingrédient";
      imgArrow.src = resultMenuIngredient.classList.contains('d-none') ? "assets/icons/arrow-down.svg" : "assets/icons/arrow-up.svg";
   }
});