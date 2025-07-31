import React, { useState, useRef, useEffect } from 'react';
import { Menu, HelpCircle, Home, Gift, UserPlus } from 'lucide-react';
import HomeIconn from './icons/HomeIcon';
import LogIn_SignUpModal from './LogIn_SignUpModal';
import { useUser } from '../contexts/UsersContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef(null);
  const { login, logout, isLoggedIn, currentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: HelpCircle, label: 'Help Center', onClick: () => console.log('Help Center clicked') },
    {
      icon: Home,
      label: 'Become a host',
      subtitle: "It's easy to start hosting and earn extra income.",
      onClick: () => console.log('Become a host clicked'),
      hasImage: true
    },
    { icon: UserPlus, label: 'Refer a Host', onClick: () => console.log('Refer a Host clicked') },
    { icon: UserPlus, label: 'Find a co-host', onClick: () => console.log('Find a co-host clicked') },
    { icon: Gift, label: 'Gift cards', onClick: () => console.log('Gift cards clicked') }
  ];

  const authItems = [
    {
      label: 'Log in or sign up',
      onClick: () => {
        setShowAuthModal(true);
        setIsOpen(false);
      },
      bold: true
    }
  ];

  const handleAuthSubmit = async (data) => {
    if (data.username && data.password) {
      const res = login(data.username, data.password);
      if (res.success) {
        setShowAuthModal(false);
      } else {
        alert(res.message);
      }
    } else {
      console.log('Signup object:', data);
      setShowAuthModal(false);
    }
  };

  const handleProfileClick = () => {
    if (location.pathname !== '/users/profile') {
      navigate('/users/profile');
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow"
      >
        <Menu size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">

          {isLoggedIn && (
            <>
              <div className="px-4 py-2 text-sm text-gray-700">
                Signed in as <strong>{currentUser?.username}</strong>
              </div>
              <div className="pb-2 border-b border-gray-200">
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50">Wishlists</button>
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50">Trips</button>
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50">Messages</button>
                <button onClick={handleProfileClick} className="w-full px-4 py-3 text-left hover:bg-gray-50">Profile</button>
              </div>
            </>
          )}

          <div className="pb-2 border-b border-gray-200">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <div className="flex-shrink-0">
                  <item.icon size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.label}</div>
                  {item.subtitle && <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>}
                </div>
                {item.hasImage && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <HomeIconn size={16} className="text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {!isLoggedIn ? (
            <div className="pt-2">
              {authItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50"
                >
                  <div className={`${item.bold ? 'text-sm font-semibold text-gray-900' : item.small ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}`}>
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full px-5 py-1 text-left hover:bg-gray-50 text-red-600 font-semibold"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}

      {showAuthModal && (
        <LogIn_SignUpModal
          onSubmit={handleAuthSubmit}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default MenuDropdown;
