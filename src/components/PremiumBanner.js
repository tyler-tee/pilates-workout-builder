// src/components/PremiumBanner.js
import React, { useState } from 'react';
import { isPremiumUser, purchasePremium } from '../data/premiumFeatures';
import featureAccess from '../utils/featureAccess';

function PremiumBanner() {
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await purchasePremium();
      setIsPremium(true);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Premium features to highlight
  const premiumFeatures = [
    featureAccess.getPremiumFeatureDetails('detailedAnalytics'),
    featureAccess.getPremiumFeatureDetails('workoutPrograms'),
    featureAccess.getPremiumFeatureDetails('favorites'),
    featureAccess.getPremiumFeatureDetails('userProfiles')
  ];

  if (isPremium) {
    return (
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="text-xl mr-2">✨</div>
          <div>
            <h3 className="font-semibold text-indigo-800">PilatesPulse Premium</h3>
            <p className="text-sm text-indigo-600">Thank you for your support! Enjoy all premium features.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div className="mb-4 md:mb-0 md:flex-1">
          <h3 className="font-semibold text-blue-800 flex items-center">
            <span className="text-xl mr-2">⭐</span>
            Upgrade to PilatesPulse Premium
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            Enhance your Pilates experience with premium features designed to help you reach your fitness goals.
          </p>
          
          <div className={`mt-2 ${expanded ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start mt-1">
                  <span className="text-lg mr-2">{feature.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-blue-800">{feature.name}</p>
                    <p className="text-xs text-blue-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm text-blue-700 hover:text-blue-900 underline md:hidden"
          >
            {expanded ? 'Show less' : 'See premium benefits'}
          </button>
        </div>
        
        <div className="md:ml-6 flex flex-col items-center">
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium mb-2 w-full md:w-auto ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Upgrade for $0.99'}
          </button>
          <span className="text-xs text-blue-700">No commitment, cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

export default PremiumBanner;