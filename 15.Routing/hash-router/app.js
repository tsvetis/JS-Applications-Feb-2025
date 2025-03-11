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
  "#home": homePage,
  "#about": aboutPage,
  "#contacts": contactsPage,
};

function initNavigation() {
  window.addEventListener("hashchange", () => {
    routes[location.hash]();
  });

  const keys = Object.keys(routes);
  if (keys.includes(location.hash)) {
    routes[location.hash]();
  } else {
    routes["#home"]();
  }
}

initNavigation();
