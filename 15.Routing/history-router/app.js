const rootDiv = document.getElementById("root");

function homePage() {
  // !XSS Warn, demo only
  rootDiv.innerHTML = `
    <h1>Home Page</h1>
  `;
}

function aboutPage() {
  // !XSS Warn, demo only
  rootDiv.innerHTML = `
      <h1>About Page</h1>
    `;
}

function contactsPage() {
  // !XSS Warn, demo only
  rootDiv.innerHTML = `
      <h1>Contacts Page</h1>
    `;
}

const routes = {
  "/": homePage,
  "/about": aboutPage,
  "/contacts": contactsPage,
};

function navigate(pathname) {
  history.pushState(null, null, pathname);

  // Trigger popstate event on pushState
  window.dispatchEvent(new Event("popstate"));
}

function initNavigation() {
  const nav = document.getElementById("site-navigation");

  nav.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") {
      return;
    }

    // STOP default navigation
    event.preventDefault();

    // Add history based navigation
    const url = new URL(event.target.href);
    navigate(url.pathname);
  });

  // Listen for url changes
  window.addEventListener("popstate", () => {
    routes[location.pathname]();
  });

  // init of the page
  const keys = Object.keys(routes);
  if (keys.includes(location.pathname)) {
    routes[location.pathname]();
  } else {
    routes["/"]();
  }
}

initNavigation();
