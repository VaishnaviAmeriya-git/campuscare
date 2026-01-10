import { useState } from "react";

export default function Mitra() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", text: input }
    ];

    setMessages(updatedMessages);
    setInput("");

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });

    const data = await res.json();

    setMessages([
      ...updatedMessages,
      { role: "assistant", text: data.reply }
    ]);
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Mitra AI</h2>

      {messages.map((m, i) => (
        <p key={i}>
          <strong>{m.role === "user" ? "You" : "Mitra"}:</strong>{" "}
          {m.text}
        </p>
      ))}

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Say something…"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
