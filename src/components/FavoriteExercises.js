// src/components/FavoriteExercises.js
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ExerciseDetail from './ExerciseDetail';
import { bodyAreaOptions } from '../data/options';
import featureAccess from '../utils/featureAccess';
import { isPremiumUser } from '../data/premiumFeatures';

function FavoriteExercises() {
  const { getFavoriteExercisesData, isExerciseFavorite, toggleFavoriteExercise } = useAppContext();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  
  const favoriteExercises = getFavoriteExercisesData();
  const isPremium = isPremiumUser();
  
  // Check if user has reached favorites limit
  const access = featureAccess.checkAccess('favorites', favoriteExercises.length);
  
  // Show premium banner if approaching limit
  useEffect(() => {
    if (!isPremium && favoriteExercises.length > 0 && 
        favoriteExercises.length >= access.limit - 1) {
      setShowPremiumBanner(true);
    } else {
      setShowPremiumBanner(false);
    }
  }, [favoriteExercises.length, isPremium, access.limit]);
  
  // Apply filters to favorite exercises
  const filteredExercises = favoriteExercises.filter(exercise => {
    const matchesSearch = searchTerm === '' || 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesArea = filterArea === '' || 
      exercise.targetAreas.includes(filterArea);
      
    return matchesSearch && matchesArea;
  });
  
  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };
  
  const handleCloseDetail = () => {
    setSelectedExercise(null);
  };
  
  const handleToggleFavorite = (exercise) => {
    // Check if trying to add a new favorite when limit reached
    if (!isExerciseFavorite(exercise.id) && access.limitReached && !isPremium) {
      // Don't allow adding if limit reached and not premium
      return;
    }
    
    toggleFavoriteExercise(exercise.id);
  };
  
  // Display placeholder if no favorites
  if (favoriteExercises.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl mb-3">⭐</div>
        <h2 className="text-xl font-semibold mb-2">No Favorite Exercises Yet</h2>
        <p className="text-gray-600 mb-4">
          Add exercises to your favorites for quick access. You'll see them here.
        </p>
        <p className="text-gray-500 text-sm">
          Tip: You can add an exercise to favorites when viewing its details.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Favorite Exercises</h2>
      
      {showPremiumBanner && !isPremium && (
        <div className="mb-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-2xl mr-3">⭐</div>
            <div>
              <h3 className="font-medium text-amber-800 mb-1">
                You're approaching your favorites limit!
              </h3>
              <p className="text-sm text-amber-700">
                Free users can save up to {access.limit} favorite exercises. 
                Upgrade to Premium for unlimited favorites and more features.
              </p>
              <button
                onClick={() => window.location.href = "#premium"}
                className="mt-2 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search-favorites" className="sr-only">Search Favorites</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search-favorites"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search favorite exercises..."
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor="filter-area" className="sr-only">Filter by Area</label>
          <select
            id="filter-area"
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Areas</option>
            {bodyAreaOptions.map(area => (
              <option key={area.id} value={area.id}>{area.label}</option>
            ))}
          </select>
        </div>
        
        {!isPremium && (
          <div className="w-full md:w-auto flex items-center text-sm text-gray-500">
            <span>{favoriteExercises.length} / {access.limit} used</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map(exercise => (
          <div 
            key={exercise.id} 
            className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleExerciseClick(exercise)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{exercise.image}</span>
                  <h3 className="font-medium">{exercise.name}</h3>
                </div>
                <span className="text-pink-500">❤️</span>
              </div>
              
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{exercise.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {exercise.targetAreas.slice(0, 3).map(area => (
                  <span key={area} className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </span>
                ))}
                {exercise.targetAreas.length > 3 && (
                  <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                    +{exercise.targetAreas.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>{exercise.duration} min</span>
                <span className="capitalize">
                  {exercise.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={handleCloseDetail}
          onAddToFavorites={handleToggleFavorite}
          isFavorite={isExerciseFavorite(selectedExercise.id)}
          disableFavorite={!isExerciseFavorite(selectedExercise.id) && access.limitReached && !isPremium}
          favoriteLimit={access.limitReached && !isPremium ? access.limit : null}
        />
      )}
    </div>
  );
}

export default FavoriteExercises;