import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { generateCompatibilitySummary } from "../utils/aiCompatibility";

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
      setLikes(res.data || []);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCompatibility = (profile) => {
    if (!currentUser) return alert("Please complete your own profile first!");
    const summary = generateCompatibilitySummary(currentUser, profile);
    setAiResponses((prev) => ({ ...prev, [profile.id]: summary }));
  };

  if (loading) return <div className="text-center text-rose-700">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-rose-800 mb-8">Profiles You Liked</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likes.map((like) => {
          const profile = like.profile || {};
          const user = like.user || {};
          return (
            <div
              key={profile.id}
              className="bg-white border border-rose-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-rose-800">
                  {user.name || "Unknown"}
                </h3>
                <p className="text-gray-600">
                  {profile.age ? `${profile.age} yrs` : ""} {profile.city ? `• ${profile.city}` : ""}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => analyzeCompatibility(profile)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  🔮 Check Compatibility
                </button>
                <button
                  onClick={() => navigate(`/profile/${profile.id}`)}
                  className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600"
                >
                  View Profile
                </button>
              </div>

              {aiResponses[profile.id] && (
                <div className="mt-4 bg-gray-100 p-3 rounded-lg text-gray-800 whitespace-pre-line border border-gray-300">
                  {aiResponses[profile.id]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
