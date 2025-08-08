  import React, { createContext, useContext, useState, useEffect } from 'react';
  import {
    getUsers,
    updateUser,
    deleteUser,
    addToWishlistService,
    removeFromWishlistService,
    getUserById
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
    const sanitizeUser = (user) => ({
      ...user,
      interests: Array.isArray(user.interests) ? user.interests : [],
      languages_spoken: Array.isArray(user.languages_spoken) ? user.languages_spoken : [],
      places_visited: Array.isArray(user.places_visited) ? user.places_visited : [],
    });
   useEffect(() => {
  const initialize = async () => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const freshUser = await getUserById(parsed.id);
        const sanitized = sanitizeUser(freshUser);
        setCurrentUser(sanitized);
        localStorage.setItem('currentUser', JSON.stringify(sanitized));
      }

      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Initialization error:", err);
      setError("Failed to initialize user data");
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } finally {
      setLoading(false); 
    }
  };

  initialize();
}, []);


    const login = async (username, password) => {
      const allUsers = await getUsers();
      const user = allUsers.find(u => u.username === username && u.password === password);
      if (user) {
        const sanitized = sanitizeUser(user);
        setCurrentUser(sanitized);
        localStorage.setItem('currentUser', JSON.stringify(sanitized));
        return { success: true, user: sanitized };
      }
      return { success: false, message: 'Invalid credentials' };
    };


    const logout = () => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    };

    const isInWishlist = (id) => {
      return currentUser?.wishlist?.includes(id);
    };

  const addToWishlist = async (hotelId) => {
    if (!currentUser) return;

    try {
      const updatedUser = await addToWishlistService(currentUser, hotelId);
      const sanitized = sanitizeUser(updatedUser);
      setCurrentUser(sanitized);
      localStorage.setItem('currentUser', JSON.stringify(sanitized));
    } catch (err) {
      console.error('Add to wishlist failed:', err);
    }
  };

  const removeFromWishlist = async (hotelId) => {
    if (!currentUser) return;

    try {
      const updatedUser = await removeFromWishlistService(currentUser, hotelId);
      const sanitized = sanitizeUser(updatedUser);
      setCurrentUser(sanitized);
      localStorage.setItem('currentUser', JSON.stringify(sanitized));
    } catch (err) {
      console.error('Remove from wishlist failed:', err);
    }
  };

    const updateUserData = async (id, data) => {
      const updated = await updateUser(id, data);
      setUsers((prev) => prev.map(u => u.id === id ? updated : u));
      if (currentUser?.id === id) {
        const sanitized = sanitizeUser(updated);
        setCurrentUser(sanitized);
        localStorage.setItem('currentUser', JSON.stringify(sanitized));
      }

    };
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
      deleteUserData,
    };

    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
  };
