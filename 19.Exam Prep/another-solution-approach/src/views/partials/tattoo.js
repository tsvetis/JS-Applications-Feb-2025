import { html } from '../../lib.js';

export const tattooTemplate = (data) => html`
 <div class="tattoo">
            <img src="${data.imageUrl}" alt="example1" />
            <div class="tattoo-info">
              <h3 class="type">${data.type}</h3>
              <span>Uploaded by </span>
              <p class="user-type">${data.userType}</p>
              <a class="details-btn" href="/catalog/${data._id}">Learn More</a>
            </div>
</div>`;