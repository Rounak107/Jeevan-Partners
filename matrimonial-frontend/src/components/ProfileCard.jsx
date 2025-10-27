import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  UserIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolidIcon 
} from '@heroicons/react/24/solid';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { getUserFeatureAccess } from '../utils/featureAccess';

export default function ProfileCard({ profile, onMessageClick, onLike, initialLiked = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get('/api/user');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  const features = getUserFeatureAccess(currentUser?.membership_plan);

  const getProfileId = () => {
    return profile.id;
  };

  const getUserId = () => {
    return profile.user_id || profile.user?.id;
  };

  const allImages = [
    profile.profile_photo,
    ...(profile.photos || [])
  ].filter(Boolean);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await API.get('/api/me/likes');
        const likedProfiles = response.data.data || response.data || [];
        const userId = getUserId();
        const isProfileLiked = likedProfiles.some(
          likedProfile => likedProfile.user_id === userId || 
                         (likedProfile.user && likedProfile.user.id === userId)
        );
        setIsLiked(isProfileLiked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkIfLiked();
  }, [profile]);

  const navigateToProfile = () => {
    if (!features.view_profiles) {
      alert('🔒 Viewing profiles is not available in your current plan. Please upgrade to Starter plan or higher.');
      return;
    }
    navigate(`/profile/${getProfileId()}`);
  };

  const handleLike = async () => {
    // ADD FEATURE CHECK FOR LIKES - Only Free plan cannot like
    if (!features.likes) {
        alert('🔒 Liking profiles is not available in your Free plan. Please upgrade to Starter plan or higher to like profiles.');
        return;
    }
    
    if (loading) return;
    
    setLoading(true);
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID not found');
        }

        if (!isLiked) {
            await API.post(`/api/likes/${userId}`);
            setIsLiked(true);
            if (onLike) onLike(profile);
        } else {
            await API.delete(`/api/likes/${userId}`);
            setIsLiked(false);
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        if (error.response?.status === 403) {
            alert('🔒 This feature is not available in your current plan. Please upgrade to like profiles.');
        } else if (error.response) {
            alert(`Failed to like profile: ${error.response.data.message || 'Server error'}`);
        } else {
            alert('Failed to like profile. Please check your connection.');
        }
    } finally {
        setLoading(false);
    }
};

  const handleMessageClick = (userId) => {
    if (!features.messaging) {
      alert('🔒 Messaging is not available in your current plan. Please upgrade to Essential plan or higher.');
      return;
    }
    onMessageClick(userId);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const BASE_URL =
    import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api", "")
      : "https://couplemarriage.com";

  const getImageUrl = (imagePath) =>
    `${BASE_URL}/storage/${String(imagePath || "")
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")}`;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative h-72 bg-gray-700 overflow-hidden">
        {allImages.length > 0 ? (
          <>
            <img
              src={getImageUrl(allImages[currentImageIndex])}
              alt={profile.user?.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Image Indicator Dots */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {allImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-6xl">👤</div>
          </div>
        )}
        
        {/* Like Button - UPDATED WITH FEATURE CHECK */}
        <button
    onClick={features.likes ? handleLike : () => alert('🔒 Upgrade to Starter plan to like profiles')}
    disabled={loading || !features.likes}
    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
        features.likes 
            ? 'bg-black/50 hover:bg-black/70 cursor-pointer' 
            : 'bg-gray-500 cursor-not-allowed'
    }`}
    title={!features.likes ? 'Upgrade to Starter plan to like profiles' : ''}
>
    {isLiked ? (
        <HeartSolidIcon className="w-6 h-6 text-red-500" />
    ) : (
        <HeartIcon className={`w-6 h-6 ${features.likes ? 'text-white' : 'text-gray-300'}`} />
    )}
</button>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white truncate">
              {profile.user?.name}
            </h3>
            <p className="text-gray-400">
              {profile.age} years • {profile.city}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {profile.occupation && (
            <p className="text-gray-300 text-sm">
              💼 {profile.occupation}
            </p>
          )}
          {profile.education && (
            <p className="text-gray-300 text-sm">
              🎓 {profile.education}
            </p>
          )}
          {profile.about && (
            <p className="text-gray-300 text-sm line-clamp-2">
              {profile.about}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {/* Message Button */}
          {features.messaging ? (
            <button
              onClick={() => handleMessageClick(getUserId())}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>Message</span>
            </button>
          ) : (
            <button
              onClick={() => alert('🔒 Upgrade to Essential plan to send messages')}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors cursor-not-allowed"
              title="Upgrade to Essential plan to send messages"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>Message</span>
            </button>
          )}
          
          {/* Profile Button */}
          {features.view_profiles ? (
            <button
              onClick={navigateToProfile}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>
          ) : (
            <button
              onClick={() => alert('🔒 Upgrade to Starter plan to view profiles')}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors cursor-not-allowed"
              title="Upgrade to Starter plan to view profiles"
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>
          )}
        </div>

        {/* Upgrade Prompts */}
        {!features.likes && (
          <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-600 rounded text-yellow-200 text-xs text-center">
            🔒 Upgrade to <strong>Starter</strong> plan to like profiles
          </div>
        )}
        {!features.messaging && (
          <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-600 rounded text-yellow-200 text-xs text-center">
            🔒 Upgrade to <strong>Essential</strong> plan for messaging
          </div>
        )}
        {!features.view_profiles && (
          <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-600 rounded text-yellow-200 text-xs text-center">
            🔒 Upgrade to <strong>Starter</strong> plan to view full profiles
          </div>
        )}
      </div>
    </div>
  );
}