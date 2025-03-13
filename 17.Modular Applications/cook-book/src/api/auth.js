const baseUrl = `http://localhost:3030/users`;

function login(email, password) {
  return fetch(`${baseUrl}/login`, {
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
      localStorage.setItem("_id", data._id);
    });
}

function register(email, password) {
  return fetch(`${baseUrl}/register`, {
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
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("email", data.email);
      localStorage.setItem("_id", data._id);
    });
}

function logout() {
  const token = localStorage.getItem("accessToken");

  return fetch(`${baseUrl}/logout`, {
    headers: {
      "X-Authorization": token,
    },
  });
}

const auth = {
  login,
  register,
  logout,
};

export default auth;
