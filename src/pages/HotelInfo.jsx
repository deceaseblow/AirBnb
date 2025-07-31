import { Share, Heart, Star, ChevronLeft, ChevronRight, Users, Calendar, Wifi, Car, Coffee, Utensils, Wind, Tv, Zap, MapPin, Shield, Award } from 'lucide-react';

const HotelInfo = ({ hotel }) => {
    const rating = hotel.host?.rating || 4.5;
    const reviewCount = hotel.reviews?.length || 0;

    return (
        <div className="space-y-2">
            <div>
                <p className="text-[#000] font-semibold">{hotel.location?.address || 'Location not specified'}</p>
                <div className="flex items-center space-x-1 text-[16px]">
                    <span className="text-gray-700">2 guests</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">1 bedroom</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">1 bed</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">1 bath</span>
                </div>
                <div className="flex items-center space-x-2 text-[16px] text-[#000] font-semibold">
                    <Star size={16} className="text-gray-900 fill-current" />
                    <span>{rating.toFixed(1)}</span>
                    {reviewCount > 0 && <span>• {reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>}
                </div>
            </div>
        </div>
    );
};

export default HotelInfo