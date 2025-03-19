import { html, render } from "../lib/litHtml.js";
import { page } from "../lib/page.js";
import { login } from "../api/user.js";

const template = (onSubmit) => html`<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form class="login-form" @submit=${onSubmit}>
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export function loginView() {
  render(template(loginFormSubmitHandler));
}

async function loginFormSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return alert("All fields are required!");
  }

  await login(email, password);

  page.redirect("/");
}
