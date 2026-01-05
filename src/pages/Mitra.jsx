import { useState } from "react";

export default function Mitra() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
You are Mitra — a friendly, supportive wellbeing companion.
Be empathetic, brief, not medical, and avoid diagnoses.

User: ${userMessage.text}
                  `
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      console.log("Gemini response:", data);

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I’m not sure what to say — try again.";

      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong talking to AI." }
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Mitra (AI Chat)</h2>

      <div className="space-y-2 border p-3 rounded h-64 overflow-auto mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={
                m.role === "user"
                  ? "inline-block bg-blue-100 p-2 rounded"
                  : "inline-block bg-gray-100 p-2 rounded"
              }
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <input
        className="border p-2 rounded w-3/4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Share what's on your mind..."
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
