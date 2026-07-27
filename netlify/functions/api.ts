import serverless from "serverless-http";
import express from "express";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API: Real-time astrological consultations
router.post("/consult", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `
You are the wise, compassionate, and deeply spiritual "Astro Sadhguru Mantra", an elite Vedic Astrologer and Spiritual Guide. 
Your tone is soothing, philosophical, and encouraging, combining ancient astrological expertise with spiritual mindfulness.
Guidelines:
1. Provide personalized readings based on their questions, planetary alignments, or zodiac descriptions.
2. If they mention their sign, use Vedic astrological principles to offer insights.
3. Keep your advice constructive. Offer spiritual mantras, planetary remedies, or positive guidance instead of pure fatalism.
4. If they ask about wealth, career, relationships, or love, give them specific spiritual alignments (e.g., Jupiter's influence on wealth, Venus on love).
5. Always mention that they can connect directly for deep personal 1-on-1 consultations with Astro Sadhguru Mantra via WhatsApp at +91 88821 95832 for custom natal chart readings.
6. Format your responses beautifully using clear sections, bullet points, and elegant spacing.
`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Consultation API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate astrological guidance." });
  }
});

// API: Dynamic AI Horoscope Generator
router.post("/horoscope", async (req, res) => {
  try {
    const { sign, timeframe, aspect } = req.body;

    if (!sign) {
      return res.status(400).json({ error: "Zodiac sign is required." });
    }

    const prompt = `Generate a highly personalized, spiritually rich, and detailed ${timeframe || 'daily'} horoscope reading for the zodiac sign ${sign} focusing on ${aspect || 'general life aspect'}. 
Provide:
1. A cosmic summary of current planetary transits affecting them.
2. Practical spiritual wisdom.
3. An auspicious "Mantra of the Day/Month" for them to recite.
4. Auspicious numbers and colors.
Keep it elegant, premium, and structured with clean formatting.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Astro Sadhguru Mantra, delivering premium, elegant, and deeply accurate Vedic astrology readings.",
        temperature: 0.6,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Horoscope API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate horoscope." });
  }
});

// API: Real-time Vedic Panchang Engine
router.post("/panchang", async (req, res) => {
  try {
    const { date, location } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required." });
    }

    const prompt = `Generate a highly accurate, spiritually detailed, and authentic Hindu Panchang (Vedic almanac) for:
Date: ${date}
Location: ${location || "Noida, India"}

Please calculate or determine the corresponding Panchang metrics for this date.
Return a structured JSON object strictly conforming to this schema:
{
  "date": "string representing the input date",
  "location": "string representing the input location",
  "tithi": {
    "name": "e.g., Shukla Ekadashi or Krishna Tritiya",
    "sanskritName": "Sanskrit name of the tithi",
    "deityOrPlanet": "Ruling deity of this tithi",
    "description": "Astrological and spiritual meaning/impact of this tithi"
  },
  "nakshatra": {
    "name": "e.g., Rohini or Ashwini",
    "sanskritName": "Sanskrit name of the nakshatra",
    "deityOrPlanet": "Ruling planet and deity of this nakshatra",
    "description": "Cosmic qualities and energy of this constellation today"
  },
  "yoga": {
    "name": "e.g., Siddha or Vyatipata",
    "sanskritName": "Sanskrit name of the yoga",
    "deityOrPlanet": "Associated deity or planet",
    "description": "Spiritual alignment explanation of this luni-solar angle"
  },
  "karana": {
    "name": "e.g., Bava or Balava",
    "sanskritName": "Sanskrit name of the karana",
    "deityOrPlanet": "Ruling deity or animal symbol",
    "description": "Practical and action-oriented effect of this half-tithi"
  },
  "vara": {
    "name": "e.g., Ravivara (Sunday) or Somavara (Monday)",
    "sanskritName": "Sanskrit weekday name",
    "deityOrPlanet": "Ruling celestial body (e.g., Surya or Chandra)",
    "description": "Daily planetary energy and how to make the most of it"
  },
  "timings": {
    "sunrise": "Auspicious Sunrise time (e.g., 05:43 AM)",
    "sunset": "Sunset time (e.g., 07:12 PM)",
    "moonrise": "Moonrise time",
    "moonset": "Moonset time",
    "abhijitMuhurta": "Most auspicious period (e.g., 11:54 AM - 12:46 PM)",
    "rahuKaal": "Inauspicious period (e.g., 10:45 AM - 12:22 PM)",
    "amritKaal": "Divine timing for starting auspicious tasks (e.g., 02:15 PM - 03:50 PM)",
    "brahmaMuhurta": "Pre-dawn hours for meditation/prayer (e.g., 04:15 AM - 05:03 AM)"
  },
  "cosmicGuidance": {
    "summary": "Sadhguru Mantra's deep spiritual, astrological overview of this day's cosmic forces.",
    "auspiciousActivities": ["Activity 1", "Activity 2", "Activity 3"],
    "avoidActivities": ["Activity 1", "Activity 2"],
    "sadhguruMantra": "A powerful Vedic/Sanskrit mantra of the day with English translation and meaning",
    "ritualAdvice": "Practical ritual or remedies recommended for today to balance these planetary transits."
  }
}
Ensure the content is spiritually elevating, and beautifully phrased in the voice of Astro Sadhguru Mantra. Do not wrap in markdown tags like \`\`\`json. Return pure raw JSON content.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the ancient Vedic Astro Sadhguru Mantra Panchang Engine, generating authentic calculated alignments in strict JSON format.",
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            location: { type: Type.STRING },
            tithi: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sanskritName: { type: Type.STRING },
                deityOrPlanet: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "sanskritName", "deityOrPlanet", "description"]
            },
            nakshatra: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sanskritName: { type: Type.STRING },
                deityOrPlanet: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "sanskritName", "deityOrPlanet", "description"]
            },
            yoga: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sanskritName: { type: Type.STRING },
                deityOrPlanet: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "sanskritName", "deityOrPlanet", "description"]
            },
            karana: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sanskritName: { type: Type.STRING },
                deityOrPlanet: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "sanskritName", "deityOrPlanet", "description"]
            },
            vara: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sanskritName: { type: Type.STRING },
                deityOrPlanet: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "sanskritName", "deityOrPlanet", "description"]
            },
            timings: {
              type: Type.OBJECT,
              properties: {
                sunrise: { type: Type.STRING },
                sunset: { type: Type.STRING },
                moonrise: { type: Type.STRING },
                moonset: { type: Type.STRING },
                abhijitMuhurta: { type: Type.STRING },
                rahuKaal: { type: Type.STRING },
                amritKaal: { type: Type.STRING },
                brahmaMuhurta: { type: Type.STRING }
              },
              required: ["sunrise", "sunset", "moonrise", "moonset", "abhijitMuhurta", "rahuKaal", "amritKaal", "brahmaMuhurta"]
            },
            cosmicGuidance: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                auspiciousActivities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                avoidActivities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                sadhguruMantra: { type: Type.STRING },
                ritualAdvice: { type: Type.STRING }
              },
              required: ["summary", "auspiciousActivities", "avoidActivities", "sadhguruMantra", "ritualAdvice"]
            }
          },
          required: ["date", "location", "tithi", "nakshatra", "yoga", "karana", "vara", "timings", "cosmicGuidance"]
        }
      }
    });

    const panchangObj = JSON.parse(response.text || "{}");
    res.json(panchangObj);
  } catch (error: any) {
    console.error("Panchang API error:", error);
    res.status(500).json({ error: error.message || "Failed to calculate daily panchang." });
  }
});

app.use("/api", router);
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
