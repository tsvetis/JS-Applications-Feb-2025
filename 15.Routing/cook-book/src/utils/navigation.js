import { html, render } from "./../../node_modules/lit-html/lit-html.js";

const headerSection = document.getElementById("site-header");

const tempalte = (isAuthenticated) => html`
  <h1>My Cookbook</h1>
  <nav>
    <a href="/">Catalog</a>
    ${isAuthenticated
      ? html`<div id="user">
          <a href="/create">Create Recipe</a>
          <a href="/logout">Logout</a>
        </div>`
      : html`<div id="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>
`;

export function renderNavigation(ctx, next) {
  const email = localStorage.getItem("email");
  const isAuthenticated = email?.length > 0;

  render(tempalte(isAuthenticated), headerSection);
  next();
}
