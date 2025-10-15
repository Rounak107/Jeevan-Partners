// src/components/KundliModal.jsx
import React from 'react';
import CompatibilityChart from './CompatibilityChart';

const KundliModal = ({ isOpen, onClose, userKundli, targetKundli, matchingData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-rose-800">🔮 Detailed Kundli Matching</h2>
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
            <p className="text-purple-100">
              {matchingData?.percentage >= 75 ? 'Excellent Match!' : 
               matchingData?.percentage >= 60 ? 'Good Compatibility' : 
               'Needs Consideration'}
            </p>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CompatibilityChart 
              title="Ashtakoota Matching"
              data={matchingData?.aspects}
            />
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">Planetary Positions</h3>
              <div className="space-y-2 text-sm">
                {userKundli?.planets && Object.entries(userKundli.planets).map(([planet, data]) => (
                  <div key={planet} className="flex justify-between">
                    <span className="capitalize">{planet}:</span>
                    <span className="font-medium">{data.sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-700 mb-2">Basic Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Your Zodiac:</span> {userKundli?.zodiac}
                </div>
                <div>
                  <span className="font-medium">Partner Zodiac:</span> {targetKundli?.zodiac}
                </div>
                <div>
                  <span className="font-medium">Your Nakshatra:</span> {userKundli?.nakshatra}
                </div>
                <div>
                  <span className="font-medium">Partner Nakshatra:</span> {targetKundli?.nakshatra}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-700 mb-2">Manglik Status</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">You:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${userKundli?.manglik ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {userKundli?.manglik ? 'Manglik' : 'Non-Manglik'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Partner:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${targetKundli?.manglik ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {targetKundli?.manglik ? 'Manglik' : 'Non-Manglik'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dosha Analysis */}
            {matchingData?.doshas && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rose-700 mb-2">Dosha Analysis</h4>
                <div className="space-y-2 text-sm">
                  {matchingData.doshas.map((dosha, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{dosha.name}</span>
                      <span className={`px-2 py-1 rounded ${
                        dosha.present ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {dosha.present ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors">
              Save Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundliModal;