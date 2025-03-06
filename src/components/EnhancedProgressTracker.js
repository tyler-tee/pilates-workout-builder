// src/components/EnhancedProgressTracker.js
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import PremiumFeatureModal from './PremiumFeatureModal';
import { bodyAreaOptions } from '../data/options';
import featureAccess from '../utils/featureAccess';

function EnhancedProgressTracker() {
  const { workoutHistory, getWorkoutStats, getExerciseById, isPremium } = useAppContext();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get stats data
  const stats = useMemo(() => getWorkoutStats(), [getWorkoutStats]);
  
  // Check feature access
  const analyticsAccess = featureAccess.checkAccess('detailedAnalytics');
  const historyAccess = featureAccess.checkAccess('workoutHistory', workoutHistory?.length || 0);
  
  if (!stats || !workoutHistory || workoutHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl mb-3">📊</div>
        <h2 className="text-xl font-semibold mb-2">No Workout History</h2>
        <p className="text-gray-600 mb-4">
          Complete workouts to see your progress here.
        </p>
        <p className="text-gray-500 text-sm">
          Your workout history and statistics will help you track your Pilates journey.
        </p>
      </div>
    );
  }
  
  // Get most common exercise
  const mostCommonExercise = stats.mostCommonExerciseId 
    ? getExerciseById(stats.mostCommonExerciseId)
    : null;
  
  // Get most targeted area
  const mostTargetedArea = stats.mostTargetedArea
    ? bodyAreaOptions.find(area => area.id === stats.mostTargetedArea)
    : null;
  
  // Format streak data for the calendar display
  const getMonthlyCalendarData = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    
    // Get days with workouts this month
    const workoutDays = new Set(
      workoutHistory
        .filter(workout => {
          if (!workout.completedAt) return false;
          const date = new Date(workout.completedAt);
          return date.getMonth() === now.getMonth() && 
                 date.getFullYear() === now.getFullYear();
        })
        .map(workout => new Date(workout.completedAt).getDate())
    );
    
    // Create calendar grid with empty cells for the correct start day
    const calendarGrid = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarGrid.push({ day: null, hasWorkout: false });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarGrid.push({
        day,
        hasWorkout: workoutDays.has(day)
      });
    }
    
    return calendarGrid;
  };
  
  // Handle premium feature click
  const handlePremiumFeatureClick = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
    }
  };
  
  // Get history to display based on access level
  const displayHistory = historyAccess.limitReached
    ? workoutHistory.slice(-historyAccess.limit)
    : workoutHistory;
  
  // Format simple chart data for the progress bar
  const getChartData = () => {
    if (!stats.workoutsPerMonth || stats.workoutsPerMonth.length === 0) {
      return Array(6).fill().map((_, i) => ({
        month: `Month ${i+1}`,
        count: 0
      }));
    }
    
    // Get last 6 months of data
    const monthsData = [...stats.workoutsPerMonth].slice(-6);
    
    // Format month labels
    return monthsData.map(data => {
      const [year, month] = data.month.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      
      return {
        month: `${monthName} ${year}`,
        count: data.count
      };
    });
  };
  
  // Find max workout count for scaling
  const maxWorkoutCount = Math.max(
    ...getChartData().map(d => d.count),
    1 // Ensure we don't divide by zero
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>
      
      <div className="flex border-b mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('stats')}
        >
          Detailed Stats
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalWorkouts || 0}</div>
              <div className="text-sm text-blue-700">Workouts Completed</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.totalMinutes || 0}</div>
              <div className="text-sm text-green-700">Total Minutes</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {mostTargetedArea ? mostTargetedArea.label.split('/')[0] : 'N/A'}
              </div>
              <div className="text-sm text-purple-700">Most Targeted Area</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Monthly Progress</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                {getChartData().map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600">{item.month}</div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-6 bg-blue-600 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                          style={{ width: `${(item.count / maxWorkoutCount) * 100}%` }}
                        >
                          {item.count > 0 ? item.count : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">This Month's Activity</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {getMonthlyCalendarData().map((day, i) => (
                    <div 
                      key={i}
                      className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                        !day.day ? 'bg-transparent' : 
                        day.hasWorkout 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Most Frequent Exercise</h3>
              {mostCommonExercise ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-3">{mostCommonExercise.image}</span>
                    <div>
                      <h4 className="font-medium">{mostCommonExercise.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{mostCommonExercise.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mostCommonExercise.targetAreas.map(area => (
                      <span key={area} className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {area.charAt(0).toUpperCase() + area.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'stats' && (
        <div>
          {analyticsAccess.hasAccess ? (
            <>
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Monthly Minutes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col space-y-2">
                    {getChartData().map((item, index) => {
                      const monthData = stats.workoutsPerMonth.find(m => 
                        m.month === item.month.split(' ').slice(1).join('-')
                      );
                      const minutes = monthData?.totalMinutes || 0;
                      const maxMinutes = Math.max(...stats.workoutsPerMonth.map(m => m.totalMinutes || 0), 60);
                      
                      return (
                        <div key={index} className="flex items-center">
                          <div className="w-24 text-sm text-gray-600">{item.month}</div>
                          <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-6 bg-green-600 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                                style={{ width: `${(minutes / maxMinutes) * 100}%` }}
                              >
                                {minutes > 0 ? `${minutes} min` : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Target Area Distribution</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {bodyAreaOptions.map(area => {
                      // Calculate percentage (simplified)
                      const areaExercises = workoutHistory.reduce((count, workout) => {
                        const exercisesWithArea = workout.exercises?.filter(ex => 
                          ex.targetAreas?.includes(area.id)
                        ).length || 0;
                        return count + exercisesWithArea;
                      }, 0);
                      
                      const totalExercises = workoutHistory.reduce((count, workout) => 
                        count + (workout.exercises?.length || 0), 0);
                      
                      const percentage = totalExercises > 0 
                        ? Math.round((areaExercises / totalExercises) * 100) 
                        : 0;
                      
                      return (
                        <div key={area.id} className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{area.label}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-600 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Workout Progress</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Weekly Goal</span>
                          <span>{Math.min(3, stats.totalWorkouts || 0)} / 3 workouts</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-600 rounded-full" 
                            style={{ width: `${Math.min(100, ((Math.min(3, stats.totalWorkouts || 0) / 3) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Monthly Minutes Goal</span>
                          <span>{Math.min(stats.totalMinutes || 0, 120)} / 120 minutes</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-600 rounded-full" 
                            style={{ width: `${Math.min(100, ((Math.min(stats.totalMinutes || 0, 120) / 120) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Area Balance</span>
                          <span>4 / 7 areas targeted</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-purple-600 rounded-full" 
                            style={{ width: `${(4 / 7) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Detailed Analytics is a Premium Feature
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade to PilatesPulse Premium to access detailed workout analytics, including target area distribution, equipment usage, and more.
              </p>
              <button 
                onClick={handlePremiumFeatureClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Upgrade to Premium
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'history' && (
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Workout History</h3>
          
          {/* Show a notice about limited history for free users */}
          {!isPremium && historyAccess.limitReached && (
            <div className="mb-4 bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="flex items-start">
                <div className="text-lg mr-2">ℹ️</div>
                <div>
                  <p className="text-sm text-blue-800">
                    Showing your {historyAccess.limit} most recent workouts. 
                    <button 
                      onClick={handlePremiumFeatureClick}
                      className="ml-1 text-blue-600 underline hover:text-blue-800"
                    >
                      Upgrade to Premium
                    </button> for your complete workout history.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exercises
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Focus Areas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayHistory.slice().reverse().map((workout, index) => {
                  // Extract target areas from all exercises
                  const targetAreas = new Set();
                  workout.exercises?.forEach(exercise => {
                    exercise.targetAreas?.forEach(area => targetAreas.add(area));
                  });
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workout.completedAt ? new Date(workout.completedAt).toLocaleDateString() : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workout.totalDuration || 0} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workout.exercises?.length || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {Array.from(targetAreas).slice(0, 3).map(area => (
                            <span key={area} className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {area.charAt(0).toUpperCase() + area.slice(1)}
                            </span>
                          ))}
                          {targetAreas.size > 3 && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                              +{targetAreas.size - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {!isPremium && historyAccess.limitReached && workoutHistory.length > historyAccess.limit && (
            <div className="mt-4 text-center">
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={handlePremiumFeatureClick}
              >
                See All {workoutHistory.length} Workouts with Premium
              </button>
            </div>
          )}
        </div>
      )}
      
      {showPremiumModal && (
        <PremiumFeatureModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          featureName="Detailed Analytics"
        />
      )}
    </div>
  );
}

export default EnhancedProgressTracker;