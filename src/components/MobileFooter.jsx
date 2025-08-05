import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { Search, Heart, MessageSquare, User } from 'lucide-react';
import { FaAirbnb } from 'react-icons/fa';
import { useUser } from '../contexts/UsersContext';
import LogIn_SignUpModal from './LogIn_SignUpModal';

function MobileFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [showModal, setShowModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = () => setShowModal(true);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
        <div className="flex justify-around items-center h-16 text-xs">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center"
          >
            <Search className={`h-5 w-5 ${isActive('/home') ? 'text-rose-500' : 'text-gray-500'}`} />
            <span className={isActive('/home') ? 'text-rose-500 font-semibold' : 'text-gray-500'}>Explore</span>
          </button>

          {isLoggedIn ? (
            <>
              <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center">
                <Heart className={`h-5 w-5 ${isActive('/wishlist') ? 'text-rose-500' : 'text-gray-500'}`} />
                <span className={isActive('/wishlist') ? 'text-rose-500 font-semibold' : 'text-gray-500'}>Wishlists</span>
              </button>

              <button onClick={() => navigate('/users/profile')} className="flex flex-col items-center">
                <FaAirbnb className={`h-5 w-5 ${isActive('/users/profile') ? 'text-rose-500' : 'text-gray-500'}`} />
                <span className={isActive('/users/profile') ? 'text-rose-500 font-semibold' : 'text-gray-500'}>Trips</span>
              </button>

              <button onClick={() => navigate('/users/profile')} className="flex flex-col items-center">
                <MessageSquare className={`h-5 w-5 ${isActive('/users/profile') ? 'text-rose-500' : 'text-gray-500'}`} />
                <span className={isActive('/users/profile') ? 'text-rose-500 font-semibold' : 'text-gray-500'}>Messages</span>
              </button>

              <button onClick={() => navigate('/users/profile')} className="flex flex-col items-center">
                <User className={`h-5 w-5 ${isActive('/users/profile') ? 'text-rose-500' : 'text-gray-500'}`} />
                <span className={isActive('/users/profile') ? 'text-rose-500 font-semibold' : 'text-gray-500'}>Profile</span>
              </button>
            </>
          ) : (
            <button onClick={handleLoginClick} className="flex flex-col items-center">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500">Log In</span>
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <LogIn_SignUpModal
          onClose={() => setShowModal(false)}
          onSubmit={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MobileFooter;
