import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AstroAPI } from "../utils/astroAPI";
import KundliModal from "../components/KundliModal";
import { toggleCompatibility } from "../utils/aiCompatibility";
import { hasFeatureAccess, FEATURES } from "../utils/featureAccess";

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "https://couplemarriage.com";

const STORAGE_BASE = `${BASE_URL}/storage`;
const normalizePath = (p) =>
  String(p || "").replace(/\\/g, "/").replace(/^\/+/, "");
const imgUrl = (p) => `${STORAGE_BASE}/${normalizePath(p)}`;

export default function LikesPage() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiResponses, setAiResponses] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [userMembership, setUserMembership] = useState(null);
  const navigate = useNavigate();

  const [kundliModal, setKundliModal] = useState({
    isOpen: false,
    userKundli: null,
    targetKundli: null,
    matchingData: null,
    loading: false
  });

  // Feature access checks - use membership data from separate API call
  const userPlan = userMembership?.plan_name?.toLowerCase() || 'free';
  const canMessage = hasFeatureAccess(userPlan, FEATURES.MESSAGING);
  const canAccessAIKundli = hasFeatureAccess(userPlan, FEATURES.AI_KUNDLI);
  const isPremiumAssisted = userPlan === 'premium assisted';

  // Debug logging
  // useEffect(() => {
  //   console.log("Current User:", currentUser);
  //   console.log("User Membership:", userMembership);
  //   console.log("User Plan:", userPlan);
  //   console.log("Can Message:", canMessage);
  //   console.log("Can Access AI Kundli:", canAccessAIKundli);
  //   console.log("Is Premium Assisted:", isPremiumAssisted);
  // }, [currentUser, userMembership, userPlan, canMessage, canAccessAIKundli, isPremiumAssisted]);

  useEffect(() => {
    fetchUser();
    fetchUserMembership();
    fetchLikes();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/api/profile");
      console.log("Fetched user data:", res.data);
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const fetchUserMembership = async () => {
    try {
      const res = await API.get("/api/user/membership");
      console.log("Fetched membership data:", res.data);
      setUserMembership(res.data);
    } catch (err) {
      console.error("Error fetching membership:", err);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await API.get("/api/me/likes");
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data
        ? res.data.data
        : [];
      setLikes(list);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const startConversation = async (userId) => {
    try {
      const res = await API.post(`/api/conversations/${userId}`);
      navigate(`/messages/${res.data.id}`);
    } catch (error) {
      console.error("Error starting conversation:", error);
      alert("Unable to start conversation");
    }
  };

  const analyzeCompatibility = (profile, user) => {
    if (!currentUser) {
      alert("Please complete your own profile first!");
      return;
    }
    
    const targetUserData = {
      ...profile,
      name: user?.name || "Unknown",
      dob: profile?.dob || user?.dob
    };
    
    toggleCompatibility(profile.id, aiResponses, setAiResponses, currentUser, targetUserData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '01-01-2000';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generateDetailedKundli = async (profile) => {
    if (!currentUser?.dob) {
      alert('Please complete your profile with birth date first!');
      return;
    }

    setKundliModal(prev => ({ ...prev, loading: true }));

    try {
      const userBirthData = {
        date: formatDate(currentUser.dob)
      };

      const targetBirthData = {
        date: formatDate(profile.dob)
      };

      const userKundli = await AstroAPI.generateKundli(userBirthData);
      const targetKundli = await AstroAPI.generateKundli(targetBirthData);
      const matchingData = AstroAPI.calculateAshtakoota(userKundli, targetKundli);

      setKundliModal({
        isOpen: true,
        userKundli,
        targetKundli,
        matchingData,
        loading: false
      });

    } catch (error) {
      console.error('Kundli generation failed:', error);
      alert('Failed to generate kundli analysis. Please try again.');
      setKundliModal(prev => ({ ...prev, loading: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-rose-700 font-semibold">Loading your likes...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-8">Profiles You Liked</h1>

      {/* Temporary debug info - remove after testing
      {userMembership && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-sm">
          <div><strong>DEBUG INFO (Remove in production):</strong></div>
          <div>Plan: <strong>{userPlan || 'free'}</strong></div>
          <div>Can Message: {canMessage ? '✅' : '❌'}</div>
          <div>Can Access AI Kundli: {canAccessAIKundli ? '✅' : '❌'}</div>
          <div>Is Premium Assisted: {isPremiumAssisted ? '✅' : '❌'}</div>
        </div>
      )} */}

      {likes.length === 0 ? (
        <div className="text-center text-rose-400 py-12">
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-xl font-medium">You haven't liked any profiles yet</p>
          <p className="mt-2 text-gray-600">
            Start browsing matches to find someone you like!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likes.map((like, idx) => {
            const profile = like.profile || {};
            const user = like.user || profile.user || {};
            const avatar = profile.profile_photo ? imgUrl(profile.profile_photo) : null;

            return (
              <div
                key={profile.id || like.profile_id || like.id || idx}
                className="bg-white border border-rose-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-rose-100 border border-rose-300 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={user.name || "Profile photo"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-3xl text-rose-500">👤</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-rose-800">
                    {user.name || "Unknown"}
                  </h3>
                  <p className="text-gray-600">
                    {profile.age ? `${profile.age} yrs` : ""}
                    {profile.age && profile.city ? " • " : ""}
                    {profile.city || ""}
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Message Button - Only show for Essential+ plans */}
                  {canMessage && (
                    <button
                      onClick={() => startConversation(user.id || profile.user_id)}
                      className="w-full bg-rose-700 text-white py-2 px-4 rounded-lg hover:bg-rose-800 transition-colors"
                    >
                      Send Message
                    </button>
                  )}
                  
                  {/* AI Kundli Button - Only show for Popular+ plans */}
                  {canAccessAIKundli && (
                    <button
                      onClick={() => generateDetailedKundli(profile)} 
                      disabled={kundliModal.loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                    >
                      {kundliModal.loading ? '🔄 Analyzing...' : '🤖 AI Kundli Match'}
                    </button>
                  )}

                  {/* Quick Compatibility Button - Only show for Premium Assisted */}
                  {isPremiumAssisted && (
                    <button
                      onClick={() => analyzeCompatibility(profile, user)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      🔮 Quick Compatibility
                    </button>
                  )}
                  
                  {/* View Profile Button - Always visible for all plans that can view profiles */}
                  <button
                    onClick={() => navigate(`/profile/${profile.id}`)}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    View Profile
                  </button>
                </div>

                {/* AI Response Display - Only show for Premium Assisted users */}
                {isPremiumAssisted && aiResponses[profile.id] && (
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 text-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-purple-700">🤖 Quick Compatibility</h4>
                      <button 
                        onClick={() => analyzeCompatibility(profile, user)}
                        className="text-gray-500 hover:text-gray-700 text-lg"
                      >
                        ×
                      </button>
                    </div>
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {typeof aiResponses[profile.id] === 'string' 
                        ? aiResponses[profile.id] 
                        : aiResponses[profile.id].text
                      }
                    </div>
                    {aiResponses[profile.id] && aiResponses[profile.id].score > 0 && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Zodiac Match:</span>
                          <span className="font-semibold text-purple-600">
                            {aiResponses[profile.id].zodiac1} + {aiResponses[profile.id].zodiac2}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Kundli Modal */}
      <KundliModal
        isOpen={kundliModal.isOpen}
        onClose={() => setKundliModal(prev => ({ ...prev, isOpen: false }))}
        userKundli={kundliModal.userKundli}
        targetKundli={kundliModal.targetKundli}
        matchingData={kundliModal.matchingData}
      />
    </div>
  );
}