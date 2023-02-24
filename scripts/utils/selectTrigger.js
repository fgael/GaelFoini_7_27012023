function toggleResultMenu(result, container, input, arrow, placeholder, placeholder_search) {
   result.classList.toggle("d-none");
   container.parentElement.parentElement.classList.toggle("col-md-6");
   input.placeholder = result.classList.contains("d-none") ? placeholder : placeholder_search;
   arrow.classList.toggle("rotate-img_event");
 }

function hideResultMenu(result, container, input, placeholder) {
   result.classList.add("d-none");
   container.parentElement.parentElement.classList.remove("col-md-6");
   input.placeholder = placeholder;
 }

const displayTypes = [
   { containerId: 'container-ingredients', inputId: 'input-ingredients', resultId: 'result-menu-ingredients', arrowId: '#container-ingredients img', placeholderText: 'Ingrédients' },
   { containerId: 'container-appareils', inputId: 'input-appareils', resultId: 'result-menu-appareils', arrowId: '#container-appareils img', placeholderText: 'Appareils' },
   { containerId: 'container-ustensile', inputId: 'input-ustensile', resultId: 'result-menu-ustensile', arrowId: '#container-ustensile img', placeholderText: 'Ustensiles' }
 ];

displayTypes.forEach(displayType => {
   const container = document.getElementById(displayType.containerId);
   const input = document.getElementById(displayType.inputId);
   const result = document.getElementById(displayType.resultId);
   const arrow = document.querySelector(displayType.arrowId);
   const placeholder = displayType.placeholderText;
   const placeholder_search = "Rechercher un " + placeholder.slice(0, -1);

   container.addEventListener('click', () => {
      toggleResultMenu(result, container, input, arrow, placeholder, placeholder_search);
   });

   document.addEventListener('click', (event) => {
      if (!container.contains(event.target) && !result.contains(event.target) && event.target !== input) {
         hideResultMenu(result, container, input, placeholder);
      }
   });
});