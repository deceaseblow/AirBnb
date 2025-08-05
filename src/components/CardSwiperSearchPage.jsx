import React, { useState, useEffect } from 'react'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardSwiperSearchPage = ({ results, searched, renderCard }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9); 

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(2); // mobile
      } else if (width < 1024) {
        setItemsPerPage(6); // tablet
      } else {
        setItemsPerPage(9); // desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (results.length === 0) {
    return (
      <div className="px-10">
        <h1 className="text-[16px] font-semibold mb-8 text-gray-800 capitalize">
          Over 0 {searched} Results
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No results found.</p>
        </div>
      </div>
    );
  }

  const currentItems = results.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div key={item.id} className="transform transition-transform hover:scale-101">
            {renderCard(item)}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={prevPage}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                index === currentPage
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardSwiperSearchPage;
  