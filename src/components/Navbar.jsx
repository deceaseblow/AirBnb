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
import BecomeHostButton from './BecomeAHostButton';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
const locationMap = {
  home: ['France', 'England', 'Japan', 'South Korea'],
  experiences: ['Tbilisi', 'Rome', 'Fatih'],
  services: ['Paris'],
};

const serviceTypes = ['Massage', 'Chef', 'Photo'];

function MobileSearchExpanded({ activeTab, onClose }) {
  const [where, setWhere] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [date, setDate] = useState('');
  const [when, setWhen] = useState('');
  const [guests, setGuests] = useState({ adults: 0, teenagers: 0, babies: 0, pets: 0 });
  const [typeOf, setTypeOf] = useState('');
  const [showWhereDropdown, setShowWhereDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const navigate = useNavigate();
  const locations = locationMap[activeTab] || [];
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);

  const handleWhereSelect = (option) => {
    setWhere(option);
    setShowWhereDropdown(false);
  };

  const handleServiceSelect = (option) => {
    setTypeOf(option);
    setShowServiceDropdown(false);
  };

  const handleSearch = () => {
    const payload = {
      searched: activeTab,
      where,
      typeOf: activeTab === 'services' ? typeOf : null,
    };

    navigate('/search', { state: payload });
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

  const renderWhereField = (placeholder) => (
    <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors relative">
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
            onFocus={() => setShowWhereDropdown(true)}
            placeholder={placeholder}
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
          />
        </div>
        <button
          onClick={() => setShowWhereDropdown(!showWhereDropdown)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronDown size={16} className="text-gray-600" />
        </button>
      </div>

      {showWhereDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {locations.map((option) => (
            <button
              key={option}
              onClick={() => handleWhereSelect(option)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderServiceField = () => (
    <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors relative">
      <div className="flex items-center gap-3">
        <ServiceIcon size={20} className="text-gray-600" />
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            TYPE OF
          </label>
          <input
            type="text"
            value={typeOf}
            onChange={(e) => setTypeOf(e.target.value)}
            onFocus={() => setShowServiceDropdown(true)}
            placeholder="What service do you need?"
            className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
          />
        </div>
        <button
          onClick={() => setShowServiceDropdown(!showServiceDropdown)}
          className="p-1 hover:bg-gray-100 rounded mr-2"
        >
          <ChevronDown size={16} className="text-gray-600" />
        </button>
        <button
          onClick={handleSearch}
          className="bg-[#FF385C] hover:bg-red-600 text-white p-3 rounded-full transition-colors"
        >
          <Search size={16} />
        </button>
      </div>

      {showServiceDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {serviceTypes.map((option) => (
            <button
              key={option}
              onClick={() => handleServiceSelect(option)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderGuestsField = () => (
    <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <Users size={20} className="text-gray-600" />
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            WHO
          </label>
          <div className="text-sm text-gray-600">
            {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#FF385C] hover:bg-red-600 text-white p-3 rounded-full transition-colors"
        >
          <Search size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {Object.keys(guests).map((key) => (
          <div className="flex justify-between items-center py-2" key={key}>
            <div>
              <div className="font-medium text-black capitalize">{key}</div>
              {key === 'adults' && <div className="text-sm text-gray-500">Ages 13 or above</div>}
              {key === 'teenagers' && <div className="text-sm text-gray-500">Ages 2-12</div>}
              {key === 'babies' && <div className="text-sm text-gray-500">Under 2</div>}
              {key === 'pets' && <div className="text-sm text-gray-500">Bringing a service animal?</div>}
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={guests[key] === 0}
                onClick={() => {
                  setGuests({ ...guests, [key]: Math.max(0, guests[key] - 1) });
                }}
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{guests[key]}</span>
              <button
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-black"
                onClick={() => {
                  setGuests({ ...guests, [key]: guests[key] + 1 });
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFields = () => {
    if (activeTab === 'home') {
      return (
        <>
          {renderWhereField('Search destinations')}

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  CHECK IN
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
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
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {renderGuestsField()}
        </>
      );
    } else if (activeTab === 'services') {
      return (
        <>
          {renderWhereField('Search locations')}

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  WHEN
                </label>
                <input
                  type="date"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {renderServiceField()}
        </>
      );
    } else {
      return (
        <>
          {renderWhereField('Search destinations')}

          <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {renderGuestsField()}
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

              <BecomeHostButton
                className="hidden lg:flex py-2 px-3 rounded-[20px] text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
              />

              {isLoggedIn ? (
                <Link to="/users/profile" className="flex-shrink-0">
                  <img
                    src={currentUser.profile_picture}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
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