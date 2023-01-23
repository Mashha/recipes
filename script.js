async function getRecipes(e) {
    const API_key = "7497430f5d26492785e457cae7a9d0ae";
  e.preventDefault();
  let value = e.target[0].value;
  try {
    const resource = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${value}&addRecipeInformation=true`
    );
    const data = await resource.json();
    return data;
  } catch {
    (err) => console.log(err);
  }
}

document.querySelector("form").addEventListener("submit", async (e) => {
  let data = await getRecipes(e);

  data.results.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList.add("card");
    const recipeTitle = document.createElement("h1");
    recipeTitle.textContent = item.title;
    const img = document.createElement("img");
    img.classList.add("recipe-image");
    img.src = item.image;
    const readMore = document.createElement("button");
    readMore.textContent = "Read More";

    card.append(recipeTitle, img, readMore);
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.append(card);
  });
});
