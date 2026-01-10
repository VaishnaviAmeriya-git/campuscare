import { useState } from "react";

const MOODS = [
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😫", label: "Overwhelmed" },
  { emoji: "😴", label: "Drained" }
];

export default function Mood() {
  const [selected, setSelected] = useState(null);

  function handleSelect(mood) {
    setSelected(mood);
    // later → save to backend
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          How are you feeling right now?
        </h2>

        <div className="flex justify-center gap-4">
          {MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => handleSelect(m)}
              className={`text-3xl transition transform hover:scale-110
                ${selected?.label === m.label ? "scale-125" : ""}`}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        {selected && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thanks for checking in 🌱
          </p>
        )}
      </div>
    </div>
  );
}
