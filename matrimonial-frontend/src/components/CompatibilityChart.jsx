// src/components/CompatibilityChart.jsx
import React from 'react';

const CompatibilityChart = ({ title, data }) => {
  const defaultData = {
    varna: { score: 3, max: 4 },
    vashya: { score: 2, max: 4 },
    tara: { score: 3, max: 5 },
    yoni: { score: 4, max: 6 }
  };

  const chartData = data || defaultData;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <div className="space-y-3">
        {Object.entries(chartData).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize text-gray-600">{key}</span>
              <span className="font-medium">
                {value.score}/{value.max}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(value.score / value.max) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompatibilityChart;