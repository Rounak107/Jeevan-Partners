// frontend/src/utils/aiCompatibility.js

// Enhanced zodiac calculation with better accuracy
export function getZodiacSign(day, month) {
  const zodiacDates = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];

  const zodiac = zodiacDates.find(zodiac => {
    if (zodiac.start[0] === 12 && month === 12 && day >= zodiac.start[1]) return true;
    if (zodiac.start[0] === 1 && month === 1 && day <= zodiac.end[1]) return true;
    if (month === zodiac.start[0] && day >= zodiac.start[1]) return true;
    if (month === zodiac.end[0] && day <= zodiac.end[1]) return true;
    return false;
  });

  return zodiac ? zodiac.sign : 'Aries';
}

// Enhanced compatibility mapping with levels
const compatibilityMap = {
  Aries: { 
    excellent: ['Leo', 'Sagittarius'], 
    good: ['Gemini', 'Aquarius'], 
    avoid: ['Cancer', 'Capricorn'] 
  },
  Taurus: { 
    excellent: ['Virgo', 'Capricorn'], 
    good: ['Cancer', 'Pisces'], 
    avoid: ['Leo', 'Aquarius'] 
  },
  Gemini: { 
    excellent: ['Libra', 'Aquarius'], 
    good: ['Aries', 'Leo'], 
    avoid: ['Virgo', 'Pisces'] 
  },
  Cancer: { 
    excellent: ['Scorpio', 'Pisces'], 
    good: ['Taurus', 'Virgo'], 
    avoid: ['Aries', 'Libra'] 
  },
  Leo: { 
    excellent: ['Sagittarius', 'Aries'], 
    good: ['Gemini', 'Libra'], 
    avoid: ['Taurus', 'Scorpio'] 
  },
  Virgo: { 
    excellent: ['Capricorn', 'Taurus'], 
    good: ['Cancer', 'Scorpio'], 
    avoid: ['Gemini', 'Sagittarius'] 
  },
  Libra: { 
    excellent: ['Aquarius', 'Gemini'], 
    good: ['Leo', 'Sagittarius'], 
    avoid: ['Cancer', 'Capricorn'] 
  },
  Scorpio: { 
    excellent: ['Pisces', 'Cancer'], 
    good: ['Virgo', 'Capricorn'], 
    avoid: ['Leo', 'Aquarius'] 
  },
  Sagittarius: { 
    excellent: ['Aries', 'Leo'], 
    good: ['Aquarius', 'Libra'], 
    avoid: ['Virgo', 'Pisces'] 
  },
  Capricorn: { 
    excellent: ['Taurus', 'Virgo'], 
    good: ['Pisces', 'Scorpio'], 
    avoid: ['Aries', 'Libra'] 
  },
  Aquarius: { 
    excellent: ['Gemini', 'Libra'], 
    good: ['Sagittarius', 'Aries'], 
    avoid: ['Taurus', 'Scorpio'] 
  },
  Pisces: { 
    excellent: ['Cancer', 'Scorpio'], 
    good: ['Capricorn', 'Taurus'], 
    avoid: ['Gemini', 'Sagittarius'] 
  }
};

// Get detailed compatibility analysis
function getCompatibilityAnalysis(zodiac1, zodiac2) {
  const compatData = compatibilityMap[zodiac1] || { excellent: [], good: [], avoid: [] };
  
  let score, level, description;
  
  if (compatData.excellent.includes(zodiac2)) {
    score = 85;
    level = "EXCELLENT";
    description = "Strong cosmic alignment and natural harmony";
  } else if (compatData.good.includes(zodiac2)) {
    score = 70;
    level = "GOOD";
    description = "Good potential with mutual understanding";
  } else if (compatData.avoid.includes(zodiac2)) {
    score = 45;
    level = "CHALLENGING";
    description = "Significant differences requiring extra effort";
  } else {
    score = 60;
    level = "MODERATE";
    description = "Average compatibility with room for growth";
  }

  // Same zodiac bonus
  if (zodiac1 === zodiac2) {
    score += 10;
    description += " - Enhanced by shared zodiac traits";
  }

  return { score: Math.min(score, 95), level, description };
}

// Generate comprehensive AI analysis
export function generateCompatibilitySummary(user1, user2) {
  if (!user1 || !user2 || !user1.dob || !user2.dob) {
    return {
      text: "❌ Insufficient birth details to analyze compatibility.\n\nPlease ensure both profiles have birth dates filled.",
      score: 0,
      zodiac1: 'Unknown',
      zodiac2: 'Unknown'
    };
  }

  try {
    const d1 = new Date(user1.dob);
    const d2 = new Date(user2.dob);

    // Validate dates
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return {
        text: "❌ Invalid birth date format.\n\nPlease check the date of birth in both profiles.",
        score: 0,
        zodiac1: 'Unknown',
        zodiac2: 'Unknown'
      };
    }

    const zodiac1 = getZodiacSign(d1.getDate(), d1.getMonth() + 1);
    const zodiac2 = getZodiacSign(d2.getDate(), d2.getMonth() + 1);
    
    const analysis = getCompatibilityAnalysis(zodiac1, zodiac2);

    const text = `
✨ **Quick Compatibility Analysis**
-----------------------------------

**👥 Couple Profile:**
${user1.name || 'User 1'} (${zodiac1}) 💞 ${user2.name || 'User 2'} (${zodiac2})

**❤️ Compatibility Score:** ${analysis.score}%
**📊 Compatibility Level:** ${analysis.level}

**🔮 AI Analysis:**
${analysis.description}

**💫 Key Insights:**
${getZodiacInsights(zodiac1, zodiac2)}

**🎯 Recommendations:**
${getRecommendations(analysis.score)}

**💡 Next Steps:**
${getNextSteps(analysis.score)}

*Note: This is a quick analysis. For detailed kundli matching, use the "AI Kundli Match" button.*
`;

    return {
      text: text.trim(),
      score: analysis.score,
      zodiac1,
      zodiac2,
      level: analysis.level
    };
  } catch (error) {
    console.error('Compatibility analysis error:', error);
    return {
      text: "❌ Error analyzing compatibility. Please try again or use the detailed kundli matching.",
      score: 0,
      zodiac1: 'Error',
      zodiac2: 'Error'
    };
  }
}

// Get zodiac-specific insights
function getZodiacInsights(zodiac1, zodiac2) {
  const insights = {
    'Aries-Aries': 'Two leaders can create dynamic energy but need to share power',
    'Aries-Taurus': 'Fire meets Earth - passion meets stability with understanding',
    'Aries-Gemini': 'Energetic and communicative, great mental connection',
    'Aries-Cancer': 'Fire and Water - emotional differences need balancing',
    'Aries-Leo': 'Powerful combination with strong mutual admiration',
    'Aries-Virgo': 'Action meets analysis - complementary with patience',
    'Aries-Libra': 'Balance between independence and partnership',
    'Aries-Scorpio': 'Intense and passionate, requires trust building',
    'Aries-Sagittarius': 'Adventurous pair with great energy compatibility',
    'Aries-Capricorn': 'Different approaches to life need compromise',
    'Aries-Aquarius': 'Innovative and independent, great friends and partners',
    'Aries-Pisces': 'Dreamer and doer - creative but needs practical balance',
    
    'Taurus-Taurus': 'Stable and reliable, values security and comfort',
    'Taurus-Gemini': 'Stability meets curiosity - grounding influence needed',
    'Taurus-Cancer': 'Nurturing and secure, excellent home life potential',
    'Taurus-Leo': 'Luxury lovers with strong physical connection',
    'Taurus-Virgo': 'Practical and devoted, built on trust and routine',
    'Taurus-Libra': 'Aesthetic harmony with love for beauty and peace',
    'Taurus-Scorpio': 'Intense and transformative, deep emotional bond',
    'Taurus-Sagittarius': 'Different values - security vs freedom needs balance',
    'Taurus-Capricorn': 'Powerful earth sign combination, ambitious and stable',
    'Taurus-Aquarius': 'Traditional meets unconventional - requires adaptation',
    'Taurus-Pisces': 'Sensitive and sensual, deeply connected emotionally',
    
    // Add more combinations as needed...
  };

  const key1 = `${zodiac1}-${zodiac2}`;
  const key2 = `${zodiac2}-${zodiac1}`;
  
  return insights[key1] || insights[key2] || 'Focus on understanding each other\'s core values and communication styles.';
}

// Get AI recommendations based on score
function getRecommendations(score) {
  if (score >= 80) {
    return '• Excellent match potential\n• Focus on maintaining communication\n• Consider deeper commitment steps';
  } else if (score >= 70) {
    return '• Good relationship foundation\n• Work on understanding differences\n• Build trust gradually';
  } else if (score >= 60) {
    return '• Moderate compatibility\n• Important to discuss life goals\n• Take time to build connection';
  } else if (score >= 50) {
    return '• Needs careful consideration\n• Focus on friendship first\n• Seek family guidance';
  } else {
    return '• Significant differences noted\n• Consider other matches\n• Professional guidance recommended';
  }
}

// Get next steps based on compatibility
function getNextSteps(score) {
  if (score >= 70) {
    return '1. Continue building connection\n2. Discuss future plans\n3. Consider family introductions';
  } else if (score >= 60) {
    return '1. Take time to know each other\n2. Focus on communication\n3. Evaluate shared values';
  } else {
    return '1. Proceed with awareness\n2. Explore other options\n3. Seek experienced guidance';
  }
}

// Toggle compatibility display (for use in component)
export function toggleCompatibility(profileId, currentResponses, setAiResponses, user1, user2) {
  if (currentResponses[profileId]) {
    // Close if already open
    setAiResponses(prev => {
      const newResponses = { ...prev };
      delete newResponses[profileId];
      return newResponses;
    });
  } else {
    // Open with new analysis
    const analysis = generateCompatibilitySummary(user1, user2);
    setAiResponses(prev => ({
      ...prev,
      [profileId]: analysis
    }));
  }
}