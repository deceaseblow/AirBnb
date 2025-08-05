import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL ;

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data;
};

export const createUser = async (userData) => {
  const { confirmPassword, ...dataWithoutConfirm } = userData;

  console.log("🚀 Creating user with:", dataWithoutConfirm); 

  const res = await axios.post(`${BASE_URL}/users`, dataWithoutConfirm);
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

export const addToWishlistService = async (user, hotelId) => {
  if (!user) throw new Error('No user provided');

  if (user.wishlist?.includes(hotelId)) {
    return user; 
  }

  const updatedUser = {
    ...user,
    wishlist: [...(user.wishlist || []), hotelId],
  };
  const savedUser = await updateUser(user.id, updatedUser);

  return savedUser;
};

export const removeFromWishlistService = async (user, hotelId) => {
  if (!user) throw new Error('No user provided');

  const updatedUser = {
    ...user,
    wishlist: (user.wishlist || []).filter(id => id !== hotelId),
  };

  const savedUser = await updateUser(user.id, updatedUser);

  return savedUser;
};


