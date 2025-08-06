import React, { useState } from 'react';
import { X } from 'lucide-react';

// Import your custom icon components
import Home from '../components/icons/HomeIcon';
import BalloonIcon from '../components/icons/BalloonIcon';
import ServiceIcon from '../components/icons/ServiceIcon';

export default function BecomeAHostModal({ isOpen = false, onClose }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        {
            id: 'home',
            title: 'Home',
            icon: <Home />,
            description: 'Host guests in your home'
        },
        {
            id: 'experience',
            title: 'Experience',
            icon: <BalloonIcon />,
            description: 'Create unique experiences'
        },
        {
            id: 'service',
            title: 'Service',
            icon: <ServiceIcon />,
            description: 'Offer professional services'
        }
    ];

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50"
            style={{ backgroundColor: 'rgba(77, 77, 77, 0.54)' }}>
            <div className="bg-white rounded-2xl w-full max-w-4xl p-8 relative animate-in fade-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <X size={20} className="text-gray-600" />
                </button>
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12 mt-4">
                    What would you like to host?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`
                border-2 rounded-2xl py-20 cursor-pointer transition-all duration-200 hover:shadow-lg
                ${selectedOption === option.id
                                    ? 'border-gray-900 bg-gray-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300'
                                }
              `}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="mb-2 transform scale-250">
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mt-4">
                                    {option.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end border-t border-gray-200 pt-3">
                    <button
                        disabled={!selectedOption}
                        className={`
              px-8 py-3 rounded-lg font-medium transition-colors
              ${selectedOption
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
            `}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}