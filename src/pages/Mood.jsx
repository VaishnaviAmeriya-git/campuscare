import React, { useState } from "react";
import { addMoodEntry } from "../api/mood";

export default function Mood() {

  const [selected, setSelected] = useState(null);
  const [emoji, setEmoji] = useState("🙂");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const moods = [
    { score: 1, emoji: "😄", label: "Happy" },
    { score: 2, emoji: "🙂", label: "Calm" },
    { score: 3, emoji: "😐", label: "Neutral" },
    { score: 4, emoji: "😟", label: "Stressed" },
    { score: 5, emoji: "😢", label: "Sad" }
  ];

  async function saveMood() {
    if (!selected) {
      alert("Please select mood first");
      return;
    }

    setSaving(true);

    await addMoodEntry({
      mood_score: selected,
      mood_emoji: emoji,
      notes
    });

    setSaving(false);
    alert("Mood saved 👍");
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Mood Tracker</h2>

      <p className="text-gray-600">
        Tap how you feel today.
      </p>

      <div className="grid grid-cols-5 gap-3 mt-2">
        {moods.map((m) => (
          <button
            key={m.score}
            onClick={() => setSelected(m.score)}
            className={`text-2xl ${selected === m.score ? "ring" : ""}`}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <button
        onClick={saveMood}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        {saving ? "Saving…" : "Save Mood"}
      </button>
    </div>
  );
}
