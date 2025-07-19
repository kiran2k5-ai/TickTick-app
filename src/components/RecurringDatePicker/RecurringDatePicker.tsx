'use client';

import React from 'react';
import { useDatePickerStore } from '../../store/datePickerStore';
import RecurrenceOptions from './RecurrenceOptions';
import DateRangePicker from './DateRangePicker';
import MiniCalendar from './MiniCalendar';
import { RotateCcw } from 'lucide-react';

interface RecurringDatePickerProps {
  className?: string;
  onDatesChange?: (dates: Date[]) => void;
}

const RecurringDatePicker: React.FC<RecurringDatePickerProps> = ({
  className = '',
  onDatesChange,
}) => {
  const {
    isEnabled,
    previewDates,
    setIsEnabled,
    reset,
  } = useDatePickerStore();

  React.useEffect(() => {
    if (onDatesChange) {
      onDatesChange(previewDates);
    }
  }, [previewDates, onDatesChange]);

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-4xl mx-auto ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recurring Date Picker</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700">Enable Recurrence</span>
          </label>
          <button
            onClick={reset}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DateRangePicker />
          {isEnabled && <RecurrenceOptions />}
        </div>
        
        <div className="lg:border-l lg:border-gray-200 lg:pl-6">
          <MiniCalendar />
        </div>
      </div>

      {isEnabled && previewDates.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Preview ({previewDates.length} dates)
          </h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {previewDates.slice(0, 20).map((date, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md"
              >
                {date.toLocaleDateString()}
              </span>
            ))}
            {previewDates.length > 20 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                +{previewDates.length - 20} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringDatePicker;
