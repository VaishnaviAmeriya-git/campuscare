import { useState } from "react";

export default function Mitra() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
  if (!input.trim()) return;

  setLoading(true);

  const API_URL =
    import.meta.env.DEV
      ? "http://localhost:5000/api/chat"
      : "/api/mitra";

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
      {
        bot:
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Couldn't reply"
      }
    ]);
  } catch (err) {
    console.error(err);
    setMessages(m => [...m, { bot: "Error talking to Mitra 😞" }]);
  }

  setInput("");
  setLoading(false);
}

  return (
    <div>
      <h2>Mitra AI</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.you ? "You" : "Mitra"}: </b>{m.you || m.bot}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
