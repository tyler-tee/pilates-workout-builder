// src/components/WelcomeOverview.js
import React from 'react';
import { useAppContext } from '../context/AppContext';

function WelcomeOverview() {
  const { setCurrentView } = useAppContext();

  const features = [
    {
      icon: '💪',
      title: 'Custom Workouts',
      description: 'Generate personalized Pilates routines based on your preferences and equipment',
      action: () => setCurrentView('generator')
    },
    {
      icon: '🧠',
      title: 'Smart Modifications',
      description: 'Get exercise modifications based on your health considerations and needs',
      action: () => setCurrentView('generator')
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your workout history and see your improvements over time',
      action: () => setCurrentView('progress')
    },
    {
      icon: '❤️',
      title: 'Save Favorites',
      description: 'Bookmark your favorite exercises for quick access later',
      action: () => setCurrentView('favorites')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to PilatesPulse</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your personal Pilates assistant that helps you create custom workouts, track your progress, 
          and reach your fitness goals. Get started by exploring these features:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={feature.action}
          >
            <div className="flex items-start">
              <div className="text-3xl mr-4">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentView('generator')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-sm transition-colors"
        >
          Create Your First Workout
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Need help? Check out our <button className="text-blue-600 hover:underline">quick start guide</button>.
        </p>
      </div>
    </div>
  );
}

export default WelcomeOverview;