import { deleteTattoo, getTattooById } from "../api/tattoo.js";
import { html, render } from "../lib/litHtml.js";
import { page } from "../lib/page.js";
import { getUserData } from "../utils/user.js";

const template = (tattoo, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${tattoo.imageUrl}" alt="example1" />
    <div>
      <div id="info-wrapper">
        <p id="details-type">${tattoo.type}</p>
        <div id="details-description">
          <p id="user-type">${tattoo.userType}</p>
          <p id="description">${tattoo.description}</p>
        </div>
        <h3>Like tattoo:<span id="like">0</span></h3>

        ${
          isOwner
            ? html`<div id="action-buttons">
                <a href="/edit/${tattoo._id}" id="edit-btn">Edit</a>
                <a id="delete-btn" @click=${onDelete}>Delete</a>
              </div>`
            : null
        }
              <!--Bonus - Only for logged-in users ( not authors )-->
              <a href="#" id="like-btn">Like</a>
            </div>
      </div>
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const { id } = ctx.params;

  const tattoo = await getTattooById(id);
  const userData = getUserData();
  const isOwner = userData?._id === tattoo?._ownerId;

  render(template(tattoo, isOwner, () => deleteHandler(id)));
}

async function deleteHandler(id) {
  const choice = confirm("Are you sure?");

  if (!choice) {
    returns;
  }

  await deleteTattoo(id);

  page.redirect("/dashboard");
}
