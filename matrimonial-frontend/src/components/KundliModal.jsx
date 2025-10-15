// src/components/KundliModal.jsx
import React from 'react';
import CompatibilityChart from './CompatibilityChart';

const KundliModal = ({ isOpen, onClose, userKundli, targetKundli, matchingData }) => {
  if (!isOpen) return null;

  // AI Analysis based on compatibility score
  const getAIAnalysis = () => {
    const score = matchingData?.percentage || 0;
    
    if (score >= 80) {
      return {
        level: "EXCELLENT",
        title: "🌟 Highly Compatible Match",
        message: "Based on astrological analysis, this partnership shows strong potential for long-term harmony, mutual understanding, and emotional connection.",
        recommendation: "This appears to be a very promising match. Consider moving forward with family introductions and deeper relationship building.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    } else if (score >= 70) {
      return {
        level: "GOOD", 
        title: "💫 Good Compatibility",
        message: "This match shows solid foundation with good planetary alignment. There's potential for growth with mutual effort and understanding.",
        recommendation: "Worth exploring further. Focus on communication and shared values to strengthen the bond.",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      };
    } else if (score >= 60) {
      return {
        level: "MODERATE",
        title: "⚠️ Moderate Compatibility",
        message: "The astrological analysis indicates some areas of alignment but also highlights differences that need attention. Success depends on willingness to adapt.",
        recommendation: "Proceed with awareness. Consider discussing important life values and expectations before making commitments.",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200"
      };
    } else if (score >= 50) {
      return {
        level: "CAUTION",
        title: "🔔 Needs Consideration",
        message: "The compatibility analysis reveals significant differences that may require extra effort and understanding to overcome.",
        recommendation: "Take time to know each other better. Consider seeking family guidance and exploring other options simultaneously.",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      };
    } else {
      return {
        level: "LOW",
        title: "❌ Low Compatibility",
        message: "The astrological indicators suggest fundamental differences that might create challenges in long-term harmony.",
        recommendation: "It may be wise to explore other matches. However, if you feel a strong personal connection, proceed with careful consideration and family guidance.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    }
  };

  const aiAnalysis = getAIAnalysis();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-rose-800">🔮 Detailed Kundli Matching Report</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Overall Compatibility Score */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl mb-6 text-center">
            <h3 className="text-3xl font-bold mb-2">
              {matchingData?.percentage || 0}% Match
            </h3>
            <p className="text-purple-100 text-lg">
              {matchingData?.percentage >= 75 ? 'Excellent Match!' : 
               matchingData?.percentage >= 60 ? 'Good Compatibility' : 
               'Needs Consideration'}
            </p>
          </div>

          {/* AI Analysis Section */}
          <div className={`${aiAnalysis.bgColor} ${aiAnalysis.borderColor} border-2 rounded-xl p-6 mb-6`}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${aiAnalysis.color} mb-2`}>
                  {aiAnalysis.title}
                </h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {aiAnalysis.message}
                </p>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">🤖 AI Recommendation:</h4>
                  <p className="text-gray-700">{aiAnalysis.recommendation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts & Planetary Positions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CompatibilityChart 
              title="Ashtakoota Matching"
              data={matchingData?.aspects}
            />
            
            {/* Fixed Planetary Positions */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">🪐 Planetary Positions</h3>
              <div className="space-y-3">
                {userKundli?.planets && Object.entries(userKundli.planets).map(([planet, data]) => (
                  <div key={planet} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="capitalize font-medium text-gray-700">
                      {planet === 'sun' ? '☀️ Sun' : 
                       planet === 'moon' ? '🌙 Moon' : 
                       planet === 'mars' ? '♂️ Mars' : 
                       planet === 'mercury' ? '☿ Mercury' : 
                       planet === 'jupiter' ? '♃ Jupiter' : 
                       planet === 'venus' ? '♀️ Venus' : 
                       planet === 'saturn' ? '♄ Saturn' : planet}
                    </span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">{data.sign}</span>
                      <span className="text-xs text-gray-500 block">{data.degree}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-4">
            {/* Basic Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-700 mb-3">📊 Basic Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Your Zodiac:</span>
                    <span className="font-semibold text-purple-600">{userKundli?.zodiac || 'Not available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Your Nakshatra:</span>
                    <span className="text-gray-700">{userKundli?.nakshatra || 'Not available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Moon Sign:</span>
                    <span className="text-gray-700">{userKundli?.moon_sign || 'Not available'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Partner Zodiac:</span>
                    <span className="font-semibold text-purple-600">{targetKundli?.zodiac || 'Not available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Partner Nakshatra:</span>
                    <span className="text-gray-700">{targetKundli?.nakshatra || 'Not available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Moon Sign:</span>
                    <span className="text-gray-700">{targetKundli?.moon_sign || 'Not available'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dosha Analysis */}
            {matchingData?.doshas && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rose-700 mb-3">🔍 Dosha Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchingData.doshas.map((dosha, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      dosha.present ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{dosha.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          dosha.present ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {dosha.present ? 'Present' : 'Absent'}
                        </span>
                      </div>
                      {dosha.description && (
                        <p className="text-xs text-gray-600 mt-1">{dosha.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-700 mb-2">💡 Additional Insights</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• <strong>Zodiac Compatibility:</strong> {userKundli?.zodiac} and {targetKundli?.zodiac} {matchingData?.percentage >= 70 ? 'have good natural harmony' : matchingData?.percentage >= 60 ? 'can work with understanding' : 'may require extra effort'}</p>
                <p>• <strong>Communication:</strong> Focus on open dialogue about life goals and expectations</p>
                <p>• <strong>Next Steps:</strong> {matchingData?.percentage >= 70 ? 'Consider family meetings and deeper commitment' : 'Take time to know each other better before decisions'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundliModal;