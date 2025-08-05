import { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarComponent = ({
  checkIn,
  checkOut,
  onDateSelect,
  title = "Select dates",
  className = "",
  showHeader = true,
  showControls = true
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const getNextMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  };

  const handleDateClick = (date) => {
    if (!date || !onDateSelect) return;

    if (!checkIn || (checkIn && checkOut)) {
      onDateSelect(date, null);
    } else if (checkIn && !checkOut) {
      if (date > checkIn) {
        onDateSelect(checkIn, date);
      } else {
        onDateSelect(date, null);
      }
    }
  };

  const isDateInRange = (date) => {
    if (!date || !checkIn || !checkOut) return false;
    return date >= checkIn && date <= checkOut;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return (checkIn && date.getTime() === checkIn.getTime()) ||
      (checkOut && date.getTime() === checkOut.getTime());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const renderMonth = (monthDate) => {
    const days = getDaysInMonth(monthDate);
    const monthName = months[monthDate.getMonth()];
    const year = monthDate.getFullYear();

    return (
      <div className="flex-1">
        <div className="text-center font-semibold text-gray-900 mb-4">
          {monthName} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={!date || !onDateSelect}
              className={`
                h-10 w-10 rounded-full text-sm flex items-center justify-center transition-colors
                ${!date ? 'invisible' : ''}
                ${isDateSelected(date) ? 'bg-black text-white' : ''}
                ${isDateInRange(date) && !isDateSelected(date) ? 'bg-gray-100' : ''}
                ${date && !isDateSelected(date) && !isDateInRange(date) && onDateSelect ? 'hover:bg-gray-100' : ''}
                ${date && date < new Date() ? 'text-gray-300 cursor-not-allowed' : ''}
                ${!onDateSelect ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const nights = calculateNights();

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {checkIn && checkOut
              ? `${nights} nights in Khet Sathon`
              : title}
          </h3>
          {checkIn && checkOut && (
            <p className="text-gray-600 text-sm mt-1">
              {formatDate(checkIn)} - {formatDate(checkOut)}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-8">
        {renderMonth(currentMonth)}
        {renderMonth(getNextMonth())}
      </div>

      {showControls && onDateSelect && (
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => onDateSelect(null, null)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};
export default CalendarComponent