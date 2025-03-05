import React from 'react';

function EquipmentSelector({ preferences, setPreferences, options }) {
  const handleEquipmentChange = (equipmentId) => {
    setPreferences(prev => {
      const newEquipment = prev.equipment.includes(equipmentId)
        ? prev.equipment.filter(id => id !== equipmentId)
        : [...prev.equipment, equipmentId];
      
      return { ...prev, equipment: newEquipment };
    });
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Equipment Available</h2>
      <div className="grid grid-cols-1 gap-2">
        {options.map(item => (
          <div key={item.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`equipment-${item.id}`}
              checked={preferences.equipment.includes(item.id)}
              onChange={() => handleEquipmentChange(item.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`equipment-${item.id}`} className="ml-2 text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipmentSelector;