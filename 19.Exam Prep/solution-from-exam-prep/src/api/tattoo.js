import { get, post, put, del } from "./api.js";

export async function getAllTattoos() {
  return get("/data/tattoos?sortBy=_createdOn%20desc");
}

export async function getTattooById(id) {
  return get(`/data/tattoos/${id}`);
}

export async function createTattoo({ type, imageUrl, description, userType }) {
  return post("/data/tattoos", {
    type,
    imageUrl,
    description,
    userType,
  });
}

export async function updateTattoo(id, data) {
  return put(`/data/tattoos/${id}`, data);
}

export async function deleteTattoo(id) {
  return del(`/data/tattoos/${id}`);
}
