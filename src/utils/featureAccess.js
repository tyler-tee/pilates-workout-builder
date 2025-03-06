// src/utils/featureAccess.js
import { isPremiumUser } from '../data/premiumFeatures';

// Free tier limits
const FREE_TIER_LIMITS = {
  FAVORITES_LIMIT: 5,
  HISTORY_LIMIT: 10,
  PROFILES_LIMIT: 2,
  ACCESSIBLE_EXERCISES: 'all'  // 'all' or a number
};

/**
 * Feature access utility to centralize feature availability decisions
 */
const featureAccess = {
  /**
   * Check if user has access to a feature with optional quantity limits
   * @param {string} feature - The feature to check
   * @param {number} currentCount - Current quantity (for limited features)
   * @returns {Object} Access details { hasAccess, limitReached, limit, premiumRequired }
   */
  checkAccess(feature, currentCount = 0) {
    const isPremium = isPremiumUser();
    
    switch (feature) {
      case 'favorites':
        if (isPremium) return { hasAccess: true, limitReached: false, premiumRequired: false };
        return { 
          hasAccess: true, 
          limitReached: currentCount >= FREE_TIER_LIMITS.FAVORITES_LIMIT,
          limit: FREE_TIER_LIMITS.FAVORITES_LIMIT,
          premiumRequired: currentCount >= FREE_TIER_LIMITS.FAVORITES_LIMIT
        };
      
      case 'workoutHistory':
        return {
          hasAccess: true,
          limitReached: !isPremium && currentCount >= FREE_TIER_LIMITS.HISTORY_LIMIT,
          limit: isPremium ? null : FREE_TIER_LIMITS.HISTORY_LIMIT,
          premiumRequired: false
        };
        
      case 'detailedAnalytics':
        return {
          hasAccess: isPremium,
          limitReached: false,
          premiumRequired: true
        };
        
      case 'userProfiles':
        if (isPremium) return { hasAccess: true, limitReached: false, premiumRequired: false };
        return {
          hasAccess: true,
          limitReached: currentCount >= FREE_TIER_LIMITS.PROFILES_LIMIT,
          limit: FREE_TIER_LIMITS.PROFILES_LIMIT,
          premiumRequired: currentCount >= FREE_TIER_LIMITS.PROFILES_LIMIT
        };
        
      case 'workoutPrograms':
        return {
          hasAccess: isPremium,
          limitReached: false,
          premiumRequired: true
        };
        
      case 'exerciseLibrary':
        return {
          hasAccess: true,
          limitReached: false,
          premiumRequired: false
        };
        
      case 'workoutGenerator':
        return {
          hasAccess: true,
          limitReached: false,
          premiumRequired: false
        };
        
      default:
        return {
          hasAccess: true,
          limitReached: false,
          premiumRequired: false
        };
    }
  },
  
  /**
   * Get limits for a feature
   * @param {string} feature - The feature to get limits for
   * @returns {Object|null} Limit details or null if no limits
   */
  getLimits(feature) {
    const isPremium = isPremiumUser();
    if (isPremium) return null; // No limits for premium users
    
    switch (feature) {
      case 'favorites':
        return { limit: FREE_TIER_LIMITS.FAVORITES_LIMIT };
      case 'workoutHistory':
        return { limit: FREE_TIER_LIMITS.HISTORY_LIMIT };
      case 'userProfiles':
        return { limit: FREE_TIER_LIMITS.PROFILES_LIMIT };
      default:
        return null;
    }
  },
  
  /**
   * Get premium feature details for marketing purposes
   * @param {string} feature - The feature to get details for
   * @returns {Object} Feature details for marketing
   */
  getPremiumFeatureDetails(feature) {
    switch (feature) {
      case 'favorites':
        return {
          name: 'Unlimited Favorites',
          description: 'Save as many favorite exercises as you want',
          icon: '❤️'
        };
      case 'detailedAnalytics':
        return {
          name: 'Detailed Analytics',
          description: 'Get comprehensive insights about your workout patterns',
          icon: '📊'
        };
      case 'workoutPrograms':
        return {
          name: 'Structured Programs',
          description: 'Access multi-week guided workout programs',
          icon: '🏆'
        };
      case 'userProfiles':
        return {
          name: 'Multiple User Profiles',
          description: 'Create profiles for everyone in your household',
          icon: '👥'
        };
      default:
        return {
          name: 'Premium Feature',
          description: 'Unlock all premium features',
          icon: '⭐'
        };
    }
  }
};

export default featureAccess;