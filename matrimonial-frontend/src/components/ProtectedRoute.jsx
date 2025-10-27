import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserFeatureAccess } from '../utils/featureAccess';

const ProtectedRoute = ({ children, userPlan }) => {
  const location = useLocation();
  const features = getUserFeatureAccess(userPlan);

  // Route access mapping
  const routeAccess = {
    '/messages': features.messaging,
    '/messages/*': features.messaging,
    '/likes': features.view_profiles, // Likes page requires view_profiles
    '/kundli': features.ai_kundli,
    '/ai-companion': features.ai_companion,
  };

  // Check if current route is protected
  const currentRoute = location.pathname;
  const hasAccess = routeAccess[currentRoute] || 
                   (currentRoute.startsWith('/messages/') && routeAccess['/messages/*']) || 
                   true; // Default to true for unrestricted routes

  if (!hasAccess) {
    // Redirect to home with message
    alert(`🔒 This feature is not available in your ${userPlan || 'Free'} plan. Please upgrade to access this page.`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;