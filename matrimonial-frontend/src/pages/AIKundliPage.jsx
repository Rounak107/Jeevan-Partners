import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { getUserFeatureAccess } from '../utils/featureAccess';
import KundliModal from '../components/KundliModal';
import { generateCompatibilitySummary } from '../utils/aiCompatibility';

const AIKundliPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [features, setFeatures] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kundliData, setKundliData] = useState(null);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [quickCompatibilityResult, setQuickCompatibilityResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current user
        const userResponse = await API.get('/api/user');
        const user = userResponse.data;
        setCurrentUser(user);
        setFeatures(getUserFeatureAccess(user.membership_plan));

        // Fetch liked profiles
        const likesResponse = await API.get('/api/me/likes');
        const profiles = likesResponse.data.data || likesResponse.data || [];
        setLikedProfiles(profiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAIKundliMatch = async (profile) => {
    if (!features?.ai_kundli) {
      alert('🔒 AI Kundli Match is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    try {
      setSelectedProfile(profile);
      
      // Generate kundli for both users
      const userKundliResponse = await API.post('/api/generate-kundli', {
        date: currentUser.dob || '2000-01-01', // fallback if user doesn't have DOB
        time: '10:00',
        latitude: currentUser.latitude || '28.6139',
        longitude: currentUser.longitude || '77.2090'
      });

      const profileKundliResponse = await API.post('/api/generate-kundli', {
        date: profile.dob || profile.user?.dob || '2000-01-01',
        time: '10:00',
        latitude: profile.latitude || '28.6139',
        longitude: profile.longitude || '77.2090'
      });

      // Calculate compatibility
      const matchingResponse = await API.post('/api/calculate-compatibility', {
        userKundli: userKundliResponse.data,
        profileKundli: profileKundliResponse.data
      });

      setKundliData({
        userKundli: userKundliResponse.data,
        profileKundli: profileKundliResponse.data,
        matching: matchingResponse.data
      });
      setShowKundliModal(true);
    } catch (error) {
      console.error('Error generating kundli match:', error);
      alert('Failed to generate kundli match. Please try again.');
    }
  };

  const handleQuickCompatibility = async (profile) => {
    if (!features?.ai_kundli) {
      alert('🔒 Quick Compatibility is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    try {
      setSelectedProfile(profile);
      const analysis = generateCompatibilitySummary(currentUser, profile);
      setQuickCompatibilityResult(analysis);
      
      // Show in modal
      setKundliData({
        quickCompatibility: analysis,
        userKundli: { zodiac: analysis.zodiac1 },
        profileKundli: { zodiac: analysis.zodiac2 }
      });
      setShowKundliModal(true);
    } catch (error) {
      console.error('Error in quick compatibility:', error);
      alert('Failed to generate quick compatibility. Please try again.');
    }
  };

  const handleMessage = (profile) => {
    if (!features?.messaging) {
      alert('🔒 Messaging is not available in your current plan. Please upgrade to Essential plan or higher.');
      return;
    }
    
    const userId = profile.user_id || profile.user?.id;
    if (userId) {
      navigate(`/messages/${userId}`);
    }
  };

  const getProfileImage = (profile) => {
    const BASE_URL = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace("/api", "") 
      : "https://couplemarriage.com";
    
    const imagePath = profile.profile_photo || profile.profile_picture || profile.user?.profile_photo;
    if (imagePath) {
      return `${BASE_URL}/storage/${String(imagePath).replace(/\\/g, "/").replace(/^\/+/, "")}`;
    }
    return '/default-avatar.png';
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
              {likedProfiles.map((profile) => (
                <div key={profile.id || profile.user_id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  
                  {/* Profile Header */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={getProfileImage(profile)}
                        alt={profile.user?.name || profile.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-rose-600"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {profile.user?.name || profile.name}
                        </h3>
                        <div className="text-gray-300 text-sm">
                          {profile.age && `${profile.age} years`} 
                          {profile.city && ` • ${profile.city}`}
                        </div>
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
                        disabled={!features?.ai_kundli}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                          features?.ai_kundli
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer'
                            : 'bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>🌌</span>
                        <span>AI Kundli Match</span>
                      </button>

                      {/* Quick Compatibility Button */}
                      <button
                        onClick={() => handleQuickCompatibility(profile)}
                        disabled={!features?.ai_kundli}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                          features?.ai_kundli
                            ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 cursor-pointer'
                            : 'bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>⚡</span>
                        <span>Quick Compatibility</span>
                      </button>

                      {/* Message Button */}
                      <button
                        onClick={() => handleMessage(profile)}
                        disabled={!features?.messaging}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                          features?.messaging
                            ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 cursor-pointer'
                            : 'bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>💬</span>
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          setQuickCompatibilityResult(null);
        }}
        userKundli={kundliData?.userKundli}
        targetKundli={kundliData?.profileKundli}
        matchingData={kundliData?.matching}
      />
    </div>
  );
};

export default AIKundliPage;