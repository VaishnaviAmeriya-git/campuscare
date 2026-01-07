import { useState } from "react";

export default function Mitra() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.DEV
      ? "http://localhost:3000/api/mitra"
      : "/api/mitra";

  async function sendMessage() {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages(m => [
        ...m,
        { you: input },
        { bot: data.reply || "Couldn't reply right now." }
      ]);

    } catch (err) {
      console.error(err);
      setMessages(m => [
        ...m,
        { bot: "Server error — please try again." }
      ]);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mitra</h1>

      <div className="space-y-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.you ? "text-blue-600" : "text-green-700"}>
            {m.you ? `You: ${m.you}` : `Mitra: ${m.bot}`}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border px-3 py-2 flex-1 rounded"
          placeholder="Type your message…"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Thinking…" : "Send"}
        </button>
      </div>
    </div>
  );
}
