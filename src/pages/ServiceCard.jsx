import React from 'react';
import { Star, MapPin, Clock, User, Camera } from 'lucide-react';
import { useState } from "react";
import { Users, Accessibility, Calendar } from 'lucide-react';
import vet from "../assets/vet-icons/vet_icon.avif"

function ReviewCard({ review }) {
    const [showMore, setShowMore] = useState(false);
    const comment = review.comment;
    const shouldTruncate = comment.length > 180;

    const displayText = showMore || !shouldTruncate
        ? comment
        : comment.slice(0, 180) + "...";

    return (
        <div className="bg-white rounded-xl p-5 ">
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={review.image}
                    alt={review.reviewer}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-medium text-gray-900">{review.reviewer}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center text-black">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                        </span>
                        <span className="mx-1">·</span>
                        <span>2 weeks ago</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
                {displayText}
                {shouldTruncate && (
                    <span
                        onClick={() => setShowMore(!showMore)}
                        className="ml-1 text-sm text-gray-600 font-medium cursor-pointer"
                    >
                        {showMore ? "Show less" : "Show more"}
                    </span>
                )}
            </p>
        </div>
    );
}

const ServiceCard = ({ service }) => {
    const averageRating = (
        service.reviews.reduce((sum, review) => sum + review.rating, 0) /
        service.reviews.length
    ).toFixed(1);

    return (
        <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className='pt-26'>
                    <div className='border-b border-gray-200'>
                        <div className="space-y-4">
                            {service.types.map((type, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-3 hover:cursor-pointer"
                                >
                                    <img
                                        src={type.image}
                                        alt={type.name}
                                        className="w-30 h-30 rounded-[30px] object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-[16px] font-semibold text-gray-900 mb-1">{type.name}</h4>
                                        <p className="text-[14px] text-black mb-1 font-semibold">
                                            ${type.price} / guest ・ {type.duration}
                                        </p>
                                        <p className="text-[15px] text-gray-600 leading-relaxed">{type.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className='text-gray-700 text-[14px] py-5'>You can message {service.host.name} to customize or make changes.</p>
                    </div>

                    <div className='py-10 border-b border-gray-200'>
                        <h1 className="text-2xl font-bold text-gray-900 ">My qualifications</h1>

                        <div className="flex gap-6">
                            <div className="w-[350px] h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                                <img
                                    src={service.host.image}
                                    alt={service.host.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{service.host.name}</h2>
                                <p className="text-gray-600 text-sm">{service.host.work}</p>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">12 years of experience</h3>
                                        <p className="text-gray-600 text-sm">
                                            Starting out at 11, I've guided models, shot landscapes, and taught photography.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Career highlight</h3>
                                        <p className="text-gray-600 text-sm">
                                            I organized an exhibition in Nice in 2016 and featured at the Menton photography festival.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Photography teacher</h3>
                                        <p className="text-gray-600 text-sm">
                                            I helped guide several young women into modeling with a supportive approach.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button className="bg-gray-200 py-3 w-full rounded-[14px] text-[15px] font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                                Message {service.host.name}
                            </button>
                            <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
                                To help protect your payment, always use Airbnb <br></br>
                                to send money and communicate with hosts.
                            </p>
                        </div>
                    </div>
                    <div className='py-10 border-b border-gray-200'>
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">My portfolio</h1>

                        <div className="flex gap-2 h-[400px]">
                            <div className="flex-[2] relative overflow-hidden rounded-2xl">
                                <img
                                    src={service.images[0]}
                                    alt="Portfolio work 1"
                                    className="w-full h-full object-cover hover:cursor-pointer"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                {/* Top right image */}
                                <div className="flex-1 relative overflow-hidden rounded-2xl">
                                    <img
                                        src={service.images[1]}
                                        alt="Portfolio work 2"
                                        className="w-full h-full object-cover hover:cursor-pointer"
                                    />
                                </div>

                                {/* Bottom right image */}
                                <div className="flex-1 relative overflow-hidden rounded-2xl">
                                    <img
                                        src={service.images[2]}
                                        alt="Portfolio work 3"
                                        className="w-full h-full object-cover hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='py-10 border-b border-gray-200 flex flex-col gap-3'>
                        <h1 className="text-2xl font-bold text-gray-900 ">{service.reviews.length} Reviews</h1>
                        <h2 className="text-[16px] text-gray-700">
                            Average rating:  {averageRating} ·
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {service.reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))}
                        </div>
                        <div><button className='bg-gray-100 w-full py-3 rounded-[20px] font-semibold hover:bg-gray-200 cursor-pointer'>Show all {service.reviews.length} reviews </button></div>

                    </div>
                    <div className="py-10 border-b border-gray-200 flex flex-col gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">I'll come to you</h1>
                        <p className="text-[16px] text-gray-500">
                            I travel to guests in {service.location.address}. To book in a different
                            location, you can message me.
                        </p>

                        <div className="w-full h-[300px] mt-4 rounded-xl overflow-hidden border border-gray-30  0">
                            <iframe
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://maps.google.com/maps?q=${service.location.coordinates.lat},${service.location.coordinates.lng}&z=15&output=embed`}
                            ></iframe>
                        </div>
                        <p className="text-[16px] text-gray-500">
                            You can also come to me: <br></br>
                            {service.location.coordinates.lat}, {service.location.coordinates.lng}, {service.location.address}
                        </p>
                    </div>

                    <div className="py-10 flex flex-col gap-3">
                        <div className=" flex flex-col gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 pb-4    ">Things to know</h1>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 py-2">
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

                    <div className="bg-orange-100 w-full flex flex-col items-center text-center px-4 py-10 rounded-[40px]">
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


                </div></div>
        </div>
    );
};

export default ServiceCard