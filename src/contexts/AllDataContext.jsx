import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const AllDataContext = createContext();

export const useAllData = () => {
  const context = useContext(AllDataContext);
  if (!context) {
    throw new Error('useAllData must be used within an AllDataProvider');
  }
  return context;
};

export const AllDataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allData`);
      return res.data;
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getAllData();
        setAllData(data);
        setError(null);
       } catch (err) {
        setError('Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const findItemById = (searchId) => {
    if (!allData || allData.length === 0) return null;
    
    let item = allData.find(item => item.id === searchId);
    
    if (!item && typeof searchId === 'string') {
      const numericId = parseInt(searchId);
      if (!isNaN(numericId)) {
        item = allData.find(item => item.id === numericId);
      }
    }
    
    if (!item && typeof searchId === 'number') {
      item = allData.find(item => item.id === searchId.toString());
    }
    
    if (!item) {
      item = allData.find(item => item.id == searchId);
    }
    
    return item;
  };

  const getItemsByType = (type) => {
    return allData.filter(item => item.type === type);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await getAllData();
      setAllData(data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    allData,
    loading,
    error,
    findItemById,
    getItemsByType,
    refreshData,
    getAllData
  };

  return (
    <AllDataContext.Provider value={value}>
      {children}
    </AllDataContext.Provider>
  );
};

export default AllDataProvider;