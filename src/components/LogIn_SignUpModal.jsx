import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useUser } from '../contexts/UsersContext'; 
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userServices';

function LogIn_SignUpModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = await login(formData.username, formData.password);
      if (res.success) {
        onClose();
        navigate('/');
      } else {
        setError(res.message);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        const newUserData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "user",
          date_of_birth: null,
          profile_picture: "",
          is_superhost: false,
          about_me: "",
          interests: [],
          languages_spoken: [],
          lives_in: "",
          joined_on: new Date().toISOString().split('T')[0], // <-- fix
          verified: { email: false, phone: false, identity: false },
          places_visited: [],
          host_rating: 0,
          total_reviews: 0,
          listings: [],
          bookings: [],
          wishlist: []
        };


        console.log("Submitting to backend:", newUserData);
        const res = await createUser(newUserData);
        if (res.id) { 
          alert('Account created! Now... please sign in.');
          setIsLogin(true);
          setFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          setError('Registration failed. Try again.');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setError('Something went wrong during registration.');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(168, 168, 168, 0.44)' }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Welcome to Airbnb'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>
        </div>

        <div className="px-8 py-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.firstName}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.lastName}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              className="text-rose-600 hover:text-rose-700 font-medium text-sm mt-1 hover:underline"
              onClick={toggleForm}
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn_SignUpModal;
