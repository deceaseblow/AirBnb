import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UsersContext';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';

function UserPage() {
  const { currentUser, isLoggedIn } = useUser();
  const [activeTab, setActiveTab] = useState('about');
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar hideCenter />

      <div className="px-4 md:px-20">
        <div className="flex flex-col md:flex-row w-full min-h-[700px]">

          <div className="hidden md:block w-1/3 border-r border-gray-200 py-10 pr-6 space-y-2">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left ${
                activeTab === 'about' ? 'bg-gray-200 font-semibold' : 'bg-gray-100'
              }`}
            >
              <img
                src={currentUser.profile_picture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>About me</span>
            </button>

            <button
              onClick={() => setActiveTab('trips')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left ${
                activeTab === 'trips' ? 'bg-gray-200 font-semibold' : 'bg-gray-100'
              }`}
            >
              <span role="img" aria-label="trips">🧳</span>
              <span>Past trips</span>
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`w-full py-3 px-4 rounded-lg flex items-center space-x-3 text-left ${
                activeTab === 'connections' ? 'bg-gray-200 font-semibold' : 'bg-gray-100'
              }`}
            >
              <span role="img" aria-label="connections">👥</span>
              <span className="truncate">Connections</span>
            </button>
          </div>

          <div className="flex-1 p-4 md:p-8">

            <div className="md:hidden text-center mb-6">
              <img
                src={currentUser.profile_picture}
                alt={currentUser.username}
                className="w-24 h-24 mx-auto rounded-full object-cover border"
              />
              <h2 className="text-xl font-bold mt-3">
                {currentUser.first_name} {currentUser.last_name}
              </h2>
              <p className="text-gray-600">@{currentUser.username}</p>
              <p className="text-sm text-gray-500">
                Joined {new Date(currentUser.joined_on).toLocaleDateString()}
              </p>
            </div>

            <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
              <div
                onClick={() => setActiveTab('trips')}
                className="bg-gray-100 p-4 rounded-xl text-center cursor-pointer"
              >
                <div className="text-3xl">🧳</div>
                <p className="mt-2 font-medium">Past trips</p>
              </div>
              <div
                onClick={() => setActiveTab('connections')}
                className="bg-gray-100 p-4 rounded-xl text-center cursor-pointer"
              >
                <div className="text-3xl">👥</div>
                <p className="mt-2 font-medium">Connections</p>
              </div>
            </div>

            {/* Active Tab Content */}
            {activeTab === 'about' && (
              <>
                <div className="hidden md:flex items-center space-x-6 mb-8">
                  <img
                    src={currentUser.profile_picture}
                    alt={currentUser.username}
                    className="w-28 h-28 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {currentUser.first_name} {currentUser.last_name}
                    </h2>
                    <p className="text-gray-600">@{currentUser.username}</p>
                    <p className="text-sm text-gray-500">
                      Joined on {new Date(currentUser.joined_on).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About me</h3>
                  <p className="text-gray-700">{currentUser.about_me}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.interests.map((interest, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Languages spoken</h3>
                  <p className="text-gray-700">{currentUser.languages_spoken.join(', ')}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Places visited</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {currentUser.places_visited.map((place, i) => (
                      <li key={i}>{place}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'trips' && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <p className="text-lg">You’ll find your past reservations here after your first trip.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Book a trip
                </button>
              </div>
            )}

            {activeTab === 'connections' && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <p className="text-lg">
                  When you join an experience or invite someone on a trip, you’ll find other guests here.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Book a trip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserPage;
