import { html, render } from "./../../node_modules/lit-html/lit-html.js";
const mainEl = document.querySelector("main");

const baseUrl = "http://localhost:3030/data/recipes";

async function getRecipeDetails(id) {
  const res = await fetch(`${baseUrl}/${id}`);
  const data = await res.json();

  return data;
}

export default async function detailsPage(ctx) {
  const { recipeId } = ctx.params;
  const recipe = await getRecipeDetails(recipeId);

  const userId = localStorage.getItem("_id");
  const isOwner = recipe._ownerId === userId;
  render(detailsTemplate(recipe, isOwner), mainEl);
}

function detailsTemplate(recipe, isOwner) {
  return html`
    <article>
      <h2>${recipe.name}</h2>
      <div class="band">
        <div class="thumb">
          <img src="../${recipe.img}" />
        </div>
        <div class="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            ${recipe.ingredients.map((i) => html`<li>${i}</li>`)}
          </ul>
        </div>
      </div>
      <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map((step) => html`<p>${step}</p>`)}
      </div>

      ${isOwner
        ? html`<div><button>Edit</button><button>Delete</button></div>`
        : ""}
    </article>
  `;
}
