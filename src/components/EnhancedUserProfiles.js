// src/components/EnhancedUserProfiles.js
import React, { useState, useEffect } from 'react';
import { isPremiumUser } from '../data/premiumFeatures';
import PremiumFeatureModal from './PremiumFeatureModal';
import featureAccess from '../utils/featureAccess';

function EnhancedUserProfiles({ onSelectProfile, currentPreferences }) {
  const [profiles, setProfiles] = useState([]);
  const [isPremium] = useState(isPremiumUser());
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    equipment: [],
    healthConsiderations: [],
    difficultyLevel: 'beginner'
  });

  // Profile backgrounds and icons to make profiles more visually distinct
  const profileStyles = [
    { bg: 'bg-blue-100', icon: '🧘‍♀️', color: 'text-blue-600' },
    { bg: 'bg-green-100', icon: '🏋️‍♀️', color: 'text-green-600' },
    { bg: 'bg-purple-100', icon: '🤸‍♀️', color: 'text-purple-600' },
    { bg: 'bg-amber-100', icon: '🧠', color: 'text-amber-600' },
    { bg: 'bg-pink-100', icon: '💪', color: 'text-pink-600' },
    { bg: 'bg-teal-100', icon: '🌿', color: 'text-teal-600' },
  ];

  // Check access to user profiles feature
  const profilesAccess = featureAccess.checkAccess('userProfiles', profiles.length);

  useEffect(() => {
    // Load profiles from localStorage
    const loadProfiles = () => {
      try {
        const savedProfiles = localStorage.getItem('pilatesPulse_profiles');
        if (savedProfiles) {
          return JSON.parse(savedProfiles);
        }
      } catch (error) {
        console.error('Failed to load profiles:', error);
      }
      return [];
    };
    
    setProfiles(loadProfiles());
  }, []);

  const handleAddProfile = () => {
    if (profilesAccess.limitReached && !isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    setIsAddingProfile(true);
  };

  const handleSaveProfile = () => {
    if (!newProfile.name.trim()) {
      return; // Don't save empty profile name
    }
    
    const updatedProfiles = [
      ...profiles,
      {
        id: Date.now(),
        ...newProfile,
        styleIndex: Math.floor(Math.random() * profileStyles.length)
      }
    ];
    
    setProfiles(updatedProfiles);
    
    // Save to localStorage
    try {
      localStorage.setItem('pilatesPulse_profiles', JSON.stringify(updatedProfiles));
    } catch (error) {
      console.error('Failed to save profiles:', error);
    }
    
    setIsAddingProfile(false);
    setNewProfile({
      name: '',
      equipment: [],
      healthConsiderations: [],
      difficultyLevel: 'beginner'
    });
  };

  const handleSelectProfile = (profile) => {
    onSelectProfile(profile);
  };

  const handleSaveCurrentAsProfile = () => {
    if (profilesAccess.limitReached && !isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    setNewProfile({
      name: '',
      ...currentPreferences
    });
    setIsAddingProfile(true);
  };

  const handleDeleteProfile = (profileId, e) => {
    e.stopPropagation();
    
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(updatedProfiles);
    
    try {
      localStorage.setItem('pilatesPulse_profiles', JSON.stringify(updatedProfiles));
    } catch (error) {
      console.error('Failed to update profiles:', error);
    }
  };

  const getProfileDifficultyLabel = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return 'All Levels';
    }
  };

  const getProfileDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">User Profiles</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button 
            onClick={handleAddProfile}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Profile
          </button>
          <button 
            onClick={handleSaveCurrentAsProfile}
            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Current
          </button>
        </div>
      </div>
      
      {/* Profile limit indicator for free users */}
      {!isPremium && (
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {profiles.length} / {profilesAccess.limit} profiles used
            {profilesAccess.limitReached && (
              <span className="ml-2 text-amber-600">
                (Limit reached)
              </span>
            )}
          </div>
          {profilesAccess.limitReached && (
            <button 
              onClick={() => setShowPremiumModal(true)}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
            >
              Upgrade for unlimited profiles
            </button>
          )}
        </div>
      )}
      
      {profiles.length === 0 && !isAddingProfile ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <div className="text-4xl mb-3">👤</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Profiles Yet</h3>
          <p className="text-gray-500 mb-4">
            Create profiles to quickly switch between different settings.
          </p>
          <button
            onClick={handleAddProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create Your First Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {profiles.map((profile) => {
            const styleIndex = profile.styleIndex || 0;
            const style = profileStyles[styleIndex % profileStyles.length];
            
            return (
              <div 
                key={profile.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectProfile(profile)}
              >
                <div className={`${style.bg} px-4 py-3 flex justify-between items-center`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{style.icon}</span>
                    <h3 className={`font-medium ${style.color}`}>{profile.name}</h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProfile(profile.id, e)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                    aria-label="Delete profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getProfileDifficultyColor(profile.difficultyLevel)}`}>
                      {getProfileDifficultyLabel(profile.difficultyLevel)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {profile.equipment && profile.equipment.length > 0 ? (
                      <p className="mb-1">
                        <span className="font-medium">Equipment:</span> {profile.equipment.length} selected
                      </p>
                    ) : null}
                    {profile.healthConsiderations && profile.healthConsiderations.length > 0 ? (
                      <p>
                        <span className="font-medium">Health:</span> {profile.healthConsiderations.length} considerations
                      </p>
                    ) : null}
                    {profile.targetAreas && profile.targetAreas.length > 0 ? (
                      <p>
                        <span className="font-medium">Focus:</span> {profile.targetAreas.length} areas
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {isAddingProfile && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Create New Profile
          </h3>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Profile Name</label>
            <input
              type="text"
              value={newProfile.name}
              onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Morning Routine, Back Pain Day"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Difficulty Level</label>
            <select
              value={newProfile.difficultyLevel}
              onChange={(e) => setNewProfile({...newProfile, difficultyLevel: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all">All Levels</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingProfile(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              disabled={!newProfile.name.trim()}
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
      
      {profiles.length > 0 && !isAddingProfile && (
        <p className="text-sm text-gray-500 mt-2">
          Click on a profile to load its settings.
        </p>
      )}
      
      {showPremiumModal && (
        <PremiumFeatureModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          featureName="User Profiles"
        />
      )}
    </div>
  );
}

export default EnhancedUserProfiles;