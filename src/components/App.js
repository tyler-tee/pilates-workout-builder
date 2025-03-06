import React, { useState, useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import WorkoutDisplay from './WorkoutDisplay';
import PremiumBanner from './PremiumBanner';
import WorkoutPrograms from './WorkoutPrograms';
import ProgressTracker from './ProgressTracker';
import UserProfiles from './UserProfiles';
import { loadSavedWorkouts } from '../utils/storageUtils';
// Remove isPremiumUser since we're not using it for conditional rendering yet
// import { isPremiumUser } from '../data/premiumFeatures';

function App() {
  const [workout, setWorkout] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  // Remove the unused isPremium state
  const [currentView, setCurrentView] = useState('generator'); // 'generator', 'programs', 'progress'
  const [preferences, setPreferences] = useState({
    equipment: [],
    duration: 30,
    targetAreas: [],
    difficultyLevel: 'all',
    healthConsiderations: [],
    restTime: 30,
  });
  
  // Remove useEffect that was only setting isPremium
  
  // Load saved workouts on mount
  useEffect(() => {
    setSavedWorkouts(loadSavedWorkouts());
  }, []);
  
  const handleSelectProfile = (profile) => {
    // Update preferences from the selected profile
    setPreferences({
      ...preferences,
      ...profile,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">PilatesPulse</h1>
        <p className="text-gray-600 mb-4">Create personalized Pilates routines based on your preferences</p>
        
        <div className="flex justify-center space-x-4 border-b pb-4">
          <button
            onClick={() => setCurrentView('generator')}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === 'generator' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            Workout Generator
          </button>
          <button
            onClick={() => setCurrentView('programs')}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === 'programs' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === 'progress' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            Progress
          </button>
        </div>
      </header>
      
      <main className="flex-grow w-full max-w-5xl mx-auto">
        {/* Premium Banner at top of page */}
        <div id="premium">
          <PremiumBanner />
        </div>
        
        {currentView === 'generator' && (
          <>
            {!workout ? (
              <>
                <UserProfiles 
                  onSelectProfile={handleSelectProfile} 
                  currentPreferences={preferences}
                />
                <PreferencesForm 
                  setWorkout={setWorkout} 
                  savedWorkouts={savedWorkouts}
                  setSavedWorkouts={setSavedWorkouts}
                  preferences={preferences}
                  setPreferences={setPreferences}
                />
              </>
            ) : (
              <WorkoutDisplay 
                workout={workout} 
                setWorkout={setWorkout}
                savedWorkouts={savedWorkouts}
                setSavedWorkouts={setSavedWorkouts}
              />
            )}
          </>
        )}
        
        {currentView === 'programs' && (
          <WorkoutPrograms />
        )}
        
        {currentView === 'progress' && (
          <ProgressTracker />
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