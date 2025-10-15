import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { generateCompatibilitySummary } from "../utils/aiCompatibility";

const BASE_URL =
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "https://couplemarriage.com";

// Build the proper storage URL for live site
const STORAGE_BASE = `${BASE_URL}/storage`;
const normalizePath = (p) =>
  String(p || "").replace(/\\/g, "/").replace(/^\/+/, "");
const imgUrl = (p) => `${STORAGE_BASE}/${normalizePath(p)}`;

export default function LikesPage() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiResponses, setAiResponses] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchLikes();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/api/profile");
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
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
    if (!currentUser) return alert("Please complete your own profile first!");
    
    // Combine profile and user data for compatibility analysis
    const targetUserData = {
      ...profile,
      name: user?.name || "Unknown",
      dob: profile?.dob || user?.dob
    };
    
    const summary = generateCompatibilitySummary(currentUser, targetUserData);
    setAiResponses((prev) => ({ ...prev, [profile.id]: summary }));
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
                  <button
                    onClick={() => startConversation(user.id || profile.user_id)}
                    className="w-full bg-rose-700 text-white py-2 px-4 rounded-lg hover:bg-rose-800 transition-colors"
                  >
                    Send Message
                  </button>
                  
                  <button
                    onClick={() => analyzeCompatibility(profile, user)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    🔮 Check Compatibility
                  </button>
                  
                  <button
                    onClick={() => navigate(`/profile/${profile.id}`)}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    View Profile
                  </button>
                </div>

                {aiResponses[profile.id] && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg text-gray-800 whitespace-pre-line border border-gray-300 text-sm">
                    {aiResponses[profile.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}