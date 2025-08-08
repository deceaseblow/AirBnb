import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UsersContext';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';
import UpdateUserModal from './UpdateUserModal';
import MobileFooter from '../components/MobileFooter';
import { HomeIcon } from 'lucide-react';
import HomeIcon1 from "../components/icons/HomeIcon"
import BecomeHostButton from '../components/BecomeAHostButton';
import { useAllData } from '../contexts/AllDataContext';
function UserPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);
  const { currentUser, isLoggedIn, logout, updateUserData, deleteUserData, removeBooking } = useUser();
  const { findItemById, loading, error } = useAllData()
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <p className="text-lg font-medium text-center">You need to log in to view your profile.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 inline-flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition duration-300"
        >
          <HomeIcon className="mr-2" size={20} />
          Go back home
        </button>
      </div>
    );
  }
  {/*IN CASE I DELETE LOOCAL STORAGE! */ }
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      await deleteUserData(currentUser.id);
      logout();
      navigate('/');
    }
  };
  const handleLogout = () => {
    logout();
  };

  const handleUpdate = async (updatedData) => {
    if (!currentUser) return;

    const mergedUser = {
      ...currentUser,
      ...updatedData,
    };

    await updateUserData(currentUser.id, mergedUser);
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className='hidden md:block'>
        <NavigationBar hideCenter /></div>

      <div className="flex-1 px-4 sm:px-30 pb-10 lg:px-20">
        {/* mobile version!!!!!!!!!*/}
        <div className="block md:hidden py-10 px-4">
          <div className='flex flex-col gap-3'>
            <h2 className="text-[36px] font-bold mb-4">Profile</h2>
            <div
              className="bg-white rounded-[35px] py-6 flex flex-col items-center justify-center cursor-pointer"
              style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="rounded-full w-30 h-30 overflow-hidden">
                  <img
                    src={currentUser.profile_picture}
                    alt="Profile picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[30px] font-bold">{currentUser.first_name}</h3>
                  <p className="text-gray-500 text-sm">Guest</p>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => setActiveTab('trips')}
                className="bg-white rounded-[30px] p-4 flex flex-col items-center justify-center cursor-pointer"
                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
              >
                <img src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/797c1df2-a40c-4d93-9550-ca5b213cd01b.png?im_w=720" alt="Trips" className="w-30 mb-2" />
                <p className="text-sm font-medium">Past trips</p>
              </div>

              <div
                onClick={() => setActiveTab('connections')}
                className="bg-white rounded-[30px] p-4 flex flex-col items-center justify-center cursor-pointer"
                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
              >
                <img src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/ed28537a-fc3c-4253-bb89-a6d927df7e50.png?im_w=720" alt="Connections" className="w-30 mb-2" />
                <p className="text-sm font-medium">Connections</p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 mb-6 cursor-pointer flex items-center gap-2"
              style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
              <HomeIcon1 />
              <div>
                <BecomeHostButton />
                <p className="text-xs text-gray-500">It's easy to start hosting and earn extra income.</p></div>
            </div>

            <div className="space-y-3 text-sm">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full bg-gray-100 py-3 rounded-full font-medium hover:bg-gray-200"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full hover:bg-pink-700 transition-colors"
              >
                Log out
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full hover:bg-pink-700"
              >
                Delete Account
              </button>


            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full min-h-[500px] md:min-h-[700px]">
          <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border-r border-gray-200 py-6 lg:py-10 pr-4 lg:pr-6 space-y-2">
            <h2 className="text-xl lg:text-[36px] font-semibold mb-4">Profile</h2>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'about' ? 'bg-gray-100 font-semibold' : 'bg-gray-50 hover:bg-gray-150'
                }`}
            >
              <img
                src={currentUser.profile_picture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <span className="truncate">About me</span>
            </button>

            <button
              onClick={() => setActiveTab('trips')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'trips' ? 'bg-gray-100 font-semibold' : 'bg-gray-50 hover:bg-gray-150'
                }`}
            >
              <img src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/797c1df2-a40c-4d93-9550-ca5b213cd01b.png?im_w=720" alt="" className='w-10' />
              <span className="truncate">Past trips</span>
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'connections' ? 'bg-gray-100 font-semibold' : 'bg-gray-50 hover:bg-gray-150'
                }`}
            >
              <img src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/3009d40c-3aa7-498b-a887-ba641d3bbcc6.png?im_w=720" alt="" className='w-10' />
              <span className="truncate">Connections</span>
            </button>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full bg-gray-100 font-semibold py-3 rounded-full hover:bg-gray-200 transition-colors hover:cursor-pointer"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full hover:cursor-pointer"
              >
                Log out
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full hover:cursor-pointer"
              >
                Delete Account
              </button>

            </div>
          </div>

          <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            {activeTab === 'about' && (
              <>
                <div className='max-w-6xl mx-auto px-10'>
                  <h1 className='text-[40px] font-semibold mb-10'>About Me</h1>
                  <div className="hidden md:flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6 mb-6 lg:mb-8">
                    <div className="w-full lg:w-[400px] h-full bg-white rounded-2xl shadow-lg py-5 px-20 flex flex-col items-center justify-center">

                      <img
                        src={currentUser.profile_picture}
                        className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover flex-shrink-0"
                      />
                      <h2 className="text-xl lg:text-2xl font-bold truncate">
                        {currentUser.first_name} {currentUser.last_name}
                      </h2>
                      <p className="text-gray-600 text-[14px]">@{currentUser.username}</p>
                      <p className="text-sm text-gray-500 text-[12px]">
                        Joined on {new Date(currentUser.joined_on).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 max-w-[400px]">
                      <h1 className="font-semibold text-[25px]">Complete your profile</h1>
                      <p>Your Airbnb profile is an important part of every reservation. Complete yours to help other hosts and guests get to know you.</p>
                      <div className="max-w-[150px]">
                        <button
                          onClick={() => setShowUpdateModal(true)}
                          className="w-full bg-pink-600 text-white py-3 font-bold rounded-[20px] hover:bg-pink-700"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About me</h3>
                      <p className="text-gray-700 break-words">
                        {currentUser.about_me || "nothing here yet.."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentUser?.interests?.length > 0 ? (
                          currentUser.interests.map((interest, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 break-words"
                            >
                              {interest}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No interests added yet.</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Languages spoken</h3>
                      <p className="text-gray-700 break-words">
                        {currentUser.languages_spoken?.length > 0
                          ? currentUser.languages_spoken.join(', ')
                          : 'No languages specified.'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Places visited</h3>
                      {currentUser?.places_visited?.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {currentUser.places_visited.map((place, i) => (
                            <li key={i} className="break-words">{place}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No places visited yet.</p>
                      )}
                    </div>
                  </div></div>


              </>
            )}

            {activeTab === 'trips' && (
              <div className="max-w-6xl mx-auto px-6 md:px-20">
                <h1 className="text-[32px] md:text-[40px] font-semibold mb-10">Past Trips</h1>

                {currentUser?.bookings?.length === 0 ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <img
                      src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/797c1df2-a40c-4d93-9550-ca5b213cd01b.png?im_w=720"
                      alt="No Trips"
                      className="w-[300px]"
                    />
                    <p className="text-gray-500 mt-6">You have no trips yet.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Start planning your first adventure!
                    </p>
                    <button
                      onClick={() => navigate('/home')}
                      className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                      Book a trip
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-6 justify-start">
                    {currentUser.bookings.map((booking) => {
                      if (booking.isServiceBooking) {
                        return (
                          <div
                            key={booking.id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col flex-grow max-w-sm min-w-[280px]"
                          >
                            <div className="relative w-full">
                              <img
                                src={booking.serviceImage}
                                alt={booking.serviceName}
                                className="w-full h-64 object-cover rounded-t-3xl"
                              />
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col flex-grow">
                              <h2 className="text-xl font-semibold text-gray-900 truncate">
                                {booking.serviceName}
                              </h2>

                              <p className="text-sm text-gray-700 mt-1">
                                {booking.typeName} • {booking.typeDuration}
                              </p>

                              <p className="text-sm text-gray-700 mt-1">
                                {booking.guests} guest{booking.guests > 1 ? 's' : ''} •{' '}
                                <span className="font-medium">${booking.typePrice}</span>/guest
                              </p>

                              <p className="text-sm text-gray-700 mt-1">
                                Total: <span className="font-semibold">${booking.totalPrice}</span>
                              </p>

                              <div className="mt-auto flex gap-3 pt-4">
                                <button
                                  onClick={() => setActiveBooking(booking)}
                                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                                >
                                  More details
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      window.confirm('Are you sure you want to cancel this booking?')
                                    ) {
                                      removeBooking(booking.id);
                                    }
                                  }}
                                  className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      } else if (booking.isExperienceBooking) {
                        const experience = findItemById(booking.experienceId);

                        return (
                          <div
                            key={booking.id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col flex-grow max-w-sm min-w-[280px]"
                          >
                            {experience ? (
                              <>
                                <div className="relative w-full">
                                  <img
                                    src={experience.image}
                                    alt={experience.name}
                                    className="w-full h-64 object-cover rounded-t-3xl"
                                  />
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex flex-col flex-grow">
                                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                                    {experience.name}
                                  </h2>

                                  <p className="text-sm text-gray-500 mt-1">
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </p>

                                  <p className="text-sm text-gray-700 mt-1">
                                    Time: <span className="font-medium">{booking.time}</span>
                                  </p>

                                  <p className="text-sm text-gray-700 mt-1">
                                    Status: <span className="font-medium">{booking.status}</span>
                                  </p>

                                  <div className="mt-auto flex gap-3 pt-4">
                                    <button
                                      onClick={() => setActiveBooking(booking)}
                                      className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                                    >
                                      More details
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (window.confirm('Are you sure you want to cancel this booking?')) {
                                          removeBooking(booking.id);
                                        }
                                      }}
                                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="p-5 text-gray-500">Experience not found</div>
                            )}
                          </div>
                        );
                      }
                      else {
                        const hotel = findItemById(booking.hotelId);
                        return (
                          <div
                            key={booking.id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col flex-grow max-w-sm min-w-[280px]"
                          >
                            {hotel ? (
                              <>
                                <div className="relative w-full">
                                  <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-64 object-cover rounded-t-3xl"
                                  />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                                    {hotel.name}
                                  </h2>

                                  <p className="text-sm text-gray-500 mt-1">
                                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                    })}{' '}
                                    –{' '}
                                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </p>

                                  <p className="text-sm text-gray-700 mt-1">
                                    {booking.guests} guest{booking.guests > 1 ? 's' : ''} •{' '}
                                    <span className="font-medium">${booking.pricePerNight}</span>/night
                                  </p>

                                  <div className="mt-auto flex gap-3 pt-4">
                                    <button
                                      onClick={() => setActiveBooking(booking)}
                                      className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                                    >
                                      More details
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (
                                          window.confirm('Are you sure you want to cancel this booking?')
                                        ) {
                                          removeBooking(booking.id);
                                        }
                                      }}
                                      className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="p-5 text-gray-500">Hotel not found</div>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
                {activeBooking && (
                  <div
                    className="fixed inset-0 flex items-center justify-center z-70 bg-black/50 px-4"
                  >
                    <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative transform transition-all duration-300 scale-100">
                      <button
                        onClick={() => setActiveBooking(null)}
                        className="absolute top-4 left-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-200 hover:cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {activeBooking.isServiceBooking ? (
                        <>
                          {/* Service Booking Modal */}
                          <div className="relative">
                            <img
                              src={activeBooking.serviceImage}
                              alt={activeBooking.serviceName}
                              className="w-full h-44 object-cover rounded-t-3xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl" />
                          </div>

                          <div className="py-3 px-6">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Reservation confirmed
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
                              {activeBooking.serviceName}
                            </h2>

                            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                              <h3 className="font-medium text-gray-900 mb-3">Booking details</h3>

                              <p>
                                <strong>Type:</strong> {activeBooking.typeName}
                              </p>
                              <p>
                                <strong>Duration:</strong> {activeBooking.typeDuration}
                              </p>
                              <p>
                                <strong>Guests:</strong> {activeBooking.guests}
                              </p>
                              <p>
                                <strong>Price per guest:</strong> ${activeBooking.typePrice}
                              </p>
                              <p>
                                <strong>Total price:</strong> ${activeBooking.totalPrice}
                              </p>
                              <p>
                                <strong>Booking date:</strong>{' '}
                                {new Date(activeBooking.bookingDate).toLocaleDateString()}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                setActiveBooking(null);
                                navigate(`/services/${activeBooking.serviceId}`);
                              }}
                              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                              View service details
                            </button>
                          </div>
                        </>
                      ) : activeBooking.isExperienceBooking ? (
                        <>
                          {/* Image section with gradient overlay */}
                          {findItemById(activeBooking.experienceId)?.image && (
                            <div className="relative">
                              <img
                                src={findItemById(activeBooking.experienceId).image}
                                alt={findItemById(activeBooking.experienceId)?.name || "Experience"}
                                className="w-full h-44 object-cover rounded-t-3xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl" />
                            </div>
                          )}

                          <div className="py-3 px-6">
                            {/* Confirmation badge */}
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Reservation confirmed
                            </div>

                            {/* Experience name */}
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
                              {findItemById(activeBooking.experienceId)?.name || "Your experience"}
                            </h2>

                            {/* Details section with light gray background */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                              <h3 className="font-medium text-gray-900 mb-3">Booking details</h3>
                              <div className="space-y-3">
                                {/* Date */}
                                <div className="flex items-center text-gray-600">
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span className="text-sm">Date:</span>
                                  <span className="ml-auto font-medium text-gray-900">
                                    {new Date(activeBooking.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center text-gray-600">
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3"
                                    />
                                  </svg>
                                  <span className="text-sm">Time:</span>
                                  <span className="ml-auto font-medium text-gray-900">{activeBooking.time}</span>
                                </div>

                                {/* Status */}
                                <div className="flex items-center text-gray-600">
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span className="text-sm">Status:</span>
                                  <span className="ml-auto font-medium text-gray-900">{activeBooking.status}</span>
                                </div>

                                <div className="flex items-center text-gray-600">
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span className="text-sm">Booking made on:</span>
                                  <span className="ml-auto font-medium text-gray-900">
                                    {new Date(activeBooking.bookingDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setActiveBooking(null);
                                navigate(`/experiences/${activeBooking.experienceId || ''}`);
                              }}
                              className="w-full py-4 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                              View experience details
                            </button>
                          </div>
                        </>

                      ) : (
                        <>
                          {findItemById(activeBooking.hotelId)?.images?.[0] && (
                            <div className="relative">
                              <img
                                src={findItemById(activeBooking.hotelId).images[0]}
                                alt={findItemById(activeBooking.hotelId)?.name}
                                className="w-full h-44 object-cover rounded-t-3xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl" />
                            </div>
                          )}
                          <div className="py-3 px-6">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Reservation confirmed
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
                              {findItemById(activeBooking.hotelId)?.name || 'Your stay'}
                            </h2>
                            <div className="bg-gray-50 rounded-2xl p-4 mb-2">
                              <h3 className="font-medium text-gray-900 mb-3">Trip details</h3>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-gray-600">
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="text-sm">Check-in</span>
                                  </div>
                                  <span className="font-medium text-gray-900">
                                    {new Date(activeBooking.checkIn).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-gray-600">
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="text-sm">Check-out</span>
                                  </div>
                                  <span className="font-medium text-gray-900">
                                    {new Date(activeBooking.checkOut).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-gray-600">
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                    <span className="text-sm">Guests</span>
                                  </div>
                                  <span className="font-medium text-gray-900">{activeBooking.guests}</span>
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-gray-200 pt-6 mb-6">
                              <h3 className="font-medium text-gray-900 mb-2">Price breakdown</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    ${activeBooking.pricePerNight} × {activeBooking.nights} nights
                                  </span>
                                  <span className="text-gray-900">${activeBooking.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Cleaning fee</span>
                                  <span className="text-gray-900">${activeBooking.cleaningFee}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Service fee</span>
                                  <span className="text-gray-900">${activeBooking.serviceFee}</span>
                                </div>
                              </div>

                              <div className="border-t border-gray-200 pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-gray-900">Total</span>
                                  <span className="font-semibold text-xl text-gray-900">
                                    ${activeBooking.total}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => {
                                setActiveBooking(null);
                                navigate(`/home/${activeBooking.hotelId}`);
                              }}
                              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                              View listing details
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'connections' && (
              <div className='max-w-6xl mx-auto px-20'>
                <h1 className='text-[40px] font-semibold mb-10'>Connections</h1>

                <div className="flex flex-col items-center text-center py-8">
                  <img
                    src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/e7a31b6a-2370-4cec-8bd7-8943d4130a8e.png?im_w=720"
                    alt=""
                    className='w-[500px]'
                  />
                  <p className="text-gray-500 mt-4">No connections yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Connect with fellow travelers!
                  </p>

                  <button
                    onClick={() => navigate('/home')}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                  >
                    Book a trip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='hidden md:block'> <Footer /></div>
      <div className="block md:hidden">
        <MobileFooter />
      </div>

      {showUpdateModal && (
        <UpdateUserModal
          user={currentUser}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default UserPage;