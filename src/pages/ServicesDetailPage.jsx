import react, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAllData } from '../contexts/AllDataContext';
import { Star, MapPin, Heart, Share, Users, Calendar, Clock, Camera, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GoShare } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import ServiceCard from './ServiceCard';
const ServiceDetailPage = () => {
  const { id } = useParams();
  const { findItemById, loading, error } = useAllData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

  const service = findItemById(parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Service not found</p>
        </div>
      </div>
    );
  }

  const allImages = [service.image, ...service.images];

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 ">  <Navbar forceScrolled={true} /></div>
      <div className="min-h-screen">
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
                  <button className="p-3 rounded-full  hover:bg-gray-100 transition-colors cursor-pointer">
                    <GoShare />
                  </button>
                  <button className="p-3 rounded-full  hover:bg-gray-100 transition-colors cursor-pointer">
                    <GoHeart />
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
                  <p>Minimum {service.types[1].price} to book</p>
                  <p className="text-red-600">Free Cancellation</p>
                </div>
                <button className="bg-pink-400 py-2 px-9 rounded-[35px] text-white text-[20px]">
                  Reserve
                </button>
              </div>
            </div>

          </div>
          <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto">

            <div>
              <ServiceCard service={service} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
