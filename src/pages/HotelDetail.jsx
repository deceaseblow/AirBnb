import React, { useState, useEffect, useRef } from 'react';
import { Share, Heart, Star, ChevronLeft, ChevronRight, Users, Calendar, Shield, Award } from 'lucide-react';
import { Coffee, Wifi, Utensils, Wind, Zap, MapPin, Tv, Car, Home } from 'lucide-react';
import { GoShare } from 'react-icons/go';
import { X } from 'lucide-react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ImageGallery from './ImageGallery';
import HotelInfo from './HotelInfo';
import Reviews from './Reviews';
import BookingCard from './HotelBookingCard';
import CalendarComponent from './HotelCalendar';
import { useUser } from '../contexts/UsersContext';
import AboutHost from './AboutHost';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'; 
import MobileFooter from '../components/MobileFooter';

const HotelFeatures = ({ hotel }) => {
    const features = [
        {
            icon: <Shield size={24} />,
            title: "Self check-in",
            description: "Check yourself in with the smart lock."
        },
        {
            icon: <MapPin size={24} />,
            title: "Great location",
            description: "95% of recent guests gave the location a 5-star rating."
        },
        {
            icon: <Calendar size={24} />,
            title: "Free cancellation",
            description: "Get a full refund if you change your mind."
        }
    ];

    return (
        <div className="space-y-3 pt-3 pb-7 border-b border-gray-200 text-[16px]">
            {features.map((feature, index) => (
                <div key={index} className="flex space-x-4 items-center">
                    <div className="text-gray-600">{feature.icon}</div>
                    <div className='gap-1'>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const AboutThePlace = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleShowMore = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false)

    return (
        <div className="py-4 flex flex-col gap-3 border-b border-gray-200">
            <div className='flex align-items font-semibold gap-1 text-[18px] bg-gray-100 p-4 rounded-md '>
                <p>Some Info has been automatically translated.</p><p className='underline'>Show Original</p>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-5">
                Welcome to our stylish boutique stay — the perfect getaway for travelers seeking both comfort and character. Tucked away in a quiet neighborhood but just minutes from the city’s best cafes, galleries, and nightlife, our home offers a peaceful retreat without missing the buzz. Relax in a thoughtfully designed space featuring warm lighting, natural textures, and locally inspired décor. Whether you're sipping morning coffee on the private balcony or winding down after a day of exploring, this space is crafted to make you feel right at home.
            </p>

            <div className="w-fit">
                <button
                    onClick={handleShowMore}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Show More
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    style={{ backgroundColor: 'rgba(168, 168, 168, 0.44)' }}
                >
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
                        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    About this space
                                </h2>
                                <p className="text-gray-600 text-[18px]">
                                    Welcome to our stylish boutique stay — the perfect getaway for travelers seeking both comfort and character. Tucked away in a quiet neighborhood but just minutes from the city’s best cafes, galleries, and nightlife, our home offers a peaceful retreat without missing the buzz. Relax in a thoughtfully designed space featuring warm lighting, natural textures, and locally inspired décor. Whether you're sipping morning coffee on the private balcony or winding down after a day of exploring, this space is crafted to make you feel right at home.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Amenities = ({ amenities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const amenityIcons = {
        wifi: <Wifi size={20} />,
        kitchen: <Utensils size={20} />,
        washer: <Wind size={20} />,
        heating: <Zap size={20} />,
        balcony: <MapPin size={20} />,
        'smart tv': <Tv size={20} />,
        parking: <Car size={20} />,
        'coffee maker': <Coffee size={20} />,
        breakfast: <Coffee size={20} />,  // reuse Coffee icon for breakfast
        pool: <Home size={20} />,          // example icon for pool
        // add more as needed
    };

    const displayAmenities = amenities || ['Wifi', 'Kitchen', 'Washer', 'Heating', 'Balcony', 'Smart TV'];

    const handleShowAll = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <div id="amenities" className="py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What this place offers</h2>

            {/* Reduced gap from 4 to 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-2">
                {displayAmenities.map((amenity, index) => {
                    const key = amenity.toLowerCase().trim();
                    return (
                        <div key={index} className="flex items-center space-x-4 py-1">
                            <span>{amenityIcons[key] || <Utensils size={20} />}</span>
                            <span>{amenity}</span>
                        </div>
                    );
                })}

            </div>

            <button
                onClick={handleShowAll}
                className="mt-4  bg-gray-100 rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition-colors"
            >
                Show all amenities
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    style={{ backgroundColor: 'rgba(168, 168, 168, 0.44)' }}
                >
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
                        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-b from-gray-50 to-white">
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Amenities</h2>
                                <div className="text-gray-700 text-left max-h-64 overflow-y-auto px-4">
                                    {displayAmenities.map((amenity, index) => {
                                        const key = amenity.toLowerCase().trim();
                                        return (
                                            <div key={index} className="flex items-center space-x-3 py-2">
                                                <span>{amenityIcons[key] || <Utensils size={20} />}</span>
                                                <span>{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const SleepingArrangements = ({ images }) => {
    if (!images || images.length === 0) return null;

    const imageSrc = images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop';

    return (
        <div className="mt-2 border-b border-gray-200 py-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Where you'll sleep</h2>
            <div className="bg-white border border-gray-200 rounded-xl max-w-sm">
                <img
                    src={imageSrc}
                    alt="Sleeping arrangement"
                    className="w-full h-60 object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

const LocationInfo = ({ location }) => {
    if (!location) return null;

    const { lat, lng } = location.coordinates || {};

    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

    return (
        <div id="location" className="py-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Where you'll be</h2>
            <div className="space-y-4">

                <div className="h-140 rounded-xl overflow-hidden">
                    {lat && lng ? (
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="w-full h-full border-0"
                            src={mapSrc}
                            allowFullScreen
                        />
                    ) : (
                        <div className="bg-gray-100 h-full flex items-center justify-center text-gray-600">
                            Coordinates not available
                        </div>
                    )}
                </div>
                <p className="text-[16px] font-semibold ">{location.address}</p>
            </div>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading hotel details...</p>
        </div>
    </div>
);

const ErrorMessage = ({ message, onRetry }) => (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
            <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.5 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    </div>
);

const HotelDetail = ({ hotelId, findItemById, loading, error, onRetry, host }) => {
    const {
        currentUser,
        isLoggedIn,
        addToWishlist,
        removeFromWishlist,
    } = useUser();

    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState('photos');
    const navbarRef = useRef(null);

    const hotel = hotelId ? findItemById(hotelId) : null;
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const isFavorite = currentUser?.wishlist?.includes(hotel.id);

    const handleDateSelect = (checkInDate, checkOutDate) => {
        setCheckIn(checkInDate);
        setCheckOut(checkOutDate);
    };

    const handleDateClick = () => {
        setShowDatePicker(true);
        // Scroll to calendar
        setTimeout(() => {
            const calendarElement = document.getElementById('calendar-section');
            if (calendarElement) {
                calendarElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleGuestsChange = (newGuests) => {
        setGuests(newGuests);
    };
    const toggleFavorite = (hotelId) => {
        console.log('Toggle favorite called for hotelId:', hotelId);
        console.log('isLoggedIn:', isLoggedIn);
        console.log('currentUser wishlist before toggle:', currentUser?.wishlist);

        if (!isLoggedIn) {
            console.warn('User not logged in, cannot toggle favorite');
            alert('Please log in to save hotels.');
            return;
        }

        if (currentUser?.wishlist?.includes(hotelId)) {
            console.log('Removing from wishlist:', hotelId);
            removeFromWishlist(hotelId)
                .then(() => {
                    console.log('Successfully removed from wishlist');
                })
                .catch(err => {
                    console.error('Error removing from wishlist:', err);
                });
        } else {
            console.log('Adding to wishlist:', hotelId);
            addToWishlist(hotelId)
                .then(() => {
                    console.log('Successfully added to wishlist');
                })
                .catch(err => {
                    console.error('Error adding to wishlist:', err);
                });
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            if (navbarRef.current) {
                const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
                setIsSticky(navbarBottom <= 0);
            }

            const sections = ['photos', 'amenities', 'reviews', 'location'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    if (!hotel) {
        return (
            <ErrorMessage
                message={hotelId ? `Hotel with ID ${hotelId} not found` : "No hotel selected"}
                onRetry={onRetry}
            />
        );
    }

    return (
        <div>
            <Navbar forceScrolled={true} />
            <div className="max-w-6xl mx-auto min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className='flex justify-between items-center my-5'>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            {hotel.name}
                        </h1>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1 text-sm">
                                <GoShare />
                                <span>Share</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm cursor-pointer" onClick={() => toggleFavorite(hotel.id)}>
                                {isFavorite ? (
                                    <IoIosHeart className="text-red-500 w-5 h-5" />
                                ) : (
                                    <IoIosHeartEmpty className="w-5 h-5" />
                                )}
                                <span>{isFavorite ? 'Saved' : 'Save'}</span>
                            </div>

                        </div>
                    </div>
                    <div className="mb-8">
                        <ImageGallery
                            images={hotel.images}
                            hotelName={hotel.name}
                            hotel={hotel}
                            isFavorite={isFavorite}
                            toggleFavorite={() => toggleFavorite(hotel.id)}
                        />

                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column */}
                        <div className="flex-1 min-w-0 flex flex-col gap-8">
                            <HotelInfo hotel={hotel} />

                            <div className="flex flex-col gap-3 border-t border-b border-gray-200 py-6">
                                <div className='flex gap-2'>
                                    <img
                                        src={hotel.host?.image || `https://ui-avatars.com/api/?name=${hotel.host?.name}&background=random`}
                                        alt={hotel.host?.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h1 className="text-[18px] font-semibold">Hosted by {hotel.host?.name}</h1>
                                        <div className="flex gap-2 text-[14px] text-gray-500">
                                            <p>{hotel.host?.is_superhost ? 'Superhost' : 'None'}</p>
                                            <span>•</span>
                                            <p>Hosting since {new Date(hotel.host?.hosting_since).getFullYear()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <HotelFeatures hotel={hotel} />
                            <AboutThePlace />
                            <SleepingArrangements images={hotel.images} />
                            <Amenities amenities={hotel.amenities} />
                            <CalendarComponent
                                checkIn={checkIn}
                                checkOut={checkOut}
                                onDateSelect={handleDateSelect}
                                title="Select your dates"
                            />
                        </div>

                        {/* Right column - Booking Card */}
                        <div className="w-full lg:w-[400px] shrink-0">
                            <div className="sticky top-24">
                                <BookingCard
                                    pricePerNight={120}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    onDateClick={handleDateClick}
                                    guests={guests}
                                    onGuestsChange={handleGuestsChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Reviews reviews={hotel.reviews} hostRating={hotel.host?.rating} />
                        <LocationInfo location={hotel.location} />
                        <AboutHost hotel={hotel} />

                    </div>



                </div>
            </div>
            <div className='bg-[#fafafa]'><div className='max-w-6xl mx-auto'>
                <Footer />
            </div>
            <div className="block md:hidden">
                <MobileFooter />
            </div>
            </div>
        </div>
    );
};

export default HotelDetail;