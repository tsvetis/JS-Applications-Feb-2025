import { html, render } from "https://unpkg.com/lit-html";
import page from "//unpkg.com/page/page.mjs";
import recipes from "../api/recipes.js";

const mainEl = document.querySelector("main");

export default function createPage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`
    <section class="view-section" id="create-section">
      <article>
        <h2>New Recipe</h2>
        <form @submit=${createRecipeHandler}>
          <label
            >Name: <input type="text" name="name" placeholder="Recipe name"
          /></label>
          <label
            >Image: <input type="text" name="img" placeholder="Image URL"
          /></label>
          <label class="ml"
            >Ingredients:
            <textarea
              name="ingredients"
              placeholder="Enter ingredients on separate lines"
            ></textarea>
          </label>
          <label class="ml"
            >Preparation:
            <textarea
              name="steps"
              placeholder="Enter preparation steps on separate lines"
            ></textarea>
          </label>
          <input type="submit" value="Create Recipe" />
        </form>
      </article>
    </section>
  `;
}

function createRecipeHandler(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  data.ingredients = data.ingredients.split("\n");
  data.steps = data.steps.split("\n");

  recipes
    .create(data)
    .then(() => {
      page.redirect("/");
    })
    .catch((err) => console.error(err.message));
}
