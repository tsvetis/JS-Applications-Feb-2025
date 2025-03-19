import { html, render } from "../lib/litHtml.js";
import { getUserData } from "../utils/user.js";

const template = (isAuthenticated) => html` <a id="logo" href="/"
    ><img id="logo-img" src="./images/logo.png" alt="logo" />
  </a>
  <nav>
    <a href="/dashboard">Collection</a>
    ${isAuthenticated
      ? html`<div class="user">
          <a href="/create">Add Tattoo</a>
          <a id="logout" href="/logout">Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;

const headerEl = document.querySelector("header");

export function renderNavigation(ctx, next) {
  const userData = getUserData();
  const isAuthenticated = !!userData?.email;

  render(template(isAuthenticated), headerEl);

  next();
}
