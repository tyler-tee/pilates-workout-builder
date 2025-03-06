// src/components/PremiumFeatureModal.js
import React from 'react';
import { isPremiumUser } from '../data/premiumFeatures';

function PremiumFeatureModal({ isOpen, onClose, featureName }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Premium Feature</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">⭐</div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">
            {featureName} is a Premium Feature
          </h4>
          <p className="text-gray-600">
            Upgrade to PilatesPulse Premium to access this and many other exclusive features.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => {
              window.location.href = "#premium";
              onClose();
            }}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Upgrade for $0.99
          </button>
          <button 
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumFeatureModal;