'use client';

import React, { useState, useEffect } from 'react';
import RecurringDatePicker from '../components/RecurringDatePicker';

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

  const sortedDates = selectedDates.sort((a, b) => a.getTime() - b.getTime());

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Recurring Date Picker Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            A comprehensive recurring date picker component with support for daily, weekly, 
            monthly, and yearly patterns. Features include custom intervals, specific day 
            selection, and advanced monthly patterns.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
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

        {/* Add selected dates display */}
        {selectedDates.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Recurring Dates:</h3>
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
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-pink-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center relative">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ✨ Features & Capabilities
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Daily Recurrence</h3>
                  <p className="text-gray-600 text-sm">Every X days with customizable intervals</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-purple-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-purple-900 mb-2">Weekly Recurrence</h3>
                  <p className="text-gray-600 text-sm">Specific days of the week selection</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-green-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Monthly Recurrence</h3>
                  <p className="text-gray-600 text-sm">By date or weekday pattern options</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-orange-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Yearly Recurrence</h3>
                  <p className="text-gray-600 text-sm">Annual patterns and celebrations</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">Advanced Patterns</h3>
                  <p className="text-gray-600 text-sm">"Second Tuesday of every month" and more</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-pink-300/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <div>
                  <h3 className="font-bold text-pink-900 mb-2">Visual Preview</h3>
                  <p className="text-gray-600 text-sm">Mini calendar with highlighted dates</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30">
              <span className="text-sm font-medium text-gray-700">🚀 Built with React & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
