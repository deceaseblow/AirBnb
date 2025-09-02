import React, { useState } from "react";
import { useUser } from "../contexts/UsersContext";
const BookingCard = ({ experienceId, pricePerGuest =74}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { addExperienceBooking } = useUser();

  const availabilityData = [
    {
      date: "Tomorrow, August 7",
      time: "8:30 AM – 5:00 PM",
      spots: "3 spots left",
      spotsColor: "text-red-500",
    },
    {
      date: "Friday, August 8",
      time: "8:00 AM – 4:30 PM",
      spots: "Up to 6 guests",
      spotsColor: "text-gray-500",
    },
    {
      date: "Friday, August 8",
      time: "8:30 AM – 5:00 PM",
      spots: "12 spots left",
      spotsColor: "text-gray-500",
    },
    {
      date: "Sunday, August 10",
      time: "8:00 AM – 4:30 PM",
      spots: "Up to 6 guests",
      spotsColor: "text-gray-500",
    },
    {
      date: "Sunday, August 10",
      time: "8:30 AM – 5:00 PM",
      spots: "12 spots left",
      spotsColor: "text-gray-500",
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSlotSelect = (slot) => {
    const id = slot.date + " " + slot.time;
    setSelectedSlotId(id);
  };

  const selectedSlot = availabilityData.find(
    (slot) => slot.date + " " + slot.time === selectedSlotId
  );

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return alert("Please select a date/time slot");

    setBookingLoading(true);

    try {
      await addExperienceBooking({
        experienceId,
        date: selectedSlot.date,
        time: selectedSlot.time,
      });
      alert("Booking confirmed!");
      closeModal();
    } catch (error) {
      alert("Failed to book experience.");
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            From <span className="font-bold">${pricePerGuest}</span>
            <span className="text-sm font-normal text-gray-500"> / guest</span>
          </div>
          <div className="text-sm text-red-500 font-medium mt-1">Free cancellation</div>

          {/* Show selected slot summary */}
          {selectedSlot && (
            <div className="mt-2 text-sm text-gray-700">
              Selected: <span className="font-medium">{selectedSlot.date}</span> at{" "}
              <span className="font-medium">{selectedSlot.time}</span>
            </div>
          )}
        </div>
        <button
          onClick={openModal}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors mt-4 md:mt-0"
        >
          Show dates
        </button>
      </div>
      <div className="p-4">
        {availabilityData.map((item, index) => {
          const id = item.date + " " + item.time;
          const isSelected = id === selectedSlotId;

          return (
            <div
              key={index}
              onClick={() => handleSlotSelect(item)}
              className={`flex justify-between items-center py-4 px-3 border rounded-xl mb-3 last:mb-0 cursor-pointer transition-colors
                ${isSelected ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}
              `}
            >
              <div>
                <div className="font-medium text-gray-900 text-base">{item.date}</div>
                <div className="text-sm text-gray-500 mt-1">{item.time}</div>
              </div>
              <div className={`text-sm font-medium ${item.spotsColor}`}>{item.spots}</div>
            </div>
          );
        })}
      </div>
      <div className="p-6 pt-2">
        <button className="text-gray-700 font-medium text-base hover:text-gray-900 transition-colors">
          Show all dates
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(54, 54, 54, 0.54)" }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Select a date and time</h2>
            <div className="space-y-3 mb-2">
              {availabilityData.map((slot, idx) => {
                const id = slot.date + " " + slot.time;
                const isSelected = id === selectedSlotId;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSlotSelect(slot)}
                    className={`cursor-pointer border rounded-xl p-3 flex justify-between items-center
                      ${isSelected ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-500"}
                    `}
                  >
                    <div>
                      <div className="font-medium text-gray-900">{slot.date}</div>
                      <div className="text-sm text-gray-500">{slot.time}</div>
                    </div>
                    <div className={`text-sm font-medium ${slot.spotsColor}`}>{slot.spots}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                disabled={bookingLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                disabled={!selectedSlot || bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
