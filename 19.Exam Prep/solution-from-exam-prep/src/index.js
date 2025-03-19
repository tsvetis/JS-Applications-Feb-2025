import { page } from "./lib/page.js";

import { homeView } from "./views/home.js";
import { detailsView } from "./views/details.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { editView } from "./views/edit.js";
import { renderNavigation } from "./middlewares/navigation.js";

// Middlewares
page(renderNavigation);

// Routing pages
page("/", homeView);
page("/dashboard", dashboardView);
page("/dashboard/:id", detailsView);
page("/edit/:id", editView);
page("/create", createView);

page("/login", loginView);
page("/logout", logoutView);
page("/register", registerView);

// Start pagejs
page();
