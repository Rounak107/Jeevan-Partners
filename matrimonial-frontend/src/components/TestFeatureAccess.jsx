import React, { useState, useEffect } from 'react';
import API from '../api';
import { getUserFeatureAccess } from '../utils/featureAccess';

const TestFeatureAccess = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get('/api/user');
        setCurrentUser(response.data);
        setFeatures(getUserFeatureAccess(response.data.membership_plan));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Feature Access Test</h2>
      <div className="mb-4">
        <p><strong>User:</strong> {currentUser.name}</p>
        <p><strong>Plan:</strong> {currentUser.membership_plan || 'Free'}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {features && Object.entries(features).map(([feature, hasAccess]) => (
          <div key={feature} className={`p-3 rounded ${hasAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <strong>{feature}:</strong> {hasAccess ? '✅ Access' : '❌ No Access'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFeatureAccess;