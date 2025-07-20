'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const RecurringDatePicker = dynamic(
  () => import('../components/RecurringDatePicker'),
  { ssr: false }
);

export default function Home() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDatesChange = (dates: Date[]) => {
    console.log('Recurring dates updated:', dates);
    setSelectedDates(dates);
  };

  const clearDates = () => {
    setSelectedDates([]);
  };

  const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Recurring Date Picker Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            A comprehensive recurring date picker component with Zustand state management.
          </p>
        </div>
        
        <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
          {isClient ? (
            <RecurringDatePicker 
              onDatesChange={handleDatesChange}
              className="mb-8"
            />
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
              <div className="animate-pulse">Loading date picker...</div>
            </div>
          )}
        </div>

        {/* Display selected dates */}
        {selectedDates.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Selected Dates:</h3>
              <button
                onClick={clearDates}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sortedDates.slice(0, 12).map((date, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-sm text-blue-800">
                  {date.toLocaleDateString()}
                </div>
              ))}
              {sortedDates.length > 12 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-600">
                  +{sortedDates.length - 12} more...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
