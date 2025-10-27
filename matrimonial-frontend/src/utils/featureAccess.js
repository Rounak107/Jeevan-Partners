// Utility function to check feature access based on user's plan
export const getUserFeatureAccess = (userPlan) => {
  const plan = userPlan?.toLowerCase() || 'free';
  
  const featureAccess = {
    'free': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': false,
      'likes': false, // ADD THIS - free users cannot like
    },
    'starter': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true, // ADD THIS - starter can like
    },
    'essential': {
      'messaging': true,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true,
    },
    'popular': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true,
    },
    'premium assisted': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': true,
      'view_profiles': true,
      'likes': true,
    }
  };
  
  return featureAccess[plan] || featureAccess.free;
};

// Check if user can access a specific feature
export const canAccessFeature = (userPlan, feature) => {
  const features = getUserFeatureAccess(userPlan);
  return features[feature] || false;
};

// Check if user can access a route/page
export const canAccessRoute = (userPlan, routeName) => {
  const features = getUserFeatureAccess(userPlan);
  
  const routeAccess = {
    '/messages': features.messaging,
    '/messages/*': features.messaging,
    '/likes': features.view_profiles, // Likes page requires view_profiles access
    '/kundli': features.ai_kundli,
    '/ai-companion': features.ai_companion,
  };
  
  return routeAccess[routeName] || true; // Default to true for unrestricted routes
};