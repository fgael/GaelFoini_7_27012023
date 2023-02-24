class Display {
  constructor(container, input, result, arrow, placeholder) {
     this.container = document.getElementById(container);
     this.container_gp = this.container.parentElement.parentElement;
     this.input = document.getElementById(input);
     this.result = document.getElementById(result);
     this.arrow = document.querySelector(arrow);

     // placeholder
     this.placeholder = placeholder;
     this.placeholder_search = "Rechercher un " + placeholder;
  }

  toggleResultMenu() {
     this.result.classList.toggle("d-none");
     this.container_gp.classList.toggle("col-md-6");
     this.input.placeholder = this.result.classList.contains("d-none") ? this.placeholder : this.placeholder_search;
     this.arrow.classList.toggle("rotate-img_event");
  }

  hideResultMenu() {
     this.result.classList.add("d-none");
     this.container_gp.classList.remove("col-md-6");
     this.input.placeholder = this.placeholder;
  }
}

const displayTypes = [
  { containerId: 'container-ingredients', inputId: 'input-ingredients', resultId: 'result-menu-ingredients', arrowId: '#container-ingredients img', placeholderText: 'Ingrédients' },
  { containerId: 'container-appareils', inputId: 'input-appareils', resultId: 'result-menu-appareils', arrowId: '#container-appareils img', placeholderText: 'Appareils' },
  { containerId: 'container-ustensile', inputId: 'input-ustensile', resultId: 'result-menu-ustensile', arrowId: '#container-ustensile img', placeholderText: 'Ustensiles' }
];

displayTypes.forEach(displayType => {
  let POO = new Display(
     displayType.containerId,
     displayType.inputId,
     displayType.resultId,
     displayType.arrowId,
     displayType.placeholderText);

  POO.container.addEventListener('click', () => {
     POO.toggleResultMenu();
  });
});
