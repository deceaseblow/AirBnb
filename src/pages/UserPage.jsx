import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UsersContext';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';
import UpdateUserModal from './UpdateUserModal';
import MobileFooter from '../components/MobileFooter';
import { HomeIcon } from 'lucide-react';
import HomeIcon1 from "../components/icons/HomeIcon"

function UserPage() {
  const { currentUser, isLoggedIn, logout, updateUserData, deleteUserData } = useUser();
  const [activeTab, setActiveTab] = useState('about');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
  {/*IN CASE I DELETE LOOCAL STORAGE! */}
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      await deleteUserData(currentUser.id);
      logout();
      navigate('/');
    }
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
      <div className='hidden md:block'> <NavigationBar hideCenter /></div>

      <div className="flex-1 px-4 sm:px-30 lg:px-20">
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
              <div> <h4 className="text-sm font-medium mb-1">Become a host</h4>
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
                onClick={handleDeleteAccount}
                className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>


        <div className="flex flex-col md:flex-row w-full min-h-[500px] md:min-h-[700px]">
          <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border-r border-gray-200 py-6 lg:py-10 pr-4 lg:pr-6 space-y-2">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Profile</h2>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'about' ? 'bg-gray-200 font-semibold' : 'bg-gray-100 hover:bg-gray-150'
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
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'trips' ? 'bg-gray-200 font-semibold' : 'bg-gray-100 hover:bg-gray-150'
                }`}
            >
              <span role="img" aria-label="trips" className="flex-shrink-0">🧳</span>
              <span className="truncate">Past trips</span>
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left transition-colors ${activeTab === 'connections' ? 'bg-gray-200 font-semibold' : 'bg-gray-100 hover:bg-gray-150'
                }`}
            >
              <span role="img" aria-label="connections" className="flex-shrink-0">👥</span>
              <span className="truncate">Connections</span>
            </button>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full bg-gray-100 font-semibold py-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                Update Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            {activeTab === 'about' && (
              <>
                <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mb-6 lg:mb-8">
                  <img
                    src={currentUser.profile_picture}
                    alt={currentUser.username}
                    className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover border flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl lg:text-2xl font-bold truncate">
                      {currentUser.first_name} {currentUser.last_name}
                    </h2>
                    <p className="text-gray-600 truncate">@{currentUser.username}</p>
                    <p className="text-sm text-gray-500">
                      Joined on {new Date(currentUser.joined_on).toLocaleDateString()}
                    </p>
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
                </div>
              </>
            )}

            {activeTab === 'trips' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Past Trips</h3>
                <div className="text-center py-8">
                  <span role="img" aria-label="suitcase" className="text-4xl mb-4 block">🧳</span>
                  <p className="text-gray-500">You have no trips yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Start planning your first adventure!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'connections' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Connections</h3>
                <div className="text-center py-8">
                  <span role="img" aria-label="people" className="text-4xl mb-4 block">👥</span>
                  <p className="text-gray-500">No connections yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Connect with fellow travelers!
                  </p>
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