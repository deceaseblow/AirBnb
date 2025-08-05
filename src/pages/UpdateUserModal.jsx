import React, { useState, useEffect } from 'react';

const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    about_me: '',
    interests: [],
    languages_spoken: [],
    places_visited: [],
    profile_picture: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        email: user.email || '',
        about_me: user.about_me || '',
        interests: user.interests || [],
        languages_spoken: user.languages_spoken || [],
        places_visited: user.places_visited || [],
        profile_picture: user.profile_picture || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <input
            type="text"
            name="profile_picture"
            placeholder="Profile Picture URL"
            value={formData.profile_picture}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <textarea
            name="about_me"
            placeholder="About Me"
            value={formData.about_me}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md resize-none text-sm"
            rows={3}
          />

          <input
            type="text"
            name="interests"
            placeholder="Interests (comma-separated)"
            value={formData.interests.join(', ')}
            onChange={(e) => handleArrayChange('interests', e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <input
            type="text"
            name="languages_spoken"
            placeholder="Languages Spoken (comma-separated)"
            value={formData.languages_spoken.join(', ')}
            onChange={(e) => handleArrayChange('languages_spoken', e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <input
            type="text"
            name="places_visited"
            placeholder="Places Visited (comma-separated)"
            value={formData.places_visited.join(', ')}
            onChange={(e) => handleArrayChange('places_visited', e.target.value)}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-md text-sm"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
