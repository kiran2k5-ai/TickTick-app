'use client';

import React from 'react';
import { Calendar, X } from 'lucide-react';
import { useDatePickerStore } from '../../store/datePickerStore';

const DateRangePicker: React.FC = () => {
  const { dateRange, setDateRange } = useDatePickerStore();

  const handleStartDateChange = (date: string) => {
    setDateRange({
      ...dateRange,
      startDate: new Date(date),
    });
  };

  const handleEndDateChange = (date: string) => {
    setDateRange({
      ...dateRange,
      endDate: date ? new Date(date) : undefined,
    });
  };

  const clearEndDate = () => {
    setDateRange({
      ...dateRange,
      endDate: undefined,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Date Range
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            value={dateRange.startDate.toISOString().split('T')[0]}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date (Optional)
          </label>
          <div className="relative">
            <input
              type="date"
              value={dateRange.endDate?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleEndDateChange(e.target.value)}
              min={dateRange.startDate.toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {dateRange.endDate && (
              <button
                onClick={clearEndDate}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear end date"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
