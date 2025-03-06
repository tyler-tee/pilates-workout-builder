// src/components/ImprovedNavigation.js
import React from 'react';
import { useAppContext } from '../context/AppContext';

function ImprovedNavigation() {
  const { currentView, setCurrentView } = useAppContext();

  const navItems = [
    { id: 'generator', label: 'Workout Generator', icon: '💪' },
    { id: 'programs', label: 'Programs', icon: '🏆' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'exercises', label: 'Exercise Library', icon: '📚' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
  ];

  return (
    <nav className="mb-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex border-b border-gray-200">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex items-center px-4 py-3 font-medium text-sm transition-colors duration-200 relative ${
              currentView === item.id
                ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-current={currentView === item.id ? 'page' : undefined}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide py-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex-shrink-0 flex flex-col items-center px-3 py-2 text-xs rounded-lg mr-2 ${
                currentView === item.id
                  ? 'text-white bg-blue-600'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default ImprovedNavigation;