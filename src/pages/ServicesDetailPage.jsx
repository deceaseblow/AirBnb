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
  const { findItemById, loading, error } = useAllData();
  const { currentUser, isLoggedIn, addToWishlist, removeFromWishlist } = useUser();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 flex flex-col justify-between items-center bg-white pt-30">
            <div className="max-w-md w-full">
              <div className="relative">
                <img
                  src={service.image}
                  alt="Service"
                  className="w-full h-50 object-cover rounded-3xl"
                />
                <img
                  src={service.host.image}
                  alt={service.host.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white absolute left-1/2 -translate-x-1/2 -bottom-8"
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
                      <GoHeart className="text-gray-400" />
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
                  <p>Minimum {service.types[0].price} to book</p>
                  <p className="text-red-600">Free Cancellation</p>
                </div>
                <button className="bg-pink-400 py-2 px-9 rounded-[35px] text-white text-[20px]">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto">
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
