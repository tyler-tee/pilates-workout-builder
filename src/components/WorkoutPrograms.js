// src/components/WorkoutPrograms.js
import React, { useState } from 'react';
import { workoutPrograms, isPremiumUser } from '../data/premiumFeatures';
import PremiumFeatureModal from './PremiumFeatureModal';

function WorkoutPrograms() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremium] = useState(isPremiumUser());

  const handleProgramSelect = (program) => {
    if (!isPremium && program.premium) {
      setShowPremiumModal(true);
      return;
    }
    
    setSelectedProgram(program);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Workout Programs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {workoutPrograms.map(program => (
          <div 
            key={program.id}
            className={`border rounded-lg overflow-hidden shadow-sm ${
              program.premium && !isPremium ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-800">{program.name}</h3>
                <div className="text-3xl">{program.image}</div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{program.description}</p>
              <div className="text-xs text-gray-500 mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                  {program.duration}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                </span>
              </div>
              <button
                onClick={() => handleProgramSelect(program)}
                className={`w-full py-2 px-4 rounded-md text-white ${
                  program.premium && !isPremium
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {program.premium && !isPremium ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-1">⭐</span> Premium
                  </span>
                ) : (
                  'View Program'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedProgram && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-blue-800">{selectedProgram.name}</h3>
            <button 
              onClick={() => setSelectedProgram(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">{selectedProgram.description}</p>
          
          <div className="space-y-6">
            {selectedProgram.weeks.map((week, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="font-medium text-lg text-gray-800 mb-2">{week.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{week.description}</p>
                
                <div className="space-y-3">
                  {week.workouts.map((workout, wIndex) => (
                    <div key={wIndex} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium text-gray-700">{workout.name}</h5>
                        <span className="text-sm text-gray-500">{workout.duration} min</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workout.focus.map(area => (
                          <span 
                            key={area}
                            className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                          >
                            {area.charAt(0).toUpperCase() + area.slice(1)}
                          </span>
                        ))}
                      </div>
                      <button
                        className="w-full py-1.5 mt-1 text-sm text-center bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        Start Workout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        featureName="Workout Programs"
      />
    </div>
  );
}

export default WorkoutPrograms;