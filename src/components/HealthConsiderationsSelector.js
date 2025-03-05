import React from 'react';
import { healthConsiderationsOptions } from '../data/options';

function HealthConsiderationsSelector({ preferences, setPreferences }) {
  const handleHealthConsiderationsChange = (considerationId) => {
    setPreferences(prev => {
      const newConsiderations = prev.healthConsiderations.includes(considerationId)
        ? prev.healthConsiderations.filter(id => id !== considerationId)
        : [...prev.healthConsiderations, considerationId];
      
      return { ...prev, healthConsiderations: newConsiderations };
    });
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Health Considerations</h2>
      <p className="text-gray-600 text-sm mb-2">Select any conditions that may require exercise modifications</p>
      <div className="grid grid-cols-1 gap-2">
        {healthConsiderationsOptions.map(item => (
          <div key={item.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`health-${item.id}`}
              checked={preferences.healthConsiderations.includes(item.id)}
              onChange={() => handleHealthConsiderationsChange(item.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`health-${item.id}`} className="ml-2 text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthConsiderationsSelector;