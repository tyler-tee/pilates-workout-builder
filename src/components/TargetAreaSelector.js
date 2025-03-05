import React from 'react';
import { bodyAreaOptions } from '../data/options';

function TargetAreaSelector({ preferences, setPreferences }) {
  const handleAreaChange = (areaId) => {
    setPreferences(prev => {
      const newAreas = prev.targetAreas.includes(areaId)
        ? prev.targetAreas.filter(id => id !== areaId)
        : [...prev.targetAreas, areaId];
      
      return { ...prev, targetAreas: newAreas };
    });
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Target Areas</h2>
      <div className="grid grid-cols-1 gap-2">
        {bodyAreaOptions.map(area => (
          <div key={area.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`area-${area.id}`}
              checked={preferences.targetAreas.includes(area.id)}
              onChange={() => handleAreaChange(area.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`area-${area.id}`} className="ml-2 text-gray-700">
              {area.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TargetAreaSelector;