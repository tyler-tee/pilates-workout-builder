// src/utils/historyUtils.js
export const recordWorkoutHistory = (workout) => {
    try {
      // Get existing workout history
      const historyString = localStorage.getItem('pilatesPulse_history');
      let history = [];
      
      if (historyString) {
        history = JSON.parse(historyString);
      }
      
      // Add current workout with timestamp
      const workoutWithTimestamp = {
        ...workout,
        completedAt: new Date().toISOString()
      };
      
      history.push(workoutWithTimestamp);
      
      // Save back to localStorage
      localStorage.setItem('pilatesPulse_history', JSON.stringify(history));
      
      return true;
    } catch (error) {
      console.error('Failed to record workout history:', error);
      return false;
    }
  };