import page from "//unpkg.com/page/page.mjs";
import auth from "../api/auth.js";

export default function logoutPage(ctx) {
  auth.logout().finally(() => {
    localStorage.clear();
    page.redirect("/");
  });
}
