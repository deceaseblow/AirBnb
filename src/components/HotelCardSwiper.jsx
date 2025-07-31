import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HotelCard from './HotelCard'

function HotelCardSwiper({ hotels, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [cardsPerView, setCardsPerView] = useState(8)

  useEffect(() => {
    function updateCardsPerView() {
      const width = window.innerWidth
      if (width < 640) {           // small mobile devices (sm)
        setCardsPerView(2)
      } else if (width < 1024) {   // tablets (md/lg)
        setCardsPerView(3)
      } else if (width < 1280) {
        setCardsPerView(4)
      }
      else if (width < 1536) {
        setCardsPerView(5)
      }
      else {                    // desktop and above (xl+)
        setCardsPerView(6)
      }
      setCurrentIndex(0) // reset slider when cards per view changes to avoid overflow
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const repeatedHotels = [...hotels, ...hotels]

  const nextSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, repeatedHotels.length - cardsPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, repeatedHotels.length - cardsPerView)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const toggleFavorite = (hotelId) => {
    setFavorites(prev =>
      prev.includes(hotelId)
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    )
  }

  if (!hotels || hotels.length === 0) return <div>Loading...</div>

  const canGoNext = currentIndex < repeatedHotels.length - cardsPerView
  const canGoPrev = currentIndex > 0

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <h1 className="text-xl font-sans font-semibold">{title}</h1>
          <ChevronRight className='w-4 pt-1 ml-1' />
        </div>

        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all ${!canGoNext ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
        >
          {repeatedHotels.map((hotel, index) => (
            <div key={`${hotel.id}-${index}`} className="flex-shrink-0 px-2" style={{ width: `${100 / cardsPerView}%` }}>
              <HotelCard
                hotel={hotel}
                isFavorite={favorites.includes(hotel.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelCardSwiper