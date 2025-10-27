// Utility function to check feature access based on user's plan
export const getUserFeatureAccess = (userPlan) => {
  const plan = userPlan?.toLowerCase() || 'free';
  
  const featureAccess = {
    'free': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': false,
      'likes': false,
      'quick_compatibility': false,
    },
    'starter': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true,
      'quick_compatibility': false,
    },
    'essential': {
      'messaging': true,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true,
      'quick_compatibility': false,
    },
    'popular': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': false,
      'view_profiles': true,
      'likes': true,
      'quick_compatibility': true,
    },
    'premium assisted': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': true,
      'view_profiles': true,
      'likes': true,
      'quick_compatibility': true,
    }
  };
  
  return featureAccess[plan] || featureAccess.free;
};

// Check if user can access a specific feature
export const canAccessFeature = (userPlan, feature) => {
  const features = getUserFeatureAccess(userPlan);
  return features[feature] || false;
};

// Alias for canAccessFeature - this is what you're importing as hasFeatureAccess
export const hasFeatureAccess = canAccessFeature;

// Feature constants - this is what you're importing as FEATURES
export const FEATURES = {
  MESSAGING: 'messaging',
  AI_KUNDLI: 'ai_kundli', 
  AI_COMPANION: 'ai_companion',
  VIEW_PROFILES: 'view_profiles',
  LIKES: 'likes',
  QUICK_COMPATIBILITY: 'quick_compatibility'
};

// Check if user can access a route/page
export const canAccessRoute = (userPlan, routeName) => {
  const features = getUserFeatureAccess(userPlan);
  
  const routeAccess = {
    '/messages': features.messaging,
    '/messages/*': features.messaging,
    '/likes': features.view_profiles,
    '/kundli': features.ai_kundli,
    '/ai-companion': features.ai_companion,
  };
  
  return routeAccess[routeName] !== undefined ? routeAccess[routeName] : true;
};