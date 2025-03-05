import React from 'react';
import { bodyAreaOptions } from '../data/options';
import { deleteWorkout } from '../utils/storageUtils';

function SavedWorkouts({ savedWorkouts, setSavedWorkouts, setWorkout }) {
  const handleLoadWorkout = (saved) => {
    setWorkout(saved);
  };
  
  const handleDeleteWorkout = (workoutId) => {
    const updatedWorkouts = deleteWorkout(workoutId, savedWorkouts);
    setSavedWorkouts(updatedWorkouts);
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Saved Workouts</h2>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {savedWorkouts.map(saved => (
          <div key={saved.id} className="flex justify-between items-center border p-2 rounded">
            <span className="text-sm">
              {new Date(saved.date).toLocaleDateString()} - {saved.totalDuration}min
              {saved.preferences.targetAreas.length > 0 && (
                <span className="text-gray-500 ml-1">
                  ({saved.preferences.targetAreas.map(area => {
                    const areaOption = bodyAreaOptions.find(opt => opt.id === area);
                    return areaOption ? areaOption.label.split('/')[0] : area;
                  }).join(', ')})
                </span>
              )}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleLoadWorkout(saved)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
              >
                Load
              </button>
              <button 
                onClick={() => handleDeleteWorkout(saved.id)}
                className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedWorkouts;