import React, { useState, useEffect } from 'react';
import { GoShare } from "react-icons/go";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ images, hotelName, hotel, isFavorite, toggleFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSwiper, setShowSwiper] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageArray = images || hotel?.images || [];

  useEffect(() => {
    document.body.style.overflow = showModal || showSwiper ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, showSwiper]);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  if (!imageArray.length) {
    return (
      <div id="photos" className="relative">
        <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="photos" className="relative w-full">
        <div className="grid grid-cols-4 gap-2 h-80 md:h-96 rounded-xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative overflow-hidden">
            <img
              src={imageArray[0]}
              alt={hotelName || "Hotel"}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={imageArray[i] || imageArray[0]}
                alt={`Hotel view ${i + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowModal(true)}
              />
              {i === 4 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm z-10"
                >
                  Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (

        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-4">
            <button onClick={() => setShowModal(false)} className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-sm">
                <GoShare />
                <span>Share</span>
              </div>
              <div
                className="flex items-center gap-1 text-sm cursor-pointer"
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <IoIosHeart className="text-red-500 w-5 h-5" />
                ) : (
                  <IoIosHeartEmpty className="w-5 h-5" />
                )}
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </div>

            </div>
          </div>

          <div className='max-w-5xl mx-auto'> <div className="p-6 space-y-8">
            {imageArray.map((img, index) => (
              <div key={index}>
                <p className="text-base font-medium mb-2">{`Image ${index + 1}`}</p>
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full max-w-6xl mx-auto rounded cursor-pointer"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowSwiper(true);
                  }}
                />
              </div>
            ))}
          </div></div>
        </div>
      )}

      {showSwiper && (
        <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setShowSwiper(false)} className="flex items-center gap-2">
              <X className="w-6 h-6" />
              <span className="text-sm">Close</span>
            </button>
            <span className="text-sm">{`${selectedImageIndex + 1} / ${imageArray.length}`}</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
            <img
              src={imageArray[selectedImageIndex]}
              alt={`Image ${selectedImageIndex + 1}`}
              className="max-h-[80vh] object-contain"
            />
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="text-center py-4 text-sm">
            {`Image ${selectedImageIndex + 1}`}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
