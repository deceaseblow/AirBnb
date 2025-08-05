import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL 

async function getAllParisData() {
  try {
    const res = await axios.get(`${BASE_URL}/hotelsParis`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Paris data:", error);
    throw error;
  }
}

async function getAllLondonData() {
  try {
    const res = await axios.get(`${BASE_URL}/hotelsLondon`);
    return res.data;
  } catch (error) {
    console.error("Error fetching London data:", error);
    throw error;
  }
}

async function getAllSeoulData() {
  try {
    const res = await axios.get(`${BASE_URL}/hotelsSeoul`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Seoul data:", error);
    throw error;
  }
}

async function getAllTokyoData() {
  try {
    const res = await axios.get(`${BASE_URL}/hotelsTokyo`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Tokyo data:", error);
    throw error;
  }
}
async function addParisHotel(hotelData) {
  try {
    const res = await axios.post(`${BASE_URL}/hotelsParis`, hotelData);
    return res.data;
  } catch (error) {
    console.error("Error adding Paris hotel:", error);
    throw error;
  }
}

async function addLondonHotel(hotelData) {
  try {
    const res = await axios.post(`${BASE_URL}/hotelsLondon`, hotelData);
    return res.data;
  } catch (error) {
    console.error("Error adding London hotel:", error);
    throw error;
  }
}

async function addSeoulHotel(hotelData) {
  try {
    const res = await axios.post(`${BASE_URL}/hotelsSeoul`, hotelData);
    return res.data;
  } catch (error) {
    console.error("Error adding Seoul hotel:", error);
    throw error;
  }
}

async function addTokyoHotel(hotelData) {
  try {
    const res = await axios.post(`${BASE_URL}/hotelsTokyo`, hotelData);
    return res.data;
  } catch (error) {
    console.error("Error adding Tokyo hotel:", error);
    throw error;
  }
}
async function updateParisHotel(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/hotelsParis/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating Paris hotel:", error);
    throw error;
  }
}

async function updateLondonHotel(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/hotelsLondon/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating London hotel:", error);
    throw error;
  }
}

async function updateSeoulHotel(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/hotelsSeoul/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating Seoul hotel:", error);
    throw error;
  }
}

async function updateTokyoHotel(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/hotelsTokyo/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating Tokyo hotel:", error);
    throw error;
  }
}
async function deleteParisHotel(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/hotelsParis/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting Paris hotel:", error);
    throw error;
  }
}

async function deleteLondonHotel(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/hotelsLondon/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting London hotel:", error);
    throw error;
  }
}

async function deleteSeoulHotel(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/hotelsSeoul/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting Seoul hotel:", error);
    throw error;
  }
}

async function deleteTokyoHotel(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/hotelsTokyo/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting Tokyo hotel:", error);
    throw error;
  }
}
export {
  getAllParisData,
  getAllLondonData,
  getAllSeoulData,
  getAllTokyoData,

  addParisHotel,
  addLondonHotel,
  addSeoulHotel,
  addTokyoHotel,

  updateParisHotel,
  updateLondonHotel,
  updateSeoulHotel,
  updateTokyoHotel,

  deleteParisHotel,
  deleteLondonHotel,
  deleteSeoulHotel,
  deleteTokyoHotel
}
