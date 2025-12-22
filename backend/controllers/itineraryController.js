const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

const generateItinerary = async (req, res) => {
  try {
    const { duration, interests, budget, travelStyle, preferences } = req.body;

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'AI service not configured. Please set GOOGLE_GEMINI_API_KEY in .env',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a travel planning assistant for Madhya Pradesh, India. Create a detailed day-wise itinerary based on the following preferences:

Duration: ${duration}
Interests: ${interests}
Budget: ${budget}
Travel Style: ${travelStyle}
Additional Preferences: ${preferences || 'None'}

CRITICAL: You MUST return ONLY valid JSON. No markdown, no code blocks, just pure JSON.

Please provide a JSON response with the following EXACT structure:
{
  "days": [
    {
      "day": 1,
      "date": "Day 1",
      "activities": [
        {
          "name": "Activity name",
          "description": "Detailed description",
          "location": {
            "lat": 23.1234,
            "lng": 77.5678,
            "address": "Full address in Madhya Pradesh, India"
          },
          "time": "Morning/Afternoon/Evening",
          "ecoFriendlySuggestions": {
            "stay": "Specific eco-friendly accommodation/homestay recommendation",
            "transport": "Sustainable transport option (electric vehicle, bicycle, public transport, walking)",
            "activities": "Eco-conscious activity suggestions for this location"
          }
        }
      ]
    }
  ],
  "summary": "Brief summary of the itinerary",
  "totalCost": "Estimated total cost range in INR",
  "ecoFriendlyTips": ["Tip 1", "Tip 2", "Tip 3"]
}

REQUIREMENTS:
- Use REAL coordinates (lat/lng) for actual locations in Madhya Pradesh
- Each activity MUST include ecoFriendlySuggestions with specific sustainable stay (homestay/eco-lodge) and transport options
- Focus heavily on eco-friendly and sustainable tourism practices
- Provide realistic day-wise plans based on the preferences
- Include sustainable transport recommendations (public transport, electric vehicles, cycling, walking)
- Recommend eco-friendly homestays and lodges where possible
- Return ONLY valid JSON - no markdown formatting, no code blocks, no explanations`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response to extract JSON
    text = text.trim();
    // Remove markdown code blocks if present
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/gm, '').replace(/```\n?$/gm, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n?/gm, '').replace(/```\n?$/gm, '');
    }
    // Remove any leading/trailing whitespace
    text = text.trim();

    let itinerary;
    try {
      itinerary = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Response text:', text);
      // Try to extract JSON from the response if it's wrapped in text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Unable to parse JSON from AI response');
      }
    }

    res.json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary',
      error: error.message,
    });
  }
};

module.exports = {
  generateItinerary,
};

