import React, { useState, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { useEffect } from 'react';

const locationMap = {
  home: ['France', 'England', 'Japan', 'South Korea'],
  experiences: ['Tbilisi', 'Rome', 'Fatih'],
  services: ['Paris'],
};

const serviceTypes = ['Massage', 'Chef', 'Photo'];

function UnifiedSearchBar({ activeTab = 'home', setFocusedMode = () => { } }) {

  const [focused, setFocused] = useState(null);
  const [where, setWhere] = useState('');
  const [guests, setGuests] = useState({ adults: 0, teenagers: 0, babies: 0, pets: 0 });
  const [typeOf, setTypeOf] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [date, setDate] = useState('');
  const [when, setWhen] = useState('');
  const dateRef = useRef(null);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const locations = locationMap[activeTab] || [];

  const handleFocus = (field) => {
    setFocused(prev => prev === field ? null : field);
  };

  const stopClickPropagation = (e) => e.stopPropagation();

  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(null);
        setFocusedMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setFocusedMode]);


  const handleSearch = () => {
    const payload = {
      searched: activeTab,
      where,
      typeOf: activeTab === 'services' ? typeOf : null,
    };

    navigate('/search', { state: payload });
  };


  return (
    <div ref={containerRef} className="bg-white border border-gray-300 rounded-full shadow-lg flex items-center w-full max-w-4xl relative z-40">

      <div className="flex items-center flex-1">

        <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('where'); }}>

          <div className={`cursor-pointer pl-6 py-3 pr-2 rounded-full transition-colors ${focused === 'where' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
            }`}>
            <div className="text-xs font-semibold text-black mb-1">Where</div>
            <div className="text-sm text-gray-500">
              {where || 'Search destinations'}
            </div>
          </div>
          {focused === 'where' && (
            <div onClick={stopClickPropagation} className="absolute bg-white shadow-xl rounded-2xl p-4 mt-2 w-64 z-50">
              {locations.map(loc => (
                <div
                  key={loc}
                  className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg text-sm font-medium"
                  onClick={() => {
                    setWhere(loc);
                    setFocused(null);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-300"></div>

        {/* Dates / Date / When */}
        {activeTab === 'home' && (
          <>
            <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('checkin'); }}>
              <div className={`cursor-pointer px-6 py-3 rounded-full transition-colors ${focused === 'checkin' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
                }`}>
                <div className="text-xs font-semibold text-black mb-1">Check in</div>
                <div className="text-sm text-gray-500">
                  {checkIn || 'Add dates'}
                </div>
              </div>
              {focused === 'checkin' && (
                <input
                  ref={dateRef}
                  type="date"
                  className="absolute top-full left-6 mt-2 border border-gray-300 p-3 rounded-lg bg-white z-50 shadow-lg"
                  onClick={stopClickPropagation}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setFocused(null);
                  }}
                />
              )}
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('checkout'); }}>
              <div className={`cursor-pointer px-6 py-3 rounded-full transition-colors ${focused === 'checkout' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
                }`}>
                <div className="text-xs font-semibold text-black mb-1">Check out</div>
                <div className="text-sm text-gray-500">
                  {checkOut || 'Add dates'}
                </div>
              </div>
              {focused === 'checkout' && (
                <input
                  type="date"
                  className="absolute top-full left-6 mt-2 border border-gray-300 p-3 rounded-lg bg-white z-50 shadow-lg"
                  onClick={stopClickPropagation}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setFocused(null);
                  }}
                />
              )}
            </div>
          </>
        )}

        {activeTab === 'experiences' && (
          <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('date'); }}>
            <div className={`cursor-pointer px-6 py-3 rounded-full transition-colors ${focused === 'date' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
              }`}>
              <div className="text-xs font-semibold text-black mb-1">Date</div>
              <div className="text-sm text-gray-500">
                {date || 'Add date'}
              </div>
            </div>
            {focused === 'date' && (
              <input
                type="date"
                className="absolute top-full left-6 mt-2 p-3 rounded-lg bg-white z-50 shadow-lg"
                onClick={stopClickPropagation}
                onChange={(e) => {
                  setDate(e.target.value);
                  setFocused(null);
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('when'); }}>
            <div className={`cursor-pointer px-6 py-3 rounded-full transition-colors ${focused === 'when' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
              }`}>
              <div className="text-xs font-semibold text-black mb-1">When</div>
              <div className="text-sm text-gray-500">
                {when || 'Add date'}
              </div>
            </div>
            {focused === 'when' && (
              <input
                type="date"
                className="absolute top-full left-6 mt-2 border border-gray-300 p-3 rounded-lg bg-white z-50 shadow-lg"
                onClick={stopClickPropagation}
                onChange={(e) => {
                  setWhen(e.target.value);
                  setFocused(null);
                }}
              />
            )}
          </div>
        )}

        <div className="h-8 w-px bg-gray-300"></div>

        {/* Guests or Type */}
        {activeTab === 'services' ? (
          <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('typeof'); }}>
            <div className={`cursor-pointer pl-5 pr-3 py-2 rounded-full transition-colors flex items-center justify-between ${focused === 'typeof' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
              }`}>
              <div>
                <div className="text-xs font-semibold text-black mb-1">Type of</div>
                <div className="text-sm text-gray-500">
                  {typeOf || 'Select'}
                </div>
              </div>
              <button
                className="bg-[#FF385C] hover:bg-red-600 text-white p-4 rounded-full transition-colors ml-4"
                onClick={handleSearch}
              >
                <IoSearchSharp size={16} />
              </button>
            </div>
            {focused === 'typeof' && (
              <div onClick={stopClickPropagation} className="absolute bg-white shadow-xl rounded-2xl p-4 mt-2 w-48 z-50">
                {serviceTypes.map(type => (
                  <div
                    key={type}
                    className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg text-sm font-medium"
                    onClick={() => {
                      setTypeOf(type);
                      setFocused(null);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex-1" onClick={() => { setFocusedMode(true); handleFocus('guests'); }}>
            <div className={`cursor-pointer pl-5 pr-3 py-2 rounded-full transition-colors flex items-center justify-between ${focused === 'guests' ? 'bg-white shadow-xl' : 'hover:bg-gray-100'
              }`}>
              <div>
                <div className="text-xs font-semibold text-black mb-1">Who</div>
                <div className="text-sm text-gray-500">
                  {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
                </div>
              </div>
              <button
                className="bg-[#FF385C] hover:bg-red-600 text-white p-4 rounded-full transition-colors ml-4"
                onClick={handleSearch}
              >
                <IoSearchSharp size={16} />
              </button>
            </div>
            {focused === 'guests' && (
              <div onClick={stopClickPropagation} className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-2xl shadow-xl p-6 w-80 z-50">
                {Object.keys(guests).map((key) => (
                  <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0" key={key}>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuests({ ...guests, [key]: Math.max(0, guests[key] - 1) });
                        }}
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium">{guests[key]}</span>
                      <button
                        className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuests({ ...guests, [key]: guests[key] + 1 });
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnifiedSearchBar;
