import { html, render } from "https://unpkg.com/lit-html";
import page from "//unpkg.com/page/page.mjs";
import recipes from "../api/recipes.js";

const mainEl = document.querySelector("main");

function searchSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const search = formData.get("search");

  page.redirect(`/?search=${search}`);
}

export default async function homePage(ctx) {
  const searchParams = new URLSearchParams(ctx.querystring);

  const filter = {
    search: searchParams.get("search"),
  };

  // TODO: split loading indicator from search and list
  render(allRecipesTemplate(recipes, true, searchSubmitHandler), mainEl);

  recipes
    .getAll(filter)
    .then((recipes) => {
      render(allRecipesTemplate(recipes, false, searchSubmitHandler), mainEl);
    })
    .catch((err) => alert(err.message));
}

function allRecipesTemplate(recipes = [], isLoading = false, onSearch) {
  const recipeDetailsHandler = (recipeId) => {
    page.redirect(`/details/${recipeId}`);
  };

  return html`
    ${isLoading
      ? html`<div id="wrapper">
          <span class="loader"></span>
        </div>`
      : html`
          <form
            @submit=${onSearch}
            style="display:flex; justify-content:center;"
          >
            <div>
              <input type="text" name="search" style="position:unset;" />
              <input type="submit" value="Search" style="display: inline;" />
            </div>
          </form>

          ${recipes.map((recipe) =>
            singleRecipeTemplate(recipe, recipeDetailsHandler)
          )}
        `}
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
