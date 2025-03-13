import { html, render } from "https://unpkg.com/lit-html";
import page from "//unpkg.com/page/page.mjs";
import auth from "../api/auth.js";

const mainEl = document.querySelector("main");

export default function registerPage() {
  render(template(), mainEl);
}

function template() {
  return html`
    <section class="view-section" id="register-section">
      <article>
        <h2>Register</h2>
        <form @submit=${registerUser}>
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <label>Repeat: <input type="password" name="rePass" /></label>
          <input type="submit" value="Register" />
        </form>
      </article>
    </section>
  `;
}

function registerUser(e) {
  e.preventDefault();

  const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

  auth
    .register(email, password)
    .then(() => {
      page.redirect("/");
    })
    .catch((err) => alert(err.message));
}
