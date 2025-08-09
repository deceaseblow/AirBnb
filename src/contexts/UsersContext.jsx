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
  const addToBookings = async (bookingData) => {
    if (!currentUser) {
      throw new Error('User must be logged in to make a booking');
    }

    try {
      const bookingId = Date.now() + Math.random().toString(36).substr(2, 9);
      const booking = {
        id: bookingId,
        userId: currentUser.id,
        hotelId: bookingData.hotelId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        pricePerNight: bookingData.pricePerNight,
        nights: bookingData.nights,
        subtotal: bookingData.subtotal,
        cleaningFee: bookingData.cleaningFee,
        serviceFee: bookingData.serviceFee,
        total: bookingData.total,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      const updatedUser = {
        ...currentUser,
        bookings: [...(currentUser.bookings || []), booking]
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);

      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log('Booking created successfully:', booking);
      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };
  const removeBooking = async (bookingId) => {
    if (!currentUser) {
      throw new Error('User must be logged in to remove a booking');
    }

    try {
      const updatedBookings = (currentUser.bookings || []).filter(
        (booking) => booking.id !== bookingId
      );

      const updatedUser = {
        ...currentUser,
        bookings: updatedBookings
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);

      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log(`Booking ${bookingId} removed successfully`);
    } catch (error) {
      console.error('Error removing booking:', error);
      throw error;
    }
  };
  const addServiceBooking = async (bookingData) => {
    if (!currentUser) {
      throw new Error('User must be logged in to make a booking');
    }

    try {
      const bookingId = Date.now() + Math.random().toString(36).substr(2, 9);

      const serviceBooking = {
        id: bookingId,
        userId: currentUser.id,
        // To distinguish service booking, keep serviceId and type info here:
        serviceId: bookingData.serviceId,
        serviceName: bookingData.serviceName,
        serviceImage: bookingData.serviceImage,
        typeName: bookingData.typeName,
        typePrice: bookingData.typePrice,
        typeDuration: bookingData.typeDuration,
        guests: bookingData.guests,
        bookingDate: new Date().toISOString(),
        totalPrice: bookingData.typePrice * bookingData.guests,
        status: 'confirmed',
        // Optional: mark as service booking to identify later
        isServiceBooking: true,
      };

      const updatedUser = {
        ...currentUser,
        bookings: [...(currentUser.bookings || []), serviceBooking],
        // Optionally, you can still keep serviceBookings for internal use
        // serviceBookings: [...(currentUser.serviceBookings || []), serviceBooking],
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);
      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log('Service booking added to bookings successfully:', serviceBooking);
      return serviceBooking;
    } catch (error) {
      console.error('Error adding service booking:', error);
      throw error;
    }
  };

  const removeServiceBooking = async (bookingId) => {
    if (!currentUser) {
      throw new Error('User must be logged in to remove a booking');
    }

    try {
      const updatedBookings = (currentUser.bookings || []).filter(
        (booking) => booking.id !== bookingId
      );

      const updatedUser = {
        ...currentUser,
        bookings: updatedBookings,
        // Optionally clear serviceBookings too if you keep them separately
        // serviceBookings: (currentUser.serviceBookings || []).filter(b => b.id !== bookingId),
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);
      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log('Booking removed successfully:', bookingId);
      return bookingId;
    } catch (error) {
      console.error('Error removing booking:', error);
      throw error;
    }
  };


  const addExperienceBooking = async (bookingData) => {
    if (!currentUser) {
      throw new Error('User must be logged in to make a booking');
    }

    if (!bookingData.experienceId) {
      throw new Error('experienceId is required to add an experience booking');
    }

    console.log('Adding experience booking with data:', bookingData);

    try {
      const bookingId = Date.now() + Math.random().toString(36).substr(2, 9);

      const experienceBooking = {
        id: bookingId,
        userId: currentUser.id,
        experienceId: bookingData.experienceId,
        date: bookingData.date,
        time: bookingData.time,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        isExperienceBooking: true,
      };

      const updatedUser = {
        ...currentUser,
        bookings: [...(currentUser.bookings || []), experienceBooking],
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);
      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log('Experience booking added to bookings successfully:', experienceBooking);
      return experienceBooking;
    } catch (error) {
      console.error('Error adding experience booking:', error);
      throw error;
    }
  };

  const removeExperienceBooking = async (bookingId) => {
    if (!currentUser) {
      throw new Error('User must be logged in to remove a booking');
    }

    try {
      const updatedBookings = (currentUser.bookings || []).filter(
        (booking) => booking.id !== bookingId
      );

      const updatedUser = {
        ...currentUser,
        bookings: updatedBookings,
      };

      const savedUser = await updateUser(currentUser.id, updatedUser);
      setCurrentUser(savedUser);
      localStorage.setItem('currentUser', JSON.stringify(savedUser));

      console.log('Experience booking removed successfully:', bookingId);
      return bookingId;
    } catch (error) {
      console.error('Error removing experience booking:', error);
      throw error;
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
    addToBookings,
    removeBooking,
    addServiceBooking,
    removeServiceBooking,
    addExperienceBooking,
    removeExperienceBooking
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
