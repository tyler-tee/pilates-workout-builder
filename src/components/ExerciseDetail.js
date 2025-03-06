// src/components/ExerciseDetail.js
import React from 'react';
import { healthConsiderationsOptions } from '../data/options';

function ExerciseDetail({ 
  exercise, 
  onClose, 
  onAddToFavorites, 
  isFavorite, 
  disableFavorite = false,
  favoriteLimit = null
}) {
  if (!exercise) return null;
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{exercise.image}</span>
            <h2 className="text-xl font-bold text-gray-800">{exercise.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">{exercise.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Details</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="font-medium text-gray-600 w-32">Difficulty:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-gray-600 w-32">Duration:</span>
                  <span>{exercise.duration} minutes</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-gray-600 w-32">Equipment:</span>
                  <span>{exercise.equipment.map(eq => 
                    eq === 'none' ? 'None (Mat Only)' : eq.charAt(0).toUpperCase() + eq.slice(1)
                  ).join(', ')}</span>
                </li>
                <li>
                  <span className="font-medium text-gray-600 block mb-1">Target Areas:</span>
                  <div className="flex flex-wrap gap-2">
                    {exercise.targetAreas.map(area => (
                      <span key={area} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {area.charAt(0).toUpperCase() + area.slice(1)}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Health Considerations</h3>
              <div className="space-y-3">
                {healthConsiderationsOptions.map(option => (
                  <div key={option.id} className="border-l-4 border-amber-300 pl-3 py-1">
                    <span className="font-medium text-gray-700">{option.label}: </span>
                    <span className="text-gray-600">{exercise.modifications[option.id]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {disableFavorite && favoriteLimit && !isFavorite && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <div className="text-lg mr-2">⚠️</div>
                <p className="text-sm text-amber-800">
                  You've reached your limit of {favoriteLimit} favorite exercises. 
                  Upgrade to Premium for unlimited favorites!
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => onAddToFavorites(exercise)}
              disabled={disableFavorite && !isFavorite}
              className={`px-4 py-2 rounded-md flex items-center ${
                disableFavorite && !isFavorite
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isFavorite 
                    ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{isFavorite ? '❤️' : '♡'}</span>
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetail;