import page from "//unpkg.com/page/page.mjs";

import { renderNavigation } from "./src/utils/navigation.js";
import createPage from "./src/views/create.js";
import homePage from "./src/views/home.js";
import loginPage from "./src/views/login.js";
import logoutPage from "./src/views/logout.js";
import registerPage from "./src/views/register.js";
import detailsPage from "./src/views/details.js";

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
