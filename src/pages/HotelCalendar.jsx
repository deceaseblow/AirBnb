// HotelCalendar.jsx - Fixed version

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HotelCalendar = ({ onDateSelect, selectedCheckIn, selectedCheckOut }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(selectedCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(selectedCheckOut);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return; // Disable past dates

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      if (date > checkInDate) {
        setCheckOutDate(date);
        onDateSelect(checkInDate, date);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
      }
    }
  };

  const isDateInRange = (date) => {
    if (!checkInDate || !checkOutDate || !date) return false;
    return date > checkInDate && date < checkOutDate;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return (
      (checkInDate && date.getTime() === checkInDate.getTime()) ||
      (checkOutDate && date.getTime() === checkOutDate.getTime())
    );
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    if (currentMonth > thisMonth) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const renderMonth = (date, monthOffset = 0) => {
    const monthDate = new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);
    const days = getDaysInMonth(monthDate);

    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && (
            <button 
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
              disabled={monthDate.getFullYear() === new Date().getFullYear() && 
                       monthDate.getMonth() === new Date().getMonth()}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <h3 className="font-semibold text-lg">
            {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
          </h3>
          
          {monthOffset === 1 && (
            <button 
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Day headers - FIXED: Added unique keys */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={`day-header-${monthOffset}-${index}-${day}`} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days - FIXED: Added unique keys using date and position */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const uniqueKey = `${monthOffset}-${index}-${date ? date.getTime() : 'empty'}`;
            
            return (
              <div
                key={uniqueKey} // FIXED: Unique key using monthOffset, index, and date
                onClick={() => handleDateClick(date)}
                className={`
                  h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer text-sm
                  ${!date ? 'invisible' : ''}
                  ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${isDateSelected(date) ? 'bg-black text-white' : ''}
                  ${isDateInRange(date) ? 'bg-gray-100' : ''}
                  ${date && !isPastDate(date) && !isDateSelected(date) ? 'hover:bg-gray-50' : ''}
                `}
              >
                {date ? date.getDate() : ''}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="calendar-section" className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select dates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderMonth(currentDate, 0)}
        {renderMonth(currentDate, 1)}
      </div>

      {(checkInDate || checkOutDate) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            {checkInDate && (
              <span>Check-in: {checkInDate.toLocaleDateString()}</span>
            )}
            {checkInDate && checkOutDate && <span className="mx-2">•</span>}
            {checkOutDate && (
              <span>Check-out: {checkOutDate.toLocaleDateString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelCalendar;