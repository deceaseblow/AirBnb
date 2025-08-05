import React from 'react';
import { Heart, Star } from 'lucide-react';

function ServicesFirstLineSCard({ data, service, isFavorite, toggleFavorite, totalCount, selectedService }) {
    const averageRating = service.host?.rating || 4.5;

    return (
        <div className="relative group cursor-pointer w-full">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(service.id);
                    }}
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                    <Heart
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                </button>
                <div className="absolute top-3 left-3 bg-white/90 text-black text-xs px-2 py-1 rounded-full font-medium font-sans">
                    Popular
                </div>
            </div>

            <div className="mt-3 space-y-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 font-sans">
                    {service.name}
                </h3>
                
                <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <p className="text-gray-600 text-xs sm:text-sm font-sans truncate">
                            Hosted by {service.host?.name}
                        </p>
                        <span className="hidden sm:inline text-gray-400 text-xs sm:text-sm">•</span>
                        <p className="text-gray-600 text-xs sm:text-sm font-sans truncate">
                            {service.location?.address}
                        </p>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm font-sans">
                        From ${service.price_per_person} / guest
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-gray-400" />
                            <span className="text-xs sm:text-sm text-gray-500">
                                {averageRating.toFixed(1)}
                            </span>
                        </div>
                        <span className="text-gray-400 text-xs sm:text-sm">•</span>
                        <div className="text-gray-600 text-xs sm:text-sm font-sans">
                            {totalCount} reviews
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesFirstLineSCard
