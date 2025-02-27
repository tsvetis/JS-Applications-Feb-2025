const baseUrl = "http://localhost:3030/data/recipes";
const sectionElement = document.getElementById("home-section");

export default function homePage() {
  sectionElement.style.display = "block";

  loadRecipes();
}

function loadRecipes() {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      sectionElement.innerHTML = "";

      const recipes = Object.values(data);

      sectionElement.append(...recipes.map(renderRecipe));
    })
    .catch((err) => alert(err.message));
}

function renderRecipe(article) {
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
        sectionElement.innerHTML = "";
        // render the new view

        const articleElement = renderArticleDetails(data);
        sectionElement.appendChild(articleElement);

        const userId = localStorage.getItem("_id");

        const isOwner = data._ownerId === userId;
        console.log({ isOwner });
        if (isOwner) {
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";

          const ownerBtns = document.createElement("div");
          ownerBtns.appendChild(editBtn);
          ownerBtns.appendChild(deleteBtn);

          articleElement.appendChild(ownerBtns);
        }
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
