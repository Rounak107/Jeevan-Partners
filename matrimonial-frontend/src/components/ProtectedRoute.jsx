import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { canAccessRoute } from '../utils/featureAccess';

const ProtectedRoute = ({ children, userPlan }) => {
  const location = useLocation();
  
  // Get current route path
  const currentRoute = location.pathname;
  
  // Check if user has access to this route
  const hasAccess = canAccessRoute(userPlan, currentRoute);

  if (!hasAccess) {
    // Show alert and redirect to home
    const planName = userPlan || 'Free';
    alert(`🔒 This feature is not available in your ${planName} plan. Please upgrade to access this page.`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;