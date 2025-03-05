export const loadSavedWorkouts = () => {
    const saved = localStorage.getItem('savedPilatesWorkouts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to load saved workouts:', error);
        return [];
      }
    }
    return [];
  };
  
  export const saveWorkout = (workout, savedWorkouts) => {
    if (!workout) return savedWorkouts;
    
    const workoutToSave = {
      ...workout,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    
    const updatedSavedWorkouts = [...savedWorkouts, workoutToSave];
    
    // Save to localStorage
    try {
      localStorage.setItem('savedPilatesWorkouts', JSON.stringify(updatedSavedWorkouts));
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
    
    return updatedSavedWorkouts;
  };
  
  export const deleteWorkout = (workoutId, savedWorkouts) => {
    const updatedWorkouts = savedWorkouts.filter(w => w.id !== workoutId);
    
    // Update localStorage
    try {
      localStorage.setItem('savedPilatesWorkouts', JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error('Failed to update saved workouts:', error);
    }
    
    return updatedWorkouts;
  };