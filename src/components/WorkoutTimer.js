import React, { useEffect } from 'react';

function WorkoutTimer({ timer, setTimer, workout }) {
  useEffect(() => {
    let interval = null;
    
    if (timer.isActive && !timer.isPaused) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          time: prev.time > 0 ? prev.time - 1 : 0
        }));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    // Check if timer reached zero
    if (timer.time === 0 && timer.isActive) {
      // Play sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLHPM+N2TQwUHD0rM/fXLc0ASAA8YV7TgbL/z88J8WwkAF1Kq0E/Hsf/rwptqGwMie8i6Ol/a/9eHdVsVADup472ESfn/olp3xIMkAAuFxu9s+uhFwNtdBQAvo+1v//ztbLDBDUMAAWXz3pQQCSYvvuBoGgIDAIT03EYsJB8rLqTqbgkAAABu//78SlYNAQAYSKQBAAAAAAD//7bac0BLBwAAAAAAABwI4jCbabqWz5LJyrRoUQlZRq/u/9JlF/+9BWJRChUt58LO/f+9FjJ7oj8AAGs10f/gQBv68OF+EtJWL2O850UYGYHY5jI3XmdJj+qxIPdS3O6ZLDDii8X1//nC5f8LpcbOzKvM+a6If/19CyxPteWHouNAT0RHa12wpK',
      );
      audio.play().catch(error => console.log('Audio play failed', error));
      
      // Move to next exercise
      if (workout && timer.currentExerciseIndex < workout.exercises.length) {
        setTimer(prev => ({
          ...prev,
          currentExerciseIndex: prev.currentExerciseIndex + 1,
          isPaused: true,
          time: prev.currentExerciseIndex + 1 < workout.exercises.length ? 
            workout.exercises[prev.currentExerciseIndex + 1].duration * 60 : 0
        }));
      } else {
        // End of workout
        setTimer(prev => ({
          ...prev,
          isActive: false,
          isPaused: false,
        }));
      }
    }
    
    return () => clearInterval(interval);
  }, [timer, workout, setTimer]);
  
  const startTimer = () => {
    setTimer(prev => ({
      ...prev,
      isActive: true,
      isPaused: false
    }));
  };
  
  const pauseTimer = () => {
    setTimer(prev => ({
      ...prev,
      isPaused: true
    }));
  };
  
  const resetTimer = () => {
    if (workout && timer.currentExerciseIndex < workout.exercises.length) {
      setTimer(prev => ({
        ...prev,
        isActive: false,
        isPaused: true,
        time: workout.exercises[timer.currentExerciseIndex].duration * 60
      }));
    }
  };
  
  const skipToNext = () => {
    if (workout && timer.currentExerciseIndex < workout.exercises.length - 1) {
      setTimer(prev => ({
        ...prev,
        isActive: false,
        isPaused: true,
        time: workout.exercises[prev.currentExerciseIndex + 1].duration * 60,
        currentExerciseIndex: prev.currentExerciseIndex + 1
      }));
    }
  };
  
  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-blue-100 p-4 rounded-md mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-blue-800">
          {timer.currentExerciseIndex < workout.exercises.length ? 
            `Current Exercise: ${workout.exercises[timer.currentExerciseIndex].name}` : 
            'Workout Complete!'}
        </h3>
        <div className="text-2xl font-mono font-bold text-blue-800">
          {formatTime(timer.time)}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 mt-3">
        {!timer.isActive || timer.isPaused ? (
          <button 
            onClick={startTimer}
            disabled={timer.currentExerciseIndex >= workout.exercises.length}
            className={`px-4 py-2 rounded-md ${
              timer.currentExerciseIndex >= workout.exercises.length 
                ? 'bg-gray-200 text-gray-500' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {timer.isPaused ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
          >
            Pause
          </button>
        )}
        
        <button 
          onClick={resetTimer}
          disabled={timer.currentExerciseIndex >= workout.exercises.length}
          className={`px-4 py-2 rounded-md ${
            timer.currentExerciseIndex >= workout.exercises.length 
              ? 'bg-gray-200 text-gray-500' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Reset
        </button>
        
        <button 
          onClick={skipToNext}
          disabled={timer.currentExerciseIndex >= workout.exercises.length - 1}
          className={`px-4 py-2 rounded-md ${
            timer.currentExerciseIndex >= workout.exercises.length - 1 
              ? 'bg-gray-200 text-gray-500' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default WorkoutTimer;