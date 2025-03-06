// src/components/PremiumBanner.js
import React, { useState } from 'react';
import { isPremiumUser, purchasePremium } from '../data/premiumFeatures';

function PremiumBanner() {
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-semibold text-blue-800 flex items-center">
            <span className="text-xl mr-2">⭐</span>
            Upgrade to PilatesPulse Premium
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            Get access to exclusive workout programs, premium exercises, and more!
          </p>
          <ul className="text-xs text-blue-600 mt-2 list-disc list-inside">
            <li>4-week structured workout programs</li>
            <li>Progress tracking across all devices</li>
            <li>20+ exclusive premium exercises</li>
            <li>Multiple user profiles for the whole family</li>
          </ul>
        </div>
        <div>
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Upgrade for $0.99'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumBanner;