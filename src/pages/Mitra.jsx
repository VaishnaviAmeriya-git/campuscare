import { useState } from "react";

export default function Mitra() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/mitra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages(m => [
        ...m,
        { you: input },
        { bot: data.reply }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(m => [
        ...m,
        { bot: "Error talking to Mitra." }
      ]);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Mitra AI</h2>

      <div className="space-y-2 h-64 overflow-y-auto border p-3 rounded">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.you ? "You" : "Mitra"}:</b> {m.you || m.bot}
          </p>
        ))}
      </div>

      <input
        className="border p-2 rounded w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Talk to Mitra..."
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
