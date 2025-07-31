import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-700">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you’ve wandered off the map. The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 inline-flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition duration-300"
      >
        <Home className="mr-2" size={20} />
        Go back home
      </button>

      <div className="mt-10">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
          alt="Lost"
          className="rounded-2xl shadow-lg max-w-md"
        />
      </div>
    </div>
  );
}
