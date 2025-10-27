import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { getUserFeatureAccess } from '../utils/featureAccess';
import KundliModal from '../components/KundliModal';
import { AstroAPI } from '../utils/astroAPI';
import { generateCompatibilitySummary, toggleCompatibility } from '../utils/aiCompatibility';

const BASE_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace("/api", "") 
  : "https://www.couplemarriage.com";

const STORAGE_BASE = `${BASE_URL}/storage`;
const normalizePath = (p) => String(p || "").replace(/\\/g, "/").replace(/^\/+/, "");
const imgUrl = (p) => `${STORAGE_BASE}/${normalizePath(p)}`;

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
        
        // Fetch current user with profile data - SAME AS LIKES PAGE
        const userResponse = await API.get('/api/user');
        const user = userResponse.data;
        setCurrentUser(user);
        setFeatures(getUserFeatureAccess(user.membership_plan));

        // Fetch liked profiles - EXACTLY LIKE LIKES PAGE
        const likesResponse = await API.get('/api/me/likes');
        console.log('🔄 Raw likes API response:', likesResponse.data);
        
        let profiles = [];
        
        if (Array.isArray(likesResponse.data)) {
          profiles = likesResponse.data;
        } else if (likesResponse.data.data && Array.isArray(likesResponse.data.data)) {
          profiles = likesResponse.data.data;
        } else if (likesResponse.data.likes) {
          profiles = likesResponse.data.likes;
        }
        
        console.log('📊 Extracted profiles for AI Kundli:', profiles);
        setLikedProfiles(profiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use the SAME formatDate function as LikesPage
  const formatDate = (dateString) => {
    if (!dateString) return '01-01-2000';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // AI Kundli Match function - EXACTLY LIKE LIKES PAGE
  const handleAIKundliMatch = async (like) => {
    if (!features?.ai_kundli) {
      alert('🔒 AI Kundli Match is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    // Extract data EXACTLY LIKE LIKES PAGE
    const profile = like.profile || {};
    
    if (!currentUser?.dob) {
      alert('Please complete your profile with birth date first!');
      return;
    }

    if (!profile.dob) {
      alert('This profile does not have a birth date set. Cannot generate kundli match.');
      return;
    }

    const profileId = profile.id || like.id;
    setLoadingStates(prev => ({ ...prev, [profileId]: 'kundli' }));
    
    try {
      setSelectedProfile(profile);
      
      // USE EXACTLY THE SAME LOGIC AS LIKES PAGE
      const userBirthData = {
        date: formatDate(currentUser.dob)
      };

      const targetBirthData = {
        date: formatDate(profile.dob)
      };

      console.log('📅 Birth data for kundli:', {
        userBirthData,
        targetBirthData,
        currentUserDob: currentUser.dob,
        profileDob: profile.dob
      });

      // Generate both kundlis using the SAME AstroAPI
      const userKundli = await AstroAPI.generateKundli(userBirthData);
      const targetKundli = await AstroAPI.generateKundli(targetBirthData);

      // Calculate matching using the SAME function
      const matchingData = AstroAPI.calculateAshtakoota(userKundli, targetKundli);

      setKundliData({
        userKundli,
        targetKundli,
        matchingData
      });
      setShowKundliModal(true);
    } catch (error) {
      console.error('Kundli generation failed:', error);
      alert('Failed to generate kundli analysis. Please try again.');
    } finally {
      setLoadingStates(prev => ({ ...prev, [profileId]: null }));
    }
  };

  // Quick Compatibility function - EXACTLY LIKE LIKES PAGE
  const handleQuickCompatibility = (like) => {
    if (!features?.ai_kundli) {
      alert('🔒 Quick Compatibility is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }
    
    if (!currentUser) {
      alert("Please complete your own profile first!");
      return;
    }

    // Extract data EXACTLY LIKE LIKES PAGE
    const profile = like.profile || {};
    const user = like.user || profile.user || {};

    console.log('⚡ Quick Compatibility Data:', {
      currentUserDob: currentUser.dob,
      profileDob: profile.dob,
      profile: profile,
      user: user
    });

    if (!currentUser.dob || !profile.dob) {
      if (!currentUser.dob) {
        alert('Please add your birth date in your profile for compatibility analysis.');
      } else {
        alert('This profile does not have a birth date set. Cannot analyze compatibility.');
      }
      return;
    }
    
    // USE EXACTLY THE SAME LOGIC AS LIKES PAGE
    const targetUserData = {
      ...profile,
      name: user?.name || "Unknown",
      dob: profile.dob
    };

    console.log('👥 Compatibility analysis:', {
      currentUser: { name: currentUser.name, dob: currentUser.dob },
      targetUser: targetUserData
    });
    
    // Use the SAME toggleCompatibility function
    const profileId = profile.id || like.id;
    toggleCompatibility(profileId, aiResponses, setAiResponses, currentUser, targetUserData);
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
              {likedProfiles.map((like, idx) => {
                // EXTRACT DATA EXACTLY LIKE LIKES PAGE
                const profile = like.profile || like;
                const user = like.user || profile.user || {};
                const avatar = profile.profile_photo ? imgUrl(profile.profile_photo) : null;
                const profileId = profile.id || like.profile_id || like.id || idx;

                const userDob = currentUser?.dob;
                const profileDob = profile.dob;
                const canAnalyze = userDob && profileDob;

                console.log(`👤 Profile ${profileId}:`, {
                  userName: user.name,
                  profileDob: profileDob,
                  userDob: userDob,
                  canAnalyze: canAnalyze
                });

                return (
                  <div
                    key={profileId}
                    className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-24 h-24 bg-rose-100 border border-rose-300 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={user.name || "Profile photo"}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.target.src = '/default-avatar.png';
                              }}
                            />
                          ) : (
                            <span className="text-3xl text-rose-500">👤</span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {user.name || "Unknown"}
                        </h3>
                        <p className="text-gray-300">
                          {profile.age ? `${profile.age} yrs` : ""}
                          {profile.age && profile.city ? " • " : ""}
                          {profile.city || ""}
                        </p>
                        
                        {/* Debug info */}
                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                          <div>Your DOB: {userDob ? '✅ Available' : '❌ Missing'}</div>
                          <div>Profile DOB: {profileDob ? '✅ Available' : '❌ Missing'}</div>
                          {profileDob && <div>Profile DOB: {profileDob}</div>}
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

                      {/* Action Buttons - SAME AS LIKES PAGE BUT WITHOUT MESSAGE BUTTON */}
                      <div className="space-y-2">
                        {/* AI Kundli Match Button */}
                        <button
                          onClick={() => handleAIKundliMatch(like)}
                          disabled={!features?.ai_kundli || loadingStates[profileId] === 'kundli' || !canAnalyze}
                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                            features?.ai_kundli && canAnalyze
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 cursor-pointer'
                              : 'bg-gray-700 cursor-not-allowed opacity-50'
                          } ${loadingStates[profileId] === 'kundli' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loadingStates[profileId] === 'kundli' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <span>🤖</span>
                              <span>AI Kundli Match</span>
                            </>
                          )}
                        </button>

                        {/* Quick Compatibility Button */}
                        <button
                          onClick={() => handleQuickCompatibility(like)}
                          disabled={!features?.ai_kundli || !canAnalyze}
                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                            features?.ai_kundli && canAnalyze
                              ? 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                              : 'bg-gray-700 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <span>🔮</span>
                          <span>
                            {aiResponses[profileId] ? 'Hide Compatibility' : 'Quick Compatibility'}
                          </span>
                        </button>
                      </div>

                      {/* Data Warnings */}
                      {!canAnalyze && (
                        <div className="mt-3 p-2 bg-yellow-900 border border-yellow-600 rounded text-yellow-200 text-xs">
                          {!userDob && !profileDob 
                            ? 'Add birth dates to both profiles for analysis'
                            : !userDob 
                            ? 'Add your birth date in your profile'
                            : 'Profile birth date missing'
                          }
                        </div>
                      )}

                      {/* Quick Compatibility Result - SAME AS LIKES PAGE */}
                      {aiResponses[profileId] && (
                        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 text-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-purple-700">🤖 Quick Compatibility</h4>
                            <button 
                              onClick={() => handleQuickCompatibility(like)}
                              className="text-gray-500 hover:text-gray-700 text-lg"
                            >
                              ×
                            </button>
                          </div>
                          <div className="whitespace-pre-line text-sm leading-relaxed">
                            {typeof aiResponses[profileId] === 'string' 
                              ? aiResponses[profileId] 
                              : aiResponses[profileId].text
                            }
                          </div>
                          {aiResponses[profileId] && aiResponses[profileId].score > 0 && (
                            <div className="mt-3 pt-3 border-t border-blue-200">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">Zodiac Match:</span>
                                <span className="font-semibold text-purple-600">
                                  {aiResponses[profileId].zodiac1} + {aiResponses[profileId].zodiac2}
                                </span>
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
        targetKundli={kundliData?.targetKundli}
        matchingData={kundliData?.matchingData}
      />
    </div>
  );
};

export default AIKundliPage;