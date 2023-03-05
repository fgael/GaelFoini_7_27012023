import { displayRecipes } from "../displayRecipes.js";
import { displaySelectTag } from "../displaySelectTag.js";
import { searchRecipesTag } from "../utils/searchRecipeTag.js";

export async function tagBadgeFactory(recipes, element, color, type) {
  console.log("tagBadgeFactory");
  const tagContainer = document.getElementById("tagContainer");
  const searchInput = document.getElementById("floatingInput");
  const closeImgPath = "assets/icons/cross.svg";

  // Check if tag with same text content already exists
  const existingTag = Array.from(tagContainer.children).find(
    (tag) => tag.querySelector(".tag").textContent === element
  );
  if (existingTag) {
    // If tag with same text content exists, don't create a new tag and return
    return;
  }

  const tagBadge = document.createElement("span");
  const tagName = document.createElement("p");
  const imgClose = document.createElement("img");

  // creation tag
  tagBadge.classList.add(
    "badge",
    color,
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "px-3",
    "mt-3"
  );
  tagName.classList.add("m-0", "tag");
  tagName.setAttribute("id", type);
  tagName.textContent = element;
  imgClose.src = closeImgPath;
  imgClose.alt = "Supprimer tag";
  imgClose.classList.add("ps-3", "close");
  imgClose.addEventListener("click", () => {
    tagBadge.remove();
    const tagsLeft = document.querySelectorAll(".tag");
    if (tagsLeft.length === 0 && !searchInput.value) {
      displayRecipes(recipes);
      displaySelectTag(recipes);
    } else {
      searchRecipesTag(recipes);
    }
  });
  tagBadge.appendChild(tagName);
  tagBadge.appendChild(imgClose);
  tagContainer.appendChild(tagBadge);
  searchRecipesTag(recipes);
}