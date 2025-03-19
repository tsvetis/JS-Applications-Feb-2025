import { html, render } from "../lib/litHtml.js";
import { page } from "../lib/page.js";
import { createTattoo } from "../api/tattoo.js";

const template = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Add tattoo</h2>
    <form class="create-form" @submit=${onSubmit}>
      <input type="text" name="type" id="type" placeholder="Tattoo Type" />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
      ></textarea>
      <select id="user-type" name="user-type">
        <option value="" disabled selected>Select your role</option>
        <option value="Tattoo Artist">Tattoo Artist</option>
        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
        <option value="First Time in Tattoo">First Time in Tattoo</option>
        <option value="Tattoo Collector">Tattoo Collector</option>
      </select>
      <button type="submit">Add tattoo</button>
    </form>
  </div>
</section>`;

export function createView() {
  render(template(createFormSubmitHandler));
}

async function createFormSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const type = formData.get("type");
  const imageUrl = formData.get("image-url");
  const description = formData.get("description");
  const userType = formData.get("user-type");

  if (!type || !imageUrl || !description || !userType) {
    return alert("All fields are required!");
  }

  await createTattoo({
    type,
    imageUrl,
    description,
    userType,
  });

  page.redirect("/dashboard");
}
