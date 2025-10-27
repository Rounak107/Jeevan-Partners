import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { getUserFeatureAccess } from '../utils/featureAccess';
import KundliModal from '../components/KundliModal';
import { AstroAPI } from '../utils/astroAPI';
import { generateCompatibilitySummary } from '../utils/aiCompatibility';

const AIKundliPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [features, setFeatures] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kundliData, setKundliData] = useState(null);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [aiResponses, setAiResponses] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current user with profile data
        const userResponse = await API.get('/api/user');
        const user = userResponse.data;
        setCurrentUser(user);
        setFeatures(getUserFeatureAccess(user.membership_plan));

        // Fetch liked profiles with detailed profile information
        const likesResponse = await API.get('/api/me/likes');
        let profiles = likesResponse.data.data || likesResponse.data || [];
        
        // Fetch detailed profile data for each liked profile to get DOB
        const profilesWithDetails = await Promise.all(
          profiles.map(async (profile) => {
            try {
              const profileId = profile.id || profile.user_id || (profile.user && profile.user.id);
              if (profileId) {
                const profileDetailResponse = await API.get(`/api/profiles/${profileId}`);
                return {
                  ...profile,
                  ...profileDetailResponse.data,
                  // Ensure we have the user data with DOB
                  user: {
                    ...profile.user,
                    ...profileDetailResponse.data.user,
                    dob: profileDetailResponse.data.dob || profileDetailResponse.data.user?.dob
                  },
                  dob: profileDetailResponse.data.dob || profile.dob
                };
              }
              return profile;
            } catch (error) {
              console.error(`Error fetching profile ${profile.id}:`, error);
              return profile;
            }
          })
        );

        setLikedProfiles(profilesWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get proper birth date from profile - SAME AS LIKES PAGE
  const getProfileBirthDate = (profile) => {
    // Try multiple possible locations for DOB
    return profile.dob || 
           profile.user?.dob || 
           profile.birth_date || 
           profile.user?.birth_date ||
           '2000-01-01'; // Fallback
  };

  // AI Kundli Match function - FIXED TO USE ACTUAL PROFILE DATA
  const handleAIKundliMatch = async (profile) => {
    if (!features?.ai_kundli) {
      alert('🔒 AI Kundli Match is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    setLoadingStates(prev => ({ ...prev, [profile.id]: 'kundli' }));
    
    try {
      setSelectedProfile(profile);
      
      // Get actual birth data from current user profile
      const userBirthData = {
        date: currentUser.dob || getProfileBirthDate(currentUser),
        time: '10:00:00',
        latitude: currentUser.latitude || '28.6139',
        longitude: currentUser.longitude || '77.2090'
      };

      // Get actual birth data from liked profile
      const profileBirthData = {
        date: getProfileBirthDate(profile),
        time: '10:00:00',
        latitude: profile.latitude || '28.6139',
        longitude: profile.longitude || '77.2090'
      };

      console.log('User birth data:', userBirthData);
      console.log('Profile birth data:', profileBirthData);

      // Generate kundli for both users using actual birth data
      const [userKundli, profileKundli] = await Promise.all([
        AstroAPI.generateKundli(userBirthData),
        AstroAPI.generateKundli(profileBirthData)
      ]);

      // Calculate compatibility using actual kundli data
      const matchingData = AstroAPI.calculateAshtakoota(userKundli, profileKundli);

      setKundliData({
        userKundli,
        profileKundli,
        matching: matchingData
      });
      setShowKundliModal(true);
    } catch (error) {
      console.error('Error generating kundli match:', error);
      alert('Failed to generate kundli match. Please try again.');
    } finally {
      setLoadingStates(prev => ({ ...prev, [profile.id]: null }));
    }
  };

  // Quick Compatibility function - FIXED TO USE ACTUAL PROFILE DATA
  const handleQuickCompatibility = async (profile) => {
    if (!features?.ai_kundli) {
      alert('🔒 Quick Compatibility is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    setLoadingStates(prev => ({ ...prev, [profile.id]: 'compatibility' }));
    
    try {
      // Use actual profile data with proper DOB
      const profileWithDob = {
        ...profile,
        name: profile.user?.name || profile.name,
        dob: getProfileBirthDate(profile)
      };

      const currentUserWithDob = {
        ...currentUser,
        dob: currentUser.dob || getProfileBirthDate(currentUser)
      };

      console.log('Current user for compatibility:', currentUserWithDob);
      console.log('Profile for compatibility:', profileWithDob);

      const analysis = generateCompatibilitySummary(currentUserWithDob, profileWithDob);
      
      // Toggle display same as likes page
      setAiResponses(prev => ({
        ...prev,
        [profile.id]: prev[profile.id] ? null : analysis
      }));
    } catch (error) {
      console.error('Error in quick compatibility:', error);
      alert('Failed to generate quick compatibility. Please try again.');
    } finally {
      setLoadingStates(prev => ({ ...prev, [profile.id]: null }));
    }
  };

  // FIXED: Profile image URL construction
  const getProfileImage = (profile) => {
    const BASE_URL = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace("/api", "") 
      : "https://www.couplemarriage.com";
    
    // Try multiple possible image paths
    const imagePath = profile.profile_photo || 
                     profile.profile_picture || 
                     profile.user?.profile_photo ||
                     profile.user?.profile_picture ||
                     profile.photo;
    
    if (imagePath) {
      // Clean the path and construct URL
      const cleanPath = String(imagePath).replace(/\\/g, "/").replace(/^\/+/, "");
      return `${BASE_URL}/storage/${cleanPath}`;
    }
    
    // Fallback to default avatar
    return '/default-avatar.png';
  };

  // Debug function to check profile data
  const debugProfileData = (profile) => {
    console.log('Profile data:', {
      id: profile.id,
      name: profile.user?.name || profile.name,
      dob: getProfileBirthDate(profile),
      image: getProfileImage(profile),
      hasUser: !!profile.user,
      rawData: profile
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p>Loading AI Kundli...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-rose-600 mb-4">🔮 AI Kundli & Compatibility</h1>
          <p className="text-gray-300 text-lg">
            Analyze astrological compatibility with your liked profiles
          </p>
        </div>

        {/* Feature Access Notice */}
        {!features?.ai_kundli && (
          <div className="max-w-4xl mx-auto bg-yellow-900 border border-yellow-600 rounded-xl p-6 mb-8 text-center">
            <div className="text-yellow-200">
              <h3 className="text-xl font-bold mb-2">🔒 Upgrade Required</h3>
              <p className="mb-4">
                AI Kundli features are available in <strong>Popular</strong> and <strong>Premium</strong> plans.
              </p>
              <button 
                onClick={() => navigate('/membership')}
                className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Profiles Grid */}
        {likedProfiles.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {likedProfiles.map((profile) => {
                // Debug on render
                if (process.env.NODE_ENV === 'development') {
                  debugProfileData(profile);
                }
                
                return (
                  <div key={profile.id || profile.user_id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    
                    {/* Profile Header */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={getProfileImage(profile)}
                          alt={profile.user?.name || profile.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-rose-600"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">
                            {profile.user?.name || profile.name}
                          </h3>
                          <div className="text-gray-300 text-sm">
                            {profile.age && `${profile.age} years`} 
                            {profile.city && ` • ${profile.city}`}
                          </div>
                          {/* Debug info - shows DOB availability */}
                          {process.env.NODE_ENV === 'development' && (
                            <div className="text-xs text-gray-500 mt-1">
                              DOB: {getProfileBirthDate(profile) || 'Not available'}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="space-y-2 text-sm text-gray-300 mb-4">
                        {profile.occupation && (
                          <div className="flex items-center space-x-2">
                            <span>💼</span>
                            <span>{profile.occupation}</span>
                          </div>
                        )}
                        {profile.education && (
                          <div className="flex items-center space-x-2">
                            <span>🎓</span>
                            <span>{profile.education}</span>
                          </div>
                        )}
                        {profile.about && (
                          <p className="line-clamp-2 text-gray-400">{profile.about}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 gap-3">
                        {/* AI Kundli Match Button */}
                        <button
                          onClick={() => handleAIKundliMatch(profile)}
                          disabled={!features?.ai_kundli || loadingStates[profile.id] === 'kundli'}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                            features?.ai_kundli
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer'
                              : 'bg-gray-700 cursor-not-allowed opacity-50'
                          } ${loadingStates[profile.id] === 'kundli' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loadingStates[profile.id] === 'kundli' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <span>🌌</span>
                              <span>AI Kundli Match</span>
                            </>
                          )}
                        </button>

                        {/* Quick Compatibility Button */}
                        <button
                          onClick={() => handleQuickCompatibility(profile)}
                          disabled={!features?.ai_kundli || loadingStates[profile.id] === 'compatibility'}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                            features?.ai_kundli
                              ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 cursor-pointer'
                              : 'bg-gray-700 cursor-not-allowed opacity-50'
                          } ${loadingStates[profile.id] === 'compatibility' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loadingStates[profile.id] === 'compatibility' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <span>⚡</span>
                              <span>
                                {aiResponses[profile.id] ? 'Hide Compatibility' : 'Quick Compatibility'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Quick Compatibility Result */}
                      {aiResponses[profile.id] && (
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-rose-400 text-sm">⚡ Quick Compatibility</h4>
                            <button 
                              onClick={() => setAiResponses(prev => ({ ...prev, [profile.id]: null }))}
                              className="text-gray-400 hover:text-white text-lg"
                            >
                              ×
                            </button>
                          </div>
                          <div className="bg-gray-900 rounded p-3">
                            <pre className="whitespace-pre-wrap text-xs text-gray-300">
                              {aiResponses[profile.id].text}
                            </pre>
                          </div>
                          {aiResponses[profile.id].score > 0 && (
                            <div className="mt-2 text-center">
                              <div className="text-lg font-bold text-rose-500">
                                {aiResponses[profile.id].score}% Match
                              </div>
                              <div className="text-xs text-gray-400">
                                {aiResponses[profile.id].level} Compatibility
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* No Profiles Message */
          <div className="max-w-2xl mx-auto text-center bg-gray-800 rounded-2xl p-8">
            <div className="text-6xl mb-4">💫</div>
            <h3 className="text-2xl font-bold text-rose-600 mb-4">No Liked Profiles Yet</h3>
            <p className="text-gray-300 mb-6">
              Like some profiles first to analyze their astrological compatibility with you.
            </p>
            <button 
              onClick={() => navigate('/matches')}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all"
            >
              Browse Matches
            </button>
          </div>
        )}

        {/* Current Plan Info */}
        <div className="max-w-4xl mx-auto text-center mt-8">
          <div className="bg-gray-800 rounded-2xl p-6 inline-block">
            <p className="text-gray-300 mb-2">Your Current Plan</p>
            <p className="text-2xl font-bold text-rose-600 capitalize mb-4">
              {currentUser?.membership_plan || 'Free'}
            </p>
            <button 
              onClick={() => navigate('/membership')}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all"
            >
              View Plans & Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Kundli Modal */}
      <KundliModal
        isOpen={showKundliModal}
        onClose={() => {
          setShowKundliModal(false);
          setSelectedProfile(null);
        }}
        userKundli={kundliData?.userKundli}
        targetKundli={kundliData?.profileKundli}
        matchingData={kundliData?.matching}
      />
    </div>
  );
};

export default AIKundliPage;