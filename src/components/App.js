// src/components/App.js
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import EnhancedPreferencesForm from './EnhancedPreferencesForm';
import WorkoutDisplay from './WorkoutDisplay';
import UpdatedPremiumBanner from './UpdatedPremiumBanner';
import WorkoutPrograms from './WorkoutPrograms';
import EnhancedProgressTracker from './EnhancedProgressTracker';
import EnhancedUserProfiles from './EnhancedUserProfiles';
import ExerciseBrowser from './ExerciseBrowser';
import FavoriteExercises from './FavoriteExercises';
import ImprovedNavigation from './ImprovedNavigation';
import WelcomeOverview from './WelcomeOverview';

function App() {
  const { 
    workout, 
    setWorkout, 
    savedWorkouts,
    setSavedWorkouts,
    currentView, 
    preferences,
    setPreferences,
    workoutHistory
  } = useAppContext();
  
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Check if this is the first time the user is visiting the app
  useEffect(() => {
    const isFirstVisit = localStorage.getItem('pilatesPulse_visited') !== 'true';
    setShowWelcome(isFirstVisit && workoutHistory.length === 0);
    
    // Mark as visited
    localStorage.setItem('pilatesPulse_visited', 'true');
  }, [workoutHistory.length]);
  
  const handleSelectProfile = (profile) => {
    // Update preferences from the selected profile
    setPreferences({
      ...preferences,
      ...profile,
    });
  };
  
  // Render appropriate content based on current view
  const renderContent = () => {
    // Show welcome screen for first-time users
    if (showWelcome) {
      return <WelcomeOverview onClose={() => setShowWelcome(false)} />;
    }
    
    switch (currentView) {
      case 'generator':
        return !workout ? (
          <>
            <EnhancedUserProfiles 
              onSelectProfile={handleSelectProfile} 
              currentPreferences={preferences}
            />
            <EnhancedPreferencesForm 
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
        );
        
      case 'programs':
        return <WorkoutPrograms />;
        
      case 'progress':
        return <EnhancedProgressTracker />;
        
      case 'exercises':
        return <ExerciseBrowser />;
        
      case 'favorites':
        return <FavoriteExercises />;
        
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">PilatesPulse</h1>
        <p className="text-gray-600 mb-4">Create personalized Pilates routines based on your preferences</p>
        
        <ImprovedNavigation />
      </header>
      
      <main className="flex-grow w-full max-w-5xl mx-auto">
        {/* Premium Banner at top of page */}
        <div id="premium">
          <UpdatedPremiumBanner />
        </div>
        
        {renderContent()}
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PilatesPulse</p>
        <p className="mt-1">Always consult with a fitness professional before starting a new exercise program.</p>
      </footer>
    </div>
  );
}

export default App;