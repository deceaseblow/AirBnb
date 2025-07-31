import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GetawaysInspiration = () => {
  const [activeTab, setActiveTab] = useState('Unique stays');
  const [showAll, setShowAll] = useState({});

  const tabs = [
    'Unique stays',
    'Categories',
    'Travel tips & inspiration',
    'Airbnb-friendly apartments'
  ];

  const tabContent = {
    'Unique stays': [
      { name: 'Cabins', location: 'United States' },
      { name: 'Treehouses', location: 'United States' },
      { name: 'Tiny Houses', location: 'United States' },
      { name: 'Beach Houses', location: 'United States' },
      { name: 'Lakehouses', location: 'United States' },
      { name: 'Yurt Rentals', location: 'United States' },
      { name: 'Yurt Rentals', location: 'United Kingdom' },
      { name: 'Castle Rentals', location: 'United States' },
      { name: 'Houseboats', location: 'United States' },
      { name: 'Holiday Caravans', location: 'United Kingdom' },
      { name: 'Private Island Rentals', location: 'United States' },
      { name: 'Farm Houses', location: 'United States' },
      { name: 'Farm Cottages', location: 'United Kingdom' },
      { name: 'Cabin Rentals', location: 'Australia' },
      { name: 'Luxury Cabins', location: 'United Kingdom' },
      { name: 'Luxury Cabins', location: 'United States' },
      { name: 'Holiday Chalets', location: 'United Kingdom' }
    ],
    'Categories': [
      { name: 'Amazing pools', location: '' },
      { name: 'Arctic', location: '' },
      { name: 'Camping', location: '' },
      { name: 'Campers', location: '' },
      { name: 'Castles', location: '' },
      { name: 'Containers', location: '' },
      { name: 'Countryside', location: '' },
      { name: 'Design', location: '' },
      { name: 'Earth homes', location: '' },
      { name: 'Farms', location: '' },
      { name: 'National parks', location: '' },
      { name: 'Vineyards', location: '' },
      { name: 'OMG!', location: '' },
      { name: 'Tiny homes', location: '' },
      { name: 'Towers', location: '' },
      { name: 'Windmills', location: '' },
      { name: 'Luxe', location: '' }
    ],
    'Travel tips & inspiration': [
      { name: 'Family travel hub', location: 'Tips and inspiration' },
      { name: 'Family budget travel', location: 'Get there for less' },
      { name: 'Vacation ideas for any budget', location: 'Make it special without making it spendy' },
      { name: 'Travel Europe on a budget', location: 'How to take the kids to Europe for less' },
      { name: 'Outdoor adventure', location: 'Explore nature with the family' },
      { name: 'Bucket list national parks', location: 'Must-see parks for family travel' },
      { name: 'Kid-friendly state parks', location: 'Check out these family-friendly hikes' }
    ],
    'Airbnb-friendly apartments': [
      { name: 'Atlanta Metro', location: 'Georgia' },
      { name: 'Augusta', location: 'Georgia' },
      { name: 'Austin Metro', location: 'Texas' },
      { name: 'Baton Rouge', location: 'Louisiana' },
      { name: 'Birmingham', location: 'Alabama' },
      { name: 'Boise', location: 'Idaho' },
      { name: 'Boston Metro', location: 'Massachusetts' },
      { name: 'Boulder', location: 'Colorado' },
      { name: 'Charlotte', location: 'North Carolina' },
      { name: 'Chicago Metro', location: 'Illinois' },
      { name: 'Cincinnati', location: 'Ohio' },
      { name: 'Columbus', location: 'Ohio' },
      { name: 'Crestview', location: 'Florida' },
      { name: 'Dallas', location: 'Texas' },
      { name: 'Denver', location: 'Colorado' },
      { name: 'Fayetteville', location: 'North Carolina' },
      { name: 'Fort Myers', location: 'Florida' },
      { name: 'Houston Metro', location: 'Texas' },
      { name: 'Indianapolis', location: 'Indiana' },
      { name: 'Jacksonville', location: 'Florida' },
      { name: 'Lacey', location: 'Washington' },
      { name: 'Lexington Park', location: 'Maryland' },
      { name: 'Los Angeles', location: 'California' },
      { name: 'Loveland', location: 'Colorado' },
      { name: 'Madison', location: 'Alabama' },
      { name: 'Memphis', location: 'Tennessee' },
      { name: 'Miami', location: 'Florida' },
      { name: 'Minneapolis', location: 'Minnesota' },
      { name: 'Myrtle Beach', location: 'South Carolina' },
      { name: 'Narragansett', location: 'Rhode Island' },
      { name: 'Nashville Metro', location: 'Tennessee' },
      { name: 'Orange County', location: 'California' },
      { name: 'Marin County', location: 'California' },
      { name: 'Norfolk', location: 'Virginia' },
      { name: 'East Bay', location: 'California' },
      { name: 'Oklahoma City', location: 'Oklahoma' },
      { name: 'Orlando Metro', location: 'Florida' },
      { name: 'Panama City', location: 'Florida' },
      { name: 'Petaluma', location: 'California' },
      { name: 'Philadelphia Metro', location: 'Pennsylvania' },
      { name: 'Phoenix', location: 'Arizona' },
      { name: 'Pittsburgh', location: 'Pennsylvania' },
      { name: 'Port Arthur', location: 'Texas' },
      { name: 'Portland, ME', location: 'Maine' },
      { name: 'Portland', location: 'Oregon' },
      { name: 'Prescott Valley', location: 'Arizona' },
      { name: 'Raleigh', location: 'North Carolina' }
    ]
  };

  const ITEMS_TO_SHOW = 12; // Show first 12 items by default
  const currentItems = tabContent[activeTab] || [];
  const isExpanded = showAll[activeTab] || false;
  const itemsToDisplay = isExpanded ? currentItems : currentItems.slice(0, ITEMS_TO_SHOW);
  const shouldShowToggle = currentItems.length > ITEMS_TO_SHOW;

  const handleToggleShowMore = () => {
    setShowAll(prev => ({
      ...prev,
      [activeTab]: !prev[activeTab]
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset show all state when changing tabs
    setShowAll(prev => ({
      ...prev,
      [tab]: false
    }));
  };

  return (
    <div className="bg-[#fafafa] text-m text-gray-800 py-8 px-12 w-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Inspiration for future getaways
      </h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
        {itemsToDisplay.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="text-sm font-medium text-gray-900 group-hover:underline">
              {item.name}
            </div>
            {item.location && (
              <div className="text-sm text-gray-500 mt-0.5">
                {item.location}
              </div>
            )}
          </div>
        ))}
        
        {/* Show more/less button - only show if there are more items than the threshold */}
        {shouldShowToggle && (
          <div 
            className="flex items-center cursor-pointer group"
            onClick={handleToggleShowMore}
          >
            <span className="text-sm font-medium text-gray-900 group-hover:underline">
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
            {isExpanded ? (
              <ChevronUp className="ml-1 h-4 w-4 text-gray-900 group-hover:text-gray-700" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4 text-gray-900 group-hover:text-gray-700" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetawaysInspiration;