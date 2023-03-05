import { init } from "../script.js";
import { searchRecipesTag } from "../utils/searchRecipeTag.js";

export async function tagBadgeFactory(recipes, element, color, type) {
  const tagContainer = document.getElementById("tagContainer");
  const searchInput = document.getElementById("floatingInput");
  const closeImgPath = "assets/icons/cross.svg";

  // Verifie si un tag avec le meme textContent existe
  const existingTag = Array.from(tagContainer.children).find(
    (tag) => tag.querySelector(".tag").textContent === element
  );
  if (existingTag) {
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
      init()
    } else {
      searchRecipesTag(recipes);
    }
  });
  tagBadge.appendChild(tagName);
  tagBadge.appendChild(imgClose);
  tagContainer.appendChild(tagBadge);
  searchRecipesTag(recipes);
}