const loginForm = document.querySelector("main article form");
const baseUrl = `http://localhost:3030/users`;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const { email, password } = Object.fromEntries(formData);

  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code >= 400) {
        return alert(data.message);
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("email", data.email);

      location.href = "/cook-book/index.html";
    })
    .catch((err) => console.error(err.message));
});
