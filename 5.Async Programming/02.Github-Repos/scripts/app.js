function loadRepos() {
  const reposUl = document.getElementById("repos");
  const username = document.getElementById("username").value;

  const url = `https://api.github.com/users/${username}/repos`;
  console.log({ url });

  fetch(url)
    .then((res) => res.json())
    .then((repos) => {
      reposUl.innerHTML = "";

      repos.forEach((repo) => {
        const aEl = document.createElement("a");
        aEl.href = repo.html_url;
        aEl.textContent = repo.full_name;

        const liEl = document.createElement("li");
        liEl.appendChild(aEl);

        reposUl.appendChild(liEl);
      });
    })
    .catch((err) => console.error(`Error: ${err}`));
}
