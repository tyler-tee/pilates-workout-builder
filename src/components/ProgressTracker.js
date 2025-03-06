// src/components/ProgressTracker.js
import React, { useState, useEffect } from 'react';
import { isPremiumUser } from '../data/premiumFeatures';
import PremiumFeatureModal from './PremiumFeatureModal';

function ProgressTracker() {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    mostTargetedArea: null
  });

  useEffect(() => {
    // Load workout history from localStorage
    const loadHistory = () => {
      try {
        const history = localStorage.getItem('pilatesPulse_history');
        if (history) {
          return JSON.parse(history);
        }
      } catch (error) {
        console.error('Failed to load workout history:', error);
      }
      return [];
    };
    
    const history = loadHistory();
    setWorkoutHistory(history);
    
    // Calculate stats if premium
    if (isPremium && history.length > 0) {
      const totalWorkouts = history.length;
      const totalMinutes = history.reduce((total, workout) => total + workout.totalDuration, 0);
      
      // Find most targeted area
      const areaCounts = {};
      history.forEach(workout => {
        workout.exercises.forEach(exercise => {
          exercise.targetAreas.forEach(area => {
            areaCounts[area] = (areaCounts[area] || 0) + 1;
          });
        });
      });
      
      let mostTargetedArea = null;
      let highestCount = 0;
      
      Object.entries(areaCounts).forEach(([area, count]) => {
        if (count > highestCount) {
          highestCount = count;
          mostTargetedArea = area;
        }
      });
      
      setStats({
        totalWorkouts,
        totalMinutes,
        mostTargetedArea
      });
    }
  }, [isPremium]);

  const handleViewDetails = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    // Handle viewing detailed progress - would expand to show charts and detailed breakdowns
    // This is a placeholder for premium functionality
  };

  if (workoutHistory.length === 0) {
    return null; // Don't show anything if no history
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-md text-center">
          <div className="text-3xl font-bold text-blue-600">{workoutHistory.length}</div>
          <div className="text-sm text-blue-700">Workouts Completed</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-md text-center">
          <div className="text-3xl font-bold text-green-600">
            {isPremium 
              ? stats.totalMinutes 
              : <span className="text-lg">⭐ Premium</span>}
          </div>
          <div className="text-sm text-green-700">Total Minutes</div>
        </div>
      </div>
      
      {isPremium ? (
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Most Targeted Area:</h3>
          <div className="bg-purple-50 p-3 rounded-md">
            <div className="font-semibold text-purple-700">
              {stats.mostTargetedArea ? (
                stats.mostTargetedArea.charAt(0).toUpperCase() + stats.mostTargetedArea.slice(1)
              ) : 'N/A'}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-gray-50 p-3 rounded-md">
          <div className="text-center text-gray-500">
            <span className="text-yellow-500">⭐</span> Premium stats available with upgrade
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <button 
          onClick={handleViewDetails}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          {isPremium ? 'View Detailed Analysis' : 'Unlock Progress Analytics'}
        </button>
      </div>
      
      {showPremiumModal && (
        <PremiumFeatureModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          featureName="Progress Analytics"
        />
      )}
    </div>
  );
}

export default ProgressTracker;