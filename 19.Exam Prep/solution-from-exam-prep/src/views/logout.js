import { page } from "../lib/page.js";
import { logout } from "../api/user.js";

export function logoutView() {
  logout().then(() => {
    page.redirect("/");
  });
}
