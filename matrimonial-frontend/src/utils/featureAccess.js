// Utility function to check feature access based on user's plan
export const getUserFeatureAccess = (userPlan) => {
  const plan = userPlan?.toLowerCase() || 'free';
  
  const featureAccess = {
    'free': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': false,
    },
    'starter': {
      'messaging': false,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
    },
    'essential': {
      'messaging': true,
      'ai_kundli': false,
      'ai_companion': false,
      'view_profiles': true,
    },
    'popular': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': false,
      'view_profiles': true,
    },
    'premium assisted': {
      'messaging': true,
      'ai_kundli': true,
      'ai_companion': true,
      'view_profiles': true,
    }
  };
  
  return featureAccess[plan] || featureAccess.free;
};

// Check if user can access a specific feature
export const canAccessFeature = (userPlan, feature) => {
  const features = getUserFeatureAccess(userPlan);
  return features[feature] || false;
};