'use client';

import React, { useState } from 'react';
import { useDatePickerStore } from '../../store/datePickerStore';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';

const MiniCalendar: React.FC = () => {
  const { previewDates, dateRange, isEnabled } = useDatePickerStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const isRecurringDate = (date: Date) => {
    return previewDates.some(previewDate => isSameDay(date, previewDate));
  };

  const isStartDate = (date: Date) => {
    return isSameDay(date, dateRange.startDate);
  };

  const isEndDate = (date: Date) => {
    return dateRange.endDate && isSameDay(date, dateRange.endDate);
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Preview Calendar
        </h3>
        <button
          onClick={goToToday}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          Today
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h4 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(day => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isRecurring = isEnabled && isRecurringDate(day);
            const isStart = isStartDate(day);
            const isEnd = isEndDate(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className={`
                  relative h-10 w-10 flex items-center justify-center text-sm rounded-md transition-colors
                  ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${isToday ? 'bg-gray-100 font-semibold' : ''}
                  ${isRecurring ? 'bg-primary-100 text-primary-800 font-medium' : ''}
                  ${isStart ? 'bg-primary-600 text-white font-bold' : ''}
                  ${isEnd ? 'bg-red-500 text-white font-bold' : ''}
                `}
              >
                {format(day, 'd')}
                {isStart && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                )}
                {isEnd && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-600 rounded"></div>
            <span className="text-gray-600">Start Date</span>
          </div>
          {dateRange.endDate && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600">End Date</span>
            </div>
          )}
          {isEnabled && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-100 border border-primary-300 rounded"></div>
              <span className="text-gray-600">Recurring Dates</span>
            </div>
          )}
        </div>
      </div>

      {isEnabled && previewDates.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {previewDates.length} recurring dates
          {previewDates.length >= 50 && ' (limited to 50 for preview)'}
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
