import React from 'react'
import NavigationBar from '../components/Navbar'
import { useUser } from '../contexts/UsersContext'
import { useAllData } from '../contexts/AllDataContext'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../components/HotelCard'
import ServiceCard from '../components/ServiceCard'
import ExperienceCard from '../components/ExperienceCard'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import { HomeIcon } from 'lucide-react';

function WishlistPage() {
  const { currentUser, isLoggedIn, addToWishlist, removeFromWishlist } = useUser()
  const { findItemById, loading, error } = useAllData()
  const navigate = useNavigate()

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-lg font-semibold">Please log in to view your wishlist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 inline-flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition duration-300"
        >
          <HomeIcon className="mr-2" size={20} />
          Go back home
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading your wishlist...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    )
  }

  const wishlistItems = currentUser?.wishlist?.map(id => findItemById(id)).filter(Boolean)

  // Toggle favorite adds/removes item ID from user's wishlist
  const toggleFavorite = (id) => {
    if (!isLoggedIn) return
    if (currentUser.wishlist.includes(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist(id)
    }
  }

  const renderCard = (item) => {
    if (!item) return null
    const idStr = item.id.toString()
    const firstDigit = idStr[0]
    const isFav = currentUser.wishlist.includes(item.id)

    const commonProps = {
      key: item.id,
      isFavorite: isFav,
      toggleFavorite: () => toggleFavorite(item.id),
    }

    if (['1', '2', '3', '4'].includes(firstDigit)) {
      return (
        <HomeCard
          {...commonProps}
          hotel={item}
          onClick={() => navigate(`/home/${item.id}`)}
        />
      )
    } else if (['5', '6', '7', '8'].includes(firstDigit)) {
      return (
        <ExperienceCard
          {...commonProps}
          experience={item}
          onClick={() => navigate(`/experience/${item.id}`)}
        />
      )
    } else if (
      idStr.startsWith('9') ||
      idStr.startsWith('10') ||
      idStr.startsWith('11') ||
      idStr.startsWith('12')
    ) {
      return (
        <ServiceCard
          {...commonProps}
          service={item}
          onClick={() => navigate(`/service/${item.id}`)}
        />
      )
    }

    return null
  }

  return (
    <div>
    <div className=' hidden md:block'>  
      <NavigationBar hideCenter /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 lg:px-8">
        <div>
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold py-4">Your Wishlist</h1>

          {wishlistItems && wishlistItems.length > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

              {wishlistItems.map(item => renderCard(item))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Your wishlist is empty.</p>
          )}
        </div>
      </div>

     <div className='hidden md:block'> <div className='bg-[#fafafa] px-10'>
        <Footer />
      </div></div>

      <div className="block md:hidden">
        <MobileFooter />
      </div>
    </div>
  )
}

export default WishlistPage
