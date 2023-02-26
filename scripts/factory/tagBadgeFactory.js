export default function tagBadgeFactory(element, color){
  const closeImgPath = "assets/icons/cross.svg"
  const tagContainer = document.getElementById("tagContainer")
  const tagBadge = document.createElement("span");
  const tagName = document.createElement("p");
  const imgClose = document.createElement("img");

  // creation tag
  tagContainer.innerHTML = "";
  tagBadge.classList.add("badge", color, "d-flex", "justify-content-center", "align-items-center", "px-3")
  tagName.classList.add("m-0")
  tagName.textContent = element;
  imgClose.src = closeImgPath;
  imgClose.alt = "Supprimer tag"
  imgClose.classList.add("ps-3", "close")
  imgClose.addEventListener("click", () => {
    tagContainer.innerHTML = "";
  })
  tagBadge.appendChild(tagName)
  tagBadge.appendChild(imgClose)
  tagContainer.appendChild(tagBadge)
}