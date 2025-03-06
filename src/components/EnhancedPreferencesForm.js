// src/components/EnhancedPreferencesForm.js
import React, { useState } from 'react';
import { equipmentOptions, durationOptions, difficultyOptions, restTimeOptions } from '../data/options';
import EquipmentSelector from './EquipmentSelector';
import TargetAreaSelector from './TargetAreaSelector';
import HealthConsiderationsSelector from './HealthConsiderationsSelector';
import SavedWorkouts from './SavedWorkouts';
import { generateWorkout } from '../utils/workoutGenerator';

function EnhancedPreferencesForm({ setWorkout, savedWorkouts, setSavedWorkouts, preferences, setPreferences }) {
  const [activeTab, setActiveTab] = useState('equipment');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDurationChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      duration: parseInt(e.target.value, 10)
    }));
  };
  
  const handleDifficultyChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      difficultyLevel: e.target.value
    }));
  };
  
  const handleRestTimeChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      restTime: parseInt(e.target.value, 10)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      const generatedWorkout = generateWorkout(preferences);
      setWorkout(generatedWorkout);
      setIsGenerating(false);
    }, 800);
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'equipment':
        return (
          <EquipmentSelector 
            preferences={preferences} 
            setPreferences={setPreferences} 
            options={equipmentOptions} 
          />
        );
      case 'target':
        return (
          <TargetAreaSelector 
            preferences={preferences} 
            setPreferences={setPreferences} 
          />
        );
      case 'health':
        return (
          <HealthConsiderationsSelector 
            preferences={preferences} 
            setPreferences={setPreferences} 
          />
        );
      case 'saved':
        return savedWorkouts.length > 0 ? (
          <SavedWorkouts 
            savedWorkouts={savedWorkouts} 
            setSavedWorkouts={setSavedWorkouts}
            setWorkout={setWorkout}
          />
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Saved Workouts</h3>
            <p className="text-gray-500">
              After generating a workout, you can save it for quick access later.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate completion percentage for progress indicator
  const calculateCompletion = () => {
    let points = 0;
    const totalPoints = 4;
    
    // Equipment selected
    if (preferences.equipment.length > 0) points++;
    
    // Target areas selected
    if (preferences.targetAreas.length > 0) points++;
    
    // Duration selected (this is always selected with a default)
    points++;
    
    // Health considerations (optional, not required for completion)
    if (preferences.healthConsiderations.length > 0) points += 0.5;
    
    return Math.min((points / totalPoints) * 100, 100);
  };
  
  const completionPercentage = calculateCompletion();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Create Your Workout</h2>
        <p className="text-blue-100 text-sm">
          Customize your preferences to generate a tailored Pilates workout.
        </p>
        
        {/* Progress bar */}
        <div className="mt-4 bg-blue-800 bg-opacity-40 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('equipment')}
              className={`py-3 px-4 border-b-2 font-medium text-sm mr-1 ${
                activeTab === 'equipment'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Equipment
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('target')}
              className={`py-3 px-4 border-b-2 font-medium text-sm mr-1 ${
                activeTab === 'target'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Target Areas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('health')}
              className={`py-3 px-4 border-b-2 font-medium text-sm mr-1 ${
                activeTab === 'health'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Health
            </button>
            {savedWorkouts.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`py-3 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved Workouts
              </button>
            )}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
          
          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Duration
                </label>
                <select 
                  value={preferences.duration} 
                  onChange={handleDurationChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select 
                  value={preferences.difficultyLevel} 
                  onChange={handleDifficultyChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {difficultyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rest Between Exercises
                </label>
                <select 
                  value={preferences.restTime} 
                  onChange={handleRestTimeChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {restTimeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit"
                disabled={isGenerating}
                className={`flex items-center justify-center ${
                  isGenerating 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium py-3 px-6 rounded-md shadow-sm transition-colors min-w-[180px]`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Workout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EnhancedPreferencesForm;