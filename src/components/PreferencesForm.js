import React, { useState } from 'react';
import EquipmentSelector from './EquipmentSelector';
import TargetAreaSelector from './TargetAreaSelector';
import HealthConsiderationsSelector from './HealthConsiderationsSelector';
import SavedWorkouts from './SavedWorkouts';
import { generateWorkout } from '../utils/workoutGenerator';
import { equipmentOptions, durationOptions, difficultyOptions, restTimeOptions } from '../data/options';

function PreferencesForm({ setWorkout, savedWorkouts, setSavedWorkouts }) {
  const [preferences, setPreferences] = useState({
    equipment: [],
    duration: 30,
    targetAreas: [],
    difficultyLevel: 'all',
    healthConsiderations: [],
    restTime: 30,
  });
  
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
    const generatedWorkout = generateWorkout(preferences);
    setWorkout(generatedWorkout);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <EquipmentSelector 
              preferences={preferences} 
              setPreferences={setPreferences} 
              options={equipmentOptions} 
            />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Workout Duration</h2>
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
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Experience Level</h2>
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
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Rest Between Exercises</h2>
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
          
          <div>
            <TargetAreaSelector 
              preferences={preferences} 
              setPreferences={setPreferences} 
            />
            
            <HealthConsiderationsSelector 
              preferences={preferences} 
              setPreferences={setPreferences} 
            />
            
            {savedWorkouts.length > 0 && (
              <SavedWorkouts 
                savedWorkouts={savedWorkouts} 
                setSavedWorkouts={setSavedWorkouts}
                setWorkout={setWorkout}
              />
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors"
          >
            Generate Workout
          </button>
        </div>
      </form>
    </div>
  );
}

export default PreferencesForm;