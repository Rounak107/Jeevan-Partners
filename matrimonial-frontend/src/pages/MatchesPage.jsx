import React, { useEffect, useState } from "react";
import API from "../api";
import ProfileCard from "../components/ProfileCard";
import FilterPanel from "../components/FilterPanel";
import CreateProfileModal from "../components/CreateProfileModal";
import { useNavigate } from "react-router-dom";

export default function MatchesPage() {
  const [profiles, setProfiles] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    city: "",
    min_age: "",
    max_age: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const navigate = useNavigate();

  const checkProfile = async () => {
    try {
      const response = await API.get("/api/profile");
      if (response.data) {
        setHasProfile(true);
        setMyProfile(response.data);
      } else {
        setHasProfile(false);
      }
    } catch (error) {
      console.error("Profile check error:", error);
      setHasProfile(false);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const response = await API.get("/api/me/likes");
      const likes = response.data?.data || response.data || [];
      setUserLikes(likes);
    } catch (error) {
      console.error("Error fetching user likes:", error);
    }
  };

  const fetchMatches = async () => {
    if (!hasProfile) return;
    setLoading(true);
    try {
      const res = await API.get("/api/recommendations", { params: filters });
      const list = res.data?.data || res.data || [];
      const filtered = myProfile
        ? list.filter((p) => p.user_id !== myProfile.user_id)
        : list;
      setProfiles(filtered);
    } catch (err) {
      console.error("Error fetching matches:", err);
      if (err.response?.status === 400) {
        setHasProfile(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  useEffect(() => {
    if (hasProfile) {
      fetchMatches();
      fetchUserLikes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProfile, filters]);

  const isProfileLiked = (profile) => {
    const profileUserId = profile.user_id || profile.user?.id || profile.id;
    return userLikes.some((like) => {
      const likedProfile = like.profile || like;
      const likedUserId =
        likedProfile.user_id || likedProfile.user?.id || likedProfile.id;
      return likedUserId === profileUserId;
    });
  };

  const startConversation = async (userId) => {
    try {
      const res = await API.post(`/api/conversations/${userId}`);
      navigate(`/messages/${res.data.id}`);
    } catch (err) {
      console.error("Error starting conversation:", err);
      alert("Unable to start conversation");
    }
  };

  const handleProfileLike = (profile) => {
    const profileUserId = profile.user_id || profile.user?.id || profile.id;
    if (isProfileLiked(profile)) {
      setUserLikes((prevLikes) =>
        prevLikes.filter((like) => {
          const likedUserId = like.user_id || like.user?.id || like.id;
          return likedUserId !== profileUserId;
        })
      );
    } else {
      setUserLikes((prevLikes) => [...prevLikes, profile]);
    }
  };

  const handleProfileCreated = (profileData) => {
    setHasProfile(true);
    setMyProfile(profileData);
    setShowCreateProfile(false);
  };

  if (!hasProfile) {
    return (
      <div className="container mx-auto px-4 py-8 bg-rose-50 min-h-screen">
        <div className="max-w-2xl mx-auto bg-rose-100 p-8 rounded-lg text-center shadow-lg">
          <h2 className="text-2xl font-bold text-rose-800 mb-4">
            Create Your Profile
          </h2>
          <p className="text-gray-700 mb-6">
            You need to create a profile before you can view matches and connect
            with others.
          </p>
          <button
            onClick={() => setShowCreateProfile(true)}
            className="bg-rose-700 text-white px-6 py-3 rounded-lg hover:bg-rose-800"
          >
            Create Profile
          </button>
        </div>

        <CreateProfileModal
          isOpen={showCreateProfile}
          onClose={() => setShowCreateProfile(false)}
          onProfileCreated={handleProfileCreated}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-rose-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-800">Find Your Match</h1>

        <button
          onClick={() => setShowPreview((v) => !v)}
          className="bg-rose-700 text-white px-4 py-2 rounded hover:bg-rose-800"
        >
          {showPreview ? "Hide My Profile" : "Preview My Profile"}
        </button>
      </div>

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onSearch={fetchMatches}
      />

      {loading ? (
        <div className="text-center py-10 text-rose-800">
          Loading matches...
        </div>
      ) : (
        <>
          {showPreview && myProfile && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-rose-700 mb-4">
                Your Profile Preview
              </h2>
              <div className="max-w-md mx-auto">
                <ProfileCard
                  profile={myProfile}
                  onMessageClick={() => {}}
                  onLike={handleProfileLike}
                  initialLiked={isProfileLiked(myProfile)}
                  isPreview={true}
                />
                <p className="text-gray-600 text-center mt-2">
                  This is how your profile appears to others. Your own profile
                  won't appear in actual matches.
                </p>
              </div>
            </div>
          )}

          {profiles.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              No matches found with your current filters. Try adjusting your
              search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((p) => (
                <ProfileCard
                  key={p.id}
                  profile={p}
                  onMessageClick={startConversation}
                  onLike={handleProfileLike}
                  initialLiked={isProfileLiked(p)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
