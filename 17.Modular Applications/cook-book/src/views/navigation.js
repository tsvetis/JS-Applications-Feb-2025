import { html, render } from "https://unpkg.com/lit-html";
import { classMap } from "https://unpkg.com/lit-html/directives/class-map.js";

const headerSection = document.getElementById("site-header");

const tempalte = (isAuthenticated, pathname) => {
  const setActive = (hrefPathname) =>
    classMap({ active: pathname === hrefPathname });

  return html`
    <h1>My Cookbook</h1>
    <nav>
      <a href="/" class=${setActive("/")}>Catalog</a>
      ${isAuthenticated
        ? html`<div id="user">
            <a href="/create" class=${setActive("/create")}>Create Recipe</a>
            <a href="/logout">Logout</a>
          </div>`
        : html`<div id="guest">
            <a href="/login" class=${setActive("/login")}>Login</a>
            <a href="/register" class=${setActive("/register")}>Register</a>
          </div>`}
    </nav>
  `;
};

export function renderNavigation(ctx, next) {
  const email = localStorage.getItem("email");
  const isAuthenticated = email?.length > 0;

  render(tempalte(isAuthenticated, ctx.pathname), headerSection);
  next();
}
