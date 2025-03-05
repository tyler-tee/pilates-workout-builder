import React from 'react';
import { bodyAreaOptions } from '../data/options';

function ExerciseItem({ exercise, index, currentIndex, restTime }) {
  return (
    <li className={`py-4 ${currentIndex === index ? 'bg-blue-50 p-2 rounded' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{exercise.image}</span>
          <h3 className="font-semibold text-lg">{exercise.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-gray-500">{exercise.duration} min</span>
          <div className="text-xs text-gray-400">+{restTime}s rest</div>
        </div>
      </div>
      
      <p className="text-gray-700 mt-1">{exercise.description}</p>
      
      {exercise.relevantModifications && exercise.relevantModifications.length > 0 && (
        <div className="mt-2 p-2 bg-amber-50 rounded-md">
          <p className="text-sm font-medium text-amber-800">Modifications:</p>
          <ul className="text-sm text-amber-700 mt-1 pl-5 list-disc">
            {exercise.relevantModifications.map((mod, i) => (
              <li key={i}>{mod.instruction}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-2 flex flex-wrap gap-2">
        {exercise.targetAreas.map(area => {
          const areaOption = bodyAreaOptions.find(option => option.id === area);
          return (
            <span key={area} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {areaOption ? areaOption.label : area}
            </span>
          );
        })}
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
        </span>
      </div>
    </li>
  );
}

export default ExerciseItem;