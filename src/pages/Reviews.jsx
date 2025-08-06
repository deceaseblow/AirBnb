import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const Reviews = ({ reviews, hostRating }) => {
    const [showModal, setShowModal] = useState(false);

    if (!reviews || reviews.length === 0) {
        return (
            <div id="reviews" className="py-8 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
                <p className="text-gray-600">No reviews yet</p>
            </div>
        );
    }

    const averageRating = hostRating || 4.8;

    return (
        <div id="reviews" className="py-15 border-b border-gray-200 flex flex-col gap-5">
            <div className="flex items-center space-x-2 mb-6">
                <Star size={20} className="text-gray-900 fill-current" />
                <span className="text-xl font-semibold text-gray-900">
                    {averageRating.toFixed(1)} • {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {reviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <img
                                src={review.image || `https://ui-avatars.com/api/?name=${review.reviewer}&background=random`}
                                alt={review.reviewer}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{review.reviewer}</p>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <Star key={i} size={12} className="text-gray-900 fill-current" />
                                    ))}
                                    <span>•</span>
                                    <span className='text-[12px]'>2 days ago</span>
                                </div>

                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>
            {reviews.length > 0 && (
                <div className='flex flex-col gap-3'> 
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-6 bg-gray-100 text-[16px] rounded-lg px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
                >
                    Show all reviews
                </button>
                    <h1 className='text-[14px] text-gray-500 text-center'>Some reviews have been automatically translated.</h1></div>
            )}
            {showModal && (
                <div className="fixed inset-0 z-90 flex items-center justify-center px-4"
                    style={{ backgroundColor: 'rgba(168, 168, 168, 0.44)' }}>
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Reviews</h2>

                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="space-y-3 pb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={review.image || `https://ui-avatars.com/api/?name=${review.reviewer}&background=random`}
                                            alt={review.reviewer}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">{review.reviewer}</p>
                                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                                                {Array.from({ length: review.rating }, (_, i) => (
                                                    <Star key={i} size={12} className="text-gray-900 fill-current" />
                                                ))}
                                                <span>•</span>
                                                <span className='text-[12px]'>2 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
