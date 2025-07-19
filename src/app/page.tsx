'use client';

import React from 'react';
import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Home() {
  const handleDatesChange = (dates: Date[]) => {
    console.log('Recurring dates updated:', dates);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recurring Date Picker Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive recurring date picker component with support for daily, weekly, 
            monthly, and yearly patterns. Features include custom intervals, specific day 
            selection, and advanced monthly patterns.
          </p>
        </div>
        
        <RecurringDatePicker 
          onDatesChange={handleDatesChange}
          className="mb-8"
        />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Daily Recurrence:</strong> Every X days
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Weekly Recurrence:</strong> Specific days of the week
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Monthly Recurrence:</strong> By date or weekday pattern
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Yearly Recurrence:</strong> Annual patterns
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Advanced Patterns:</strong> "Second Tuesday of every month"
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Visual Preview:</strong> Mini calendar with highlighted dates
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
