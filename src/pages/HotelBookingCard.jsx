import { useState } from "react";
import { Users } from 'lucide-react';

const BookingCard = ({
  pricePerNight = 120,
  checkIn,
  checkOut,
  onDateClick,
  guests,
  onGuestsChange,
  hotelId,
  onBooking 
}) => {
  const [isBooking, setIsBooking] = useState(false);

  const formatDateDisplay = (date) => {
    if (!date) return 'Add date';
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = nights * pricePerNight;
  const cleaningFee = 50;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + cleaningFee + serviceFee;

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    setIsBooking(true);

    try {
      const bookingData = {
        hotelId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        pricePerNight,
        nights,
        subtotal,
        cleaningFee,
        serviceFee,
        total
      };

      await onBooking(bookingData);
      
      // Show success message
      alert(`Booking confirmed! Total: $${total}`);
      
    } catch (error) {
      console.error('Booking failed:', error);
      alert(error.message || 'Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 max-w-md mx-auto mt-8 relative z-40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-semibold">${pricePerNight}</span>
          <span className="text-gray-600">night</span>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-black transition-colors"
          onClick={onDateClick}
        >
          <div className="border-r border-gray-300 p-3">
            <p className="text-[10px] font-semibold uppercase text-gray-500">Check-in</p>
            <p className="text-sm font-medium">
              {checkIn ? new Date(checkIn).toLocaleDateString() : 'Add date'}
            </p>
          </div>
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase text-gray-500">Check-out</p>
            <p className="text-sm font-medium">
              {checkOut ? new Date(checkOut).toLocaleDateString() : 'Add date'}
            </p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-3 relative">
          <label className="block text-xs font-semibold text-gray-900 mb-1">GUESTS</label>
          <select
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="w-full text-sm focus:outline-none cursor-pointer bg-transparent appearance-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
            ))}
          </select>
          <Users className="absolute right-2 top-8 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button 
          className={`w-full text-white rounded-lg py-3 font-semibold transition-colors ${
            isBooking 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#FF385C] hover:bg-[#E31C5A]'
          }`}
          onClick={handleReserve}
          disabled={isBooking}
        >
          {isBooking ? 'Processing...' : 'Reserve'}
        </button>

        <p className="text-center text-gray-600 text-sm">You won't be charged yet</p>

        {nights > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="underline">${pricePerNight} x {nights} nights</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;