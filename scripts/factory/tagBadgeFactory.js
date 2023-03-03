import { searchRecipeTag } from "../script.js";
import { init } from "../script.js";
import { getRecipes } from "../script.js";
import { searchInput } from "../script.js";


export async function tagBadgeFactory(element, color, type){

  const recipes = await getRecipes();
  const closeImgPath = "assets/icons/cross.svg"
  const tagContainer = document.getElementById("tagContainer");
  const tagBadge = document.createElement("span");
  const tagName = document.createElement("p");
  const imgClose = document.createElement("img");

  // creation tag
  tagBadge.classList.add("badge", color, "d-flex", "justify-content-center", "align-items-center", "px-3", "mt-3")
  tagName.classList.add("m-0", "tag")
  tagName.setAttribute("id", type)
  tagName.textContent = element;
  imgClose.src = closeImgPath;
  imgClose.alt = "Supprimer tag"
  imgClose.classList.add("ps-3", "close")
  imgClose.addEventListener("click", () => {
    console.log(searchInput.value)
    tagBadge.remove();
    const tagsLeft = document.querySelectorAll(".tag");
    if (tagsLeft.length === 0 && !searchInput.value) {
      init();
    } else {
      searchRecipeTag(recipes)
    }
  });
  
  tagBadge.appendChild(tagName)
  tagBadge.appendChild(imgClose)
  tagContainer.appendChild(tagBadge)
  searchRecipeTag(recipes)
}
