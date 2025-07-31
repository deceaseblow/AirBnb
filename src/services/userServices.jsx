import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const updateUser = async (id, updatedData) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
  return res.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/users/${id}`);
  return id;
};

export const addToWishlistService = async (userId, itemId) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  const user = res.data;
  const updatedUser = {
    ...user,
    wishlist: user.wishlist?.includes(itemId)
      ? user.wishlist
      : [...(user.wishlist || []), itemId]
  };
  return updateUser(userId, updatedUser);
};

export const removeFromWishlistService = async (userId, itemId) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  const user = res.data;
  const updatedUser = {
    ...user,
    wishlist: (user.wishlist || []).filter((id) => id !== itemId)
  };
  return updateUser(userId, updatedUser);
};
