import React, { useState, useEffect } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ profile, onMessageClick, onLike, initialLiked = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get the user ID consistently from different profile structures
  const getUserId = () => {
    return profile.user_id || profile.user?.id || profile.id;
  };

  // Get all images (profile photo + additional photos)
  const allImages = [
    profile.profile_photo,
    ...(profile.photos || [])
  ].filter(Boolean);

  // Check if profile is already liked when component mounts
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await API.get('/api/me/likes');
        const likedProfiles = response.data.data || response.data || [];
        const userId = getUserId();
        const isProfileLiked = likedProfiles.some(
          likedProfile => likedProfile.user_id === userId || 
                         likedProfile.id === userId ||
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
    navigate(`/profile/${getUserId()}`);
  };

  const handleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('User ID not found');
      }

      if (!isLiked) {
        // FIXED: Remove /api prefix since baseURL already includes it
        await API.post(`/api/likes/${userId}`);
        setIsLiked(true);
        if (onLike) onLike(profile);
      } else {
        // FIXED: Remove /api prefix since baseURL already includes it
        await API.delete(`/api/likes/${userId}`);
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Show more detailed error message
      if (error.response) {
        alert(`Failed to like profile: ${error.response.data.message || 'Server error'}`);
      } else {
        alert('Failed to like profile. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getImageUrl = (imagePath) => {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  return (
    <div className="bg-grey-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative h-72 bg-rose-700 overflow-hidden">
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
        
        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={loading}
          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          {isLiked ? (
            <HeartSolidIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-white" />
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
            <p className="text-dark-400">
              {profile.age} years • {profile.city}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {profile.occupation && (
            <p className="text-dark-300 text-sm">
              💼 {profile.occupation}
            </p>
          )}
          {profile.education && (
            <p className="text-dark-300 text-sm">
              🎓 {profile.education}
            </p>
          )}
          {profile.about && (
            <p className="text-dark-300 text-sm line-clamp-2">
              {profile.about}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onMessageClick(getUserId())}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>Message</span>
          </button>
          <button
            onClick={navigateToProfile}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors"
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}