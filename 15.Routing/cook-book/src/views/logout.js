import { renderNavigation } from "../utils/navigation.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = "http://localhost:3030/users/logout";

export default function logoutPage() {
  const token = localStorage.getItem("accessToken");
  console.log({ token });

  fetch(baseUrl, {
    "X-Authorization": token,
  })
    .then(() => {
      localStorage.clear();
      page.redirect("/");

      renderNavigation();
    })
    .catch((err) => console.error(err.message));
}
