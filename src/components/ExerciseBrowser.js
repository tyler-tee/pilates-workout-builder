// src/components/ExerciseBrowser.js
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import exerciseDatabase from '../data/exercises';
import { bodyAreaOptions, equipmentOptions, difficultyOptions } from '../data/options';
import ExerciseDetail from './ExerciseDetail';

function ExerciseBrowser() {
  const { isExerciseFavorite, toggleFavoriteExercise } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterEquipment, setFilterEquipment] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);
  
  // Apply filters when any filter changes
  useEffect(() => {
    const filtered = exerciseDatabase.filter(exercise => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Target area filter
      const matchesArea = filterArea === '' || 
        exercise.targetAreas.includes(filterArea);
      
      // Equipment filter
      const matchesEquipment = filterEquipment === '' || 
        exercise.equipment.includes(filterEquipment);
      
      // Difficulty filter
      const matchesDifficulty = filterDifficulty === '' || 
        exercise.difficulty === filterDifficulty;
      
      return matchesSearch && matchesArea && matchesEquipment && matchesDifficulty;
    });
    
    setFilteredExercises(filtered);
  }, [searchTerm, filterArea, filterEquipment, filterDifficulty]);
  
  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };
  
  const handleCloseDetail = () => {
    setSelectedExercise(null);
  };
  
  const handleToggleFavorite = (exercise) => {
    toggleFavoriteExercise(exercise.id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Exercise Library</h2>
      
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search exercises by name or description..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filter-area" className="block text-sm font-medium text-gray-700 mb-1">
              Target Area
            </label>
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
          
          <div>
            <label htmlFor="filter-equipment" className="block text-sm font-medium text-gray-700 mb-1">
              Equipment
            </label>
            <select
              id="filter-equipment"
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Equipment</option>
              {equipmentOptions.map(equipment => (
                <option key={equipment.id} value={equipment.id}>{equipment.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="filter-difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="filter-difficulty"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Levels</option>
              {difficultyOptions.slice(1).map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">{filteredExercises.length} exercises found</span>
        <div>
          <select
            className="py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="name"
          >
            <option value="name">Sort by Name</option>
            <option value="duration">Sort by Duration</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>
      </div>
      
      {filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No exercises match your filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
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
                  <span className={isExerciseFavorite(exercise.id) ? "text-pink-500" : "text-gray-300"}>
                    {isExerciseFavorite(exercise.id) ? "❤️" : "♡"}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{exercise.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {exercise.targetAreas.map(area => (
                    <span key={area} className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </span>
                  ))}
                </div>
                
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span>{exercise.duration} min</span>
                  <span className={`capitalize px-2 py-0.5 rounded-full ${
                    exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                    exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={handleCloseDetail}
          onAddToFavorites={handleToggleFavorite}
          isFavorite={isExerciseFavorite(selectedExercise.id)}
        />
      )}
    </div>
  );
}

export default ExerciseBrowser;