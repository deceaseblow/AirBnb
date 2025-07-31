import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AirBnbIcon from './icons/AirBnbIcon';
import AirBnbSymbolIcon from './icons/AirBnbSymbolIcon';
import HomeIcon from './icons/HomeIcon';
import BalloonIcon from './icons/BalloonIcon';
import ServiceIcon from './icons/ServiceIcon';
import { Globe, Search } from 'lucide-react';
import { IoSearchSharp } from 'react-icons/io5';
import MenuDropdown from './MenuDropdown';
import UnifiedSearchBar from './UnifiedSearchBar';
import { useUser } from '../contexts/UsersContext';

function SearchBarUnder({ icon: Icon = Search, onClick }) {
  return (
    <div
      onClick={onClick}
      className="transition-all duration-500 ease-in-out transform flex items-center gap-3 px-1 bg-white border border-gray-300 rounded-full pr-3 pl-5 py-3 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105"
    >
      <span className="text-sm font-semibold text-black">Anywhere</span>
      <div className="h-6 w-px bg-gray-300"></div>
      <span className="text-sm font-semibold text-black">Any week</span>
      <div className="h-6 w-px bg-gray-300"></div>
      <span className="text-sm font-semibold text-black">Add guests</span>
      <div className="ml-auto">
        <button className="bg-[#ff385c] text-white p-2 rounded-full hover:bg-red-600">
          <IoSearchSharp size={16} />
        </button>
      </div>
    </div>
  );
}

function MobileStartSearch({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-full shadow-md cursor-pointer hover:shadow-lg transition-shadow mx-4"
    >
      <Search size={20} className="text-gray-600" />
      <span className="text-sm font-medium text-gray-600">Start your search</span>
    </div>
  );
}

function NavigationBar({ forceScrolled = false, hideCenter = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedMode, setFocusedMode] = useState(false);
  const [mobileSearchMode, setMobileSearchMode] = useState(false);
  const ticking = useRef(false);
  const { currentUser, isLoggedIn } = useUser(); 


  const location = useLocation();
  const activeTab = location.pathname.includes('experiences')
    ? 'experiences'
    : location.pathname.includes('services')
      ? 'services'
      : 'home';

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsScrolled(scrollTop > 80);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceScrolled]);

  useEffect(() => {
    document.body.classList.toggle('modal-open', focusedMode);
  }, [focusedMode]);

  const handleSearchBarClick = () => {
    if (window.innerWidth < 768) {
      setMobileSearchMode(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFocusedMode(true);
    }
  };

  return (
    <>
      <style jsx="true">{`
        .modal-open {
          overflow: hidden;
        }
      `}</style>

      {focusedMode && (
        <div className="fixed inset-0 z-40 bg-black/20 transition-all" onClick={() => setFocusedMode(false)} />
      )}

      <div
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${focusedMode ? 'bg-white shadow-2xl pt-1 pb-3 md:py-8' : 'bg-[#fafafa] px-4 pt-2 pb-3'
          } ${isScrolled && !focusedMode ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="hidden md:flex justify-between px-4 md:px-6">
          <Link to="/home" className="flex space-x-2">
            <div className="flex-shrink-0 py-3">
              <AirBnbIcon />
            </div>
          </Link>
          {!hideCenter && (
            <div className="flex-1 mx-4 flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className={`flex flex-col items-center w-full transition-all duration-300 ease-in-out ${focusedMode || !isScrolled ? 'max-h-[1000px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none overflow-hidden'
                  }`}
                style={{ transformOrigin: 'top center' }}
              >
                <div className="flex justify-center space-x-8 mb-4 pt-4">
                  <TabLink to="/home" label="Home" icon={<HomeIcon size={18} />} active={activeTab === 'home'} />
                  <TabLink to="/experiences" label="Experiences" icon={<BalloonIcon size={18} />} active={activeTab === 'experiences'} />
                  <TabLink to="/services" label="Services" icon={<ServiceIcon size={18} />} active={activeTab === 'services'} />
                </div>
                <div className="w-full max-w-4xl">
                  <UnifiedSearchBar activeTab={activeTab} setFocusedMode={setFocusedMode} />

                </div>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out mt-2 ${focusedMode || !isScrolled ? 'opacity-0 scale-95 pointer-events-none h-0' : 'opacity-100 scale-100 pointer-events-auto'
                  }`}
              >
                <div className="max-w-md w-full">
                  <SearchBarUnder icon={Search} onClick={handleSearchBarClick} />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 items-start py-4 ">
            <div className='flex items-center gap-2'> <button className="hidden lg:flex py-1 text-sm font-medium text-gray-700 hover:text-gray-900">
              Become a host
            </button>

              {isLoggedIn ? (
                <Link to="/users/profile" className="flex-shrink-0">
                  <img
                    src={currentUser.profile_picture}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 hover:scale-105 transition-transform"
                  />
                </Link>
              ) : (
                <button className="p-2 hover:bg-gray-100 rounded-full flex justify-center">
                  <Globe size={16} />
                </button>
              )}


              <div className="flex">
                <MenuDropdown />
              </div>
            </div>
          </div>


        </div>

        <div className="md:hidden">
          {mobileSearchMode ? (
            <div className="px-4">
              <div className="flex justify-center space-x-8 mb-4">
                <TabLink to="/home" label="Home" icon={<HomeIcon size={16} />} active={activeTab === 'home'} />
                <TabLink to="/experiences" label="Experiences" icon={<BalloonIcon size={16} />} active={activeTab === 'experiences'} />
                <TabLink to="/services" label="Services" icon={<ServiceIcon size={16} />} active={activeTab === 'services'} />
              </div>
              <UnifiedSearchBar activeTab={activeTab} setFocusedMode={setFocusedMode} />

              <button className="text-sm text-gray-500 underline mt-4" onClick={() => setMobileSearchMode(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              <MobileStartSearch onClick={handleSearchBarClick} />
              <div className="flex justify-center space-x-8 mt-4 px-4">
                {['home', 'experiences', 'services'].map((tab) => {
                  const Icon = tab === 'home' ? HomeIcon : tab === 'experiences' ? BalloonIcon : ServiceIcon;
                  return (
                    <Link
                      key={tab}
                      to={`/${tab}`}
                      className={`flex flex-col items-center space-y-1 text-xs font-medium ${activeTab === tab ? 'text-black font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-all duration-300 ${isScrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                      />
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                      {activeTab === tab && <div className="w-6 h-0.5 bg-black rounded-full" />}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function TabLink({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 text-m font-medium ${active ? 'text-black font-bold' : 'text-gray-600 hover:text-gray-900'
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default NavigationBar;