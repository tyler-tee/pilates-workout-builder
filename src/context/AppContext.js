// src/context/AppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { isPremiumUser, setPremiumStatus } from '../data/premiumFeatures';
import { loadSavedWorkouts } from '../utils/storageUtils';
import exerciseDatabase from '../data/exercises';
import featureAccess from '../utils/featureAccess';

// Create context
export const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  // User preferences state
  const [preferences, setPreferences] = useState({
    equipment: [],
    duration: 30,
    targetAreas: [],
    difficultyLevel: 'all',
    healthConsiderations: [],
    restTime: 30,
  });
  
  // Workout state
  const [workout, setWorkout] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  
  // UI state
  const [currentView, setCurrentView] = useState('generator');
  const [isPremium, setIsPremium] = useState(false);
  
  // History state
  const [workoutHistory, setWorkoutHistory] = useState([]);
  
  // Favorites state
  const [favoriteExercises, setFavoriteExercises] = useState([]);
  
  // Load saved data on component mount
  useEffect(() => {
    // Check premium status
    setIsPremium(isPremiumUser());
    
    // Load saved workouts
    setSavedWorkouts(loadSavedWorkouts());
    
    // Load workout history
    try {
      const historyString = localStorage.getItem('pilatesPulse_history');
      if (historyString) {
        setWorkoutHistory(JSON.parse(historyString));
      }
    } catch (error) {
      console.error('Failed to load workout history:', error);
    }
    
    // Load favorites
    try {
      const favoritesString = localStorage.getItem('pilatesPulse_favorites');
      if (favoritesString) {
        setFavoriteExercises(JSON.parse(favoritesString));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);
  
  // Save favorites when they change
  useEffect(() => {
    try {
      localStorage.setItem('pilatesPulse_favorites', JSON.stringify(favoriteExercises));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favoriteExercises]);
  
  // Handle adding/removing favorites with respect to limits
  const toggleFavoriteExercise = (exerciseId) => {
    setFavoriteExercises(prevFavorites => {
      // If removing a favorite, always allow it
      if (prevFavorites.includes(exerciseId)) {
        return prevFavorites.filter(id => id !== exerciseId);
      } 
      
      // If adding a favorite, check against limits for free users
      const access = featureAccess.checkAccess('favorites', prevFavorites.length);
      if (!isPremium && access.limitReached) {
        // Don't allow adding if limit reached and not premium
        return prevFavorites;
      }
      
      // Otherwise, add the favorite
      return [...prevFavorites, exerciseId];
    });
  };
  
  // Get exercise by ID (for favorites display)
  const getExerciseById = (id) => {
    return exerciseDatabase.find(exercise => exercise.id === id) || null;
  };
  
  // Check if exercise is favorite
  const isExerciseFavorite = (exerciseId) => {
    return favoriteExercises.includes(exerciseId);
  };
  
  // Get favorite exercises data
  const getFavoriteExercisesData = () => {
    return favoriteExercises.map(id => getExerciseById(id)).filter(Boolean);
  };
  
  // Clear current workout
  const clearWorkout = () => {
    setWorkout(null);
  };
  
  // Update premium status
  const updatePremiumStatus = (status) => {
    setIsPremium(status);
    setPremiumStatus(status);
  };
  
  // Update workflow history
  const updateWorkoutHistory = (history) => {
    setWorkoutHistory(history);
    try {
      localStorage.setItem('pilatesPulse_history', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save workout history:', error);
    }
  };
  
  // Calculate stats
  const getWorkoutStats = () => {
    if (workoutHistory.length === 0) return null;
    
    const totalWorkouts = workoutHistory.length;
    const totalMinutes = workoutHistory.reduce((total, workout) => {
      return total + (workout.totalDuration || 0);
    }, 0);
    
    const exerciseCounts = {};
    const areaCounts = {};
    
    workoutHistory.forEach(workout => {
      if (workout.exercises) {
        workout.exercises.forEach(exercise => {
          // Count exercises
          exerciseCounts[exercise.id] = (exerciseCounts[exercise.id] || 0) + 1;
          
          // Count target areas
          if (exercise.targetAreas) {
            exercise.targetAreas.forEach(area => {
              areaCounts[area] = (areaCounts[area] || 0) + 1;
            });
          }
        });
      }
    });
    
    // Find most common exercise
    const mostCommonExerciseId = Object.entries(exerciseCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0];
    
    // Find most targeted area
    let mostTargetedArea = null;
    let highestCount = 0;
    
    Object.entries(areaCounts).forEach(([area, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostTargetedArea = area;
      }
    });
    
    return {
      totalWorkouts,
      totalMinutes,
      mostTargetedArea,
      mostCommonExerciseId: mostCommonExerciseId ? parseInt(mostCommonExerciseId) : null,
      workoutsPerMonth: calculateWorkoutsPerMonth()
    };
  };
  
  // Calculate workouts per month for charts
  const calculateWorkoutsPerMonth = () => {
    if (workoutHistory.length === 0) return [];
    
    const monthData = {};
    
    workoutHistory.forEach(workout => {
      if (workout.completedAt) {
        const date = new Date(workout.completedAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthData[monthKey]) {
          monthData[monthKey] = {
            month: monthKey,
            count: 0,
            totalMinutes: 0
          };
        }
        
        monthData[monthKey].count += 1;
        monthData[monthKey].totalMinutes += (workout.totalDuration || 0);
      }
    });
    
    return Object.values(monthData).sort((a, b) => a.month.localeCompare(b.month));
  };
  
  // Check access to features with limits
  const checkFeatureAccess = (feature, count) => {
    return featureAccess.checkAccess(feature, count);
  };
  
  // Create context value
  const contextValue = {
    preferences,
    setPreferences,
    workout,
    setWorkout,
    clearWorkout,
    savedWorkouts,
    setSavedWorkouts,
    currentView,
    setCurrentView,
    isPremium,
    updatePremiumStatus,
    workoutHistory,
    updateWorkoutHistory,
    favoriteExercises,
    toggleFavoriteExercise,
    isExerciseFavorite,
    getFavoriteExercisesData,
    getExerciseById,
    getWorkoutStats,
    checkFeatureAccess
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;