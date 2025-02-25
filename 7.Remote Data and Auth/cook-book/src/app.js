const baseUrl = "http://localhost:3030/data/recipes";
const mainElement = document.querySelector("body>main");

function initNavigation() {
  const email = localStorage.getItem("email");
  const isLoggedIn = email?.length > 0;

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    location.href = "/cook-book/index.html";
    localStorage.removeItem("email");
  });

  if (isLoggedIn) {
    const userNavigation = document.getElementById("user");
    userNavigation.style.display = "block";
  } else {
    const guestNavigation = document.getElementById("guest");
    guestNavigation.style.display = "block";
  }
}

function loadRecipes() {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      mainElement.innerHTML = "";

      const recipes = Object.values(data);

      mainElement.append(...recipes.map(renderArticle));
    })
    .catch((err) => alert(err.message));
}

function renderArticle(article) {
  const h2Element = document.createElement("h2");
  h2Element.textContent = article.name;

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.appendChild(h2Element);

  const imgElemnt = document.createElement("img");
  imgElemnt.src = article.img;

  const smallDiv = document.createElement("div");
  smallDiv.classList.add("small");
  smallDiv.appendChild(imgElemnt);

  const articleElement = document.createElement("article");
  articleElement.classList.add("preview");
  articleElement.appendChild(titleDiv);
  articleElement.appendChild(smallDiv);

  articleElement.addEventListener("click", () => {
    fetch(`${baseUrl}/${article._id}`)
      .then((res) => res.json())
      .then((data) => {
        mainElement.innerHTML = "";
        // render the new view

        const articleElement = renderArticleDetails(data);
        mainElement.appendChild(articleElement);
      })
      .catch((err) => alert(err.message));
  });

  return articleElement;
}

function renderArticleDetails(article) {
  const articleElement = document.createElement("article");
  articleElement.innerHTML = `
            <h2>${article.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${article.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${article.ingredients
                          .map((i) => `<li>${i}</li>`)
                          .join("\n")}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                 ${article.steps.map((step) => `<p>${step}</p>`).join("\n")}
            </div>
    `;

  return articleElement;
}

loadRecipes();
initNavigation();
