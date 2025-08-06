import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AirBnbIcon from './icons/AirBnbIcon';
import HomeIcon from './icons/HomeIcon';
import BalloonIcon from './icons/BalloonIcon';
import ServiceIcon from './icons/ServiceIcon';
import { Globe, Search, MapPin, Calendar, Users, X } from 'lucide-react';
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
    <div className="flex justify-center w-full">
      <div
        onClick={onClick}
        className="flex items-center justify-center gap-3 px-4 py-3 w-full max-w-xl bg-white border border-gray-300 rounded-full shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      >
        <Search size={20} className="text-[#000]" />
        <span className="text-[16px] font-medium text-[#000]">Start your search</span>
      </div>
    </div>
  );
}

function MobileSearchExpanded({ activeTab, onClose }) {
  const [where, setWhere] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [when, setWhen] = useState('');
  const [guests, setGuests] = useState('');
  const [service, setService] = useState('');

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (where.trim()) {
      searchParams.set('where', where.trim());
    }

    if (activeTab === 'home') {
      if (checkIn.trim()) {
        searchParams.set('checkIn', checkIn.trim());
      }
      if (checkOut.trim()) {
        searchParams.set('checkOut', checkOut.trim());
      }
    } else {
      if (when.trim()) {
        searchParams.set('when', when.trim());
      }
    }

    if (guests.trim()) {
      searchParams.set('guests', guests.trim());
    }

    if (activeTab === 'services' && service.trim()) {
      searchParams.set('service', service.trim());
    }

    const searchUrl = `/search?${searchParams.toString()}`;
    window.location.href = searchUrl;
    onClose();
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'experiences':
        return 'Search destinations';
      case 'services':
        return 'Search locations';
      default:
        return 'Search destinations';
    }
  };

  const renderFields = () => {
    if (activeTab === 'home') {
      return (
        <>
          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHERE
                </label>
                <input
                  type="text"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  CHECK IN
                </label>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="Add date"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  CHECK OUT
                </label>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="Add date"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHO
                </label>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Add guests"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeTab === 'services') {
      return (
        <>
          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHERE
                </label>
                <input
                  type="text"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Search locations"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHEN
                </label>
                <input
                  type="text"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  placeholder="Add dates"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <ServiceIcon size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHAT SERVICE
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHERE
                </label>
                <input
                  type="text"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHEN
                </label>
                <input
                  type="text"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  placeholder="Add dates"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHO
                </label>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Add guests"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {activeTab === 'experiences' ? 'Find experiences' :
            activeTab === 'services' ? 'Find services' : 'Find places'}
        </h2>
        <div className="w-10" />
      </div>

      <div className="flex justify-center space-x-6 mb-6 border-b border-gray-200">
        <Link
          to="/home"
          className={`flex items-center space-x-2 pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'home'
              ? 'text-black border-black'
              : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
        >
          <HomeIcon size={16} />
          <span>Stays</span>
        </Link>
        <Link
          to="/experiences"
          className={`flex items-center space-x-2 pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'experiences'
              ? 'text-black border-black'
              : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
        >
          <BalloonIcon size={16} />
          <span>Experiences</span>
        </Link>
        <Link
          to="/services"
          className={`flex items-center space-x-2 pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'services'
              ? 'text-black border-black'
              : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
        >
          <ServiceIcon size={16} />
          <span>Services</span>
        </Link>
      </div>

      <div className="space-y-4">
        {renderFields()}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="w-full bg-[#ff385c] text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Search
        </button>
      </div>
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
    document.body.classList.toggle('modal-open', focusedMode || mobileSearchMode);
  }, [focusedMode, mobileSearchMode]);

  const handleSearchBarClick = () => {
    if (window.innerWidth < 818) {
      setMobileSearchMode(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFocusedMode(true);
    }
  };

  const handleMobileSearchClose = () => {
    setMobileSearchMode(false);
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
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out
    ${focusedMode ? 'bg-white shadow-2xl md:pt-3 md:pb-3' : 'bg-[#fafafa]'} 
    ${isScrolled && !focusedMode ? 'shadow-md' : 'shadow-sm'}
    p-0 pt-2 md:pb-3`}
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
            <div className='flex items-center gap-2'>
              <button className="hidden lg:flex py-1 text-sm font-medium text-gray-700 hover:text-gray-900">
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
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <MobileSearchExpanded
                activeTab={activeTab}
                onClose={handleMobileSearchClose}
              />
            </div>
          ) : (
            <>
              <MobileStartSearch onClick={handleSearchBarClick} />
              <div className="flex w-full justify-between px-10 pt-2">
                {['home', 'experiences', 'services'].map((tab) => {
                  const Icon = tab === 'home' ? HomeIcon : tab === 'experiences' ? BalloonIcon : ServiceIcon;
                  return (
                    <Link
                      key={tab}
                      to={`/${tab}`}
                      className={`flex flex-col items-center text-xs font-medium ${activeTab === tab ? 'text-black font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-all duration-300 ${isScrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                      />
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                      {activeTab === tab && <div className="mt-1 w-15 h-0.5 bg-black rounded-full" />}
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
      className={`flex items-center space-x-2 text-[] font-medium ${active ? 'text-black font-bold' : 'text-gray-600 hover:text-gray-900'
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default NavigationBar;