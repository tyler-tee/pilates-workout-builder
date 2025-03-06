// src/components/UserProfiles.js
import React, { useState, useEffect } from 'react';
import { isPremiumUser } from '../data/premiumFeatures';
import PremiumFeatureModal from './PremiumFeatureModal';
import featureAccess from '../utils/featureAccess';

function UserProfiles({ onSelectProfile, currentPreferences }) {
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
        ...newProfile
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

  const handleDeleteProfile = (profileId) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(updatedProfiles);
    
    try {
      localStorage.setItem('pilatesPulse_profiles', JSON.stringify(updatedProfiles));
    } catch (error) {
      console.error('Failed to update profiles:', error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">User Profiles</h2>
        <div>
          <button 
            onClick={handleAddProfile}
            className="mr-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            + New Profile
          </button>
          <button 
            onClick={handleSaveCurrentAsProfile}
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Save Current Settings
          </button>
        </div>
      </div>
      
      {/* Profile limit indicator for free users */}
      {!isPremium && profiles.length > 0 && (
        <div className="text-sm text-gray-500 mb-3">
          {profiles.length} / {profilesAccess.limit} profiles used
          {profilesAccess.limitReached && (
            <span className="ml-2 text-amber-600">
              (Limit reached)
            </span>
          )}
        </div>
      )}
      
      {profiles.length === 0 && !isAddingProfile ? (
        <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
          <p>Create profiles to quickly switch between different settings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {profiles.map(profile => (
            <div 
              key={profile.id}
              className="border rounded-md p-3 hover:bg-blue-50 transition-colors relative"
            >
              <button
                onClick={() => handleDeleteProfile(profile.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                aria-label="Delete profile"
              >
                ✕
              </button>
              <div 
                className="cursor-pointer pt-2"
                onClick={() => handleSelectProfile(profile)}
              >
                <h3 className="font-medium text-blue-800 mb-1">{profile.name}</h3>
                <div className="text-xs text-gray-600">
                  <p>
                    Level: {profile.difficultyLevel.charAt(0).toUpperCase() + profile.difficultyLevel.slice(1)}
                  </p>
                  {profile.healthConsiderations && profile.healthConsiderations.length > 0 && (
                    <p>
                      Health: {profile.healthConsiderations.length} considerations
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isAddingProfile && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Create New Profile</h3>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Profile Name</label>
            <input
              type="text"
              value={newProfile.name}
              onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Morning Routine, Back Pain Day"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingProfile(false)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              disabled={!newProfile.name.trim()}
            >
              Save Profile
            </button>
          </div>
        </div>
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

export default UserProfiles;