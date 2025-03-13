import { html, render } from "https://unpkg.com/lit-html";
import page from "//unpkg.com/page/page.mjs";
import auth from "../api/auth.js";

const mainEl = document.querySelector("main");

export default function loginPage() {
  render(template(), mainEl);
}

function template() {
  return html`
    <section class="view-section" id="login-section">
      <article>
        <h2>Login</h2>
        <form @submit=${loginSubmitHandler}>
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <input type="submit" value="Login" />
        </form>
      </article>
    </section>
  `;
}

function loginSubmitHandler(e) {
  e.preventDefault();

  const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

  auth
    .login(email, password)
    .then(() => {
      page.redirect("/");
    })
    .catch((err) => alert(err.message));
}
