// src/components/UpdatedPremiumBanner.js
import React, { useState } from 'react';
import { isPremiumUser, purchasePremium } from '../data/premiumFeatures';
import featureAccess from '../utils/featureAccess';

function UpdatedPremiumBanner() {
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
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4 mb-6">
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg overflow-hidden mb-6">
      <div className="flex items-center p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="text-xl mr-3 text-yellow-500">⭐</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">Upgrade to PilatesPulse Premium</h3>
          <p className="text-sm text-gray-600">
            Enhance your Pilates experience with premium features
          </p>
        </div>
        <button
          className={`p-1 rounded-full transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {expanded && (
        <div className="border-t border-blue-100 p-4 bg-white bg-opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex p-3 bg-white bg-opacity-60 rounded-lg">
                <div className="text-2xl mr-3">{feature.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{feature.name}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className={`flex items-center justify-center px-6 py-2 rounded-md text-white font-medium ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } shadow-sm transition-colors w-full sm:w-auto`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Upgrade for $0.99'
              )}
            </button>
            <span className="text-xs text-gray-500">No commitment, cancel anytime</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatedPremiumBanner;