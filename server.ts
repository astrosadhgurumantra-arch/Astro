import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API: Real-time astrological consultations with Astro Sadhguru Mantra
app.post("/api/consult", async (req, res) => {
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

    // Map history to the contents structure if present, or just use a standard prompt with chat context
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

// API: Dynamic AI Horoscope Generator based on sign, timeframe, and aspect
app.post("/api/horoscope", async (req, res) => {
  try {
    const { sign, timeframe, aspect } = req.body; // timeframe: daily, monthly; aspect: general, love, wealth

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

// Vite middleware setup for Development vs Production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
