import { clearUserData, getUserData } from "../utils/user.js";

const host = "http://localhost:3030";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    const response = await fetch(`${host}${url}`, options);

    if (!response.ok) {
      const error = await response.json();

      if (response.status === 403 && error.message === "Invalid access token") {
        clearUserData();
      }

      throw new Error(error.message);
    }

    if (response.status === 204) {
      return response; // promise
    } else {
      return response.json(); // json
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = (url) => request("GET", url);
export const post = (url, data) => request("POST", url, data);
export const put = (url, data) => request("PUT", url, data);
export const del = (url) => request("DELETE", url);
