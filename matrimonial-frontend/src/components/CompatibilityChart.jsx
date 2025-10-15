import React from 'react';

const CompatibilityChart = ({ title, data, overallScore }) => {
  // Default data with all 8 Ashtakoota aspects
  const defaultData = {
    varna: { score: 3, max: 4, description: 'Spiritual compatibility & temperament' },
    vashya: { score: 2, max: 4, description: 'Dominance & control in relationship' },
    tara: { score: 3, max: 5, description: 'Birth star compatibility & destiny' },
    yoni: { score: 4, max: 6, description: 'Physical intimacy & sexual compatibility' },
    grahaMaitri: { score: 5, max: 7, description: 'Mental friendship & understanding' },
    gana: { score: 2, max: 3, description: 'Nature & temperament matching' },
    bhakoot: { score: 3, max: 4, description: 'Family welfare & prosperity' },
    nadi: { score: 4, max: 8, description: 'Health & genetic compatibility' }
  };

  const chartData = data || defaultData;

  // AI-powered aspect analysis
  const getAspectAnalysis = (aspectName, score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) return { 
      status: 'Excellent', 
      color: 'text-green-600',
      bgColor: 'bg-green-500',
      message: 'Strong alignment in this area'
    };
    if (percentage >= 60) return { 
      status: 'Good', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-500',
      message: 'Positive indicators present'
    };
    if (percentage >= 40) return { 
      status: 'Moderate', 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500',
      message: 'Average compatibility, needs attention'
    };
    return { 
      status: 'Needs Work', 
      color: 'text-red-600',
      bgColor: 'bg-red-500',
      message: 'Area requiring focus and understanding'
    };
  };

  // Calculate total compatibility score
  const calculateTotalScore = () => {
    if (!data) return 0;
    const totalScore = Object.values(data).reduce((sum, aspect) => sum + aspect.score, 0);
    const totalMax = Object.values(data).reduce((sum, aspect) => sum + aspect.max, 0);
    return Math.round((totalScore / totalMax) * 100);
  };

  const totalCompatibility = overallScore || calculateTotalScore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <div className="mt-2">
          <div className="text-2xl font-bold text-purple-600">{totalCompatibility}%</div>
          <div className="text-xs text-gray-500">Overall Match</div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(chartData).map(([key, value]) => {
          const percentage = (value.score / value.max) * 100;
          const analysis = getAspectAnalysis(key, value.score, value.max);
          
          return (
            <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              {/* Aspect Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="capitalize font-medium text-gray-700 text-sm">
                    {key === 'grahaMaitri' ? 'Graha Maitri' : 
                     key === 'bhakoot' ? 'Bhakoot' : 
                     key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-semibold ${analysis.color}`}>
                      {analysis.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {value.score}/{value.max} pts
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-700 ${analysis.bgColor}`}
                  style={{ 
                    width: `${percentage}%` 
                  }}
                ></div>
              </div>

              {/* AI Analysis & Description */}
              <div className="text-xs text-gray-600">
                <div className="font-medium mb-1">{analysis.message}</div>
                <div className="text-gray-500 italic">
                  {value.description || chartData[key]?.description || 'Aspect compatibility analysis'}
                </div>
              </div>

              {/* Compatibility Indicator */}
              {value.compatible !== undefined && (
                <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                  value.compatible 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {value.compatible ? '✅ Compatible' : '❌ Needs Attention'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall AI Assessment */}
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-semibold text-purple-700 text-sm mb-2">🤖 AI Assessment</h4>
        <div className="text-xs text-purple-600 space-y-1">
          {totalCompatibility >= 80 && (
            <>
              <div>• Excellent overall compatibility across all aspects</div>
              <div>• Strong foundation for long-term relationship</div>
              <div>• Minimal areas requiring adjustment</div>
            </>
          )}
          {totalCompatibility >= 60 && totalCompatibility < 80 && (
            <>
              <div>• Good compatibility with some strong areas</div>
              <div>• Few aspects need mutual understanding</div>
              <div>• Potential for successful partnership</div>
            </>
          )}
          {totalCompatibility >= 40 && totalCompatibility < 60 && (
            <>
              <div>• Moderate compatibility with mixed aspects</div>
              <div>• Several areas require attention and effort</div>
              <div>• Communication and compromise needed</div>
            </>
          )}
          {totalCompatibility < 40 && (
            <>
              <div>• Significant differences in key areas</div>
              <div>• Requires substantial effort and understanding</div>
              <div>• Consider professional guidance</div>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Excellent (80-100%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Good (60-79%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Moderate (40-59%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Needs Work (0-39%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityChart;