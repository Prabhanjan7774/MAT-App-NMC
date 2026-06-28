import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Google GenAI client getter to prevent crash on startup if API key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: AI Coach tutor chats
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, contextQuestion } = req.body;

    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      // Graceful fallback response when API key is missing
      return res.json({
        text: `**Coach Offline Mode** 🌟\n\nI'm ready to help you, but the **GEMINI_API_KEY** is not configured yet! \n\nTo activate me, please go to the **Settings > Secrets** panel in AI Studio and add your \`GEMINI_API_KEY\`. \n\n*Temporary Coach Hint:* For this question, carefully re-read the clues or use the **50/50** powerup! Keep up the great effort!`,
        isOfflineFallback: true,
      });
    }

    const systemInstruction = `You are "Professor Mindy", a friendly, enthusiastic, and highly encouraging AI Logic & Reasoning Tutor for school students (8th-grade level preparing for NMMS/scholarship exams).
Your job is to explain logic puzzles, Venn diagrams, number matrices, mirror reflections, and other reasoning concepts in a simplified, step-by-step, engaging manner.
Avoid dry or advanced college-level mathematics. Use visual descriptions, analogies, and questions to guide their understanding.
Keep explanations under 200 words if possible. Always use cheerful emojis and praise their persistence!`;

    const chatHistory = history?.map((msg: any) => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.text }],
    })) || [];

    const contents = [
      ...chatHistory,
      {
        text: `${contextQuestion ? `[Current Question Context: "${contextQuestion}"]\n` : ""}User's input: ${message}`,
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Something went wrong in the AI Coach server." });
  }
});

// 2. API: Dynamic AI Question Generator (conforms to Question interface)
app.post("/api/generate-question", async (req, res) => {
  try {
    const { topicId, topicName, difficulty } = req.body;

    let ai;
    try {
      ai = getAiClient();
    } catch (err) {
      return res.status(400).json({
        error: "GEMINI_API_KEY_MISSING",
        message: "AI key missing. Please insert GEMINI_API_KEY in the Secrets tab to enable infinite AI question generation!",
      });
    }

    const prompt = `Generate ONE high-quality, completely unique logic multiple-choice question for 8th-grade logical reasoning curriculum.
Topic ID: ${topicId}
Topic Name: "${topicName}"
Difficulty: ${difficulty}

Ensure the question matches the specific topic guidelines. For example:
- If Mirror Image/Water Image, generate a word and options with reversed/upside down glyph representations.
- If Number series, design a clean math sequence and explanation.
- Return the response exactly matching the JSON schema below. Ensure correctAnswer is the string index of the correct option ("0", "1", "2", "3").`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            topicId: { type: Type.STRING },
            type: { type: Type.STRING, description: "Must be 'multiple-choice' or relevant QuestionType" },
            questionText: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Must provide exactly 4 distinct options",
            },
            correctAnswer: { type: Type.STRING, description: "String index of correct option: '0', '1', '2', or '3'" },
            explanation: { type: Type.STRING },
            hint: { type: Type.STRING },
          },
          required: ["id", "topicId", "type", "questionText", "options", "correctAnswer", "explanation", "hint"],
        },
      },
    });

    const questionJson = JSON.parse(response.text.trim());
    res.json(questionJson);
  } catch (error: any) {
    console.error("Error in /api/generate-question:", error);
    res.status(500).json({ error: error.message || "Failed to generate dynamic AI puzzle." });
  }
});

// Serve static assets and Vite middleware
async function startServer() {
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

startServer();
