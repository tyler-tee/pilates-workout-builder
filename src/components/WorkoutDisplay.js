import React, { useState, useEffect } from 'react';
import ExerciseItem from './ExerciseItem';
import WorkoutTimer from './WorkoutTimer';
import { saveWorkout } from '../utils/storageUtils';
import { recordWorkoutHistory } from '../utils/historyUtils';
import { bodyAreaOptions } from '../data/options';

function WorkoutDisplay({ workout, setWorkout, savedWorkouts, setSavedWorkouts }) {
  const [timer, setTimer] = useState({
    isActive: false,
    isPaused: true,
    time: workout.exercises.length > 0 ? workout.exercises[0].duration * 60 : 0,
    currentExerciseIndex: workout.exercises.length > 0 ? 0 : -1,
  });
  
  const [workoutComplete, setWorkoutComplete] = useState(false);
  
  // Check if workout is complete whenever timer changes
  useEffect(() => {
    if (timer.currentExerciseIndex >= workout.exercises.length && timer.currentExerciseIndex !== -1) {
      setWorkoutComplete(true);
      // Record workout in history
      recordWorkoutHistory(workout);
    }
  }, [timer.currentExerciseIndex, workout]);
  
  const resetSelections = () => {
    setWorkout(null);
  };
  
  const handleSaveWorkout = () => {
    const updatedWorkouts = saveWorkout(workout, savedWorkouts);
    setSavedWorkouts(updatedWorkouts);
  };
  
  const printWorkout = () => {
    // Printing logic implementation...
    const printWindow = window.open('', '_blank');
    
    let printContent = `
      <html>
      <head>
        <title>PilatesPulse Workout</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #3b82f6; }
          .exercise { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .exercise-name { font-weight: bold; font-size: 18px; }
          .exercise-duration { color: #666; }
          .exercise-description { margin: 8px 0; }
          .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
          .tag { background: #e6f0ff; padding: 3px 8px; border-radius: 10px; font-size: 12px; }
          .section { background: #f0f7ff; padding: 10px; margin: 15px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>PilatesPulse Workout</h1>
        <p>Total Duration: ${workout.totalDuration} minutes</p>
        
        <div class="section">
          <h3>Warm-up (3 minutes)</h3>
          <p>${workout.warmup.description}</p>
        </div>
        
        <h2>Main Exercises</h2>
    `;
    
    workout.exercises.forEach((exercise, index) => {
      printContent += `
        <div class="exercise">
          <div class="exercise-name">${index + 1}. ${exercise.name}</div>
          <div class="exercise-duration">${exercise.duration} min + ${workout.restTime}s rest</div>
          <div class="exercise-description">${exercise.description}</div>
          
          ${exercise.relevantModifications && exercise.relevantModifications.length > 0 ? `
            <div style="margin-top: 5px; color: #d97706; font-size: 14px;">
              <strong>Modifications:</strong>
              <ul>
                ${exercise.relevantModifications.map(mod => `
                  <li>${mod.condition}: ${mod.instruction}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div class="tags">
            ${exercise.targetAreas.map(area => {
              const areaOption = bodyAreaOptions.find(option => option.id === area);
              return `<span class="tag">${areaOption ? areaOption.label : area}</span>`;
            }).join('')}
            <span class="tag">${exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</span>
          </div>
        </div>
      `;
    });
    
    printContent += `
        <div class="section">
          <h3>Cool-down (2 minutes)</h3>
          <p>${workout.cooldown.description}</p>
        </div>
        
        <footer style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          <p>PilatesPulse</p>
          <p>Always consult with a fitness professional before starting a new exercise program.</p>
        </footer>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
  
  // Determine if workout has modifications for health concerns
  const hasModifications = workout && workout.exercises.some(ex => 
    ex.relevantModifications && ex.relevantModifications.length > 0
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Your Custom Pilates Workout</h2>
          <p className="text-gray-600">Total Duration: {workout.totalDuration} minutes</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleSaveWorkout}
            className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm flex items-center"
          >
            <span className="mr-1">💾</span> Save
          </button>
          <button 
            onClick={printWorkout}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-md text-sm flex items-center"
          >
            <span className="mr-1">🖨️</span> Print
          </button>
          <button 
            onClick={resetSelections}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
          >
            New Workout
          </button>
        </div>
      </div>
      
      {workoutComplete && (
        <div className="p-4 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🎉</span>
            <div>
              <h3 className="font-semibold">Workout Complete!</h3>
              <p className="text-sm">Great job! This workout has been added to your progress history.</p>
            </div>
          </div>
        </div>
      )}
      
      {hasModifications && (
        <div className="p-3 mb-4 bg-amber-50 text-amber-800 rounded-md border border-amber-200 text-sm">
          <strong>Note:</strong> This workout includes modifications for your selected health considerations.
        </div>
      )}
      
      {workout.message ? (
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded-md">
          {workout.message}
        </div>
      ) : (
        <div className="space-y-6">
          {timer.currentExerciseIndex !== -1 && (
            <WorkoutTimer 
              timer={timer} 
              setTimer={setTimer} 
              workout={workout} 
            />
          )}
          
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-lg text-blue-800">{workout.warmup.name} (3 minutes)</h3>
            <p className="text-gray-700">{workout.warmup.description}</p>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem 
                key={`${exercise.id}-${index}`}
                exercise={exercise} 
                index={index}
                currentIndex={timer.currentExerciseIndex}
                restTime={workout.restTime}
              />
            ))}
          </ul>
          
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-lg text-blue-800">{workout.cooldown.name} (2 minutes)</h3>
            <p className="text-gray-700">{workout.cooldown.description}</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <button 
          onClick={resetSelections}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md shadow-sm transition-colors"
        >
          Create Another Workout
        </button>
      </div>
    </div>
  );
}

export default WorkoutDisplay;