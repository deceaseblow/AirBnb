import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAllData } from '../contexts/AllDataContext';
import { useUser } from '../contexts/UsersContext';
import Navbar from '../components/Navbar';
import MobileFooter from '../components/MobileFooter';
import Reviews from './Reviews';
import BookingCard from '../components/BookingCard';
import { IoMdStar } from 'react-icons/io';
import { BsDot } from 'react-icons/bs';
import { GoShare, GoHeart } from 'react-icons/go';
import { MdOpenInFull, MdClose } from 'react-icons/md';
import { TbCards } from 'react-icons/tb';
import { ChevronRight, ChevronLeft, X, Calendar, Accessibility, Users } from 'lucide-react';
import vet from '../assets/vet-icons/vet_icon.avif';


function ExperiencesDetailPage() {
    const { id } = useParams();
    const { findItemById, loading, error } = useAllData();
    const { currentUser, isLoggedIn, addToWishlist, removeFromWishlist } = useUser();

    const [isMapFullScreen, setIsMapFullScreen] = useState(false);
    const [showSwiper, setShowSwiper] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Always define these states and variables before early returns
    const experience = findItemById(parseInt(id));
    const imageArray = experience ? [experience.image, ...(experience.images || [])].filter(Boolean) : [];
    const isFavorite = experience && currentUser?.wishlist?.includes(experience.id);

    useEffect(() => {
        if (isMapFullScreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMapFullScreen]);

    useEffect(() => {
        document.body.style.overflow = showSwiper ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showSwiper]);

    const toggleFavorite = (experienceId) => {
        if (!isLoggedIn) {
            alert('Please log in to save services.');
            return;
        }

        if (currentUser?.wishlist?.includes(experienceId)) {
            removeFromWishlist(experienceId).catch((err) => console.error('Error removing from wishlist:', err));
        } else {
            addToWishlist(experienceId).catch((err) => console.error('Error adding to wishlist:', err));
        }
    };

    const openSwiper = (index = 0) => {
        setSelectedImageIndex(index);
        setShowSwiper(true);
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % imageArray.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    };

    // Now do conditional rendering safely
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading experience details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!experience) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Experience not found...</p>
                </div>
            </div>
        );
    }

    return (

        <div className='bg-[#F4F2EC]'>
            {isMapFullScreen && (
                <div className="fixed bg-white inset-0 z-50 bg-opacity-70 flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                        <button
                            onClick={() => setIsMapFullScreen(false)}
                            className="absolute top-6 right-6 z-10 bg-white p-3 rounded-full shadow-lg"
                        >
                            <MdClose size={24} />
                        </button>

                        <iframe
                            title="Google Map Fullscreen"
                            width="100%"
                            height="100%"
                            className="rounded-[30px] h-full w-full"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${experience.location.coordinates.lat},${experience.location.coordinates.lng}&output=embed`}
                        ></iframe>
                    </div>
                </div>
            )}
            {!isMapFullScreen && !showSwiper && (
                <div className="fixed top-0 left-0 w-full z-50">
                    <Navbar forceScrolled={true} />
                </div>
            )}


            <div className="z-10 relative bg-white rounded-b-[60px] shadow-lg">
                <div className='max-w-7xl mx-auto px-10 pt-30 pb-20 mt-10 md:mt-0'>
                    <div>
                        <div className='flex flex-col lg:flex-row gap-20 border-b border-gray-200'>
                            <div className='w-full lg:w-2/3 flex flex-col gap-10'>
                                <div className='relative'>
                                    <div className="grid grid-cols-2 gap-1">
                                        {[experience.image, ...(experience.images || [])]
                                            .slice(0, 4)
                                            .map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-[380px] object-cover rounded-[30px]"
                                                />
                                            ))}
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <button
                                            onClick={() => openSwiper(0)}
                                            className="bg-white p-5 rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <TbCards />
                                        </button>
                                    </div>
                                    {showSwiper && (
                                        <div className="fixed inset-0 z-[60] bg-white lack text-white flex flex-col text-[#000]">
                                            {/* Top Bar */}
                                            <div className="flex justify-between items-center p-4">
                                                <span className="text-sm text-[#000]">{`${selectedImageIndex + 1} / ${imageArray.length}`}</span>
                                                <button
                                                    onClick={() => setShowSwiper(false)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <X className="w-6 h-6 text-[#000]" />
                                                </button>

                                            </div>

                                            {/* Image and navigation */}
                                            <div className="flex-1 flex items-center justify-center relative">
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
                                                >
                                                    <ChevronLeft />
                                                </button>
                                                <img
                                                    src={imageArray[selectedImageIndex]}
                                                    alt={`Image ${selectedImageIndex + 1}`}
                                                    className="max-h-[80vh] object-contain"
                                                />
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
                                                >
                                                    <ChevronRight />
                                                </button>
                                            </div>

                                            <div className="text-center py-4 text-sm text-[#000]     ">
                                                {`Image ${selectedImageIndex + 1}`}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col gap-2 border-b border-gray-200'>
                                    <h1 className="text-[28px] font-semibold mb-4">What you'll do</h1>
                                    <div className="flex flex-col gap-6">
                                        {experience.what_you_will_do.map((activity, index) => (
                                            <div key={index} className="flex gap-4 items-center justofy-center">
                                                <img
                                                    src={experience.images?.[index] || experience.image}
                                                    alt={`Activity ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded-[26px] flex-shrink-0"
                                                />
                                                <p className="text-base text-gray-800 max-w-[550px]">{activity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className='text-[16px] text-gray-500 py-3'>Hosted in {experience.host.languages?.join(", ")}</p>

                                </div>
                                <div className="flex flex-col gap-3 border-b border-gray-200 relative pb-5">
                                    <h1 className="text-[28px] font-semibold">Where we'll meet</h1>

                                    <div className="text-[18px]">
                                        <p>Taxi parking at the Europe square</p>
                                        <p className="text-gray-400">
                                            {experience.location.address}, {experience.location.coordinates.lng}, {experience.location.coordinates.lat}
                                        </p>
                                    </div>

                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="400"
                                        className="rounded-[30px] mt-2"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps?q=${experience.location.coordinates.lat},${experience.location.coordinates.lng}&output=embed`}
                                    ></iframe>
                                    <button
                                        onClick={() => setIsMapFullScreen(true)}
                                        className="absolute top-[140px] right-[20px] bg-white p-3 rounded-full cursor-pointer shadow"
                                    >
                                        <MdOpenInFull size={20} />
                                    </button>
                                </div>
                                <div className='flex flex-col gap-5 pb-4'>
                                    <h1 className="text-[28px] font-semibold">Meet the Host</h1>
                                    <div className='flex gap-10'>
                                        <div className='flex flex-col justify-between gap-4'>
                                            <div className="w-full h-full bg-white rounded-2xl shadow-lg py-4 px-3 flex flex-col items-center justify-center">
                                                <img
                                                    src={experience.host?.image ||
                                                        "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk="
                                                    }
                                                    alt="Host"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-solid border-white "
                                                    onError={(e) => {
                                                        console.log('Image failed to load, using fallback');
                                                        e.target.src = "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk=";
                                                    }}
                                                />
                                                <h2 className="text-2xl font-bold text-gray-900">{experience.host.name}</h2>
                                                <p className="text-gray-600 text-sm">Host</p>
                                            </div>
                                            <div>
                                                <button className='w-full bg-gray-200 py-2 rounded-xl text-[14px] font-semibold'>Message The Host</button>
                                            </div>
                                            <div>
                                                <p className='text-[14px] text-gray-500 max-w-[400px] text-center'>To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
                                            </div>
                                        </div>
                                        <div className='max-w-[300px]'>
                                            <p className='text-[16px] text-gray-600'>Hi, my name is {experience.host.name}, I originally work in {experience.host.work}, I have an obsession with {experience.host.obsession} {experience.host.about_me}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className='w-full lg:w-1/3 pb-10'>
                                <div className='flex flex-col lg:pb-55'>
                                    <div>
                                        <div className='flex flex-col items-center gap-3 border-b border-gray-200 pb-5'>
                                            <h1 className='text-[34px] font-semibold max-w-[400px] text-center'>{experience.name}</h1>
                                            <p className='text-center text-gray-500 text-[16px]'>{experience.what_you_will_do[0]}</p>

                                            <div className='flex flex-col items-center'>
                                                <div className='flex gap-1 items-center'>
                                                    <div className='flex items-center gap-1'>
                                                        <IoMdStar />
                                                        <p className='text-[14px] font-semibold'>{experience.host.rating}</p>
                                                    </div>
                                                    <span><BsDot /></span>
                                                    <div>
                                                        <p className='text-[14px] font-semibold'> {experience.reviews.length} reviews</p>
                                                    </div>
                                                </div>
                                                <div className='flex gap-1 items-center'>
                                                    <div className='flex items-center'>
                                                        <p className='text-[14px] text-gray-500'>{experience.location.address}</p>
                                                    </div>
                                                    <span className='text-gray-500'><BsDot /></span>
                                                    <div>
                                                        <p className='text-[14px] text-gray-500'> Outdoors </p>
                                                    </div>
                                                </div></div>
                                            <div>
                                                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                                                    <GoShare />
                                                </button>
                                                <button
                                                    className="p-3 rounded-full text-[#000] hover:bg-gray-100 transition-colors cursor-pointer"
                                                    onClick={() => toggleFavorite(experience.id)}
                                                >
                                                    {isFavorite ? (
                                                        <GoHeart className="text-red-500" />
                                                    ) : (
                                                        <GoHeart className="text-[#000]" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col py-5 gap-3">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={experience.host?.image ||
                                                        "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk="
                                                    }
                                                    alt="Host"
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-solid border-white "
                                                    onError={(e) => {
                                                        console.log('Image failed to load, using fallback');
                                                        e.target.src = "https://media.istockphoto.com/id/1290743328/vector/faceless-man-abstract-silhouette-of-person-the-figure-of-man-without-a-face-front-view.jpg?s=612x612&w=0&k=20&c=Ys-4Co9NaWFFBDjmvDJABB2BPePxJwHugC8_G5u0rOk=";
                                                    }}
                                                    style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
                                                />
                                                <div>
                                                    <h1 className="font-semibold text-[16px]">
                                                        Hosted by {experience.host?.name || "Unknown"}'s Team
                                                    </h1>
                                                    <p className="text-[14px] text-gray-400">
                                                        {experience.location?.address || "Unknown Location"}-based cultural ambassador
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={
                                                        experience.mapImage ||
                                                        "https://cdn-icons-png.flaticon.com/512/5323/5323926.png"
                                                    }
                                                    alt="Map"
                                                    className="w-10 h-10 rounded-md object-cover  border-2 border-solid border-white"
                                                    style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
                                                />
                                                <div>
                                                    <h1 className="font-semibold text-[16px]">Taxi Parking at Europe Square</h1>
                                                    <p className="text-[14px] text-gray-400">
                                                        {experience.location?.address || "Unknown Location"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='sticky top-30'>
                                    <BookingCard />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Reviews reviews={experience.reviews} hostRating={experience.host.rating} />
                        </div>
                        <div className="py-10 flex flex-col gap-3">
                            <div className=" flex flex-col gap-3">
                                <h1 className="text-2xl font-bold text-gray-900 pb-4">Things to know</h1>
                            </div>

                            <div className="grid md:grid-cols-3 gap-3 py-2">
                                <div className="flex flex-col gap-2">
                                    <Users className="w-6 h-6 text-gray-600" />
                                    <h2 className="text-[16px] font-semibold text-gray-900">Guest requirements</h2>

                                    <p className="text-[15px]   text-gray-600 leading-relaxed">
                                        Guests ages 2 and up can attend, up to 4 guests total.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Accessibility className="w-6 h-6 text-gray-600" />
                                    <h2 className="text-[16px] font-semibold text-gray-900">Accessibility</h2>
                                    <div className="text-gray-600 leading-relaxed">
                                        <p className='text-[15px]'>Access provider supported</p>
                                        <button className="text-black underline hover:no-underline text-[15px]">
                                            Learn more
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-6 h-6 text-gray-600" />
                                        <h2 className="text-[16px] font-semibold text-gray-900">Cancellation policy</h2>
                                    </div>
                                    <p className="text-[15px] text-gray-600 leading-relaxed">
                                        Cancel at least 1 day before the start time for a full refund.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F4F2EC] w-full flex flex-col items-center text-center px-4 py-10">
                <img src={vet} alt="Vetted Photographer" className="w-28 md:w-40 mb-3" />
                <h2 className="text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight mb-4">
                    Photographers on Airbnb<br />
                    are vetted for quality
                </h2>
                <p className="text-gray-600 text-[15px] md:text-[15px] leading-relaxed max-w-[500px] mb-6">
                    Photographers are evaluated for their professional <br></br>experience, portfolio of strong work,
                    and reputation for <br></br>excellence.{' '}
                    <button className="text-gray-900 underline hover:no-underline font-medium">
                        Learn more
                    </button>
                </p>
            </div>

            <div className="w-full flex justify-center px-4 pb-10 pt-5">
                <p className="text-[13px] md:text-[14px] text-gray-500">
                    See an issue?{' '}
                    <span className="underline cursor-pointer hover:text-gray-700">
                        Report this listing.
                    </span>
                </p>
            </div>

            <div className="block md:hidden">
                <MobileFooter />
            </div>
        </div>
    )
}

export default ExperiencesDetailPage