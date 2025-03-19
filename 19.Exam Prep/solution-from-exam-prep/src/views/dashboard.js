import { html, render } from "../lib/litHtml.js";
import { getAllTattoos } from "../api/tattoo.js";

const template = (tattoos) => html`<h2>Collection</h2>
  <section id="tattoos">
    ${tattoos?.length
      ? tattoos.map(
          (t) =>
            html`<div class="tattoo">
              <img src="${t.imageUrl}" />
              <div class="tattoo-info">
                <h3 class="type">${t.type}</h3>
                <span>Uploaded by </span>
                <p class="user-type">${t.userType}</p>
                <a class="details-btn" href="/dashboard/${t._id}">Learn More</a>
              </div>
            </div>`
        )
      : html`<h2 id="no-tattoo">
          Collection is empty, be the first to contribute
        </h2>`}
  </section>`;

export async function dashboardView() {
  const tattoos = await getAllTattoos();

  render(template(tattoos));
}
