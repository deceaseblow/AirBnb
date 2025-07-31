import { Share, Heart, Star, ChevronLeft, ChevronRight, Users, Calendar, Wifi, Car, Coffee, Utensils, Wind, Tv, Zap, MapPin, Shield, Award } from 'lucide-react';


const Reviews = ({ reviews, hostRating }) => {
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
        <div id="reviews" className="py-8 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-6">
                <Star size={20} className="text-gray-900 fill-current" />
                <span className="text-xl font-semibold text-gray-900">
                    {averageRating.toFixed(1)} • {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <img
                                src={review.image || `https://ui-avatars.com/api/?name=${review.reviewer}&background=random`}
                                alt={review.reviewer}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{review.reviewer}</p>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <Star key={i} size={12} className="text-gray-900 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>

            {reviews.length > 2 && (
                <button className="mt-6 border border-gray-300 rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition-colors">
                    Show all {reviews.length} reviews
                </button>
            )}
        </div>
    );
};

export default Reviews