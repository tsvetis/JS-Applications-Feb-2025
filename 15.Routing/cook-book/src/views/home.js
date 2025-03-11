import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = "http://localhost:3030/data/recipes";

const mainEl = document.querySelector("main");

export default async function homePage() {
  const recipes = await getRecipes();
  render(allRecipesTemplate(recipes), mainEl);
}

async function getRecipes() {
  const res = await fetch(baseUrl);
  const data = await res.json();

  return data;
}

function allRecipesTemplate(recipes) {
  const recipeDetailsHandler = (recipeId) => {
    page.redirect(`/details/${recipeId}`);
  };

  return html`
    ${recipes.map((recipe) =>
      singleRecipeTemplate(recipe, recipeDetailsHandler)
    )}
  `;
}

function singleRecipeTemplate(recipe, onClick) {
  return html`
    <article class="preview" @click=${() => onClick(recipe._id)}>
      <div class="title">
        <h2>${recipe.name}</h2>
      </div>

      <div class="small">
        <img src=${recipe.img} alt="Recipe image" />
      </div>
    </article>
  `;
}
