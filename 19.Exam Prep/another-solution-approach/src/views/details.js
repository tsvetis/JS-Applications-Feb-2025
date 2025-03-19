import { deleteTattoo, getTattooById } from '../data/tattoo.js';
import { getLikesByTattooId, likeTattoo } from '../data/likes.js';
import { html, page, render } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, likes, hasUser, hasLiked, isOwner, onLike, onDelete) => html`
 <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${data.imageUrl}
              alt="example1"
            />
            <div>
              <div id="info-wrapper">
                <p id="details-type">${data.type}</p>
                <div id="details-description">
                  <p id="user-type">${data.userType}</p>
                  <p id="description">
                  ${data.description}
                  </p>
                </div>
                <h3>Like tattoo:<span id="like">${likes}</span></h3>
                <!--Edit and Delete are only for creator-->
                ${hasUser ? html`
                <div id="action-buttons">
                ${isOwner ? html`
                  <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                  <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                    ` : null}
                    ${hasLiked ? null : html`
                  <!--Bonus - Only for logged-in users ( not authors )-->
                  <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
                  `}
                </div>
                ` : null}
              </div>
            </div>
          </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;

    const [data, likesInfo] = await Promise.all([
        getTattooById(id),
        getLikesByTattooId(id)
    ]);

    const userData = getUserData();

    const isOwner = userData?._id == data._ownerId;
    const hasLiked = likesInfo.hasLiked || isOwner;

    render(detailsTemplate(data, likesInfo.likes, Boolean(userData), hasLiked, isOwner, onLike, onDelete));

    async function onLike() {
        await likeTattoo(id);

        page.redirect('/catalog/' + id);
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (!choice) {
            return;
        }

        await deleteTattoo(id);

        page.redirect('/catalog');
    }
}