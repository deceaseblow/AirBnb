
import React, { useState, useEffect } from 'react';

import {
  getAllParisData, deleteParisHotel, addParisHotel, updateParisHotel,
  getAllLondonData, deleteLondonHotel, addLondonHotel, updateLondonHotel,
  getAllSeoulData, deleteSeoulHotel, addSeoulHotel, updateSeoulHotel,
  getAllTokyoData, deleteTokyoHotel, addTokyoHotel, updateTokyoHotel
} from '../services/hotelService';

import {
  getExperiencesTbilisi, deleteExperienceTbilisi, addExperienceTbilisi, updateExperienceTbilisi,
  getExperiencesRome, deleteExperienceRome, addExperienceRome, updateExperienceRome,
  getExperiencesFatih, deleteExperienceFatih, addExperienceFatih, updateExperienceFatih
} from '../services/experiencesService';

import {
  getServicesPhoto,
  getServicesChef,
  getServicesMassage,
  getServicesParis,

  addServicePhoto,
  addServiceChef,
  addServiceMassage,
  addServiceParis,

  updateServicePhoto,
  updateServiceChef,
  updateServiceMassage,
  updateServiceParis,

  deleteServicePhoto,
  deleteServiceChef,
  deleteServiceMassage,
  deleteServiceParis
} from '../services/servicesService';
import { useUser } from '../contexts/UsersContext';
import { useNavigate } from 'react-router-dom';
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [subTab, setSubTab] = useState('paris');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);

 const { currentUser, isSuperAdmin, loading } = useUser(); 

  const navigate = useNavigate();

  function getEmptyFormData() {
    if (activeTab === 'experiences') {
      return {
        name: '',
        price_per_person: '',
        what_you_will_do: [],
        location: {
          address: '',
          coordinates: {
            lat: '',
            lng: ''
          }
        },
        host: {
          name: '',
          is_superhost: false,
          hosting_since: '',
          rating: '',
          born: '',
          work: '',
          obsession: '',
          hobbies: [],
          languages: [],
          about_me: '',
          image: ''
        },
        reviews: [],
        things_to_know: [],
        image: '',
        images: [],
        description: ''
      };
    }

    return {
      name: '',
      price_per_night: '',
      location: {
        address: '',
        coordinates: {
          lat: '',
          lng: ''
        }
      },
      host: {
        name: '',
        is_superhost: false,
        hosting_since: '',
        rating: '',
        born: '',
        work: '',
        obsession: '',
        hobbies: [],
        languages: [],
        about_me: '',
        image: ''
      },
      sleeping_arrangements: {
        image: '',
        type: ''
      },
      amenities: [],
      reviews: [],
      image: '',
      images: [],
      description: ''
    };
  }
  useEffect(() => {
    if (loading) return; // Wait for user context to finish loading

    if (!currentUser || !isSuperAdmin) {
      navigate('/', { replace: true });
    }
  }, [currentUser, isSuperAdmin, loading, navigate]);

  useEffect(() => {
  console.log("👤 currentUser:", currentUser);
  console.log("🛡️ isSuperAdmin:", isSuperAdmin);
  console.log("⏳ loading (context):", loading);
}, [currentUser, isSuperAdmin, loading]);

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      try {
        console.log(`📊 Fetching data for ${activeTab}/${subTab}`);

        if (activeTab === 'hotels') {
          if (subTab === 'paris') setData(await getAllParisData());
          else if (subTab === 'london') setData(await getAllLondonData());
          else if (subTab === 'seoul') setData(await getAllSeoulData());
          else if (subTab === 'tokyo') setData(await getAllTokyoData());
        }
        else if (activeTab === 'experiences') {
          if (subTab === 'tbilisi') setData(await getExperiencesTbilisi());
          else if (subTab === 'rome') setData(await getExperiencesRome());
          else if (subTab === 'fatih') setData(await getExperiencesFatih());
        }
        else if (activeTab === 'services') {
          if (subTab === 'photo') setData(await getServicesPhoto());
          else if (subTab === 'chef') setData(await getServicesChef());
          else if (subTab === 'massage') setData(await getServicesMassage());
          else if (subTab === 'paris') setData(await getServicesParis());
        }

        console.log(`✅ Successfully fetched ${data.length} items`);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        alert('Error fetching data: ' + error.message);
      } finally {
        setDataLoading(false);
      }
    }

    if (subTab) {
      fetchData();
    }
  }, [activeTab, subTab]);

  const findItemById = (id) => {
    const item = data.find(item => item.id === id);
    console.log(`🔍 Finding item with ID ${id}:`, item);
    return item;
  };

  const handleViewDetails = (id) => {
    const item = findItemById(id);
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleDelete = async (id) => {
    console.log(`🗑️ DELETE REQUEST - ID: ${id}, Tab: ${activeTab}, SubTab: ${subTab}`);

    if (!window.confirm('Are you sure you want to delete this item?')) {
      console.log('❌ Delete cancelled by user');
      return;
    }

    try {
      console.log(`🎯 Attempting to delete item ${id} from ${activeTab}/${subTab}`);

      let deleteFunction;
      let functionName;

      if (activeTab === 'hotels') {
        if (subTab === 'paris') {
          deleteFunction = deleteParisHotel;
          functionName = 'deleteParisHotel';
        } else if (subTab === 'london') {
          deleteFunction = deleteLondonHotel;
          functionName = 'deleteLondonHotel';
        } else if (subTab === 'seoul') {
          deleteFunction = deleteSeoulHotel;
          functionName = 'deleteSeoulHotel';
        } else if (subTab === 'tokyo') {
          deleteFunction = deleteTokyoHotel;
          functionName = 'deleteTokyoHotel';
        }
      }
      else if (activeTab === 'experiences') {
        if (subTab === 'tbilisi') {
          deleteFunction = deleteExperienceTbilisi;
          functionName = 'deleteExperienceTbilisi';
        } else if (subTab === 'rome') {
          deleteFunction = deleteExperienceRome;
          functionName = 'deleteExperienceRome';
        } else if (subTab === 'fatih') {
          deleteFunction = deleteExperienceFatih;
          functionName = 'deleteExperienceFatih';
        }
      }
      else if (activeTab === 'services') {
        if (subTab === 'photo') {
          deleteFunction = deleteServicePhoto;
          functionName = 'deleteServicePhoto';
        } else if (subTab === 'chef') {
          deleteFunction = deleteServiceChef;
          functionName = 'deleteServiceChef';
        } else if (subTab === 'massage') {
          deleteFunction = deleteServiceMassage;
          functionName = 'deleteServiceMassage';
        } else if (subTab === 'paris') {
          deleteFunction = deleteServiceParis;
          functionName = 'deleteServiceParis';
        }
      }

      if (!deleteFunction) {
        throw new Error(`No delete function found for ${activeTab}/${subTab}`);
      }

      console.log(`Calling ${functionName}(${id})`);
      console.log(`Function exists:`, typeof deleteFunction === 'function');

      const result = await deleteFunction(id);
      console.log(` Delete result:`, result);

      setData(prevData => {
        const newData = prevData.filter(item => item.id !== id);
        console.log(`📊 Updated local data. Before: ${prevData.length}, After: ${newData.length}`);
        return newData;
      });

      console.log('🎉 Item deleted successfully');

    } catch (error) {
      console.error('❌ Delete error:', error);
      console.error('📍 Error stack:', error.stack);
      alert('Error deleting item: ' + error.message);
    }
  };

  const handleAdd = () => {
    console.log(`➕ Opening add modal for ${activeTab}`);
    setIsUpdate(false);
    setCurrentId(null);
    setFormData(getEmptyFormData());
    setIsModalOpen(true);
  };

  const handleUpdate = (id) => {
    console.log(`📝 UPDATE REQUEST - ID: ${id}, Tab: ${activeTab}, SubTab: ${subTab}`);

    const item = findItemById(id);
    if (!item) {
      console.error(`❌ Item with ID ${id} not found in data:`, data);
      alert('Item not found');
      return;
    }

    console.log(`📋 Found item for update:`, item);

    setIsUpdate(true);
    setCurrentId(id);

    const emptyForm = getEmptyFormData();
    const updatedFormData = {
      ...emptyForm,
      ...item,
      location: {
        ...emptyForm.location,
        ...item.location,
        coordinates: {
          ...emptyForm.location.coordinates,
          ...item.location?.coordinates
        }
      },
      host: {
        ...emptyForm.host,
        ...item.host,
        hobbies: Array.isArray(item.host?.hobbies) ? item.host.hobbies : [],
        languages: Array.isArray(item.host?.languages) ? item.host.languages : []
      },
      sleeping_arrangements: activeTab === 'hotels' ? {
        ...emptyForm.sleeping_arrangements,
        ...item.sleeping_arrangements
      } : undefined,
      amenities: Array.isArray(item.amenities) ? item.amenities : [],
      what_you_will_do: Array.isArray(item.what_you_will_do) ? item.what_you_will_do : [],
      things_to_know: Array.isArray(item.things_to_know) ? item.things_to_know : [],
      reviews: Array.isArray(item.reviews) ? item.reviews : [],
      images: Array.isArray(item.images) ? item.images : []
    };

    console.log(`📋 Prepared form data for update:`, updatedFormData);
    setFormData(updatedFormData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`💾 SUBMIT REQUEST - Mode: ${isUpdate ? 'UPDATE' : 'CREATE'}`);
    console.log(`📍 Target: ${activeTab}/${subTab}, ID: ${currentId}`);
    console.log(`📋 Form data:`, formData);

    try {
      let result;
      let functionName;
      let targetFunction;

      if (activeTab === 'hotels') {
        if (subTab === 'paris') {
          targetFunction = isUpdate ? updateParisHotel : addParisHotel;
          functionName = isUpdate ? 'updateParisHotel' : 'addParisHotel';
        } else if (subTab === 'london') {
          targetFunction = isUpdate ? updateLondonHotel : addLondonHotel;
          functionName = isUpdate ? 'updateLondonHotel' : 'addLondonHotel';
        } else if (subTab === 'seoul') {
          targetFunction = isUpdate ? updateSeoulHotel : addSeoulHotel;
          functionName = isUpdate ? 'updateSeoulHotel' : 'addSeoulHotel';
        } else if (subTab === 'tokyo') {
          targetFunction = isUpdate ? updateTokyoHotel : addTokyoHotel;
          functionName = isUpdate ? 'updateTokyoHotel' : 'addTokyoHotel';
        }
      }
      else if (activeTab === 'experiences') {
        if (subTab === 'tbilisi') {
          targetFunction = isUpdate ? updateExperienceTbilisi : addExperienceTbilisi;
          functionName = isUpdate ? 'updateExperienceTbilisi' : 'addExperienceTbilisi';
        } else if (subTab === 'rome') {
          targetFunction = isUpdate ? updateExperienceRome : addExperienceRome;
          functionName = isUpdate ? 'updateExperienceRome' : 'addExperienceRome';
        } else if (subTab === 'fatih') {
          targetFunction = isUpdate ? updateExperienceFatih : addExperienceFatih;
          functionName = isUpdate ? 'updateExperienceFatih' : 'addExperienceFatih';
        }
      }
      else if (activeTab === 'services') {
        if (subTab === 'photo') {
          targetFunction = isUpdate ? updateServicePhoto : addServicePhoto;
          functionName = isUpdate ? 'updateServicePhoto' : 'addServicePhoto';
        } else if (subTab === 'chef') {
          targetFunction = isUpdate ? updateServiceChef : addServiceChef;
          functionName = isUpdate ? 'updateServiceChef' : 'addServiceChef';
        } else if (subTab === 'massage') {
          targetFunction = isUpdate ? updateServiceMassage : addServiceMassage;
          functionName = isUpdate ? 'updateServiceMassage' : 'addServiceMassage';
        } else if (subTab === 'paris') {
          targetFunction = isUpdate ? updateServiceParis : addServiceParis;
          functionName = isUpdate ? 'updateServiceParis' : 'addServiceParis';
        }
      }

      if (!targetFunction) {
        throw new Error(`No ${isUpdate ? 'update' : 'add'} function found for ${activeTab}/${subTab}`);
      }

      console.log(`🚀 Calling ${functionName}`);
      console.log(`📋 Function exists:`, typeof targetFunction === 'function');
      console.log(`📋 Parameters:`, isUpdate ? [currentId, formData] : [formData]);

      if (isUpdate) {
        result = await targetFunction(currentId, formData);
      } else {
        result = await targetFunction(formData);
      }

      console.log(` ${functionName} result:`, result);

      if (!result) {
        throw new Error('No result returned from API');
      }

      if (isUpdate) {
        setData(prevData => {
          const newData = prevData.map(item => (item.id === currentId ? result : item));
          console.log(`📊 Updated item in local data`);
          return newData;
        });
      } else {
        setData(prevData => {
          const newData = [...prevData, result];
          console.log(`📊 Added new item to local data. Count: ${newData.length}`);
          return newData;
        });
      }

      setIsModalOpen(false);
      console.log(`🎉 ${isUpdate ? 'Update' : 'Create'} successful`);

    } catch (error) {
      console.error(`❌ ${isUpdate ? 'Update' : 'Create'} error:`, error);
      console.error('📍 Error stack:', error.stack);
      alert(`Error ${isUpdate ? 'updating' : 'saving'} item: ` + error.message);
    }
  };

  const handleInputChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayChange = (path, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    handleInputChange(path, array);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
        <strong>Info:</strong> {activeTab}/{subTab} | Items: {data.length} |
        Modal: {isModalOpen ? 'Open' : 'Closed'} |
        Mode: {isUpdate ? 'Update' : 'Create'} |
        Current ID: {currentId || 'None'}
      </div>

      <div className="flex gap-4 mb-6">
        {['hotels', 'experiences', 'services'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              console.log(`🔄 Switching to tab: ${tab}`);
              setActiveTab(tab);
              if (tab === 'hotels') setSubTab('paris');
              else if (tab === 'experiences') setSubTab('tbilisi');
              else if (tab === 'services') setSubTab('photo');
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {activeTab === 'hotels' && ['paris', 'london', 'seoul', 'tokyo'].map(city => (
          <button
            key={city}
            className={`px-3 py-1 rounded ${subTab === city ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => {
              console.log(`🔄 Switching to subtab: ${city}`);
              setSubTab(city);
            }}
          >
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </button>
        ))}
        {activeTab === 'experiences' && ['tbilisi', 'rome', 'fatih'].map(city => (
          <button
            key={city}
            className={`px-3 py-1 rounded ${subTab === city ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => {
              console.log(`🔄 Switching to subtab: ${city}`);
              setSubTab(city);
            }}
          >
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </button>
        ))}
        {activeTab === 'services' && ['photo', 'chef', 'massage', 'paris'].map(service => (
          <button
            key={service}
            className={`px-3 py-1 rounded ${subTab === service ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => {
              console.log(`🔄 Switching to subtab: ${service}`);
              setSubTab(service);
            }}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : subTab ? (
        <div>
          <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
            Add New {activeTab.slice(0, -1)}
          </button>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  {activeTab === 'hotels' && <th className="border p-2">Price/Night</th>}
                  {activeTab === 'experiences' && <th className="border p-2">Price/Person</th>}
                  <th className="border p-2">Location/Address</th>
                  {(activeTab === 'hotels' || activeTab === 'experiences') && <th className="border p-2">Host</th>}
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    {activeTab === 'hotels' && <td className="border p-2">${item.price_per_night}</td>}
                    {activeTab === 'experiences' && <td className="border p-2">${item.price_per_person}</td>}
                    <td className="border p-2">{item.location?.address || item.description || 'N/A'}</td>
                    {(activeTab === 'hotels' || activeTab === 'experiences') && <td className="border p-2">{item.host?.name || 'N/A'}</td>}
                    <td className="border p-2">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleViewDetails(item.id)}
                        >
                          View Details
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleUpdate(item.id)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Select a sub-category</p>
      )}

      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Item Details</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Basic Info</h3>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Name:</strong> {selectedItem.name}</p>
                  {selectedItem.price_per_night && <p><strong>Price/Night:</strong> ${selectedItem.price_per_night}</p>}
                  {selectedItem.price_per_person && <p><strong>Price/Person:</strong> ${selectedItem.price_per_person}</p>}
                  {selectedItem.description && <p><strong>Description:</strong> {selectedItem.description}</p>}
                </div>

                {selectedItem.location && (
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p><strong>Address:</strong> {selectedItem.location.address}</p>
                    {selectedItem.location.coordinates && (
                      <p><strong>Coordinates:</strong> {selectedItem.location.coordinates.lat}, {selectedItem.location.coordinates.lng}</p>
                    )}
                  </div>
                )}
              </div>

              {selectedItem.host && (
                <div>
                  <h3 className="font-semibold">Host Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p><strong>Name:</strong> {selectedItem.host.name}</p>
                      <p><strong>Superhost:</strong> {selectedItem.host.is_superhost ? 'Yes' : 'No'}</p>
                      <p><strong>Hosting Since:</strong> {selectedItem.host.hosting_since}</p>
                      <p><strong>Rating:</strong> {selectedItem.host.rating}/5</p>
                      <p><strong>Born:</strong> {selectedItem.host.born}</p>
                      <p><strong>Work:</strong> {selectedItem.host.work}</p>
                      <p><strong>Obsession:</strong> {selectedItem.host.obsession}</p>
                    </div>
                    <div>
                      <p><strong>Hobbies:</strong> {selectedItem.host.hobbies?.join(', ') || 'None'}</p>
                      <p><strong>Languages:</strong> {selectedItem.host.languages?.join(', ') || 'None'}</p>
                      <p><strong>About:</strong> {selectedItem.host.about_me}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedItem.sleeping_arrangements && (
                <div>
                  <h3 className="font-semibold">Sleeping Arrangements</h3>
                  <p><strong>Type:</strong> {selectedItem.sleeping_arrangements.type}</p>
                </div>
              )}

              {selectedItem.amenities && selectedItem.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold">Amenities</h3>
                  <p>{selectedItem.amenities.join(', ')}</p>
                </div>
              )}

              {selectedItem.what_you_will_do && selectedItem.what_you_will_do.length > 0 && (
                <div>
                  <h3 className="font-semibold">What You Will Do</h3>
                  <ul className="list-disc pl-5">
                    {selectedItem.what_you_will_do.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.things_to_know && selectedItem.things_to_know.length > 0 && (
                <div>
                  <h3 className="font-semibold">Things to Know</h3>
                  <ul className="list-disc pl-5">
                    {selectedItem.things_to_know.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.reviews && selectedItem.reviews.length > 0 && (
                <div>
                  <h3 className="font-semibold">Reviews</h3>
                  <div className="space-y-2">
                    {selectedItem.reviews.map((review, index) => (
                      <div key={index} className="border p-2 rounded">
                        <p><strong>{review.reviewer}</strong> - {review.rating}/5 stars</p>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.image && (
                <div>
                  <h3 className="font-semibold">Main Image</h3>
                  <img src={selectedItem.image} alt="Main" className="w-full max-w-md h-48 object-cover rounded" />
                </div>
              )}

              {selectedItem.images && selectedItem.images.length > 0 && (
                <div>
                  <h3 className="font-semibold">Additional Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedItem.images.map((img, index) => (
                      <img key={index} src={img} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4">
            <h2 className="text-xl mb-4">{isUpdate ? 'Update Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                {activeTab === 'hotels' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per Night</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      value={formData.price_per_night || ''}
                      onChange={(e) => handleInputChange('price_per_night', parseFloat(e.target.value) || '')}
                    />
                  </div>
                )}

                {activeTab === 'experiences' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per Person</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      value={formData.price_per_person || ''}
                      onChange={(e) => handleInputChange('price_per_person', parseFloat(e.target.value) || '')}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formData.location?.address || ''}
                      onChange={(e) => handleInputChange('location.address', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        className="w-full border p-2 rounded"
                        value={formData.location?.coordinates?.lat || ''}
                        onChange={(e) => handleInputChange('location.coordinates.lat', parseFloat(e.target.value) || '')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        className="w-full border p-2 rounded"
                        value={formData.location?.coordinates?.lng || ''}
                        onChange={(e) => handleInputChange('location.coordinates.lng', parseFloat(e.target.value) || '')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {(activeTab === 'hotels' || activeTab === 'experiences') && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Host Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Host Name</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.host?.name || ''}
                        onChange={(e) => handleInputChange('host.name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={formData.host?.is_superhost || false}
                          onChange={(e) => handleInputChange('host.is_superhost', e.target.checked)}
                        />
                        Is Superhost
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Hosting Since</label>
                      <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.host?.hosting_since || ''}
                        onChange={(e) => handleInputChange('host.hosting_since', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full border p-2 rounded"
                        value={formData.host?.rating || ''}
                        onChange={(e) => handleInputChange('host.rating', parseFloat(e.target.value) || '')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Born</label>
                      <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.host?.born || ''}
                        onChange={(e) => handleInputChange('host.born', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Work</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.host?.work || ''}
                        onChange={(e) => handleInputChange('host.work', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Obsession</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.host?.obsession || ''}
                        onChange={(e) => handleInputChange('host.obsession', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Host Image URL</label>
                      <input
                        type="url"
                        className="w-full border p-2 rounded"
                        value={formData.host?.image || ''}
                        onChange={(e) => handleInputChange('host.image', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Hobbies (comma-separated)</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.host?.hobbies?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('host.hobbies', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Languages (comma-separated)</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.host?.languages?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('host.languages', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">About Me</label>
                      <textarea
                        className="w-full border p-2 rounded"
                        rows={3}
                        value={formData.host?.about_me || ''}
                        onChange={(e) => handleInputChange('host.about_me', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'hotels' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sleeping Arrangements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={formData.sleeping_arrangements?.type || ''}
                        onChange={(e) => handleInputChange('sleeping_arrangements.type', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bedroom Image URL</label>
                      <input
                        type="url"
                        className="w-full border p-2 rounded"
                        value={formData.sleeping_arrangements?.image || ''}
                        onChange={(e) => handleInputChange('sleeping_arrangements.image', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'hotels' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Amenities (comma-separated)</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={formData.amenities?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('amenities', e.target.value)}
                  />
                </div>
              )}
              {activeTab === 'experiences' && (
                <div>
                  <label className="block text-sm font-medium mb-1">What You Will Do (comma-separated)</label>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={3}
                    value={formData.what_you_will_do?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('what_you_will_do', e.target.value)}
                  />
                </div>
              )}
              {activeTab === 'experiences' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Things to Know (comma-separated)</label>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={3}
                    value={formData.things_to_know?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('things_to_know', e.target.value)}
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Main Image URL</label>
                    <input
                      type="url"
                      className="w-full border p-2 rounded"
                      value={formData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Additional Images (comma-separated URLs)</label>
                    <textarea
                      className="w-full border p-2 rounded"
                      rows={2}
                      value={formData.images?.join(', ') || ''}
                      onChange={(e) => handleArrayChange('images', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isUpdate ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;