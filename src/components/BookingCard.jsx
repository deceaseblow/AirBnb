import React from 'react';

const BookingCard = () => {
  const availabilityData = [
    {
      date: "Tomorrow, August 7",
      time: "8:30 AM – 5:00 PM",
      spots: "3 spots left",
      spotsColor: "text-red-500"
    },
    {
      date: "Friday, August 8",
      time: "8:00 AM – 4:30 PM",
      spots: "Up to 6 guests",
      spotsColor: "text-gray-500"
    },
    {
      date: "Friday, August 8",
      time: "8:30 AM – 5:00 PM",
      spots: "12 spots left",
      spotsColor: "text-gray-500"
    },
    {
      date: "Sunday, August 10",
      time: "8:00 AM – 4:30 PM",
      spots: "Up to 6 guests",
      spotsColor: "text-gray-500"
    },
    {
      date: "Sunday, August 10",
      time: "8:30 AM – 5:00 PM",
      spots: "12 spots left",
      spotsColor: "text-gray-500"
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              From <span className="font-bold">$75</span>
              <span className="text-sm font-normal text-gray-500"> / guest</span>
            </div>
            <div className="text-sm text-red-500 font-medium mt-1">
              Free cancellation
            </div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Show dates
          </button>
        </div>
      </div>

      {/* Availability List */}
      <div className="p-4">
        {availabilityData.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-4 px-3 border border-gray-200 rounded-xl mb-3 last:mb-0 hover:border-gray-300 transition-colors cursor-pointer">
            <div>
              <div className="font-medium text-gray-900 text-base">
                {item.date}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {item.time}
              </div>
            </div>
            <div className={`text-sm font-medium ${item.spotsColor}`}>
              {item.spots}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 pt-2">
        <button className="text-gray-700 font-medium text-base hover:text-gray-900 transition-colors">
          Show all dates
        </button>
      </div>
    </div>
  );
};

export default BookingCard;