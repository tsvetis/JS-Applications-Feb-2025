const baseUrl = "http://localhost:3030/data/recipes";

const recipes = {
  getAll(filter) {
    let searchParamsQuery = "";

    if (filter?.search) {
      searchParamsQuery = encodeURI(`where=name like "${filter.search}"`);
    }

    const url = searchParamsQuery?.length
      ? `${baseUrl}?${searchParamsQuery}`
      : baseUrl;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  },

  getOne(id) {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
  },
  create(data) {
    const accessToken = localStorage.getItem("accessToken");

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};

export default recipes;
