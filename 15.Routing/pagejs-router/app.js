// import page from "//unpkg.com/page/page.mjs"; // CDN
import page from "./node_modules/page/page.mjs";

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

function catalogPage(ctx) {
  // !XSS Warn, demo only
  rootDiv.innerHTML = `
        <h1>Catalog Page</h1>
      `;
}

function catalogDetails(ctx) {
  console.log(ctx);

  // !XSS Warn, demo only
  rootDiv.innerHTML = `
  <h3>Catalog ID: ${ctx.params.itemId}</h3>
  <h1>Catalog Details</h1>
`;
}

page("/", homePage);
page("/about", aboutPage);
page("/contacts", contactsPage);
page("/catalog", catalogPage);
page("/catalog/:itemId", catalogDetails);
page.start();
