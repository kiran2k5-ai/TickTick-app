'use client';

import React from 'react';
import { useDatePickerStore } from '../../store/datePickerStore';
import { RecurrenceType } from '../../types';
import { Repeat, ChevronDown } from 'lucide-react';
import { getWeekdayName, getOrdinalSuffix } from '../../utils/dateUtils';

const RecurrenceOptions: React.FC = () => {
  const { recurrenceRule, setRecurrenceRule } = useDatePickerStore();

  const handleTypeChange = (type: RecurrenceType) => {
    setRecurrenceRule({
      ...recurrenceRule,
      type,
      selectedDays: type === 'weekly' ? [new Date().getDay()] : undefined,
      monthlyPattern: type === 'monthly' ? 'date' : undefined,
    });
  };

  const handleIntervalChange = (interval: number) => {
    setRecurrenceRule({
      ...recurrenceRule,
      interval: Math.max(1, interval),
    });
  };

  const handleDayToggle = (dayIndex: number) => {
    const selectedDays = recurrenceRule.selectedDays || [];
    const newSelectedDays = selectedDays.includes(dayIndex)
      ? selectedDays.filter(d => d !== dayIndex)
      : [...selectedDays, dayIndex].sort();
    
    setRecurrenceRule({
      ...recurrenceRule,
      selectedDays: newSelectedDays,
    });
  };

  const handleMonthlyPatternChange = (pattern: 'date' | 'weekday') => {
    const today = new Date();
    setRecurrenceRule({
      ...recurrenceRule,
      monthlyPattern: pattern,
      weekOfMonth: pattern === 'weekday' ? Math.ceil(today.getDate() / 7) : undefined,
      dayOfWeek: pattern === 'weekday' ? today.getDay() : undefined,
    });
  };

  const handleWeekdayPatternChange = (weekOfMonth: number, dayOfWeek: number) => {
    setRecurrenceRule({
      ...recurrenceRule,
      weekOfMonth,
      dayOfWeek,
    });
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekNumbers = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Repeat className="w-5 h-5" />
        Recurrence Pattern
      </h3>

      {/* Recurrence Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repeat
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['daily', 'weekly', 'monthly', 'yearly'] as RecurrenceType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                recurrenceRule.type === type
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Interval */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Every
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="999"
            value={recurrenceRule.interval}
            onChange={(e) => handleIntervalChange(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <span className="text-gray-700">
            {recurrenceRule.type}
            {recurrenceRule.interval !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Weekly specific options */}
      {recurrenceRule.type === 'weekly' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            On days
          </label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayToggle(index)}
                className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  recurrenceRule.selectedDays?.includes(index)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly specific options */}
      {recurrenceRule.type === 'monthly' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat by
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="monthlyPattern"
                checked={recurrenceRule.monthlyPattern === 'date'}
                onChange={() => handleMonthlyPatternChange('date')}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Day of month</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="monthlyPattern"
                checked={recurrenceRule.monthlyPattern === 'weekday'}
                onChange={() => handleMonthlyPatternChange('weekday')}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Day of week</span>
            </label>
          </div>

          {recurrenceRule.monthlyPattern === 'weekday' && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-700">The</span>
              <select
                value={recurrenceRule.weekOfMonth || 1}
                onChange={(e) => handleWeekdayPatternChange(
                  parseInt(e.target.value),
                  recurrenceRule.dayOfWeek || 0
                )}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                {weekNumbers.map(num => (
                  <option key={num} value={num}>
                    {num}{getOrdinalSuffix(num)}
                  </option>
                ))}
              </select>
              <select
                value={recurrenceRule.dayOfWeek || 0}
                onChange={(e) => handleWeekdayPatternChange(
                  recurrenceRule.weekOfMonth || 1,
                  parseInt(e.target.value)
                )}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                {weekdays.map((day, index) => (
                  <option key={index} value={index}>
                    {getWeekdayName(index)}
                  </option>
                ))}
              </select>
              <span className="text-gray-700">of every month</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;
