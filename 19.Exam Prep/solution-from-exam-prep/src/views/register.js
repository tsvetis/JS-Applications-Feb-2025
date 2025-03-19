import { html, render } from "../lib/litHtml.js";
import { page } from "../lib/page.js";
import { register } from "./../api/user.js";

const template = (onSubmit) => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${onSubmit}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export function registerView() {
  render(template(registerFormSubmitHandler));
}

async function registerFormSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("re-password");

  if (!email || !password || !rePassword) {
    return alert("All fields are required!");
  }

  if (password !== rePassword) {
    return alert("Passwords don't match!");
  }

  await register(email, password);

  page.redirect("/");
}
