import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUsers,
  updateUser,
  deleteUser,
  addToWishlistService,
  removeFromWishlistService
} from '../services/userServices';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Fetch all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // ✅ Login
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  // ✅ Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // ✅ Wishlist check
  const isInWishlist = (id) => {
    return currentUser?.wishlist?.includes(id);
  };

  // ✅ Add to wishlist
  const addToWishlist = async (id) => {
    if (!currentUser) return;
    const updated = await addToWishlistService(currentUser.id, id);
    setCurrentUser(updated);
    localStorage.setItem('currentUser', JSON.stringify(updated)); // keep persistent
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (id) => {
    if (!currentUser) return;
    const updated = await removeFromWishlistService(currentUser.id, id);
    setCurrentUser(updated);
    localStorage.setItem('currentUser', JSON.stringify(updated));
  };

  // ✅ Admin update user
  const updateUserData = async (id, data) => {
    const updated = await updateUser(id, data);
    setUsers((prev) => prev.map(u => u.id === id ? updated : u));
    if (currentUser?.id === id) {
      setCurrentUser(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  };

  // ✅ Admin delete user
  const deleteUserData = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter(u => u.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
  };

  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';
  const isSuperAdmin = currentUser?.role === 'super_admin';

  const value = {
    users,
    currentUser,
    loading,
    error,
    login,
    logout,
    isLoggedIn,
    isAdmin,
    isSuperAdmin,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    updateUserData,
    deleteUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
