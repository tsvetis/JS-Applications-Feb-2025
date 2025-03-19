import { getUserData } from "../utils/user.js";
import { get, post } from "./api.js";

const endpoints = {
  like: "/data/likes",
  likesByTattooId: (tattooId) =>
    `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`,
  likesByUserId: (tattooId, userId) =>
    `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function likeTattoo(tattooId) {
  return post(endpoints.like, { tattooId });
}

export async function getLikesByTattooId(tattooId) {
  const userData = getUserData();

  const requests = [get(endpoints.likesByTattooId(tattooId))];

  if (userData) {
    requests.push(get(endpoints.likesByUserId(tattooId, userData._id)));
  }

  const [likes, hasLiked] = await Promise.all(requests);

  return {
    likes,
    hasLiked: Boolean(hasLiked),
  };
}
