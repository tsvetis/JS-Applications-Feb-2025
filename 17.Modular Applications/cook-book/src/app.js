import page from "//unpkg.com/page/page.mjs";

import { renderNavigation } from "./views/navigation.js";
import createPage from "./views/create.js";
import homePage from "./views/home.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import registerPage from "./views/register.js";
import detailsPage from "./views/details.js";

// This will execute before each navigation
page(renderNavigation);

// Execute by route
page("/", homePage);
page("/details/:recipeId", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/logout", logoutPage);

// Start router
page();
