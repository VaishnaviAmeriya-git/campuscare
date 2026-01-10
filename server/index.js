import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: ".env.server" });

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

console.log("Gemini key loaded:", API_KEY ? "YES ✅" : "NO ❌");

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!API_KEY) {
      return res.json({ reply: "Mitra is unavailable right now 🌙" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message || "Hello" }]
            }
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 300
          }
        })
      }
    );

    const data = await response.json();

    console.log("RAW GEMINI RESPONSE:", JSON.stringify(data, null, 2));
    const fallbackReplies = [
  "That sounds like a lot. I’m here with you.",
  "Yeah… that can feel heavy.",
  "We can take this one step at a time.",
  "Tell me what’s pressing right now."
];

const reply =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];


    if (!reply) {
      return res.json({
        reply: "Hey, I'm here! how are you?"
      });
    }

    res.json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    res.json({ reply: "I’m still here." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
