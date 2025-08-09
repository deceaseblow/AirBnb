import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAllData } from '../contexts/AllDataContext';
import { useUser } from '../contexts/UsersContext';
import { GoShare, GoHeart } from "react-icons/go";
import Navbar from '../components/Navbar';
import ServiceCard from './ServiceCard';
import MobileFooter from '../components/MobileFooter';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const { findItemById, error } = useAllData();
  const { currentUser, isLoggedIn, addToWishlist, removeFromWishlist, addServiceBooking } = useUser();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const service = findItemById(parseInt(id));

  const isFavorite = currentUser?.wishlist?.includes(service?.id);

  const toggleFavorite = (serviceId) => {

    if (!isLoggedIn) {
      alert('Please log in to save services.');
      return;
    }

    if (currentUser?.wishlist?.includes(serviceId)) {
      removeFromWishlist(serviceId)
        .catch(err => console.error('Error removing from wishlist:', err));
    } else {
      addToWishlist(serviceId)
        .catch(err => console.error('Error adding to wishlist:', err));
    }
  };
  const openModal = () => {
    setSelectedType(service.types[0] || null);
    setGuests(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedType(null);
  };
  const handleReserve = async () => {
    if (!selectedType) return alert("Please select a reservation type.");

    setLoading(true);

    try {
      await addServiceBooking({
        serviceId: service.id,
        serviceName: service.name,
        serviceImage: service.image || (service.images && service.images[0]),
        typeName: selectedType.name,
        typePrice: selectedType.price,
        typeDuration: selectedType.duration,
        guests,
      });
      alert("Reservation successful!");
      closeModal();
    } catch (err) {
      alert("Error making reservation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Service not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar forceScrolled={true} />
      </div>

      <div>
        <div className="max-w-7xl mx-auto flex flex-col px-10 lg:flex-row mt-10 md:mt-0">
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 flex flex-col justify-between items-center bg-white pt-30">
            <div className="max-w-md w-full">
              <div className="relative">
                <img
                  src={service.image}
                  alt="Service"
                  className="w-full h-50 object-cover rounded-3xl"
                />
                <img
                  src={service.host?.image ||
                    "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk="
                  }
                  alt="Host"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white absolute left-1/2 -translate-x-1/2 -bottom-8"
                  onError={(e) => {
                    console.log('Image failed to load, using fallback');
                    e.target.src = "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk=";
                  }}
                />
              </div>

              <div className="text-center pt-10 flex flex-col gap-5 items-center">
                <h1 className="text-[30px] font-bold max-w-[330px]">{service.name} by {service.host.name}</h1>
                <p className="text-[16px] text-gray-600">{service.host.about_me}</p>
                <div className='flex flex-col'>
                  <div className="flex items-center justify-center gap-1 text-sm text-black font-semibold mb-2">
                    <p>{service.host.work} in </p>
                    <span>{service.location.address}</span>
                  </div>
                  <p className="text-[14px] text-gray-400">Provided at your home</p>
                </div>
                <div className="flex justify-center gap-6 pt-4 text-black">
                  <button className="p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                    <GoShare />
                  </button>
                  <button
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => toggleFavorite(service.id)}
                  >
                    {isFavorite ? (
                      <GoHeart className="text-red-500" />
                    ) : (
                      <GoHeart className="text-[#000]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[450px] px-2 pt-8">
              <div className="flex justify-between items-center pt-10 pb-5 px-7 rounded-t-[50px] shadow-lg bg-white shadow-top">
                <div className="flex flex-col text-[14px]">
                  <h1 className="text-[18px] font-semibold">
                    From ${service.price_per_person}
                    <span className="text-[16px] text-gray-600"> / guest</span>
                  </h1>
                  <p>Minimum ${service.types[0].price} to book</p>
                  <p className="text-red-600">Free Cancellation</p>
                </div>
                <button
                  onClick={openModal}
                  className="bg-pink-400 py-2 px-9 rounded-[35px] text-white text-[20px]"
                >
                  Reserve
                </button>

                {modalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                  style={{ backgroundColor: 'rgba(77, 77, 77, 0.54)' }}
                    onClick={closeModal} 
                  >
                    <div
                      className="bg-white rounded-3xl max-w-lg w-full p-6 relative"
                       style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                        aria-label="Close modal"
                      >
                        ✕
                      </button>

                      <h2 className="text-xl font-semibold mb-4">Choose a reservation type</h2>

                      <div className="space-y-4 max-h-72 overflow-y-auto mb-6">
                        {service.types.map((type) => (
                          <label
                            key={type.name}
                            className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer
                    ${selectedType?.name === type.name
                                ? 'border-pink-500 bg-pink-50'
                                : 'border-gray-300'
                              }`}
                          >
                            <input
                              type="radio"
                              name="serviceType"
                              checked={selectedType?.name === type.name}
                              onChange={() => setSelectedType(type)}
                              className="cursor-pointer"
                            />
                            <img
                              src={type.image}
                              alt={type.name}
                              className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold">{type.name}</span>
                              <span className="text-gray-600 text-sm">{type.duration}</span>
                              <span className="text-pink-600 font-semibold">${type.price}</span>
                              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{type.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <label htmlFor="guests" className="font-medium text-gray-700">
                          Guests
                        </label>
                        <input
                          id="guests"
                          type="number"
                          min={1}
                          max={20}
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-16 text-center border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={closeModal}
                          className="flex-1 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReserve}
                          className="flex-1 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                          disabled={loading}
                        >
                          {loading ? "Reserving..." : "Reserve"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto pt-3">
            <ServiceCard service={service} />
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <MobileFooter />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
