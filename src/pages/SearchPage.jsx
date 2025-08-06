import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import Footer from "../components/Footer";
import CardSwiperSearchPage from '../components/CardSwiperSearchPage';
import PriceTag from '../components/PriceTag';
import MapComponent from '../components/MapComponent';
import { MdOpenInFull } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import MobileFooter from '../components/MobileFooter';
import {
  getAllParisData,
  getAllLondonData,
  getAllSeoulData,
  getAllTokyoData,
} from '../services/hotelService';

import {
  getExperiencesTbilisi,
  getExperiencesRome,
  getExperiencesFatih
} from "../services/experiencesService";

import {
  getServicesPhoto,
  getServicesChef,
  getServicesMassage,
} from "../services/servicesService";

import HotelCard from '../components/HotelCard';
import ExperienceCard from '../components/ExperienceCard';
import ServiceCard from '../components/ServiceCard';

function SearchPage() {
  const { state } = useLocation();
  const searched = state?.searched || 'home';
  const where = state?.where?.toLowerCase() || '';
  const typeOf = state?.typeOf?.toLowerCase() || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapFullScreen, setMapFullScreen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let data = [];

        if (searched === 'home') {
          const city = (where || '').trim().toLowerCase();
          switch (city) { 
            case 'france':
              data = await getAllParisData();
              break;
            case 'england':
              data = await getAllLondonData();
              break;
            case 'japan':
              data = await getAllTokyoData();
              break;
            case 'south korea':
              data = await getAllSeoulData();
              break;
            default:
              data = await Promise.all([
                getAllParisData(),
                getAllLondonData(),
                getAllTokyoData(),
                getAllSeoulData()
              ]).then(responses => responses.flat());
          }
        } else if (searched === 'experiences') {
          const city = (where || '').trim().toLowerCase();
          switch (city) {
            case 'tbilisi':
              data = await getExperiencesTbilisi();
              break;
            case 'rome':
              data = await getExperiencesRome();
              break;
            case 'fatih':
              data = await getExperiencesFatih();
              break;
            default:
              data = await Promise.all([
                getExperiencesTbilisi(),
                getExperiencesRome(),
                getExperiencesFatih()
              ]).then(responses => responses.flat());
          }
        } else if (searched === 'services') {
          const service = (typeOf || '').trim().toLowerCase();
          switch (service) {
            case 'photo':
              data = await getServicesPhoto();
              break;
            case 'chef':
              data = await getServicesChef();
              break;
            case 'massage':
              data = await getServicesMassage();
              break;
            default:
              data = await Promise.all([
                getServicesPhoto(),
                getServicesChef(),
                getServicesMassage()
              ]).then(responses => responses.flat());
          }
        }

        setResults(data);
      } catch (err) {
        setError('Failed to fetch search results.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searched, where, typeOf]);

  const renderCard = (item) => {
    if (searched === 'home') {
      return <HotelCard key={item.id} hotel={item} isFavorite={false} toggleFavorite={() => { }} />;
    } else if (searched === 'experiences') {
      return <ExperienceCard key={item.id} experience={item} isFavorite={false} toggleFavorite={() => { }} />;
    } else if (searched === 'services') {
      return <ServiceCard key={item.id} service={item} isFavorite={false} toggleFavorite={() => { }} />;
    } else {
      return null;
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

return (
  <div className="relative">
    <NavigationBar forceScrolled={true} />

      <div className="p-6 bg-[#fff] pb-20">
        <div className="px-4 md:px-10">
          <div className={`hidden md:flex gap-6 ${mapFullScreen ? 'flex-col' : ''}`}>
            {!mapFullScreen && (
              <div className="w-3/5">
                <div className="flex justify-between">
                  <h1 className="text-[16px] font-semibold mb-8 text-gray-800 capitalize">
                    Over {results.length} {searched} Results
                  </h1>
                  <div className="flex gap-2">
                    <PriceTag />
                    <h1 className="text-[16px] font-semibold mb-8 text-gray-800 capitalize">
                      Price includes all fees
                    </h1>
                  </div>
                </div>
                <CardSwiperSearchPage
                  results={results}
                  searched={searched}
                  renderCard={renderCard}
                />
              </div>
            )}

            {/* Sticky desktop map */}
            <div className={`${mapFullScreen ? 'w-full h-[85vh]' : 'w-2/5 h-[600px]'} relative rounded-xl overflow-hidden shadow-lg z-10`}>
              <div className="sticky top-20 h-full">
                <button
                  onClick={() => setMapFullScreen(!mapFullScreen)}
                  className="absolute top-2 right-2 z-900 bg-white p-2 rounded-full shadow-md"
                >
                  {mapFullScreen ? <IoMdClose size={20} /> : <MdOpenInFull size={20} />}
                </button>
                <MapComponent results={results} searched={searched} />
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden">
            {mapFullScreen ? (
              <div className="w-full h-[85vh] relative rounded-xl overflow-hidden shadow-lg z-10">
                <button
                  onClick={() => setMapFullScreen(false)}
                  className="absolute top-2 right-2 z-20 bg-white p-2 rounded-full shadow-md"
                >
                  <IoMdClose size={20} />
                </button>
                <MapComponent results={results} searched={searched} />
              </div>
            ) : (
              <div>
                <div className="flex justify-between">
                  <h1 className="text-[16px] font-semibold mb-4 text-gray-800 capitalize">
                    Over {results.length} {searched} Results
                  </h1>
                  <div className="flex gap-2">
                    <PriceTag />
                    <h1 className="text-[16px] font-semibold text-gray-800 capitalize">
                      Price includes all fees
                    </h1>
                  </div>
                </div>
                <CardSwiperSearchPage
                  results={results}
                  searched={searched}
                  renderCard={renderCard}
                />
              </div>
            )}
          </div>
        </div>
      </div>
   <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999]">
  <button
    onClick={() => setMapFullScreen(!mapFullScreen)}
    className="bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-200 flex items-center gap-2 font-medium"
    style={{ zIndex: 9999 }}
  >
    {mapFullScreen ? (
      <>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Show Cards
      </>
    ) : (
      <>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Show Map
      </>
    )}
  </button>
</div>

    <div className='bg-[#fafafa] lg:px-30'>
      <Footer />
    </div>
      <div className="block md:hidden">
        <MobileFooter />
      </div>
  </div>
);

}

export default SearchPage;
