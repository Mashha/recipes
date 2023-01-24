async function getRecipes(e) {
  const API_key = "7497430f5d26492785e457cae7a9d0ae";
  e.preventDefault();
  let value = e.target[0].value;
  if (value === null) {
    return;
  } else {
    try {
      const resource = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${value}&addRecipeInformation=true`,
        { mode: "cors" }
      );
      const data = await resource.json();
      return data;
    } catch {
      (err) => console.log(err);
    }
  }
}

document.querySelector("form").addEventListener("submit", async (e) => {
  const inputValue = document.querySelector("#input-value");
  if (inputValue.value === "") {
    return;
  } else {
    let data = await getRecipes(e);
    displayAllRecipes(data);
  }
});

function displayAllRecipes(data) {
  clearCards();
  for (let i = 0; i < data.results.length; i++) {
    displaySingleRecipe(data.results[i]);
  }
}

function displaySingleRecipe(item) {
  const card = document.createElement("div");
  card.classList.add("card");
  const recipeTitle = document.createElement("h3");
  recipeTitle.textContent = item.title;
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("img-container");
  const img = document.createElement("img");
  img.classList.add("recipe-image");
  img.src = item.image;
  imageContainer.appendChild(img);
  const readMore = document.createElement("button");
  readMore.classList.add("button");
  readMore.textContent = "Read More";

  card.append(recipeTitle, imageContainer, readMore);
  const recipeContainer = document.querySelector(".recipe-container-inner");
  recipeContainer.append(card);

  readMore.addEventListener("click", function () {
    //open in new window
    window.open(item.spoonacularSourceUrl, "_blank");

    //open in modal
    // const modalContainer = document.createElement("div")
    // modalContainer.classList.add("modal-container")
    // const modal = document.createElement("iframe")
    // const close = document.createElement("span")
    // close.classList.add("close-modal")
    // close.textContent = "X"
    // modal.src = item.spoonacularSourceUrl
    // modal.classList.add("recipe-modal", "modal")
    // modalContainer.append(close, modal)
    // document.body.append(modalContainer)
    // modalContainer.style.display = "flex"
    // const wrapper = document.querySelector(".wrapper")
    // wrapper.classList.add("blur")

    // close.addEventListener("click", function(){
    //   modalContainer.remove()
    //   modalContainer.style.display = "none"
    //   wrapper.classList.remove("blur")
    // })
  });
  clearInput();

  const recipeSection = document.querySelector("#recipes");
  recipeSection.scrollIntoView({ behavior: "smooth" });
}

function clearInput() {
  const input = document.querySelector("#input-value");
  input.value = "";
}

function clearCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}
