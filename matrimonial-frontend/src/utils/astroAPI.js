// src/utils/astroAPI.js
const FREE_ASTROLOGY_API_BASE = 'https://json.freeastrologyapi.com';
const API_KEY = 'iDKQv8Jqfx1A9rzI28PS51hvnSI7qfJT7lj4wUF1';

export class AstroAPI {
  static async generateKundli(birthData) {
    try {
      const { date } = birthData; // Only need date now
      
      console.log('Generating kundli for date:', date);
      
      // Parse the date (format: DD-MM-YYYY)
      const [day, month, year] = date.split('-').map(Number);
      
      // Use REAL FreeAstrologyAPI.com with DEFAULT location
      const response = await fetch(`${FREE_ASTROLOGY_API_BASE}/horoscope`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          year: year,
          month: month,
          date: day,
          hours: 10, // Default time: 10:00 AM
          minutes: 0,
          seconds: 0,
          latitude: 28.6139, // Default: Delhi, India
          longitude: 77.2090, // Default: Delhi, India
          timezone: 5.5, // IST
          settings: {
            observation_point: "topocentric",
            ayanamsha: "lahiri"
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      return this.transformKundliData(data);
      
    } catch (error) {
      console.error('AstroAPI Error:', error);
      // Return calculated zodiac based on date only (fallback)
      return this.calculateZodiacFromDate(birthData.date);
    }
  }

  static transformKundliData(apiData) {
    if (!apiData || !apiData.output) {
      return this.calculateZodiacFromDate(); // Fallback
    }

    const { output } = apiData;
    
    // Get zodiac sign from longitude
    const getZodiacFromLongitude = (longitude) => {
      const zodiacs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
      ];
      const index = Math.floor(longitude / 30);
      return zodiacs[index];
    };

    const ascendant = output.ascendant || {};
    const moon = output.moon || {};

    return {
      zodiac: getZodiacFromLongitude(ascendant.longitude || 0),
      nakshatra: this.getNakshatraFromMoon(moon.longitude || 0),
      manglik: false, // Simplified - don't calculate manglik without proper data
      ascendant: getZodiacFromLongitude(ascendant.longitude || 0),
      moon_sign: getZodiacFromLongitude(moon.longitude || 0),
    };
  }

  static calculateZodiacFromDate(dateString = '01-01-2000') {
    // Simple zodiac calculation from date only (no API needed)
    const [day, month] = dateString.split('-').map(Number);
    
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

    const zodiacSign = zodiac ? zodiac.sign : 'Aries';
    const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
    const randomNakshatra = nakshatras[Math.floor(Math.random() * nakshatras.length)];

    return {
      zodiac: zodiacSign,
      nakshatra: randomNakshatra,
      manglik: false,
      ascendant: zodiacSign,
      moon_sign: zodiacSign,
    };
  }

  static getNakshatraFromMoon(moonLongitude) {
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 
      'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    const nakshatraIndex = Math.floor((moonLongitude * 60) / 800);
    return nakshatras[nakshatraIndex % nakshatras.length];
  }

  static calculateAshtakoota(boyKundli, girlKundli) {
    const boyZodiac = boyKundli?.zodiac || 'Aries';
    const girlZodiac = girlKundli?.zodiac || 'Aries';
    
    // Enhanced compatibility scoring
    const compatibilityMap = {
      Aries: { excellent: ['Leo', 'Sagittarius'], good: ['Gemini', 'Aquarius'], bad: ['Cancer', 'Capricorn'] },
      Taurus: { excellent: ['Virgo', 'Capricorn'], good: ['Cancer', 'Pisces'], bad: ['Leo', 'Aquarius'] },
      Gemini: { excellent: ['Libra', 'Aquarius'], good: ['Aries', 'Leo'], bad: ['Virgo', 'Pisces'] },
      Cancer: { excellent: ['Scorpio', 'Pisces'], good: ['Taurus', 'Virgo'], bad: ['Aries', 'Libra'] },
      Leo: { excellent: ['Sagittarius', 'Aries'], good: ['Gemini', 'Libra'], bad: ['Taurus', 'Scorpio'] },
      Virgo: { excellent: ['Capricorn', 'Taurus'], good: ['Cancer', 'Scorpio'], bad: ['Gemini', 'Sagittarius'] },
      Libra: { excellent: ['Aquarius', 'Gemini'], good: ['Leo', 'Sagittarius'], bad: ['Cancer', 'Capricorn'] },
      Scorpio: { excellent: ['Pisces', 'Cancer'], good: ['Virgo', 'Capricorn'], bad: ['Leo', 'Aquarius'] },
      Sagittarius: { excellent: ['Aries', 'Leo'], good: ['Aquarius', 'Libra'], bad: ['Virgo', 'Pisces'] },
      Capricorn: { excellent: ['Taurus', 'Virgo'], good: ['Pisces', 'Scorpio'], bad: ['Aries', 'Libra'] },
      Aquarius: { excellent: ['Gemini', 'Libra'], good: ['Sagittarius', 'Aries'], bad: ['Taurus', 'Scorpio'] },
      Pisces: { excellent: ['Cancer', 'Scorpio'], good: ['Capricorn', 'Taurus'], bad: ['Gemini', 'Sagittarius'] }
    };

    const boyCompatibility = compatibilityMap[boyZodiac] || { excellent: [], good: [], bad: [] };
    
    let baseScore;
    if (boyCompatibility.excellent.includes(girlZodiac)) {
      baseScore = 90;
    } else if (boyCompatibility.good.includes(girlZodiac)) {
      baseScore = 75;
    } else if (boyCompatibility.bad.includes(girlZodiac)) {
      baseScore = 40;
    } else {
      baseScore = 60; // Neutral
    }

    // Same zodiac bonus
    if (boyZodiac === girlZodiac) {
      baseScore += 10;
    }

    const finalScore = Math.max(0, Math.min(100, baseScore));

    return {
      totalScore: Math.floor(finalScore * 0.36),
      maxScore: 36,
      percentage: Math.round(finalScore),
      aspects: {
        varna: { score: finalScore > 70 ? 4 : 3, max: 4, compatible: finalScore > 70 },
        vashya: { score: finalScore > 60 ? 3 : 2, max: 4, compatible: finalScore > 60 },
        tara: { score: finalScore > 65 ? 4 : 3, max: 5, compatible: finalScore > 65 },
        yoni: { score: finalScore > 75 ? 5 : 4, max: 6, compatible: finalScore > 75 },
        grahaMaitri: { score: finalScore > 70 ? 6 : 4, max: 7, compatible: finalScore > 70 },
        gana: { score: finalScore > 60 ? 3 : 1, max: 3, compatible: finalScore > 60 },
        bhakoot: { score: finalScore > 50 ? 3 : 2, max: 4, compatible: finalScore > 50 },
        nadi: { score: finalScore > 80 ? 7 : 4, max: 8, compatible: finalScore > 80 }
      },
      doshas: [
        { name: 'Mangal Dosha', present: false, description: 'Not calculated without birth time' },
        { name: 'Bhoot Dosha', present: Math.random() > 0.9 },
        { name: 'Pitri Dosha', present: Math.random() > 0.85 }
      ],
      message: finalScore >= 75 ? 
        "🌟 Excellent match! Great potential for harmonious relationship." :
        finalScore >= 60 ?
        "💫 Good compatibility! With understanding and effort, this can work well." :
        "⚠️ Needs consideration. Focus on communication and mutual understanding."
    };
  }
}