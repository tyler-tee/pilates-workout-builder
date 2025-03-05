import React, { useState, useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import WorkoutDisplay from './WorkoutDisplay';
import { loadSavedWorkouts } from '../utils/storageUtils';

function App() {
  const [workout, setWorkout] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  
  // Load saved workouts on mount
  useEffect(() => {
    setSavedWorkouts(loadSavedWorkouts());
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">PilatesPulse</h1>
        <p className="text-gray-600">Create personalized Pilates routines based on your preferences</p>
      </header>
      
      <main className="flex-grow w-full max-w-5xl mx-auto">
        {!workout ? (
          <PreferencesForm 
            setWorkout={setWorkout} 
            savedWorkouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        ) : (
          <WorkoutDisplay 
            workout={workout} 
            setWorkout={setWorkout}
            savedWorkouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        )}
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PilatesPulse</p>
        <p className="mt-1">Always consult with a fitness professional before starting a new exercise program.</p>
      </footer>
    </div>
  );
}

export default App;