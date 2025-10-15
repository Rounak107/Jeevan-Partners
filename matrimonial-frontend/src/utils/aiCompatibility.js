// frontend/src/utils/aiCompatibility.js

// Helper to find zodiac sign from birth date
export function getZodiacSign(day, month) {
  const zodiacs = [
    ["Capricorn", 19],
    ["Aquarius", 18],
    ["Pisces", 20],
    ["Aries", 19],
    ["Taurus", 20],
    ["Gemini", 20],
    ["Cancer", 22],
    ["Leo", 22],
    ["Virgo", 22],
    ["Libra", 22],
    ["Scorpio", 21],
    ["Sagittarius", 21],
    ["Capricorn", 31],
  ];
  return day > zodiacs[month - 1][1] ? zodiacs[month][0] : zodiacs[month - 1][0];
}

// Compatibility mapping based on zodiac
const compatibilityMap = {
  Aries: ["Leo", "Sagittarius", "Gemini"],
  Taurus: ["Virgo", "Capricorn", "Cancer"],
  Gemini: ["Libra", "Aquarius", "Aries"],
  Cancer: ["Scorpio", "Pisces", "Taurus"],
  Leo: ["Sagittarius", "Aries", "Libra"],
  Virgo: ["Capricorn", "Taurus", "Cancer"],
  Libra: ["Aquarius", "Gemini", "Leo"],
  Scorpio: ["Pisces", "Cancer", "Virgo"],
  Sagittarius: ["Aries", "Leo", "Aquarius"],
  Capricorn: ["Taurus", "Virgo", "Pisces"],
  Aquarius: ["Gemini", "Libra", "Sagittarius"],
  Pisces: ["Cancer", "Scorpio", "Capricorn"],
};

// Generate an "AI-style" response
export function generateCompatibilitySummary(user1, user2) {
  if (!user1 || !user2 || !user1.dob || !user2.dob)
    return "Insufficient birth details to analyze compatibility.";

  const d1 = new Date(user1.dob);
  const d2 = new Date(user2.dob);

  const zodiac1 = getZodiacSign(d1.getDate(), d1.getMonth() + 1);
  const zodiac2 = getZodiacSign(d2.getDate(), d2.getMonth() + 1);

  let score = 60;
  if (compatibilityMap[zodiac1]?.includes(zodiac2)) score = 90;
  if (zodiac1 === zodiac2) score = 95;

  const text = `
💫 Compatibility Analysis
-------------------------
${user1.name} (${zodiac1}) & ${user2.name} (${zodiac2})

❤️ Compatibility Score: ${score}%

✨ Relationship Insight:
${zodiac1} and ${zodiac2} share ${score > 80 ? "strong chemistry" : "moderate understanding"}.
${score > 80 ? "They are likely to have a balanced and loving partnership." : "They may need effort to build long-term harmony."}

🪐 Suggestion:
Communication and trust will be key for this relationship to flourish.
`;

  return text.trim();
}
