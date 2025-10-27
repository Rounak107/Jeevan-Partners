import React, { useState, useEffect } from 'react';
import API from '../api';
import { getUserFeatureAccess } from '../utils/featureAccess';
import KundliModal from '../components/KundliModal';

const AIKundliPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get('/api/user');
        setCurrentUser(response.data);
        setFeatures(getUserFeatureAccess(response.data.membership_plan));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateKundli = async () => {
    if (!features?.ai_kundli) {
      alert('🔒 AI Kundli is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/api/generate-kundli', formData);
      setKundliData(response.data);
      setShowKundliModal(true);
    } catch (error) {
      console.error('Error generating kundli:', error);
      alert('Failed to generate kundli. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickCompatibility = async () => {
    if (!features?.quick_compatibility) {
      alert('🔒 Quick Compatibility is not available in your current plan. Please upgrade to Popular plan or higher.');
      return;
    }
    
    // Implement quick compatibility logic here
    alert('Quick compatibility feature would be implemented here');
  };

  if (!currentUser) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">🔮 AI Kundli & Compatibility</h1>
          <p className="text-lg text-gray-600">
            Discover your astrological compatibility and get AI-powered insights
          </p>
        </div>

        {/* Feature Access Notice */}
        {!features?.ai_kundli && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 text-center">
            <div className="text-yellow-800">
              <h3 className="text-xl font-bold mb-2">🔒 Upgrade Required</h3>
              <p className="mb-4">
                AI Kundli features are available in <strong>Popular</strong> and <strong>Premium</strong> plans.
              </p>
              <button 
                onClick={() => window.location.href = '/membership'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kundli Generation Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Your Kundli</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Time (24-hour format)
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="e.g., 28.6139"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="e.g., 77.2090"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={generateKundli}
                  disabled={loading || !features?.ai_kundli}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    features?.ai_kundli
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Generating...' : 'Generate Kundli'}
                </button>

                <button
                  onClick={quickCompatibility}
                  disabled={!features?.quick_compatibility}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    features?.quick_compatibility
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Quick Compatibility
                </button>
              </div>
            </div>
          </div>

          {/* Features Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Features</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                features?.ai_kundli ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className="font-semibold text-gray-800 mb-2">AI Kundli Generation</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Generate detailed birth charts with planetary positions and aspects.
                </p>
                <span className={`text-xs font-medium ${
                  features?.ai_kundli ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {features?.ai_kundli ? '✅ Available' : '🔒 Popular+ Plan'}
                </span>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                features?.quick_compatibility ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className="font-semibold text-gray-800 mb-2">Quick Compatibility</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Instant compatibility analysis between two birth charts.
                </p>
                <span className={`text-xs font-medium ${
                  features?.quick_compatibility ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {features?.quick_compatibility ? '✅ Available' : '🔒 Popular+ Plan'}
                </span>
              </div>

              <div className="p-4 rounded-lg border-2 border-purple-200 bg-purple-50">
                <h3 className="font-semibold text-gray-800 mb-2">Your Current Plan</h3>
                <p className="text-lg font-bold text-purple-600 capitalize">
                  {currentUser.membership_plan || 'Free'}
                </p>
                <button 
                  onClick={() => window.location.href = '/membership'}
                  className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  View Plans & Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">1</div>
              <p className="font-semibold text-gray-800">Enter Birth Details</p>
              <p className="text-gray-600 mt-1">Provide accurate birth date, time, and location</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">2</div>
              <p className="font-semibold text-gray-800">Generate Analysis</p>
              <p className="text-gray-600 mt-1">Get AI-powered astrological insights</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">3</div>
              <p className="font-semibold text-gray-800">Review Results</p>
              <p className="text-gray-600 mt-1">Understand compatibility and get recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kundli Modal */}
      <KundliModal
        isOpen={showKundliModal}
        onClose={() => setShowKundliModal(false)}
        userKundli={kundliData}
        matchingData={kundliData?.compatibility}
      />
    </div>
  );
};

export default AIKundliPage;