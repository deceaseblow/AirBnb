import React from 'react'
import { Heart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // assuming you're using React Router

function HotelCard({ hotel, isFavorite, toggleFavorite }) {
  const navigate = useNavigate()
  const images = hotel.images
  const averageRating = hotel.host?.rating || 4.5

  const handleCardClick = () => {
    navigate(`/home/${hotel.id}`)
  }

  return (
    <div className="relative group cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <img
          src={images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(hotel.id)
          }}
          className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
        
        <div className="absolute top-3 left-3 bg-white/90 text-black text-[11px] md:text-[13px] px-2 py-1 rounded-full font-medium font-sans">
          Guest favorite
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between font-sans">
          <h3 className="text-[14px] font-semibold text-gray-900 truncate">{hotel.name}</h3>
        </div>
        <div className='flex items-center gap-1'>
          <p className="text-gray-600 text-sm font-sans">
            ${hotel.price_per_night} for 2 nights
          </p>
          <span className='text-gray-400 text-sm'>•</span>
          <div className='flex items-center gap-1 '>
            <Star className="w-3 h-4 fill-current text-gray-400" />
            <span className="text-sm text-gray-500">{averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard